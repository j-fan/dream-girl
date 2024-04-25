<script lang="ts">
  import type { HTMLInputAttributes } from 'svelte/elements';

  export let placeholder: string | undefined = undefined;
</script>

<input type="text" {placeholder} />

<style>
  input {
    font-size: 1.5rem;
    color: var(--c-white);
    background: transparent;
    border: 1px solid var(--c-white-semi-50);
    border-radius: 2rem;
    padding: 0.5rem 1rem;
    outline: none;
  }

  input:hover,
  input:active,
  input:focus {
    outline: 2px dotted var(--c-white);
    cursor: pointer;
  }
</style>
