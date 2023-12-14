import type { Meta, StoryObj } from '@storybook/react';

import { OnboardingModal } from './onboarding-modal';

export const Primary: StoryObj<typeof OnboardingModal> = {
  render: () => <OnboardingModal />,
};
const meta: Meta<typeof OnboardingModal> = {
  component: OnboardingModal,
};

export default meta;
