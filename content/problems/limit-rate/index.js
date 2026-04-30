export const problem = {
  slug: "limit-rate",  category: "js-75",
  title: "Limit Rate",
  difficulty: "medium",
  type: "coding",
  topics: ["JavaScript","Functions","Concurrency"],
  companies: ["Stripe","Google","Amazon"],
  estimatedMinutes: 25,
  published: true,
  addedAt: "2026-04-01",
  description: "Implement a rate limiter that ensures a function is called at most N times per interval.",
  problemMdx: "## Overview\n\nImplement `limitRate(fn, maxCalls, interval)` that limits `fn` to at most `maxCalls` invocations per `interval` ms. Extra calls are queued.\n\n## Examples\n\n```js\nconst limited = limitRate(apiFetch, 3, 1000);\n// At most 3 calls per second, rest queued\n```\n\n## Solution\n\n<details>\n<summary>Reveal solution</summary>\n\n\`\`\`js\nfunction limitRate(fn, maxCalls, interval) {\n  const queue = [];\n  let calls = 0;\n  let timer = null;\n  function process() {\n    while (calls < maxCalls && queue.length > 0) {\n      calls++;\n      const { args, resolve } = queue.shift();\n      resolve(fn(...args));\n    }\n    if (!timer && calls > 0) {\n      timer = setTimeout(() => { calls = 0; timer = null; process(); }, interval);\n    }\n  }\n  return function(...args) {\n    return new Promise(resolve => { queue.push({ args, resolve }); process(); });\n  };\n}\n\`\`\`\n\n</details>",
  starterCode: "/**\n * Rate limit a function.\n * @param {Function} fn\n * @param {number} maxCalls\n * @param {number} interval\n * @returns {Function}\n */\nfunction limitRate(fn, maxCalls, interval) {\n  // your implementation\n}",
  solution: "function limitRate(fn, maxCalls, interval) {\n  const queue = [];\n  let calls = 0;\n  let timer = null;\n  function process() {\n    while (calls < maxCalls && queue.length > 0) {\n      calls++;\n      const { args, resolve } = queue.shift();\n      resolve(fn(...args));\n    }\n    if (!timer && calls > 0) {\n      timer = setTimeout(() => { calls = 0; timer = null; process(); }, interval);\n    }\n  }\n  return function(...args) {\n    return new Promise(resolve => { queue.push({ args, resolve }); process(); });\n  };\n}",
  harness: "\nasync function solve(input) {\n  let callLog = [];\n  const limited = limitRate((...args) => {\n    callLog.push(Date.now());\n    return args[0];\n  }, input.maxCalls, input.interval);\n  const promises = input.args.map(a => limited(a));\n  const results = await Promise.all(promises);\n  const withinFirst = callLog.filter(t => t - callLog[0] < input.interval).length;\n  return { results, immediateCount: Math.min(withinFirst, input.maxCalls) };\n}",
  tests: [
  {
    "id": "within-limit",
    "description": "All within limit",
    "input": {
      "args": [
        1,
        2
      ],
      "maxCalls": 5,
      "interval": 100
    },
    "expected": {
      "results": [
        1,
        2
      ],
      "immediateCount": 2
    },
    "isHidden": false
  },
  {
    "id": "at-limit",
    "description": "At limit",
    "input": {
      "args": [
        1,
        2,
        3
      ],
      "maxCalls": 3,
      "interval": 100
    },
    "expected": {
      "results": [
        1,
        2,
        3
      ],
      "immediateCount": 3
    },
    "isHidden": false
  },
  {
    "id": "over-limit",
    "description": "Over limit queues",
    "input": {
      "args": [
        1,
        2,
        3,
        4,
        5
      ],
      "maxCalls": 2,
      "interval": 100
    },
    "expected": {
      "results": [
        1,
        2,
        3,
        4,
        5
      ],
      "immediateCount": 2
    },
    "isHidden": false
  },
  {
    "id": "h1",
    "description": "Single call",
    "input": {
      "args": [
        42
      ],
      "maxCalls": 1,
      "interval": 100
    },
    "expected": {
      "results": [
        42
      ],
      "immediateCount": 1
    },
    "isHidden": true
  },
  {
    "id": "h2",
    "description": "Max 1 per interval",
    "input": {
      "args": [
        1,
        2,
        3
      ],
      "maxCalls": 1,
      "interval": 50
    },
    "expected": {
      "results": [
        1,
        2,
        3
      ],
      "immediateCount": 1
    },
    "isHidden": true
  },
  {
    "id": "h3",
    "description": "All immediate",
    "input": {
      "args": [
        1,
        2,
        3,
        4
      ],
      "maxCalls": 10,
      "interval": 100
    },
    "expected": {
      "results": [
        1,
        2,
        3,
        4
      ],
      "immediateCount": 4
    },
    "isHidden": true
  }
],
};
