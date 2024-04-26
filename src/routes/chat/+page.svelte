<script lang="ts">
  import type { EventHandler } from 'svelte/elements';
  import type { ChatFormData, ChatRequest, ChatResponse } from './api-types';
  import { quizAnswers } from '$lib/stores/user';

  let responseData: ChatResponse = {
    history: [],
    reply: ''
  };
  let isLoading = false;

  const handleSubmit: EventHandler<SubmitEvent, HTMLFormElement> = async (event) => {
    const formData: ChatFormData = Object.fromEntries(new FormData(event.currentTarget));

    responseData.history.push({ role: 'user', content: formData.message || '' });

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

<div class="container">
  <form class="section" method="POST" on:submit|preventDefault={handleSubmit}>
    <label>
      Enter message
      <textarea name="message" rows="6"></textarea>
    </label>
    <button>Submit</button>
  </form>

  <div class="section">
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
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    width: 100%;
    height: 100%;
    padding: 1rem;
  }

  textarea {
    border: 1px solid black;
  }

  .section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 500px;
    max-width: 100%;
  }

  label {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
</style>
