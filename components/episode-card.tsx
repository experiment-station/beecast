import type { Tables } from '@/types/supabase/database';

import {
  AspectRatio,
  Button,
  Card,
  Flex,
  Heading,
  Inset,
  Link,
  Text,
} from '@radix-ui/themes';
import { format } from 'date-fns';
import formatDuration from 'format-duration';
import NextLink from 'next/link';
import { FaPlay } from 'react-icons/fa6';

import styles from './episode-card.module.css';

type Props = Pick<
  Tables<'episode'>,
  'description' | 'duration' | 'id' | 'image' | 'published_date' | 'title'
>;

export function EpisodeCard(props: Props) {
  return (
    <Link asChild className={styles.Link}>
      <NextLink href={`/episode/${props.id}`}>
        <Card className={styles.Card} variant="ghost">
          <Flex
            align="start"
            direction={{
              initial: 'column',
              md: 'row',
            }}
            gap={{
              initial: '3',
              lg: '5',
              md: '4',
            }}
            p="2"
          >
            <Card className={styles.ImageContainer}>
              <Inset>
                <AspectRatio ratio={1}>
                  {/* @TODO: SUPA-37 */}
                  <img
                    alt={`Cover for ${props.title}`}
                    className={styles.Image}
                    src={props.image || '/images/placeholder.png'}
                  />
                </AspectRatio>
              </Inset>
            </Card>

            <Flex direction="column" gap="3">
              <Heading
                color="gray"
                highContrast
                size={{
                  initial: '3',
                  md: '4',
                }}
              >
                {props.title}
              </Heading>

              <Text size="2">{props.description}</Text>

              <Flex align="center" direction="row" gap="3">
                <Button highContrast>
                  <FaPlay />
                  Play
                </Button>

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
