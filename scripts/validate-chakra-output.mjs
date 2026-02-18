import path from "node:path";
import { pathToFileURL } from "node:url";

const semanticModulePath = pathToFileURL(
  path.resolve("build/chakra-v3/chakra-v3-semanticTokens.js")
).href;
const tokensModulePath = pathToFileURL(
  path.resolve("build/chakra-v3/chakra-v3-tokens.js")
).href;

const { semanticTokens } = await import(semanticModulePath);
const { tokens } = await import(tokensModulePath);

const isHex = (value) =>
  typeof value === "string" &&
  /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(value);

const isReference = (value) =>
  typeof value === "string" && value.startsWith("{") && value.endsWith("}");

const requiredPairs = [
  ["colors", "bg", "DEFAULT", "value", "_light"],
  ["colors", "bg", "DEFAULT", "value", "_dark"],
  ["colors", "fg", "DEFAULT", "value", "_light"],
  ["colors", "fg", "DEFAULT", "value", "_dark"],
  ["colors", "border", "DEFAULT", "value", "_light"],
  ["colors", "border", "DEFAULT", "value", "_dark"],
  ["colors", "accent", "primary", "solid", "value", "_light"],
  ["colors", "accent", "primary", "solid", "value", "_dark"],
  ["colors", "status", "negative", "solid", "value", "_light"],
  ["colors", "status", "negative", "solid", "value", "_dark"],
];

const getByPath = (obj, pathParts) =>
  pathParts.reduce((current, key) => current?.[key], obj);

for (const keyPath of requiredPairs) {
  const value = getByPath(semanticTokens, keyPath);
  if (typeof value !== "string" || (!isHex(value) && !isReference(value))) {
    throw new Error(`Invalid or missing semantic token at ${keyPath.join(".")}`);
  }
}

const invalidStrings = [];
const walk = (node, pathParts = []) => {
  if (node && typeof node === "object") {
    for (const [key, value] of Object.entries(node)) {
      walk(value, [...pathParts, key]);
    }
    return;
  }

  if (typeof node === "string" && pathParts[pathParts.length - 1] === "value") {
    if (!isHex(node) && !isReference(node) && node !== "transparent") {
      invalidStrings.push(`${pathParts.join(".")} -> ${node}`);
    }
  }
};

walk(semanticTokens);

if (invalidStrings.length) {
  throw new Error(
    `Found non-token literal values in Chakra semantic output:\n${invalidStrings
      .slice(0, 20)
      .join("\n")}`
  );
}

if (!tokens || typeof tokens !== "object") {
  throw new Error("Chakra tokens export is missing.");
}

if (!tokens.colors || typeof tokens.colors !== "object") {
  throw new Error("Chakra tokens must include colors.");
}

if (!tokens.fonts || typeof tokens.fonts !== "object") {
  throw new Error("Chakra tokens must include fonts.");
}

console.log("Chakra output validation passed.");
