import type { Meta, StoryObj } from '@storybook/react';

import { FAKE_EPISODE_SUMMARY } from '@/lib/fixtures/fake-episode-summary';

import { CollapsiblePanel } from './collapsible-panel';

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
          width: 'var(--container-2)',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;
