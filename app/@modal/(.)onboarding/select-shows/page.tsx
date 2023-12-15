import { RouteModal } from '@/components/route-modal';
import SelectShows from '@/components/select-shows';
import { fetchAccount } from '@/lib/services/account';
import { getUserShows } from '@/lib/services/spotify/get-user-shows';

export default async function Page() {
  const account = await fetchAccount();
  const shows = await getUserShows(account.provider_token);

  return (
    <RouteModal size="4">
      <SelectShows spotifyShows={shows} />
    </RouteModal>
  );
}
