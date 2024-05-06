import type { QuizAnswers } from '$lib/components/intro-quiz';
import { writable } from 'svelte/store';

export const anonymousId = writable('');

export const quizAnswers = writable<QuizAnswers>([]);

export const coinBalance = writable(1000);

export const generateNewUser = () => {
  anonymousId.set(window.crypto.randomUUID());
  quizAnswers.set([]);
  coinBalance.set(1000);
};
