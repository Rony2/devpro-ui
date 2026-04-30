export const problem = {
  slug: "pipe",  category: "js-75",
  title: "Pipe",
  difficulty: "easy",
  type: "coding",
  topics: ["JavaScript","Functions","Composition"],
  companies: ["Google","Meta","Amazon"],
  estimatedMinutes: 10,
  published: true,
  addedAt: "2026-04-01",
  description: "Implement a pipe function that composes functions left to right.",
  problemMdx: "## Overview\n\nImplement `pipe(fns)` that returns a function composing all functions left-to-right.\n\n## Examples\n\n```js\nconst transform = pipe([x => x + 1, x => x * 2]);\ntransform(5); // 12\n```\n\n## Solution\n\n<details>\n<summary>Reveal solution</summary>\n\n\`\`\`js\nfunction pipe(fns) {\n  return function(input) {\n    return fns.reduce((acc, fn) => fn(acc), input);\n  };\n}\n\`\`\`\n\n</details>",
  starterCode: "/**\n * Pipe functions left to right.\n * @param {Function[]} fns\n * @returns {Function}\n */\nfunction pipe(fns) {\n  // your implementation\n}",
  solution: "function pipe(fns) {\n  return function(input) {\n    return fns.reduce((acc, fn) => fn(acc), input);\n  };\n}",
  harness: "\nfunction solve(input) {\n  const fns = input.ops.map(op => {\n    if (op.type === 'add') return x => x + op.value;\n    if (op.type === 'mul') return x => x * op.value;\n    return x => x - op.value;\n  });\n  return pipe(fns)(input.initial);\n}",
  tests: [
  {
    "id": "add-mul",
    "description": "Add then multiply",
    "input": {
      "initial": 5,
      "ops": [
        {
          "type": "add",
          "value": 1
        },
        {
          "type": "mul",
          "value": 2
        }
      ]
    },
    "expected": 12,
    "isHidden": false
  },
  {
    "id": "three",
    "description": "Three operations",
    "input": {
      "initial": 10,
      "ops": [
        {
          "type": "mul",
          "value": 2
        },
        {
          "type": "sub",
          "value": 5
        },
        {
          "type": "add",
          "value": 3
        }
      ]
    },
    "expected": 18,
    "isHidden": false
  },
  {
    "id": "identity",
    "description": "No functions",
    "input": {
      "initial": 42,
      "ops": []
    },
    "expected": 42,
    "isHidden": false
  },
  {
    "id": "h1",
    "description": "Single fn",
    "input": {
      "initial": 7,
      "ops": [
        {
          "type": "mul",
          "value": 3
        }
      ]
    },
    "expected": 21,
    "isHidden": true
  },
  {
    "id": "h2",
    "description": "Subtract",
    "input": {
      "initial": 100,
      "ops": [
        {
          "type": "sub",
          "value": 50
        },
        {
          "type": "sub",
          "value": 25
        }
      ]
    },
    "expected": 25,
    "isHidden": true
  },
  {
    "id": "h3",
    "description": "Complex chain",
    "input": {
      "initial": 1,
      "ops": [
        {
          "type": "add",
          "value": 1
        },
        {
          "type": "mul",
          "value": 3
        },
        {
          "type": "sub",
          "value": 1
        },
        {
          "type": "mul",
          "value": 2
        }
      ]
    },
    "expected": 10,
    "isHidden": true
  }
],
};
