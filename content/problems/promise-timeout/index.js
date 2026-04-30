export const problem = {
  slug: "promise-timeout",  category: "js-75",
  title: "Promise Timeout",
  difficulty: "medium",
  type: "coding",
  topics: ["JavaScript","Promises"],
  companies: ["Google","Meta","Amazon"],
  estimatedMinutes: 25,
  published: true,
  addedAt: "2026-04-01",
  description: "Implement a function that rejects a promise if it does not resolve within a time limit.",
  problemMdx: "## Overview\n\nImplement `promiseTimeout(promise, ms)` that rejects with a timeout error if `promise` doesn't settle within `ms` milliseconds.\n\n## Examples\n\n```js\nawait promiseTimeout(fetch('/api'), 5000); // resolves if fast, rejects if slow\n```\n\n## Solution\n\n<details>\n<summary>Reveal solution</summary>\n\n\`\`\`js\nfunction promiseTimeout(promise, ms) {\n  const timeout = new Promise((_, reject) =>\n    setTimeout(() => reject(new Error('timeout')), ms)\n  );\n  return Promise.race([promise, timeout]);\n}\n\`\`\`\n\n</details>",
  starterCode: "/**\n * Add timeout to a promise.\n * @param {Promise} promise\n * @param {number} ms\n * @returns {Promise}\n */\nfunction promiseTimeout(promise, ms) {\n  // your implementation\n}",
  solution: "function promiseTimeout(promise, ms) {\n  const timeout = new Promise((_, reject) =>\n    setTimeout(() => reject(new Error('timeout')), ms)\n  );\n  return Promise.race([promise, timeout]);\n}",
  harness: "\nasync function solve(input) {\n  const p = new Promise(resolve => setTimeout(() => resolve(input.value), input.resolveDelay));\n  try {\n    const result = await promiseTimeout(p, input.timeout);\n    return { result, timedOut: false };\n  } catch(e) {\n    return { result: null, timedOut: true };\n  }\n}",
  tests: [
  {
    "id": "resolves",
    "description": "Resolves before timeout",
    "input": {
      "value": "ok",
      "resolveDelay": 30,
      "timeout": 100
    },
    "expected": {
      "result": "ok",
      "timedOut": false
    },
    "isHidden": false
  },
  {
    "id": "times-out",
    "description": "Times out",
    "input": {
      "value": "late",
      "resolveDelay": 200,
      "timeout": 50
    },
    "expected": {
      "result": null,
      "timedOut": true
    },
    "isHidden": false
  },
  {
    "id": "fast",
    "description": "Fast resolve",
    "input": {
      "value": 42,
      "resolveDelay": 10,
      "timeout": 500
    },
    "expected": {
      "result": 42,
      "timedOut": false
    },
    "isHidden": false
  },
  {
    "id": "h1",
    "description": "Tight timing",
    "input": {
      "value": "close",
      "resolveDelay": 90,
      "timeout": 100
    },
    "expected": {
      "result": "close",
      "timedOut": false
    },
    "isHidden": true
  },
  {
    "id": "h2",
    "description": "Zero timeout",
    "input": {
      "value": "never",
      "resolveDelay": 50,
      "timeout": 1
    },
    "expected": {
      "result": null,
      "timedOut": true
    },
    "isHidden": true
  },
  {
    "id": "h3",
    "description": "String value",
    "input": {
      "value": "hello",
      "resolveDelay": 20,
      "timeout": 200
    },
    "expected": {
      "result": "hello",
      "timedOut": false
    },
    "isHidden": true
  }
],
};
