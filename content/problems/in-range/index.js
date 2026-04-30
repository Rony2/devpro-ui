export const problem = {
  slug: "in-range",  category: "js-75",
  title: "In Range",
  difficulty: "easy",
  type: "coding",
  topics: ["JavaScript","Math","Functions"],
  companies: ["Google","Meta","Amazon"],
  estimatedMinutes: 10,
  published: true,
  addedAt: "2026-04-01",
  description: "Implement a function to check if a number falls between two numbers.",
  problemMdx: "## Overview\n\nImplement `inRange(value, start, end)`. If `end` is omitted, set `end=start`, `start=0`. Range is [start, end). If start > end, swap.\n\n## Examples\n\n```js\ninRange(3, 2, 4); // true\ninRange(4, 8); // true\ninRange(-3, -2, -6); // true\n```\n\n## Solution\n\n<details>\n<summary>Reveal solution</summary>\n\n\`\`\`js\nfunction inRange(value, start, end) {\n  if (end === undefined) { end = start; start = 0; }\n  if (start > end) { const t = start; start = end; end = t; }\n  return value >= start && value < end;\n}\n\`\`\`\n\n</details>",
  starterCode: "/**\n * Check if value is in range [start, end).\n * @param {number} value\n * @param {number} start\n * @param {number} [end]\n * @returns {boolean}\n */\nfunction inRange(value, start, end) {\n  // your implementation\n}",
  solution: "function inRange(value, start, end) {\n  if (end === undefined) { end = start; start = 0; }\n  if (start > end) { const t = start; start = end; end = t; }\n  return value >= start && value < end;\n}",
  harness: "\nfunction solve(input) { return inRange(input.value, input.start, input.end); }",
  tests: [
  {
    "id": "in",
    "description": "In range",
    "input": {
      "value": 3,
      "start": 2,
      "end": 4
    },
    "expected": true,
    "isHidden": false
  },
  {
    "id": "out",
    "description": "Out of range",
    "input": {
      "value": 1,
      "start": 2,
      "end": 4
    },
    "expected": false,
    "isHidden": false
  },
  {
    "id": "two-arg",
    "description": "Two args",
    "input": {
      "value": 4,
      "start": 8
    },
    "expected": true,
    "isHidden": false
  },
  {
    "id": "h1",
    "description": "Negative swap",
    "input": {
      "value": -3,
      "start": -2,
      "end": -6
    },
    "expected": true,
    "isHidden": true
  },
  {
    "id": "h2",
    "description": "At end (exclusive)",
    "input": {
      "value": 4,
      "start": 2,
      "end": 4
    },
    "expected": false,
    "isHidden": true
  },
  {
    "id": "h3",
    "description": "At start (inclusive)",
    "input": {
      "value": 2,
      "start": 2,
      "end": 4
    },
    "expected": true,
    "isHidden": true
  }
],
};
