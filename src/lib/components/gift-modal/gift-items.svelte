<script lang="ts">
  import { coinBalance } from '$lib/stores/user';
  import { allGifts, giftDetails } from './constants';
  import GiftItem from './gift-item.svelte';
  import type { GiftType } from './types';

  export let onPurchase: ((giftType: GiftType) => void) | ((giftType: GiftType) => Promise<void>);

  const handlePurchase = async (giftType: GiftType) => {
    coinBalance.set($coinBalance - giftDetails[giftType].cost);

    await onPurchase(giftType);
  };
</script>

<div class="gift-grid">
  {#each allGifts as giftType}
    <GiftItem
      title={giftDetails[giftType].title}
      cost={giftDetails[giftType].cost}
      imageSrc={giftDetails[giftType].image}
      description={giftDetails[giftType].description}
      onPurchaseClick={() => {
        handlePurchase(giftType);
      }}
    />
  {/each}
</div>

<style>
  .gift-grid {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 2rem;
  }
</style>
