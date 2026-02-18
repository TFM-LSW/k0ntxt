import { memo, useEffect, useMemo, useRef, useState } from 'react';
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
import aliasTokens from '@/tokens/alias.json';
import { resolveDesignToken } from '../../../utils/resolveDesignToken';
import { useTheme } from 'next-themes';

type SemanticColorRampProps = {
  query: string;
  referencesOnly: boolean;
};

type AliasTokenNode = {
  $value?: string;
  $description?: string;
  [key: string]: unknown;
};

type SemanticTokenRow = {
  tokenName: string;
  rawValue: string;
  resolvedValue: string;
  description?: string;
  cssVar: string;
  isReference: boolean;
};

const semanticTokenCssVar = (tokenName: string) => `--alias-color-${tokenName.replace(/\./g, '-')}`;

const flattenSemanticTokens = (prefix: string, obj: Record<string, unknown>): SemanticTokenRow[] => {
  return Object.entries(obj).flatMap(([key, value]) => {
    const currentName = prefix ? `${prefix}.${key}` : key;

    if (value && typeof value === 'object' && !('$value' in (value as AliasTokenNode))) {
      return flattenSemanticTokens(currentName, value as Record<string, unknown>);
    }

    const token = value as AliasTokenNode;
    const rawValue = token?.$value;

    if (typeof rawValue !== 'string') {
      return [];
    }

    return [
      {
        tokenName: currentName,
        rawValue,
        resolvedValue: rawValue,
        description: token?.$description,
        cssVar: semanticTokenCssVar(currentName),
        isReference: rawValue.startsWith('{') && rawValue.endsWith('}'),
      },
    ];
  });
};

const SemanticColorRamp = ({ query, referencesOnly }: SemanticColorRampProps) => {
  const { resolvedTheme } = useTheme();
  const [globalTokens, setGlobalTokens] = useState<any>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(640);

  useEffect(() => {
    let isActive = true;

    const loadTokens = async () => {
      const tokens = resolvedTheme === 'light'
        ? await import('@/tokens/global.light.json')
        : await import('@/tokens/global.dark.json');

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

  const baseRows = useMemo(() => {
    if (!globalTokens?.global) return [];

    return flattenSemanticTokens('', aliasTokens.alias.color)
      .map((row) => {
        const { value: resolvedValue, description } = resolveDesignToken(
          row.rawValue,
          globalTokens.global,
          new Set(),
          row.description,
        );

        return {
          ...row,
          resolvedValue,
          description,
        };
      });
  }, [globalTokens]);

  const rows = useMemo(() => {
    if (!baseRows.length) return [];

    return baseRows
      .filter((row) => {
        if (referencesOnly && !row.isReference) {
          return false;
        }

        if (!normalizedQuery) {
          return true;
        }

        const searchBlob = [
          row.tokenName,
          row.rawValue,
          row.resolvedValue,
          row.cssVar,
          row.description ?? '',
        ]
          .join(' ')
          .toLowerCase();

        return searchBlob.includes(normalizedQuery);
      });
  }, [baseRows, normalizedQuery, referencesOnly]);

  const shouldVirtualize = rows.length > 80;
  const rowHeight = 184;
  const overscan = 6;
  const visibleCount = Math.ceil(viewportHeight / rowHeight);
  const startIndex = shouldVirtualize
    ? Math.max(0, Math.floor(scrollTop / rowHeight) - overscan)
    : 0;
  const endIndex = shouldVirtualize
    ? Math.min(rows.length, startIndex + visibleCount + overscan * 2)
    : rows.length;
  const visibleRows = shouldVirtualize ? rows.slice(startIndex, endIndex) : rows;
  const topSpacerHeight = shouldVirtualize ? startIndex * rowHeight : 0;
  const bottomSpacerHeight = shouldVirtualize ? Math.max(0, (rows.length - endIndex) * rowHeight) : 0;

  useEffect(() => {
    if (!listRef.current) return;

    const updateViewport = () => {
      if (listRef.current) {
        setViewportHeight(listRef.current.clientHeight);
      }
    };

    updateViewport();

    const resizeObserver = new ResizeObserver(updateViewport);
    resizeObserver.observe(listRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  if (!globalTokens) {
    return (
      <HStack py="6" color="fg.muted">
        <Spinner size="sm" />
        <Text>Loading semantic tokens...</Text>
      </HStack>
    );
  }

  if (rows.length === 0) {
    return <Text color="fg.muted">No semantic tokens match your current filters.</Text>;
  }

  return (
    <Card.Root variant="outline" borderColor="border.muted" mt="4">
      <Card.Header pb="2">
        <HStack justify="space-between" align="center">
          <Text fontSize="lg" fontWeight="semibold">Alias colors</Text>
          <HStack gap="2">
            {shouldVirtualize && (
              <Badge variant="surface" colorPalette="brand.blue">virtualized</Badge>
            )}
            <Badge variant="subtle" colorPalette="accent.primary">{rows.length} tokens</Badge>
          </HStack>
        </HStack>
      </Card.Header>
      <Card.Body pt="0">
        <Stack
          ref={listRef}
          gap="3"
          maxH={shouldVirtualize ? '72vh' : undefined}
          overflowY={shouldVirtualize ? 'auto' : undefined}
          onScroll={shouldVirtualize ? (event) => setScrollTop(event.currentTarget.scrollTop) : undefined}
        >
          {topSpacerHeight > 0 && <Box h={`${topSpacerHeight}px`} />}
          {visibleRows.map((row) => (
            <Box
              key={row.tokenName}
              borderWidth="1px"
              borderColor="border.muted"
              rounded="md"
              p="3"
              h={shouldVirtualize ? `${rowHeight}px` : undefined}
              overflow="hidden"
            >
              <Stack gap="3">
                <Flex justify="space-between" align={{ base: 'start', md: 'center' }} direction={{ base: 'column', md: 'row' }} gap="2">
                  <Stack gap="1">
                    <Text fontWeight="medium">{row.tokenName}</Text>
                    {row.description && (
                      <Text fontSize="xs" color="fg.muted" lineClamp={2}>
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

                  <Box flex="1">
                    <Text fontSize="xs" color="fg.muted" mb="1">Resolved</Text>
                    <Clipboard.Root value={row.resolvedValue}>
                      <Clipboard.Trigger asChild>
                        <Button variant="subtle" size="xs" justifyContent="start" w="full">
                          {row.resolvedValue.toUpperCase()}
                        </Button>
                      </Clipboard.Trigger>
                    </Clipboard.Root>
                  </Box>

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
          {bottomSpacerHeight > 0 && <Box h={`${bottomSpacerHeight}px`} />}
        </Stack>
      </Card.Body>
    </Card.Root>
  );
};

export default memo(SemanticColorRamp);
