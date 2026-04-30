export const problem = {
  slug: "classnames-ii",  category: "js-75",
  title: "Classnames II",
  difficulty: "hard",
  type: "coding",
  topics: ["JavaScript","Strings","Objects","Recursion"],
  companies: ["Meta","Vercel","Shopify"],
  estimatedMinutes: 45,
  published: true,
  addedAt: "2026-04-01",
  description: "Implement an advanced classnames function supporting deeply nested arrays, objects, and edge cases.",
  problemMdx: "## Overview\n\nImplement `classnames(...args)` that handles:\n- Strings, numbers (as class names)\n- Objects (keys with truthy values)\n- Deeply nested arrays\n- Falsy values are skipped\n\n## Constraints\n\n- Handle arbitrary nesting depth\n- Numbers are valid class names\n- toString() is not called on objects\n\n## Examples\n\n```js\nclassnames('a', [[[['b']]]], { c: true, d: 0 }, 1); // 'a b c 1'\n```\n\n## Solution\n\n<details>\n<summary>Reveal solution</summary>\n\n\`\`\`js\nfunction classnames(...args) {\n  const classes = [];\n  for (const arg of args) {\n    if (!arg && arg !== 0) continue;\n    if (typeof arg === 'string' || typeof arg === 'number') classes.push(arg);\n    else if (Array.isArray(arg)) { const nested = classnames(...arg); if (nested) classes.push(nested); }\n    else if (typeof arg === 'object') {\n      for (const [k, v] of Object.entries(arg)) { if (v) classes.push(k); }\n    }\n  }\n  return classes.join(' ');\n}\n\`\`\`\n\n</details>",
  starterCode: "/**\n * Advanced classnames.\n * @param {...*} args\n * @returns {string}\n */\nfunction classnames(...args) {\n  // your implementation\n}",
  solution: "function classnames(...args) {\n  const classes = [];\n  for (const arg of args) {\n    if (!arg && arg !== 0) continue;\n    if (typeof arg === 'string' || typeof arg === 'number') classes.push(arg);\n    else if (Array.isArray(arg)) { const nested = classnames(...arg); if (nested) classes.push(nested); }\n    else if (typeof arg === 'object') {\n      for (const [k, v] of Object.entries(arg)) { if (v) classes.push(k); }\n    }\n  }\n  return classes.join(' ');\n}",
  harness: "\nfunction solve(input) { return classnames(...input.args); }",
  tests: [
  {
    "id": "basic",
    "description": "Mixed types",
    "input": {
      "args": [
        "a",
        [
          "b"
        ],
        {
          "c": true
        },
        1
      ]
    },
    "expected": "a b c 1",
    "isHidden": false
  },
  {
    "id": "nested",
    "description": "Deep nesting",
    "input": {
      "args": [
        "x",
        [
          [
            [
              [
                "y"
              ]
            ]
          ]
        ]
      ]
    },
    "expected": "x y",
    "isHidden": false
  },
  {
    "id": "complex",
    "description": "Complex mix",
    "input": {
      "args": [
        null,
        "a",
        null,
        0,
        {
          "b": 1,
          "c": false
        },
        [
          [
            "d"
          ]
        ]
      ]
    },
    "expected": "a 0 b d",
    "isHidden": false
  },
  {
    "id": "h1",
    "description": "All falsy",
    "input": {
      "args": [
        null,
        null,
        false,
        "",
        {
          "a": 0,
          "b": null
        }
      ]
    },
    "expected": "",
    "isHidden": true
  },
  {
    "id": "h2",
    "description": "Numbers only",
    "input": {
      "args": [
        1,
        2,
        3
      ]
    },
    "expected": "1 2 3",
    "isHidden": true
  },
  {
    "id": "h3",
    "description": "Deeply mixed",
    "input": {
      "args": [
        "btn",
        [
          {
            "active": true
          },
          [
            [
              "lg",
              {
                "disabled": false
              }
            ]
          ]
        ]
      ]
    },
    "expected": "btn active lg",
    "isHidden": true
  }
],
};
