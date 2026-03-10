import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

const candidatePaths = [
  'dist/blog/rss.xml',
  'dist/astro-blog-sandbox/blog/rss.xml',
  'dist/astro-blog-sandbox/blog/rss.xml/index.html',
  'dist/blog/rss.xml/index.html',
];

test('RSS route output exists after build', () => {
  const outputPath = candidatePaths.find((path) => existsSync(path));
  assert.ok(outputPath, `No RSS output found. Tried: ${candidatePaths.join(', ')}`);

  const content = readFileSync(outputPath, 'utf8');
  assert.match(content, /<rss\b/i);
});
