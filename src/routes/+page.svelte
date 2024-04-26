<script lang="ts">
  import IntroScene from '$lib/babylon/intro-scene.svelte';
  import { anonymousId } from '$lib/stores/user';
  import { onMount } from 'svelte';

  onMount(() => {
    anonymousId.set(window.crypto.randomUUID());
  });
</script>

<svelte:head>
  <title>Dream Girl home page</title>
</svelte:head>

<IntroScene showDebug={false} />
