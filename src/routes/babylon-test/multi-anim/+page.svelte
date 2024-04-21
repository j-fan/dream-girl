<script lang="ts">
  import { createRainbowGlassMaterial } from '$lib/babylon/materials';
  import MultiAnimationGltf from '$lib/babylon/multi-animation-gltf.svelte';
  import * as BABYLON from '@babylonjs/core';
</script>

<MultiAnimationGltf
  animatedMeshesFile="everything.glb"
  transformAnimatedMeshes={(scene) => {
    scene.meshes.forEach((mesh) => {
      mesh.material = createRainbowGlassMaterial(scene);
      mesh.rotation = new BABYLON.Vector3(0, 1, 0);
    });
  }}
/>
