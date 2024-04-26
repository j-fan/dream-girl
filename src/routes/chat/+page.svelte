<script lang="ts">
  import type { EventHandler } from 'svelte/elements';
  import type { ChatFormData, ChatRequest, ChatResponse } from './api-types';
  import { quizAnswers } from '$lib/stores/user';
  import Button from '$lib/components/button.svelte';
  import Input from '$lib/components/input.svelte';
  import PaperPlaneSvg from '$lib/icons/paper-plane-svg.svelte';

  let responseData: ChatResponse = {
    history: [],
    reply: ''
  };
  let isLoading = false;

  const handleSubmit: EventHandler<SubmitEvent, HTMLFormElement> = async (event) => {
    const formData: ChatFormData = Object.fromEntries(new FormData(event.currentTarget));

    if (!formData.message) {
      return;
    }

    responseData.history.push({ role: 'user', content: formData.message });

    // trigger UI update
    responseData = {
      ...responseData
    };

    const request: ChatRequest = {
      history: responseData.history
    };

    // If it is the first message, add the user information collected from the quiz
    if (responseData.history.length === 1) {
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
</script>

<div class="page-container">
  <div class="content-container">
    <div class="message-responses">
      {#if responseData.history}
        {#each responseData.history as historyItem}
          {#if historyItem.role === 'user' || historyItem.role === 'assistant'}
            <p>{historyItem.role}: {historyItem.content}</p>
          {/if}
        {/each}
      {/if}
      {#if isLoading}
        Loading reply...
      {/if}
    </div>

    <form class="send-message-area" method="POST" on:submit|preventDefault={handleSubmit}>
      <Input type="text" name="message" placeholder="Enter your message" background="dark" />
      <Button type="submit" background="dark">
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
    width: 100%;
    max-width: 100%;
    color: white;
  }

  .send-message-area {
    display: flex;
    gap: 0.5rem;
    width: 100%;
  }
</style>
