import { cubicInOut } from 'svelte/easing';

export function fadeScale(
  node: HTMLElement,
  { delay = 0, duration = 200, easing = cubicInOut, baseScale = 0 }
) {
  const o = +getComputedStyle(node).opacity;
  const m = getComputedStyle(node).transform.match(/scale\(([0-9.]+)\)/);
  const s = m ? parseInt(m[1]) : 1;
  const is = 1 - baseScale;

  return {
    delay,
    duration,
    css: (t: number) => {
      const eased = easing(t);
      return `opacity: ${eased * o}; transform: scale(${eased * s * is + baseScale})`;
    }
  };
}

export function scale(
  node: HTMLElement,
  { delay = 0, duration = 200, easing = cubicInOut, baseScale = 0 }
) {
  const m = getComputedStyle(node).transform.match(/scale\(([0-9.]+)\)/);
  const s = m ? parseInt(m[1]) : 1;
  const is = 1 - baseScale;

  return {
    delay,
    duration,
    css: (t: number) => {
      const eased = easing(t);
      return `transform: scale(${eased * s * is + baseScale})`;
    }
  };
}
