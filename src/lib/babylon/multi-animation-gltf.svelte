<script lang="ts">
  import { onMount } from 'svelte';
  import '@babylonjs/loaders/glTF';
  import * as BABYLON from '@babylonjs/core';
  import { fade } from 'svelte/transition';

  /**
   * The image used for lighting and reflections on objects
   *
   * For best performance, convert your .hdr file
   * into .env with these instructions:
   * https://doc.babylonjs.com/features/featuresDeepDive/materials/using/HDREnvironment#creating-a-compressed-environment-texture-using-the-sandbox
   */
  export let hdriLightingFile = 'peppermint_blue.env';
  /**
   * The image used for rendering the background
   */
  export let hdriBackgroundFile = 'gradient.env';
  export let backgroundBlur = 0.1;
  /**
   * A GLTF or GLB file that should have exactly one animated Camera within it.
   * It should be exported from Blender with the "Group By NLA Track" option ticked
   * so that all animations are kept separate.
   */
  export let animatedMeshesFile = 'test-anim.gltf';
  export let transformAnimatedMeshes: ((scene: BABYLON.Scene) => void) | undefined = undefined;
  /**
   * Whether or not to blend between animations. Might cause bugs.
   */
  export let hasAnimationBlending: boolean = false;
  /**
   * The frame rate of the animations you created in your 3D software
   */
  export let fileFrameRate = 30;
  /**
   * How long in frames does it take for every mesh
   * to complete a single animation cycle. This
   * is needed to decouple mesh animations from
   * the camera animation, which does not loop
   * and may have a different animation duration.
   */
  export let meshAnimationLoopTime = 100;
  /**
   * How many points of interest in the camera animation
   * that we should stop at. It assumes there is one
   * point at every `fileFrameRate` frame.
   */
  export let maxPointsOfInterest = 6;

  let canvasRef: HTMLCanvasElement | null = null;
  let scene: BABYLON.Scene;

  let animations: BABYLON.AnimationGroup[] = [];
  let cameraAnimation: BABYLON.AnimationGroup;
  let animationIndex = 0;
  let animationName = '';

  let cameraAnimCounter = 0;

  // The GLTF import defaults the frame rate to 60
  const GLTF_FRAME_RATE = 60;
  let FPS_FACTOR = GLTF_FRAME_RATE / fileFrameRate;

  onMount(() => {
    const engine = new BABYLON.Engine(canvasRef, true);
    scene = new BABYLON.Scene(engine);

    // Setup camera
    const camera = new BABYLON.UniversalCamera('camera1', new BABYLON.Vector3(0, 0, -5), scene);
    camera.attachControl(canvasRef, true);

    // Setup HDRI textures
    const hdrLighting = BABYLON.CubeTexture.CreateFromPrefilteredData(
      `/assets3d/${hdriLightingFile}`,
      scene
    );
    const hdrBackground = BABYLON.CubeTexture.CreateFromPrefilteredData(
      `/assets3d/${hdriBackgroundFile}`,
      scene
    );

    // Load GLTF file with multiple animations.
    // Animation groups correspond to the NLA tracks. To create the shape key
    // animations, go to Dope Sheet view and then choose Shape Key Editor in
    // the dropdown immediately to the right. Create multiple actions and click
    // "Push Down" to add it to the NLA tracks.
    // Actions or shape key animations will play together in the GLTF if they have
    // the same name on the NLA track.
    BABYLON.SceneLoader.Append('/assets3d/', animatedMeshesFile, scene, (scene) => {
      // Enable animation blending for all animations
      if (hasAnimationBlending) {
        scene.animationPropertiesOverride = new BABYLON.AnimationPropertiesOverride();
        scene.animationPropertiesOverride.enableBlending = true;
        scene.animationPropertiesOverride.blendingSpeed = 0.05;
      }

      // Save the animation objects for triggering later
      animations = scene.animationGroups;

      // Start all animations except for the camera by default
      scene.animationGroups.forEach((anim) => {
        if (anim.name.includes('CameraAction')) {
          cameraAnimation = anim;
        } else {
          anim.start(true, 1, 0, meshAnimationLoopTime * FPS_FACTOR);
        }
      });

      transformAnimatedMeshes?.(scene);

      // Set HDRI textures for lighting and background
      scene.createDefaultSkybox(hdrBackground, true, 10000, backgroundBlur);
      scene.environmentTexture = hdrLighting;

      if (scene.cameras.length === 2) {
        // Use the camera from the GLTF file
        scene.activeCamera = scene.cameras[1];
      } else {
        console.error(
          scene.cameras.length < 2
            ? 'Failed to find a camera in the GLTF file'
            : 'Please ensure you have exactly one camera in your GLTF file'
        );
      }
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

  const toggleCameraAnimation = () => {
    if (!cameraAnimation) {
      console.error(
        'Failed to find a camera animation in your file. Open the NLA track view in Blender and make sure you have an action named CameraAction in it and attached to camera object'
      );
      return;
    }

    cameraAnimation.start(
      false,
      1,
      cameraAnimCounter * 30 * FPS_FACTOR,
      (cameraAnimCounter + 1) * 30 * FPS_FACTOR
    );
    cameraAnimCounter++;
    if (cameraAnimCounter === maxPointsOfInterest - 1) {
      cameraAnimCounter = 0;
    }
  };
</script>

<!-- <img src="/icon/icon-192x192.png" /> -->
<canvas bind:this={canvasRef} out:fade={{ duration: 500 }} />
<button class="animateButton" on:click={nextAnimation}>Select next animation</button>
<button class="animateButton" on:click={toggleAnimation}>Toggle start/stop</button>
<button class="animateButton" on:click={toggleCameraAnimation}>Toggle camera animation</button>

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
