---
title: "10 Shader Optimization Techniques Every Graphics Engineer Should Know"
date: "2025-09-03"
excerpt: "Practical, battle-tested techniques for squeezing every last microsecond out of your GPU shaders — from register pressure to memory access patterns."
tags: GLSL, Performance, Vulkan
---

## Why Shader Performance Matters

A single poorly optimized shader can tank your frame rate across an entire scene. Unlike CPU code where you can profile individual functions, GPU shaders execute millions of times per frame in parallel. A 0.1ms improvement in a frequently-called shader can translate to a 2-3fps gain at 60fps.

Here are ten techniques I've used repeatedly in production to improve shader performance.

## 1. Minimize Register Pressure

Each GPU thread has a limited register file. When a shader uses too many registers, the GPU reduces occupancy — fewer threads run simultaneously, hiding less latency.

```glsl
// ❌ High register pressure — all values live simultaneously
vec3 a = texture(tex0, uv).rgb;
vec3 b = texture(tex1, uv).rgb;
vec3 c = texture(tex2, uv).rgb;
vec3 d = texture(tex3, uv).rgb;
return a * b + c * d;

// ✅ Lower pressure — reuse registers
vec3 result = texture(tex0, uv).rgb * texture(tex1, uv).rgb;
result += texture(tex2, uv).rgb * texture(tex3, uv).rgb;
return result;
```

## 2. Use Half Precision Where Possible

On modern GPUs, `float16` operations are 2x faster than `float32` and use half the bandwidth.

```glsl
// Fragment shader — use mediump for color calculations
precision mediump float;

// Or in GLSL 4.5+
float16_t roughness = float16_t(texture(roughnessTex, uv).r);
```

Be careful with precision-sensitive operations like depth reconstruction and shadow map comparisons — keep those in full precision.

## 3. Avoid Branching on Per-Pixel Data

GPU warps execute instructions in lockstep. When threads in a warp take different branches, both paths execute and the results are masked. This is called **warp divergence**.

```glsl
// ❌ Divergent — different pixels take different paths
if (roughness > 0.5) {
    color = computeRoughSpecular(roughness);
} else {
    color = computeSmoothSpecular(roughness);
}

// ✅ Branchless — same path for all pixels
float t = step(0.5, roughness);
color = mix(computeSmoothSpecular(roughness), computeRoughSpecular(roughness), t);
```

## 4. Pack Data Efficiently

Texture fetches are expensive. Pack multiple values into a single texture to reduce fetch count.

```glsl
// Pack roughness, metallic, AO into a single RGB texture
// Instead of three separate R8 textures
vec3 packed = texture(pbrPacked, uv).rgb;
float roughness = packed.r;
float metallic  = packed.g;
float ao        = packed.b;
```

## 5. Use Compute Shaders for Parallel Reductions

For operations like bloom, SSAO, or histogram generation, compute shaders with shared memory are significantly faster than equivalent fragment shader approaches.

```glsl
// Parallel reduction in compute shader using shared memory
shared float sharedData[64];

void main() {
    uint tid = gl_LocalInvocationIndex;
    sharedData[tid] = inputData[gl_GlobalInvocationID.x];
    barrier();

    for (uint stride = 32; stride > 0; stride >>= 1) {
        if (tid < stride) {
            sharedData[tid] += sharedData[tid + stride];
        }
        barrier();
    }

    if (tid == 0) outputData[gl_WorkGroupID.x] = sharedData[0];
}
```

## Conclusion

Shader optimization is part science, part art. The techniques above are starting points — always profile before and after to verify improvements, and remember that the best optimization is often algorithmic rather than micro-level.

The GPU is a massively parallel machine. Write code that respects its architecture and it will reward you with performance.
