<script lang="ts">
  import '../app.css';
  import { goto } from '$app/navigation';
  import InactivityTimeout from '$lib/components/inactivity-timeout.svelte';
  import { FirebaseApp } from 'sveltefire';
  import { anonymousId, coinBalance, quizAnswers } from '$lib/stores/user';
  import { onMount } from 'svelte';

  import { auth, firestore, initialiseFirebase } from '$lib/firebase/firebase';
  import FloatingButtons from '$lib/components/floating-buttons.svelte';

  // Initialize Firebase
  initialiseFirebase();

  const title = 'Dream Girl';
  const description = 'TODO: description';
  const socialMediaImage = '';
  const websiteLink = 'https://j-fan.github.io/dream-girl';

  onMount(() => {
    generateNewUser();
  });

  const onTimeout = () => {
    generateNewUser();
    goto('/');
  };

  const generateNewUser = () => {
    anonymousId.set(window.crypto.randomUUID());
    quizAnswers.set([]);
    coinBalance.set(1000);
  };
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
  <InactivityTimeout {onTimeout} maxMinutes={60} />
  <main>
    <slot />
  </main>
</FirebaseApp>
<FloatingButtons />

<style>
  main {
    position: relative;
    width: 100%;
    height: 100%;
  }
</style>
