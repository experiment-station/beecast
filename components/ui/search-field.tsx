'use client';
import { saveEpisodes } from '@/lib/services/episode';
import { fetchEpisodes } from '@/lib/services/podcast-index/fetch-episodes';
import { searchShow } from '@/lib/services/podcast-index/search-show';
import { saveShow } from '@/lib/services/show';
import { createSupabaseBrowserClient } from '@/lib/services/supabase/browser';
import { Button, Flex, Text, TextField } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { IoIosSearch } from 'react-icons/io';

export default function SearchField() {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();

  const onClickHandler = async () => {
    setWarningMessage('');
    setLoading(true);
    const { data } = await supabase
      .from('show')
      .select('id')
      .ilike('title', value)
      .single();
    if (data) {
      router.push(`/shows/${data.id}`);
    } else {
      const show = await searchShow(value);
      setLoading(false);
      if (!show) {
        setWarningMessage(
          'No results. Please try again with complete name of the show.',
        );
        return;
      }

      const savedShow = await saveShow(show);
      const episodes = await fetchEpisodes(savedShow.podcast_index_guid);
      await saveEpisodes(episodes, savedShow.id);
      router.push(`/shows/${savedShow.id}`);
    }
  };

  return (
    <Flex align="start" direction="column" gap="2">
      <Flex
        direction={{
          initial: 'column',
          sm: 'row',
        }}
        gap="4"
      >
        <TextField.Root>
          <TextField.Input
            onChange={(e) => {
              setValue(e.target.value);
            }}
            placeholder="Search show names..."
            radius="small"
            size="2"
            style={{
              width: 320,
            }}
            value={value}
          />
        </TextField.Root>
        <Button
          disabled={loading}
          highContrast
          onClick={() => onClickHandler()}
          size={{
            initial: '2',
            lg: '2',
          }}
          variant="outline"
        >
          <IoIosSearch />
          Search
        </Button>
      </Flex>
      <Text color="red" size="2">
        {warningMessage}
      </Text>
    </Flex>
  );
}
