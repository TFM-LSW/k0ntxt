'use client'

import {
  Badge,
  Box,
  Button,
  Card,
  Clipboard,
  HStack,
  Stack,
  Text,
} from '@chakra-ui/react'
import { semanticTokens } from '@/tokens/chakra-v3-semanticTokens'
import { memo } from 'react';

type SemanticValue = string | { _light?: string; _dark?: string }
type SemanticNode = {
  value?: SemanticValue
  [key: string]: unknown
}

type SemanticRow = {
  tokenName: string
  chakraToken: string
  cssVar: string
  value: SemanticValue
  group: string
}

const flattenSemanticColors = (obj: Record<string, unknown>, prefix = ''): SemanticRow[] => {
  const rows: SemanticRow[] = []

  Object.entries(obj).forEach(([key, value]) => {
    const currentPath = prefix ? `${prefix}.${key}` : key
    const node = value as SemanticNode

    if (node && typeof node === 'object' && 'value' in node) {
      const normalizedPath = currentPath.replace(/\.DEFAULT/g, '')
      rows.push({
        tokenName: currentPath,
        chakraToken: normalizedPath,
        cssVar: `--k0-colors-${normalizedPath.replace(/\./g, '-').toLowerCase()}`,
        value: node.value as SemanticValue,
        group: normalizedPath.split('.')[0] ?? 'other',
      })
      return
    }

    if (node && typeof node === 'object') {
      rows.push(...flattenSemanticColors(node as Record<string, unknown>, currentPath))
    }
  })

  return rows
}

const formatSemanticValue = (value: SemanticValue) => {
  if (typeof value === 'string') {
    return value.startsWith('#') ? value.toUpperCase() : value
  }

  const light = value?._light ?? 'n/a'
  const dark = value?._dark ?? 'n/a'
  return `light:${light} / dark:${dark}`
}

const toDisplayReference = (value: string) => {
  if (value.startsWith('#')) {
    return value.toUpperCase()
  }

  const nestedShade = value.match(/^\{global\.\{([^}]+)\}\.(\d+)\}$/)
  if (nestedShade) {
    const [, baseRef, shade] = nestedShade
    return `shade({${baseRef}}, ${shade})`
  }

  return value
}

const semanticValueEntries = (
  value: SemanticValue,
): Array<{ label: string; raw: string; display: string }> => {
  if (typeof value === 'string') {
    const normalized = formatSemanticValue(value)
    return [{ label: 'value', raw: normalized, display: toDisplayReference(normalized) }]
  }

  const lightRaw = formatSemanticValue(value?._light ?? 'n/a')
  const darkRaw = formatSemanticValue(value?._dark ?? 'n/a')

  return [
    { label: 'light', raw: lightRaw, display: toDisplayReference(lightRaw) },
    { label: 'dark', raw: darkRaw, display: toDisplayReference(darkRaw) },
  ]
}

const SemanticColorRamp = () => {
  const rows = flattenSemanticColors(semanticTokens.colors)
  const grouped = rows.reduce<Record<string, SemanticRow[]>>((acc, row) => {
    if (!acc[row.group]) {
      acc[row.group] = []
    }
    acc[row.group].push(row)
    return acc
  }, {})

  const groups = Object.entries(grouped)
    .map(([groupName, groupRows]) => [
      groupName,
      [...groupRows].sort((a, b) => a.chakraToken.localeCompare(b.chakraToken)),
    ] as const)
    .sort(([a], [b]) => a.localeCompare(b))

  return (
    <Stack gap="4" mt="4">
      <Card.Root variant="outline" borderColor="border.muted" bg="bg.subtle">
        <Card.Body p={{ base: '4', md: '5' }}>
          <HStack justify="space-between" align="start" gap="3" flexWrap="wrap">
            <Stack gap="1">
              <Text fontWeight="semibold">Semantic token catalog</Text>
              <Text color="fg.muted" textStyle="sm">
                Chakra UI v3 maps seven semantic aliases per color palette to the k0ntxt color system so intent-level theming stays API-consistent without restyling each component.
              </Text>
              <Box as="ul" color="fg.muted" textStyle="sm" mt="1">
                <Box as="li"><Badge variant="outline" colorPalette="accent.primary" mr="2">solid</Badge>The solid color of the palette.</Box>
                <Box as="li"><Badge variant="outline" colorPalette="accent.primary" mr="2">muted</Badge>A muted version of the palette.</Box>
                <Box as="li"><Badge variant="outline" colorPalette="accent.primary" mr="2">subtle</Badge>A subtle version of the palette, lower than muted.</Box>
                <Box as="li"><Badge variant="outline" colorPalette="accent.primary" mr="2">emphasized</Badge>A more pronounced version of the palette.</Box>
                <Box as="li"><Badge variant="outline" colorPalette="accent.primary" mr="2">contrast</Badge>A color that goes on the solid background (on-solid).</Box>
                <Box as="li"><Badge variant="outline" colorPalette="accent.primary" mr="2">fg</Badge>The foreground color of the palette.</Box>
                <Box as="li"><Badge variant="outline" colorPalette="accent.primary" mr="2">focusRing</Badge>The focus ring color of the palette.</Box>
              </Box>
            </Stack>
            <Badge colorPalette="accent.primary" variant="subtle">
              {rows.length} aliases
            </Badge>
          </HStack>
        </Card.Body>
      </Card.Root>

      {groups.map(([groupName, groupRows]) => (
        <Card.Root key={groupName} variant="outline" borderColor="border.muted">
          <Card.Header pb="2">
            <HStack justify="space-between" align="center">
              <Text fontSize="lg" fontWeight="semibold">{groupName}</Text>
              <HStack gap="2">
                <Badge variant="outline" colorPalette="accent.primary">Semantic alias</Badge>
                <Badge variant="subtle" colorPalette="brand.neutral">{groupRows.length} tokens</Badge>
              </HStack>
            </HStack>
          </Card.Header>
          <Card.Body pt="0">
            <Stack gap="2.5">
              {groupRows.map((row) => (
                <Box key={row.tokenName} borderWidth="1px" borderColor="border.muted" rounded="md" p="3">
                  <Stack gap="2.5">
                    <HStack justify="space-between" align="center" flexWrap="wrap" gap="2">
                      <Stack gap="0.5">
                        <Text fontWeight="medium" fontFamily="mono" fontSize="sm">
                          colors.{row.chakraToken}
                        </Text>
                        <Text fontSize="xs" color="fg.muted">
                          source: {row.tokenName}
                        </Text>
                      </Stack>
                      <Clipboard.Root value={`colors.${row.chakraToken}`}>
                        <Clipboard.Trigger asChild>
                          <Button variant="ghost" size="xs">
                            <Clipboard.Indicator />
                            Copy name
                          </Button>
                        </Clipboard.Trigger>
                      </Clipboard.Root>
                    </HStack>

                    <HStack align="start" gap="3" flexWrap={{ base: 'wrap', md: 'nowrap' }}>
                      <Box flexShrink={0} w={{ base: '100%', md: '96px' }}>
                        <Text fontSize="xs" color="fg.muted" mb="1">Swatch</Text>
                        <Box
                          h="12"
                          w={{ base: '100%', md: '96px' }}
                          rounded="sm"
                          borderWidth="1px"
                          borderColor="border.muted"
                          bg={row.chakraToken}
                        />
                      </Box>

                      <Box flex="1" minW={{ md: '260px' }}>
                        <Text fontSize="xs" color="fg.muted" mb="1">Token reference</Text>
                        <Stack gap="1.5">
                          {semanticValueEntries(row.value).map((entry) => (
                            <Clipboard.Root key={entry.label} value={entry.display}>
                              <Clipboard.Trigger asChild>
                                <Button
                                  variant="subtle"
                                  size="xs"
                                  justifyContent="space-between"
                                  w="full"
                                  fontFamily="mono"
                                  overflow="hidden"
                                  textOverflow="ellipsis"
                                >
                                  <Text as="span" color="fg.muted" fontFamily="body" textTransform="uppercase" fontSize="2xs">
                                    {entry.label}
                                  </Text>
                                  <Text as="span" ml="2" whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">
                                    {entry.display}
                                  </Text>
                                </Button>
                              </Clipboard.Trigger>
                            </Clipboard.Root>
                          ))}
                        </Stack>
                      </Box>

                      <Box flex="1" minW={{ md: '240px' }}>
                        <Text fontSize="xs" color="fg.muted" mb="1">CSS var</Text>
                        <Clipboard.Root value={row.cssVar}>
                          <Clipboard.Trigger asChild>
                            <Button variant="subtle" size="xs" justifyContent="start" w="full" fontFamily="mono">
                              {row.cssVar}
                            </Button>
                          </Clipboard.Trigger>
                        </Clipboard.Root>
                      </Box>
                    </HStack>
                  </Stack>
                </Box>
              ))}
            </Stack>
          </Card.Body>
        </Card.Root>
      ))}
    </Stack>
  )
}

export default memo(SemanticColorRamp);
