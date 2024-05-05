<script lang="ts">
  import CoinsSvg from '$lib/icons/coins-svg.svelte';
  import { coinBalance } from '$lib/stores/user';
  import Modal from '../modal.svelte';
  import GiftItems from './gift-items.svelte';
  import { type GiftType } from './types';

  export let isOpen = false;
  export let onClose: (() => void) | undefined = undefined;
  export let onPurchase: ((giftType: GiftType) => void) | ((giftType: GiftType) => Promise<void>);

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
          <span>Balance: </span>
          <CoinsSvg width="20px" height="20px" />
          <span>{$coinBalance}</span>
        </div>
      </div>
      <p>Choose a gift you would like to give to Mei.</p>
      <GiftItems {onPurchase} />
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
    align-items: center;
    margin-bottom: 1rem;
  }

  .coin-balance {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
</style>
