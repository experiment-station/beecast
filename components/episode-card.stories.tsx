import type { Meta, StoryObj } from '@storybook/react';

import { EpisodeCard } from './episode-card';

export const Primary: StoryObj<typeof EpisodeCard> = {
  render: () => (
    <EpisodeCard
      description="Guillermo Rauch (@rauchg) is the CEO of Vercel and the creator of Next.js. In this episode, we talk about how Vercel found extreme product-market fit by focusing on simplification."
      duration={4021}
      id={1}
      image="https://megaphone.imgix.net/podcasts/9426cbf8-25fe-11ec-a0b4-fb6861cc1eaf/image/In_Depth_Podcast_Logo.jpeg?ixlib=rails-4.3.1&max-w=3000&max-h=3000&fit=crop&auto=format,compress"
      published_date={1699531200}
      title="How Vercel found extreme product-market fit by focusing on simplification | Guillermo Rauch (Vercel's CEO)"
    />
  ),
};
const meta: Meta<typeof EpisodeCard> = {
  component: EpisodeCard,
};

export default meta;
