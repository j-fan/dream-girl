<script lang="ts">
  import { onMount } from 'svelte';
  import '@babylonjs/loaders/glTF';
  import * as BABYLON from '@babylonjs/core';
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
    const camera = new BABYLON.UniversalCamera('camera1', new BABYLON.Vector3(0, 2, -20), scene);
    camera.attachControl(canvasRef, true);

    // Setup lighting
    const light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.7;

    // Add sphere
    const sphere = BABYLON.MeshBuilder.CreateSphere('sphere', { diameter: 2, segments: 32 }, scene);
    sphere.position.y = 1;

    // Add ground
    BABYLON.MeshBuilder.CreateGround('ground', { width: 20, height: 20 }, scene);

    // Load camera path from GLTF file with a mesh called "camera_path"
    // Note to self: Do not export this file from Blender with +Y up, the negative numbers are lost
    BABYLON.SceneLoader.ImportMesh('', '/assets3d/test-path.gltf', '', scene, (meshes) => {
      const mesh = meshes.find((mesh) => mesh.name === 'camera_path');

      if (mesh) {
        // Convert the raw vertices data to Vector3 points that describe the camera path
        const vertices = mesh.getVerticesData(BABYLON.VertexBuffer.PositionKind) || [];
        const cameraPath: BABYLON.Vector3[] = [];
        for (let i = 0; i < vertices.length / 3; i++) {
          let pos = new BABYLON.Vector3(0, 0, 0);
          pos.x = vertices[3 * i];
          pos.y = vertices[3 * i + 2]; // Blender swaps the y & z axis
          pos.z = vertices[3 * i + 1];
          cameraPath.push(pos);
        }
        cameraPath.push(cameraPath[0]);

        // Set the maximum number of possible points
        numCameraPathPoints = cameraPath.length;

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

        const keys = cameraPath.map((vertex, index) => ({
          frame: index * FRAMES_PER_POINT,
          value: cameraPath[index]
        }));

        animation.setKeys(keys);
        camera.position = cameraPath[0];
        camera.animations.push(animation);
      } else {
        throw new Error('camera_path mesh does not exist in test-path.gltf file');
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

<!-- <img src="/icon/icon-192x192.png" /> -->
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
