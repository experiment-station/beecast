import { env } from '@/env.mjs';
import { ofetch } from 'ofetch';

export const notifyViaSlack = async (message: string) => {
  try {
    await ofetch(env.SLACK_POSTMAN_WEBHOOK_URL, {
      body: { text: message },
      method: 'POST',
    });
  } catch (error) {
    // Do nothing?
    console.error('Failed to notify Slack', error);
  }
};
