import type { ComponentProps } from 'react';

import 'css-device-frames/dist/device-frames.min.css';

import styles from './browser-frame.module.css';

type Props = ComponentProps<'div'>;

export default function BrowserFrame({
  children,
  className = '',
  ...props
}: Props) {
  return (
    <div
      className={`${styles.BrowserFrame} app-frame mac centered scrolling ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
