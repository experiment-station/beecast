'use client';
import type { SpotifyShow } from '@/lib/services/spotify/get-user-shows';

import { bulkSaveEpisodes } from '@/lib/services/episode';
import { bulkEpisodeSearch, bulkShowSearch } from '@/lib/services/importer-job';
import { bulkSaveShow, followShow } from '@/lib/services/show';
import { Button, Flex, Grid, Heading, Text } from '@radix-ui/themes';
import Link from 'next/link';
import { useState } from 'react';
import { FaArrowDown } from 'react-icons/fa';

import { ShowCardToggle } from './show-card';

export type SelectedShow = Pick<SpotifyShow['show'], 'id' | 'name'>;

type State =
  | { status: 'import_completed' }
  | { status: 'import_in_progress' }
  | { status: 'stale' };

export default function SelectShows({
  spotifyShows,
}: {
  spotifyShows: SpotifyShow[];
}) {
  const [selectedShows, setSelectedShows] = useState<SelectedShow[]>([]);
  const [importStatus, setImportStatus] = useState<State>({
    status: 'stale',
  });

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

  const handleImport = async () => {
    setImportStatus({ status: 'import_in_progress' });
    const podcastIndexShows = await bulkShowSearch(selectedShows);
    const savedShows = await bulkSaveShow(podcastIndexShows);
    const episodes = await bulkEpisodeSearch(savedShows);
    await bulkSaveEpisodes(episodes);
    const showIds = podcastIndexShows.map((s) => s.podcastGuid);
    await followShow(showIds);
    setImportStatus({ status: 'import_completed' });
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
              disabled={importStatus.status === 'import_in_progress'}
              highContrast
              onClick={() => handleImport()}
              size={{
                initial: '1',
                lg: '2',
              }}
              variant="outline"
            >
              <FaArrowDown />
              Import
            </Button>
            {importStatus.status === 'import_completed' && (
              <Link href="/shows">
                <Button
                  color="grass"
                  highContrast
                  size={{
                    initial: '1',
                    lg: '2',
                  }}
                >
                  Continue
                </Button>
              </Link>
            )}
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
          <ShowCardToggle
            images={[show.images[1].url]}
            key={show.id}
            onClick={() => {
              setImportStatus({ status: 'stale' });
              handleOnClick(show);
            }}
            publisher={show.publisher}
            selected={isSelected(show)}
            title={show.name}
          />
        ))}
      </Grid>
    </Flex>
  );
}
