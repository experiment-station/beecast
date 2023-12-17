/* eslint-disable jsx-a11y/media-has-caption -- we don't have any captions for our audio. */
'use client';
import { Flex, IconButton, Slider, Text } from '@radix-ui/themes';
import formatDuration from 'format-duration';
import { useRef, useState } from 'react';
import { FaPauseCircle } from 'react-icons/fa';
import { FaCirclePlay } from 'react-icons/fa6';

type Props = {
  audioUrl: string;
  duration: number;
};

function AudioPlayerControls({
  onPlayPause,
  playing,
}: {
  onPlayPause: () => void;
  playing: boolean;
}) {
  return (
    <IconButton highContrast onClick={onPlayPause} variant="ghost">
      {playing ? (
        <FaPauseCircle style={{ height: 36, width: 36 }} />
      ) : (
        <FaCirclePlay style={{ height: 36, width: 36 }} />
      )}
    </IconButton>
  );
}

export default function AudioPlayer({ audioUrl, duration }: Props) {
  const [playing, setPlaying] = useState(false);
  const playerRef = useRef<HTMLAudioElement | null>(null);
  const [sliderPosition, setSliderPosition] = useState(0);

  const onPlayPause = async () => {
    if (!playerRef.current) return;
    playerRef.current.paused
      ? await playerRef.current.play()
      : playerRef.current.pause();
  };

  return (
    <Flex
      direction="row"
      gap={{
        initial: '2',
        xs: '2',
      }}
      style={{
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <audio
        onEnded={() => {
          setPlaying(false);
        }}
        onPause={() => {
          setPlaying(false);
        }}
        onPlay={() => {
          if (!playerRef.current) return;
          if (playerRef.current.currentTime === duration) {
            setSliderPosition(0);
            playerRef.current.currentTime = 0;
          }
          setPlaying(true);
        }}
        onTimeUpdate={(e) => {
          setSliderPosition(e.currentTarget.currentTime);
          if (e.currentTarget.currentTime === duration) {
            setSliderPosition(0);
          }
        }}
        ref={playerRef}
        src={audioUrl}
      />
      <AudioPlayerControls onPlayPause={onPlayPause} playing={playing} />
      <Slider
        defaultValue={[sliderPosition]}
        max={duration}
        onValueChange={(value) => {
          if (typeof value[0] !== 'number' || !playerRef.current) {
            return;
          }
          const position = Math.floor(value[0]);
          setSliderPosition(position);
          playerRef.current.currentTime = position;
        }}
        size="2"
        style={{
          width: '65%',
        }}
        value={[sliderPosition]}
      />
      <Text
        color="gray"
        highContrast
        size={{
          initial: '1',
          xs: '2',
        }}
      >
        {formatDuration((duration - sliderPosition) * 1000)} left.
      </Text>
    </Flex>
  );
}
