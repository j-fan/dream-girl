<script lang="ts">
  import { onMount } from 'svelte';
  import '@babylonjs/loaders/glTF';
  import * as BABYLON from '@babylonjs/core';
  import { fade } from 'svelte/transition';

  /**
   * For best performance, convert your .hdr file
   * into .env with these instructions:
   * https://doc.babylonjs.com/features/featuresDeepDive/materials/using/HDREnvironment#creating-a-compressed-environment-texture-using-the-sandbox
   */
  export let hdriLightingFile = 'test-env-lighting.env';
  export let animatedMeshesFile = 'test-anim-2.gltf';
  export let transformAnimatedMeshes: ((scene: BABYLON.Scene) => void) | undefined = undefined;

  let canvasRef: HTMLCanvasElement | null = null;
  let scene: BABYLON.Scene;

  let animations: BABYLON.AnimationGroup[] = [];
  let animationIndex = 0;
  let animationName = '';

  onMount(() => {
    const engine = new BABYLON.Engine(canvasRef, true);
    scene = new BABYLON.Scene(engine);

    // Setup camera
    const camera = new BABYLON.UniversalCamera('camera1', new BABYLON.Vector3(0, 0, -5), scene);
    camera.attachControl(canvasRef, true);

    // Setup HDRI lighting
    const hdrTexture = BABYLON.CubeTexture.CreateFromPrefilteredData(
      `/assets3d/${hdriLightingFile}`,
      scene
    );
    scene.environmentTexture = hdrTexture;

    // Load GLTF file with multiple animations.
    // Animation groups correspond to the NLA tracks. To create the shape key
    // animations, go to Dope Sheet view and then choose Shape Key Editor in
    // the dropdown immediately to the right. Create multiple actions and click
    // "Push Down" to add it to the NLA tracks.
    // Actions or shape key animations will play together in the GLTF if they have
    // the same name on the NLA track.
    BABYLON.SceneLoader.Append('/assets3d/', animatedMeshesFile, scene, (scene) => {
      // Enable animation blending for all animations
      scene.animationPropertiesOverride = new BABYLON.AnimationPropertiesOverride();
      scene.animationPropertiesOverride.enableBlending = true;
      scene.animationPropertiesOverride.blendingSpeed = 0.05;

      // Save the animation objects for triggering later
      animations = scene.animationGroups;

      // Somehow this breaks camera animations
      // // Stop all animations by default
      // scene.animationGroups.forEach((animation) => {
      //   animation.stop();
      // });

      transformAnimatedMeshes?.(scene);

      // Set HDRI as background
      scene.createDefaultSkybox(hdrTexture);
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

  const triggerNextAnimation = () => {
    animations[animationIndex].play();
    animationName = animations[animationIndex].name;

    if (animationIndex === animations.length - 1) {
      animationIndex = 0;
    } else {
      animationIndex++;
    }
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

<!-- <img src="/icon/icon-192x192.png" /> -->
<canvas bind:this={canvasRef} out:fade={{ duration: 500 }} />
<button class="animateButton" on:click={triggerNextAnimation}>Animate</button>
<button class="animateButton" on:click={toggleAnimation}>Toggle start/stop</button>

<div class="animationName">Current animation: {animationName}</div>

<style>
  canvas {
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100%;
    /* pointer-events: none; */
    z-index: -1;
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
