import type { Tables } from '@/types/supabase/database';

import { DatabaseError } from '@/lib/errors';
import { fetchAccountAICredits } from '@/lib/services/account';
import { createSupabaseServerClient } from '@/lib/services/supabase/server';
import { Button, CalloutRoot, CalloutText, Flex } from '@radix-ui/themes';
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
    .select('id, text_summary')
    .eq('episode', props.id);

  if (error) {
    throw new DatabaseError(error);
  }

  if (data.length === 0 || data[0].text_summary === null) {
    if (credits.ai_credit_remaining_usage < 1) {
      return (
        <EpisodeAISummaryPlaceholder>
          <CalloutRoot color="amber" size="1">
            <CalloutText>
              You have used all your spendable credits. Thanks for using
              beecast!
            </CalloutText>
          </CalloutRoot>
        </EpisodeAISummaryPlaceholder>
      );
    }

    if (credits.ai_credit < 1) {
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
