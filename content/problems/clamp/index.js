export const problem = {
  slug: "clamp",  category: "js-75",
  title: "Clamp",
  difficulty: "easy",
  type: "coding",
  topics: ["JavaScript","Math","Functions"],
  companies: ["Google","Meta","Amazon"],
  estimatedMinutes: 10,
  published: true,
  addedAt: "2026-04-01",
  description: "Implement a function to clamp a number within inclusive lower and upper bounds.",
  problemMdx: "## Overview\n\nImplement `clamp(value, lower, upper)`.\n\n## Constraints\n\n- lower <= upper always.\n\n## Examples\n\n```js\nclamp(5, 0, 3); // 3\nclamp(-1, 0, 10); // 0\nclamp(5, 0, 10); // 5\n```\n\n## Solution\n\n<details>\n<summary>Reveal solution</summary>\n\n\`\`\`js\nfunction clamp(value, lower, upper) {\n  return Math.min(Math.max(value, lower), upper);\n}\n\`\`\`\n\n</details>",
  starterCode: "/**\n * Clamp a value between bounds.\n * @param {number} value\n * @param {number} lower\n * @param {number} upper\n * @returns {number}\n */\nfunction clamp(value, lower, upper) {\n  // your implementation\n}",
  solution: "function clamp(value, lower, upper) {\n  return Math.min(Math.max(value, lower), upper);\n}",
  harness: "\nfunction solve(input) { return clamp(input.value, input.lower, input.upper); }",
  tests: [
  {
    "id": "above",
    "description": "Above upper",
    "input": {
      "value": 5,
      "lower": 0,
      "upper": 3
    },
    "expected": 3,
    "isHidden": false
  },
  {
    "id": "below",
    "description": "Below lower",
    "input": {
      "value": -1,
      "lower": 0,
      "upper": 10
    },
    "expected": 0,
    "isHidden": false
  },
  {
    "id": "within",
    "description": "Within range",
    "input": {
      "value": 5,
      "lower": 0,
      "upper": 10
    },
    "expected": 5,
    "isHidden": false
  },
  {
    "id": "h1",
    "description": "Equal bounds",
    "input": {
      "value": 5,
      "lower": 3,
      "upper": 3
    },
    "expected": 3,
    "isHidden": true
  },
  {
    "id": "h2",
    "description": "Negative range",
    "input": {
      "value": 0,
      "lower": -5,
      "upper": -1
    },
    "expected": -1,
    "isHidden": true
  },
  {
    "id": "h3",
    "description": "Exact lower",
    "input": {
      "value": 0,
      "lower": 0,
      "upper": 10
    },
    "expected": 0,
    "isHidden": true
  }
],
};
