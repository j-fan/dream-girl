<script lang="ts">
  import { onMount } from 'svelte';

  export let onTimeout: (() => void) | undefined = undefined;
  export let maxMinutes = 5;

  const inactivityTimeout = () => {
    let timeoutId: number;

    const resetTimer = () => {
      clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        onTimeout?.();
      }, 60000 * maxMinutes);
    };
    window.addEventListener('load', resetTimer, true);
    window.addEventListener('mousemove', resetTimer, true);
    window.addEventListener('mousedown', resetTimer, true);
    window.addEventListener('touchstart', resetTimer, true);
    window.addEventListener('touchmove', resetTimer, true);
    window.addEventListener('click', resetTimer, true);
    window.addEventListener('keydown', resetTimer, true);
    window.addEventListener('scroll', resetTimer, true);
  };

  onMount(() => {
    inactivityTimeout();
  });
</script>
