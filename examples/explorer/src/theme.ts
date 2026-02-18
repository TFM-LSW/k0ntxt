import { defineConfig, defineRecipe, createSystem, defaultConfig } from "@chakra-ui/react";

import { tokens } from '../../../build/chakra-v3/chakra-v3-tokens.js';
import { semanticTokens } from '../../../build/chakra-v3/chakra-v3-semanticTokens.js';

const baseConfig = {
  cssVarsPrefix: "k0",
  initialColorMode: "dark",
  useSystemColorMode: false,
  strictTokens: true,
}

const titleRecipe = defineRecipe({
  base: {
    fontFamily: tokens.fonts.title.value,
    fontWeight: "400",
    lineHeight: "1.2",
  },
  variants: {
    size: {
      md: { fontSize: "2xl" },
      lg: { fontSize: "3xl" },
      xl: { fontSize: "4xl" },
      "2xl": { fontSize: "6xl" },
    },
  },
})

const headingRecipe = defineRecipe({
  base: {
    color: "fg.emphasized",
  },
});

const textRecipe = defineRecipe({
  base: {
    color: "fg.subtle",
    marginBottom: "2",
  },
});

export const theme = defineConfig({
  ...baseConfig,
  theme: {
    tokens,
    semanticTokens,
    recipes: {
      title: titleRecipe,
      heading: headingRecipe,
      text: textRecipe,
    },
  }
});

export const system = createSystem(defaultConfig, theme);
