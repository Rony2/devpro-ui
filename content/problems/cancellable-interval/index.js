export const problem = {
  slug: "cancellable-interval",  category: "js-75",
  title: "Cancellable Interval",
  difficulty: "easy",
  type: "coding",
  topics: ["JavaScript","Timing","Functions"],
  companies: ["Google","Meta","Amazon"],
  estimatedMinutes: 10,
  published: true,
  addedAt: "2026-04-01",
  description: "Implement a function that acts like setInterval but returns a function to cancel the interval.",
  problemMdx: "## Overview\n\nImplement `createInterval(callback, delay)` that calls `callback` every `delay` ms and returns a `cancel` function.\n\n## Examples\n\n```js\nlet count = 0;\nconst cancel = createInterval(() => count++, 100);\nsetTimeout(cancel, 250);\n// count is 2\n```\n\n## Solution\n\n<details>\n<summary>Reveal solution</summary>\n\n\`\`\`js\nfunction createInterval(callback, delay) {\n  const id = setInterval(callback, delay);\n  return function cancel() { clearInterval(id); };\n}\n\`\`\`\n\n</details>",
  starterCode: "/**\n * Create a cancellable interval.\n * @param {Function} callback\n * @param {number} delay\n * @returns {Function} cancel function\n */\nfunction createInterval(callback, delay) {\n  // your implementation\n}",
  solution: "function createInterval(callback, delay) {\n  const id = setInterval(callback, delay);\n  return function cancel() { clearInterval(id); };\n}",
  harness: "\nfunction solve(input) {\n  let count = 0;\n  const cancel = createInterval(() => { count++; }, input.delay);\n  return new Promise(resolve => {\n    setTimeout(() => { cancel(); resolve(count); }, input.duration);\n  });\n}",
  tests: [
  {
    "id": "basic",
    "description": "Runs 2 times in 250ms at 100ms interval",
    "input": {
      "delay": 100,
      "duration": 250
    },
    "expected": 2,
    "isHidden": false
  },
  {
    "id": "fast",
    "description": "Runs 4 times in 250ms at 50ms interval",
    "input": {
      "delay": 50,
      "duration": 250
    },
    "expected": 4,
    "isHidden": false
  },
  {
    "id": "once",
    "description": "Runs once in 150ms at 100ms interval",
    "input": {
      "delay": 100,
      "duration": 150
    },
    "expected": 1,
    "isHidden": false
  },
  {
    "id": "h1",
    "description": "No runs if cancelled immediately",
    "input": {
      "delay": 100,
      "duration": 10
    },
    "expected": 0,
    "isHidden": true
  },
  {
    "id": "h2",
    "description": "Runs 3 times",
    "input": {
      "delay": 100,
      "duration": 350
    },
    "expected": 3,
    "isHidden": true
  },
  {
    "id": "h3",
    "description": "Fast interval",
    "input": {
      "delay": 30,
      "duration": 100
    },
    "expected": 3,
    "isHidden": true
  }
],
};
