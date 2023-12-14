import type { Meta, StoryObj } from '@storybook/react';

import { Box } from '@radix-ui/themes';
import { useState } from 'react';

import { ShowCard } from './show-card';

export const Link: StoryObj<typeof ShowCard.Link> = {
  render: () => (
    <ShowCard.Link
      description="On Twitter at @naval."
      href="/shows/naval"
      images={[
        'https://static.libsyn.com/p/assets/6/e/9/c/6e9cf22bfd4fc1885f2e77a3093c12a1/Podcast.png',
      ]}
      title="Naval"
    />
  ),
};

export const Toggle: StoryObj<typeof ShowCard.Toggle> = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks -- storybook
    const [selected, setSelected] = useState(false);

    return (
      <ShowCard.Toggle
        description="Welcome to In Depth, a new podcast from First Round Review that’s dedicated to surfacing the tactical advice founders and startup leaders need to grow their teams, their companies and themselves. Hosted by Brett Berson, a partner at First Round, In Depth will cover a lot of ground and a wide range of topics, from hiring executives and becoming a better manager, to the importance of storytelling inside of your organization. But every interview will hit the level of tactical depth where the very best advice is found. We hope you’ll join us. Subscribe to “In Depth” now and lear..."
        images={[
          'https://megaphone.imgix.net/podcasts/9426cbf8-25fe-11ec-a0b4-fb6861cc1eaf/image/In_Depth_Podcast_Logo.jpeg?ixlib=rails-4.3.1&max-w=3000&max-h=3000&fit=crop&auto=format,compress',
        ]}
        onClick={() => {
          setSelected((_selected) => !_selected);
        }}
        selected={selected}
        title="In Depth"
      />
    );
  },
};

const meta: Meta<typeof ShowCard> = {
  decorators: [
    (Story) => (
      <Box style={{ maxWidth: 320 }}>
        <Story />
      </Box>
    ),
  ],
  title: 'show-card',
};

export default meta;
