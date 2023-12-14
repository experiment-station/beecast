import type { Tables } from '@/types/supabase/database';
import type { PropsWithChildren } from 'react';

import {
  AspectRatio,
  Avatar,
  Box,
  Card,
  Flex,
  IconButton,
  Inset,
  Link,
  Text,
} from '@radix-ui/themes';
import NextLink from 'next/link';
import { FaCircleCheck, FaPlay } from 'react-icons/fa6';

import styles from './show-card.module.css';
import { Hover } from './ui/hover';

type Props = Pick<Tables<'show'>, 'description' | 'images' | 'title'>;

function ShowCardDescription(props: Pick<Props, 'description'>) {
  if (!props.description) return null;

  return (
    <Text
      className={styles.Description}
      color="gray"
      size="2"
      title={props.description}
    >
      {props.description}
    </Text>
  );
}

function ShowCardImage(props: Pick<Props, 'images' | 'title'>) {
  return (
    <Inset>
      <AspectRatio ratio={1}>
        {/* @TODO: SUPA-37 */}
        <Avatar
          alt={`Cover for ${props.title}`}
          className={styles.Image}
          fallback="/images/placeholder.png"
          src={props.images?.[0]}
        />
      </AspectRatio>
    </Inset>
  );
}

function ShowCardRoot(props: PropsWithChildren) {
  return (
    <Hover.Root>
      <Box m="-3" p="3">
        {props.children}
      </Box>
    </Hover.Root>
  );
}

function ShowCardLink(props: Props & { href: string }) {
  return (
    <ShowCardRoot>
      <Box mb="2" position="relative">
        <NextLink href={props.href}>
          <Card>
            <ShowCardImage images={props.images} title={props.title} />
          </Card>

          <Hover.Show>
            <Flex bottom="0" gap="2" m="2" position="absolute" right="0">
              <IconButton radius="full" size="2" tabIndex={-1}>
                <FaPlay />
              </IconButton>
            </Flex>
          </Hover.Show>
        </NextLink>
      </Box>

      <Flex align="start" direction="column" position="relative">
        <Link
          asChild
          className={styles.LinkTitle}
          highContrast
          size="2"
          tabIndex={-1}
          weight="medium"
        >
          <NextLink href={props.href}>{props.title}</NextLink>
        </Link>

        <ShowCardDescription description={props.description} />
      </Flex>
    </ShowCardRoot>
  );
}

function ShowCardToggle(
  props: Props & { onClick: () => void; selected: boolean },
) {
  return (
    <ShowCardRoot>
      <Box mb="2" position="relative">
        <Card
          aria-selected={props.selected}
          className={styles.ToggleCard}
          data-accent-color="grass"
          onClick={props.onClick}
        >
          <ShowCardImage images={props.images} title={props.title} />
        </Card>
      </Box>

      <Flex align="start" direction="column" position="relative">
        <Flex align="center" gap="1">
          <Text highContrast size="2" weight="medium">
            {props.title}
          </Text>

          {props.selected ? (
            <Text className={styles.ToggleCheckIcon} color="grass" size="1">
              <FaCircleCheck />
            </Text>
          ) : null}
        </Flex>

        <ShowCardDescription description={props.description} />
      </Flex>
    </ShowCardRoot>
  );
}

export const ShowCard = {
  Link: ShowCardLink,
  Toggle: ShowCardToggle,
};
