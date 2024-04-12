<script lang="ts">
  import type { EventHandler } from 'svelte/elements';
  import type { ChatFormData, ChatRequest, ChatResponse } from './api-types';

  let responseData: ChatResponse = {
    history: [],
    reply: ''
  };
  let isLoading = false;

  const handleSubmit: EventHandler<SubmitEvent, HTMLFormElement> = async (event) => {
    const formData: ChatFormData = Object.fromEntries(new FormData(event.currentTarget));

    responseData.history.push({ role: 'user', content: formData.message || '' });
    responseData = {
      ...responseData
    };

    const request: ChatRequest = {
      history: responseData.history
    };

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

<form method="POST" action="?/reply" on:submit|preventDefault={handleSubmit}>
  <label>
    Enter message
    <textarea name="message" rows="6"></textarea>
  </label>
  <button>Submit</button>
</form>

{#if responseData.history}
  <h3>History:</h3>
  {#each responseData.history as historyItem}
    {#if historyItem.role === 'user' || historyItem.role === 'assistant'}
      <p>{historyItem.role}: {historyItem.content}</p>
    {/if}
  {/each}
{/if}
{#if isLoading}
  Loading reply...
{/if}

<style>
  textarea {
    border: 2px solid black;
  }
</style>
