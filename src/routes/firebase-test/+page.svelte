<script lang="ts">
  import { firestore } from '$lib/firebase/firebase';
  import type { ChatLog } from '$lib/firebase/types';
  import {
    CollectionReference,
    Query,
    addDoc,
    type DocumentData,
    doc,
    DocumentReference
  } from 'firebase/firestore';
  import { Collection, docStore } from 'sveltefire';

  const addUser = (ref: CollectionReference<DocumentData[]> | Query<DocumentData[]> | null) => {
    return () => {
      if (ref) {
        addDoc(ref as CollectionReference<ChatLog>, {
          userId: 'hello',
          log: []
        });
      }
    };
  };

  const chatRef = doc(firestore, 'chat-log/ng1x5awgpmHLxX4ZpXem') as DocumentReference<ChatLog>;
  const chat = docStore<ChatLog>(firestore, chatRef);
</script>

<pre>
  {$chat?.userId}
</pre>

<Collection ref={'user'} let:data let:count>
  <p>Found {count} users</p>
  {#each data as user}
    <p>name: {user?.name}</p>
  {/each}
  <p slot="loading">Loading...</p>
</Collection>

<Collection ref={'chat-log'} let:data let:count let:ref>
  <p>Found {count} chats</p>

  <button on:click={addUser(ref)}>add chat log item</button>

  {#each data as chat}
    <p>userId: {chat?.userId}</p>
  {/each}

  <p slot="loading">Loading...</p>
</Collection>
