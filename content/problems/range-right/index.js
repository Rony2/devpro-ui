export const problem = {
  slug: "range-right",  category: "js-75",
  title: "Range Right",
  difficulty: "easy",
  type: "coding",
  topics: ["JavaScript","Arrays","Functions"],
  companies: ["Google","Meta","Amazon"],
  estimatedMinutes: 10,
  published: true,
  addedAt: "2026-04-01",
  description: "Implement a function that returns a sequence of numbers in descending order.",
  problemMdx: "## Overview\n\nImplement `rangeRight(start, end, step)` — same as `range` but results are reversed.\n\n## Examples\n\n```js\nrangeRight(5); // [4,3,2,1,0]\n```\n\n## Solution\n\n<details>\n<summary>Reveal solution</summary>\n\n\`\`\`js\nfunction rangeRight(start, end, step) {\n  if (end === undefined) { end = start; start = 0; }\n  if (step === undefined) step = 1;\n  const r = [];\n  for (let i = start; i < end; i += step) r.push(i);\n  return r.reverse();\n}\n\`\`\`\n\n</details>",
  starterCode: "/**\n * Generate a range in descending order.\n * @param {number} start\n * @param {number} [end]\n * @param {number} [step=1]\n * @returns {number[]}\n */\nfunction rangeRight(start, end, step) {\n  // your implementation\n}",
  solution: "function rangeRight(start, end, step) {\n  if (end === undefined) { end = start; start = 0; }\n  if (step === undefined) step = 1;\n  const r = [];\n  for (let i = start; i < end; i += step) r.push(i);\n  return r.reverse();\n}",
  harness: "\nfunction solve(input) { return rangeRight(input.start, input.end, input.step); }",
  tests: [
  {
    "id": "single",
    "description": "Single arg",
    "input": {
      "start": 5
    },
    "expected": [
      4,
      3,
      2,
      1,
      0
    ],
    "isHidden": false
  },
  {
    "id": "two",
    "description": "Two args",
    "input": {
      "start": 1,
      "end": 5
    },
    "expected": [
      4,
      3,
      2,
      1
    ],
    "isHidden": false
  },
  {
    "id": "step",
    "description": "With step",
    "input": {
      "start": 0,
      "end": 10,
      "step": 3
    },
    "expected": [
      9,
      6,
      3,
      0
    ],
    "isHidden": false
  },
  {
    "id": "h1",
    "description": "Zero",
    "input": {
      "start": 0
    },
    "expected": [],
    "isHidden": true
  },
  {
    "id": "h2",
    "description": "Step 2",
    "input": {
      "start": 0,
      "end": 6,
      "step": 2
    },
    "expected": [
      4,
      2,
      0
    ],
    "isHidden": true
  },
  {
    "id": "h3",
    "description": "Larger",
    "input": {
      "start": 5,
      "end": 10
    },
    "expected": [
      9,
      8,
      7,
      6,
      5
    ],
    "isHidden": true
  }
],
};
