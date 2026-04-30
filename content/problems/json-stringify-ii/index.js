export const problem = {
  slug: "json-stringify-ii",  category: "js-75",
  title: "JSON Stringify II",
  difficulty: "hard",
  type: "coding",
  topics: ["JavaScript","Recursion","Strings"],
  companies: ["Google","Amazon","Microsoft"],
  estimatedMinutes: 45,
  published: true,
  addedAt: "2026-04-01",
  description: "Implement a full-featured JSON.stringify with replacer and space support.",
  problemMdx: "## Overview\n\nImplement `jsonStringify(value, replacer, space)` that supports:\n- All JSON types (string, number, boolean, null, array, object)\n- Optional `replacer` function `(key, value) => newValue`\n- Optional `space` parameter for indentation\n\n## Constraints\n\n- Do not use native `JSON.stringify`\n- `undefined`, functions → omitted from objects, `null` in arrays\n- Handle nested structures\n\n## Examples\n\n```js\njsonStringify({ a: 1, b: undefined }, null, 2);\n// '{\\n  \"a\": 1\\n}'\n```\n\n## Solution\n\n<details>\n<summary>Reveal solution</summary>\n\n\`\`\`js\nfunction jsonStringify(value, replacer, space) {\n  const indent = typeof space === 'number' ? ' '.repeat(space) : (space || '');\n  function serialize(val, depth) {\n    if (val === null) return 'null';\n    if (val === undefined || typeof val === 'function') return undefined;\n    if (typeof val === 'boolean') return String(val);\n    if (typeof val === 'number') return isFinite(val) ? String(val) : 'null';\n    if (typeof val === 'string') return '\"' + val.replace(/\\\\/g,'\\\\\\\\').replace(/\"/g,'\\\\\"').replace(/\\n/g,'\\\\n') + '\"';\n    if (Array.isArray(val)) {\n      if (val.length === 0) return '[]';\n      const items = val.map(v => { const s = serialize(v, depth+1); return s === undefined ? 'null' : s; });\n      if (!indent) return '[' + items.join(',') + ']';\n      const pad = indent.repeat(depth+1);\n      return '[\\n' + items.map(i => pad + i).join(',\\n') + '\\n' + indent.repeat(depth) + ']';\n    }\n    const entries = [];\n    for (const [k, v] of Object.entries(val)) {\n      let newV = replacer ? replacer(k, v) : v;\n      const s = serialize(newV, depth+1);\n      if (s !== undefined) entries.push([k, s]);\n    }\n    if (entries.length === 0) return '{}';\n    if (!indent) return '{' + entries.map(([k,v]) => serialize(k,0)+':'+v).join(',') + '}';\n    const pad = indent.repeat(depth+1);\n    return '{\\n' + entries.map(([k,v]) => pad + serialize(k,0)+': '+v).join(',\\n') + '\\n' + indent.repeat(depth) + '}';\n  }\n  let v = replacer ? replacer('', value) : value;\n  return serialize(v, 0);\n}\n\`\`\`\n\n</details>",
  starterCode: "/**\n * Full JSON.stringify implementation.\n * @param {*} value\n * @param {Function|null} [replacer]\n * @param {number|string} [space]\n * @returns {string}\n */\nfunction jsonStringify(value, replacer, space) {\n  // your implementation\n}",
  solution: "function jsonStringify(value, replacer, space) {\n  const indent = typeof space === 'number' ? ' '.repeat(space) : (space || '');\n  function serialize(val, depth) {\n    if (val === null) return 'null';\n    if (val === undefined || typeof val === 'function') return undefined;\n    if (typeof val === 'boolean') return String(val);\n    if (typeof val === 'number') return isFinite(val) ? String(val) : 'null';\n    if (typeof val === 'string') return '\"' + val.replace(/\\\\/g,'\\\\\\\\').replace(/\"/g,'\\\\\"').replace(/\\n/g,'\\\\n') + '\"';\n    if (Array.isArray(val)) {\n      if (val.length === 0) return '[]';\n      const items = val.map(v => { const s = serialize(v, depth+1); return s === undefined ? 'null' : s; });\n      if (!indent) return '[' + items.join(',') + ']';\n      const pad = indent.repeat(depth+1);\n      return '[\\n' + items.map(i => pad + i).join(',\\n') + '\\n' + indent.repeat(depth) + ']';\n    }\n    const entries = [];\n    for (const [k, v] of Object.entries(val)) {\n      let newV = replacer ? replacer(k, v) : v;\n      const s = serialize(newV, depth+1);\n      if (s !== undefined) entries.push([k, s]);\n    }\n    if (entries.length === 0) return '{}';\n    if (!indent) return '{' + entries.map(([k,v]) => serialize(k,0)+':'+v).join(',') + '}';\n    const pad = indent.repeat(depth+1);\n    return '{\\n' + entries.map(([k,v]) => pad + serialize(k,0)+': '+v).join(',\\n') + '\\n' + indent.repeat(depth) + '}';\n  }\n  let v = replacer ? replacer('', value) : value;\n  return serialize(v, 0);\n}",
  harness: "\nfunction solve(input) {\n  const result = jsonStringify(input.value, null, input.space || undefined);\n  return result;\n}",
  tests: [
  {
    "id": "object",
    "description": "Simple object",
    "input": {
      "value": {
        "a": 1,
        "b": "hello"
      },
      "space": 0
    },
    "expected": "{\"a\":1,\"b\":\"hello\"}",
    "isHidden": false
  },
  {
    "id": "array",
    "description": "Array",
    "input": {
      "value": [
        1,
        null,
        true,
        "str"
      ],
      "space": 0
    },
    "expected": "[1,null,true,\"str\"]",
    "isHidden": false
  },
  {
    "id": "nested",
    "description": "Nested structure",
    "input": {
      "value": {
        "a": {
          "b": [
            1,
            2
          ]
        }
      },
      "space": 0
    },
    "expected": "{\"a\":{\"b\":[1,2]}}",
    "isHidden": false
  },
  {
    "id": "h1",
    "description": "Primitives",
    "input": {
      "value": 42,
      "space": 0
    },
    "expected": "42",
    "isHidden": true
  },
  {
    "id": "h2",
    "description": "Boolean",
    "input": {
      "value": false,
      "space": 0
    },
    "expected": "false",
    "isHidden": true
  },
  {
    "id": "h3",
    "description": "String",
    "input": {
      "value": "hello",
      "space": 0
    },
    "expected": "\"hello\"",
    "isHidden": true
  }
],
};
