import { memo, useEffect, useMemo, useState } from 'react';
import { alias } from '@/tokens/alias.json';
import globalLightTokens from '@/tokens/global.light.json';
import { useTheme } from 'next-themes';
import { Box, Card, Heading, Stack, Text } from '@chakra-ui/react';

type FontExamplesProps = {
  query?: string;
};

export const resolveTokenValue = (
  value: string,
  tokenRoot: any = globalLightTokens.global,
): string => {
  const cleanValue = value.replace(/^{global\.|}$/g, '');
  const parts = cleanValue.split('.');

  let current: any = tokenRoot;
  for (const part of parts) {
    if (current && current[part]) {
      current = current[part];
    } else {
      return value;
    }
  }

  return current?.$value ?? value;
};

const FontExamples = ({ query = '' }: FontExamplesProps) => {
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

  const filteredEntries = useMemo(() => {
    const fontEntries = Object.entries(alias.font as Record<string, Record<string, any>>);

    return fontEntries
      .map(([category, variations]) => {
        const nextVariations = Object.entries(variations).filter(([variation]) => {
          if (!normalizedQuery) return true;
          return `${category}.${variation}`.toLowerCase().includes(normalizedQuery);
        });

        return [category, nextVariations] as const;
      })
      .filter(([, variations]) => variations.length > 0);
  }, [normalizedQuery]);

  return (
    <Card.Root variant="outline" borderColor="border.muted" mt="8">
      <Card.Header pb="2">
        <Heading size="xl">Font</Heading>
      </Card.Header>
      <Card.Body pt="0">
        <Stack gap="5">
          {filteredEntries.map(([category, variations]) => (
            <Box key={category}>
              <Heading size="md" mb="3" textTransform="capitalize">
                {category}
              </Heading>
              <Stack gap="4">
                {variations.map(([variation, styles]) => {
                  const value = styles.$value;
                  const tokenRoot = globalTokens?.global;

                  const fontSize = tokenRoot ? resolveTokenValue(value.fontSize, tokenRoot) : value.fontSize;
                  const fontWeight = tokenRoot ? resolveTokenValue(value.fontWeight, tokenRoot) : value.fontWeight;
                  const lineHeight = tokenRoot ? resolveTokenValue(value.lineHeight, tokenRoot) : value.lineHeight;
                  const fontFamily = tokenRoot ? resolveTokenValue(value.fontFamily, tokenRoot) : value.fontFamily;

                  return (
                    <Box key={`${category}-${variation}`} borderWidth="1px" borderColor="border.muted" rounded="md" p="3">
                      <Text fontSize="xs" color="fg.muted" mb="2">
                        {category}.{variation}
                      </Text>
                      <Text
                        fontSize={fontSize}
                        fontWeight={fontWeight}
                        lineHeight={lineHeight}
                        fontFamily={fontFamily}
                      >
                        The quick brown fox jumps over the lazy dog.
                      </Text>
                    </Box>
                  );
                })}
              </Stack>
            </Box>
          ))}
          {filteredEntries.length === 0 && (
            <Text color="fg.muted">No font tokens match your current search.</Text>
          )}
        </Stack>
      </Card.Body>
    </Card.Root>
  );
};

export default memo(FontExamples);
