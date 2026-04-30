export const problem = {
  slug: "deep-equal",  category: "js-75",
  title: "Deep Equal",
  difficulty: "medium",
  type: "coding",
  topics: ["JavaScript","Objects","Recursion"],
  companies: ["Google","Meta","Amazon"],
  estimatedMinutes: 25,
  published: true,
  addedAt: "2026-04-01",
  description: "Implement a function that checks if two values are deeply equal.",
  problemMdx: "## Overview\n\nImplement `deepEqual(a, b)` that returns `true` if two values are deeply equal.\n\n## Constraints\n\n- Handle primitives, objects, arrays, null\n- Objects compared by keys and values, not reference\n- Arrays compared element by element\n\n## Examples\n\n```js\ndeepEqual({ a: 1, b: { c: 2 }}, { a: 1, b: { c: 2 }}); // true\ndeepEqual([1, [2]], [1, [3]]); // false\n```\n\n## Solution\n\n<details>\n<summary>Reveal solution</summary>\n\n\`\`\`js\nfunction deepEqual(a, b) {\n  if (a === b) return true;\n  if (a === null || b === null || typeof a !== 'object' || typeof b !== 'object') return false;\n  if (Array.isArray(a) !== Array.isArray(b)) return false;\n  const keysA = Object.keys(a);\n  const keysB = Object.keys(b);\n  if (keysA.length !== keysB.length) return false;\n  return keysA.every(key => deepEqual(a[key], b[key]));\n}\n\`\`\`\n\n</details>",
  starterCode: "/**\n * Check deep equality of two values.\n * @param {*} a\n * @param {*} b\n * @returns {boolean}\n */\nfunction deepEqual(a, b) {\n  // your implementation\n}",
  solution: "function deepEqual(a, b) {\n  if (a === b) return true;\n  if (a === null || b === null || typeof a !== 'object' || typeof b !== 'object') return false;\n  if (Array.isArray(a) !== Array.isArray(b)) return false;\n  const keysA = Object.keys(a);\n  const keysB = Object.keys(b);\n  if (keysA.length !== keysB.length) return false;\n  return keysA.every(key => deepEqual(a[key], b[key]));\n}",
  harness: "\nfunction solve(input) { return deepEqual(input.a, input.b); }",
  tests: [
  {
    "id": "equal-obj",
    "description": "Equal objects",
    "input": {
      "a": {
        "a": 1,
        "b": {
          "c": 2
        }
      },
      "b": {
        "a": 1,
        "b": {
          "c": 2
        }
      }
    },
    "expected": true,
    "isHidden": false
  },
  {
    "id": "diff-obj",
    "description": "Different objects",
    "input": {
      "a": {
        "a": 1
      },
      "b": {
        "a": 2
      }
    },
    "expected": false,
    "isHidden": false
  },
  {
    "id": "arrays",
    "description": "Equal arrays",
    "input": {
      "a": [
        1,
        [
          2,
          3
        ]
      ],
      "b": [
        1,
        [
          2,
          3
        ]
      ]
    },
    "expected": true,
    "isHidden": false
  },
  {
    "id": "h1",
    "description": "Different arrays",
    "input": {
      "a": [
        1,
        [
          2
        ]
      ],
      "b": [
        1,
        [
          3
        ]
      ]
    },
    "expected": false,
    "isHidden": true
  },
  {
    "id": "h2",
    "description": "Primitives",
    "input": {
      "a": 42,
      "b": 42
    },
    "expected": true,
    "isHidden": true
  },
  {
    "id": "h3",
    "description": "Null vs object",
    "input": {
      "a": null,
      "b": {}
    },
    "expected": false,
    "isHidden": true
  }
],
};
