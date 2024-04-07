import type { ReplyRequest, ReplyResponse } from './api-types';
import { OPENAI_API_KEY } from '$env/static/private';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

export const actions = {
  reply: async ({ request }): Promise<ReplyResponse> => {
    const data = Object.fromEntries((await request.formData()).entries()) as ReplyRequest;

    const completion = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: data.question || '' }
      ],
      model: 'gpt-3.5-turbo'
    });

    return {
      reply: completion.choices[0].message.content || ''
    };
  }
};
