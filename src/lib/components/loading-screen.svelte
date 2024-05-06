<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, scale } from 'svelte/transition';
  import Button from './button.svelte';
  import { Circle } from 'svelte-loading-spinners';
  /**
   * Loading progress value 0 - 100
   */
  export let progress = 0;
  /**
   * Whether to automatically hide the progress scene
   * when progress is 100%
   */
  export let autoProceed = false;

  const bgImgSrc = '/img/loading-screen.jpg';
  let showbgImage = false;
  $: hasEntered = autoProceed ? progress === 100 : false;
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
  <div class="background" transition:fade>
    {#if showbgImage}
      <div class="loading-screen-image" transition:fade={{ duration: 1000 }} />
    {/if}
  </div>

  <div class="content" transition:scale={{ duration: 500 }}>
    <picture>
      <source srcset="img/logo.webp" type="image/webp" />
      <source srcset="/img/logo.png" type="image/png" />
      <img class="logo" src="/img/logo.png" alt="Dream girl logo" />
    </picture>
    <div class="bottom-content">
      {#if isReady}
        <div transition:scale>
          <Button
            on:click={() => {
              hasEntered = true;
            }}>Enter</Button
          >
        </div>
      {:else}
        <div class="loading-container">
          <!-- Loading is basically instant thanks to PWA cache -->
          <!-- <span class="progress-amount">{progress.toFixed(0)}%</span> -->
          <Circle size="100" color="#FFFFFF" unit="px" duration="1s" />
        </div>
      {/if}
    </div>
  </div>
{/if}

<style>
  .background {
    position: fixed;
    inset: 0;
    z-index: 2;

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
    z-index: 2;

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

  .loading-container {
    position: relative;
    display: flex;
    justify-content: center;
  }

  .progress-amount {
    font-size: 1.5rem;
    color: var(--c-white);

    position: absolute;
    top: 35%;
  }

  .bottom-content {
    padding-top: 2rem;
    padding-bottom: 4rem;
    height: 100px;
  }
</style>
