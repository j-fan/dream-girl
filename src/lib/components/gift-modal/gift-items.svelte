<script lang="ts">
  import { allGifts, giftDetails } from './constants';
  import GiftItem from './gift-item.svelte';
</script>

<div class="gift-grid">
  {#each allGifts as giftType}
    <GiftItem
      title={giftDetails[giftType].title}
      cost={giftDetails[giftType].cost}
      imageSrc={giftDetails[giftType].image}
      description={giftDetails[giftType].description}
    />
  {/each}
</div>

<style>
  img {
    width: 180px;
    height: 180px;
  }

  .gift-grid {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 2rem;
  }
</style>
