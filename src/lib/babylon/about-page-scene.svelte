<script lang="ts">
  import { onMount } from 'svelte';
  import '@babylonjs/loaders/glTF';
  import * as BABYLON from '@babylonjs/core';
  import { fade } from 'svelte/transition';
  import { initMultiAnimationScene } from './init-multi-animation-scene';
  import LoadingScreen from '$lib/components/loading-screen.svelte';
  import { createRainbowGlassMaterial } from './materials';

  const animatedMeshesFile = 'sun-moon-stars.glb';
  const transformScene = (scene: BABYLON.Scene) => {
    scene.meshes.forEach((mesh) => {
      if (mesh?.material?.name === 'Glass_rainbow') {
        mesh.material = createRainbowGlassMaterial(
          scene,
          mesh.material as BABYLON.PBRMetallicRoughnessMaterial
        );
      }
    });

    const pipeline = new BABYLON.DefaultRenderingPipeline('defaultPipeline', false, scene, [
      scene.activeCamera!
    ]);

    pipeline.bloomEnabled = true;
    pipeline.bloomThreshold = 0.9;
    pipeline.bloomWeight = 0.5;
    pipeline.bloomKernel = 64;
    pipeline.bloomScale = 0.5;

    pipeline.chromaticAberrationEnabled = true;
    pipeline.chromaticAberration.aberrationAmount = 100;
    pipeline.chromaticAberration.radialIntensity = 3;
  };

  let canvasRef: HTMLCanvasElement | null = null;
  let scene: BABYLON.Scene;
  let camera: BABYLON.ArcRotateCamera;

  let loadingProgress = 0;

  onMount(() => {
    const { engine, defaultCamera, ...sceneProps } = initMultiAnimationScene({
      canvasRef,
      animatedMeshesFile,
      transformScene,
      onProgress,
      startAllAnimationsByDefault: false,
      hasAnimationBlending: true
    });
    scene = sceneProps.scene;
    camera = defaultCamera;

    scene.executeWhenReady(() => {
      loadingProgress = 100;
      camera.target = new BABYLON.Vector3(-2, 0.53, -2.7);
      camera.radius = 7.8;
      camera.alpha = 1.4847;
      camera.beta = 1.7015;
    });

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

  const onProgress = (event: BABYLON.ISceneLoaderProgressEvent) => {
    if (!event.lengthComputable) {
      return;
    }

    const percent = (event.loaded / event.total) * 100;

    // Scene is not truly ready until scene.executeWhenReady is called
    if (percent === 100) {
      loadingProgress = 99;
    } else {
      loadingProgress = percent;
    }
  };
</script>

<canvas bind:this={canvasRef} out:fade={{ duration: 500 }} />

<LoadingScreen progress={loadingProgress} autoProceed />

<style>
  canvas {
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100%;
    z-index: -1;

    filter: contrast(1.1) saturate(1.2) hue-rotate(5deg);
  }
</style>
