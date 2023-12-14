import type { Tables } from '@/types/supabase/database';

import { EpisodeCard } from '@/components/episode-card';
import { DatabaseError } from '@/lib/errors';
import { createSupabaseServerClient } from '@/lib/services/supabase/server';
import {
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
    .select('*, episodes:episode(*)')
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
    <Flex direction="row" gap="6">
      <Box
        style={{
          width: 200,
        }}
      >
        <Flex direction="column" gap="4">
          <Avatar
            alt={data.title}
            fallback="/images/placeholder.png"
            radius="small"
            src={data.images?.[0]}
            style={{
              height: 200,
              width: 200,
            }}
          />

          <Text color="gray" size="2">
            {data.total_episode} episodes.
          </Text>
        </Flex>
      </Box>

      <Flex direction="column" gap="6">
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
          {data.episodes.map((episode) => (
            <EpisodeCard key={episode.id} {...episode} />
          ))}
        </Grid>
      </Flex>
    </Flex>
  );
}
