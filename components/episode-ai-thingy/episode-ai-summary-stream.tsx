import type { Tables } from '@/types/supabase/database';

type Props = {
  id: Tables<'episode'>['id'];
  title: Tables<'episode'>['title'];
  transcription: string;
};

export function EpisodeAISummaryStream(props: Props) {
  console.log(props);

  return <div>hi how are you</div>;
}
