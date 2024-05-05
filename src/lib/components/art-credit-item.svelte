<script lang="ts">
  export let title: string;
  export let artist: string;
  export let link: string;
</script>

<span>
  • {title} by {artist}. <a href={link} target="_blank" rel="noopener noreferrer">[Link]</a>
</span>

<style>
  a {
    color: var(--c-white);
  }

  span {
    align-self: start;
    line-height: 1.2;
  }
</style>
