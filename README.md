# k0ntxt Design Tokens

Design token source of truth for colors, typography, spacing, semantic aliases, and generated theme artifacts (CSS, JS, Chakra v2/v3).

## Repository map

| Path | Purpose |
| --- | --- |
| `tokens/global.light.json` | Foundation tokens for light mode (DTCG-style JSON). |
| `tokens/global.dark.json` | Foundation tokens for dark mode (DTCG-style JSON). |
| `tokens/alias.json` | Semantic alias layer that maps intent to foundation tokens. |
| `config/` | Style Dictionary build configs per output target. |
| `build/` | Generated artifacts (do not hand-edit). |
| `scripts/` | Validation scripts for token integrity and build outputs. |
| `examples/explorer/` | Rsbuild + React app for browsing and validating token usage. |

## Token model

### 1) Global (raw) tokens
Primitive/foundation values such as color ramps, spacing, typography scales.

### 2) Alias (semantic) tokens
Purpose-driven tokens mapped to UI intent and usage context.

### 3) Generated platform outputs
Compiled artifacts consumed by applications and frameworks.

## Quick start

### Prerequisites

- Node.js 18+
- `pnpm` (recommended) or `npm`

### Install dependencies

```bash
pnpm install
```

### Build all token outputs

```bash
pnpm build
```

### Validate tokens and outputs

```bash
pnpm check
```

## Scripts

| Command | What it does |
| --- | --- |
| `pnpm build` | Builds CSS, JS, and Chakra outputs. |
| `pnpm build:css` | Builds CSS variable outputs only. |
| `pnpm build:js` | Builds JS token module only. |
| `pnpm build:chakra` | Builds Chakra v2 and v3 outputs only. |
| `pnpm validate:tokens` | Validates token JSON structure and references. |
| `pnpm validate:css` | Validates generated CSS artifacts. |
| `pnpm validate:chakra` | Validates generated Chakra artifacts. |
| `pnpm validate:chart-a11y` | Validates chart color token contrast for non-text graphics. |
| `pnpm clean` | Removes generated artifacts via Style Dictionary clean. |
| `pnpm check` | Full pipeline: validate + build + output checks. |

## Generated artifacts

| Output | Path |
| --- | --- |
| CSS variables (light) | `build/css/k0-variables.light.css` |
| CSS variables (dark) | `build/css/k0-variables.dark.css` |
| CSS variables (legacy light compatibility) | `build/css/k0-variables.css` |
| JavaScript token module | `build/js/k0-tokens.js` |
| Chakra v3 base tokens | `build/chakra-v3/chakra-v3-tokens.js` |
| Chakra v3 semantic tokens | `build/chakra-v3/chakra-v3-semanticTokens.js` |
| Chakra v2 theme | `build/chakra-v2/chakra-v2-theme.js` |

## Consumption guidance

### CSS variables

```html
<link rel="stylesheet" href="build/css/k0-variables.light.css" />
<link rel="stylesheet" href="build/css/k0-variables.dark.css" />
```

```html
<html data-theme="dark"></html>
```

```css
body {
  background: var(--alias-color-surface-background);
  color: var(--alias-color-text-default);
}
```

Use `--alias-*` in product code. Treat `--global-*` as internal foundation implementation details.

### JavaScript

```js
import tokens from "./build/js/k0-tokens.js";

console.log(tokens.colors.neutral["100"]);
```

### Chakra UI

Use generated Chakra artifacts with resolved runtime values:

```js
import { tokens } from "./build/chakra-v3/chakra-v3-tokens.js";
import { semanticTokens } from "./build/chakra-v3/chakra-v3-semanticTokens.js";
```

Do not feed unresolved alias definitions from `tokens/alias.json` directly into Chakra theme config.

## Explorer workflow

The explorer app consumes generated artifacts from `build/`, so rebuild tokens whenever token sources change.

```bash
pnpm build
pnpm --dir examples/explorer dev
```

See `examples/explorer/README.md` for app-specific commands.

## Troubleshooting

- Explorer can’t resolve Chakra token modules:
  Run `pnpm build` at repo root to regenerate `build/chakra-v3/*`.
- Token changes are not reflected:
  Run `pnpm clean && pnpm build`.
- Validation failures:
  Run `pnpm validate:tokens` first to isolate token reference errors.

## Future work

- Component token layer in `tokens/components.json` (`components.button`, `components.input`, `components.card`) so app teams can consume stable component contracts instead of raw primitives.

## Resources

- [Style Dictionary Documentation](https://amzn.github.io/style-dictionary/)
- [Chakra UI Theming Guide](https://chakra-ui.com/docs/theming/overview)
