<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, scale, slide } from 'svelte/transition';
  import Button from './button.svelte';
  /**
   * Loading progress value 0 - 100
   */
  export let progress = 0;

  const bgImgSrc = '/img/loading-screen.jpg';
  let showbgImage = false;
  let hasEntered = false;
  $: isReady = progress === 100;

  onMount(() => {
    const bgImg = new Image();
    bgImg.onload = function () {
      showbgImage = true;
    };
    // trigger loading
    bgImg.src = bgImgSrc;
  });
</script>

{#if !hasEntered}
  <div class="background" transition:slide={{ axis: 'y', duration: 1000 }}>
    {#if showbgImage}
      <div class="loading-screen-image" transition:fade={{ duration: 1000 }} />
    {/if}
  </div>

  <div class="content" transition:scale={{ duration: 500 }}>
    <img class="logo" src="/img/logo.png" alt="Dream girl logo" />
    <div class="bottom-content">
      {#if isReady}
        <div transition:scale>
          <Button
            on:click={() => {
              console.log('here');
              hasEntered = true;
            }}>Enter</Button
          >
        </div>
      {:else}
        <span class="progress-amount">{progress.toFixed(0)}%</span>
      {/if}
    </div>
  </div>
{/if}

<style>
  .background {
    position: fixed;
    inset: 0;

    background-color: var(--c-navy);
  }

  .loading-screen-image {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;

    background: url('/img/loading-screen.jpg');
    background-size: calc(100vh / 9 * 16) 100vh;
    background-position: center center;
  }

  .content {
    position: fixed;
    inset: 0;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .logo {
    width: 500px;
    max-width: 100%;
    object-fit: contain;
    aspect-ratio: 8 / 5;
  }

  .progress-amount {
    font-size: 2rem;
    color: var(--c-white);
  }

  .bottom-content {
    padding-top: 2rem;
    padding-bottom: 4rem;
    height: 100px;
  }
</style>
