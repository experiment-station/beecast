import type { Meta, StoryObj } from '@storybook/react';

import SignInPage from './page';

const meta: Meta<typeof SignInPage> = {
  component: SignInPage,
};

export const Default: StoryObj<typeof SignInPage> = {
  render: () => <SignInPage />,
};

export default meta;
