'use client';

import type { PropsWithChildren, ReactNode } from 'react';

import { Box, Card, Flex, Heading, IconButton, Text } from '@radix-ui/themes';
import { useEffect, useRef, useState } from 'react';
import { CgClose, CgExpand } from 'react-icons/cg';

import styles from './collapsible-panel.module.css';

type Props = PropsWithChildren<{
  height?: number;
  title: ReactNode;
}>;

export function CollapsiblePanel({ children, height = 60, ...props }: Props) {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [maxHeight, setMaxHeight] = useState(height);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.setProperty('--min-height', `${height}px`);

      contentRef.current.style.setProperty(
        '--max-height',
        `${contentRef.current.scrollHeight}px`,
      );

      setMaxHeight(contentRef.current.scrollHeight);
    }
  }, [height, children]);

  return (
    <Card className={styles.Container}>
      {maxHeight > height ? (
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
      ) : null}

      <Heading mb="2" size="2">
        {props.title}
      </Heading>

      <Box
        className={styles.Content}
        data-state={open ? 'open' : 'closed'}
        ref={contentRef}
        style={
          mounted
            ? {}
            : {
                maxHeight: `${height}px`,
              }
        }
      >
        <Text color="gray" size="2">
          {children}
        </Text>
      </Box>
    </Card>
  );
}
