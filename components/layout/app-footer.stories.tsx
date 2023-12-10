import type { Meta, StoryObj } from '@storybook/react';

import { AppFooter } from './app-footer';

export const Default: StoryObj<typeof AppFooter> = {
  render: () => <AppFooter />,
};

const meta: Meta<typeof AppFooter> = {
  component: AppFooter,
};

export default meta;
