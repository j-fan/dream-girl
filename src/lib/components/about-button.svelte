<script lang="ts">
  import QuestionSvg from '$lib/icons/question-svg.svelte';
  import Modal from './modal.svelte';

  let isModalOpen = false;
</script>

<button
  type="button"
  id="about-button"
  on:click={() => {
    isModalOpen = true;
  }}
>
  <QuestionSvg />
</button>
<Modal
  isOpen={isModalOpen}
  onClose={() => {
    isModalOpen = false;
  }}
>
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
</Modal>

<style>
  button {
    position: fixed;
    z-index: 2;
    right: 0;
    top: 0;
    margin: 1rem;
    height: 32px;
    width: 32px;
    border: none;
    background-color: var(--c-navy);
    cursor: pointer;
    border-radius: 50%;
  }

  .content-container {
    height: 100%;
  }

  section {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    color: var(--c-white);
    font-size: 1.25rem;

    margin-bottom: 2rem;
  }
</style>
