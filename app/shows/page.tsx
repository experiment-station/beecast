import type { Tables } from '@/types/supabase/database';

import { ShowCard } from '@/components/show-card';
import { DatabaseError } from '@/lib/errors';
import { getAccountId } from '@/lib/services/account';
import { createSupabaseServerClient } from '@/lib/services/supabase/server';
import { Flex, Grid, Heading, Separator } from '@radix-ui/themes';
import { cookies } from 'next/headers';
import Link from 'next/link';

const fetchAllShows = async () => {
  const supabase = createSupabaseServerClient(cookies());
  const response = await supabase
    .from('show')
    .select('id, title, images, publisher')
    .order('created_at', { ascending: false });

  return response;
};

const fetchMyShows = async () => {
  const supabase = createSupabaseServerClient(cookies());
  const accountId = await getAccountId();
  const response = await supabase
    .from('account_show_relation')
    .select('show (id, title, images, publisher)')
    .eq('account', accountId)
    .not('show', 'is', null)
    .order('created_at', { ascending: false });

  return response;
};

export default async function Page() {
  const { data, error } = await fetchMyShows();
  const response = await fetchAllShows();
  let showsData = response.data;

  if (error) {
    throw new DatabaseError(error);
  }

  if (response.error) {
    throw new DatabaseError(response.error);
  }

  const myShows = data.filter(
    (i): i is { show: Tables<'show'> } => i.show !== null,
  );

  if (myShows.length > 0) {
    showsData =
      showsData?.filter((i) => !myShows.map((s) => s.show.id).includes(i.id)) ??
      [];
  }

  return (
    <Flex direction="column" gap="4">
      {myShows.length > 0 && (
        <>
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
            {myShows.map(({ show }) => (
              <Link
                href={`/shows/${show.id}`}
                key={show.id}
                style={{
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                <ShowCard
                  images={show.images}
                  publisher={show.publisher}
                  title={show.title}
                />
              </Link>
            ))}
          </Grid>

          <Separator
            orientation="horizontal"
            size="4"
            style={{
              margin: '1em 0',
            }}
          />
        </>
      )}

      <Heading as="h2" size="6">
        If you want to give a shot
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
        {showsData?.map((show) => (
          <Link
            href={`/shows/${show.id}`}
            key={show.id}
            style={{
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <ShowCard
              images={show.images}
              publisher={show.publisher}
              title={show.title}
            />
          </Link>
        ))}
      </Grid>
    </Flex>
  );
}
