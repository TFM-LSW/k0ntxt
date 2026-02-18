import { ChakraProvider } from '@chakra-ui/react';

import { system } from './theme';
import { useEffect, useState } from 'react';

import "./styles.css";

export function ThemedChakraProvider({ children }: any) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <ChakraProvider value={system}>
      {children}
    </ChakraProvider>
  )
}