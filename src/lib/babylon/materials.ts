import * as BABYLON from '@babylonjs/core';

export const createRainbowGlassMaterial = (scene: BABYLON.Scene) => {
  // Iridescent glass material
  const material = new BABYLON.PBRMetallicRoughnessMaterial('glass_rainbow', scene);

  // Glass refraction component
  material.metallic = 0;
  material.roughness = 0;
  material.subSurface.isRefractionEnabled = true;
  material.subSurface.indexOfRefraction = 1.3;
  material.subSurface.refractionTexture = null;

  // Iridescence
  material.iridescence.isEnabled = true;
  material.iridescence.indexOfRefraction = 2.0;

  // dispersion
  material.subSurface.isDispersionEnabled = true;
  material.subSurface.dispersion = 5.0;

  return material;
};

export const createAlphaGlassMaterial = (scene: BABYLON.Scene, alpha = 0.3) => {
  // Iridescent glass material
  const material = new BABYLON.PBRMetallicRoughnessMaterial('glass_alpha', scene);

  // Glass refraction component
  material.metallic = 0;
  material.roughness = 0;
  material.subSurface.isRefractionEnabled = true;
  material.subSurface.indexOfRefraction = 1.3;
  material.subSurface.refractionTexture = null;

  // Iridescence
  material.iridescence.isEnabled = true;
  material.iridescence.indexOfRefraction = 2.0;

  // dispersion
  material.subSurface.isDispersionEnabled = true;
  material.subSurface.dispersion = 5.0;

  // alpha to make it truly trasnparent (unlike the rainbow glass material)
  material.alpha = alpha;

  return material;
};
