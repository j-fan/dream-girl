<script lang="ts">
  import FlyThrough from '$lib/babylon/fly-through.svelte';
  import { createRainbowGlassMaterial } from '$lib/babylon/materials';
  import * as BABYLON from '@babylonjs/core';
</script>

<FlyThrough
  sceneFile="heart.glb"
  transformSceneMeshes={(scene) => {
    // Replace or remove this mesh property override code
    scene.meshes.forEach((mesh) => {
      if (mesh.name === 'Heart' || mesh.name === 'Splash') {
        mesh.material = createRainbowGlassMaterial(scene);
      }
    });

    // Stop all animations
    scene.animationGroups.forEach((animation) => {
      animation.stop();
    });
  }}
/>
