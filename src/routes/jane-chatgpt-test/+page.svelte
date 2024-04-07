<script lang="ts">
  import type { ActionData } from './$types';
  import { enhance } from '$app/forms';

  export let form: ActionData;
  let formLoading = false;
</script>

<form
  method="POST"
  action="?/reply"
  use:enhance={() => {
    formLoading = true;
    return async ({ update }) => {
      await update();
      formLoading = false;
    };
  }}
>
  <label>
    Enter question
    <textarea name="question" rows="6"></textarea>
  </label>
  <button>Submit</button>
</form>

{#if formLoading}
  Loading reply...
{/if}
{#if form && !formLoading}
  <p>{form.reply}</p>
{/if}

<style>
  textarea {
    border: 2px solid black;
  }
</style>
