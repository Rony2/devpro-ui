export const problem = {
  slug: "count-by",  category: "js-75",
  title: "Count By",
  difficulty: "medium",
  type: "coding",
  topics: ["JavaScript","Arrays","Objects"],
  companies: ["Google","Meta","Amazon"],
  estimatedMinutes: 25,
  published: true,
  addedAt: "2026-04-01",
  description: "Implement a function that groups array elements by a iteratee and counts them.",
  problemMdx: "## Overview\n\nImplement `countBy(array, iteratee)` that returns an object whose keys are the result of running each element through `iteratee` and values are the count.\n\n## Examples\n\n```js\ncountBy([6.1, 4.2, 6.3], Math.floor); // { '4': 1, '6': 2 }\n```\n\n## Solution\n\n<details>\n<summary>Reveal solution</summary>\n\n\`\`\`js\nfunction countBy(array, iteratee) {\n  const result = {};\n  for (const item of array) {\n    const key = String(iteratee(item));\n    result[key] = (result[key] || 0) + 1;\n  }\n  return result;\n}\n\`\`\`\n\n</details>",
  starterCode: "/**\n * Count elements grouped by iteratee result.\n * @param {Array} array\n * @param {Function} iteratee\n * @returns {Object}\n */\nfunction countBy(array, iteratee) {\n  // your implementation\n}",
  solution: "function countBy(array, iteratee) {\n  const result = {};\n  for (const item of array) {\n    const key = String(iteratee(item));\n    result[key] = (result[key] || 0) + 1;\n  }\n  return result;\n}",
  harness: "\nfunction solve(input) {\n  const fn = input.fn === 'floor' ? Math.floor : input.fn === 'length' ? x => x.length : x => x % input.mod;\n  return countBy(input.array, fn);\n}",
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
      "4": 1,
      "6": 2
    },
    "isHidden": false
  },
  {
    "id": "length",
    "description": "Group by string length",
    "input": {
      "array": [
        "one",
        "two",
        "three"
      ],
      "fn": "length"
    },
    "expected": {
      "3": 2,
      "5": 1
    },
    "isHidden": false
  },
  {
    "id": "mod",
    "description": "Group by modulo",
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
      "mod": 2
    },
    "expected": {
      "0": 3,
      "1": 3
    },
    "isHidden": false
  },
  {
    "id": "h1",
    "description": "Single group",
    "input": {
      "array": [
        1.1,
        1.2,
        1.3
      ],
      "fn": "floor"
    },
    "expected": {
      "1": 3
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
    "description": "All different",
    "input": {
      "array": [
        1,
        2,
        3
      ],
      "fn": "floor"
    },
    "expected": {
      "1": 1,
      "2": 1,
      "3": 1
    },
    "isHidden": true
  }
],
};
