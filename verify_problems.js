const fs = require('fs');
const path = require('path');
const vm = require('vm');
const dir = path.join(process.cwd(), 'content/problems');
const slugs = fs.readdirSync(dir).filter(f => fs.statSync(path.join(dir, f)).isDirectory());
let pass = 0, fail = 0;
for (const slug of slugs) {
  try {
    const code = fs.readFileSync(path.join(dir, slug, 'index.js'), 'utf8');
    const normalized = code.replace(/export\s+const\s+problem\s*=\s*/, 'const problem = ');
    const script = normalized + '\n;problem;';
    const p = vm.runInNewContext(script, Object.create(null), { timeout: 2000 });
    if (!p) throw new Error('no problem export');
    const hasSlug = !!p.slug;
    const hasTitle = !!p.title;
    const hasDiff = !!p.difficulty;
    const hasStarter = !!p.starterCode;
    const hasSolution = !!p.solution;
    const hasTests = p.tests && p.tests.length >= 4;
    if (!hasSlug || !hasTitle || !hasDiff || !hasStarter || !hasSolution || !hasTests) {
      throw new Error('missing field: slug=' + hasSlug + ' title=' + hasTitle + ' diff=' + hasDiff + ' starter=' + hasStarter + ' sol=' + hasSolution + ' tests=' + (p.tests ? p.tests.length : 0));
    }
    pass++;
  } catch (e) {
    fail++;
    console.error('FAIL', slug, e.message);
  }
}
console.log('PASS:', pass, 'FAIL:', fail, 'TOTAL:', slugs.length);
