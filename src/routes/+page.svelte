<script lang="ts">
  import { anonymousId } from '$lib/stores/user';
  import { onMount } from 'svelte';

  onMount(() => {
    anonymousId.set(window.crypto.randomUUID());
  });
</script>

<svelte:head>
  <title>Dream Girl home page</title>
</svelte:head>

<p>Home page</p>

<style>
  p {
    color: pink;
  }
</style>
