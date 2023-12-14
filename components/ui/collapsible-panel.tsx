'use client';

import type { PropsWithChildren } from 'react';

import { Box, Card, Flex, Heading, IconButton, Text } from '@radix-ui/themes';
import { useEffect, useRef, useState } from 'react';
import { CgClose, CgExpand } from 'react-icons/cg';

import styles from './collapsible-panel.module.css';

type Props = PropsWithChildren<{
  height?: number;
  open?: boolean;
  title: string;
}>;

export function CollapsiblePanel({ height = 100, ...props }: Props) {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const controlledRef = useRef(typeof props.open === 'boolean');
  const [isHeightCalculated, setIsHeightCalculated] = useState(false);
  const [open, setOpen] = useState(controlledRef.current ? props.open : false);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.setProperty('--min-height', `${height}px`);

      contentRef.current.style.setProperty(
        '--max-height',
        `${contentRef.current.scrollHeight}px`,
      );

      setIsHeightCalculated(true);
    }
  }, [height]);

  useEffect(() => {
    if (typeof props.open === 'boolean') {
      setOpen(props.open);
    }
  }, [open, props.open]);

  return (
    <Card className={styles.Container}>
      {controlledRef.current ? null : (
        <Flex m="2" position="absolute" right="0" top="0">
          <IconButton
            onClick={() => {
              setOpen((o) => !o);
            }}
            size="1"
            tabIndex={-1}
            variant="ghost"
          >
            {open ? <CgClose /> : <CgExpand />}
          </IconButton>
        </Flex>
      )}

      <Heading mb="2" size="2">
        {props.title}
      </Heading>

      <Box
        className={styles.Content}
        data-state={open ? 'open' : 'closed'}
        ref={contentRef}
        style={{
          visibility: isHeightCalculated ? 'visible' : 'hidden',
        }}
      >
        <Text color="gray" size="2">
          {props.children}
        </Text>
      </Box>
    </Card>
  );
}
