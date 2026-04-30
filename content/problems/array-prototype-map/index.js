export const problem = {
  slug: "array-prototype-map",  category: "js-75",
  title: "Array.prototype.map",
  difficulty: "easy",
  type: "coding",
  topics: ["JavaScript","Arrays","Prototypes"],
  companies: ["Google","Meta","Amazon"],
  estimatedMinutes: 10,
  published: true,
  addedAt: "2026-04-01",
  description: "Implement the Array.prototype.map() method.",
  problemMdx: "## Overview\n\nImplement `map(array, callback)` that creates a new array with results of calling `callback(element, index, array)` on every element.\n\n## Examples\n\n```js\nmap([1,2,3], x => x * 2); // [2,4,6]\n```\n\n## Solution\n\n<details>\n<summary>Reveal solution</summary>\n\n\`\`\`js\nfunction map(array, callback) {\n  const r = [];\n  for (let i = 0; i < array.length; i++) r.push(callback(array[i], i, array));\n  return r;\n}\n\`\`\`\n\n</details>",
  starterCode: "/**\n * Map array elements through a callback.\n * @param {Array} array\n * @param {Function} callback\n * @returns {Array}\n */\nfunction map(array, callback) {\n  // your implementation\n}",
  solution: "function map(array, callback) {\n  const r = [];\n  for (let i = 0; i < array.length; i++) r.push(callback(array[i], i, array));\n  return r;\n}",
  harness: "\nfunction solve(input) {\n  return map(input.array, input.op === 'double' ? x => x * 2 : input.op === 'square' ? x => x * x : x => x + input.add);\n}",
  tests: [
  {
    "id": "double",
    "description": "Double",
    "input": {
      "array": [
        1,
        2,
        3
      ],
      "op": "double"
    },
    "expected": [
      2,
      4,
      6
    ],
    "isHidden": false
  },
  {
    "id": "square",
    "description": "Square",
    "input": {
      "array": [
        1,
        2,
        3,
        4
      ],
      "op": "square"
    },
    "expected": [
      1,
      4,
      9,
      16
    ],
    "isHidden": false
  },
  {
    "id": "add",
    "description": "Add constant",
    "input": {
      "array": [
        10,
        20
      ],
      "op": "add",
      "add": 5
    },
    "expected": [
      15,
      25
    ],
    "isHidden": false
  },
  {
    "id": "h1",
    "description": "Empty",
    "input": {
      "array": [],
      "op": "double"
    },
    "expected": [],
    "isHidden": true
  },
  {
    "id": "h2",
    "description": "Single",
    "input": {
      "array": [
        7
      ],
      "op": "square"
    },
    "expected": [
      49
    ],
    "isHidden": true
  },
  {
    "id": "h3",
    "description": "Negatives",
    "input": {
      "array": [
        -1,
        -2,
        -3
      ],
      "op": "double"
    },
    "expected": [
      -2,
      -4,
      -6
    ],
    "isHidden": true
  }
],
};
