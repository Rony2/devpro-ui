export const problem = {
  slug: "once",  category: "js-75",
  title: "Once",
  difficulty: "easy",
  type: "coding",
  topics: ["JavaScript","Functions","Closures"],
  companies: ["Google","Meta","Amazon"],
  estimatedMinutes: 10,
  published: true,
  addedAt: "2026-04-01",
  description: "Implement a function that restricts a callback's invocation to at most once.",
  problemMdx: "## Overview\n\nImplement `once(fn)` — returns a function that calls `fn` at most once. Subsequent calls return the first result.\n\n## Examples\n\n```js\nconst add = once((a, b) => a + b);\nadd(1, 2); // 3\nadd(3, 4); // 3\n```\n\n## Solution\n\n<details>\n<summary>Reveal solution</summary>\n\n\`\`\`js\nfunction once(fn) {\n  let called = false, result;\n  return function(...args) {\n    if (!called) { called = true; result = fn.apply(this, args); }\n    return result;\n  };\n}\n\`\`\`\n\n</details>",
  starterCode: "/**\n * Create a function that can only be called once.\n * @param {Function} fn\n * @returns {Function}\n */\nfunction once(fn) {\n  // your implementation\n}",
  solution: "function once(fn) {\n  let called = false, result;\n  return function(...args) {\n    if (!called) { called = true; result = fn.apply(this, args); }\n    return result;\n  };\n}",
  harness: "\nfunction solve(input) {\n  const fn = once((...args) => args.reduce((a,b) => a + b, 0));\n  return input.callArgs.map(args => fn(...args));\n}",
  tests: [
  {
    "id": "basic",
    "description": "Two calls",
    "input": {
      "callArgs": [
        [
          1,
          2
        ],
        [
          3,
          4
        ]
      ]
    },
    "expected": [
      3,
      3
    ],
    "isHidden": false
  },
  {
    "id": "single",
    "description": "One call",
    "input": {
      "callArgs": [
        [
          10
        ]
      ]
    },
    "expected": [
      10
    ],
    "isHidden": false
  },
  {
    "id": "three",
    "description": "Three calls",
    "input": {
      "callArgs": [
        [
          5,
          5
        ],
        [
          1
        ],
        [
          100
        ]
      ]
    },
    "expected": [
      10,
      10,
      10
    ],
    "isHidden": false
  },
  {
    "id": "h1",
    "description": "No args",
    "input": {
      "callArgs": [
        [],
        [
          1,
          2
        ]
      ]
    },
    "expected": [
      0,
      0
    ],
    "isHidden": true
  },
  {
    "id": "h2",
    "description": "Five calls",
    "input": {
      "callArgs": [
        [
          7
        ],
        [
          8
        ],
        [
          9
        ],
        [
          10
        ],
        [
          11
        ]
      ]
    },
    "expected": [
      7,
      7,
      7,
      7,
      7
    ],
    "isHidden": true
  },
  {
    "id": "h3",
    "description": "Negatives",
    "input": {
      "callArgs": [
        [
          -3,
          -4
        ],
        [
          1,
          2
        ]
      ]
    },
    "expected": [
      -7,
      -7
    ],
    "isHidden": true
  }
],
};
