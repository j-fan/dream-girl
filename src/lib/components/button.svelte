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

  @media only screen and (max-width: 420px) {
    button {
      font-size: 1rem;
    }
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
    backdrop-filter: blur(10px);
  }

  button.dark-bg:hover,
  button.dark-bg:active,
  button.dark-bg:focus {
    outline: 2px dotted var(--c-white);
  }
</style>
