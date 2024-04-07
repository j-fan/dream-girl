<script lang="ts">
  import type { ActionData } from './$types';

  export let form: ActionData;
</script>

<form method="POST" action="?/reply">
  <label>
    Enter question
    <textarea name="question" rows="6"></textarea>
  </label>
  <button>Submit</button>
</form>

{#if form}
  <p>{form.reply}</p>
{/if}

<style>
  textarea {
    border: 2px solid black;
  }
</style>
