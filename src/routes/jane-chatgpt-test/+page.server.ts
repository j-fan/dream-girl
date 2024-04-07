import type { ReplyResponse } from './api-types';

export const actions = {
  reply: async ({ request }): Promise<ReplyResponse> => {
    const data = await request.formData();

    return {
      reply: `Echo response: ${data.get('question')}`
    };
  }
};
