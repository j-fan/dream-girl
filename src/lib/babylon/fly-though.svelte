<script lang="ts">
  import { onMount } from 'svelte';
  import * as BABYLON from 'babylonjs';
  import { fade } from 'svelte/transition';

  let canvasRef: HTMLCanvasElement | null = null;

  onMount(() => {
    const engine = new BABYLON.Engine(canvasRef, true);
    const scene = new BABYLON.Scene(engine);

    // Setup camera
    const camera = new BABYLON.ArcRotateCamera(
      'ArcRotateCamera',
      0,
      0,
      20,
      new BABYLON.Vector3(0, 0, 0),
      scene
    );
    camera.attachControl(canvasRef, true);

    // Setup lighting
    var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.7;

    // Add sphere
    var sphere = BABYLON.MeshBuilder.CreateSphere('sphere', { diameter: 2, segments: 32 }, scene);
    sphere.position.y = 1;

    engine.runRenderLoop(() => {
      scene.render();
    });

    const resizeBabylon = () => {
      engine.resize();
    };
    window.addEventListener('resize', resizeBabylon);

    return () => {
      engine.dispose();
      window.removeEventListener('resize', resizeBabylon);
    };
  });
</script>

<canvas bind:this={canvasRef} out:fade={{ duration: 500 }} />

<style>
  canvas {
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100%;
    /* pointer-events: none; */
    z-index: -1;
  }
</style>
