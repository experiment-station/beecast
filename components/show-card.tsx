import type { Tables } from '@/types/supabase/database';
import type { PropsWithChildren } from 'react';

import {
  AspectRatio,
  Box,
  Card,
  Flex,
  IconButton,
  Link,
  Text,
} from '@radix-ui/themes';
import NextLink from 'next/link';
import { CgCheckO, CgPlayButton } from 'react-icons/cg';

import { Hover } from './ui/hover';

type Props = Pick<Tables<'show'>, 'description' | 'images' | 'title'>;

function ShowCardDescription(props: Pick<Props, 'description'>) {
  if (!props.description) return null;

  return (
    <Text
      color="gray"
      size="2"
      style={{
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: 1,
        display: '-webkit-box',
        overflow: 'hidden',
      }}
      title={props.description}
    >
      {props.description}
    </Text>
  );
}

function ShowCardImage(props: Pick<Props, 'images' | 'title'>) {
  return (
    <Box style={{ margin: 'calc(var(--card-padding) * -1)' }}>
      <AspectRatio ratio={1}>
        {/* @TODO: SUPA-37 */}
        <img
          alt={`Cover for ${props.title}`}
          src={props.images?.[0] ?? '/images/placeholder.png'}
          style={{
            height: '100%',
            objectFit: 'cover',
            width: '100%',
          }}
        />
      </AspectRatio>
    </Box>
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
                <Text size="7">
                  <Flex
                    align="center"
                    justify="center"
                    style={{
                      paddingLeft: '2px',
                    }}
                  >
                    <CgPlayButton />
                  </Flex>
                </Text>
              </IconButton>
            </Flex>
          </Hover.Show>
        </NextLink>
      </Box>

      <Flex align="start" direction="column" position="relative">
        <Link
          asChild
          highContrast
          size="2"
          style={{ textDecoration: 'none' }}
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
          data-accent-color="grass"
          onClick={props.onClick}
          style={{
            cursor: 'var(--cursor-button)',
            ...(props.selected
              ? {
                  boxShadow: '0 0 0 2px var(--accent-10)',
                }
              : {}),
          }}
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
            <Text color="grass" size="2" style={{ lineHeight: 1 }}>
              <CgCheckO />
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
