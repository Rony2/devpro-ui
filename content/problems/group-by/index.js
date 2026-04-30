export const problem = {
  slug: "group-by",  category: "js-75",
  title: "Group By",
  difficulty: "medium",
  type: "coding",
  topics: ["JavaScript","Arrays","Objects"],
  companies: ["Google","Meta","Amazon"],
  estimatedMinutes: 25,
  published: true,
  addedAt: "2026-04-01",
  description: "Implement a function that groups array elements by a key returned from an iteratee.",
  problemMdx: "## Overview\n\nImplement `groupBy(array, iteratee)` — groups elements into arrays keyed by the result of `iteratee`.\n\n## Examples\n\n```js\ngroupBy([6.1, 4.2, 6.3], Math.floor); // { '4': [4.2], '6': [6.1, 6.3] }\n```\n\n## Solution\n\n<details>\n<summary>Reveal solution</summary>\n\n\`\`\`js\nfunction groupBy(array, iteratee) {\n  const result = {};\n  for (const item of array) {\n    const key = String(iteratee(item));\n    if (!result[key]) result[key] = [];\n    result[key].push(item);\n  }\n  return result;\n}\n\`\`\`\n\n</details>",
  starterCode: "/**\n * Group array elements by iteratee.\n * @param {Array} array\n * @param {Function} iteratee\n * @returns {Object}\n */\nfunction groupBy(array, iteratee) {\n  // your implementation\n}",
  solution: "function groupBy(array, iteratee) {\n  const result = {};\n  for (const item of array) {\n    const key = String(iteratee(item));\n    if (!result[key]) result[key] = [];\n    result[key].push(item);\n  }\n  return result;\n}",
  harness: "\nfunction solve(input) {\n  const fn = input.fn === 'floor' ? Math.floor : input.fn === 'length' ? x => x.length : x => x % input.mod;\n  return groupBy(input.array, fn);\n}",
  tests: [
  {
    "id": "floor",
    "description": "Group by floor",
    "input": {
      "array": [
        6.1,
        4.2,
        6.3
      ],
      "fn": "floor"
    },
    "expected": {
      "4": [
        4.2
      ],
      "6": [
        6.1,
        6.3
      ]
    },
    "isHidden": false
  },
  {
    "id": "length",
    "description": "Group by length",
    "input": {
      "array": [
        "one",
        "two",
        "three"
      ],
      "fn": "length"
    },
    "expected": {
      "3": [
        "one",
        "two"
      ],
      "5": [
        "three"
      ]
    },
    "isHidden": false
  },
  {
    "id": "mod",
    "description": "Group by mod 3",
    "input": {
      "array": [
        1,
        2,
        3,
        4,
        5,
        6
      ],
      "fn": "mod",
      "mod": 3
    },
    "expected": {
      "0": [
        3,
        6
      ],
      "1": [
        1,
        4
      ],
      "2": [
        2,
        5
      ]
    },
    "isHidden": false
  },
  {
    "id": "h1",
    "description": "All same group",
    "input": {
      "array": [
        1.1,
        1.2,
        1.3
      ],
      "fn": "floor"
    },
    "expected": {
      "1": [
        1.1,
        1.2,
        1.3
      ]
    },
    "isHidden": true
  },
  {
    "id": "h2",
    "description": "Empty",
    "input": {
      "array": [],
      "fn": "floor"
    },
    "expected": {},
    "isHidden": true
  },
  {
    "id": "h3",
    "description": "Single element",
    "input": {
      "array": [
        5
      ],
      "fn": "floor"
    },
    "expected": {
      "5": [
        5
      ]
    },
    "isHidden": true
  }
],
};
