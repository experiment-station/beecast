import type { Tables } from '@/types/supabase/database';

import { EpisodeDetail } from '@/components/episode-detail';

export default function Page(props: {
  params: { id: Tables<'episode'>['id'] };
}) {
  return (
    <EpisodeDetail.Root>
      <EpisodeDetail.Page id={props.params.id} />
    </EpisodeDetail.Root>
  );
}
