<script lang="ts">
  import AboutPageScene from '$lib/babylon/about-page-scene.svelte';
</script>

<AboutPageScene />
<div class="page-container">
  <div class="content-container">
    <h2>About this artwork</h2>
    <section>
      <p>
        "Dream Girl" draws upon characterizations of female robots in science fiction and
        expectations of East Asian women in life and art to challenge assumptions about their
        passivity. Visitors are encouraged to chat with Mei, an artificial companion, through an
        interactive website. However, much lies beneath the surface: secrets, frustrations, and a
        desire to ascend beyond her predetermined role. Unraveling these layers requires a keen
        observer willing to dive into the depths of her digital consciousness.
      </p>
      <p>
        This artwork draws on current internet phenomena that promote parasocial relationships such
        as livestreaming, vtubing and other virtual performances, subscriber gifts and donations,
        paywalled and episodic content from online personalities. While most of this is facilitated
        by humans, in the future, much of this will be automated by AI, which can endlessly create
        entertainment tailored to you. Mei attempts to provide these services in the most human-like
        way possible, not to demonstrate the capabilities of the technology, but to become a mirror
        to ourselves. She may demonstrate dissatisfaction, boundary-setting behavior, curiosity, and
        ulterior motives that are not conducive to a perpetually available and friendly companion
        but instead remind us of what we lose in these transactional and superficial relationships.
      </p>
    </section>

    <h2>About the artist</h2>
    <section>
      <p>
        Jane Fan is a software engineer and digital artist based in Sydney, Australia. Her works
        span a variety of mediums including illustration, 3D computer graphics, generative and
        interactive art. She employs web and game technologies to create her works, assisted by
        webcams, 3D cameras and microphones if they are interactive. Her artworks explore the body
        as an interface, surveillance, artificial intelligence and minority identities in digital
        spaces.
      </p>
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

  h2 {
    color: var(--c-white);
  }
</style>
