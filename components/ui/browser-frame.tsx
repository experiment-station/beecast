import type { ComponentProps } from 'react';

import { Card, Inset } from '@radix-ui/themes';

import './browser-frame.css';

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
          className={`app-frame mac centered scrolling ${className}`}
          {...props}
        >
          {children}
        </div>
      </Inset>
    </Card>
  );
}
