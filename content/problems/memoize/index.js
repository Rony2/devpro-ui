export const problem = {
  slug: "memoize",  category: "js-75",
  title: "Memoize",
  difficulty: "medium",
  type: "coding",
  topics: ["JavaScript","Functions","Caching"],
  companies: ["Meta","Google","Stripe"],
  estimatedMinutes: 25,
  published: true,
  addedAt: "2026-04-01",
  description: "Implement a memoize function that caches function results.",
  problemMdx: "## Overview\n\nImplement `memoize(fn)` that returns a function caching results based on the first argument.\n\n## Constraints\n\n- Cache key is first argument (use it directly)\n- Return cached result if same key is called again\n\n## Examples\n\n```js\nconst double = memoize(x => x * 2);\ndouble(5); // 10 (computed)\ndouble(5); // 10 (cached)\n```\n\n## Solution\n\n<details>\n<summary>Reveal solution</summary>\n\n\`\`\`js\nfunction memoize(fn) {\n  const cache = new Map();\n  return function(arg) {\n    if (cache.has(arg)) return cache.get(arg);\n    const result = fn(arg);\n    cache.set(arg, result);\n    return result;\n  };\n}\n\`\`\`\n\n</details>",
  starterCode: "/**\n * Memoize a function.\n * @param {Function} fn\n * @returns {Function}\n */\nfunction memoize(fn) {\n  // your implementation\n}",
  solution: "function memoize(fn) {\n  const cache = new Map();\n  return function(arg) {\n    if (cache.has(arg)) return cache.get(arg);\n    const result = fn(arg);\n    cache.set(arg, result);\n    return result;\n  };\n}",
  harness: "\nfunction solve(input) {\n  let callCount = 0;\n  const fn = memoize(x => { callCount++; return x * input.multiplier; });\n  const results = input.calls.map(c => fn(c));\n  return { results, callCount };\n}",
  tests: [
  {
    "id": "basic",
    "description": "Caches repeated calls",
    "input": {
      "calls": [
        5,
        5,
        5
      ],
      "multiplier": 2
    },
    "expected": {
      "results": [
        10,
        10,
        10
      ],
      "callCount": 1
    },
    "isHidden": false
  },
  {
    "id": "diff-args",
    "description": "Different args",
    "input": {
      "calls": [
        1,
        2,
        3
      ],
      "multiplier": 10
    },
    "expected": {
      "results": [
        10,
        20,
        30
      ],
      "callCount": 3
    },
    "isHidden": false
  },
  {
    "id": "mixed",
    "description": "Mixed repeated",
    "input": {
      "calls": [
        1,
        2,
        1,
        2
      ],
      "multiplier": 3
    },
    "expected": {
      "results": [
        3,
        6,
        3,
        6
      ],
      "callCount": 2
    },
    "isHidden": false
  },
  {
    "id": "h1",
    "description": "Single call",
    "input": {
      "calls": [
        7
      ],
      "multiplier": 5
    },
    "expected": {
      "results": [
        35
      ],
      "callCount": 1
    },
    "isHidden": true
  },
  {
    "id": "h2",
    "description": "Zero arg",
    "input": {
      "calls": [
        0,
        0,
        1
      ],
      "multiplier": 10
    },
    "expected": {
      "results": [
        0,
        0,
        10
      ],
      "callCount": 2
    },
    "isHidden": true
  },
  {
    "id": "h3",
    "description": "Negative",
    "input": {
      "calls": [
        -1,
        -1,
        2
      ],
      "multiplier": 3
    },
    "expected": {
      "results": [
        -3,
        -3,
        6
      ],
      "callCount": 2
    },
    "isHidden": true
  }
],
};
