export const problem = {
  slug: "cancellable-timeout",  category: "js-75",
  title: "Cancellable Timeout",
  difficulty: "easy",
  type: "coding",
  topics: ["JavaScript","Timing","Functions"],
  companies: ["Google","Meta","Amazon"],
  estimatedMinutes: 10,
  published: true,
  addedAt: "2026-04-01",
  description: "Implement a function that acts like setTimeout but returns a function to cancel the pending callback.",
  problemMdx: "## Overview\n\nImplement `createTimeout(callback, delay)` that schedules `callback` after `delay` ms and returns a `cancel` function.\n\n## Examples\n\n```js\nlet called = false;\nconst cancel = createTimeout(() => { called = true; }, 100);\ncancel(); // callback never fires\n```\n\n## Solution\n\n<details>\n<summary>Reveal solution</summary>\n\n\`\`\`js\nfunction createTimeout(callback, delay) {\n  const id = setTimeout(callback, delay);\n  return function cancel() { clearTimeout(id); };\n}\n\`\`\`\n\n</details>",
  starterCode: "/**\n * Create a cancellable timeout.\n * @param {Function} callback\n * @param {number} delay\n * @returns {Function} cancel function\n */\nfunction createTimeout(callback, delay) {\n  // your implementation\n}",
  solution: "function createTimeout(callback, delay) {\n  const id = setTimeout(callback, delay);\n  return function cancel() { clearTimeout(id); };\n}",
  harness: "\nasync function solve(input) {\n  let called = false;\n  const cancel = createTimeout(() => { called = true; }, input.delay);\n  if (input.cancelAfter !== null) setTimeout(cancel, input.cancelAfter);\n  return new Promise(resolve => setTimeout(() => resolve(called), input.checkAfter));\n}",
  tests: [
  {
    "id": "cancelled",
    "description": "Cancel before fire",
    "input": {
      "delay": 100,
      "cancelAfter": 50,
      "checkAfter": 150
    },
    "expected": false,
    "isHidden": false
  },
  {
    "id": "not-cancelled",
    "description": "Fires normally",
    "input": {
      "delay": 50,
      "cancelAfter": null,
      "checkAfter": 100
    },
    "expected": true,
    "isHidden": false
  },
  {
    "id": "late-cancel",
    "description": "Cancel after fire",
    "input": {
      "delay": 50,
      "cancelAfter": 100,
      "checkAfter": 150
    },
    "expected": true,
    "isHidden": false
  },
  {
    "id": "h1",
    "description": "Immediate cancel",
    "input": {
      "delay": 100,
      "cancelAfter": 0,
      "checkAfter": 150
    },
    "expected": false,
    "isHidden": true
  },
  {
    "id": "h2",
    "description": "Exact timing",
    "input": {
      "delay": 80,
      "cancelAfter": null,
      "checkAfter": 150
    },
    "expected": true,
    "isHidden": true
  },
  {
    "id": "h3",
    "description": "Close cancel",
    "input": {
      "delay": 100,
      "cancelAfter": 90,
      "checkAfter": 200
    },
    "expected": false,
    "isHidden": true
  }
],
};
