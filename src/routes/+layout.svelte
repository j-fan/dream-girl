<script lang="ts">
  import { goto } from '$app/navigation';
  import InactivityTimeout from '$lib/components/inactivity-timeout.svelte';
  import { Collection, FirebaseApp } from 'sveltefire';

  import { onMount } from 'svelte';
  import { anonymousId } from '$lib/stores/user';
  import { auth, firestore, initialiseFirebase } from '$lib/firebase/firebase';
  import type { PageData } from './$types';

  // Initialize Firebase
  initialiseFirebase();

  const title = 'Dream Girl';
  const description = 'TODO: description';
  const socialMediaImage = '';
  const websiteLink = 'https://j-fan.github.io/dream-girl';

  const onTimeout = () => {
    anonymousId.set(window.crypto.randomUUID());
    goto('/');
  };

  onMount(() => {
    anonymousId.set(window.crypto.randomUUID());
  });
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />

  <!-- Primary Meta Tags -->
  <title>{title}</title>
  <meta name="title" content={title} />
  <meta name="description" content={description} />

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content={websiteLink} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={socialMediaImage} />

  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content={websiteLink} />
  <meta property="twitter:title" content="Chi Fan" />
  <meta property="twitter:description" content={description} />
  <meta property="twitter:image" content={socialMediaImage} />
</svelte:head>

<FirebaseApp {auth} {firestore}>
  <InactivityTimeout {onTimeout} />
  <main>
    <slot />
  </main>
</FirebaseApp>

<style>
  main {
    width: 100%;
    height: 100%;
  }
</style>
