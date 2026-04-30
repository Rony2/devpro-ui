export const problem = {
  slug: "data-selection",  category: "js-75",
  title: "Data Selection",
  difficulty: "hard",
  type: "coding",
  topics: ["JavaScript","Objects","Strings"],
  companies: ["Google","Stripe","Amazon"],
  estimatedMinutes: 45,
  published: true,
  addedAt: "2026-04-01",
  description: "Implement a CSS-selector-like query engine for nested JavaScript objects.",
  problemMdx: "## Overview\n\nImplement `select(data, selector)` that queries nested data using a dot-separated path supporting:\n- `a.b` — nested property access\n- `a[0]` — array index access\n- `a.*.b` — wildcard (all children)\n\n## Examples\n\n```js\nselect({ a: { b: 1 }}, 'a.b'); // 1\nselect({ items: [{ name: 'a' }, { name: 'b' }]}, 'items.*.name'); // ['a','b']\n```\n\n## Solution\n\n<details>\n<summary>Reveal solution</summary>\n\n\`\`\`js\nfunction select(data, selector) {\n  const parts = selector.replace(/\\[(\\d+)\\]/g, '.$1').split('.');\n  function recurse(obj, idx) {\n    if (idx === parts.length) return obj;\n    if (obj === null || obj === undefined) return undefined;\n    const part = parts[idx];\n    if (part === '*') {\n      const values = Array.isArray(obj) ? obj : Object.values(obj);\n      const results = values.map(v => recurse(v, idx + 1)).filter(v => v !== undefined);\n      return results;\n    }\n    const key = /^\\d+$/.test(part) ? Number(part) : part;\n    return recurse(obj[key], idx + 1);\n  }\n  return recurse(data, 0);\n}\n\`\`\`\n\n</details>",
  starterCode: "/**\n * Select data using dot-path with wildcards.\n * @param {*} data\n * @param {string} selector\n * @returns {*}\n */\nfunction select(data, selector) {\n  // your implementation\n}",
  solution: "function select(data, selector) {\n  const parts = selector.replace(/\\[(\\d+)\\]/g, '.$1').split('.');\n  function recurse(obj, idx) {\n    if (idx === parts.length) return obj;\n    if (obj === null || obj === undefined) return undefined;\n    const part = parts[idx];\n    if (part === '*') {\n      const values = Array.isArray(obj) ? obj : Object.values(obj);\n      const results = values.map(v => recurse(v, idx + 1)).filter(v => v !== undefined);\n      return results;\n    }\n    const key = /^\\d+$/.test(part) ? Number(part) : part;\n    return recurse(obj[key], idx + 1);\n  }\n  return recurse(data, 0);\n}",
  harness: "\nfunction solve(input) { return select(input.data, input.selector); }",
  tests: [
  {
    "id": "nested",
    "description": "Nested access",
    "input": {
      "data": {
        "a": {
          "b": 1
        }
      },
      "selector": "a.b"
    },
    "expected": 1,
    "isHidden": false
  },
  {
    "id": "wildcard",
    "description": "Wildcard",
    "input": {
      "data": {
        "items": [
          {
            "name": "a"
          },
          {
            "name": "b"
          }
        ]
      },
      "selector": "items.*.name"
    },
    "expected": [
      "a",
      "b"
    ],
    "isHidden": false
  },
  {
    "id": "array-index",
    "description": "Array index",
    "input": {
      "data": {
        "list": [
          10,
          20,
          30
        ]
      },
      "selector": "list[1]"
    },
    "expected": 20,
    "isHidden": false
  },
  {
    "id": "h1",
    "description": "Deep wildcard",
    "input": {
      "data": {
        "a": {
          "x": {
            "v": 1
          },
          "y": {
            "v": 2
          }
        }
      },
      "selector": "a.*.v"
    },
    "expected": [
      1,
      2
    ],
    "isHidden": true
  },
  {
    "id": "h2",
    "description": "Missing path",
    "input": {
      "data": {
        "a": 1
      },
      "selector": "a.b.c"
    },
    "isHidden": true
  },
  {
    "id": "h3",
    "description": "Root access",
    "input": {
      "data": {
        "x": 42
      },
      "selector": "x"
    },
    "expected": 42,
    "isHidden": true
  }
],
};
