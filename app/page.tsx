import { Button, Container, Flex, Heading, Text } from '@radix-ui/themes';

export default function Page() {
  return (
    <Container
      size={{
        initial: '1',
      }}
    >
      <Flex direction="column" gap="2">
        <Heading>Hello World</Heading>
        <Text>Hello from Radix Themes 🤓</Text>
        <Button>Click me</Button>
      </Flex>
    </Container>
  );
}
