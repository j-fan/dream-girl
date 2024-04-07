import type { ReplyRequest, ReplyResponse } from './api-types';
import { OPENAI_API_KEY } from '$env/static/private';
import OpenAI from 'openai';
import { json } from '@sveltejs/kit';

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

export const POST = async (event) => {
  const data: ReplyRequest = await event.request.json();

  const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
    { role: 'system', content: 'You are a helpful assistant.' },
    ...(data.history || [])
  ];

  const completion = await openai.chat.completions.create({
    messages,
    model: 'gpt-3.5-turbo'
  });

  if (completion) {
    messages.push(completion.choices[0].message);
  }

  const response: ReplyResponse = {
    reply: completion.choices[0].message.content || '',
    history: messages
  };

  return json(response);
};
