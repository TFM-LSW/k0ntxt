# Explorer App (Rsbuild + React + Chakra)

This app is the interactive token catalog and implementation reference for the design token pipeline.

## Prerequisites

- Root token dependencies installed (`pnpm install` at repository root)
- Root token artifacts generated (`pnpm build` at repository root)

The app imports generated Chakra artifacts from:

- `../../build/chakra-v3/chakra-v3-tokens.js`
- `../../build/chakra-v3/chakra-v3-semanticTokens.js`

## Setup

From the repository root:

```bash
pnpm --dir examples/explorer install
```

## Development workflow

### 1) Build root token outputs

```bash
pnpm build
```

### 2) Run explorer

```bash
pnpm --dir examples/explorer dev
```

## App scripts

Run from `examples/explorer` or with `pnpm --dir examples/explorer <script>`.

| Command | Purpose |
| --- | --- |
| `pnpm dev` | Starts the dev server. |
| `pnpm build` | Production build via Rsbuild. |
| `pnpm preview` | Preview production build locally. |
| `pnpm typecheck` | TypeScript checks with no emit. |
| `pnpm test` | Jest test suite. |
| `pnpm build:ci` | Build + bundle size check. |
| `pnpm perf:check` | Bundle size check only. |

## Testing

```bash
pnpm --dir examples/explorer test
```

Update snapshots:

```bash
pnpm --dir examples/explorer test -u --watchman=false
```

## Troubleshooting

- App fails on startup due to missing token module imports:
  Run `pnpm build` at repository root.
- Token updates not visible in explorer:
  Rebuild root artifacts with `pnpm build`.
- TypeScript module errors for generated token files:
  Confirm `src/types/generated-tokens.d.ts` is present and run `pnpm --dir examples/explorer typecheck`.

## Chakra integration note

Use generated Chakra artifacts with resolved values (`build/chakra-v3/*`) for runtime theming. Do not wire unresolved alias definitions directly from `tokens/alias.json` into Chakra theme config.
