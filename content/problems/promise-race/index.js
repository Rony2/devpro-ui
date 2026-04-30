export const problem = {
  slug: "promise-race",  category: "js-75",
  title: "Promise.race",
  difficulty: "medium",
  type: "coding",
  topics: ["JavaScript","Promises"],
  companies: ["Google","Meta","Amazon"],
  estimatedMinutes: 25,
  published: true,
  addedAt: "2026-04-01",
  description: "Implement the Promise.race() method.",
  problemMdx: "## Overview\n\nImplement `promiseRace(promises)` that returns a promise which resolves or rejects as soon as one of the input promises resolves or rejects.\n\n## Examples\n\n```js\nconst fast = new Promise(r => setTimeout(() => r('fast'), 50));\nconst slow = new Promise(r => setTimeout(() => r('slow'), 200));\nawait promiseRace([fast, slow]); // 'fast'\n```\n\n## Solution\n\n<details>\n<summary>Reveal solution</summary>\n\n\`\`\`js\nfunction promiseRace(promises) {\n  return new Promise((resolve, reject) => {\n    for (const p of promises) {\n      Promise.resolve(p).then(resolve, reject);\n    }\n  });\n}\n\`\`\`\n\n</details>",
  starterCode: "/**\n * Implement Promise.race.\n * @param {Promise[]} promises\n * @returns {Promise}\n */\nfunction promiseRace(promises) {\n  // your implementation\n}",
  solution: "function promiseRace(promises) {\n  return new Promise((resolve, reject) => {\n    for (const p of promises) {\n      Promise.resolve(p).then(resolve, reject);\n    }\n  });\n}",
  harness: "\nasync function solve(input) {\n  const promises = input.items.map(item =>\n    new Promise((resolve, reject) =>\n      setTimeout(() => item.reject ? reject(new Error(item.value)) : resolve(item.value), item.delay)\n    )\n  );\n  try {\n    const result = await promiseRace(promises);\n    return { value: result, error: null };\n  } catch(e) {\n    return { value: null, error: e.message };\n  }\n}",
  tests: [
  {
    "id": "fastest-wins",
    "description": "Fastest resolves first",
    "input": {
      "items": [
        {
          "value": "fast",
          "delay": 50,
          "reject": false
        },
        {
          "value": "slow",
          "delay": 200,
          "reject": false
        }
      ]
    },
    "expected": {
      "value": "fast",
      "error": null
    },
    "isHidden": false
  },
  {
    "id": "reject-first",
    "description": "Rejection wins",
    "input": {
      "items": [
        {
          "value": "err",
          "delay": 30,
          "reject": true
        },
        {
          "value": "ok",
          "delay": 100,
          "reject": false
        }
      ]
    },
    "expected": {
      "value": null,
      "error": "err"
    },
    "isHidden": false
  },
  {
    "id": "single",
    "description": "Single promise",
    "input": {
      "items": [
        {
          "value": "only",
          "delay": 10,
          "reject": false
        }
      ]
    },
    "expected": {
      "value": "only",
      "error": null
    },
    "isHidden": false
  },
  {
    "id": "h1",
    "description": "Three promises",
    "input": {
      "items": [
        {
          "value": "c",
          "delay": 100,
          "reject": false
        },
        {
          "value": "a",
          "delay": 10,
          "reject": false
        },
        {
          "value": "b",
          "delay": 50,
          "reject": false
        }
      ]
    },
    "expected": {
      "value": "a",
      "error": null
    },
    "isHidden": true
  },
  {
    "id": "h2",
    "description": "All reject",
    "input": {
      "items": [
        {
          "value": "e2",
          "delay": 100,
          "reject": true
        },
        {
          "value": "e1",
          "delay": 50,
          "reject": true
        }
      ]
    },
    "expected": {
      "value": null,
      "error": "e1"
    },
    "isHidden": true
  },
  {
    "id": "h3",
    "description": "Tie goes to first",
    "input": {
      "items": [
        {
          "value": "first",
          "delay": 50,
          "reject": false
        },
        {
          "value": "second",
          "delay": 50,
          "reject": false
        }
      ]
    },
    "expected": {
      "value": "first",
      "error": null
    },
    "isHidden": true
  }
],
};
