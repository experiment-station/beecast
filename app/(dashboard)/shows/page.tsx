import { ShowCard } from '@/components/show-card';
import { DatabaseError } from '@/lib/errors';
import { createSupabaseServerClient } from '@/lib/services/supabase/server';
import { Flex, Grid, Heading } from '@radix-ui/themes';
import { cookies } from 'next/headers';

export default async function Page() {
  const supabase = createSupabaseServerClient(cookies());
  const { data, error } = await supabase.from('show').select('*');

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
          md: '5',
          sm: '4',
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
