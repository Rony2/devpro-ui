export const problem = {
  slug: "deep-merge",  category: "js-75",
  title: "Deep Merge",
  difficulty: "medium",
  type: "coding",
  topics: ["JavaScript","Objects","Recursion"],
  companies: ["Google","Stripe","Shopify"],
  estimatedMinutes: 25,
  published: true,
  addedAt: "2026-04-01",
  description: "Implement a function that deeply merges two objects.",
  problemMdx: "## Overview\n\nImplement `deepMerge(target, source)` that recursively merges `source` into `target`. Source values overwrite target for non-object values. Objects are merged recursively.\n\n## Examples\n\n```js\ndeepMerge({ a: 1, b: { c: 2 }}, { b: { d: 3 }, e: 4 });\n// { a: 1, b: { c: 2, d: 3 }, e: 4 }\n```\n\n## Solution\n\n<details>\n<summary>Reveal solution</summary>\n\n\`\`\`js\nfunction deepMerge(target, source) {\n  const result = { ...target };\n  for (const [key, val] of Object.entries(source)) {\n    if (val && typeof val === 'object' && !Array.isArray(val)\n        && result[key] && typeof result[key] === 'object' && !Array.isArray(result[key])) {\n      result[key] = deepMerge(result[key], val);\n    } else {\n      result[key] = val;\n    }\n  }\n  return result;\n}\n\`\`\`\n\n</details>",
  starterCode: "/**\n * Deeply merge two objects.\n * @param {Object} target\n * @param {Object} source\n * @returns {Object}\n */\nfunction deepMerge(target, source) {\n  // your implementation\n}",
  solution: "function deepMerge(target, source) {\n  const result = { ...target };\n  for (const [key, val] of Object.entries(source)) {\n    if (val && typeof val === 'object' && !Array.isArray(val)\n        && result[key] && typeof result[key] === 'object' && !Array.isArray(result[key])) {\n      result[key] = deepMerge(result[key], val);\n    } else {\n      result[key] = val;\n    }\n  }\n  return result;\n}",
  harness: "\nfunction solve(input) { return deepMerge(input.target, input.source); }",
  tests: [
  {
    "id": "basic",
    "description": "Merge nested",
    "input": {
      "target": {
        "a": 1,
        "b": {
          "c": 2
        }
      },
      "source": {
        "b": {
          "d": 3
        },
        "e": 4
      }
    },
    "expected": {
      "a": 1,
      "b": {
        "c": 2,
        "d": 3
      },
      "e": 4
    },
    "isHidden": false
  },
  {
    "id": "override",
    "description": "Override primitive",
    "input": {
      "target": {
        "a": 1,
        "b": 2
      },
      "source": {
        "b": 99
      }
    },
    "expected": {
      "a": 1,
      "b": 99
    },
    "isHidden": false
  },
  {
    "id": "deep",
    "description": "Three levels deep",
    "input": {
      "target": {
        "a": {
          "b": {
            "c": 1
          }
        }
      },
      "source": {
        "a": {
          "b": {
            "d": 2
          }
        }
      }
    },
    "expected": {
      "a": {
        "b": {
          "c": 1,
          "d": 2
        }
      }
    },
    "isHidden": false
  },
  {
    "id": "h1",
    "description": "New keys only",
    "input": {
      "target": {
        "a": 1
      },
      "source": {
        "b": 2,
        "c": 3
      }
    },
    "expected": {
      "a": 1,
      "b": 2,
      "c": 3
    },
    "isHidden": true
  },
  {
    "id": "h2",
    "description": "Array override",
    "input": {
      "target": {
        "a": [
          1,
          2
        ]
      },
      "source": {
        "a": [
          3,
          4
        ]
      }
    },
    "expected": {
      "a": [
        3,
        4
      ]
    },
    "isHidden": true
  },
  {
    "id": "h3",
    "description": "Empty target",
    "input": {
      "target": {},
      "source": {
        "a": {
          "b": 1
        }
      }
    },
    "expected": {
      "a": {
        "b": 1
      }
    },
    "isHidden": true
  }
],
};
