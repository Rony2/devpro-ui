export const problem = {
  slug: "array-prototype-concat",  category: "js-75",
  title: "Array.prototype.concat",
  difficulty: "easy",
  type: "coding",
  topics: ["JavaScript","Arrays","Prototypes"],
  companies: ["Google","Meta","Amazon"],
  estimatedMinutes: 10,
  published: true,
  addedAt: "2026-04-01",
  description: "Implement the Array.prototype.concat() method.",
  problemMdx: "## Overview\n\nImplement `concat(...args)` that merges arrays and values into a new array, like `Array.prototype.concat`.\n\n## Examples\n\n```js\nconcat([1,2], [3,4], 5); // [1,2,3,4,5]\n```\n\n## Solution\n\n<details>\n<summary>Reveal solution</summary>\n\n\`\`\`js\nfunction concat(...args) {\n  const result = [];\n  for (const arg of args) {\n    if (Array.isArray(arg)) result.push(...arg);\n    else result.push(arg);\n  }\n  return result;\n}\n\`\`\`\n\n</details>",
  starterCode: "/**\n * Concat arrays and values.\n * @param {...*} args\n * @returns {Array}\n */\nfunction concat(...args) {\n  // your implementation\n}",
  solution: "function concat(...args) {\n  const result = [];\n  for (const arg of args) {\n    if (Array.isArray(arg)) result.push(...arg);\n    else result.push(arg);\n  }\n  return result;\n}",
  harness: "\nfunction solve(input) { return concat(...input.args); }",
  tests: [
  {
    "id": "arrays",
    "description": "Two arrays",
    "input": {
      "args": [
        [
          1,
          2
        ],
        [
          3,
          4
        ]
      ]
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
    "id": "mixed",
    "description": "Arrays and values",
    "input": {
      "args": [
        [
          1,
          2
        ],
        3,
        [
          4,
          5
        ]
      ]
    },
    "expected": [
      1,
      2,
      3,
      4,
      5
    ],
    "isHidden": false
  },
  {
    "id": "values",
    "description": "All values",
    "input": {
      "args": [
        1,
        2,
        3
      ]
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
    "description": "Empty arrays",
    "input": {
      "args": [
        [],
        [],
        1
      ]
    },
    "expected": [
      1
    ],
    "isHidden": true
  },
  {
    "id": "h2",
    "description": "Single array",
    "input": {
      "args": [
        [
          1,
          2,
          3
        ]
      ]
    },
    "expected": [
      1,
      2,
      3
    ],
    "isHidden": true
  },
  {
    "id": "h3",
    "description": "Nested not flattened",
    "input": {
      "args": [
        [
          1,
          [
            2
          ]
        ],
        3
      ]
    },
    "expected": [
      1,
      [
        2
      ],
      3
    ],
    "isHidden": true
  }
],
};
