import type { Tables } from '@/types/supabase/database';

import { Button, Card, Flex, Heading, Link, Text } from '@radix-ui/themes';
import { format } from 'date-fns';
import formatDuration from 'format-duration';
import parseHTML from 'html-react-parser';
import NextLink from 'next/link';
import { FaPlay } from 'react-icons/fa6';

import styles from './episode-card.module.css';

type Props = Pick<
  Tables<'episode'>,
  'description' | 'duration' | 'id' | 'published_date' | 'title'
>;

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
              lg: '5',
              md: '4',
            }}
            p="2"
          >
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

              {props.description ? (
                <Text
                  as="div"
                  className={styles.Description}
                  size="2"
                  trim="start"
                >
                  {parseHTML(props.description)}
                </Text>
              ) : null}

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
