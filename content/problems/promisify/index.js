export const problem = {
  slug: "promisify",  category: "js-75",
  title: "Promisify",
  difficulty: "medium",
  type: "coding",
  topics: ["JavaScript","Promises","Functions"],
  companies: ["Google","Amazon","Stripe"],
  estimatedMinutes: 25,
  published: true,
  addedAt: "2026-04-01",
  description: "Implement a function that converts a callback-based function to a promise-based one.",
  problemMdx: "## Overview\n\nImplement `promisify(fn)` that converts a Node-style callback function `fn(args..., callback)` where `callback(err, result)` into one that returns a Promise.\n\n## Examples\n\n```js\nfunction readFile(path, cb) { cb(null, 'content'); }\nconst readFileAsync = promisify(readFile);\nconst content = await readFileAsync('test.txt'); // 'content'\n```\n\n## Solution\n\n<details>\n<summary>Reveal solution</summary>\n\n\`\`\`js\nfunction promisify(fn) {\n  return function(...args) {\n    return new Promise((resolve, reject) => {\n      fn(...args, (err, result) => {\n        if (err) reject(err);\n        else resolve(result);\n      });\n    });\n  };\n}\n\`\`\`\n\n</details>",
  starterCode: "/**\n * Convert callback-based function to promise-based.\n * @param {Function} fn\n * @returns {Function}\n */\nfunction promisify(fn) {\n  // your implementation\n}",
  solution: "function promisify(fn) {\n  return function(...args) {\n    return new Promise((resolve, reject) => {\n      fn(...args, (err, result) => {\n        if (err) reject(err);\n        else resolve(result);\n      });\n    });\n  };\n}",
  harness: "\nasync function solve(input) {\n  function cbFn(a, b, cb) { if (input.shouldError) cb(new Error('fail')); else cb(null, a + b); }\n  const asyncFn = promisify(cbFn);\n  try {\n    const result = await asyncFn(input.a, input.b);\n    return { result, error: null };\n  } catch(e) {\n    return { result: null, error: e.message };\n  }\n}",
  tests: [
  {
    "id": "success",
    "description": "Resolves on success",
    "input": {
      "a": 3,
      "b": 4,
      "shouldError": false
    },
    "expected": {
      "result": 7,
      "error": null
    },
    "isHidden": false
  },
  {
    "id": "error",
    "description": "Rejects on error",
    "input": {
      "a": 1,
      "b": 2,
      "shouldError": true
    },
    "expected": {
      "result": null,
      "error": "fail"
    },
    "isHidden": false
  },
  {
    "id": "zero",
    "description": "Zero values",
    "input": {
      "a": 0,
      "b": 0,
      "shouldError": false
    },
    "expected": {
      "result": 0,
      "error": null
    },
    "isHidden": false
  },
  {
    "id": "h1",
    "description": "Negative",
    "input": {
      "a": -5,
      "b": 3,
      "shouldError": false
    },
    "expected": {
      "result": -2,
      "error": null
    },
    "isHidden": true
  },
  {
    "id": "h2",
    "description": "Large",
    "input": {
      "a": 100,
      "b": 200,
      "shouldError": false
    },
    "expected": {
      "result": 300,
      "error": null
    },
    "isHidden": true
  },
  {
    "id": "h3",
    "description": "Error always rejects",
    "input": {
      "a": 99,
      "b": 1,
      "shouldError": true
    },
    "expected": {
      "result": null,
      "error": "fail"
    },
    "isHidden": true
  }
],
};
