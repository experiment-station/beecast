import { ShowCard } from '@/components/show-card';
import { DatabaseError } from '@/lib/errors';
import { getAccountId } from '@/lib/services/account';
import { createSupabaseServerClient } from '@/lib/services/supabase/server';
import { Flex, Grid, Heading } from '@radix-ui/themes';
import { cookies } from 'next/headers';

const fetchAllShows = async () => {
  const supabase = createSupabaseServerClient(cookies());
  const response = await supabase
    .from('show')
    .select('id, title, description, images');

  return response;
};

const _fetchMyShows = async () => {
  const supabase = createSupabaseServerClient(cookies());
  const accountId = await getAccountId();
  const response = await supabase
    .from('account_show_relation')
    .select('id, show (title, description, images)')
    .eq('account', accountId);

  return response;
};

export default async function Page() {
  const { data, error } = await fetchAllShows();

  if (error) {
    throw new DatabaseError(error);
  }

  return (
    <Flex direction="column" gap="4">
      <Heading as="h2" size="6">
        Your shows
      </Heading>

      <Grid
        columns={{
          initial: '2',
          md: '4',
          xs: '3',
        }}
        gap={{
          initial: '4',
          md: '5',
        }}
      >
        {data.map((show) => (
          <ShowCard.Link
            description={show.description}
            href={`/shows/${show.id}`}
            images={show.images}
            key={show.id}
            title={show.title}
          />
        ))}
      </Grid>
    </Flex>
  );
}
