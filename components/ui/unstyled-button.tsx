import type { ComponentProps } from 'react';

export function UnstyledButton(props: ComponentProps<'button'>) {
  return (
    <button
      style={{
        background: 'none',
        border: 'none',
        color: 'inherit',
        cursor: 'var(--cursor-button)',
        font: 'inherit',
        margin: 0,
        padding: 0,
        textAlign: 'left',
        width: '100%',
      }}
      type="button"
      {...props}
    />
  );
}
