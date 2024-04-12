import type { OpenAI } from 'openai';

export type ChatFormData = {
  message?: string;
};

export type ChatRequest = Partial<{
  history: OpenAI.Chat.Completions.ChatCompletionMessageParam[];
}>;

export type ChatResponse = {
  reply: string;
  history: OpenAI.Chat.Completions.ChatCompletionMessageParam[];
};
