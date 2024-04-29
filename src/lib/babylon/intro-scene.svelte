<script lang="ts">
  import { onMount } from 'svelte';
  import '@babylonjs/loaders/glTF';
  import * as BABYLON from '@babylonjs/core';
  import { fade } from 'svelte/transition';
  import { initMultiAnimationScene } from './init-multi-animation-scene';
  import { createAlphaGlassMaterial, createRainbowGlassMaterial } from './materials';
  import LoadingScreen from '$lib/components/loading-screen.svelte';
  import IntroQuiz from '$lib/components/intro-quiz.svelte';
  import { goto } from '$app/navigation';

  export let showDebug = false;

  const animatedMeshesFile = 'intro-scene.glb';
  const transformScene = (scene: BABYLON.Scene) => {
    scene.meshes.forEach((mesh) => {
      if (mesh?.material?.name === 'PaletteMaterial001') {
        mesh.material = createRainbowGlassMaterial(scene);
      } else if (mesh?.material?.name === 'PaletteMaterial003') {
        mesh.material = createAlphaGlassMaterial(scene);
      }
    });

    const pipeline = new BABYLON.DefaultRenderingPipeline('defaultPipeline', false, scene, [
      scene.activeCamera!
    ]);

    pipeline.bloomEnabled = true;
    pipeline.bloomThreshold = 0.75;
    pipeline.bloomWeight = 1.5;
    pipeline.bloomKernel = 128;
    pipeline.bloomScale = 0.5;

    pipeline.chromaticAberrationEnabled = true;
    pipeline.chromaticAberration.aberrationAmount = 100;
    pipeline.chromaticAberration.radialIntensity = 3;
  };

  /**
   * How many points of interest in the camera animation
   * that we should stop at. It assumes there is one
   * point at every `fileFrameRate` frame.
   */
  const maxPointsOfInterest = 6;

  let canvasRef: HTMLCanvasElement | null = null;
  let scene: BABYLON.Scene;

  let cameraAnimations: BABYLON.AnimationGroup[] = [];
  let cameraAnimIndex = 0;

  let animations: BABYLON.AnimationGroup[] = [];
  let animationIndex = 0;
  let animationName = '';

  let fpsFactor = 1;
  let loadingProgress = 0;

  onMount(() => {
    const { engine, ...sceneProps } = initMultiAnimationScene({
      canvasRef,
      animatedMeshesFile,
      transformScene,
      onProgress
    });
    scene = sceneProps.scene;
    cameraAnimations = sceneProps.cameraAnimations;
    animations = sceneProps.animations;
    fpsFactor = sceneProps.fpsFactor;

    scene.executeWhenReady(() => {
      loadingProgress = 100;
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

  const nextAnimation = () => {
    if (animationIndex === animations.length - 1) {
      animationIndex = 0;
    } else {
      animationIndex++;
    }
    animationName = animations[animationIndex].name;
  };

  const toggleAnimation = () => {
    const anim = animations[animationIndex];
    if (anim.isPlaying) {
      anim.stop();
    } else {
      anim.start(true);
    }
  };

  const goToNextCameraPoint = () => {
    if (!cameraAnimations) {
      console.error(
        'Failed to find a camera animation in your file. Open the NLA track view in Blender and make sure you have an action named CameraAction in it and attached to camera object'
      );
      return;
    }

    cameraAnimations.forEach((a) => {
      a.start(false, 1, cameraAnimIndex * 30 * fpsFactor, (cameraAnimIndex + 1) * 30 * fpsFactor);
    });
    cameraAnimIndex++;
    if (cameraAnimIndex === maxPointsOfInterest - 1) {
      cameraAnimIndex = 0;
    }
  };
</script>

{#if showDebug}
  <button class="animateButton" on:click={nextAnimation}>Select next animation</button>
  <button class="animateButton" on:click={toggleAnimation}>Toggle start/stop</button>
  <button class="animateButton" on:click={goToNextCameraPoint}>Toggle camera animation</button>
  <div class="animationName">Current animation: {animationName}</div>
{/if}

<canvas bind:this={canvasRef} out:fade={{ duration: 500 }} />
<LoadingScreen progress={loadingProgress} />
<IntroQuiz
  maxSteps={6}
  onNext={goToNextCameraPoint}
  onFinish={() => {
    goto('/chat');
  }}
/>

<style>
  canvas {
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100%;
    /* pointer-events: none; */
    z-index: -1;

    filter: contrast(1.1) saturate(1.2) hue-rotate(5deg);
  }

  .animateButton {
    top: 1rem;
    left: 1rem;
  }

  .animationName {
    position: absolute;
    top: 3rem;
    left: 1rem;
    background-color: white;
  }
</style>
