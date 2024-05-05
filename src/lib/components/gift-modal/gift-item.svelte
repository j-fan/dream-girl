<script lang="ts">
  import CoinsSvg from '$lib/icons/coins-svg.svelte';
  import Button from '../button.svelte';

  export let imageSrc: string;
  export let cost: number;
  export let title: string;
  export let description: string;
</script>

<div class="gift-container">
  <div class="product-display">
    <img src={imageSrc} alt={title} />
    <div class="purchase">
      <div class="coin-balance">
        <CoinsSvg width="16px" height="16px" />
        <span class="cost">{cost}</span>
      </div>
      <Button type="button">Purchase</Button>
    </div>
  </div>
  <div class="description">
    <h3>{title}</h3>
    <p>
      {description}
    </p>
  </div>
</div>

<style>
  img {
    width: 180px;
    height: 180px;

    filter: drop-shadow(1px 0px 0px var(--c-white-semi-50))
      drop-shadow(-1px 0px 0px var(--c-white-semi-50))
      drop-shadow(0px 1px 0px var(--c-white-semi-50))
      drop-shadow(0px -1px 0px var(--c-white-semi-50));
  }

  .gift-container {
    display: flex;
    gap: 1rem;
    align-items: center;
  }

  @media only screen and (max-width: 620px) {
    .gift-container {
      flex-direction: column;
      text-align: center;
    }
  }

  .product-display {
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
  }

  .description {
    flex-grow: 1;
  }

  .purchase {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .coin-balance {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    margin-bottom: 0.5rem;
  }

  .cost {
    font-size: 1rem;
  }
</style>
