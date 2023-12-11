import type { ComponentProps } from 'react';

import Image from 'next/image';

type Props = {
  size?: ComponentProps<typeof Image>['width'];
};

export function Logo(props: Props) {
  return (
    <Image
      alt="beecast logo"
      height={props.size || 48}
      src="/logo.png"
      style={{ display: 'block' }}
      width={props.size || 48}
    />
  );
}
