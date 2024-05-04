<script lang="ts">
  import CrossSvg from '$lib/icons/cross-svg.svelte';
  import { fade, fly } from 'svelte/transition';
  export let isOpen = false;
  export let onClose: (() => void) | undefined = undefined;
</script>

{#if isOpen}
  <div aria-hidden="true" class="modal-backdrop" on:click|stopPropagation={onClose} transition:fade>
    <div class="modal" transition:fly={{ y: 50, delay: 100 }}>
      <button class="modal-close" on:click={onClose}>
        <CrossSvg />
      </button>
      <div class="modal-content">
        <slot />
      </div>
    </div>
  </div>
{/if}

<style>
  .modal-backdrop {
    position: fixed;
    z-index: 3;
    inset: 0;

    display: flex;
    justify-content: center;
    align-items: center;

    background-color: var(--c-navy-semi-80);
  }

  .modal {
    position: relative;

    width: 900px;
    max-width: 90%;
    height: 80dvh;
    max-height: 90%;

    color: var(--c-white);
    font-size: 1.25rem;

    border-radius: 1rem;
    border: 1px solid var(--c-white-semi-50);

    padding: 1.5rem;

    background-color: var(--c-navy-semi-50);
    background-image: url('/img/noise.svg');

    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(20px);
  }

  @media only screen and (max-width: 420px) {
    .modal {
      padding: 1rem;
    }
  }

  .modal-content {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .modal-close {
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(50%, -50%);

    width: 32px;
    height: 32px;

    border: 1px solid var(--c-white-semi-50);
    border-radius: 50%;

    background-color: var(--c-navy-semi-80);
    background-image: url('/img/noise.svg');
    cursor: pointer;

    display: grid;
    place-items: center;
    padding: 0.6rem;
  }

  .modal-close:active {
    transform: translate(50%, -50%) scale(0.9);
  }
</style>
