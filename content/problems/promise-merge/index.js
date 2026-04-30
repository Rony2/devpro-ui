export const problem = {
  slug: "promise-merge",  category: "js-75",
  title: "Promise Merge",
  difficulty: "medium",
  type: "coding",
  topics: ["JavaScript","Promises","Caching"],
  companies: ["Google","Meta","Amazon"],
  estimatedMinutes: 25,
  published: true,
  addedAt: "2026-04-01",
  description: "Implement a function that deduplicates concurrent identical async calls.",
  problemMdx: "## Overview\n\nImplement `promiseMerge(fn)` that wraps an async function so concurrent calls with the same key share a single in-flight promise.\n\n## Examples\n\n```js\nconst fetch = promiseMerge(async (id) => api.get(id));\n// Two concurrent calls for same id share one request\nconst [a, b] = await Promise.all([fetch('1'), fetch('1')]); // only 1 call made\n```\n\n## Solution\n\n<details>\n<summary>Reveal solution</summary>\n\n\`\`\`js\nfunction promiseMerge(fn) {\n  const pending = new Map();\n  return function(key) {\n    if (pending.has(key)) return pending.get(key);\n    const promise = fn(key).finally(() => pending.delete(key));\n    pending.set(key, promise);\n    return promise;\n  };\n}\n\`\`\`\n\n</details>",
  starterCode: "/**\n * Merge concurrent identical async calls.\n * @param {Function} fn\n * @returns {Function}\n */\nfunction promiseMerge(fn) {\n  // your implementation\n}",
  solution: "function promiseMerge(fn) {\n  const pending = new Map();\n  return function(key) {\n    if (pending.has(key)) return pending.get(key);\n    const promise = fn(key).finally(() => pending.delete(key));\n    pending.set(key, promise);\n    return promise;\n  };\n}",
  harness: "\nasync function solve(input) {\n  let callCount = 0;\n  const fn = promiseMerge(async (key) => {\n    callCount++;\n    await new Promise(r => setTimeout(r, 50));\n    return key + '-result';\n  });\n  const calls = input.keys.map(k => fn(k));\n  const results = await Promise.all(calls);\n  return { results, callCount };\n}",
  tests: [
  {
    "id": "dedup",
    "description": "Dedup concurrent",
    "input": {
      "keys": [
        "a",
        "a",
        "a"
      ]
    },
    "expected": {
      "results": [
        "a-result",
        "a-result",
        "a-result"
      ],
      "callCount": 1
    },
    "isHidden": false
  },
  {
    "id": "diff-keys",
    "description": "Different keys",
    "input": {
      "keys": [
        "a",
        "b"
      ]
    },
    "expected": {
      "results": [
        "a-result",
        "b-result"
      ],
      "callCount": 2
    },
    "isHidden": false
  },
  {
    "id": "mixed",
    "description": "Mixed keys",
    "input": {
      "keys": [
        "x",
        "y",
        "x"
      ]
    },
    "expected": {
      "results": [
        "x-result",
        "y-result",
        "x-result"
      ],
      "callCount": 2
    },
    "isHidden": false
  },
  {
    "id": "h1",
    "description": "Single call",
    "input": {
      "keys": [
        "only"
      ]
    },
    "expected": {
      "results": [
        "only-result"
      ],
      "callCount": 1
    },
    "isHidden": true
  },
  {
    "id": "h2",
    "description": "All same",
    "input": {
      "keys": [
        "z",
        "z",
        "z",
        "z"
      ]
    },
    "expected": {
      "results": [
        "z-result",
        "z-result",
        "z-result",
        "z-result"
      ],
      "callCount": 1
    },
    "isHidden": true
  },
  {
    "id": "h3",
    "description": "All different",
    "input": {
      "keys": [
        "a",
        "b",
        "c"
      ]
    },
    "expected": {
      "results": [
        "a-result",
        "b-result",
        "c-result"
      ],
      "callCount": 3
    },
    "isHidden": true
  }
],
};
