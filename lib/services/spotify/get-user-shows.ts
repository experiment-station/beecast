type Show = {
  description: string;
  id: string;
  images: string;
  language: string;
  name: string;
  publisher: string;
  total_episodes: number;
};

type Items = {
  added_at: string;
  show: Show;
};

type SpotifyItems = {
  items: Items;
  limit: number;
  offset: number;
};

export const getUserShows = async (spotifyToken: string): Promise<Items> => {
  try {
    const response = await fetch('https://api.spotify.com/v1/me/shows', {
      headers: {
        Authorization: `Bearer ${spotifyToken}`,
      },
      method: 'GET',
    });

    const { items } = (await response.json()) as SpotifyItems;
    return items;
  } catch (e) {
    throw Error('Could not get shows from spotify');
  }
};
