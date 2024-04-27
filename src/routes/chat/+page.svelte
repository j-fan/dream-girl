<script lang="ts">
  import type { EventHandler } from 'svelte/elements';
  import type { ChatFormData, ChatRequest, ChatResponse } from './api-types';
  import { quizAnswers } from '$lib/stores/user';
  import Button from '$lib/components/button.svelte';
  import Input from '$lib/components/input.svelte';
  import PaperPlaneSvg from '$lib/icons/paper-plane-svg.svelte';
  import { onMount } from 'svelte';

  let responseData: ChatResponse = {
    history: [],
    reply: ''
  };
  let isLoading = false;
  let messageResponsesRef: HTMLDivElement | undefined = undefined;
  let messageValue = '';
  $: userName = $quizAnswers
    ? $quizAnswers.find(({ key }) => key === 'name')?.answer || 'user'
    : 'user';

  const autoScrollToBottom = () => {
    setTimeout(() => {
      if (messageResponsesRef) {
        messageResponsesRef.scrollTo({
          top: messageResponsesRef.scrollHeight,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  const fetchMessage = async () => {
    const request: ChatRequest = {
      history: responseData.history
    };

    // If it is the first message, add the user information collected from the quiz
    if (responseData.history.length === 0) {
      request.quizAnswers = $quizAnswers;
    }

    isLoading = true;
    const response = await fetch('/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request)
    });

    const result: ChatResponse = JSON.parse(await response.text());

    responseData = result;
    isLoading = false;
  };

  onMount(async () => {
    await fetchMessage();
  });

  const handleSubmit: EventHandler<SubmitEvent, HTMLFormElement> = async () => {
    if (!messageValue) {
      return;
    }

    responseData.history.push({ role: 'user', content: messageValue });
    autoScrollToBottom();

    // trigger UI update
    responseData = {
      ...responseData
    };
    // Clear input
    messageValue = '';

    await fetchMessage();
    autoScrollToBottom();
  };
</script>

<div class="page-container">
  <div class="content-container">
    <div class="message-responses" bind:this={messageResponsesRef}>
      {#if responseData.history}
        {#each responseData.history as historyItem}
          {#if historyItem.role === 'user' || historyItem.role === 'assistant'}
            <div class="message-item">
              <p
                class="subtle-text"
                class:align-left={historyItem.role === 'assistant'}
                class:align-right={historyItem.role === 'user'}
              >
                {historyItem.role === 'assistant' ? 'Mei' : userName}
              </p>
              <p
                class="message-content"
                class:align-left={historyItem.role === 'assistant'}
                class:align-right={historyItem.role === 'user'}
              >
                {historyItem.content}
              </p>
            </div>
          {/if}
        {/each}
      {/if}
      {#if isLoading}
        <p class="subtle-text" style="text-align: center">loading reply...</p>
      {/if}
    </div>

    <form class="send-message-area" method="POST" on:submit|preventDefault={handleSubmit}>
      <Input
        bind:value={messageValue}
        type="text"
        name="message"
        placeholder="Enter your message"
        background="dark"
      />
      <Button type="submit" background="dark" disabled={isLoading}>
        <PaperPlaneSvg />
      </Button>
    </form>
  </div>
</div>

<style>
  .page-container {
    display: flex;
    justify-content: center;

    width: 100%;
    height: 100%;

    background-color: var(--c-navy);
    background-image: url('/img/loading-screen.jpg');
    background-size: cover;
    background-position: center;
  }

  .content-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 1rem;

    width: 1000px;
    max-width: 100%;
    height: 100%;
  }

  .message-responses {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    gap: 1rem;
    padding: 0.5rem;

    width: 100%;
    max-width: 100%;
    overflow-y: auto;
  }
  .message-item {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .subtle-text {
    color: var(--c-white-semi-70);
    font-size: 1rem;
  }

  .message-content {
    color: var(--c-white);
    font-size: 1.25rem;
    white-space: pre-line;

    width: fit-content;
    padding: 0.5rem;

    border-radius: 1rem;
    border: 1px solid var(--c-white-semi-50);

    background-color: var(--c-navy-semi-50);
    background-image: url('/img/noise.svg');
    backdrop-filter: blur(10px);
  }

  .send-message-area {
    display: flex;
    gap: 0.5rem;
    width: 100%;
  }

  .align-left {
    align-self: flex-start;
  }

  .align-right {
    align-self: flex-end;
  }
</style>
