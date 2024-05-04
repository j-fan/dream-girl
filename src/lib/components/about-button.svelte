<script lang="ts">
  import QuestionSvg from '$lib/icons/question-svg.svelte';
</script>

<button type="button" id="about-button">
  <a href="/about">
    <QuestionSvg />
  </a>
</button>

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
</style>
