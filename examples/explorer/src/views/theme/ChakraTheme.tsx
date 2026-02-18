import React, { Suspense, lazy } from 'react';
import { Box, Heading, Link, Stack, Tabs, Text } from '@chakra-ui/react';
import { ColorModeButton } from "@/components/ui/color-mode";

const GlobalColorRamp = lazy(() => import('./components/GlobalColorRamp'));
const SemanticColorRamp = lazy(() => import('./components/SemanticColorRamp'));
const ChakraDemo = lazy(() => import('./ChakraDemo'));
const Charts = lazy(() => import('./components/Charts'));

const ChakraTheme: React.FC = () => {
  return (
    <Stack gap="5" mb="4">
      <Box>
        <Heading size="lg">Token driven Chakra theme / Chakra UI</Heading>
        <Text mt="2" color="fg.muted">
          Interactive kitchen sink for k0ntxt Chakra components, charts, and tokenized color systems.
        </Text>
      </Box>

      <Tabs.Root defaultValue="components" as="div" lazyMount>
        <Tabs.List
          position="sticky"
          top="0"
          zIndex="1"
          bg="bg.subtle"
          boxShadow="sm"
          borderWidth="1px"
          borderColor="border.muted"
          rounded="md"
          colorPalette="accent.primary"
          overflowX="auto"
          whiteSpace="nowrap"
          pr="14"
          css={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            '&::-webkit-scrollbar': { display: 'none' },
            '& [role="tab"]': {
              fontWeight: 500,
            },
          }}
        >
          <Tabs.Trigger value="components" asChild>
            <Link unstyled href="#components" fontWeight="medium">
              Components
            </Link>
          </Tabs.Trigger>
          <Tabs.Trigger value="charts" asChild>
            <Link unstyled href="#charts" fontWeight="medium">
              Charts
            </Link>
          </Tabs.Trigger>
          <Tabs.Trigger value="tokens" asChild>
            <Link unstyled href="#tokens" fontWeight="medium">
              Base Tokens
            </Link>
          </Tabs.Trigger>
          <Tabs.Trigger value="semantics" asChild>
            <Link unstyled href="#semantics" fontWeight="medium">
              Semantic Tokens
            </Link>
          </Tabs.Trigger>
          <Box
            position="absolute"
            right="2"
            top="1px"
            bottom="1px"
            display="flex"
            alignItems="center"
            bg="bg.subtle"
            pl="2"
          >
            <ColorModeButton />
          </Box>
        </Tabs.List>
        <Tabs.Content value="tokens">
          <Suspense fallback={<Text color="fg.muted">Loading tokens...</Text>}>
            <GlobalColorRamp />
          </Suspense>
        </Tabs.Content>
        <Tabs.Content value="semantics">
          <Suspense fallback={<Text color="fg.muted">Loading semantic tokens...</Text>}>
            <SemanticColorRamp />
          </Suspense>
        </Tabs.Content>
        <Tabs.Content value="components">
          <Suspense fallback={<Text color="fg.muted">Loading components...</Text>}>
            <ChakraDemo />
          </Suspense>
        </Tabs.Content>
        <Tabs.Content value="charts">
          <Suspense fallback={<Text color="fg.muted">Loading charts...</Text>}>
            <Charts />
          </Suspense>
        </Tabs.Content>
      </Tabs.Root>
    </Stack>
  );
};

export default ChakraTheme;
