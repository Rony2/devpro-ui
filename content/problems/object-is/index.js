export const problem = {
  slug: "object-is",  category: "js-75",
  title: "Object.is",
  difficulty: "easy",
  type: "coding",
  topics: ["JavaScript","Comparison"],
  companies: ["Google","Meta","Amazon"],
  estimatedMinutes: 10,
  published: true,
  addedAt: "2026-04-01",
  description: "Implement the Object.is() method that determines whether two values are the same value.",
  problemMdx: "## Overview\n\nImplement `objectIs(a, b)` — same as `Object.is(a, b)`. Handles `NaN === NaN` (true), `+0 !== -0`.\n\n## Examples\n\n```js\nobjectIs(NaN, NaN); // true\nobjectIs(+0, -0); // false\nobjectIs(1, 1); // true\n```\n\n## Solution\n\n<details>\n<summary>Reveal solution</summary>\n\n\`\`\`js\nfunction objectIs(a, b) {\n  if (a !== a && b !== b) return true;\n  if (a === 0 && b === 0) return 1/a === 1/b;\n  return a === b;\n}\n\`\`\`\n\n</details>",
  starterCode: "/**\n * Implement Object.is.\n * @param {*} a\n * @param {*} b\n * @returns {boolean}\n */\nfunction objectIs(a, b) {\n  // your implementation\n}",
  solution: "function objectIs(a, b) {\n  if (a !== a && b !== b) return true;\n  if (a === 0 && b === 0) return 1/a === 1/b;\n  return a === b;\n}",
  harness: "\nfunction solve(input) {\n  const parse = v => v === 'NaN' ? NaN : v === '+0' ? +0 : v === '-0' ? -0 : v === 'null' ? null : v === 'undefined' ? undefined : v;\n  return objectIs(parse(input.a), parse(input.b));\n}",
  tests: [
  {
    "id": "nan",
    "description": "NaN === NaN",
    "input": {
      "a": "NaN",
      "b": "NaN"
    },
    "expected": true,
    "isHidden": false
  },
  {
    "id": "zeros",
    "description": "+0 !== -0",
    "input": {
      "a": "+0",
      "b": "-0"
    },
    "expected": false,
    "isHidden": false
  },
  {
    "id": "same",
    "description": "Same value",
    "input": {
      "a": 1,
      "b": 1
    },
    "expected": true,
    "isHidden": false
  },
  {
    "id": "h1",
    "description": "Null",
    "input": {
      "a": "null",
      "b": "null"
    },
    "expected": true,
    "isHidden": true
  },
  {
    "id": "h2",
    "description": "Diff types",
    "input": {
      "a": 1,
      "b": "1"
    },
    "expected": false,
    "isHidden": true
  },
  {
    "id": "h3",
    "description": "Undefined",
    "input": {
      "a": "undefined",
      "b": "undefined"
    },
    "expected": true,
    "isHidden": true
  }
],
};
