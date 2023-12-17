import type { Tables } from '@/types/supabase/database';

import { EpisodeCard } from '@/components/episode-card';
import { DatabaseError } from '@/lib/errors';
import { createSupabaseServerClient } from '@/lib/services/supabase/server';
import {
  AspectRatio,
  Avatar,
  Box,
  Flex,
  Grid,
  Heading,
  Separator,
  Text,
} from '@radix-ui/themes';
import { cookies } from 'next/headers';

type ShowId = Tables<'show'>['id'];

const fetchShowWithEpisodes = async (id: ShowId) => {
  const supabase = createSupabaseServerClient(cookies());

  const response = await supabase
    .from('show')
    .select('*, episodes:episode(*, episode_content(id, text_summary))')
    .eq('id', id)
    .single();

  return response;
};

export default async function Page(props: { params: { id: ShowId } }) {
  const { data, error } = await fetchShowWithEpisodes(props.params.id);

  if (error) {
    throw new DatabaseError(error);
  }

  return (
    <Flex
      direction={{
        initial: 'column',
        xs: 'row',
      }}
      gap="6"
    >
      <Box
        style={{
          width: 240,
        }}
      >
        <Flex direction="column" gap="4">
          <AspectRatio ratio={1}>
            <Avatar
              alt={data.title}
              fallback="/images/logo.png"
              radius="small"
              src={data.images?.[0]}
              style={{
                height: 'auto',
                width: '100%',
              }}
            />
          </AspectRatio>

          <Text color="gray" size="2">
            {data.total_episode} episodes.
          </Text>
        </Flex>
      </Box>

      <Flex direction="column" gap="6" width="100%">
        <Flex direction="column" gap="2">
          <Heading as="h2" size="6">
            {data.title}
          </Heading>

          <Text color="gray" size="2">
            {data.publisher}
          </Text>
        </Flex>

        <Separator orientation="horizontal" size="4" />

        <Grid gap="6">
          {data.episodes
            .sort((a, b) => (b.published_date ?? 0) - (a.published_date ?? 0))
            .map((episode) => (
              <EpisodeCard
                hasContent={Boolean(episode.episode_content?.text_summary)}
                key={episode.id}
                {...episode}
              />
            ))}
        </Grid>
      </Flex>
    </Flex>
  );
}
