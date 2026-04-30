export const problem = {
  slug: "object-map",  category: "js-75",
  title: "Object Map",
  difficulty: "easy",
  type: "coding",
  topics: ["JavaScript","Objects","Functions"],
  companies: ["Google","Meta","Amazon"],
  estimatedMinutes: 10,
  published: true,
  addedAt: "2026-04-01",
  description: "Implement a function to transform values within an object.",
  problemMdx: "## Overview\n\nImplement `objectMap(object, fn)` that returns a new object with the same keys but values transformed by `fn(value, key)`.\n\n## Examples\n\n```js\nobjectMap({ a: 1, b: 2 }, v => v * 2); // { a: 2, b: 4 }\n```\n\n## Solution\n\n<details>\n<summary>Reveal solution</summary>\n\n\`\`\`js\nfunction objectMap(object, fn) {\n  const r = {};\n  for (const [k, v] of Object.entries(object)) r[k] = fn(v, k);\n  return r;\n}\n\`\`\`\n\n</details>",
  starterCode: "/**\n * Transform object values.\n * @param {Object} object\n * @param {Function} fn\n * @returns {Object}\n */\nfunction objectMap(object, fn) {\n  // your implementation\n}",
  solution: "function objectMap(object, fn) {\n  const r = {};\n  for (const [k, v] of Object.entries(object)) r[k] = fn(v, k);\n  return r;\n}",
  harness: "\nfunction solve(input) {\n  return objectMap(input.object, v => input.op === 'double' ? v * 2 : input.op === 'str' ? String(v) : v + input.add);\n}",
  tests: [
  {
    "id": "double",
    "description": "Double values",
    "input": {
      "object": {
        "a": 1,
        "b": 2,
        "c": 3
      },
      "op": "double"
    },
    "expected": {
      "a": 2,
      "b": 4,
      "c": 6
    },
    "isHidden": false
  },
  {
    "id": "add",
    "description": "Add constant",
    "input": {
      "object": {
        "x": 10,
        "y": 20
      },
      "op": "add",
      "add": 5
    },
    "expected": {
      "x": 15,
      "y": 25
    },
    "isHidden": false
  },
  {
    "id": "stringify",
    "description": "Convert to string",
    "input": {
      "object": {
        "a": 1,
        "b": 2
      },
      "op": "str"
    },
    "expected": {
      "a": "1",
      "b": "2"
    },
    "isHidden": false
  },
  {
    "id": "h1",
    "description": "Empty object",
    "input": {
      "object": {},
      "op": "double"
    },
    "expected": {},
    "isHidden": true
  },
  {
    "id": "h2",
    "description": "Single key",
    "input": {
      "object": {
        "z": 100
      },
      "op": "double"
    },
    "expected": {
      "z": 200
    },
    "isHidden": true
  },
  {
    "id": "h3",
    "description": "Negative values",
    "input": {
      "object": {
        "a": -1,
        "b": -2
      },
      "op": "double"
    },
    "expected": {
      "a": -2,
      "b": -4
    },
    "isHidden": true
  }
],
};
