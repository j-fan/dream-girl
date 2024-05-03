<script lang="ts">
  import type { FormEventHandler } from 'svelte/elements';

  export let placeholder: string | undefined = undefined;
  export let value: string | undefined = undefined;
  export let type: 'text' | 'number' = 'text';
  export let name: string | undefined = undefined;
  export let background: 'dark' | 'none' = 'none';

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
  {name}
  {placeholder}
  inputmode={type === 'number' ? 'numeric' : undefined}
  class={background === 'dark' ? 'dark-bg' : undefined}
  bind:value
  on:input={handleInput}
  autocomplete="off"
/>

<style>
  input {
    width: 100%;
    font-size: 1.25rem;
    color: var(--c-white);
    background: transparent;
    border: 1px solid var(--c-white-semi-50);
    border-radius: 2rem;
    padding: 0.5rem 1rem;
    outline: none;
  }

  @media only screen and (max-width: 420px) {
    input {
      font-size: 1rem;
    }
  }

  input:hover,
  input:active,
  input:focus {
    outline: 2px dotted var(--c-white);
    cursor: pointer;
  }

  .dark-bg {
    background-color: var(--c-navy-semi-50);
    backdrop-filter: blur(10px);
    background-image: url('/img/noise.svg');
  }
</style>
