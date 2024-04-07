import type { OpenAI } from 'openai';

export type ReplyRequest = Partial<{
  question: string;
  history: OpenAI.Chat.Completions.ChatCompletionMessageParam[];
}>;

export type ReplyResponse = {
  reply: string;
  history: OpenAI.Chat.Completions.ChatCompletionMessageParam[];
};
