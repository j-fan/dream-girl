<script lang="ts">
  import QuestionSvg from '$lib/icons/question-svg.svelte';
  import QRCodeSvg from '$lib/icons/qr-code-svg.svelte';
  import { artistDescription, artworkDescription, credits } from './about-content';
  import Modal from './modal.svelte';
  import ArtworkLinkQr from '$lib/icons/artwork-link-qr.svelte';
  import ArtCreditItem from './art-credit-item.svelte';

  let isAboutModalOpen = false;
  let isQRModalOpen = false;
</script>

<div class="button-container">
  <button
    type="button"
    class="qr-button"
    on:click={() => {
      isQRModalOpen = true;
    }}
  >
    <QRCodeSvg />
  </button>
  <button
    type="button"
    on:click={() => {
      isAboutModalOpen = true;
    }}
  >
    <QuestionSvg />
  </button>
</div>

<Modal
  isOpen={isQRModalOpen}
  onClose={() => {
    isQRModalOpen = false;
  }}
>
  <div class="content-container">
    <section>
      <p>Scan this QR code to experience this artwork on your own device</p>
      <div class="qr-container">
        <ArtworkLinkQr />
      </div>
    </section>
  </div>
</Modal>

<Modal
  isOpen={isAboutModalOpen}
  onClose={() => {
    isAboutModalOpen = false;
  }}
>
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
</Modal>

<style>
  .button-container {
    position: fixed;
    z-index: 1;
    right: 0;
    top: 0;
    margin: 1rem;

    display: flex;
    gap: 0.5rem;
  }

  button {
    height: 36px;
    width: 36px;
    border: none;
    background-color: var(--c-navy);
    cursor: pointer;
    border-radius: 50%;
    border: 1px solid white;

    display: grid;
    place-items: center;
    padding: 0.5rem;
  }

  .content-container {
    height: 100%;
  }

  section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;

    color: var(--c-white);
    font-size: 1.25rem;

    margin-bottom: 2rem;
  }

  p {
    white-space: pre-wrap;
    align-self: flex-start;
  }

  @media only screen and (max-width: 430px) {
    .qr-button {
      display: none;
    }
  }

  .qr-container {
    margin-top: 1rem;
    width: fit-content;
    height: fit-content;
    border-radius: 1rem;
    overflow: hidden;
  }
</style>
