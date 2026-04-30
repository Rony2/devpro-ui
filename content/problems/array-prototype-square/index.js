export const problem = {
  slug: "array-prototype-square",  category: "js-75",
  title: "Array.prototype.square",
  difficulty: "easy",
  type: "coding",
  topics: ["JavaScript","Arrays","Prototypes"],
  companies: ["Google","Meta","Amazon"],
  estimatedMinutes: 10,
  published: true,
  addedAt: "2026-04-01",
  description: "Implement a custom Array.prototype.square() method that squares the values in an array.",
  problemMdx: "## Overview\n\nImplement `square(array)` — returns a new array where each element is squared.\n\n## Examples\n\n```js\nsquare([1,2,3]); // [1,4,9]\nsquare([-2,0,3]); // [4,0,9]\n```\n\n## Solution\n\n<details>\n<summary>Reveal solution</summary>\n\n\`\`\`js\nfunction square(array) {\n  return array.map(x => x * x);\n}\n\`\`\`\n\n</details>",
  starterCode: "/**\n * Square all elements in an array.\n * @param {number[]} array\n * @returns {number[]}\n */\nfunction square(array) {\n  // your implementation\n}",
  solution: "function square(array) {\n  return array.map(x => x * x);\n}",
  harness: "\nfunction solve(input) { return square(input.array); }",
  tests: [
  {
    "id": "basic",
    "description": "Positive numbers",
    "input": {
      "array": [
        1,
        2,
        3
      ]
    },
    "expected": [
      1,
      4,
      9
    ],
    "isHidden": false
  },
  {
    "id": "mixed",
    "description": "Mixed signs",
    "input": {
      "array": [
        -2,
        0,
        3
      ]
    },
    "expected": [
      4,
      0,
      9
    ],
    "isHidden": false
  },
  {
    "id": "single",
    "description": "Single element",
    "input": {
      "array": [
        5
      ]
    },
    "expected": [
      25
    ],
    "isHidden": false
  },
  {
    "id": "h1",
    "description": "Empty",
    "input": {
      "array": []
    },
    "expected": [],
    "isHidden": true
  },
  {
    "id": "h2",
    "description": "All zeros",
    "input": {
      "array": [
        0,
        0,
        0
      ]
    },
    "expected": [
      0,
      0,
      0
    ],
    "isHidden": true
  },
  {
    "id": "h3",
    "description": "Large numbers",
    "input": {
      "array": [
        10,
        20,
        30
      ]
    },
    "expected": [
      100,
      400,
      900
    ],
    "isHidden": true
  }
],
};
