import '@babylonjs/loaders/glTF';
import * as BABYLON from '@babylonjs/core';

type Options = {
  /**
   * The image used for lighting and reflections on objects
   *
   * For best performance, convert your .hdr file
   * into .env with these instructions:
   * https://doc.babylonjs.com/features/featuresDeepDive/materials/using/HDREnvironment#creating-a-compressed-environment-texture-using-the-sandbox
   */
  hdriLightingFile?: string;
  /**
   * The image used for rendering the background
   */
  hdriBackgroundFile?: string;
  backgroundBlur?: number;
  /**
   * A GLTF or GLB file that should have exactly one animated camera that has
   * an action name containing "Camera". Check this by selecting the camera
   * and looking in the NLA viewer to see its action name highlighted.
   *
   * It should be exported from Blender with the "Group By NLA Track" option ticked
   * so that all animations are kept separate.
   *
   * Animated camera with constraints may not be exported correctly. In that
   * case, select the camera in Blender and choose "Bake action" with the
   * options 'Visual keying' and "Clear constraints" selected. The go into
   * the NLA viewer and rename the action back to "Camera".
   */
  animatedMeshesFile?: string;
  /**
   * Apply additional changes the scene after it is initialized
   */
  transformScene?: (scene: BABYLON.Scene) => void;
  /**
   * Whether or not to blend between animations. Might cause bugs.
   */
  hasAnimationBlending?: boolean;
  /**
   * The frame rate of the animations you created in your 3D software
   */
  fileFrameRate?: number;
  /**
   * How long in frames does it take for every mesh
   * to complete a single animation cycle. This
   * is needed to decouple mesh animations from
   * the camera animation, which does not loop
   * and may have a different animation duration.
   */
  meshAnimationLoopTime?: number;
  /**
   * The <canvas> element Babylon will use
   */
  canvasRef: HTMLCanvasElement | null;

  onError?: () => void;
  onProgress?: BABYLON.Nullable<(event: BABYLON.ISceneLoaderProgressEvent) => void>;
  /**
   * Whether to start all the animations (aside from camera) on load
   */
  startAllAnimationsByDefault?: boolean;
};

// The GLTF import defaults the frame rate to 60
const GLTF_FRAME_RATE = 60;

export const initMultiAnimationScene = ({
  hdriLightingFile = 'peppermint_blue.env',
  hdriBackgroundFile = 'gradient.env',
  backgroundBlur = 0.1,
  animatedMeshesFile = 'test-anim.gltf',
  transformScene,
  hasAnimationBlending = false,
  fileFrameRate = 30,
  meshAnimationLoopTime = 100,
  canvasRef,
  onProgress,
  onError,
  startAllAnimationsByDefault = true
}: Options) => {
  const fpsFactor = GLTF_FRAME_RATE / fileFrameRate;
  const animations: BABYLON.AnimationGroup[] = [];
  const cameraAnimations: BABYLON.AnimationGroup[] = [];

  const engine = new BABYLON.Engine(canvasRef, true);
  const scene = new BABYLON.Scene(engine);

  // Do not show default loading screen
  BABYLON.SceneLoaderFlags.ShowLoadingScreen = false;

  // Setup default camera
  const camera = new BABYLON.ArcRotateCamera(
    'camera1',
    1.57,
    1.57,
    1.6,
    new BABYLON.Vector3(0, 1.2, 0),
    scene
  );
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

  /**
   * Load GLTF file with multiple animations.
   * Animation groups correspond to the NLA tracks. To create the shape key
   * animations, go to Dope Sheet view and then choose Shape Key Editor in
   * the dropdown immediately to the right. Create multiple actions and click
   * "Push Down" to add it to the NLA tracks.
   * Actions or shape key animations will play together in the GLTF if they have
   * the same name on the NLA track viewer
   */
  BABYLON.SceneLoader.Append(
    '/assets3d/',
    animatedMeshesFile,
    scene,
    (scene) => {
      // Enable animation blending for all animations if required
      if (hasAnimationBlending) {
        scene.animationPropertiesOverride = new BABYLON.AnimationPropertiesOverride();
        scene.animationPropertiesOverride.enableBlending = true;
        scene.animationPropertiesOverride.blendingSpeed = 0.05;
      }

      // Start all animations except for the camera by default
      scene.animationGroups.forEach((anim) => {
        if (anim.name.toLocaleLowerCase().includes('camera')) {
          cameraAnimations.push(anim);
        } else {
          animations.push(anim);
          if (startAllAnimationsByDefault) {
            anim.start(true, 1, 0, meshAnimationLoopTime * fpsFactor);
          }
        }
      });

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

      transformScene?.(scene);
    },
    onProgress,
    onError
  );

  return {
    scene,
    engine,
    animations,
    cameraAnimations,
    fpsFactor,
    defaultCamera: camera
  };
};
