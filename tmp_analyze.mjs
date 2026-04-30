import fs from 'fs';
import path from 'path';
import vm from 'vm';

const dir = path.join(process.cwd(), 'content/problems');
const slugs = fs.readdirSync(dir).filter(d => fs.existsSync(path.join(dir, d, 'index.js')));
const categories = new Map();
for (const s of slugs) {
  const src = fs.readFileSync(path.join(dir, s, 'index.js'), 'utf8');
  const code = src.replace(/export\s+const\s+problem\s*=\s*/, 'const problem = ') + ';problem;';
  const p = vm.runInNewContext(code, Object.create(null), { timeout: 2000 });
  const cat = p.category || 'grind-75';
  if (!categories.has(cat)) categories.set(cat, { count: 0, topics: new Set(), types: new Set() });
  const c = categories.get(cat);
  c.count++;
  c.types.add(p.type);
  for (const t of p.topics) c.topics.add(t);
}
for (const [k, v] of categories) {
  console.log(k + ': ' + v.count + ' problems');
  console.log('  types: ' + [...v.types].join(', '));
  console.log('  topics: ' + [...v.topics].join(', '));
}
