<script lang="ts">
  import { goto } from '$app/navigation';
  import InactivityTimeout from '$lib/components/inactivity-timeout.svelte';

  const title = 'Dream Girl';
  const description = 'TODO: description';
  const socialMediaImage = '';
  const websiteLink = 'https://j-fan.github.io/dream-girl';

  const onTimeout = () => {
    goto('/');
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

<InactivityTimeout {onTimeout} />
<main>
  <slot />
</main>

<style>
  main {
    width: 100%;
    height: 100%;
  }
</style>
