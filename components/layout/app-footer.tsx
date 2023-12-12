import { Flex, Link, Text } from '@radix-ui/themes';
import React from 'react';
import { FaGithub, FaXTwitter } from 'react-icons/fa6';

import { AppContent } from './app-content';

const FOOTER_SERVICE_LINKS = [
  {
    href: '/privacy-policy',
    label: 'Privacy policy',
  },
  {
    href: '/terms-of-service',
    label: 'Terms of service',
  },
] as const;

const FOOTER_SOCIAL_LINKS = [
  {
    href: 'https://github.com/experiment-station/beecast',
    icon: <FaGithub />,
    title: 'GitHub',
  },
  {
    href: 'https://x.com/beecast_ai',
    icon: <FaXTwitter />,
    title: 'X.com',
  },
] as const;

export function AppFooter() {
  return (
    <AppContent>
      <Flex align="end" justify="between" py="4">
        <Flex align="start" direction="column">
          <Text size="2" weight="bold">
            Built with ☕️ by your folks at the{' '}
            <Link color="gray" href="https://experiment.st" target="_blank">
              Experiment Station
            </Link>
          </Text>

          <Flex align="center" gap="1">
            {FOOTER_SERVICE_LINKS.map((link) => (
              <React.Fragment key={link.href}>
                <Link color="gray" href={link.href} size="2" target="_blank">
                  {link.label}
                </Link>

                {link !==
                FOOTER_SERVICE_LINKS[FOOTER_SERVICE_LINKS.length - 1] ? (
                  <Text size="2">·</Text>
                ) : null}
              </React.Fragment>
            ))}
          </Flex>
        </Flex>

        <Flex align="end" direction="column">
          <Flex align="center" gap="3">
            {FOOTER_SOCIAL_LINKS.map((link) => (
              <Link
                highContrast
                href={link.href}
                key={link.href}
                target="_blank"
                title={link.title}
              >
                <Text size="5">{link.icon}</Text>
              </Link>
            ))}
          </Flex>
        </Flex>
      </Flex>
    </AppContent>
  );
}
