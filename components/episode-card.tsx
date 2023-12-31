import type { Tables } from '@/types/supabase/database';

import {
  Button,
  Card,
  Flex,
  Heading,
  Link,
  Text,
  Tooltip,
} from '@radix-ui/themes';
import { format } from 'date-fns';
import formatDuration from 'format-duration';
import NextLink from 'next/link';
import { FaPlay } from 'react-icons/fa6';
import { VscSparkle } from 'react-icons/vsc';

import styles from './episode-card.module.css';
import { EpisodeDescription } from './episode-description';
import { LineClamp } from './ui/line-clamp';

type Props = Pick<
  Tables<'episode'>,
  'description' | 'duration' | 'id' | 'published_date' | 'title'
> & {
  hasContent?: boolean;
};

export function EpisodeCard(props: Props) {
  return (
    <Link asChild className={styles.Link}>
      <NextLink href={`/episodes/${props.id}`}>
        <Card className={styles.Card} variant="ghost">
          <Flex
            align="start"
            direction={{
              initial: 'column',
              md: 'row',
            }}
            gap={{
              initial: '3',
              md: '4',
            }}
            p="1"
          >
            <Flex direction="column" gap="3">
              <Heading
                color="gray"
                highContrast
                size={{
                  initial: '2',
                  md: '2',
                }}
              >
                {props.title}
              </Heading>

              {props.description ? (
                <Text size="2">
                  <LineClamp>
                    <EpisodeDescription>{props.description}</EpisodeDescription>
                  </LineClamp>
                </Text>
              ) : null}

              <Flex align="center" gap="4">
                <Flex gap="1">
                  {props.hasContent ? (
                    <Tooltip content="This episode has AI generated summary">
                      <Button color="mint" size="1">
                        <VscSparkle />
                        AI
                      </Button>
                    </Tooltip>
                  ) : null}

                  <Button highContrast size="1">
                    <FaPlay />
                    Play
                  </Button>
                </Flex>

                <Flex gap="1">
                  <Text size="2">{formatDuration(props.duration * 1000)}</Text>

                  {props.published_date ? (
                    <>
                      <Text size="2">•</Text>

                      <Text size="2">
                        {format(
                          new Date(props.published_date * 1000),
                          'MMM d, yyyy',
                        )}
                      </Text>
                    </>
                  ) : null}
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Card>
      </NextLink>
    </Link>
  );
}
