import type { Tables } from '@/types/supabase/database';

import {
  AspectRatio,
  Avatar,
  Box,
  Card,
  Flex,
  IconButton,
  Inset,
  Text,
} from '@radix-ui/themes';
import { FaPlay } from 'react-icons/fa6';

import styles from './show-card.module.css';
import { Hover } from './ui/hover';
import { LineClamp } from './ui/line-clamp';

type ShowCardProps = Pick<Tables<'show'>, 'images' | 'publisher' | 'title'>;

function ShowCardRoot(props: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <Hover.Root
      style={{
        height: '100%',
      }}
    >
      <Card
        {...props}
        size="2"
        style={{
          height: '100%',
        }}
      >
        {props.children}
      </Card>
    </Hover.Root>
  );
}

function ShowCardImage(props: Pick<ShowCardProps, 'images' | 'title'>) {
  return (
    <Box p="3">
      <Card variant="ghost">
        <Inset>
          <AspectRatio ratio={1}>
            {/* @TODO: SUPA-37 */}
            <Avatar
              alt={`Cover for ${props.title}`}
              className={styles.Image}
              fallback="/images/logo.png"
              src={props.images?.[0]}
            />
          </AspectRatio>
        </Inset>
      </Card>
    </Box>
  );
}

function ShowCardText(props: Pick<ShowCardProps, 'publisher' | 'title'>) {
  return (
    <Flex direction="column">
      <Text highContrast size="2" weight="medium">
        {props.title}
      </Text>

      <Text color="gray" size="2">
        <LineClamp>{props.publisher}</LineClamp>
      </Text>
    </Flex>
  );
}

export function ShowCard(props: ShowCardProps) {
  return (
    <ShowCardRoot>
      <Flex direction="column" gap="2">
        <Box position="relative">
          <ShowCardImage images={props.images} title={props.title} />

          <Hover.Show>
            <Flex bottom="0" gap="2" m="2" position="absolute" right="0">
              <IconButton radius="full" size="2" tabIndex={-1}>
                <FaPlay />
              </IconButton>
            </Flex>
          </Hover.Show>
        </Box>

        <ShowCardText publisher={props.publisher} title={props.title} />
      </Flex>
    </ShowCardRoot>
  );
}

export function ShowCardToggle(
  props: ShowCardProps & { onClick: () => void; selected: boolean },
) {
  return (
    <ShowCardRoot
      aria-selected={props.selected}
      className={styles.ToggleCard}
      data-accent-color="grass"
      onClick={props.onClick}
    >
      <Flex direction="column" gap="2">
        <ShowCardImage images={props.images} title={props.title} />
        <ShowCardText publisher={props.publisher} title={props.title} />
      </Flex>
    </ShowCardRoot>
  );
}
