import type { Meta, StoryObj } from '@storybook/react';

import { FAKE_EPISODE_SUMMARY } from '@/lib/fixtures/fake-episode-summary';
import { Button, Flex } from '@radix-ui/themes';
import { useState } from 'react';

import { CollapsiblePanel } from './collapsible-panel';

export const Controlled: StoryObj<typeof CollapsiblePanel> = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks -- storybook
    const [open, setOpen] = useState(false);
    // eslint-disable-next-line react-hooks/rules-of-hooks -- storybook
    const [content, setContent] = useState(FAKE_EPISODE_SUMMARY);

    return (
      <Flex direction="column" gap="2">
        <Flex direction="row" gap="1">
          <Button
            highContrast
            onClick={() => {
              setContent((c) => c + FAKE_EPISODE_SUMMARY);
            }}
            size="1"
          >
            Add more content
          </Button>

          <Button
            highContrast
            onClick={() => {
              setOpen((o) => !o);
            }}
            size="1"
          >
            {open ? 'Shrink' : 'Expand'} content
          </Button>
        </Flex>

        <CollapsiblePanel open={open} title="Controlled">
          {content}
        </CollapsiblePanel>
      </Flex>
    );
  },
};

export const Uncontrolled: StoryObj<typeof CollapsiblePanel> = {
  render: () => (
    <CollapsiblePanel title="Uncontrolled">
      {FAKE_EPISODE_SUMMARY + FAKE_EPISODE_SUMMARY + FAKE_EPISODE_SUMMARY}
    </CollapsiblePanel>
  ),
};

const meta: Meta<typeof CollapsiblePanel> = {
  component: CollapsiblePanel,
  decorators: [
    (Story) => (
      <div
        style={{
          width: 'var(--container-1)',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;
