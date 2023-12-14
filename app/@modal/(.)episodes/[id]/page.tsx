import type { Tables } from '@/types/supabase/database';

import { EpisodeDetail } from '@/components/episode-detail';
import { RouteModal } from '@/components/route-modal';

export default function Page(props: {
  params: { id: Tables<'episode'>['id'] };
}) {
  return (
    <RouteModal>
      <EpisodeDetail id={props.params.id} />
    </RouteModal>
  );
}
