export const problem = {
  slug: "curry-ii",  category: "js-75",
  title: "Curry II",
  difficulty: "hard",
  type: "coding",
  topics: ["JavaScript","Functions","Closures"],
  companies: ["Meta","Google","Stripe"],
  estimatedMinutes: 45,
  published: true,
  addedAt: "2026-04-01",
  description: "Implement curry for variadic functions with placeholder support.",
  problemMdx: "## Overview\n\nImplement `curry(fn)` supporting:\n- Placeholder `curry.placeholder` for skipping arguments\n- Variadic argument collection\n- Replaces placeholders left-to-right\n\n## Examples\n\n```js\nconst _ = curry.placeholder;\nconst add = curry((a,b,c) => a+b+c);\nadd(1)(2)(3); // 6\nadd(_,2)(1,3); // 6\nadd(1,_,3)(2); // 6\n```\n\n## Solution\n\n<details>\n<summary>Reveal solution</summary>\n\n\`\`\`js\nfunction curry(fn) {\n  const _ = curry.placeholder;\n  return function curried(...args) {\n    const complete = args.length >= fn.length && args.slice(0, fn.length).every(a => a !== _);\n    if (complete) return fn(...args);\n    return function(...next) {\n      const merged = [];\n      let ni = 0;\n      for (let i = 0; i < args.length; i++) {\n        if (args[i] === _ && ni < next.length) merged.push(next[ni++]);\n        else merged.push(args[i]);\n      }\n      while (ni < next.length) merged.push(next[ni++]);\n      return curried(...merged);\n    };\n  };\n}\ncurry.placeholder = Symbol('_');\n\`\`\`\n\n</details>",
  starterCode: "/**\n * Curry with placeholder support.\n * @param {Function} fn\n * @returns {Function}\n */\nfunction curry(fn) {\n  // your implementation\n}\ncurry.placeholder = Symbol('_');",
  solution: "function curry(fn) {\n  const _ = curry.placeholder;\n  return function curried(...args) {\n    const complete = args.length >= fn.length && args.slice(0, fn.length).every(a => a !== _);\n    if (complete) return fn(...args);\n    return function(...next) {\n      const merged = [];\n      let ni = 0;\n      for (let i = 0; i < args.length; i++) {\n        if (args[i] === _ && ni < next.length) merged.push(next[ni++]);\n        else merged.push(args[i]);\n      }\n      while (ni < next.length) merged.push(next[ni++]);\n      return curried(...merged);\n    };\n  };\n}\ncurry.placeholder = Symbol('_');",
  harness: "\nfunction solve(input) {\n  function add(a, b, c) { return a + b + c; }\n  const curried = curry(add);\n  const _ = curry.placeholder;\n  let fn = curried;\n  for (const step of input.steps) {\n    const args = step.map(v => v === '_' ? _ : v);\n    fn = fn(...args);\n  }\n  return fn;\n}",
  tests: [
  {
    "id": "basic",
    "description": "One at a time",
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
    "id": "placeholder",
    "description": "Placeholder skip",
    "input": {
      "steps": [
        [
          "_",
          2
        ],
        [
          1,
          3
        ]
      ]
    },
    "expected": 6,
    "isHidden": false
  },
  {
    "id": "mid-placeholder",
    "description": "Middle placeholder",
    "input": {
      "steps": [
        [
          1,
          "_",
          3
        ],
        [
          2
        ]
      ]
    },
    "expected": 6,
    "isHidden": false
  },
  {
    "id": "h1",
    "description": "All at once",
    "input": {
      "steps": [
        [
          10,
          20,
          30
        ]
      ]
    },
    "expected": 60,
    "isHidden": true
  },
  {
    "id": "h2",
    "description": "Two then one",
    "input": {
      "steps": [
        [
          5,
          5
        ],
        [
          5
        ]
      ]
    },
    "expected": 15,
    "isHidden": true
  },
  {
    "id": "h3",
    "description": "All placeholders",
    "input": {
      "steps": [
        [
          "_",
          "_",
          "_"
        ],
        [
          1,
          "_",
          3
        ],
        [
          2
        ]
      ]
    },
    "expected": 6,
    "isHidden": true
  }
],
};
