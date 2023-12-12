import type { ComponentProps } from 'react';

export function UnstyledButton(props: ComponentProps<'button'>) {
  return (
    <button
      style={{
        background: 'none',
        border: 'none',
        color: 'inherit',
        font: 'inherit',
        margin: 0,
        padding: 0,
      }}
      type={props.type ?? 'button'}
      {...props}
    />
  );
}
