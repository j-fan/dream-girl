<script lang="ts">
  import CrossSvg from '$lib/icons/cross-svg.svelte';
  import { fade, fly } from 'svelte/transition';
  export let isOpen = false;
  export let onClose: (() => void) | undefined = undefined;
</script>

{#if isOpen}
  <div aria-hidden="true" class="modal-backdrop" on:click|stopPropagation={onClose} transition:fade>
    <div
      aria-hidden="true"
      class="modal"
      transition:fly={{ y: 50, delay: 100 }}
      on:click|stopPropagation
    >
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
    max-width: 90dvw;
    max-height: 90dvh;

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

  @media only screen and (max-width: 430px) {
    .modal {
      padding: 1rem;
    }
  }

  .modal-content {
    width: 100%;

    min-height: min-content; /* Set minimum height to fit content */
    max-height: calc(90dvh - 3rem); /* Limit maximum height to 90% of viewport height */
    overflow-y: auto; /* Enable vertical scrolling */
    overflow-x: hidden;
  }

  .modal-close {
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(50%, -50%);

    width: 36px;
    height: 36px;

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
