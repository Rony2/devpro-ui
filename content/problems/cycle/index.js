export const problem = {
  slug: "cycle",  category: "js-75",
  title: "Cycle",
  difficulty: "easy",
  type: "coding",
  topics: ["JavaScript","Closures","Functions"],
  companies: ["Google","Meta","Amazon"],
  estimatedMinutes: 10,
  published: true,
  addedAt: "2026-04-01",
  description: "Implement a function that cycles through values on each call.",
  problemMdx: "## Overview\n\nImplement `cycle(...values)` — returns a function that cycles through the values.\n\n## Examples\n\n```js\nconst next = cycle('a','b','c');\nnext(); // 'a'\nnext(); // 'b'\nnext(); // 'c'\nnext(); // 'a'\n```\n\n## Solution\n\n<details>\n<summary>Reveal solution</summary>\n\n\`\`\`js\nfunction cycle(...values) {\n  let i = 0;\n  return function() {\n    const v = values[i];\n    i = (i + 1) % values.length;\n    return v;\n  };\n}\n\`\`\`\n\n</details>",
  starterCode: "/**\n * Create a cycling function.\n * @param {...*} values\n * @returns {Function}\n */\nfunction cycle(...values) {\n  // your implementation\n}",
  solution: "function cycle(...values) {\n  let i = 0;\n  return function() {\n    const v = values[i];\n    i = (i + 1) % values.length;\n    return v;\n  };\n}",
  harness: "\nfunction solve(input) {\n  const fn = cycle(...input.values);\n  const r = [];\n  for (let i = 0; i < input.calls; i++) r.push(fn());\n  return r;\n}",
  tests: [
  {
    "id": "three",
    "description": "Three values",
    "input": {
      "values": [
        "a",
        "b",
        "c"
      ],
      "calls": 5
    },
    "expected": [
      "a",
      "b",
      "c",
      "a",
      "b"
    ],
    "isHidden": false
  },
  {
    "id": "two",
    "description": "Two values",
    "input": {
      "values": [
        1,
        2
      ],
      "calls": 4
    },
    "expected": [
      1,
      2,
      1,
      2
    ],
    "isHidden": false
  },
  {
    "id": "single",
    "description": "Single",
    "input": {
      "values": [
        42
      ],
      "calls": 3
    },
    "expected": [
      42,
      42,
      42
    ],
    "isHidden": false
  },
  {
    "id": "h1",
    "description": "Booleans",
    "input": {
      "values": [
        true,
        false
      ],
      "calls": 5
    },
    "expected": [
      true,
      false,
      true,
      false,
      true
    ],
    "isHidden": true
  },
  {
    "id": "h2",
    "description": "Exact wrap",
    "input": {
      "values": [
        "x",
        "y",
        "z"
      ],
      "calls": 6
    },
    "expected": [
      "x",
      "y",
      "z",
      "x",
      "y",
      "z"
    ],
    "isHidden": true
  },
  {
    "id": "h3",
    "description": "Mixed",
    "input": {
      "values": [
        1,
        "a",
        null
      ],
      "calls": 4
    },
    "expected": [
      1,
      "a",
      null,
      1
    ],
    "isHidden": true
  }
],
};
