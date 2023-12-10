import { Button } from '@radix-ui/themes';

export default function Page() {
  return (
    <form action="/auth/sign-in" method="POST">
      <Button type="submit">Sign in with Spotify</Button>
    </form>
  );
}
