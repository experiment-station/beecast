'use client';

import type { Tables } from '@/types/supabase/database';

import { Box, Button, Flex, Text } from '@radix-ui/themes';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { PiRobotBold } from 'react-icons/pi';

import { CollapsiblePanel } from './ui/collapsible-panel';

type Props = {
  id: Tables<'episode'>['id'];
};

function MockAIThingy() {
  return (
    <Box>
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
      <br />
      <br />
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
    </Box>
  );
}

type State =
  | {
      timeRemaining: number;
      type: 'countdown';
    }
  | {
      type: 'error';
    }
  | {
      type: 'idle';
    }
  | {
      type: 'loading';
    }
  | {
      type: 'success';
    };

export function EpisodeAIThingy(props: Props) {
  const [state, setState] = useState<State>({ type: 'idle' });

  const doTheThingy = useCallback(async () => {
    if (state.type !== 'idle') {
      return;
    }

    try {
      setState({ type: 'loading' });
      await fetch(`https://dummyjson.com/todos`);
      setState({ timeRemaining: 5, type: 'countdown' });
    } catch (error) {
      setState({ type: 'error' });
    }
  }, [state.type]);

  useEffect(() => {
    if (state.type === 'countdown') {
      const interval = setInterval(() => {
        setState((_state) => {
          if (_state.type !== 'countdown') {
            return _state;
          }

          if (_state.timeRemaining <= 0) {
            return { type: 'success' };
          }

          return { ..._state, timeRemaining: _state.timeRemaining - 1 };
        });
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [state]);

  const buttonText = useMemo(() => {
    switch (state.type) {
      case 'countdown':
        return state.timeRemaining === 0
          ? `THERE YOU GO!`
          : `Presenting the AI thingy in ${state.timeRemaining} seconds...`;
      case 'error':
        return 'Error';
      case 'idle':
        return 'Do the AI thingy!';
      case 'loading':
        return 'Doing the AI thingy...';
      case 'success':
        return 'Done!';
    }
  }, [state]);

  return (
    <Box id={props.id.toString()}>
      <CollapsiblePanel open={state.type === 'success'} title="Episode summary">
        <MockAIThingy />

        {state.type === 'success' ? null : (
          <Flex
            align="center"
            height="100%"
            justify="center"
            left="0"
            position="absolute"
            style={{ backdropFilter: 'blur(3px)', borderRadius: 10, zIndex: 1 }}
            top="0"
            width="100%"
          >
            <Button highContrast onClick={doTheThingy} size="4">
              <Flex align="center" gap="2" justify="center">
                <Text mt="1" size="6" trim="both">
                  <PiRobotBold />
                </Text>

                <Text
                  style={{
                    textTransform: 'uppercase',
                  }}
                  weight="bold"
                >
                  {buttonText}
                </Text>
              </Flex>
            </Button>
          </Flex>
        )}
      </CollapsiblePanel>
    </Box>
  );
}
