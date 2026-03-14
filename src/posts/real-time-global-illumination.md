---
title: "Real-Time Global Illumination: From Theory to Production"
date: "2025-11-15"
excerpt: "A deep dive into the techniques behind real-time global illumination, from radiance caching to neural denoising — and how we shipped it in a AAA title."
tags: Rendering, CUDA, Research
coverImage: https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80
---

## Introduction

Global illumination (GI) has long been the holy grail of real-time graphics. For decades, game engines approximated it with baked lightmaps, screen-space ambient occlusion, and reflection captures. Today, with hardware ray tracing and neural denoising, we can achieve plausible GI at 60fps on consumer hardware.

This post walks through the techniques we used to ship real-time GI in a recent AAA title — the tradeoffs we made, the failures we learned from, and the solutions that actually worked.

## The Core Problem

True global illumination requires computing the integral of incoming radiance over the hemisphere at every surface point. For a scene with millions of triangles and dynamic lighting, this is computationally intractable at real-time frame rates.

The key insight is that we don't need *perfect* GI — we need GI that is:

1. **Temporally stable** — no flickering between frames
2. **Perceptually accurate** — correct in the ways the human eye is sensitive to
3. **Fast enough** — under 4ms GPU budget

## Radiance Caching

Our approach centers on a **world-space radiance cache** — a sparse 3D grid of probes that store pre-integrated irradiance. Each probe captures incoming light from all directions using a compact spherical harmonic representation.

```glsl
// Evaluate irradiance from SH coefficients
vec3 EvaluateSH(vec3 normal, vec4 sh[7]) {
    vec3 irradiance = vec3(0.0);
    // Band 0
    irradiance += sh[0].rgb * 0.282095;
    // Band 1
    irradiance += sh[1].rgb * 0.488603 * normal.y;
    irradiance += sh[2].rgb * 0.488603 * normal.z;
    irradiance += sh[3].rgb * 0.488603 * normal.x;
    // Band 2 (abbreviated)
    irradiance += sh[4].rgb * 1.092548 * normal.x * normal.y;
    return max(irradiance, vec3(0.0));
}
```

Probes are updated asynchronously — a fraction of them are refreshed each frame using hardware ray tracing, while the rest use cached values from previous frames.

## Neural Denoising

The raw output from 1 ray-per-pixel path tracing is extremely noisy. We use a lightweight convolutional neural network trained on our specific content to denoise the signal.

The network takes three inputs:
- **Noisy radiance** — the raw path traced signal
- **G-buffer features** — albedo, normals, depth, motion vectors
- **Temporal history** — the denoised result from the previous frame

```python
class GIDenoiser(nn.Module):
    def __init__(self):
        super().__init__()
        self.encoder = UNetEncoder(in_channels=14, base_channels=32)
        self.temporal = TemporalAccumulator(channels=32)
        self.decoder = UNetDecoder(base_channels=32, out_channels=3)

    def forward(self, noisy, gbuffer, history):
        features = torch.cat([noisy, gbuffer], dim=1)
        encoded = self.encoder(features)
        accumulated = self.temporal(encoded, history)
        return self.decoder(accumulated)
```

The network runs in under 1ms on an RTX 4080 after ONNX export and TensorRT optimization.

## Results

After six months of development, we achieved:

| Metric | Before | After |
|--------|--------|-------|
| GI quality | Baked only | Dynamic, full GI |
| GPU cost | 0.5ms (baked) | 3.8ms |
| Temporal stability | Perfect | 98% stable |
| Memory | 120MB lightmaps | 45MB probe cache |

The 3.8ms cost fits comfortably within our 16ms frame budget on target hardware.

## Lessons Learned

**Probe placement matters more than probe count.** We initially used a uniform grid, which wasted probes in empty space. Switching to an adaptive placement strategy (more probes near surfaces, fewer in open air) halved our memory usage with no quality loss.

**Temporal reprojection is your best friend.** Accumulating history across frames is essentially free and dramatically improves quality. The challenge is handling disocclusion — when a surface becomes visible that wasn't in the previous frame. We handle this with a confidence weight that resets to zero on disocclusion.

**Neural networks need domain-specific training data.** Our first denoiser was trained on generic path-traced scenes and performed poorly on our specific art style. Retraining on in-engine captures improved quality significantly.

## Conclusion

Real-time global illumination is no longer a research curiosity — it's a production reality. The combination of hardware ray tracing, world-space radiance caches, and neural denoising makes it achievable within a real-time budget.

The techniques described here are not magic — they're engineering tradeoffs. Understanding those tradeoffs is what separates a working implementation from a research prototype.

If you have questions or want to discuss the implementation details, feel free to reach out.
