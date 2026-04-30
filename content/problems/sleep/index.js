export const problem = {
  slug: "sleep",  category: "js-75",
  title: "Sleep",
  difficulty: "easy",
  type: "coding",
  topics: ["JavaScript","Promises","Timing"],
  companies: ["Google","Meta","Amazon"],
  estimatedMinutes: 10,
  published: true,
  addedAt: "2026-04-01",
  description: "Implement a sleep function that pauses execution for a given number of milliseconds.",
  problemMdx: "## Overview\n\nImplement `sleep(ms)` that returns a Promise that resolves after `ms` milliseconds.\n\n## Examples\n\n```js\nawait sleep(100); // pauses for ~100ms\n```\n\n## Solution\n\n<details>\n<summary>Reveal solution</summary>\n\n\`\`\`js\nfunction sleep(ms) {\n  return new Promise(resolve => setTimeout(resolve, ms));\n}\n\`\`\`\n\n</details>",
  starterCode: "/**\n * Pause execution for ms milliseconds.\n * @param {number} ms\n * @returns {Promise<void>}\n */\nfunction sleep(ms) {\n  // your implementation\n}",
  solution: "function sleep(ms) {\n  return new Promise(resolve => setTimeout(resolve, ms));\n}",
  harness: "\nasync function solve(input) {\n  const start = Date.now();\n  await sleep(input.ms);\n  const elapsed = Date.now() - start;\n  return elapsed >= input.ms - 5;\n}",
  tests: [
  {
    "id": "50ms",
    "description": "Sleep 50ms",
    "input": {
      "ms": 50
    },
    "expected": true,
    "isHidden": false
  },
  {
    "id": "100ms",
    "description": "Sleep 100ms",
    "input": {
      "ms": 100
    },
    "expected": true,
    "isHidden": false
  },
  {
    "id": "10ms",
    "description": "Sleep 10ms",
    "input": {
      "ms": 10
    },
    "expected": true,
    "isHidden": false
  },
  {
    "id": "h1",
    "description": "Sleep 0ms",
    "input": {
      "ms": 0
    },
    "expected": true,
    "isHidden": true
  },
  {
    "id": "h2",
    "description": "Sleep 200ms",
    "input": {
      "ms": 200
    },
    "expected": true,
    "isHidden": true
  },
  {
    "id": "h3",
    "description": "Sleep 1ms",
    "input": {
      "ms": 1
    },
    "expected": true,
    "isHidden": true
  }
],
};
