export const problem = {
  slug: "function-length",  category: "js-75",
  title: "Function Length",
  difficulty: "easy",
  type: "coding",
  topics: ["JavaScript","Functions"],
  companies: ["Google","Meta","Amazon"],
  estimatedMinutes: 10,
  published: true,
  addedAt: "2026-04-01",
  description: "Implement a function that returns the number of parameters expected by a function.",
  problemMdx: "## Overview\n\nImplement `functionLength(fn)` that returns the number of formal parameters.\n\n## Examples\n\n```js\nfunctionLength(function(a, b, c) {}); // 3\nfunctionLength(function() {}); // 0\n```\n\n## Solution\n\n<details>\n<summary>Reveal solution</summary>\n\n\`\`\`js\nfunction functionLength(fn) {\n  return fn.length;\n}\n\`\`\`\n\n</details>",
  starterCode: "/**\n * Return the parameter count of a function.\n * @param {Function} fn\n * @returns {number}\n */\nfunction functionLength(fn) {\n  // your implementation\n}",
  solution: "function functionLength(fn) {\n  return fn.length;\n}",
  harness: "\nfunction solve(input) {\n  const fn = new Function(...input.params, 'return 0');\n  return functionLength(fn);\n}",
  tests: [
  {
    "id": "three",
    "description": "Three params",
    "input": {
      "params": [
        "a",
        "b",
        "c"
      ]
    },
    "expected": 3,
    "isHidden": false
  },
  {
    "id": "zero",
    "description": "No params",
    "input": {
      "params": []
    },
    "expected": 0,
    "isHidden": false
  },
  {
    "id": "one",
    "description": "One param",
    "input": {
      "params": [
        "x"
      ]
    },
    "expected": 1,
    "isHidden": false
  },
  {
    "id": "h1",
    "description": "Two params",
    "input": {
      "params": [
        "a",
        "b"
      ]
    },
    "expected": 2,
    "isHidden": true
  },
  {
    "id": "h2",
    "description": "Five params",
    "input": {
      "params": [
        "a",
        "b",
        "c",
        "d",
        "e"
      ]
    },
    "expected": 5,
    "isHidden": true
  },
  {
    "id": "h3",
    "description": "Four params",
    "input": {
      "params": [
        "w",
        "x",
        "y",
        "z"
      ]
    },
    "expected": 4,
    "isHidden": true
  }
],
};
