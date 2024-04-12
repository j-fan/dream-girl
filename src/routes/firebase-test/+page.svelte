<script lang="ts">
  import { Collection } from 'sveltefire';
</script>

<Collection ref={'user'} let:data let:count>
  <p>Found {count} users</p>
  {#each data as user}
    <p>{user?.name}</p>
  {/each}
  <p slot="loading">Loading...</p>
</Collection>

<Collection ref={'chat-log'} let:data let:count>
  <p>Found {count} chats</p>
  {#each data as chat}
    <p>{chat?.userId}</p>
  {/each}
  <p slot="loading">Loading...</p>
</Collection>
