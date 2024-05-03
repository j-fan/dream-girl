<script lang="ts">
  import { onMount } from 'svelte';
  import '@babylonjs/loaders/glTF';
  import * as BABYLON from '@babylonjs/core';
  import { fade } from 'svelte/transition';
  import { initMultiAnimationScene } from './init-multi-animation-scene';
  import LoadingScreen from '$lib/components/loading-screen.svelte';
  import { isMobileScreen, isTabletPortraitScreen, isTabletScreen } from '$lib/utils/screen';

  export let showDebug = false;
  export let onIntroAnimationFinish: (() => void) | undefined = undefined;
  export let onLoadingFinish: (() => void) | undefined = undefined;

  const animatedMeshesFile = 'dream-girl.glb';
  const transformScene = (scene: BABYLON.Scene) => {
    scene.meshes.forEach((mesh) => {
      if (
        mesh?.material?.name === 'Dress' ||
        mesh?.material?.name === 'Metal' ||
        mesh?.material?.name === 'High_Heels'
      ) {
        const material = mesh.material as BABYLON.PBRMetallicRoughnessMaterial;
        material.iridescence.isEnabled = true;
        material.iridescence.indexOfRefraction = 1.3;
        material.iridescence.minimumThickness = 100;
        material.iridescence.maximumThickness = 400;
      }
    });

    const pipeline = new BABYLON.DefaultRenderingPipeline('defaultPipeline', false, scene, [
      scene.activeCamera!
    ]);

    pipeline.bloomEnabled = true;
    pipeline.bloomThreshold = 0.99;
    pipeline.bloomWeight = 0.5;
    pipeline.bloomKernel = 32;
    pipeline.bloomScale = 0.5;

    pipeline.chromaticAberrationEnabled = true;
    pipeline.chromaticAberration.aberrationAmount = 50;
    pipeline.chromaticAberration.radialIntensity = 3;
  };

  let canvasRef: HTMLCanvasElement | null = null;
  let scene: BABYLON.Scene;
  let camera: BABYLON.ArcRotateCamera;

  let animations: BABYLON.AnimationGroup[] = [];
  let animationIndex = 0;
  let animationName = '';

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
    animations = sceneProps.animations;
    camera = defaultCamera;

    scene.executeWhenReady(() => {
      loadingProgress = 100;
      onLoadingFinish?.();
      showMeiIntroAnimation();
    });

    engine.runRenderLoop(() => {
      scene.render();
    });

    const resizeBabylon = () => {
      engine.resize();
      repositionMei();
    };
    window.addEventListener('resize', resizeBabylon);

    return () => {
      engine.dispose();
      window.removeEventListener('resize', resizeBabylon);
    };
  });

  const animateCameraToNewTarget = (newTarget: BABYLON.Vector3) => {
    const ease = new BABYLON.CubicEase();
    ease.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);

    BABYLON.Animation.CreateAndStartAnimation(
      'camera-travel',
      camera,
      'target',
      30,
      60,
      camera.target,
      newTarget,
      BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT,
      ease
    );
  };

  const repositionMei = () => {
    let newLocation: BABYLON.Vector3;

    if (isMobileScreen()) {
      newLocation = new BABYLON.Vector3(0, 1.15, 0);
    } else if (isTabletPortraitScreen()) {
      newLocation = new BABYLON.Vector3(-0.3, 1.2, 0);
    } else if (isTabletScreen()) {
      newLocation = new BABYLON.Vector3(-0.6, 1.2, 0);
    } else {
      newLocation = new BABYLON.Vector3(-0.85, 1.3, 0);
    }

    animateCameraToNewTarget(newLocation);
  };

  const showMeiIntroAnimation = () => {
    camera.target = new BABYLON.Vector3(0, 1.3, 0);
    scene.getAnimationGroupByName('Idle03')?.stop();
    scene.getAnimationGroupByName('Viewing Mirror')?.start(false, 1, 0, 750, false);

    animations[1].onAnimationEndObservable.add(() => {
      scene.getAnimationGroupByName('Idle03')?.start(true);
      setTimeout(() => {
        repositionMei();
      }, 500);
      onIntroAnimationFinish?.();
    });
  };

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
</script>

{#if showDebug}
  <button class="animateButton" on:click={nextAnimation}>Select next animation</button>
  <button class="animateButton" on:click={toggleAnimation}>Toggle start/stop</button>
  <div class="animationName">Current animation: {animationName}</div>
{/if}

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
