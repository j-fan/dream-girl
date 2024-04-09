<script lang="ts">
  import { onMount } from 'svelte';
  import * as BABYLON from 'babylonjs';
  import { fade } from 'svelte/transition';

  let canvasRef: HTMLCanvasElement | null = null;
  let scene: BABYLON.Scene;

  const FRAMES_PER_POINT = 30;
  /**
   * How many points on the path that the camera will animate along
   */
  let numCameraPathPoints = 0;
  /**
   * At what point on the path the camera is at
   */
  let currentCameraPoint = 0;

  onMount(() => {
    const engine = new BABYLON.Engine(canvasRef, true);
    scene = new BABYLON.Scene(engine);

    // Setup camera
    const camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 2, -20), scene);
    camera.attachControl(canvasRef, true);

    // Setup lighting
    const light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.7;

    // Add sphere
    const sphere = BABYLON.MeshBuilder.CreateSphere('sphere', { diameter: 2, segments: 32 }, scene);
    sphere.position.y = 1;

    // Add ground
    BABYLON.MeshBuilder.CreateGround('ground', { width: 20, height: 20 }, scene);

    // Create path for camera to follow
    const path = [
      new BABYLON.Vector3(0, 2, -20),
      new BABYLON.Vector3(0, 2, -40),
      new BABYLON.Vector3(0, 10, -40),
      new BABYLON.Vector3(0, 2, -20)
    ];
    numCameraPathPoints = path.length;

    // Animate camera along the path
    const animation = new BABYLON.Animation(
      'cameraAnimation',
      'position',
      30,
      BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
      BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
    );
    // Set the easing function of this animation
    const easingFunction = new BABYLON.SineEase();
    easingFunction.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
    animation.setEasingFunction(easingFunction);

    const keys = [
      { frame: 0, value: path[0] },
      { frame: 30, value: path[1] },
      { frame: 60, value: path[2] },
      { frame: 90, value: path[3] }
    ];

    animation.setKeys(keys);
    camera.animations.push(animation);

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

  const progressCameraAnimation = () => {
    if (currentCameraPoint < numCameraPathPoints) {
      const currentFrame = currentCameraPoint * FRAMES_PER_POINT;
      const endFrame = Math.min(
        (currentCameraPoint + 1) * FRAMES_PER_POINT,
        numCameraPathPoints * FRAMES_PER_POINT
      );

      scene.beginAnimation(scene.getCameraByName('camera1'), currentFrame, endFrame, false);

      currentCameraPoint += 1;
      if (currentCameraPoint >= numCameraPathPoints - 1) {
        currentCameraPoint = 0;
      }
    }
  };
</script>

<canvas bind:this={canvasRef} out:fade={{ duration: 500 }} />
<button class="animateButton" on:click={progressCameraAnimation}>Animate</button>

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
</style>
