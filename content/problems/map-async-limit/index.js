export const problem = {
  slug: "map-async-limit",  category: "js-75",
  title: "Map Async Limit",
  difficulty: "medium",
  type: "coding",
  topics: ["JavaScript","Promises","Concurrency"],
  companies: ["Google","Stripe","Amazon"],
  estimatedMinutes: 25,
  published: true,
  addedAt: "2026-04-01",
  description: "Implement a function that maps an array through an async function with a concurrency limit.",
  problemMdx: "## Overview\n\nImplement `mapAsyncLimit(array, limit, asyncFn)` that runs at most `limit` async operations concurrently.\n\n## Constraints\n\n- Max `limit` concurrent operations at any time\n- Order of results matches input order\n\n## Examples\n\n```js\nawait mapAsyncLimit([1,2,3,4], 2, async x => x * 2); // [2,4,6,8]\n```\n\n## Solution\n\n<details>\n<summary>Reveal solution</summary>\n\n\`\`\`js\nasync function mapAsyncLimit(array, limit, asyncFn) {\n  const results = new Array(array.length);\n  let idx = 0;\n  async function worker() {\n    while (idx < array.length) {\n      const i = idx++;\n      results[i] = await asyncFn(array[i]);\n    }\n  }\n  const workers = Array.from({ length: Math.min(limit, array.length) }, () => worker());\n  await Promise.all(workers);\n  return results;\n}\n\`\`\`\n\n</details>",
  starterCode: "/**\n * Map with concurrency limit.\n * @param {Array} array\n * @param {number} limit\n * @param {Function} asyncFn\n * @returns {Promise<Array>}\n */\nasync function mapAsyncLimit(array, limit, asyncFn) {\n  // your implementation\n}",
  solution: "async function mapAsyncLimit(array, limit, asyncFn) {\n  const results = new Array(array.length);\n  let idx = 0;\n  async function worker() {\n    while (idx < array.length) {\n      const i = idx++;\n      results[i] = await asyncFn(array[i]);\n    }\n  }\n  const workers = Array.from({ length: Math.min(limit, array.length) }, () => worker());\n  await Promise.all(workers);\n  return results;\n}",
  harness: "\nasync function solve(input) {\n  let maxConcurrent = 0, current = 0;\n  const result = await mapAsyncLimit(input.array, input.limit, async (x) => {\n    current++;\n    if (current > maxConcurrent) maxConcurrent = current;\n    await new Promise(r => setTimeout(r, 20));\n    current--;\n    return x * input.multiplier;\n  });\n  return { result, maxConcurrent };\n}",
  tests: [
  {
    "id": "basic",
    "description": "Limit 2",
    "input": {
      "array": [
        1,
        2,
        3,
        4
      ],
      "limit": 2,
      "multiplier": 2
    },
    "expected": {
      "result": [
        2,
        4,
        6,
        8
      ],
      "maxConcurrent": 2
    },
    "isHidden": false
  },
  {
    "id": "limit-1",
    "description": "Sequential (limit 1)",
    "input": {
      "array": [
        1,
        2,
        3
      ],
      "limit": 1,
      "multiplier": 10
    },
    "expected": {
      "result": [
        10,
        20,
        30
      ],
      "maxConcurrent": 1
    },
    "isHidden": false
  },
  {
    "id": "limit-high",
    "description": "Limit higher than array",
    "input": {
      "array": [
        1,
        2
      ],
      "limit": 5,
      "multiplier": 3
    },
    "expected": {
      "result": [
        3,
        6
      ],
      "maxConcurrent": 2
    },
    "isHidden": false
  },
  {
    "id": "h1",
    "description": "All concurrent",
    "input": {
      "array": [
        1,
        2,
        3
      ],
      "limit": 3,
      "multiplier": 2
    },
    "expected": {
      "result": [
        2,
        4,
        6
      ],
      "maxConcurrent": 3
    },
    "isHidden": true
  },
  {
    "id": "h2",
    "description": "Empty",
    "input": {
      "array": [],
      "limit": 2,
      "multiplier": 1
    },
    "expected": {
      "result": [],
      "maxConcurrent": 0
    },
    "isHidden": true
  },
  {
    "id": "h3",
    "description": "Single",
    "input": {
      "array": [
        7
      ],
      "limit": 3,
      "multiplier": 5
    },
    "expected": {
      "result": [
        35
      ],
      "maxConcurrent": 1
    },
    "isHidden": true
  }
],
};
