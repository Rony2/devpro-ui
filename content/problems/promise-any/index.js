export const problem = {
  slug: "promise-any",  category: "js-75",
  title: "Promise.any",
  difficulty: "medium",
  type: "coding",
  topics: ["JavaScript","Promises"],
  companies: ["Google","Meta","Amazon"],
  estimatedMinutes: 25,
  published: true,
  addedAt: "2026-04-01",
  description: "Implement the Promise.any() method that resolves when any promise resolves.",
  problemMdx: "## Overview\n\nImplement `promiseAny(promises)` that returns the first fulfilled promise. If all reject, throws an AggregateError.\n\n## Examples\n\n```js\nawait promiseAny([Promise.reject('a'), Promise.resolve('b')]); // 'b'\n```\n\n## Solution\n\n<details>\n<summary>Reveal solution</summary>\n\n\`\`\`js\nfunction promiseAny(promises) {\n  return new Promise((resolve, reject) => {\n    const errors = [];\n    let count = 0;\n    const arr = Array.from(promises);\n    if (arr.length === 0) reject(new AggregateError([], 'All promises were rejected'));\n    arr.forEach((p, i) => {\n      Promise.resolve(p).then(resolve, (err) => {\n        errors[i] = err;\n        count++;\n        if (count === arr.length) reject(new AggregateError(errors, 'All promises were rejected'));\n      });\n    });\n  });\n}\n\`\`\`\n\n</details>",
  starterCode: "/**\n * Implement Promise.any.\n * @param {Promise[]} promises\n * @returns {Promise}\n */\nfunction promiseAny(promises) {\n  // your implementation\n}",
  solution: "function promiseAny(promises) {\n  return new Promise((resolve, reject) => {\n    const errors = [];\n    let count = 0;\n    const arr = Array.from(promises);\n    if (arr.length === 0) reject(new AggregateError([], 'All promises were rejected'));\n    arr.forEach((p, i) => {\n      Promise.resolve(p).then(resolve, (err) => {\n        errors[i] = err;\n        count++;\n        if (count === arr.length) reject(new AggregateError(errors, 'All promises were rejected'));\n      });\n    });\n  });\n}",
  harness: "\nasync function solve(input) {\n  const promises = input.items.map(item =>\n    new Promise((resolve, reject) =>\n      setTimeout(() => item.reject ? reject(item.value) : resolve(item.value), item.delay)\n    )\n  );\n  try {\n    const result = await promiseAny(promises);\n    return { value: result, allRejected: false };\n  } catch(e) {\n    return { value: null, allRejected: true };\n  }\n}",
  tests: [
  {
    "id": "first-resolves",
    "description": "First resolve wins",
    "input": {
      "items": [
        {
          "value": "a",
          "delay": 50,
          "reject": false
        },
        {
          "value": "b",
          "delay": 100,
          "reject": false
        }
      ]
    },
    "expected": {
      "value": "a",
      "allRejected": false
    },
    "isHidden": false
  },
  {
    "id": "skip-reject",
    "description": "Skips rejections",
    "input": {
      "items": [
        {
          "value": "err",
          "delay": 30,
          "reject": true
        },
        {
          "value": "ok",
          "delay": 60,
          "reject": false
        }
      ]
    },
    "expected": {
      "value": "ok",
      "allRejected": false
    },
    "isHidden": false
  },
  {
    "id": "all-reject",
    "description": "All reject",
    "input": {
      "items": [
        {
          "value": "e1",
          "delay": 30,
          "reject": true
        },
        {
          "value": "e2",
          "delay": 60,
          "reject": true
        }
      ]
    },
    "expected": {
      "value": null,
      "allRejected": true
    },
    "isHidden": false
  },
  {
    "id": "h1",
    "description": "Late resolve wins",
    "input": {
      "items": [
        {
          "value": "e",
          "delay": 10,
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
      "value": "ok",
      "allRejected": false
    },
    "isHidden": true
  },
  {
    "id": "h2",
    "description": "Single resolve",
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
      "allRejected": false
    },
    "isHidden": true
  },
  {
    "id": "h3",
    "description": "Single reject",
    "input": {
      "items": [
        {
          "value": "err",
          "delay": 10,
          "reject": true
        }
      ]
    },
    "expected": {
      "value": null,
      "allRejected": true
    },
    "isHidden": true
  }
],
};
