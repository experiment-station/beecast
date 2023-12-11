import { env } from '@/env.mjs';
import { fetchAccountAICredits } from '@/lib/services/account';
import { generateEpisodeContent } from '@/lib/services/episode-content-generator';
import { Button, Container, Flex, Heading, Text } from '@radix-ui/themes';

const generateMockEpisodeContent = async () => {
  'use server';

  try {
    const result = await generateEpisodeContent({
      accountId: 16,
      episodeId: 2,
    });

    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

export default async function Page() {
  const credits = await fetchAccountAICredits(16);

  return (
    <Container
      size={{
        initial: '1',
      }}
    >
      <Flex direction="column" gap="2">
        <Heading>Hello from Radix Themes 🤓</Heading>
        <Text color="gray">Release: {env.GIT_SHA}</Text>

        <form>
          <Button formAction={generateMockEpisodeContent} type="submit">
            Click me {credits}
          </Button>
        </form>
      </Flex>
    </Container>
  );
}
