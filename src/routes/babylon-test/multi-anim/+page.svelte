<script lang="ts">
  import { createRainbowGlassMaterial } from '$lib/babylon/materials';
  import MultiAnimationGltf from '$lib/babylon/multi-animation-gltf.svelte';
  import * as BABYLON from '@babylonjs/core';
</script>

<MultiAnimationGltf
  animatedMeshesFile="intro-scene.glb"
  transformAnimatedMeshes={(scene) => {
    scene.meshes.forEach((mesh) => {
      if (mesh?.material?.name === 'Glass_rainbow') {
        mesh.material = createRainbowGlassMaterial(scene);
      }
    });
  }}
/>
