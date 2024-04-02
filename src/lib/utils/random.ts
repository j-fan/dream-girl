import { createNoise2D } from 'simplex-noise';

export const randomRange = (min = 0, max = 100) => {
  // find diff
  const difference = max - min;

  // generate random number
  let rand = Math.random();

  // multiply with difference
  rand = rand * difference;

  // add with min value
  rand = rand + min;

  return rand;
};

/**
 *
 * @param min Minimum output value
 * @param max Maximum output value
 * @param x Simplex noise x dimension input
 * @param y Simplex noise y dimension input
 * @param seed Random seed from 0 to 1 to generate deterministic output
 * @returns
 */
export const smoothRandomRange = (min = 0, max = 100, x = 0, y = 0, seed = 0) => {
  const difference = max - min;

  const generator = createNoise2D(() => seed);
  let rand = (generator(x, y) + 1) / 2;

  rand = Math.floor(rand * difference);

  rand = rand + min;

  return rand;
};

export const randomBool = () => Math.random() > 0.5;
