export const problem = {
  slug: "deep-clone",  category: "js-75",
  title: "Deep Clone",
  difficulty: "medium",
  type: "coding",
  topics: ["JavaScript","Objects","Recursion"],
  companies: ["Google","Meta","Stripe"],
  estimatedMinutes: 25,
  published: true,
  addedAt: "2026-04-01",
  description: "Implement a function that creates a deep clone of an object.",
  problemMdx: "## Overview\n\nImplement `deepClone(value)` that creates a deep copy of the input. Must handle objects, arrays, nested structures, null, and primitives.\n\n## Constraints\n\n- No `JSON.parse(JSON.stringify())`\n- Handle nested objects and arrays\n- Primitives returned as-is\n\n## Examples\n\n```js\nconst obj = { a: 1, b: { c: 2 } };\nconst clone = deepClone(obj);\nclone.b.c = 99;\nobj.b.c; // still 2\n```\n\n## Solution\n\n<details>\n<summary>Reveal solution</summary>\n\n\`\`\`js\nfunction deepClone(value) {\n  if (value === null || typeof value !== 'object') return value;\n  if (Array.isArray(value)) return value.map(item => deepClone(item));\n  const result = {};\n  for (const key of Object.keys(value)) result[key] = deepClone(value[key]);\n  return result;\n}\n\`\`\`\n\n</details>",
  starterCode: "/**\n * Deep clone a value.\n * @param {*} value\n * @returns {*}\n */\nfunction deepClone(value) {\n  // your implementation\n}",
  solution: "function deepClone(value) {\n  if (value === null || typeof value !== 'object') return value;\n  if (Array.isArray(value)) return value.map(item => deepClone(item));\n  const result = {};\n  for (const key of Object.keys(value)) result[key] = deepClone(value[key]);\n  return result;\n}",
  harness: "\nfunction solve(input) {\n  const cloned = deepClone(input.value);\n  return { cloned, isDeep: JSON.stringify(cloned) === JSON.stringify(input.value) };\n}",
  tests: [
  {
    "id": "obj",
    "description": "Clone object",
    "input": {
      "value": {
        "a": 1,
        "b": {
          "c": 2
        }
      }
    },
    "expected": {
      "cloned": {
        "a": 1,
        "b": {
          "c": 2
        }
      },
      "isDeep": true
    },
    "isHidden": false
  },
  {
    "id": "array",
    "description": "Clone array",
    "input": {
      "value": [
        1,
        [
          2,
          3
        ],
        {
          "a": 4
        }
      ]
    },
    "expected": {
      "cloned": [
        1,
        [
          2,
          3
        ],
        {
          "a": 4
        }
      ],
      "isDeep": true
    },
    "isHidden": false
  },
  {
    "id": "nested",
    "description": "Deeply nested",
    "input": {
      "value": {
        "a": {
          "b": {
            "c": {
              "d": 1
            }
          }
        }
      }
    },
    "expected": {
      "cloned": {
        "a": {
          "b": {
            "c": {
              "d": 1
            }
          }
        }
      },
      "isDeep": true
    },
    "isHidden": false
  },
  {
    "id": "h1",
    "description": "Primitive",
    "input": {
      "value": 42
    },
    "expected": {
      "cloned": 42,
      "isDeep": true
    },
    "isHidden": true
  },
  {
    "id": "h2",
    "description": "Null",
    "input": {
      "value": null
    },
    "expected": {
      "cloned": null,
      "isDeep": true
    },
    "isHidden": true
  },
  {
    "id": "h3",
    "description": "Mixed",
    "input": {
      "value": {
        "nums": [
          1,
          2
        ],
        "str": "hello",
        "nested": {
          "ok": true
        }
      }
    },
    "expected": {
      "cloned": {
        "nums": [
          1,
          2
        ],
        "str": "hello",
        "nested": {
          "ok": true
        }
      },
      "isDeep": true
    },
    "isHidden": true
  }
],
};
