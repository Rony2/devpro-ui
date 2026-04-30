export const problem = {
  slug: "min-by",  category: "js-75",
  title: "Min By",
  difficulty: "easy",
  type: "coding",
  topics: ["JavaScript","Arrays","Functions"],
  companies: ["Google","Meta","Amazon"],
  estimatedMinutes: 10,
  published: true,
  addedAt: "2026-04-01",
  description: "Implement a function that finds the minimum element based on a specified iteratee.",
  problemMdx: "## Overview\n\nImplement `minBy(array, iteratee)` — returns element with smallest iteratee value.\n\n## Examples\n\n```js\nminBy([{n:1},{n:2}], o => o.n); // {n:1}\n```\n\n## Solution\n\n<details>\n<summary>Reveal solution</summary>\n\n\`\`\`js\nfunction minBy(array, iteratee) {\n  if (!array.length) return undefined;\n  let min = array[0], minV = iteratee(array[0]);\n  for (let i = 1; i < array.length; i++) {\n    const v = iteratee(array[i]);\n    if (v < minV) { minV = v; min = array[i]; }\n  }\n  return min;\n}\n\`\`\`\n\n</details>",
  starterCode: "/**\n * Find element with min iteratee value.\n * @param {Array} array\n * @param {Function} iteratee\n * @returns {*}\n */\nfunction minBy(array, iteratee) {\n  // your implementation\n}",
  solution: "function minBy(array, iteratee) {\n  if (!array.length) return undefined;\n  let min = array[0], minV = iteratee(array[0]);\n  for (let i = 1; i < array.length; i++) {\n    const v = iteratee(array[i]);\n    if (v < minV) { minV = v; min = array[i]; }\n  }\n  return min;\n}",
  harness: "\nfunction solve(input) {\n  return minBy(input.array, item => typeof item === 'object' ? item[input.key] : item);\n}",
  tests: [
  {
    "id": "obj",
    "description": "Objects",
    "input": {
      "array": [
        {
          "n": 4
        },
        {
          "n": 2
        },
        {
          "n": 7
        }
      ],
      "key": "n"
    },
    "expected": {
      "n": 2
    },
    "isHidden": false
  },
  {
    "id": "nums",
    "description": "Numbers",
    "input": {
      "array": [
        3,
        1,
        2
      ],
      "key": null
    },
    "expected": 1,
    "isHidden": false
  },
  {
    "id": "single",
    "description": "Single",
    "input": {
      "array": [
        {
          "n": 5
        }
      ],
      "key": "n"
    },
    "expected": {
      "n": 5
    },
    "isHidden": false
  },
  {
    "id": "h1",
    "description": "Negative",
    "input": {
      "array": [
        {
          "n": -1
        },
        {
          "n": -5
        },
        {
          "n": 0
        }
      ],
      "key": "n"
    },
    "expected": {
      "n": -5
    },
    "isHidden": true
  },
  {
    "id": "h2",
    "description": "First is min",
    "input": {
      "array": [
        {
          "n": 1
        },
        {
          "n": 2
        },
        {
          "n": 3
        }
      ],
      "key": "n"
    },
    "expected": {
      "n": 1
    },
    "isHidden": true
  },
  {
    "id": "h3",
    "description": "Last is min",
    "input": {
      "array": [
        {
          "n": 3
        },
        {
          "n": 2
        },
        {
          "n": 1
        }
      ],
      "key": "n"
    },
    "expected": {
      "n": 1
    },
    "isHidden": true
  }
],
};
