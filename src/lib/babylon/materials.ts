import * as BABYLON from '@babylonjs/core';

export const createRainbowGlassMaterial = (scene: BABYLON.Scene) => {
  // Iridescent glass material
  const material = new BABYLON.PBRMetallicRoughnessMaterial('pbr', scene);

  // Glass refraction component
  material.metallic = 0;
  material.roughness = 0;
  material.subSurface.isRefractionEnabled = true;
  material.subSurface.indexOfRefraction = 1.3;
  material.subSurface.refractionTexture = null;

  // Iridescence
  material.iridescence.isEnabled = true;
  material.iridescence.indexOfRefraction = 2.0;

  // Anisotropy
  material.anisotropy.isEnabled = true;
  material.anisotropy.direction = new BABYLON.Vector2(0.5, -0.5);

  return material;
};
