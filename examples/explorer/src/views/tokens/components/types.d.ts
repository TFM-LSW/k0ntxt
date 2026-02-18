/**
 * Represents a single design token with a value and optional description.
 */
export type Token = {
  $value?: string; // The value of the token, which can be a reference or a literal value.
  $description?: string; // An optional description of the token.
  [key: string]: any; // Additional properties for extensibility.
};

/**
 * Represents a group of design tokens, where each key is a token name and the value is a Token.
 */
interface TokenGroup {
  [key: string]: Token;
}

/**
 * Represents a root structure of design tokens, which can be nested.
 */
export type TokenRoot = {
  [key: string]: Token | TokenRoot; // A token or a nested group of tokens.
};

/**
 * Represents the resolved token with its final value and description.
 */
export type ResolvedToken = {
  value: string; // The resolved value of the token.
  description?: string; // The resolved description of the token, if available.
};
