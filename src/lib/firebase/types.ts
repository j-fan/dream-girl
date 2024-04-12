import { CollectionReference, Query, type DocumentData } from 'firebase/firestore';

export type CollectionRef = CollectionReference<DocumentData[]> | Query<DocumentData[]> | null;

export type ChatLog = {
  userId: string;
  log: Array<{
    role: string;
    message: string;
  }>;
};
