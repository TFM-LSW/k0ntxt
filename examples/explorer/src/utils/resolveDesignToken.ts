import type { Token, TokenRoot, ResolvedToken } from "@/views/tokens/components/types";

/**
 * Transforms a token path into a CSS variable name.
 * 
 * @param tokenPath - The token path to transform (e.g. '{global.colors.cyan.500}')
 * @returns The CSS variable name (e.g. '--global-colors-cyan-500')
 */
export function tokenPathToCssVar(tokenPath: string): string {
  const normalized = tokenPath.trim();
  if (normalized.startsWith('{') && normalized.endsWith('}')) {
    return `--${normalized
      .replace(/[{}]/g, '')
      .replace(/\./g, '-')}`;
  }

  return normalized;
}

/**
 * Resolves a design token value or reference to its final value and description.
 *
 * @param valueOrRef - The token value or reference to resolve. References are in the format `{path.to.token}`.
 * @param root - The root object containing all tokens.
 * @param visited - A set of visited references to prevent circular references.
 * @param fallbackDescription - A fallback description to use if the token does not have one.
 * @returns A `ResolvedToken` object containing the resolved value and description.
 */
export function resolveDesignToken(
  valueOrRef: string,
  root: TokenRoot,
  visited: Set<string> = new Set(),
  fallbackDescription?: string
): ResolvedToken {
  // Normalize the token path by removing braces and the "global." prefix.
  const path = valueOrRef.replace(/[{}]/g, '').replace(/^global\./, '');
  const parts = path.split('.');
  let current: Token | TokenRoot | undefined = root;

  // Traverse the token path to find the target token.
  for (const part of parts) {
    if (!current || !(part in current)) {
      return { value: valueOrRef, description: fallbackDescription };
    }
    current = current[part] as Token | TokenRoot;
  }

  // If the current object is a token with a `$value`, resolve it.
  if (typeof current === 'object' && current !== null && '$value' in current) {
    const tokenValue = current.$value;
    const tokenDescription = current.$description;

    // If the token value is a reference, resolve it recursively.
    if (typeof tokenValue === 'string' && tokenValue.startsWith('{')) {
      const refPath = tokenValue.replace(/[{}]/g, '');
      if (visited.has(refPath)) {
        return { value: refPath, description: fallbackDescription };
      }
      visited.add(refPath);
      return typeof tokenValue === 'string'
        ? resolveDesignToken(tokenValue, root, visited, typeof tokenDescription === 'string' ? tokenDescription : fallbackDescription)
        : { value: valueOrRef, description: fallbackDescription };
    }

    // Return the resolved token value and description.
    return {
      value: typeof tokenValue === 'string' ? tokenValue : valueOrRef,
      description: fallbackDescription || (typeof tokenDescription === 'string' ? tokenDescription : undefined),
    };
  }

  // If the current object is a string, return it as the resolved value.
  if (typeof current === 'string') {
    return {
      value: current,
      description: fallbackDescription,
    };
  }

  // Fallback to the original value and description if resolution fails.
  return {
    value: valueOrRef,
    description: fallbackDescription,
  };
}
