export const problem = {
  slug: "compose",  category: "js-75",
  title: "Compose",
  difficulty: "easy",
  type: "coding",
  topics: ["JavaScript","Functions","Functional Programming"],
  companies: ["Google","Meta","Amazon"],
  estimatedMinutes: 10,
  published: true,
  addedAt: "2026-04-01",
  description: "Implement a function that takes multiple functions and returns a new function applying them right to left.",
  problemMdx: "## Overview\n\nImplement `compose(...fns)` that returns a function applying functions from right to left.\n\n## Constraints\n\n- Each function takes and returns one value.\n- No functions = identity.\n\n## Examples\n\n```js\ncompose(x => x + 1, x => x * 2)(3); // 7\n```\n\n## Solution\n\n<details>\n<summary>Reveal solution</summary>\n\n\`\`\`js\nfunction compose(...fns) {\n  return function(x) {\n    return fns.reduceRight((acc, fn) => fn(acc), x);\n  };\n}\n\`\`\`\n\n</details>",
  starterCode: "/**\n * Compose functions right to left.\n * @param {...Function} fns\n * @returns {Function}\n */\nfunction compose(...fns) {\n  // your implementation\n}",
  solution: "function compose(...fns) {\n  return function(x) {\n    return fns.reduceRight((acc, fn) => fn(acc), x);\n  };\n}",
  harness: "\nfunction solve(input) {\n  const ops = input.ops.map(op => {\n    if (op.type === 'add') return x => x + op.value;\n    if (op.type === 'mul') return x => x * op.value;\n    return x => x;\n  });\n  return compose(...ops)(input.value);\n}",
  tests: [
  {
    "id": "add-mul",
    "description": "Add after multiply",
    "input": {
      "ops": [
        {
          "type": "add",
          "value": 1
        },
        {
          "type": "mul",
          "value": 2
        }
      ],
      "value": 3
    },
    "expected": 7,
    "isHidden": false
  },
  {
    "id": "triple",
    "description": "Three functions",
    "input": {
      "ops": [
        {
          "type": "add",
          "value": 10
        },
        {
          "type": "mul",
          "value": 3
        },
        {
          "type": "add",
          "value": 1
        }
      ],
      "value": 2
    },
    "expected": 19,
    "isHidden": false
  },
  {
    "id": "single",
    "description": "Single function",
    "input": {
      "ops": [
        {
          "type": "mul",
          "value": 5
        }
      ],
      "value": 4
    },
    "expected": 20,
    "isHidden": false
  },
  {
    "id": "h1",
    "description": "Empty (identity)",
    "input": {
      "ops": [],
      "value": 42
    },
    "expected": 42,
    "isHidden": true
  },
  {
    "id": "h2",
    "description": "Multiply by zero",
    "input": {
      "ops": [
        {
          "type": "add",
          "value": 100
        },
        {
          "type": "mul",
          "value": 0
        }
      ],
      "value": 5
    },
    "expected": 100,
    "isHidden": true
  },
  {
    "id": "h3",
    "description": "Negatives",
    "input": {
      "ops": [
        {
          "type": "mul",
          "value": -1
        },
        {
          "type": "add",
          "value": -3
        }
      ],
      "value": 10
    },
    "expected": -7,
    "isHidden": true
  }
],
};
