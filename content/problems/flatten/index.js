export const problem = {
  slug: "flatten",  category: "js-75",
  title: "Flatten",
  difficulty: "medium",
  type: "coding",
  topics: ["JavaScript","Arrays","Recursion"],
  companies: ["Google","Meta","Stripe"],
  estimatedMinutes: 25,
  published: true,
  addedAt: "2026-04-01",
  description: "Implement a function that flattens an array up to a specified depth.",
  problemMdx: "## Overview\n\nImplement `flatten(array, depth)` that recursively flattens a nested array up to `depth` levels. Default depth is 1.\n\n## Examples\n\n```js\nflatten([1,[2,[3,[4]]]], 1); // [1,2,[3,[4]]]\nflatten([1,[2,[3,[4]]]], Infinity); // [1,2,3,4]\n```\n\n## Solution\n\n<details>\n<summary>Reveal solution</summary>\n\n\`\`\`js\nfunction flatten(array, depth = 1) {\n  const r = [];\n  for (const item of array) {\n    if (Array.isArray(item) && depth > 0) {\n      r.push(...flatten(item, depth - 1));\n    } else {\n      r.push(item);\n    }\n  }\n  return r;\n}\n\`\`\`\n\n</details>",
  starterCode: "/**\n * Flatten an array up to a specified depth.\n * @param {Array} array\n * @param {number} [depth=1]\n * @returns {Array}\n */\nfunction flatten(array, depth) {\n  // your implementation\n}",
  solution: "function flatten(array, depth = 1) {\n  const r = [];\n  for (const item of array) {\n    if (Array.isArray(item) && depth > 0) {\n      r.push(...flatten(item, depth - 1));\n    } else {\n      r.push(item);\n    }\n  }\n  return r;\n}",
  harness: "\nfunction solve(input) { return flatten(input.array, input.depth); }",
  tests: [
  {
    "id": "depth-1",
    "description": "Flatten depth 1",
    "input": {
      "array": [
        1,
        [
          2,
          [
            3,
            [
              4
            ]
          ]
        ]
      ],
      "depth": 1
    },
    "expected": [
      1,
      2,
      [
        3,
        [
          4
        ]
      ]
    ],
    "isHidden": false
  },
  {
    "id": "depth-inf",
    "description": "Flatten fully",
    "input": {
      "array": [
        1,
        [
          2,
          [
            3,
            [
              4
            ]
          ]
        ]
      ],
      "depth": 100
    },
    "expected": [
      1,
      2,
      3,
      4
    ],
    "isHidden": false
  },
  {
    "id": "already-flat",
    "description": "Already flat",
    "input": {
      "array": [
        1,
        2,
        3
      ],
      "depth": 1
    },
    "expected": [
      1,
      2,
      3
    ],
    "isHidden": false
  },
  {
    "id": "h1",
    "description": "Depth 2",
    "input": {
      "array": [
        1,
        [
          2,
          [
            3,
            [
              4
            ]
          ]
        ]
      ],
      "depth": 2
    },
    "expected": [
      1,
      2,
      3,
      [
        4
      ]
    ],
    "isHidden": true
  },
  {
    "id": "h2",
    "description": "Mixed types",
    "input": {
      "array": [
        [
          1,
          2
        ],
        3,
        [
          4,
          [
            5
          ]
        ]
      ],
      "depth": 1
    },
    "expected": [
      1,
      2,
      3,
      4,
      [
        5
      ]
    ],
    "isHidden": true
  },
  {
    "id": "h3",
    "description": "Empty nested",
    "input": {
      "array": [
        [],
        [
          1,
          []
        ]
      ],
      "depth": 100
    },
    "expected": [
      1
    ],
    "isHidden": true
  }
],
};
