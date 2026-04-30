export const problem = {
  slug: "array-prototype-reduce",  category: "js-75",
  title: "Array.prototype.reduce",
  difficulty: "easy",
  type: "coding",
  topics: ["JavaScript","Arrays","Prototypes"],
  companies: ["Google","Meta","Amazon"],
  estimatedMinutes: 10,
  published: true,
  addedAt: "2026-04-01",
  description: "Implement the Array.prototype.reduce() method.",
  problemMdx: "## Overview\n\nImplement `reduce(array, callback, initialValue)` that reduces an array to a single value.\n\n## Constraints\n\n- `callback(accumulator, currentValue, index, array)`\n- If no `initialValue`, use first element as accumulator.\n\n## Examples\n\n```js\nreduce([1,2,3,4], (acc, v) => acc + v, 0); // 10\n```\n\n## Solution\n\n<details>\n<summary>Reveal solution</summary>\n\n\`\`\`js\nfunction reduce(array, callback, initialValue) {\n  let acc = initialValue !== undefined ? initialValue : array[0];\n  const start = initialValue !== undefined ? 0 : 1;\n  for (let i = start; i < array.length; i++) acc = callback(acc, array[i], i, array);\n  return acc;\n}\n\`\`\`\n\n</details>",
  starterCode: "/**\n * Reduce an array to a single value.\n * @param {Array} array\n * @param {Function} callback\n * @param {*} [initialValue]\n * @returns {*}\n */\nfunction reduce(array, callback, initialValue) {\n  // your implementation\n}",
  solution: "function reduce(array, callback, initialValue) {\n  let acc = initialValue !== undefined ? initialValue : array[0];\n  const start = initialValue !== undefined ? 0 : 1;\n  for (let i = start; i < array.length; i++) acc = callback(acc, array[i], i, array);\n  return acc;\n}",
  harness: "\nfunction solve(input) {\n  return reduce(input.array, (acc, v) => input.op === 'sum' ? acc + v : input.op === 'product' ? acc * v : acc + v, input.initial);\n}",
  tests: [
  {
    "id": "sum",
    "description": "Sum with initial",
    "input": {
      "array": [
        1,
        2,
        3,
        4
      ],
      "op": "sum",
      "initial": 0
    },
    "expected": 10,
    "isHidden": false
  },
  {
    "id": "product",
    "description": "Product",
    "input": {
      "array": [
        1,
        2,
        3,
        4
      ],
      "op": "product",
      "initial": 1
    },
    "expected": 24,
    "isHidden": false
  },
  {
    "id": "no-initial",
    "description": "No initial",
    "input": {
      "array": [
        1,
        2,
        3
      ],
      "op": "sum"
    },
    "expected": 6,
    "isHidden": false
  },
  {
    "id": "h1",
    "description": "Single element",
    "input": {
      "array": [
        5
      ],
      "op": "sum",
      "initial": 0
    },
    "expected": 5,
    "isHidden": true
  },
  {
    "id": "h2",
    "description": "String concat",
    "input": {
      "array": [
        10,
        20
      ],
      "op": "sum",
      "initial": 100
    },
    "expected": 130,
    "isHidden": true
  },
  {
    "id": "h3",
    "description": "Empty with initial",
    "input": {
      "array": [],
      "op": "sum",
      "initial": 42
    },
    "expected": 42,
    "isHidden": true
  }
],
};
