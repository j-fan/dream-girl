<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, scale, slide } from 'svelte/transition';
  import Button from './button.svelte';
  /**
   * Loading progress value 0 - 100
   */
  export let progress = 0;

  let showbgImage = false;
  let hasEntered = false;
  $: isReady = progress === 100;

  onMount(() => {
    showbgImage = true;
  });
</script>

{#if !hasEntered}
  <div class="background" transition:slide={{ axis: 'y', duration: 1000 }}>
    {#if showbgImage}
      <div
        class="loading-screen-image"
        transition:slide={{ axis: 'y', duration: 1000, delay: 1500 }}
      />
    {/if}
  </div>

  <div class="content" transition:scale={{ duration: 500 }}>
    <img class="logo" src="/img/logo.png" alt="Dream girl logo" />
    {#if isReady}
      <div transition:fade>
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

    background-image: url('/img/loading-screen.jpg');
    background-position: center center;
    background-size: cover;
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
    position: relative;
    width: 500px;
    max-width: 100%;
    object-fit: contain;
  }

  .progress-amount {
    position: relative;
    font-size: 3rem;
    color: var(--c-white);
    padding-bottom: 4rem;
  }
</style>
