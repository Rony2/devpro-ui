export const problem = {
  slug: "curry",  category: "js-75",
  title: "Curry",
  difficulty: "medium",
  type: "coding",
  topics: ["JavaScript","Functions","Closures"],
  companies: ["Meta","Google","Stripe"],
  estimatedMinutes: 25,
  published: true,
  addedAt: "2026-04-01",
  description: "Implement a curry function that converts a multi-argument function into a chain of single-argument functions.",
  problemMdx: "## Overview\n\nImplement `curry(fn)` — returns a curried version that accumulates arguments until `fn.length` is reached.\n\n## Examples\n\n```js\nfunction add(a, b, c) { return a + b + c; }\nconst curried = curry(add);\ncurried(1)(2)(3); // 6\ncurried(1, 2)(3); // 6\ncurried(1)(2, 3); // 6\n```\n\n## Solution\n\n<details>\n<summary>Reveal solution</summary>\n\n\`\`\`js\nfunction curry(fn) {\n  return function curried(...args) {\n    if (args.length >= fn.length) return fn(...args);\n    return (...more) => curried(...args, ...more);\n  };\n}\n\`\`\`\n\n</details>",
  starterCode: "/**\n * Curry a function.\n * @param {Function} fn\n * @returns {Function}\n */\nfunction curry(fn) {\n  // your implementation\n}",
  solution: "function curry(fn) {\n  return function curried(...args) {\n    if (args.length >= fn.length) return fn(...args);\n    return (...more) => curried(...args, ...more);\n  };\n}",
  harness: "\nfunction solve(input) {\n  function add(a, b, c) { return a + b + c; }\n  const curried = curry(add);\n  const steps = input.steps;\n  let fn = curried;\n  for (const args of steps) fn = fn(...args);\n  return fn;\n}",
  tests: [
  {
    "id": "one-by-one",
    "description": "One arg at a time",
    "input": {
      "steps": [
        [
          1
        ],
        [
          2
        ],
        [
          3
        ]
      ]
    },
    "expected": 6,
    "isHidden": false
  },
  {
    "id": "two-one",
    "description": "Two then one",
    "input": {
      "steps": [
        [
          1,
          2
        ],
        [
          3
        ]
      ]
    },
    "expected": 6,
    "isHidden": false
  },
  {
    "id": "one-two",
    "description": "One then two",
    "input": {
      "steps": [
        [
          10
        ],
        [
          20,
          30
        ]
      ]
    },
    "expected": 60,
    "isHidden": false
  },
  {
    "id": "h1",
    "description": "All at once",
    "input": {
      "steps": [
        [
          4,
          5,
          6
        ]
      ]
    },
    "expected": 15,
    "isHidden": true
  },
  {
    "id": "h2",
    "description": "Negative numbers",
    "input": {
      "steps": [
        [
          -1
        ],
        [
          -2
        ],
        [
          -3
        ]
      ]
    },
    "expected": -6,
    "isHidden": true
  },
  {
    "id": "h3",
    "description": "Zeros",
    "input": {
      "steps": [
        [
          0
        ],
        [
          0
        ],
        [
          0
        ]
      ]
    },
    "expected": 0,
    "isHidden": true
  }
],
};
