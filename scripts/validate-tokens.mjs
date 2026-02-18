import fs from 'node:fs';
import path from 'node:path';

const cwd = process.cwd();

const readJson = (relativePath) =>
  JSON.parse(fs.readFileSync(path.join(cwd, relativePath), 'utf8'));

const isObject = (value) =>
  value !== null && typeof value === 'object' && !Array.isArray(value);

const collectTokenPaths = (node, prefix = [], out = []) => {
  if (!isObject(node)) return out;

  if (Object.prototype.hasOwnProperty.call(node, '$value')) {
    out.push(prefix.join('.'));
    return out;
  }

  for (const [key, value] of Object.entries(node)) {
    if (key === '$metadata') continue;
    collectTokenPaths(value, [...prefix, key], out);
  }

  return out;
};

const collectReferences = (node, prefix = [], out = []) => {
  if (!isObject(node)) return out;

  if (
    Object.prototype.hasOwnProperty.call(node, '$value') &&
    typeof node.$value === 'string'
  ) {
    const match = node.$value.match(/^\{([^}]+)\}$/);
    if (match) {
      out.push({
        from: prefix.join('.'),
        to: match[1],
      });
    }
  }

  for (const [key, value] of Object.entries(node)) {
    if (key === '$value') continue;
    collectReferences(value, [...prefix, key], out);
  }

  return out;
};

const hasPath = (root, pathString) => {
  let current = root;
  for (const part of pathString.split('.')) {
    if (
      isObject(current) &&
      Object.prototype.hasOwnProperty.call(current, part)
    ) {
      current = current[part];
      continue;
    }
    return false;
  }
  return true;
};

const reportList = (title, items) => {
  if (items.length === 0) return;
  console.error(`\n${title} (${items.length})`);
  for (const item of items.slice(0, 30)) {
    console.error(`- ${item}`);
  }
  if (items.length > 30) {
    console.error(`- ...and ${items.length - 30} more`);
  }
};

const globalLight = readJson('tokens/global.light.json');
const globalDark = readJson('tokens/global.dark.json');
const alias = readJson('tokens/alias.json');

const lightPaths = new Set(collectTokenPaths(globalLight.global, ['global']));
const darkPaths = new Set(collectTokenPaths(globalDark.global, ['global']));

const onlyLight = [...lightPaths].filter((key) => !darkPaths.has(key));
const onlyDark = [...darkPaths].filter((key) => !lightPaths.has(key));

const lightRoot = { global: globalLight.global, alias: alias.alias };
const darkRoot = { global: globalDark.global, alias: alias.alias };

const lightRefs = collectReferences(lightRoot);
const darkRefs = collectReferences(darkRoot);

const missingLightRefs = lightRefs
  .filter((ref) => !hasPath(lightRoot, ref.to))
  .map((ref) => `${ref.from} -> ${ref.to}`);

const missingDarkRefs = darkRefs
  .filter((ref) => !hasPath(darkRoot, ref.to))
  .map((ref) => `${ref.from} -> ${ref.to}`);

reportList('Global token keys missing in dark theme', onlyLight);
reportList('Global token keys missing in light theme', onlyDark);
reportList('Unresolved references for light graph', missingLightRefs);
reportList('Unresolved references for dark graph', missingDarkRefs);

const hasErrors =
  onlyLight.length > 0 ||
  onlyDark.length > 0 ||
  missingLightRefs.length > 0 ||
  missingDarkRefs.length > 0;

if (hasErrors) {
  process.exit(1);
}

console.log(
  `Token validation passed: ${lightPaths.size} global tokens, ${lightRefs.length} light refs, ${darkRefs.length} dark refs.`
);
