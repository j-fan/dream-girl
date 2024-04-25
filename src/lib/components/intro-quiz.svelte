<script lang="ts">
  import { fade } from 'svelte/transition';
  import { quiz } from './intro-quiz';
  import Button from './button.svelte';

  export let step = 2;
  export let maxSteps = 1;

  $: quizItem = quiz[step - 1];
</script>

<div class="container" transition:fade={{ delay: 500 }}>
  <div class="question-container">
    <p>{quizItem.question}</p>
    {#if quizItem.type === 'multiple-choice'}
      {#each quizItem.options as option}
        <Button>{option}</Button>
      {/each}
    {:else}
      <input type="text" />
    {/if}
  </div>
</div>

<style>
  .container {
    position: fixed;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .question-container {
    color: var(--c-white);
    font-size: 1.5rem;

    border-radius: 1rem;
    border: 1px solid var(--c-white-semi-50);

    background-image: url('/img/noise.svg');
    backdrop-filter: blur(10px);

    width: 400px;
    height: 500px;

    margin-left: 5vw;
    margin-right: 5vw;
    padding: 1rem;
  }
</style>
