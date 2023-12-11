import { env } from '@/env.mjs';
import { Button, Container, Flex, Heading, Text } from '@radix-ui/themes';

export default function Page() {
  return (
    <Container
      size={{
        initial: '1',
      }}
    >
      <Flex direction="column" gap="2">
        <Heading>Hello from Radix Themes 🤓</Heading>
        <Text color="gray">Release: {env.GIT_SHA}</Text>
        <Button>Click me</Button>
      </Flex>
    </Container>
  );
}
