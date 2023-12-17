import type { Meta, StoryObj } from '@storybook/react';

import AudioPlayer from './audio-player';

export const Base: StoryObj<typeof AudioPlayer> = {
  render: () => (
    <AudioPlayer
      audioUrl="https://traffic.megaphone.fm/FRCH6920528984.mp3?updated=1701990875"
      duration={4775}
    />
  ),
};

const meta: Meta<typeof AudioPlayer> = {
  component: AudioPlayer,
};

export default meta;
