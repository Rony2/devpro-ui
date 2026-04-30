import fs from 'fs';
import path from 'path';
import vm from 'vm';

const dir = path.join(process.cwd(), 'content/problems');
const slugs = fs.readdirSync(dir, {withFileTypes:true}).filter(d=>d.isDirectory()).map(d=>d.name);
const topics = new Set(), companies = new Set(), types = new Set(), diffs = new Set();
let totalMin = 0;
for (const slug of slugs) {
  const fp = path.join(dir, slug, 'index.js');
  if (fs.existsSync(fp)) {
    const src = fs.readFileSync(fp,'utf-8');
    const norm = src.replace(/export\s+const\s+problem\s*=\s*/, 'const problem = ');
    const p = vm.runInNewContext(norm+'\n;problem;', Object.create(null), {timeout:2000});
    (p.topics||[]).forEach(t => topics.add(t));
    (p.companies||[]).forEach(c => companies.add(c));
    types.add(p.type);
    diffs.add(p.difficulty);
    totalMin += p.estimatedMinutes || 0;
  }
}
console.log('Topics:', [...topics].sort().join(', '));
console.log('Companies:', [...companies].sort().join(', '));
console.log('Types:', [...types]);
console.log('Difficulties:', [...diffs]);
console.log('Total minutes:', totalMin, '(' + Math.round(totalMin/60) + ' hours)');
console.log('Count:', slugs.length);
