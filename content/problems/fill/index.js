export const problem = {
  slug: "fill",  category: "js-75",
  title: "Fill",
  difficulty: "easy",
  type: "coding",
  topics: ["JavaScript","Arrays"],
  companies: ["Google","Meta","Amazon"],
  estimatedMinutes: 10,
  published: true,
  addedAt: "2026-04-01",
  description: "Implement a function that fills an array with values within specified indices.",
  problemMdx: "## Overview\n\nImplement `fill(array, value, start, end)` that fills `array` from `start` to `end` (exclusive) with `value`. Modifies and returns the original array.\n\n## Examples\n\n```js\nfill([1,2,3,4], '*', 1, 3); // [1,'*','*',4]\nfill([1,2,3], 0); // [0,0,0]\n```\n\n## Solution\n\n<details>\n<summary>Reveal solution</summary>\n\n\`\`\`js\nfunction fill(array, value, start, end) {\n  const s = start ?? 0;\n  const e = end ?? array.length;\n  for (let i = s; i < e; i++) array[i] = value;\n  return array;\n}\n\`\`\`\n\n</details>",
  starterCode: "/**\n * Fill array positions with a value.\n * @param {Array} array\n * @param {*} value\n * @param {number} [start=0]\n * @param {number} [end=array.length]\n * @returns {Array}\n */\nfunction fill(array, value, start, end) {\n  // your implementation\n}",
  solution: "function fill(array, value, start, end) {\n  const s = start ?? 0;\n  const e = end ?? array.length;\n  for (let i = s; i < e; i++) array[i] = value;\n  return array;\n}",
  harness: "\nfunction solve(input) { return fill([...input.array], input.value, input.start, input.end); }",
  tests: [
  {
    "id": "partial",
    "description": "Partial fill",
    "input": {
      "array": [
        1,
        2,
        3,
        4
      ],
      "value": "*",
      "start": 1,
      "end": 3
    },
    "expected": [
      1,
      "*",
      "*",
      4
    ],
    "isHidden": false
  },
  {
    "id": "full",
    "description": "Full fill",
    "input": {
      "array": [
        1,
        2,
        3
      ],
      "value": 0
    },
    "expected": [
      0,
      0,
      0
    ],
    "isHidden": false
  },
  {
    "id": "from-start",
    "description": "From start",
    "input": {
      "array": [
        1,
        2,
        3
      ],
      "value": "x",
      "start": 0,
      "end": 2
    },
    "expected": [
      "x",
      "x",
      3
    ],
    "isHidden": false
  },
  {
    "id": "h1",
    "description": "Single position",
    "input": {
      "array": [
        1,
        2,
        3
      ],
      "value": 9,
      "start": 1,
      "end": 2
    },
    "expected": [
      1,
      9,
      3
    ],
    "isHidden": true
  },
  {
    "id": "h2",
    "description": "Empty array",
    "input": {
      "array": [],
      "value": 1
    },
    "expected": [],
    "isHidden": true
  },
  {
    "id": "h3",
    "description": "Fill end",
    "input": {
      "array": [
        1,
        2,
        3,
        4,
        5
      ],
      "value": 0,
      "start": 3
    },
    "expected": [
      1,
      2,
      3,
      0,
      0
    ],
    "isHidden": true
  }
],
};
