export const problem = {
  slug: "number-of-arguments",  category: "js-75",
  title: "Number of Arguments",
  difficulty: "easy",
  type: "coding",
  topics: ["JavaScript","Functions"],
  companies: ["Google","Meta","Amazon"],
  estimatedMinutes: 10,
  published: true,
  addedAt: "2026-04-01",
  description: "Implement a function that returns the number of arguments it was called with.",
  problemMdx: "## Overview\n\nImplement `numberOfArgs(...args)` that returns the count of arguments.\n\n## Examples\n\n```js\nnumberOfArgs(1, 2, 3); // 3\nnumberOfArgs(); // 0\n```\n\n## Solution\n\n<details>\n<summary>Reveal solution</summary>\n\n\`\`\`js\nfunction numberOfArgs(...args) {\n  return args.length;\n}\n\`\`\`\n\n</details>",
  starterCode: "/**\n * Return the number of arguments passed.\n * @param {...*} args\n * @returns {number}\n */\nfunction numberOfArgs() {\n  // your implementation\n}",
  solution: "function numberOfArgs(...args) {\n  return args.length;\n}",
  harness: "\nfunction solve(input) { return numberOfArgs(...input.args); }",
  tests: [
  {
    "id": "three",
    "description": "Three args",
    "input": {
      "args": [
        1,
        2,
        3
      ]
    },
    "expected": 3,
    "isHidden": false
  },
  {
    "id": "zero",
    "description": "No args",
    "input": {
      "args": []
    },
    "expected": 0,
    "isHidden": false
  },
  {
    "id": "mixed",
    "description": "Mixed types",
    "input": {
      "args": [
        "a",
        null,
        true
      ]
    },
    "expected": 3,
    "isHidden": false
  },
  {
    "id": "h1",
    "description": "Single",
    "input": {
      "args": [
        42
      ]
    },
    "expected": 1,
    "isHidden": true
  },
  {
    "id": "h2",
    "description": "Seven args",
    "input": {
      "args": [
        1,
        2,
        3,
        4,
        5,
        6,
        7
      ]
    },
    "expected": 7,
    "isHidden": true
  },
  {
    "id": "h3",
    "description": "Nested arrays",
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
    "expected": 2,
    "isHidden": true
  }
],
};
