export const problem = {
  slug: "throttle",  category: "js-75",
  title: "Throttle",
  difficulty: "medium",
  type: "coding",
  topics: ["JavaScript","Functions","Timing"],
  companies: ["Meta","Vercel","Stripe"],
  estimatedMinutes: 25,
  published: true,
  addedAt: "2026-04-01",
  description: "Implement a throttle function that limits how frequently a function can be called.",
  problemMdx: "## Overview\n\nImplement `throttle(fn, delay)` — returns a throttled function that invokes `fn` at most once per `delay` ms. The first call fires immediately.\n\n## Constraints\n\n- First invocation fires immediately\n- Subsequent calls during cooldown are ignored\n- Uses leading-edge throttling\n\n## Solution\n\n<details>\n<summary>Reveal solution</summary>\n\n\`\`\`js\nfunction throttle(fn, delay) {\n  let lastTime = 0;\n  return function(...args) {\n    const now = Date.now();\n    if (now - lastTime >= delay) {\n      lastTime = now;\n      return fn.apply(this, args);\n    }\n  };\n}\n\`\`\`\n\n</details>",
  starterCode: "/**\n * Throttle a function.\n * @param {Function} fn\n * @param {number} delay\n * @returns {Function}\n */\nfunction throttle(fn, delay) {\n  // your implementation\n}",
  solution: "function throttle(fn, delay) {\n  let lastTime = 0;\n  return function(...args) {\n    const now = Date.now();\n    if (now - lastTime >= delay) {\n      lastTime = now;\n      return fn.apply(this, args);\n    }\n  };\n}",
  harness: "\nasync function solve(input) {\n  let count = 0;\n  const throttled = throttle(() => { count++; }, input.delay);\n  for (const t of input.callTimes) {\n    await new Promise(r => setTimeout(r, t));\n    throttled();\n  }\n  return count;\n}",
  tests: [
  {
    "id": "basic",
    "description": "3 rapid calls -> 1",
    "input": {
      "delay": 100,
      "callTimes": [
        0,
        10,
        20
      ]
    },
    "expected": 1,
    "isHidden": false
  },
  {
    "id": "spaced",
    "description": "Spaced calls all fire",
    "input": {
      "delay": 50,
      "callTimes": [
        0,
        60,
        120
      ]
    },
    "expected": 3,
    "isHidden": false
  },
  {
    "id": "two-bursts",
    "description": "Two bursts",
    "input": {
      "delay": 100,
      "callTimes": [
        0,
        10,
        20,
        150,
        160
      ]
    },
    "expected": 2,
    "isHidden": false
  },
  {
    "id": "h1",
    "description": "Single call",
    "input": {
      "delay": 100,
      "callTimes": [
        0
      ]
    },
    "expected": 1,
    "isHidden": true
  },
  {
    "id": "h2",
    "description": "All within window",
    "input": {
      "delay": 200,
      "callTimes": [
        0,
        50,
        100,
        150
      ]
    },
    "expected": 1,
    "isHidden": true
  },
  {
    "id": "h3",
    "description": "Exact boundary",
    "input": {
      "delay": 100,
      "callTimes": [
        0,
        100,
        200
      ]
    },
    "expected": 3,
    "isHidden": true
  }
],
};
