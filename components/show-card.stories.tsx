import type { Meta, StoryObj } from '@storybook/react';

import { Box } from '@radix-ui/themes';
import { useState } from 'react';

import { ShowCard, ShowCardToggle } from './show-card';

export const Base: StoryObj<typeof ShowCard> = {
  render: () => (
    <ShowCard
      images={[
        'https://static.libsyn.com/p/assets/6/e/9/c/6e9cf22bfd4fc1885f2e77a3093c12a1/Podcast.png',
      ]}
      publisher="Naval"
      title="Naval"
    />
  ),
};

export const Toggle: StoryObj<typeof ShowCardToggle> = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks -- storybook
    const [selected, setSelected] = useState(false);

    return (
      <ShowCardToggle
        images={[
          'https://megaphone.imgix.net/podcasts/9426cbf8-25fe-11ec-a0b4-fb6861cc1eaf/image/In_Depth_Podcast_Logo.jpeg?ixlib=rails-4.3.1&max-w=3000&max-h=3000&fit=crop&auto=format,compress',
        ]}
        onClick={() => {
          setSelected((_selected) => !_selected);
        }}
        publisher="First Round"
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
