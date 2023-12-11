import type { Meta, StoryObj } from '@storybook/react';

import HomePage from './page';

const meta: Meta<typeof HomePage> = {
  component: HomePage,
};

export const Primary: StoryObj<typeof HomePage> = {
  render: () => <HomePage />,
};

export default meta;
