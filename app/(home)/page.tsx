import { EpisodeAISummaryPanel } from '@/components/episode-ai-summary/episode-ai-summary-panel';
import { EpisodeDetail } from '@/components/episode-detail';
import BrowserFrame from '@/components/ui/browser-frame';
import { DatabaseError } from '@/lib/errors';
import { createSupabaseServiceClient } from '@/lib/services/supabase/service';
import { Box, Em, Flex, Heading, Text } from '@radix-ui/themes';
import { ErrorBoundary } from 'react-error-boundary';

const DEMO_EPISODE_ID = 166;

async function EpisodeDemo() {
  const supabase = createSupabaseServiceClient();

  const { data, error } = await supabase
    .from('episode')
    .select('*, show(id, title), episode_content(text_summary)')
    .eq('id', DEMO_EPISODE_ID)
    .single();

  if (error) {
    throw new DatabaseError(error);
  }

  return (
    <EpisodeDetail.Content
      description={data.description}
      duration={data.duration}
      id={data.id}
      image={data.image}
      published_date={data.published_date}
      show={{
        id: data.show.id,
        title: data.show.title,
      }}
      title={data.title}
    >
      <EpisodeAISummaryPanel variant="collapsible">
        {data.episode_content?.text_summary}
      </EpisodeAISummaryPanel>
    </EpisodeDetail.Content>
  );
}

export default function Page() {
  return (
    <Flex align="center" direction="column" gap="3" mx="auto">
      <Heading size="8">A more efficient way to listen podcasts</Heading>

      <Text color="gray" size="4">
        Meet <Em>beecast</Em>, your hard-working AI podcast companion.
      </Text>

      <BrowserFrame
        data-url="beecast.ai"
        style={{
          maxWidth: 'var(--container-2)',
        }}
      >
        <Box style={{ height: 480 }}>
          <ErrorBoundary fallback={<div>Failed to load demo...</div>}>
            <EpisodeDemo />
          </ErrorBoundary>
        </Box>
      </BrowserFrame>
    </Flex>
  );
}
