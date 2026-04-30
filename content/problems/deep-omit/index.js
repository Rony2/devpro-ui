export const problem = {
  slug: "deep-omit",  category: "js-75",
  title: "Deep Omit",
  difficulty: "medium",
  type: "coding",
  topics: ["JavaScript","Objects","Recursion"],
  companies: ["Google","Meta","Amazon"],
  estimatedMinutes: 25,
  published: true,
  addedAt: "2026-04-01",
  description: "Implement a function that deeply removes specified keys from an object.",
  problemMdx: "## Overview\n\nImplement `deepOmit(object, keys)` that recursively removes all specified keys from a nested object.\n\n## Examples\n\n```js\ndeepOmit({ a: 1, b: { c: 2, a: 3 }}, ['a']); // { b: { c: 2 }}\n```\n\n## Solution\n\n<details>\n<summary>Reveal solution</summary>\n\n\`\`\`js\nfunction deepOmit(object, keys) {\n  if (object === null || typeof object !== 'object') return object;\n  if (Array.isArray(object)) return object.map(item => deepOmit(item, keys));\n  const result = {};\n  const keySet = new Set(keys);\n  for (const [k, v] of Object.entries(object)) {\n    if (!keySet.has(k)) result[k] = deepOmit(v, keys);\n  }\n  return result;\n}\n\`\`\`\n\n</details>",
  starterCode: "/**\n * Deeply omit keys from an object.\n * @param {Object} object\n * @param {string[]} keys\n * @returns {Object}\n */\nfunction deepOmit(object, keys) {\n  // your implementation\n}",
  solution: "function deepOmit(object, keys) {\n  if (object === null || typeof object !== 'object') return object;\n  if (Array.isArray(object)) return object.map(item => deepOmit(item, keys));\n  const result = {};\n  const keySet = new Set(keys);\n  for (const [k, v] of Object.entries(object)) {\n    if (!keySet.has(k)) result[k] = deepOmit(v, keys);\n  }\n  return result;\n}",
  harness: "\nfunction solve(input) { return deepOmit(input.object, input.keys); }",
  tests: [
  {
    "id": "basic",
    "description": "Remove key deeply",
    "input": {
      "object": {
        "a": 1,
        "b": {
          "c": 2,
          "a": 3
        }
      },
      "keys": [
        "a"
      ]
    },
    "expected": {
      "b": {
        "c": 2
      }
    },
    "isHidden": false
  },
  {
    "id": "multi",
    "description": "Remove multiple keys",
    "input": {
      "object": {
        "x": 1,
        "y": 2,
        "nested": {
          "x": 3,
          "z": 4
        }
      },
      "keys": [
        "x",
        "y"
      ]
    },
    "expected": {
      "nested": {
        "z": 4
      }
    },
    "isHidden": false
  },
  {
    "id": "no-match",
    "description": "No keys match",
    "input": {
      "object": {
        "a": 1,
        "b": 2
      },
      "keys": [
        "c"
      ]
    },
    "expected": {
      "a": 1,
      "b": 2
    },
    "isHidden": false
  },
  {
    "id": "h1",
    "description": "Nested arrays",
    "input": {
      "object": {
        "a": 1,
        "items": [
          {
            "a": 2,
            "b": 3
          }
        ]
      },
      "keys": [
        "a"
      ]
    },
    "expected": {
      "items": [
        {
          "b": 3
        }
      ]
    },
    "isHidden": true
  },
  {
    "id": "h2",
    "description": "Empty object",
    "input": {
      "object": {},
      "keys": [
        "a"
      ]
    },
    "expected": {},
    "isHidden": true
  },
  {
    "id": "h3",
    "description": "Deep nesting",
    "input": {
      "object": {
        "a": {
          "b": {
            "c": {
              "d": 1,
              "a": 2
            }
          }
        }
      },
      "keys": [
        "a"
      ]
    },
    "expected": {},
    "isHidden": true
  }
],
};
