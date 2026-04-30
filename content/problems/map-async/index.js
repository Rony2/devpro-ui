export const problem = {
  slug: "map-async",  category: "js-75",
  title: "Map Async",
  difficulty: "medium",
  type: "coding",
  topics: ["JavaScript","Promises","Arrays"],
  companies: ["Google","Stripe","Amazon"],
  estimatedMinutes: 25,
  published: true,
  addedAt: "2026-04-01",
  description: "Implement a function that maps an array through an async function sequentially.",
  problemMdx: "## Overview\n\nImplement `mapAsync(array, asyncFn)` that runs `asyncFn` on each element sequentially (not in parallel) and returns a promise of the mapped array.\n\n## Examples\n\n```js\nawait mapAsync([1,2,3], async x => x * 2); // [2,4,6]\n```\n\n## Solution\n\n<details>\n<summary>Reveal solution</summary>\n\n\`\`\`js\nasync function mapAsync(array, asyncFn) {\n  const results = [];\n  for (const item of array) results.push(await asyncFn(item));\n  return results;\n}\n\`\`\`\n\n</details>",
  starterCode: "/**\n * Map array through async function sequentially.\n * @param {Array} array\n * @param {Function} asyncFn\n * @returns {Promise<Array>}\n */\nasync function mapAsync(array, asyncFn) {\n  // your implementation\n}",
  solution: "async function mapAsync(array, asyncFn) {\n  const results = [];\n  for (const item of array) results.push(await asyncFn(item));\n  return results;\n}",
  harness: "\nasync function solve(input) {\n  const order = [];\n  const result = await mapAsync(input.array, async (x) => {\n    await new Promise(r => setTimeout(r, 10));\n    order.push(x);\n    return x * input.multiplier;\n  });\n  return { result, order };\n}",
  tests: [
  {
    "id": "basic",
    "description": "Maps sequentially",
    "input": {
      "array": [
        1,
        2,
        3
      ],
      "multiplier": 2
    },
    "expected": {
      "result": [
        2,
        4,
        6
      ],
      "order": [
        1,
        2,
        3
      ]
    },
    "isHidden": false
  },
  {
    "id": "single",
    "description": "Single element",
    "input": {
      "array": [
        5
      ],
      "multiplier": 10
    },
    "expected": {
      "result": [
        50
      ],
      "order": [
        5
      ]
    },
    "isHidden": false
  },
  {
    "id": "empty",
    "description": "Empty array",
    "input": {
      "array": [],
      "multiplier": 2
    },
    "expected": {
      "result": [],
      "order": []
    },
    "isHidden": false
  },
  {
    "id": "h1",
    "description": "Large array",
    "input": {
      "array": [
        1,
        2,
        3,
        4,
        5
      ],
      "multiplier": 3
    },
    "expected": {
      "result": [
        3,
        6,
        9,
        12,
        15
      ],
      "order": [
        1,
        2,
        3,
        4,
        5
      ]
    },
    "isHidden": true
  },
  {
    "id": "h2",
    "description": "Negative",
    "input": {
      "array": [
        -1,
        -2
      ],
      "multiplier": 5
    },
    "expected": {
      "result": [
        -5,
        -10
      ],
      "order": [
        -1,
        -2
      ]
    },
    "isHidden": true
  },
  {
    "id": "h3",
    "description": "Zero multiplier",
    "input": {
      "array": [
        1,
        2,
        3
      ],
      "multiplier": 0
    },
    "expected": {
      "result": [
        0,
        0,
        0
      ],
      "order": [
        1,
        2,
        3
      ]
    },
    "isHidden": true
  }
],
};
