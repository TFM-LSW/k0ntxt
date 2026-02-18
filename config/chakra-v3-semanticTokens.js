import fs from "node:fs";
import path from "node:path";

import StyleDictionary from "style-dictionary";

const readJson = (relativePath) =>
  JSON.parse(fs.readFileSync(path.resolve(relativePath), "utf8"));

const lightGlobal = readJson("./tokens/global.light.json").global;
const darkGlobal = readJson("./tokens/global.dark.json").global;
const aliasTokens = readJson("./tokens/alias.json").alias;

const roots = {
  light: { global: lightGlobal, alias: aliasTokens },
  dark: { global: darkGlobal, alias: aliasTokens },
};

const isObject = (value) =>
  value !== null && typeof value === "object" && !Array.isArray(value);

const isReference = (value) =>
  typeof value === "string" && value.startsWith("{") && value.endsWith("}");

const stripBraces = (value) => value.replace(/[{}]/g, "");

const getByPath = (obj, pathString) =>
  pathString.split(".").reduce((current, key) => current?.[key], obj);

const resolveToken = (mode, tokenPathOrRef, visited = new Set()) => {
  const root = roots[mode];
  const pathString = isReference(tokenPathOrRef)
    ? stripBraces(tokenPathOrRef)
    : tokenPathOrRef;

  if (!pathString || visited.has(pathString)) {
    return { value: tokenPathOrRef, path: null };
  }
  visited.add(pathString);

  const target = getByPath(root, pathString);
  if (!target) {
    return { value: tokenPathOrRef, path: null };
  }

  if (typeof target === "string") {
    return { value: target, path: pathString };
  }

  if (isObject(target) && Object.prototype.hasOwnProperty.call(target, "$value")) {
    const nextValue = target.$value;
    if (isReference(nextValue)) {
      return resolveToken(mode, nextValue, visited);
    }
    return { value: nextValue, path: pathString };
  }

  return { value: tokenPathOrRef, path: null };
};

const parseColorFamily = (resolvedPath) => {
  if (typeof resolvedPath !== "string") return null;
  const match = resolvedPath.match(/^global\.colors\.([^.]+)\.(\d+)$/);
  if (!match) return null;
  return { family: match[1], step: match[2] };
};

const getGlobalColor = (mode, family, step, fallback) => {
  const value = roots[mode].global.colors?.[family]?.[step]?.$value;
  return typeof value === "string" ? value : fallback;
};

const contrastRatio = (hex1, hex2) => {
  const luminance = (hex) => {
    const normalized = hex.replace("#", "");
    const rgb = [0, 2, 4]
      .map((i) => parseInt(normalized.slice(i, i + 2), 16) / 255)
      .map((c) =>
        c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
      );
    return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
  };

  const l1 = luminance(hex1);
  const l2 = luminance(hex2);
  const light = Math.max(l1, l2);
  const dark = Math.min(l1, l2);
  return (light + 0.05) / (dark + 0.05);
};

const chooseContrastText = (background) => {
  const black = "#000000";
  const white = "#FFFFFF";
  const blackRatio = contrastRatio(background, black);
  const whiteRatio = contrastRatio(background, white);
  return blackRatio >= whiteRatio ? black : white;
};

const pairFromReference = (tokenRef) => {
  const light = resolveToken("light", tokenRef);
  const dark = resolveToken("dark", tokenRef);
  return {
    _light: light.value,
    _dark: dark.value,
    _lightPath: light.path,
    _darkPath: dark.path,
  };
};

const modePairValue = (tokenRef) => {
  const pair = pairFromReference(tokenRef);
  return { value: { _light: pair._light, _dark: pair._dark } };
};

const buildPalette = (tokenRef) => {
  const pair = pairFromReference(tokenRef);
  const lightFamily = parseColorFamily(pair._lightPath);
  const darkFamily = parseColorFamily(pair._darkPath);

  const solidLight = pair._light;
  const solidDark = pair._dark;

  const lightFrom = (step, fallback = solidLight) =>
    lightFamily
      ? getGlobalColor("light", lightFamily.family, step, fallback)
      : fallback;
  const darkFrom = (step, fallback = solidDark) =>
    darkFamily ? getGlobalColor("dark", darkFamily.family, step, fallback) : fallback;

  return {
    solid: {
      value: {
        _light: solidLight,
        _dark: solidDark,
      },
    },
    contrast: {
      value: {
        _light: chooseContrastText(solidLight),
        _dark: chooseContrastText(solidDark),
      },
    },
    fg: {
      value: {
        _light: lightFrom("700"),
        _dark: darkFrom("300"),
      },
    },
    panel: {
      value: {
        _light: lightFrom("900"),
        _dark: darkFrom("100"),
      },
    },
    muted: {
      value: {
        _light: lightFrom("100"),
        _dark: darkFrom("900"),
      },
    },
    subtle: {
      value: {
        _light: lightFrom("200"),
        _dark: darkFrom("800"),
      },
    },
    emphasized: {
      value: {
        _light: lightFrom("300"),
        _dark: darkFrom("700"),
      },
    },
    focusRing: {
      value: {
        _light: solidLight,
        _dark: solidDark,
      },
    },
  };
};

const mapColorLeaves = (source, mapper) => {
  if (!isObject(source)) return {};
  const result = {};
  for (const [key, value] of Object.entries(source)) {
    if (isObject(value) && Object.prototype.hasOwnProperty.call(value, "$value")) {
      result[key] = mapper(value.$value);
      continue;
    }
    if (isObject(value)) {
      result[key] = mapColorLeaves(value, mapper);
    }
  }
  return result;
};

const removeModeMetadata = (node) => {
  if (!isObject(node)) return node;
  const result = Array.isArray(node) ? [] : {};
  for (const [key, value] of Object.entries(node)) {
    if (key === "_lightPath" || key === "_darkPath") continue;
    result[key] = removeModeMetadata(value);
  }
  return result;
};

const semanticTokens = {
  colors: {
    bg: {
      DEFAULT: modePairValue("{alias.color.surface.background}"),
      muted: modePairValue("{global.colors.neutral.200}"),
      subtle: modePairValue("{global.colors.neutral.100}"),
      emphasized: modePairValue("{global.colors.neutral.300}"),
      inverted: modePairValue("{global.colors.neutral.950}"),
      panel: modePairValue("{global.colors.neutral.100}"),
      error: modePairValue("{global.colors.red.50}"),
      warning: modePairValue("{global.colors.orange.50}"),
      success: modePairValue("{global.colors.green.50}"),
      info: modePairValue("{global.colors.blue.50}"),
    },
    fg: {
      DEFAULT: modePairValue("{global.colors.neutral.950}"),
      muted: modePairValue("{global.colors.neutral.700}"),
      subtle: modePairValue("{global.colors.neutral.800}"),
      subtler: modePairValue("{global.colors.neutral.700}"),
      emphasized: modePairValue("{global.colors.neutral.1000}"),
      inverted: modePairValue("{global.colors.neutral.50}"),
      error: modePairValue("{global.colors.red.500}"),
      warning: modePairValue("{global.colors.orange.600}"),
      success: modePairValue("{global.colors.green.600}"),
      info: modePairValue("{global.colors.blue.600}"),
    },
    border: {
      DEFAULT: modePairValue("{global.colors.neutral.200}"),
      muted: modePairValue("{global.colors.neutral.100}"),
      subtle: modePairValue("{global.colors.neutral.50}"),
      emphasized: modePairValue("{global.colors.neutral.300}"),
      inverted: modePairValue("{global.colors.neutral.800}"),
      error: modePairValue("{global.colors.red.500}"),
      warning: modePairValue("{global.colors.orange.500}"),
      success: modePairValue("{global.colors.green.500}"),
      info: modePairValue("{global.colors.blue.500}"),
    },
    black: modePairValue("{alias.color.black}"),
    white: modePairValue("{alias.color.white}"),
    brand: mapColorLeaves(aliasTokens.color.brand, buildPalette),
    accent: mapColorLeaves(aliasTokens.color.accent, buildPalette),
    status: mapColorLeaves(aliasTokens.color.status, buildPalette),
    chart: mapColorLeaves(aliasTokens.color.chart, modePairValue),
    text: mapColorLeaves(aliasTokens.color.text, modePairValue),
    icon: mapColorLeaves(aliasTokens.color.icon, modePairValue),
    surface: mapColorLeaves(aliasTokens.color.surface, modePairValue),
  },
};

StyleDictionary.registerFormat({
  name: "chakra/v3-semantic-theme-js",
  format: () => {
    const clean = removeModeMetadata(semanticTokens);
    return `export const semanticTokens = ${JSON.stringify(clean, null, 2)};`;
  },
});

const config = {
  source: ["./tokens/global.light.json", "./tokens/alias.json"],
  platforms: {
    chakra_v3_light: {
      transformGroup: "js",
      buildPath: "build/chakra-v3/",
      files: [
        {
          destination: "chakra-v3-semanticTokens.js",
          format: "chakra/v3-semantic-theme-js",
        },
      ],
    },
  },
};

export default config;
