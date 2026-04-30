const fs = require('fs');
const vm = require('vm');
const path = require('path');

const slugs = [
  'linked-lists-combine-k-sorted',
  'linked-lists-combine-two-sorted',
  'delete-nth-node-from-end',
  'linked-list-detect-cycle',
  'rearrange-linked-list',
  'linked-list-reversal',
  'longest-common-subsequence',
  'longest-consecutive-sequence',
];

const dir = path.join(process.cwd(), 'content/problems');

for (const slug of slugs) {
  const code = fs.readFileSync(path.join(dir, slug, 'index.js'), 'utf8');
  const normalized = code.replace(/export\s+const\s+problem\s*=\s*/, 'const problem = ');
  const p = vm.runInNewContext(normalized + '\n;problem;', Object.create(null), { timeout: 2000 });
  const hasHarness = p.harness ? 'yes' : 'NO';
  console.log(`${slug} | diff: ${p.difficulty} | tests: ${p.tests.length} | harness: ${hasHarness} | topics: ${p.topics.join(', ')}`);
}
