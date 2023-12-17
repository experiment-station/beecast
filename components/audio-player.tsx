/* eslint-disable jsx-a11y/media-has-caption -- we don't have any captions for our audio. */
'use client';
import type { ChangeEvent } from 'react';

import { Flex, IconButton, Slider, Text } from '@radix-ui/themes';
import formatDuration from 'format-duration';
import { useRef, useState } from 'react';
import { FaPauseCircle } from 'react-icons/fa';
import { FaCirclePlay } from 'react-icons/fa6';
import { IoVolumeMuteOutline } from 'react-icons/io5';
import { RiForward15Line, RiReplay15Fill } from 'react-icons/ri';

import styles from './audio-player.module.css';

type Props = {
  audioUrl: string;
  duration: number;
};

function AudioPlayerControls({
  muted,
  onFastForward,
  onPlayPause,
  onRewind,
  onSetPlaybackRate,
  playbackRate,
  playing,
  setMuted,
  setPlaybackRate,
}: {
  muted: boolean;
  onFastForward: () => void;
  onPlayPause: () => void;
  onRewind: () => void;
  onSetPlaybackRate: (rate: number) => void;
  playbackRate: number;
  playing: boolean;
  setMuted: (muted: boolean) => void;
  setPlaybackRate: (rate: number) => void;
}) {
  return (
    <Flex align="center" direction="row" gap="4">
      <IconButton
        highContrast
        onClick={() => {
          setMuted(!muted);
        }}
        variant="ghost"
      >
        <IoVolumeMuteOutline style={{ height: 30, width: 30 }} />
      </IconButton>
      <IconButton highContrast onClick={onRewind} variant="ghost">
        <RiReplay15Fill style={{ height: 30, width: 30 }} />
      </IconButton>
      <IconButton highContrast onClick={onPlayPause} variant="ghost">
        {playing ? (
          <FaPauseCircle style={{ height: 30, width: 30 }} />
        ) : (
          <FaCirclePlay style={{ height: 30, width: 30 }} />
        )}
      </IconButton>
      <IconButton highContrast onClick={onFastForward} variant="ghost">
        <RiForward15Line style={{ height: 30, width: 30 }} />
      </IconButton>

      <select
        className={styles.RatingsSelect}
        id="rating-select"
        name="ratings"
        onChange={(e: ChangeEvent<HTMLSelectElement>) => {
          onSetPlaybackRate(Number(e.target.value));
          setPlaybackRate(Number(e.target.value));
        }}
        value={playbackRate}
      >
        <option value="0.5">0.5x</option>
        <option value="0.75">0.75x</option>
        <option value="1">1x</option>
        <option value="1.25">1.25x</option>
        <option value="1.5">1.50x</option>
        <option value="2">2x</option>
      </select>
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
        initial: 'column',
        sm: 'row',
      }}
      gap={{
        initial: '1',
        sm: '4',
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
        size="2"
        style={{
          width: 300,
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
        {formatDuration((duration - sliderPosition) * 1000)} left
      </Text>
    </Flex>
  );
}

export default function AudioPlayer({ audioUrl, duration }: Props) {
  const [playing, setPlaying] = useState(false);
  const playerRef = useRef<HTMLAudioElement | null>(null);
  const [sliderPosition, setSliderPosition] = useState(0);
  const [playbackRate, setPlaybackRate] = useState<number>(1);
  const [muted, setMuted] = useState(false);

  const onRewind = () => {
    if (!playerRef.current) return;
    playerRef.current.currentTime = playerRef.current.currentTime - 15;
  };
  const onFastForward = () => {
    if (!playerRef.current) return;
    playerRef.current.currentTime = playerRef.current.currentTime + 15;
  };
  const onPlayPause = async () => {
    if (!playerRef.current) return;
    if (playerRef.current.paused) {
      await playerRef.current.play();
    } else {
      playerRef.current.pause();
    }
  };

  const onSetPlaybackRate = (value: number) => {
    if (!playerRef.current) return;
    playerRef.current.playbackRate = value;
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
        sm: '4',
      }}
      justify={{
        initial: 'center',
        sm: 'start',
      }}
    >
      <audio
        muted={muted}
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
        muted={muted}
        onFastForward={onFastForward}
        onPlayPause={onPlayPause}
        onRewind={onRewind}
        onSetPlaybackRate={onSetPlaybackRate}
        playbackRate={playbackRate}
        playing={playing}
        setMuted={setMuted}
        setPlaybackRate={setPlaybackRate}
      />
      <PlayerBar
        duration={duration}
        playerRef={playerRef}
        setSliderPosition={setSliderPosition}
        sliderPosition={sliderPosition}
      />
    </Flex>
  );
}
