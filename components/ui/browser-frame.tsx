import type { ComponentProps } from 'react';

import { Card, Inset } from '@radix-ui/themes';
import 'css-device-frames/dist/device-frames.min.css';

import styles from './browser-frame.module.css';

type Props = ComponentProps<'div'>;

export default function BrowserFrame({
  children,
  className = '',
  ...props
}: Props) {
  return (
    <Card>
      <Inset>
        <div
          className={`${styles.BrowserFrame} ${styles.BrowserFrameTheme} app-frame mac centered scrolling ${className}`}
          {...props}
        >
          {children}
        </div>
      </Inset>
    </Card>
  );
}
