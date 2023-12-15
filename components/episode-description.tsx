import { Text } from '@radix-ui/themes';
import parseHTML from 'html-react-parser';

import styles from './episode-description.module.css';

export function EpisodeDescription({ children }: { children: string }) {
  return (
    <Text className={styles.Container} trim="start">
      {parseHTML(children)}
    </Text>
  );
}
