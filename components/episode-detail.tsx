import type { Tables } from '@/types/supabase/database';
import type { PropsWithChildren } from 'react';

import { DatabaseError } from '@/lib/errors';
import { createSupabaseServerClient } from '@/lib/services/supabase/server';
import { Avatar, Box, Flex, Heading, Text } from '@radix-ui/themes';
import { cookies } from 'next/headers';

import { EpisodeAISummary } from './episode-ai-summary/episode-ai-summary';
import { EpisodeDescription } from './episode-description';
import { CollapsiblePanel } from './ui/collapsible-panel';
import { DecorativeBox } from './ui/decorative-box';

function EpisodeDetailContent(
  props: PropsWithChildren<
    Pick<
      Tables<'episode'>,
      'description' | 'duration' | 'id' | 'image' | 'published_date' | 'title'
    > & {
      show: {
        id: Tables<'show'>['id'];
        title: Tables<'show'>['title'];
      };
    }
  >,
) {
  return (
    <Flex direction="column" gap="4">
      <Flex align="start" direction="row" gap="5">
        <Avatar
          fallback="/images/placeholder.png"
          radius="small"
          size="9"
          src={props.image ?? ''}
        />

        <Flex direction="column" gap="1">
          <Heading size="3">{props.title}</Heading>

          <Text color="gray" size="2">
            {props.show.title}
          </Text>

          <Box height="9" width="100%">
            <DecorativeBox />
          </Box>
        </Flex>
      </Flex>

      {props.description ? (
        <CollapsiblePanel title="Episode description">
          <EpisodeDescription>{props.description}</EpisodeDescription>
        </CollapsiblePanel>
      ) : null}

      {props.children}
    </Flex>
  );
}

async function EpisodeDetailPage(props: { id: Tables<'episode'>['id'] }) {
  const supabase = createSupabaseServerClient(cookies());

  const { data, error } = await supabase
    .from('episode')
    .select('*, show(id, title)')
    .eq('id', props.id)
    .single();

  if (error) {
    throw new DatabaseError(error);
  }

  return (
    <EpisodeDetailContent
      description={data.description}
      duration={data.duration}
      id={data.id}
      image={data.image}
      published_date={data.published_date}
      show={data.show}
      title={data.title}
    >
      <EpisodeAISummary id={data.id} title={data.title} />
    </EpisodeDetailContent>
  );
}

export const EpisodeDetail = {
  Content: EpisodeDetailContent,
  Page: EpisodeDetailPage,
};
