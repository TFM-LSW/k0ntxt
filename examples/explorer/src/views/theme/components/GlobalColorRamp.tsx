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
import { tokens } from '@/tokens/chakra-v3-tokens'
import { memo } from 'react'

type TokenEntry = string | { value: string }
type TokenRamp = Record<string, TokenEntry>
type RampRow = {
  id: string
  tokenName: string
  cssVar: string
  rawValue: string
}

const isNumericStep = (step: string) => /^\d+$/.test(step)

const formatValue = (value: string) => {
  if (value.startsWith('#')) {
    return value.toUpperCase()
  }
  return value
}

const tokenCssVar = (rampName: string, step: string) => {
  if (isNumericStep(step)) {
    return `--k0-colors-${rampName}-${step}`
  }
  return `--k0-colors-${rampName}`
}

const sortSteps = (a: string, b: string) => {
  const aNumeric = isNumericStep(a)
  const bNumeric = isNumericStep(b)

  if (aNumeric && bNumeric) {
    return Number(a) - Number(b)
  }

  if (aNumeric) return 1
  if (bNumeric) return -1
  return a.localeCompare(b)
}

const normalizeRampRows = (rampName: string, ramp: TokenRamp): RampRow[] => {
  const entries = Object.entries(ramp)

  // Flat color token shape: { value: "#ffffff" }
  if (entries.length === 1 && entries[0][0] === 'value') {
    const singleValue = entries[0][1]
    const rawValue = typeof singleValue === 'string' ? singleValue : singleValue?.value

    if (typeof rawValue === 'string') {
      return [{
        id: `${rampName}-value`,
        tokenName: `colors.${rampName}`,
        cssVar: `--k0-colors-${rampName}`,
        rawValue,
      }]
    }
    return []
  }

  // Ramp shape: { 50: { value: "#..." }, 100: { value: "#..." } ... }
  return entries
    .sort(([a], [b]) => sortSteps(a, b))
    .flatMap(([step, token]) => {
      const rawValue = typeof token === 'string' ? token : token?.value
      if (typeof rawValue !== 'string') {
        return []
      }

      const tokenName = isNumericStep(step)
        ? `colors.${rampName}.${step}`
        : `colors.${rampName}`

      return [{
        id: `${rampName}-${step}`,
        tokenName,
        cssVar: tokenCssVar(rampName, step),
        rawValue,
      }]
    })
}

const GlobalColorRamp = () => {
  const colorRamps = Object.entries(tokens.colors) as [string, TokenRamp][]

  return (
    <Stack gap="4" mt="4">
      <Card.Root variant="outline" borderColor="border.muted" bg="bg.subtle">
        <Card.Body p={{ base: '4', md: '5' }}>
          <HStack justify="space-between" align="start" gap="3" flexWrap="wrap">
            <Stack gap="1">
              <Text fontWeight="semibold">Raw token catalog</Text>
              <Text color="fg.muted" textStyle="sm">
                Chakra UI v3 base color tokens powering semantic aliases and API-level color usage.
              </Text>
            </Stack>
            <Badge colorPalette="brand.neutral" variant="subtle">
              {colorRamps.length} ramps
            </Badge>
          </HStack>
        </Card.Body>
      </Card.Root>

      {colorRamps.map(([rampName, ramp]) => {
        const rows = normalizeRampRows(rampName, ramp)

        return (
          <Card.Root key={rampName} variant="outline" borderColor="border.muted">
            <Card.Header pb="2">
              <HStack justify="space-between" align="center">
                <Text fontSize="lg" fontWeight="semibold">{rampName}</Text>
                <HStack gap="2">
                  <Badge variant="outline" colorPalette="brand.neutral">Raw scale</Badge>
                  <Badge variant="subtle" colorPalette="accent.primary">{rows.length} tokens</Badge>
                </HStack>
              </HStack>
            </Card.Header>
            <Card.Body pt="0">
              <Stack gap="2.5">
                {rows.map((row) => (
                    <Box key={row.id} borderWidth="1px" borderColor="border.muted" rounded="md" p="3">
                      <Stack gap="3">
                        <HStack justify="space-between" align="center" flexWrap="wrap" gap="2">
                          <Text fontWeight="medium">{row.tokenName}</Text>
                          <Clipboard.Root value={row.tokenName}>
                            <Clipboard.Trigger asChild>
                              <Button variant="ghost" size="xs">
                                <Clipboard.Indicator />
                                Copy name
                              </Button>
                            </Clipboard.Trigger>
                          </Clipboard.Root>
                        </HStack>

                        <Box h="8" rounded="sm" borderWidth="1px" borderColor="border.muted" bg={row.rawValue} />

                        <Stack direction={{ base: 'column', md: 'row' }} gap="3">
                          <Box flex="1">
                            <Text fontSize="xs" color="fg.muted" mb="1">Raw value</Text>
                            <Clipboard.Root value={row.rawValue}>
                              <Clipboard.Trigger asChild>
                                <Button variant="subtle" size="xs" justifyContent="start" w="full">
                                  {formatValue(row.rawValue)}
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
              </Stack>
            </Card.Body>
          </Card.Root>
        )
      })}
    </Stack>
  )
}

export default memo(GlobalColorRamp);
