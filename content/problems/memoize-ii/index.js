export const problem = {
  slug: "memoize-ii",  category: "js-75",
  title: "Memoize II",
  difficulty: "medium",
  type: "coding",
  topics: ["JavaScript","Functions","Caching"],
  companies: ["Meta","Google","Stripe"],
  estimatedMinutes: 25,
  published: true,
  addedAt: "2026-04-01",
  description: "Implement memoize that supports multiple arguments and any argument type.",
  problemMdx: "## Overview\n\nImplement `memoize(fn)` that caches results across any number of arguments. Must distinguish different argument combinations correctly.\n\n## Constraints\n\n- Support any number of arguments\n- Correctly distinguish `[1, 2]` from `[1]` and `[2]`\n- Use a trie-like cache structure or composite keys\n\n## Examples\n\n```js\nconst add = memoize((a, b) => a + b);\nadd(1, 2); // 3 (computed)\nadd(1, 2); // 3 (cached)\nadd(2, 1); // 3 (computed — different args)\n```\n\n## Solution\n\n<details>\n<summary>Reveal solution</summary>\n\n\`\`\`js\nfunction memoize(fn) {\n  const cache = new Map();\n  return function(...args) {\n    let node = cache;\n    for (const arg of args) {\n      if (!node.has(arg)) node.set(arg, new Map());\n      node = node.get(arg);\n    }\n    if (node.has('__result__')) return node.get('__result__');\n    const result = fn(...args);\n    node.set('__result__', result);\n    return result;\n  };\n}\n\`\`\`\n\n</details>",
  starterCode: "/**\n * Memoize with support for multiple arguments.\n * @param {Function} fn\n * @returns {Function}\n */\nfunction memoize(fn) {\n  // your implementation\n}",
  solution: "function memoize(fn) {\n  const cache = new Map();\n  return function(...args) {\n    let node = cache;\n    for (const arg of args) {\n      if (!node.has(arg)) node.set(arg, new Map());\n      node = node.get(arg);\n    }\n    if (node.has('__result__')) return node.get('__result__');\n    const result = fn(...args);\n    node.set('__result__', result);\n    return result;\n  };\n}",
  harness: "\nfunction solve(input) {\n  let callCount = 0;\n  const fn = memoize((...args) => { callCount++; return args.reduce((a,b) => a + b, 0); });\n  const results = input.calls.map(args => fn(...args));\n  return { results, callCount };\n}",
  tests: [
  {
    "id": "basic",
    "description": "Two-arg memoize",
    "input": {
      "calls": [
        [
          1,
          2
        ],
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
    "expected": {
      "results": [
        3,
        3,
        7
      ],
      "callCount": 2
    },
    "isHidden": false
  },
  {
    "id": "single-arg",
    "description": "Single arg",
    "input": {
      "calls": [
        [
          5
        ],
        [
          5
        ],
        [
          10
        ]
      ]
    },
    "expected": {
      "results": [
        5,
        5,
        10
      ],
      "callCount": 2
    },
    "isHidden": false
  },
  {
    "id": "three-arg",
    "description": "Three args",
    "input": {
      "calls": [
        [
          1,
          2,
          3
        ],
        [
          1,
          2,
          3
        ],
        [
          1,
          2,
          4
        ]
      ]
    },
    "expected": {
      "results": [
        6,
        6,
        7
      ],
      "callCount": 2
    },
    "isHidden": false
  },
  {
    "id": "h1",
    "description": "Reverse args",
    "input": {
      "calls": [
        [
          1,
          2
        ],
        [
          2,
          1
        ]
      ]
    },
    "expected": {
      "results": [
        3,
        3
      ],
      "callCount": 2
    },
    "isHidden": true
  },
  {
    "id": "h2",
    "description": "No args",
    "input": {
      "calls": [
        [],
        []
      ]
    },
    "expected": {
      "results": [
        0,
        0
      ],
      "callCount": 1
    },
    "isHidden": true
  },
  {
    "id": "h3",
    "description": "All unique",
    "input": {
      "calls": [
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
    "expected": {
      "results": [
        1,
        2,
        3
      ],
      "callCount": 3
    },
    "isHidden": true
  }
],
};
