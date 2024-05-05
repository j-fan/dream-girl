<script lang="ts">
  import type { EventHandler } from 'svelte/elements';
  import type { ChatRequest, ChatResponse } from './api-types';
  import { quizAnswers } from '$lib/stores/user';
  import Button from '$lib/components/button.svelte';
  import Input from '$lib/components/input.svelte';
  import PaperPlaneSvg from '$lib/icons/paper-plane-svg.svelte';
  import { onMount } from 'svelte';
  import DreamGirlScene from '$lib/babylon/dream-girl-scene.svelte';
  import { fade, fly } from 'svelte/transition';
  import GiftSvg from '$lib/icons/gift-svg.svelte';
  import GiftModal from '$lib/components/gift-modal/gift-modal.svelte';
  import type { GiftType } from '$lib/components/gift-modal/types';
  import { giftDetails } from '$lib/components/gift-modal/constants';

  let messageData: ChatResponse = {
    history: [],
    reply: ''
  };
  let isLoading = false;
  let messageResponsesRef: HTMLDivElement | undefined = undefined;
  let newUserMessage = '';
  let chatVisible = false;
  let isSceneLoading = true;
  let isGiftModalOpen = false;

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
      history: messageData.history
    };

    // If it is the first message, add the user information collected from the quiz
    if (messageData.history.length === 0) {
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

    messageData = result;
    isLoading = false;
  };

  onMount(async () => {
    await fetchMessage();
  });

  const handleSubmit: EventHandler<SubmitEvent, HTMLFormElement> = async () => {
    if (!newUserMessage) {
      return;
    }

    messageData.history.push({ role: 'user', content: newUserMessage });
    autoScrollToBottom();

    // trigger UI update
    messageData = messageData;
    // Clear input
    newUserMessage = '';

    await fetchMessage();
    autoScrollToBottom();
  };

  const onPurchase = async (giftType: GiftType) => {
    isGiftModalOpen = false;

    const giftDetail = giftDetails[giftType];
    messageData.history.push({
      role: 'user',
      content: `You gave a ${giftDetail.title} to Mei.`
    });
    messageData.history.push({
      role: 'system',
      content: `The client gave a ${giftDetail.title} to Mei to buy her affection. The gift is described as "${giftDetail.description}". Mei responds with skepticism.`
    });
    autoScrollToBottom();

    // trigger UI update
    messageData = messageData;
    // Clear input
    newUserMessage = '';

    await fetchMessage();
    autoScrollToBottom();
  };

  const onIntroAnimationFinish = () => {
    chatVisible = true;
  };

  const onLoadingFinish = () => {
    isSceneLoading = false;
  };
</script>

<DreamGirlScene {onIntroAnimationFinish} {onLoadingFinish} />
{#if chatVisible}
  <div class="page-container" transition:fade={{ delay: 1000 }}>
    <div class="content-container">
      <div class="message-responses" bind:this={messageResponsesRef}>
        {#if messageData.history}
          {#each messageData.history as historyItem}
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
          bind:value={newUserMessage}
          type="text"
          name="message"
          placeholder="Enter your message"
          background="dark"
        />
        <Button
          type="button"
          background="dark"
          on:click={() => {
            isGiftModalOpen = true;
          }}
        >
          <GiftSvg />
        </Button>
        <Button type="submit" background="dark" disabled={isLoading}>
          <PaperPlaneSvg />
        </Button>
      </form>
    </div>
  </div>
  <GiftModal
    isOpen={isGiftModalOpen}
    onClose={() => {
      isGiftModalOpen = false;
    }}
    {onPurchase}
  />
{:else if !isSceneLoading}
  <div class="bottom-anchored" transition:fade>
    <p class="initialise-text" in:fly={{ delay: 1000, y: 50, duration: 1000 }} out:fade>
      Hello, I'm Mei!
    </p>
    <p class="initialise-text" in:fly={{ delay: 2000, y: 50, duration: 1000 }} out:fade>
      Initialising to your preferences ♡
    </p>
  </div>
{/if}

<style>
  .page-container {
    display: flex;
    justify-content: flex-end;

    width: 100%;
    height: 100%;
    justify-content: flex-end;
  }

  @media only screen and (max-width: 1200px) {
    .page-container {
      justify-content: flex-end;
    }
  }

  @media only screen and (max-width: 430px) {
    .page-container {
      justify-content: center;
    }
  }

  .content-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    padding-top: 3rem;

    width: 70%;
    height: 100%;
  }

  @media only screen and (max-width: 1200px) {
    .content-container {
      width: 70%;
      height: 100%;
    }
  }

  @media only screen and (max-width: 430px) {
    .content-container {
      width: 100%;
      height: 75%;
      align-self: flex-end;
    }
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
    color: var(--c-white);
    font-size: 1rem;
    text-shadow:
      1px 1px 2px var(--c-dark-blue),
      -1px 1px 2px var(--c-dark-blue),
      -1px -1px 2px var(--c-dark-blue),
      1px -1px 2px var(--c-dark-blue);
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
    -webkit-backdrop-filter: blur(10px);
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

  .bottom-anchored {
    width: calc(100% - 4rem);
    height: calc(100% - 4rem);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 2rem;
    border: 2px solid var(--c-light-blue);
  }

  .initialise-text {
    font-size: 2rem;
    text-align: center;
    color: var(--c-white);
    text-shadow:
      2px 2px 2px var(--c-dark-blue),
      -2px 2px 2px var(--c-dark-blue),
      -2px -2px 2px var(--c-dark-blue),
      2px -2px 2px var(--c-dark-blue);

    width: 800px;
    max-width: 100%;
    padding: 1rem;
    white-space: pre-line;
  }
</style>
