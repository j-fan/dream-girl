import type { QuizAnswers } from '$lib/components/intro-quiz';
import { firestore } from '$lib/firebase/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { writable } from 'svelte/store';

export const anonymousId = writable('');

export const quizAnswers = writable<QuizAnswers>([]);

export const coinBalance = writable(1000);

export const generateNewUser = () => {
  const userId = window.crypto.randomUUID();
  anonymousId.set(userId);
  quizAnswers.set([]);
  coinBalance.set(1000);

  quizAnswers.subscribe((answers) => {
    const userCollection = doc(firestore, 'users', userId);
    if (answers.length) {
      setDoc(userCollection, { answers }, { merge: true });
    }
  });

  coinBalance.subscribe((balance) => {
    const userCollection = doc(firestore, 'users', userId);
    if (balance !== 1000) {
      setDoc(userCollection, { balance }, { merge: true });
    }
  });
};
