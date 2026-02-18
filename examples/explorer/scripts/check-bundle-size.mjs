import { gzipSync } from 'node:zlib';
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';

const distDir = path.resolve('dist');
const indexPath = path.join(distDir, 'index.html');

if (!existsSync(indexPath)) {
  console.error('Missing dist/index.html. Run `pnpm build` first.');
  process.exit(1);
}

const html = readFileSync(indexPath, 'utf8');
const scriptSrcPattern = /<script[^>]*src="([^"]+)"/g;

const scriptPaths = [];
let match;
while ((match = scriptSrcPattern.exec(html)) !== null) {
  scriptPaths.push(match[1]);
}

if (scriptPaths.length === 0) {
  console.error('No JS assets found in dist/index.html.');
  process.exit(1);
}

const maxInitialGzipKb = Number(process.env.MAX_INITIAL_GZIP_KB ?? 320);
const maxSingleJsKb = Number(process.env.MAX_SINGLE_JS_KB ?? 700);

let initialGzipBytes = 0;
let failed = false;

for (const src of scriptPaths) {
  const assetPath = path.join(distDir, src.replace(/^\//, ''));
  if (!existsSync(assetPath)) {
    console.error(`Missing asset ${assetPath}`);
    failed = true;
    continue;
  }

  const source = readFileSync(assetPath);
  const rawKb = source.length / 1024;
  const gzipBytes = gzipSync(source).length;
  const gzipKb = gzipBytes / 1024;
  initialGzipBytes += gzipBytes;

  console.log(`${src}: raw=${rawKb.toFixed(1)}KB gzip=${gzipKb.toFixed(1)}KB`);

  if (rawKb > maxSingleJsKb) {
    console.error(`JS asset too large: ${src} (${rawKb.toFixed(1)}KB > ${maxSingleJsKb}KB)`);
    failed = true;
  }
}

const initialGzipKb = initialGzipBytes / 1024;
console.log(`Initial JS gzip total: ${initialGzipKb.toFixed(1)}KB`);

if (initialGzipKb > maxInitialGzipKb) {
  console.error(`Initial JS gzip budget exceeded (${initialGzipKb.toFixed(1)}KB > ${maxInitialGzipKb}KB)`);
  failed = true;
}

if (failed) {
  process.exit(1);
}

console.log('Bundle size check passed.');
