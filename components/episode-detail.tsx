import type { Tables } from '@/types/supabase/database';
import type { PropsWithChildren } from 'react';

import { DatabaseError } from '@/lib/errors';
import { createSupabaseServerClient } from '@/lib/services/supabase/server';
import { Avatar, Box, Flex, Heading, Text } from '@radix-ui/themes';
import { cookies } from 'next/headers';

import AudioPlayer from './audio-player';
import { EpisodeAISummary } from './episode-ai-summary/episode-ai-summary';
import { EpisodeDescription } from './episode-description';
import { CollapsiblePanel } from './ui/collapsible-panel';

function EpisodeDetailContent(
  props: PropsWithChildren<
    Pick<
      Tables<'episode'>,
      | 'audio_url'
      | 'description'
      | 'duration'
      | 'id'
      | 'image'
      | 'published_date'
      | 'title'
    > & {
      show: {
        id: Tables<'show'>['id'];
        title: Tables<'show'>['title'];
      };
    }
  >,
) {
  return (
    <Flex
      direction="column"
      gap={{
        initial: '5',
        sm: '6',
      }}
    >
      <Flex
        align="center"
        direction={{
          initial: 'column',
          sm: 'row',
        }}
        gap={{
          initial: '4',
          sm: '6',
        }}
      >
        <Avatar
          fallback="/images/logo.png"
          radius="small"
          size={{
            initial: '8',
            xs: '9',
          }}
          src={props.image ?? ''}
        />

        <Flex direction="column" gap="4" justify="end" width="100%">
          <Flex direction="column" gap="1">
            <Heading
              align={{
                initial: 'center',
                sm: 'left',
              }}
              size={{
                initial: '2',
                xs: '3',
              }}
            >
              {props.title}
            </Heading>

            <Text
              align={{
                initial: 'center',
                sm: 'left',
              }}
              color="gray"
              size="2"
            >
              {props.show.title}
            </Text>
          </Flex>

          <Box>
            <AudioPlayer audioUrl={props.audio_url} duration={props.duration} />
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
      audio_url={data.audio_url}
      description={data.description}
      duration={data.duration}
      id={data.id}
      image={data.image}
      published_date={data.published_date}
      show={data.show}
      title={data.title}
    >
      <EpisodeAISummary id={data.id} />
    </EpisodeDetailContent>
  );
}

export const EpisodeDetail = {
  Content: EpisodeDetailContent,
  Page: EpisodeDetailPage,
};
