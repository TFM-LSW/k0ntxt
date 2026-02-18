import { memo, useEffect, useMemo, useState } from 'react';
import type { Token } from '@/views/tokens/components/types';
import {
  Badge,
  Box,
  Button,
  Card,
  Clipboard,
  Flex,
  HStack,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react';
import { resolveDesignToken, tokenPathToCssVar } from '../../../utils/resolveDesignToken';
import { useTheme } from 'next-themes';

type GlobalColorRampProps = {
  query: string;
  referencesOnly: boolean;
};

type GlobalTokenRow = {
  id: string;
  tokenName: string;
  rawValue: string;
  resolvedValue: string;
  description?: string;
  cssVar: string;
  isReference: boolean;
};

const GlobalColorRamp = ({ query, referencesOnly }: GlobalColorRampProps) => {
  const { resolvedTheme } = useTheme();
  const [globalTokens, setGlobalTokens] = useState<any>(null);

  useEffect(() => {
    let isActive = true;

    const loadTokens = async () => {
      const tokens = resolvedTheme === 'dark'
        ? await import('@/tokens/global.dark.json')
        : await import('@/tokens/global.light.json');

      if (isActive) {
        setGlobalTokens(tokens.default);
      }
    };

    void loadTokens();

    return () => {
      isActive = false;
    };
  }, [resolvedTheme]);

  const normalizedQuery = query.trim().toLowerCase();

  const baseGroups = useMemo(() => {
    if (!globalTokens?.global?.colors) return [];

    const colorEntries = Object.entries(globalTokens.global.colors as Record<string, Record<string, Token>>);

    return colorEntries.map(([colorName, ramp]) => {
      const rows: GlobalTokenRow[] = Object.entries(ramp)
        .sort(([a], [b]) => Number(a) - Number(b))
        .flatMap(([step, token]) => {
          if (!token || typeof token !== 'object' || typeof token.$value !== 'string') {
            return [];
          }

          const rawValue = token.$value;
          const { value: resolvedValue, description } = resolveDesignToken(
            rawValue,
            globalTokens.global,
            new Set(),
            token.$description,
          );

          return [
            {
              id: `${colorName}-${step}`,
              tokenName: `${colorName}.${step}`,
              rawValue,
              resolvedValue,
              description,
              cssVar: tokenPathToCssVar(`{global.colors.${colorName}.${step}}`),
              isReference: rawValue.startsWith('{') && rawValue.endsWith('}'),
            },
          ];
        });

      return { colorName, rows };
    });
  }, [globalTokens]);

  const groups = useMemo(() => {
    if (!baseGroups.length) return [];

    return baseGroups
      .map((group) => {
        const rows = group.rows.filter((row) => {
          if (referencesOnly && !row.isReference) {
            return false;
          }

          if (normalizedQuery) {
            const searchBlob = [
              row.tokenName,
              row.rawValue,
              row.resolvedValue,
              row.cssVar,
              row.description ?? '',
            ]
              .join(' ')
              .toLowerCase();

            if (!searchBlob.includes(normalizedQuery)) {
              return false;
            }
          }

          return true;
        });

        return { colorName: group.colorName, rows };
      })
      .filter((group) => group.rows.length > 0);
  }, [baseGroups, normalizedQuery, referencesOnly]);

  if (!globalTokens) {
    return (
      <HStack py="6" color="fg.muted">
        <Spinner size="sm" />
        <Text>Loading global tokens...</Text>
      </HStack>
    );
  }

  if (groups.length === 0) {
    return <Text color="fg.muted">No global tokens match your current filters.</Text>;
  }

  return (
    <Stack gap="5" mt="4">
      {groups.map((group) => (
        <Card.Root key={group.colorName} variant="outline" borderColor="border.muted">
          <Card.Header pb="2">
            <HStack justify="space-between" align="center">
              <Text fontSize="lg" fontWeight="semibold">
                {group.colorName}
              </Text>
              <Badge variant="subtle" colorPalette="accent.primary">
                {group.rows.length} tokens
              </Badge>
            </HStack>
          </Card.Header>
          <Card.Body pt="0">
            <Stack gap="3">
              {group.rows.map((row) => (
                <Box key={row.id} borderWidth="1px" borderColor="border.muted" rounded="md" p="3">
                  <Stack gap="3">
                    <Flex justify="space-between" align={{ base: 'start', md: 'center' }} direction={{ base: 'column', md: 'row' }} gap="2">
                      <Stack gap="1">
                        <Text fontWeight="medium">{row.tokenName}</Text>
                        {row.description && (
                          <Text fontSize="xs" color="fg.muted">
                            {row.description}
                          </Text>
                        )}
                      </Stack>
                      <Clipboard.Root value={row.tokenName}>
                        <Clipboard.Trigger asChild>
                          <Button variant="ghost" size="xs">
                            <Clipboard.Indicator />
                            Copy name
                          </Button>
                        </Clipboard.Trigger>
                      </Clipboard.Root>
                    </Flex>

                    <Box h="8" rounded="sm" borderWidth="1px" borderColor="border.muted" bg={row.resolvedValue} />

                    <Stack direction={{ base: 'column', md: 'row' }} gap="3" align="stretch">
                      <Box flex="1">
                        <Text fontSize="xs" color="fg.muted" mb="1">Raw token</Text>
                        <Clipboard.Root value={row.rawValue}>
                          <Clipboard.Trigger asChild>
                            <Button variant="subtle" size="xs" justifyContent="start" w="full">
                              {row.rawValue}
                            </Button>
                          </Clipboard.Trigger>
                        </Clipboard.Root>
                      </Box>

                      {row.isReference && (
                        <Box flex="1">
                          <Text fontSize="xs" color="fg.muted" mb="1">Resolved</Text>
                          <Clipboard.Root value={row.resolvedValue}>
                            <Clipboard.Trigger asChild>
                              <Button variant="subtle" size="xs" justifyContent="start" w="full">
                                {row.resolvedValue}
                              </Button>
                            </Clipboard.Trigger>
                          </Clipboard.Root>
                        </Box>
                      )}

                      <Box flex="1">
                        <Text fontSize="xs" color="fg.muted" mb="1">CSS var</Text>
                        <Clipboard.Root value={row.cssVar}>
                          <Clipboard.Trigger asChild>
                            <Button variant="subtle" size="xs" justifyContent="start" w="full">
                              {row.cssVar}
                            </Button>
                          </Clipboard.Trigger>
                        </Clipboard.Root>
                      </Box>
                    </Stack>
                  </Stack>
                </Box>
              ))}
            </Stack>
          </Card.Body>
        </Card.Root>
      ))}
    </Stack>
  );
};

export default memo(GlobalColorRamp);
