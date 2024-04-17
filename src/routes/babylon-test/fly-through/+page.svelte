<script lang="ts">
  import FlyThrough from '$lib/babylon/fly-through.svelte';
  import * as BABYLON from '@babylonjs/core';
</script>

<FlyThrough
  transformSceneMeshes={(scene) => {
    // Replace or remove this mesh property override code
    scene.meshes.forEach((mesh) => {
      mesh.rotation = new BABYLON.Vector3(0, 1, 0);
    });

    // Stop all animations
    scene.animationGroups.forEach((animation) => {
      animation.stop();
    });
  }}
/>
