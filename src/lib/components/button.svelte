<script lang="ts">
  export let disabled: boolean = false;
  export let background: 'dark' | 'none' = 'none';
  export let type: 'submit' | 'button' = 'button';
</script>

<button {type} {disabled} on:click class={background === 'dark' ? 'dark-bg' : undefined}>
  <slot />
</button>

<style>
  button {
    font-size: 1.25rem;
    color: var(--c-white);
    background: transparent;
    border: 1px solid var(--c-white-semi-50);
    border-radius: 2rem;
    padding: 0.5rem 1rem;
    min-width: 54px;
  }

  button:hover,
  button:active,
  button:focus {
    outline: 2px dotted var(--c-white);
    background-color: var(--c-white-semi-30);
    cursor: pointer;
  }

  button:active {
    transform: scale(0.9);
  }

  .dark-bg {
    background-color: var(--c-navy-semi-50);
    background-image: url('/img/noise.svg');

    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
  }

  button.dark-bg:hover,
  button.dark-bg:active,
  button.dark-bg:focus {
    background-color: var(--c-navy-semi-50);
    background-image: url('/img/noise.svg');

    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);

    outline: 2px dotted var(--c-white);
  }

  button:disabled {
    opacity: 50%;
    cursor: not-allowed;
    outline: none;
    background-color: var(--c-navy-semi-50);
  }
</style>
