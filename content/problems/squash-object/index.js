export const problem = {
  slug: "squash-object",  category: "js-75",
  title: "Squash Object",
  difficulty: "medium",
  type: "coding",
  topics: ["JavaScript","Objects","Recursion"],
  companies: ["Google","Meta","Amazon"],
  estimatedMinutes: 25,
  published: true,
  addedAt: "2026-04-01",
  description: "Implement a function that flattens a nested object into dot-notation keys.",
  problemMdx: "## Overview\n\nImplement `squashObject(object)` that flattens nested object keys using dot notation.\n\n## Examples\n\n```js\nsquashObject({ a: { b: 1, c: { d: 2 }}}); // { 'a.b': 1, 'a.c.d': 2 }\n```\n\n## Solution\n\n<details>\n<summary>Reveal solution</summary>\n\n\`\`\`js\nfunction squashObject(object) {\n  const result = {};\n  function recurse(obj, prefix) {\n    for (const [k, v] of Object.entries(obj)) {\n      const key = prefix ? \`${prefix}.${k}\` : k;\n      if (v !== null && typeof v === 'object' && !Array.isArray(v)) {\n        recurse(v, key);\n      } else {\n        result[key] = v;\n      }\n    }\n  }\n  recurse(object, '');\n  return result;\n}\n\`\`\`\n\n</details>",
  starterCode: "/**\n * Flatten nested object to dot-notation keys.\n * @param {Object} object\n * @returns {Object}\n */\nfunction squashObject(object) {\n  // your implementation\n}",
  solution: "function squashObject(object) {\n  const result = {};\n  function recurse(obj, prefix) {\n    for (const [k, v] of Object.entries(obj)) {\n      const key = prefix ? `${prefix}.${k}` : k;\n      if (v !== null && typeof v === 'object' && !Array.isArray(v)) {\n        recurse(v, key);\n      } else {\n        result[key] = v;\n      }\n    }\n  }\n  recurse(object, '');\n  return result;\n}",
  harness: "\nfunction solve(input) { return squashObject(input.object); }",
  tests: [
  {
    "id": "basic",
    "description": "Nested to dot",
    "input": {
      "object": {
        "a": {
          "b": 1,
          "c": {
            "d": 2
          }
        }
      }
    },
    "expected": {
      "a.b": 1,
      "a.c.d": 2
    },
    "isHidden": false
  },
  {
    "id": "flat",
    "description": "Already flat",
    "input": {
      "object": {
        "x": 1,
        "y": 2
      }
    },
    "expected": {
      "x": 1,
      "y": 2
    },
    "isHidden": false
  },
  {
    "id": "deep",
    "description": "Three levels",
    "input": {
      "object": {
        "a": {
          "b": {
            "c": 3
          }
        }
      }
    },
    "expected": {
      "a.b.c": 3
    },
    "isHidden": false
  },
  {
    "id": "h1",
    "description": "With arrays",
    "input": {
      "object": {
        "a": 1,
        "b": [
          1,
          2
        ]
      }
    },
    "expected": {
      "a": 1,
      "b": [
        1,
        2
      ]
    },
    "isHidden": true
  },
  {
    "id": "h2",
    "description": "Mixed",
    "input": {
      "object": {
        "a": {
          "b": 1
        },
        "c": 2,
        "d": {
          "e": {
            "f": 3
          }
        }
      }
    },
    "expected": {
      "a.b": 1,
      "c": 2,
      "d.e.f": 3
    },
    "isHidden": true
  },
  {
    "id": "h3",
    "description": "Null values",
    "input": {
      "object": {
        "a": {
          "b": null,
          "c": 1
        }
      }
    },
    "expected": {
      "a.b": null,
      "a.c": 1
    },
    "isHidden": true
  }
],
};
