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

// @TODO: rebase when https://github.com/experiment-station/beecast/pull/41 is merged
type Props = {
  description: string;
  duration: number;
  id: number;
  image: string;
  publishedDate: number;
  title: string;
};

export function EpisodeCard(props: Props) {
  return (
    <Link asChild className={styles.Link}>
      <NextLink href={`/episode/${props.id}`}>
        <Card className={styles.Card} variant="ghost">
          <Flex align="start" gap="4">
            <Card className={styles.ImageContainer}>
              <Inset>
                <AspectRatio ratio={1}>
                  {/* @TODO: SUPA-37 */}
                  <img
                    alt={`Cover for ${props.title}`}
                    className={styles.Image}
                    src={props.image}
                  />
                </AspectRatio>
              </Inset>
            </Card>

            <Flex direction="column" gap="3">
              <Heading color="gray" highContrast size="3">
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
                  <Text size="2">•</Text>
                  <Text size="2">
                    {format(
                      new Date(props.publishedDate * 1000),
                      'MMM d, yyyy',
                    )}
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Card>
      </NextLink>
    </Link>
  );
}
