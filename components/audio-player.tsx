/* eslint-disable jsx-a11y/media-has-caption -- we don't have any captions for our audio. */
'use client';

import { Box, Button, Flex, IconButton, Slider, Text } from '@radix-ui/themes';
import formatDuration from 'format-duration';
import { useRef, useState } from 'react';
import { FaPauseCircle, FaPlay } from 'react-icons/fa';
import { FaCirclePlay } from 'react-icons/fa6';
import { MdForward30, MdReplay30 } from 'react-icons/md';

import styles from './audio-player.module.css';

type Props = {
  audioUrl: string;
  duration: number;
};

function AudioPlayerControls({
  onFastForward,
  onPlayPause,
  onRewind,
  playerRef,
  playing,
}: {
  onFastForward: () => void;
  onPlayPause: () => void;
  onRewind: () => void;
  playbackRate: number;
  playerRef: { current: HTMLAudioElement | null };
  playing: boolean;
}) {
  if (!playerRef.current) {
    return (
      <Flex align="center" direction="row" gap="3">
        <Button highContrast onClick={onPlayPause} size="1">
          <FaPlay />
          Play
        </Button>
      </Flex>
    );
  }

  return (
    <Flex align="center" direction="row" gap="3">
      <IconButton
        className={styles.IconButton}
        highContrast
        onClick={onRewind}
        variant="ghost"
      >
        <MdReplay30 style={{ height: 24, width: 24 }} />
      </IconButton>
      <IconButton
        className={styles.IconButton}
        highContrast
        onClick={onPlayPause}
        variant="ghost"
      >
        {playing ? (
          <FaPauseCircle style={{ height: 24, width: 24 }} />
        ) : (
          <FaCirclePlay style={{ height: 24, width: 24 }} />
        )}
      </IconButton>
      <IconButton
        className={styles.IconButton}
        highContrast
        onClick={onFastForward}
        variant="ghost"
      >
        <MdForward30 style={{ height: 24, width: 24 }} />
      </IconButton>
    </Flex>
  );
}

function PlayerBar({
  duration,
  playerRef,
  setSliderPosition,
  sliderPosition,
}: {
  duration: number;
  playerRef: { current: HTMLAudioElement | null };
  setSliderPosition: (num: number) => void;
  sliderPosition: number;
}) {
  return (
    <Flex
      align="center"
      direction={{
        sm: 'row',
      }}
      gap={{
        initial: '1',
        sm: '2',
      }}
    >
      <Box
        style={{
          minWidth: 48,
          textAlign: 'center',
        }}
      >
        <Text
          color="gray"
          highContrast
          size={{
            initial: '1',
            xs: '2',
          }}
        >
          {formatDuration((playerRef.current?.currentTime ?? 0) * 1000)}
        </Text>
      </Box>
      <Box
        style={{
          maxWidth: 240,
        }}
      >
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
          size="1"
          style={{
            width: 240,
          }}
          value={[sliderPosition]}
        />
      </Box>
      <Box
        style={{
          minWidth: 48,
          textAlign: 'center',
        }}
      >
        <Text
          color="gray"
          highContrast
          size={{
            initial: '1',
            xs: '2',
          }}
        >
          -{formatDuration((duration - sliderPosition) * 1000)}
        </Text>
      </Box>
    </Flex>
  );
}

export default function AudioPlayer({ audioUrl, duration }: Props) {
  const [playing, setPlaying] = useState(false);
  const playerRef = useRef<HTMLAudioElement | null>(null);
  const [sliderPosition, setSliderPosition] = useState(0);
  const [playbackRate, setPlaybackRate] = useState<number>(1);

  const onRewind = () => {
    if (!playerRef.current) return;
    playerRef.current.currentTime = playerRef.current.currentTime - 30;
  };
  const onFastForward = () => {
    if (!playerRef.current) return;
    playerRef.current.currentTime = playerRef.current.currentTime + 30;
  };
  const onPlayPause = async () => {
    if (!playerRef.current) return;
    if (playerRef.current.paused) {
      await playerRef.current.play();
    } else {
      playerRef.current.pause();
    }
  };

  return (
    <Flex
      align={{
        initial: 'center',
        sm: 'center',
      }}
      direction={{
        initial: 'column',
        sm: 'row',
      }}
      gap={{
        initial: '2',
        sm: '3',
      }}
      justify={{
        initial: 'center',
        sm: 'start',
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
        onRateChange={(e) => {
          setPlaybackRate(e.currentTarget.playbackRate);
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
      <AudioPlayerControls
        onFastForward={onFastForward}
        onPlayPause={onPlayPause}
        onRewind={onRewind}
        playbackRate={playbackRate}
        playerRef={playerRef}
        playing={playing}
      />
      {playerRef.current ? (
        <PlayerBar
          duration={playerRef.current.duration}
          playerRef={playerRef}
          setSliderPosition={setSliderPosition}
          sliderPosition={sliderPosition}
        />
      ) : null}
    </Flex>
  );
}
