/**
 * Patches esbuild to use esbuild-wasm instead of the native binary.
 * This is needed when running in environments where native binaries
 * can't be executed (e.g., OneDrive synced folders on Windows).
 *
 * Run: node scripts/patch-esbuild.js
 */
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const patch = `// Patched: delegate to esbuild-wasm to avoid native binary spawn issues\nmodule.exports = require('esbuild-wasm');\n`;

const targets = [
  join(root, 'node_modules', 'esbuild', 'lib', 'main.js'),
  join(root, 'node_modules', 'vite', 'node_modules', 'esbuild', 'lib', 'main.js'),
];

let patched = 0;
for (const target of targets) {
  if (!existsSync(target)) continue;
  const content = readFileSync(target, 'utf8');
  if (content.includes('esbuild-wasm')) {
    console.log(`Already patched: ${target}`);
    patched++;
    continue;
  }
  writeFileSync(target, patch, 'utf8');
  console.log(`Patched: ${target}`);
  patched++;
}

console.log(`\nDone — ${patched}/${targets.length} esbuild instances patched.`);
