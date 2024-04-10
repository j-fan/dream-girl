<script lang="ts">
  import { onMount } from 'svelte';
  import '@babylonjs/loaders/glTF';
  import * as BABYLON from '@babylonjs/core';
  import { fade } from 'svelte/transition';

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

    // Setup lighting
    const light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.7;

    // Load GLTF file with multiple animations.
    // Animation groups correspond to the NLA tracks. To create the shape key
    // animations, go to Dope Sheet view and then choose Shape Key Editor in
    // the dropdown immediately to the right. Create multiple actions and click
    // "Push Down" to add it to the NLA tracks.
    BABYLON.SceneLoader.Append('/assets3d/', 'test-anim.gltf', scene, (scene) => {
      scene.meshes.forEach((mesh) => {
        mesh.rotation = new BABYLON.Vector3(0, 1, 0);
      });

      // Enable animation blending for all animations
      scene.animationPropertiesOverride = new BABYLON.AnimationPropertiesOverride();
      scene.animationPropertiesOverride.enableBlending = true;
      scene.animationPropertiesOverride.blendingSpeed = 0.05;
      // Stop all animations by default
      scene.animationGroups.forEach((animation) => {
        animation.stop();
      });
      // Save the animation objects for triggering later
      animations = scene.animationGroups;
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
    if (animations.length === 0) {
      return;
    }

    if (animationIndex < animations.length - 1) {
      animationIndex++;
    } else {
      animationIndex = 0;
    }

    animations[animationIndex].play();
    animationName = animations[animationIndex].name;
  };
</script>

<!-- <img src="/icon/icon-192x192.png" /> -->
<canvas bind:this={canvasRef} out:fade={{ duration: 500 }} />
<button class="animateButton" on:click={triggerNextAnimation}>Animate</button>
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
    position: absolute;
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
