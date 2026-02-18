declare module './tokens/chakra-v3-semanticTokens' {
  const semanticTokens: {
    colors: Record<string, any>;
    [key: string]: any;
  };
  export default semanticTokens;
}

declare module './tokens/chakra-v3-tokens' {
  export const tokens: Record<string, unknown>; // Use a more specific type if available
}

declare module './tokens/k0-tokens' {
  export const alias: Record<string, any>;
  export const global: Record<string, any>;
}