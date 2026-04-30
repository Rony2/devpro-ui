export const problem = {
  slug: "promise-all-settled",  category: "js-75",
  title: "Promise.allSettled",
  difficulty: "medium",
  type: "coding",
  topics: ["JavaScript","Promises"],
  companies: ["Google","Meta","Amazon"],
  estimatedMinutes: 25,
  published: true,
  addedAt: "2026-04-01",
  description: "Implement the Promise.allSettled() method.",
  problemMdx: "## Overview\n\nImplement `promiseAllSettled(promises)` that waits for all promises and returns their outcomes as `{status, value}` or `{status, reason}`.\n\n## Examples\n\n```js\nawait promiseAllSettled([Promise.resolve(1), Promise.reject('err')]);\n// [{status:'fulfilled',value:1}, {status:'rejected',reason:'err'}]\n```\n\n## Solution\n\n<details>\n<summary>Reveal solution</summary>\n\n\`\`\`js\nfunction promiseAllSettled(promises) {\n  return Promise.all(\n    Array.from(promises).map(p =>\n      Promise.resolve(p)\n        .then(value => ({ status: 'fulfilled', value }))\n        .catch(reason => ({ status: 'rejected', reason }))\n    )\n  );\n}\n\`\`\`\n\n</details>",
  starterCode: "/**\n * Implement Promise.allSettled.\n * @param {Promise[]} promises\n * @returns {Promise<Array>}\n */\nfunction promiseAllSettled(promises) {\n  // your implementation\n}",
  solution: "function promiseAllSettled(promises) {\n  return Promise.all(\n    Array.from(promises).map(p =>\n      Promise.resolve(p)\n        .then(value => ({ status: 'fulfilled', value }))\n        .catch(reason => ({ status: 'rejected', reason }))\n    )\n  );\n}",
  harness: "\nasync function solve(input) {\n  const promises = input.items.map(item =>\n    new Promise((resolve, reject) =>\n      setTimeout(() => item.reject ? reject(item.value) : resolve(item.value), item.delay)\n    )\n  );\n  return await promiseAllSettled(promises);\n}",
  tests: [
  {
    "id": "mixed",
    "description": "Mixed results",
    "input": {
      "items": [
        {
          "value": 1,
          "delay": 10,
          "reject": false
        },
        {
          "value": "err",
          "delay": 20,
          "reject": true
        }
      ]
    },
    "expected": [
      {
        "status": "fulfilled",
        "value": 1
      },
      {
        "status": "rejected",
        "reason": "err"
      }
    ],
    "isHidden": false
  },
  {
    "id": "all-ok",
    "description": "All fulfilled",
    "input": {
      "items": [
        {
          "value": "a",
          "delay": 10,
          "reject": false
        },
        {
          "value": "b",
          "delay": 20,
          "reject": false
        }
      ]
    },
    "expected": [
      {
        "status": "fulfilled",
        "value": "a"
      },
      {
        "status": "fulfilled",
        "value": "b"
      }
    ],
    "isHidden": false
  },
  {
    "id": "all-fail",
    "description": "All rejected",
    "input": {
      "items": [
        {
          "value": "e1",
          "delay": 10,
          "reject": true
        },
        {
          "value": "e2",
          "delay": 20,
          "reject": true
        }
      ]
    },
    "expected": [
      {
        "status": "rejected",
        "reason": "e1"
      },
      {
        "status": "rejected",
        "reason": "e2"
      }
    ],
    "isHidden": false
  },
  {
    "id": "h1",
    "description": "Single success",
    "input": {
      "items": [
        {
          "value": 42,
          "delay": 10,
          "reject": false
        }
      ]
    },
    "expected": [
      {
        "status": "fulfilled",
        "value": 42
      }
    ],
    "isHidden": true
  },
  {
    "id": "h2",
    "description": "Single failure",
    "input": {
      "items": [
        {
          "value": "fail",
          "delay": 10,
          "reject": true
        }
      ]
    },
    "expected": [
      {
        "status": "rejected",
        "reason": "fail"
      }
    ],
    "isHidden": true
  },
  {
    "id": "h3",
    "description": "Three items",
    "input": {
      "items": [
        {
          "value": 1,
          "delay": 10,
          "reject": false
        },
        {
          "value": "no",
          "delay": 20,
          "reject": true
        },
        {
          "value": 3,
          "delay": 30,
          "reject": false
        }
      ]
    },
    "expected": [
      {
        "status": "fulfilled",
        "value": 1
      },
      {
        "status": "rejected",
        "reason": "no"
      },
      {
        "status": "fulfilled",
        "value": 3
      }
    ],
    "isHidden": true
  }
],
};
