import crypto from 'node:crypto';

type ResponseType = {
  authDate: number;
  authorization: string;
};

export const generateAuthTokenAuthDate = (
  podcastIndexApiKey: string,
  podcastIndexSecret: string,
): ResponseType => {
  const authDate = Math.floor(Date.now() / 1000);
  const authorization = crypto
    .createHash('sha1')
    .update(podcastIndexApiKey + podcastIndexSecret + authDate)
    .digest('hex');

  return { authDate, authorization };
};
