import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const cwd = process.cwd();
const semanticPath = path.join(cwd, "build/chakra-v3/chakra-v3-semanticTokens.js");

if (!fs.existsSync(semanticPath)) {
  throw new Error(`Missing Chakra semantic token output at ${semanticPath}. Run npm run build first.`);
}

const semanticModule = await import(pathToFileURL(semanticPath).href);
const semanticTokens = semanticModule.semanticTokens;

if (!semanticTokens || !semanticTokens.colors) {
  throw new Error("Chakra semantic token export is missing colors.");
}

const chartToneByCategory = {
  1: "dark",
  2: "dark",
  3: "dark",
  4: "base",
  5: "base",
  6: "base",
};

const threshold = 3;
const modes = ["_light", "_dark"];
const backgroundToken = "bg.DEFAULT";
const colorRoot = semanticTokens.colors;

const toNode = (tokenPath) =>
  tokenPath.split(".").reduce((current, segment) => {
    if (!current || typeof current !== "object" || !(segment in current)) {
      throw new Error(`Missing semantic token path: colors.${tokenPath}`);
    }
    return current[segment];
  }, colorRoot);

const toHex = (tokenPath, mode) => {
  const tokenNode = toNode(tokenPath);
  const value = tokenNode?.value;
  const color = typeof value === "string" ? value : value?.[mode];

  if (typeof color !== "string" || !/^#[0-9a-f]{6}$/i.test(color)) {
    throw new Error(`Expected hex color for colors.${tokenPath} (${mode}), got: ${String(color)}`);
  }

  return color;
};

const relativeLuminance = (hex) => {
  const channels = [0, 2, 4].map((offset) =>
    Number.parseInt(hex.slice(offset + 1, offset + 3), 16) / 255,
  );

  const linearChannels = channels.map((channel) =>
    channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4,
  );

  return (
    0.2126 * linearChannels[0] +
    0.7152 * linearChannels[1] +
    0.0722 * linearChannels[2]
  );
};

const contrastRatio = (foreground, background) => {
  const fgLum = relativeLuminance(foreground);
  const bgLum = relativeLuminance(background);
  const light = Math.max(fgLum, bgLum);
  const dark = Math.min(fgLum, bgLum);
  return (light + 0.05) / (dark + 0.05);
};

const failures = [];
const reports = [];

for (const [category, tone] of Object.entries(chartToneByCategory)) {
  const chartTokenPath = `chart.categorical.${category}.${tone}`;

  for (const mode of modes) {
    const foreground = toHex(chartTokenPath, mode);
    const background = toHex(backgroundToken, mode);
    const ratio = contrastRatio(foreground, background);

    reports.push(
      `${mode.replace("_", "")}: ${chartTokenPath} on ${backgroundToken} => ${ratio.toFixed(2)}:1`,
    );

    if (ratio < threshold) {
      failures.push(
        `${mode.replace("_", "")}: colors.${chartTokenPath} (${foreground}) on colors.${backgroundToken} (${background}) = ${ratio.toFixed(2)}:1`,
      );
    }
  }
}

if (failures.length > 0) {
  throw new Error(
    `Chart non-text contrast check failed (threshold ${threshold}:1):\n${failures.join("\n")}`,
  );
}

console.log(
  `Chart accessibility contrast validation passed (${threshold}:1 minimum for chart marks on ${backgroundToken}).`,
);
for (const line of reports) {
  console.log(`- ${line}`);
}
