<script lang="ts">
  import CoinsSvg from '$lib/icons/coins-svg.svelte';
  import { coinBalance } from '$lib/stores/user';
  import Modal from '../modal.svelte';
  import GiftItem from './gift-item.svelte';
  import { allGifts, type GiftType } from './types';

  export let isOpen = false;
  export let onClose: (() => void) | undefined = undefined;

  let currentDetailView: GiftType | undefined = undefined;
</script>

<Modal {isOpen} {onClose}>
  <div class="gift-modal-content">
    {#if currentDetailView}
      {currentDetailView}
    {:else}
      <div class="header">
        <h2>Gifts</h2>
        <div class="coin-balance">
          <CoinsSvg width="20px" height="20px" />
          <span>{$coinBalance}</span>
        </div>
      </div>
      <p>Choose a gift you would like to give to Mei.</p>
      <div class="gift-grid">
        {#each allGifts as gift}
          <GiftItem giftType={gift} />
        {/each}
      </div>
    {/if}
  </div>
</Modal>

<style>
  .gift-modal-content {
    display: flex;
    flex-direction: column;
  }

  .header {
    display: flex;
    justify-content: space-between;
  }

  .coin-balance {
    align-self: end;

    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .gift-grid {
    display: flex;
    flex-wrap: wrap;
  }
</style>
