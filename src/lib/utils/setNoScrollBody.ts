import { onMount } from 'svelte';

/**
 * Prevent mobile scroll/bounce behaviour while dragging
 */
export const setNoScrollBody = () => {
  onMount(() => {
    document.body.className = 'no-scroll';
    return () => {
      document.body.className = '';
    };
  });
};
