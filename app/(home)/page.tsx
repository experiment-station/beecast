import { EpisodeAISummaryPanel } from '@/components/episode-ai-summary/episode-ai-summary-panel';
import { EpisodeDetail } from '@/components/episode-detail';
import BrowserFrame from '@/components/ui/browser-frame';
import { DatabaseError } from '@/lib/errors';
import { createSupabaseServiceClient } from '@/lib/services/supabase/service';
import { Em, Flex, Heading, Text } from '@radix-ui/themes';

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
      audio_url={data.audio_url}
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
    <Flex align="center" direction="column" gap="6" mx="auto">
      <Flex align="center" direction="column" gap="2">
        <Heading
          align="center"
          size={{
            initial: '6',
            md: '8',
            sm: '7',
          }}
        >
          A more efficient way to listen podcasts
        </Heading>

        <Text
          align="center"
          color="gray"
          size={{
            initial: '3',
            md: '4',
          }}
        >
          Meet <Em>beecast</Em>, your hard-working AI podcast companion.
        </Text>
      </Flex>

      <BrowserFrame data-url="beecast.ai">
        <EpisodeDemo />
      </BrowserFrame>
    </Flex>
  );
}
