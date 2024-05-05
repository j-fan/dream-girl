import type { ExpressionType } from '$lib/babylon/types';
import type { QuizAnswers } from '$lib/components/intro-quiz';
import type { OpenAI } from 'openai';

export type ChatFormData = {
  message?: string;
};

export type ChatRequest = Partial<{
  history: OpenAI.Chat.Completions.ChatCompletionMessageParam[];
  quizAnswers: QuizAnswers;
}>;

export type ChatResponse = {
  reply: string;
  history: OpenAI.Chat.Completions.ChatCompletionMessageParam[];
  expression?: ExpressionType;
};
