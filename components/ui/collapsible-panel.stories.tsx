import type { Meta, StoryObj } from '@storybook/react';

import { Button, Flex } from '@radix-ui/themes';
import { useState } from 'react';

import { CollapsiblePanel } from './collapsible-panel';

const veryLongText = `
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quod
  voluptatum quia quos, voluptatem quibusdam quae voluptas, quas, doloribus
  voluptate. Lorem ipsum dolor sit amet consectetur adipisicing elit.
  Quisquam quod voluptatum quia quos, voluptatem quibusdam quae voluptas,
  quas, doloribus voluptate. Lorem ipsum dolor sit amet consectetur
  adipisicing elit. Quisquam quod voluptatum quia quos, voluptatem quibusdam
  quae voluptas, quas, doloribus voluptate. Lorem ipsum dolor sit amet
  consectetur adipisicing elit. Quisquam quod voluptatum quia quos,
  voluptatem quibusdam quae voluptas, quas, doloribus voluptate. Lorem ipsum
  dolor sit amet consectetur adipisicing elit. Quisquam quod voluptatum quia
  quos, voluptatem quibusdam quae voluptas, quas, doloribus voluptate. Lorem
  ipsum dolor sit amet consectetur adipisicing elit. Quisquam quod
  voluptatum quia quos, voluptatem quibusdam quae voluptas, quas, doloribus
  voluptate. Lorem ipsum dolor sit amet consectetur adipisicing elit.
  Quisquam quod voluptatum quia quos, voluptatem quibusdam quae voluptas,
  quas, doloribus voluptate.
`;

export const Controlled: StoryObj<typeof CollapsiblePanel> = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks -- storybook
    const [open, setOpen] = useState(false);

    return (
      <Flex direction="column" gap="2">
        <Button
          highContrast
          onClick={() => {
            setOpen((o) => !o);
          }}
        >
          {open ? 'Shrink' : 'Expand'} content
        </Button>

        <CollapsiblePanel open={open} title="Controlled">
          {veryLongText}
        </CollapsiblePanel>
      </Flex>
    );
  },
};

export const Uncontrolled: StoryObj<typeof CollapsiblePanel> = {
  render: () => (
    <CollapsiblePanel title="Uncontrolled">{veryLongText}</CollapsiblePanel>
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
