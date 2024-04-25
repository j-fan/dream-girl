<script lang="ts">
  import type { HTMLButtonAttributes } from 'svelte/elements';

  export let props: HTMLButtonAttributes | undefined = undefined;
</script>

<button {...props} on:click>
  <slot />
</button>

<style>
  button {
    font-size: 1.5rem;
    color: var(--c-white);
    background: transparent;
    border: 1px solid var(--c-white);
    border-radius: 2rem;
    padding: 0.5rem 1rem;
  }

  button:hover {
    background-color: var(--c-white-semi);
    cursor: pointer;
  }
</style>
