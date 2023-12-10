import { GitHubLogoIcon, TwitterLogoIcon } from '@radix-ui/react-icons';
import { Flex, Link, Text } from '@radix-ui/themes';
import React from 'react';

import { AppContent } from './app-content';

// @TODO: replace with real links: SUPA-27
const FOOTER_SERVICE_LINKS = [
  {
    href: 'https://experiment.st',
    label: 'Privacy policy',
  },
  {
    href: 'https://experiment.st',
    label: 'Terms of service',
  },
] as const;

const FOOTER_SOCIAL_LINKS = [
  {
    href: 'https://github.com/experiment-station/beecast',
    icon: <GitHubLogoIcon />,
    title: 'GitHub',
  },
  {
    href: 'https://twitter.com/beecast_ai',
    icon: <TwitterLogoIcon />,
    title: 'Twitter',
  },
] as const;

export function AppFooter() {
  return (
    <AppContent>
      <Flex justify="between" py="4">
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
          <Flex align="center" gap="2">
            {FOOTER_SOCIAL_LINKS.map((link) => (
              <Link
                color="gray"
                href={link.href}
                key={link.href}
                target="_blank"
                title={link.title}
              >
                {link.icon}
              </Link>
            ))}
          </Flex>

          <Text color="gray" size="2">
            ©2023 Experiment Station
          </Text>
        </Flex>
      </Flex>
    </AppContent>
  );
}
