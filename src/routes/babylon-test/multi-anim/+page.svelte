<script lang="ts">
  import { createRainbowGlassMaterial } from '$lib/babylon/materials';
  import MultiAnimationGltf from '$lib/babylon/multi-animation-gltf.svelte';
  import * as BABYLON from '@babylonjs/core';
</script>

<MultiAnimationGltf
  animatedMeshesFile="camera-test.glb"
  transformAnimatedMeshes={(scene) => {
    scene.meshes.forEach((mesh) => {
      mesh.material = createRainbowGlassMaterial(scene);
      mesh.rotation = new BABYLON.Vector3(0, 1, 0);

      // Set the active camera to the one in the GLTF because
      // it contains the camera animation we want
      scene.activeCamera = scene.cameras[1];
    });
  }}
/>
