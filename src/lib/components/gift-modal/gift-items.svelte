<script lang="ts">
  import GiftItem from './gift-item.svelte';
  import type { GiftType } from './types';

  export let giftType: GiftType;
</script>

<div class="gift-container">
  {#if giftType === 'AlarmClock'}
    <GiftItem
      title="Affectionate Alarm Clock"
      cost={200}
      imageSrc="/img/alarm.png"
      description="An alarm clock that wakes you up with loving messages from your partner, reminding you that
      you're cherished and loved even before you start your day."
    />
  {:else if giftType === 'CrystalBall'}
    <img src="/img/crystal-ball.png" alt="Crystal ball" />
  {:else if giftType === 'Elixir'}
    <img src="/img/elixir.png" alt="Elixir" />
  {:else if giftType === 'FortuneCookie'}
    <img src="/img/fortune-cookie.png" alt="Fortune cookie" />
  {:else if giftType === 'Handcuffs'}
    <img src="/img/handcuffs.png" alt="Handcuffs" />
  {:else if giftType === 'Puzzle'}
    <img src="/img/puzzle.png" alt="Puzzle" />
  {:else if giftType === 'Ring'}
    <img src="/img/ring.png" alt="Ring" />
  {/if}
</div>

<style>
  img {
    width: 180px;
    height: 180px;
  }

  .gift-container {
    display: flex;
    gap: 1rem;
    align-items: center;
  }

  @media only screen and (max-width: 620px) {
    .gift-container {
      flex-direction: column;
    }
  }
</style>
