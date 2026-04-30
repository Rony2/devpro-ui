export const problem = {
  slug: "array-prototype-flat-map",  category: "js-75",
  title: "Array.prototype.flatMap",
  difficulty: "easy",
  type: "coding",
  topics: ["JavaScript","Arrays","Prototypes"],
  companies: ["Google","Meta","Amazon"],
  estimatedMinutes: 10,
  published: true,
  addedAt: "2026-04-01",
  description: "Implement the Array.prototype.flatMap() method.",
  problemMdx: "## Overview\n\nImplement `flatMap(array, callback)` that maps each element through `callback` and flattens one level.\n\n## Examples\n\n```js\nflatMap([1,2,3], x => [x, x * 2]); // [1,2,2,4,3,6]\nflatMap([[1],[2]], x => x); // [1,2]\n```\n\n## Solution\n\n<details>\n<summary>Reveal solution</summary>\n\n\`\`\`js\nfunction flatMap(array, callback) {\n  const result = [];\n  for (let i = 0; i < array.length; i++) {\n    const val = callback(array[i], i, array);\n    if (Array.isArray(val)) result.push(...val);\n    else result.push(val);\n  }\n  return result;\n}\n\`\`\`\n\n</details>",
  starterCode: "/**\n * Flat map an array.\n * @param {Array} array\n * @param {Function} callback\n * @returns {Array}\n */\nfunction flatMap(array, callback) {\n  // your implementation\n}",
  solution: "function flatMap(array, callback) {\n  const result = [];\n  for (let i = 0; i < array.length; i++) {\n    const val = callback(array[i], i, array);\n    if (Array.isArray(val)) result.push(...val);\n    else result.push(val);\n  }\n  return result;\n}",
  harness: "\nfunction solve(input) {\n  const fn = input.op === 'dup' ? x => [x, x * 2]\n    : input.op === 'identity' ? x => x\n    : x => x > input.threshold ? [x] : [];\n  return flatMap(input.array, fn);\n}",
  tests: [
  {
    "id": "dup",
    "description": "Duplicate and double",
    "input": {
      "array": [
        1,
        2,
        3
      ],
      "op": "dup"
    },
    "expected": [
      1,
      2,
      2,
      4,
      3,
      6
    ],
    "isHidden": false
  },
  {
    "id": "identity",
    "description": "Flatten nested",
    "input": {
      "array": [
        [
          1
        ],
        [
          2
        ],
        [
          3
        ]
      ],
      "op": "identity"
    },
    "expected": [
      1,
      2,
      3
    ],
    "isHidden": false
  },
  {
    "id": "filter",
    "description": "Filter via flatMap",
    "input": {
      "array": [
        1,
        2,
        3,
        4,
        5
      ],
      "op": "filter",
      "threshold": 3
    },
    "expected": [
      4,
      5
    ],
    "isHidden": false
  },
  {
    "id": "h1",
    "description": "Empty",
    "input": {
      "array": [],
      "op": "dup"
    },
    "expected": [],
    "isHidden": true
  },
  {
    "id": "h2",
    "description": "Single",
    "input": {
      "array": [
        10
      ],
      "op": "dup"
    },
    "expected": [
      10,
      20
    ],
    "isHidden": true
  },
  {
    "id": "h3",
    "description": "All filtered",
    "input": {
      "array": [
        1,
        2
      ],
      "op": "filter",
      "threshold": 5
    },
    "expected": [],
    "isHidden": true
  }
],
};
