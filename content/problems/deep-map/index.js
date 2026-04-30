export const problem = {
  slug: "deep-map",  category: "js-75",
  title: "Deep Map",
  difficulty: "medium",
  type: "coding",
  topics: ["JavaScript","Objects","Recursion"],
  companies: ["Google","Meta","Amazon"],
  estimatedMinutes: 25,
  published: true,
  addedAt: "2026-04-01",
  description: "Implement a function that deeply maps all primitive values in a nested structure.",
  problemMdx: "## Overview\n\nImplement `deepMap(value, fn)` that recursively applies `fn` to every primitive value in a nested object/array.\n\n## Examples\n\n```js\ndeepMap({ a: 1, b: { c: 2 }}, x => x * 2); // { a: 2, b: { c: 4 }}\n```\n\n## Solution\n\n<details>\n<summary>Reveal solution</summary>\n\n\`\`\`js\nfunction deepMap(value, fn) {\n  if (value === null || typeof value !== 'object') return fn(value);\n  if (Array.isArray(value)) return value.map(item => deepMap(item, fn));\n  const result = {};\n  for (const [k, v] of Object.entries(value)) result[k] = deepMap(v, fn);\n  return result;\n}\n\`\`\`\n\n</details>",
  starterCode: "/**\n * Deeply map primitive values.\n * @param {*} value\n * @param {Function} fn\n * @returns {*}\n */\nfunction deepMap(value, fn) {\n  // your implementation\n}",
  solution: "function deepMap(value, fn) {\n  if (value === null || typeof value !== 'object') return fn(value);\n  if (Array.isArray(value)) return value.map(item => deepMap(item, fn));\n  const result = {};\n  for (const [k, v] of Object.entries(value)) result[k] = deepMap(v, fn);\n  return result;\n}",
  harness: "\nfunction solve(input) {\n  const fn = input.op === 'double' ? x => typeof x === 'number' ? x * 2 : x\n    : input.op === 'str' ? x => String(x)\n    : x => typeof x === 'number' ? x + input.add : x;\n  return deepMap(input.value, fn);\n}",
  tests: [
  {
    "id": "double",
    "description": "Double numbers",
    "input": {
      "value": {
        "a": 1,
        "b": {
          "c": 2
        }
      },
      "op": "double"
    },
    "expected": {
      "a": 2,
      "b": {
        "c": 4
      }
    },
    "isHidden": false
  },
  {
    "id": "array",
    "description": "Array values",
    "input": {
      "value": [
        1,
        [
          2,
          3
        ]
      ],
      "op": "double"
    },
    "expected": [
      2,
      [
        4,
        6
      ]
    ],
    "isHidden": false
  },
  {
    "id": "mixed",
    "description": "Mixed structure",
    "input": {
      "value": {
        "a": 1,
        "b": [
          2,
          {
            "c": 3
          }
        ]
      },
      "op": "double"
    },
    "expected": {
      "a": 2,
      "b": [
        4,
        {
          "c": 6
        }
      ]
    },
    "isHidden": false
  },
  {
    "id": "h1",
    "description": "String conversion",
    "input": {
      "value": {
        "x": 1,
        "y": true
      },
      "op": "str"
    },
    "expected": {
      "x": "1",
      "y": "true"
    },
    "isHidden": true
  },
  {
    "id": "h2",
    "description": "Add constant",
    "input": {
      "value": {
        "a": 10,
        "b": {
          "c": 20
        }
      },
      "op": "add",
      "add": 5
    },
    "expected": {
      "a": 15,
      "b": {
        "c": 25
      }
    },
    "isHidden": true
  },
  {
    "id": "h3",
    "description": "Null values",
    "input": {
      "value": {
        "a": null,
        "b": 1
      },
      "op": "double"
    },
    "expected": {
      "a": null,
      "b": 2
    },
    "isHidden": true
  }
],
};
