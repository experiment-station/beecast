'use client';
import type { SpotifyShow } from '@/lib/services/spotify/get-user-shows';

import { Button, Flex, Grid, Heading, Text } from '@radix-ui/themes';
import { useState } from 'react';
import { FaArrowDown } from 'react-icons/fa';

import { ShowCard } from './show-card';

type SelectedShow = Pick<SpotifyShow['show'], 'id' | 'name'>;

export default function SelectShows({
  spotifyShows,
}: {
  spotifyShows: SpotifyShow[];
}) {
  const [selectedShows, setSelectedShows] = useState<SelectedShow[]>([]);

  const isSelected = (show: SpotifyShow['show']) =>
    Boolean(selectedShows.find((item: SelectedShow) => item.id === show.id));

  const handleOnClick = (show: SpotifyShow['show']) => {
    if (isSelected(show)) {
      setSelectedShows(selectedShows.filter((item) => item.id !== show.id));
    } else {
      setSelectedShows([
        ...selectedShows,
        {
          id: show.id,
          name: show.name,
        },
      ]);
    }
  };

  return (
    <Flex direction="column" gap="4">
      <Flex
        align={{
          initial: 'start',
          xs: 'center',
        }}
        direction={{
          initial: 'column',
          xs: 'row',
        }}
        gap={{
          initial: '3',
        }}
        justify={{
          initial: 'between',
          xs: 'between',
        }}
      >
        <Heading
          as="h2"
          size={{
            initial: '4',
            lg: '6',
            xs: '4',
          }}
        >
          Choose from your Spotify shows!
        </Heading>

        {selectedShows.length > 0 && (
          <Flex align="center" direction="row" gap="3">
            <Text size="2">{selectedShows.length} shows selected.</Text>
            <Button
              highContrast
              size={{
                initial: '1',
                lg: '2',
              }}
              variant="outline"
            >
              <FaArrowDown />
              Import
            </Button>
          </Flex>
        )}
      </Flex>
      <Grid
        columns={{
          initial: '2',
          md: '4',
          xs: '3',
        }}
        gap={{
          initial: '4',
          md: '5',
        }}
      >
        {spotifyShows.map(({ show }) => (
          <ShowCard.Toggle
            description={show.description}
            images={[show.images[1].url]}
            key={show.id}
            onClick={() => {
              handleOnClick(show);
            }}
            selected={isSelected(show)}
            title={show.name}
          />
        ))}
      </Grid>
    </Flex>
  );
}
