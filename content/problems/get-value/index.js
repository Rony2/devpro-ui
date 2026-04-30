export const problem = {
  slug: "get-value",  category: "js-75",
  title: "Get",
  difficulty: "easy",
  type: "coding",
  topics: ["JavaScript","Objects","Functions"],
  companies: ["Google","Meta","Amazon"],
  estimatedMinutes: 10,
  published: true,
  addedAt: "2026-04-01",
  description: "Implement a function to safely access deeply-nested properties in JavaScript objects.",
  problemMdx: "## Overview\n\nImplement `get(object, path, defaultValue)` that retrieves the value at `path` of `object`. If resolved value is `undefined`, return `defaultValue`.\n\n## Constraints\n\n- `path` is a dot-separated string.\n- Return `defaultValue` if path can't be resolved.\n\n## Examples\n\n```js\nget({ a: { b: 1 } }, 'a.b'); // 1\nget({ a: { b: 1 } }, 'a.c', 'default'); // 'default'\n```\n\n## Solution\n\n<details>\n<summary>Reveal solution</summary>\n\n\`\`\`js\nfunction get(object, path, defaultValue) {\n  const keys = Array.isArray(path) ? path : path.split('.');\n  let result = object;\n  for (const key of keys) {\n    if (result == null) return defaultValue;\n    result = result[key];\n  }\n  return result === undefined ? defaultValue : result;\n}\n\`\`\`\n\n</details>",
  starterCode: "/**\n * Safely access a nested property.\n * @param {Object} object\n * @param {string} path\n * @param {*} [defaultValue]\n * @returns {*}\n */\nfunction get(object, path, defaultValue) {\n  // your implementation\n}",
  solution: "function get(object, path, defaultValue) {\n  const keys = Array.isArray(path) ? path : path.split('.');\n  let result = object;\n  for (const key of keys) {\n    if (result == null) return defaultValue;\n    result = result[key];\n  }\n  return result === undefined ? defaultValue : result;\n}",
  harness: "\nfunction solve(input) { return get(input.object, input.path, input.defaultValue); }",
  tests: [
  {
    "id": "nested",
    "description": "Nested access",
    "input": {
      "object": {
        "a": {
          "b": 1
        }
      },
      "path": "a.b"
    },
    "expected": 1,
    "isHidden": false
  },
  {
    "id": "default",
    "description": "Missing returns default",
    "input": {
      "object": {
        "a": {
          "b": 1
        }
      },
      "path": "a.c",
      "defaultValue": "default"
    },
    "expected": "default",
    "isHidden": false
  },
  {
    "id": "top",
    "description": "Top-level",
    "input": {
      "object": {
        "x": 42
      },
      "path": "x"
    },
    "expected": 42,
    "isHidden": false
  },
  {
    "id": "h1",
    "description": "Deep nesting",
    "input": {
      "object": {
        "a": {
          "b": {
            "c": {
              "d": 5
            }
          }
        }
      },
      "path": "a.b.c.d"
    },
    "expected": 5,
    "isHidden": true
  },
  {
    "id": "h2",
    "description": "Null along path",
    "input": {
      "object": {
        "a": null
      },
      "path": "a.b",
      "defaultValue": -1
    },
    "expected": -1,
    "isHidden": true
  },
  {
    "id": "h3",
    "description": "No default",
    "input": {
      "object": {},
      "path": "x"
    },
    "isHidden": true
  }
],
};
