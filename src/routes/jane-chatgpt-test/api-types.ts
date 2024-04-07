import type { OpenAI } from 'openai';

export type ChatFormData = {
  message?: string;
};

export type ReplyRequest = Partial<{
  history: OpenAI.Chat.Completions.ChatCompletionMessageParam[];
}>;

export type ReplyResponse = {
  reply: string;
  history: OpenAI.Chat.Completions.ChatCompletionMessageParam[];
};
