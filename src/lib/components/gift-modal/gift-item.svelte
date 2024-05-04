<script lang="ts">
  import type { GiftType } from './types';

  export let giftType: GiftType;
</script>

<div class="gift-container">
  {#if giftType === 'AlarmClock'}
    <img src="/img/alarm.png" alt="Alarm clock" />
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
    width: 200px;
    height: 200px;
  }
</style>
