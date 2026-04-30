export const problem = {
  slug: "array-prototype-filter",  category: "js-75",
  title: "Array.prototype.filter",
  difficulty: "easy",
  type: "coding",
  topics: ["JavaScript","Arrays","Prototypes"],
  companies: ["Google","Meta","Amazon"],
  estimatedMinutes: 10,
  published: true,
  addedAt: "2026-04-01",
  description: "Implement the Array.prototype.filter() method.",
  problemMdx: "## Overview\n\nImplement `filter(array, callback)` that returns a new array of elements for which `callback` returns truthy.\n\n## Examples\n\n```js\nfilter([1,2,3,4], x => x > 2); // [3,4]\n```\n\n## Solution\n\n<details>\n<summary>Reveal solution</summary>\n\n\`\`\`js\nfunction filter(array, callback) {\n  const r = [];\n  for (let i = 0; i < array.length; i++) {\n    if (callback(array[i], i, array)) r.push(array[i]);\n  }\n  return r;\n}\n\`\`\`\n\n</details>",
  starterCode: "/**\n * Filter array elements by predicate.\n * @param {Array} array\n * @param {Function} callback\n * @returns {Array}\n */\nfunction filter(array, callback) {\n  // your implementation\n}",
  solution: "function filter(array, callback) {\n  const r = [];\n  for (let i = 0; i < array.length; i++) {\n    if (callback(array[i], i, array)) r.push(array[i]);\n  }\n  return r;\n}",
  harness: "\nfunction solve(input) {\n  return filter(input.array, x => input.op === 'gt' ? x > input.threshold : input.op === 'even' ? x % 2 === 0 : Boolean(x));\n}",
  tests: [
  {
    "id": "gt",
    "description": "Greater than 2",
    "input": {
      "array": [
        1,
        2,
        3,
        4
      ],
      "op": "gt",
      "threshold": 2
    },
    "expected": [
      3,
      4
    ],
    "isHidden": false
  },
  {
    "id": "even",
    "description": "Even numbers",
    "input": {
      "array": [
        1,
        2,
        3,
        4,
        5,
        6
      ],
      "op": "even"
    },
    "expected": [
      2,
      4,
      6
    ],
    "isHidden": false
  },
  {
    "id": "truthy",
    "description": "Truthy values",
    "input": {
      "array": [
        0,
        1,
        false,
        2,
        "",
        3
      ],
      "op": "truthy"
    },
    "expected": [
      1,
      2,
      3
    ],
    "isHidden": false
  },
  {
    "id": "h1",
    "description": "None pass",
    "input": {
      "array": [
        1,
        2
      ],
      "op": "gt",
      "threshold": 5
    },
    "expected": [],
    "isHidden": true
  },
  {
    "id": "h2",
    "description": "All pass",
    "input": {
      "array": [
        5,
        6,
        7
      ],
      "op": "gt",
      "threshold": 2
    },
    "expected": [
      5,
      6,
      7
    ],
    "isHidden": true
  },
  {
    "id": "h3",
    "description": "Empty array",
    "input": {
      "array": [],
      "op": "even"
    },
    "expected": [],
    "isHidden": true
  }
],
};
