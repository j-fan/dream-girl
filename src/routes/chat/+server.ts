import type { ChatRequest, ChatResponse } from './api-types';
import { OPENAI_API_KEY } from '$env/static/private';
import OpenAI from 'openai';
import { json } from '@sveltejs/kit';
import { generateFirstMessage, generateSystemPrompt } from './prompts';
import { separateExpressionAndPrompt } from './utils';
import type { ExpressionType } from '$lib/babylon/types';

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

export const POST = async (event) => {
  const data: ChatRequest = await event.request.json();

  const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [];

  if (!data.history || data.history.length === 0) {
    const firstMessage = separateExpressionAndPrompt(generateFirstMessage(data.quizAnswers));

    messages.push({ role: 'system', content: generateSystemPrompt(data.quizAnswers) });
    messages.push({ role: 'assistant', content: firstMessage.prompt });

    const response: ChatResponse = {
      reply: firstMessage.prompt,
      history: messages,
      expression: firstMessage.expression
    };

    return json(response);
  }

  if (data.history) {
    messages.push(...data.history);
  }

  // Occasionally remind the AI who it is
  if (messages.length % 15 === 0) {
    messages.push({
      role: 'system',
      content: generateSystemPrompt()
    });
  }

  const completion = await openai.chat.completions.create({
    messages,
    model: 'gpt-3.5-turbo',
    temperature: 1,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0
  });

  let newExpression: ExpressionType | undefined = undefined;

  if (completion) {
    const newMessage = completion.choices?.[0]?.message;
    const completionWithExpression = separateExpressionAndPrompt(newMessage?.content || '');
    newExpression = completionWithExpression.expression;

    messages.push({
      ...newMessage,
      content: completionWithExpression.prompt
    });
  }

  const response: ChatResponse = {
    reply: completion.choices[0].message.content || '',
    history: messages,
    expression: newExpression
  };

  return json(response);
};
