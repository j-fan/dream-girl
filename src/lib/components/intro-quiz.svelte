<script lang="ts">
  import { fade, scale } from 'svelte/transition';
  import { quiz, type QuizAnswers } from './intro-quiz';
  import Button from './button.svelte';
  import TextInput from './input.svelte';

  export let maxSteps: number;
  export let onNext: ((step: number) => void) | undefined = undefined;
  export let onFinish: (() => void) | undefined = undefined;

  let step = 0;
  $: quizItem = quiz[step];

  let currentAnswer = '';
  const allAnswers: QuizAnswers = [];

  const handleNextStep = () => {
    if (step >= 0 && step <= maxSteps - 1) {
      allAnswers.push({
        key: quizItem.key,
        question: quizItem.question,
        answer: currentAnswer
      });
    }

    step++;

    if (step < maxSteps) {
      onNext?.(step);
    } else {
      onFinish?.();
      step = maxSteps;
    }

    currentAnswer = '';
  };
</script>

<div class="container" transition:fade={{ delay: 500 }}>
  <div class="question-container">
    <p>{quizItem.question}</p>
    {#if quizItem.type === 'multiple-choice'}
      {#each quizItem.options as option}
        <Button
          on:click={() => {
            currentAnswer = option;
          }}>{option}</Button
        >
      {/each}
    {:else}
      <TextInput
        type={quizItem.inputType}
        placeholder={quizItem.placeholder}
        bind:value={currentAnswer}
      />
    {/if}
    {#if currentAnswer}
      <div class="button-container" in:scale>
        <Button on:click={handleNextStep}>Next</Button>
      </div>
    {/if}
  </div>
  <slot name="button" />
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
    display: flex;
    flex-direction: column;
    gap: 1rem;

    color: var(--c-white);
    font-size: 1.5rem;

    border-radius: 1rem;
    border: 1px solid var(--c-white-semi-50);

    background-image: url('/img/noise.svg');
    background-color: rgba(31, 22, 94, 0.5);
    backdrop-filter: blur(10px);

    width: 400px;
    min-height: 500px;

    margin-left: 5vw;
    margin-right: 5vw;
    padding: 1rem;
  }

  .button-container {
    width: fit-content;
  }
</style>
