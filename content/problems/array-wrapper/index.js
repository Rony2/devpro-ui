export const problem = {
  slug: "array-wrapper",  category: "js-75",
  title: "Array Wrapper",
  difficulty: "easy",
  type: "coding",
  topics: ["JavaScript","Classes","Prototypes"],
  companies: ["Google","Meta","Amazon"],
  estimatedMinutes: 10,
  published: true,
  addedAt: "2026-04-01",
  description: "Implement a class that wraps an array and supports valueOf for addition and toString.",
  problemMdx: "## Overview\n\nImplement `ArrayWrapper` class:\n- `valueOf()` returns the sum of elements\n- `toString()` returns the elements as `[1,2,3]` string\n- Adding two wrappers sums their internal arrays\n\n## Examples\n\n```js\nconst a = new ArrayWrapper([1,2]);\nconst b = new ArrayWrapper([3,4]);\na + b; // 10\nString(a); // '[1,2]'\n```\n\n## Solution\n\n<details>\n<summary>Reveal solution</summary>\n\n\`\`\`js\nclass ArrayWrapper {\n  constructor(nums) { this.nums = nums; }\n  valueOf() { return this.nums.reduce((a, b) => a + b, 0); }\n  toString() { return '[' + this.nums.join(',') + ']'; }\n}\n\`\`\`\n\n</details>",
  starterCode: "/**\n * Array Wrapper class.\n */\nclass ArrayWrapper {\n  constructor(nums) {\n    // your implementation\n  }\n  valueOf() { /* ... */ }\n  toString() { /* ... */ }\n}",
  solution: "class ArrayWrapper {\n  constructor(nums) { this.nums = nums; }\n  valueOf() { return this.nums.reduce((a, b) => a + b, 0); }\n  toString() { return '[' + this.nums.join(',') + ']'; }\n}",
  harness: "\nfunction solve(input) {\n  if (input.op === 'add') {\n    const a = new ArrayWrapper(input.a);\n    const b = new ArrayWrapper(input.b);\n    return a + b;\n  }\n  if (input.op === 'str') {\n    return String(new ArrayWrapper(input.a));\n  }\n  return new ArrayWrapper(input.a).valueOf();\n}",
  tests: [
  {
    "id": "add",
    "description": "Add two wrappers",
    "input": {
      "op": "add",
      "a": [
        1,
        2
      ],
      "b": [
        3,
        4
      ]
    },
    "expected": 10,
    "isHidden": false
  },
  {
    "id": "str",
    "description": "ToString",
    "input": {
      "op": "str",
      "a": [
        1,
        2,
        3
      ]
    },
    "expected": "[1,2,3]",
    "isHidden": false
  },
  {
    "id": "valueOf",
    "description": "ValueOf",
    "input": {
      "op": "valueOf",
      "a": [
        5,
        10,
        15
      ]
    },
    "expected": 30,
    "isHidden": false
  },
  {
    "id": "h1",
    "description": "Empty arrays add",
    "input": {
      "op": "add",
      "a": [],
      "b": []
    },
    "expected": 0,
    "isHidden": true
  },
  {
    "id": "h2",
    "description": "Single element",
    "input": {
      "op": "str",
      "a": [
        42
      ]
    },
    "expected": "[42]",
    "isHidden": true
  },
  {
    "id": "h3",
    "description": "Negative sum",
    "input": {
      "op": "valueOf",
      "a": [
        -1,
        -2,
        -3
      ]
    },
    "expected": -6,
    "isHidden": true
  }
],
};
