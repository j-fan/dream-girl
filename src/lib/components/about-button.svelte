<script lang="ts">
  import QuestionSvg from '$lib/icons/question-svg.svelte';
  import { artistDescription, artworkDescription } from './about-content';
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
        {artworkDescription}
      </p>
    </section>

    <h2>About the artist</h2>
    <section>
      <p>
        {artistDescription}
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

  p {
    white-space: pre-wrap;
  }
</style>
