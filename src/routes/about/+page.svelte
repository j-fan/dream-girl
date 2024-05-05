<script lang="ts">
  import AboutPageScene from '$lib/babylon/about-page-scene.svelte';
  import { artistDescription, artworkDescription, credits } from '$lib/components/about-content';
  import ArtCreditItem from '$lib/components/art-credit-item.svelte';
</script>

<AboutPageScene />
<div class="page-container">
  <div class="content-container">
    <h2>About this artwork</h2>
    <section>
      <p>
        {artworkDescription}
      </p>
    </section>

    <h2>About the artist</h2>
    <section>
      <p>
        {artistDescription}
      </p>
    </section>

    <h2>Credits</h2>
    <section>
      <p>Some 3D models in this artwork have been sourced from generous artists on Sketchfab.</p>
      {#each credits as credit}
        <ArtCreditItem {...credit} />
      {/each}
    </section>
  </div>
</div>

<style>
  .page-container {
    display: flex;
    justify-content: center;
  }

  .content-container {
    max-width: 100%;
    width: 1000px;
    margin: 3rem;
  }

  section {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    color: var(--c-white);
    font-size: 1.25rem;

    border-radius: 1rem;
    border: 1px solid var(--c-white-semi-50);

    padding: 1rem;
    margin-bottom: 2rem;

    background-color: var(--c-navy-semi-50);
    background-image: url('/img/noise.svg');

    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(20px);
  }

  p {
    white-space: pre-line;
  }

  h2 {
    color: var(--c-white);
  }
</style>
