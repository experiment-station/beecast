import { DatabaseError } from '@/lib/errors';
// import { createSupabaseServerClient } from '@/lib/services/supabase/server';
import { createSupabaseServiceClient } from '@/lib/services/supabase/service';
import { Flex, Grid, Heading } from '@radix-ui/themes';
// import { cookies } from 'next/headers';

export default async function Page() {
  // const supabase = createSupabaseServerClient(cookies());
  const supabase = createSupabaseServiceClient();
  const { data, error } = await supabase.from('show').select('*');

  if (error) {
    throw new DatabaseError(error);
  }

  return (
    <Flex direction="column" gap="3">
      <Heading>Your Shows</Heading>

      <Grid columns="3" gap="3" width="auto">
        {data.map((show) => (
          <div key={show.id}>{show.title}</div>
        ))}
      </Grid>
    </Flex>
  );
}
