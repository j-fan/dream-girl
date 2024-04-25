<script lang="ts">
  import type { FormEventHandler } from 'svelte/elements';

  export let placeholder: string | undefined = undefined;
  export let value: string;
  export let type: 'text' | 'number' = 'text';

  const handleInput: FormEventHandler<HTMLInputElement> = (e) => {
    const newValue = e.currentTarget.value;

    if (type === 'number') {
      let numericOnly = e.currentTarget.value.replace(/[^0-9]/g, '');
      numericOnly = numericOnly.replace(/^0+/, '');
      value = numericOnly;
    } else {
      value = newValue;
    }
  };
</script>

<input
  type="text"
  inputmode={type === 'number' ? 'numeric' : undefined}
  {placeholder}
  bind:value
  on:input={handleInput}
/>

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
