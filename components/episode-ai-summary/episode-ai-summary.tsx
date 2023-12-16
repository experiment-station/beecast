import type { Tables } from '@/types/supabase/database';

import { DatabaseError } from '@/lib/errors';
import { fetchAccountAICredits } from '@/lib/services/account';
import { createSupabaseServerClient } from '@/lib/services/supabase/server';
import { Button, Flex } from '@radix-ui/themes';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { CgDollar } from 'react-icons/cg';

import { EpisodeAISummaryFooter } from './episode-ai-summary-footer';
import { EpisodeAISummaryGenerator } from './episode-ai-summary-generator';
import { EpisodeAISummaryPanel } from './episode-ai-summary-panel';
import { EpisodeAISummaryPlaceholder } from './episode-ai-summary-placeholder';

type Props = {
  id: Tables<'episode'>['id'];
};

export async function EpisodeAISummary(props: Props) {
  const supabase = createSupabaseServerClient(cookies());
  const credits = await fetchAccountAICredits();
  const { data, error } = await supabase
    .from('episode_content')
    .select('*, user:account(id, display_name, avatar_url)')
    .eq('episode', props.id);

  if (error) {
    throw new DatabaseError(error);
  }

  if (data.length === 0 || data[0].text_summary === null) {
    if (credits < 1) {
      return (
        <EpisodeAISummaryPlaceholder>
          <Button asChild highContrast>
            <Link href="/credits">
              <CgDollar /> Buy credits to summarize this episode
            </Link>
          </Button>
        </EpisodeAISummaryPlaceholder>
      );
    }

    return <EpisodeAISummaryGenerator id={props.id} />;
  }

  const [episodeContent] = data;

  return (
    <Flex direction="column" gap="2">
      <EpisodeAISummaryPanel variant="collapsible">
        {episodeContent.text_summary}
      </EpisodeAISummaryPanel>

      <EpisodeAISummaryFooter id={props.id} />
    </Flex>
  );
}
