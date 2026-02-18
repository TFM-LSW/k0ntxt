import fs from 'node:fs';
import path from 'node:path';

const cwd = process.cwd();

const lightPath = path.join(cwd, 'build/css/k0-variables.light.css');
const darkPath = path.join(cwd, 'build/css/k0-variables.dark.css');

const assert = (condition, message) => {
  if (!condition) {
    throw new Error(message);
  }
};

const readFile = (filePath) => {
  assert(fs.existsSync(filePath), `Missing CSS output: ${filePath}`);
  return fs.readFileSync(filePath, 'utf8');
};

const getCssVarValue = (css, varName) => {
  const escaped = varName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = css.match(new RegExp(`${escaped}:\\s*([^;]+);`));
  return match ? match[1].trim() : null;
};

try {
  const lightCss = readFile(lightPath);
  const darkCss = readFile(darkPath);

  assert(
    darkCss.includes('[data-theme="dark"]'),
    'Dark output must use [data-theme="dark"] selector.'
  );

  const requiredVars = [
    '--global-colors-neutral-50',
    '--alias-color-brand-charcoal',
    '--alias-color-text-default',
  ];

  for (const varName of requiredVars) {
    assert(
      getCssVarValue(lightCss, varName),
      `Missing ${varName} in light CSS output.`
    );
    assert(
      getCssVarValue(darkCss, varName),
      `Missing ${varName} in dark CSS output.`
    );
  }

  const lightNeutral50 = getCssVarValue(lightCss, '--global-colors-neutral-50');
  const darkNeutral50 = getCssVarValue(darkCss, '--global-colors-neutral-50');

  assert(
    lightNeutral50 !== darkNeutral50,
    '--global-colors-neutral-50 should differ between light and dark outputs.'
  );

  console.log('CSS validation passed for light/dark outputs.');
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
