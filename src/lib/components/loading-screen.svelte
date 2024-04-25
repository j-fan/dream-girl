<script lang="ts">
  /**
   * Loading progress value 0 - 100
   */
  export let progress = 0;
</script>

{#if progress < 100}
  <div class="background">
    <span>{progress.toFixed(0)}%</span>
  </div>
{/if}

<style>
  .background {
    background-color: var(--c-navy);
    inset: 0;
    position: fixed;
    color: var(--c-white);
    z-index: 1;
  }
</style>
