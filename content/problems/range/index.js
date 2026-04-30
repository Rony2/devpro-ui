export const problem = {
  slug: "range",  category: "js-75",
  title: "Range",
  difficulty: "easy",
  type: "coding",
  topics: ["JavaScript","Arrays","Functions"],
  companies: ["Google","Meta","Amazon"],
  estimatedMinutes: 10,
  published: true,
  addedAt: "2026-04-01",
  description: "Implement a function that returns a sequence of numbers in ascending order.",
  problemMdx: "## Overview\n\nImplement `range(start, end, step)`. Single arg = `end` with `start=0, step=1`. Two args = `step=1`.\n\n## Examples\n\n```js\nrange(5); // [0,1,2,3,4]\nrange(1,5); // [1,2,3,4]\nrange(0,10,3); // [0,3,6,9]\n```\n\n## Solution\n\n<details>\n<summary>Reveal solution</summary>\n\n\`\`\`js\nfunction range(start, end, step) {\n  if (end === undefined) { end = start; start = 0; }\n  if (step === undefined) step = 1;\n  const r = [];\n  for (let i = start; i < end; i += step) r.push(i);\n  return r;\n}\n\`\`\`\n\n</details>",
  starterCode: "/**\n * Generate a range of numbers.\n * @param {number} start\n * @param {number} [end]\n * @param {number} [step=1]\n * @returns {number[]}\n */\nfunction range(start, end, step) {\n  // your implementation\n}",
  solution: "function range(start, end, step) {\n  if (end === undefined) { end = start; start = 0; }\n  if (step === undefined) step = 1;\n  const r = [];\n  for (let i = start; i < end; i += step) r.push(i);\n  return r;\n}",
  harness: "\nfunction solve(input) { return range(input.start, input.end, input.step); }",
  tests: [
  {
    "id": "single-arg",
    "description": "Single arg",
    "input": {
      "start": 5
    },
    "expected": [
      0,
      1,
      2,
      3,
      4
    ],
    "isHidden": false
  },
  {
    "id": "two-args",
    "description": "Two args",
    "input": {
      "start": 1,
      "end": 5
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
    "id": "step",
    "description": "With step",
    "input": {
      "start": 0,
      "end": 10,
      "step": 3
    },
    "expected": [
      0,
      3,
      6,
      9
    ],
    "isHidden": false
  },
  {
    "id": "h1",
    "description": "Zero range",
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
      0,
      2,
      4
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
      5,
      6,
      7,
      8,
      9
    ],
    "isHidden": true
  }
],
};
