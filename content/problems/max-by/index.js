export const problem = {
  slug: "max-by",  category: "js-75",
  title: "Max By",
  difficulty: "easy",
  type: "coding",
  topics: ["JavaScript","Arrays","Functions"],
  companies: ["Google","Meta","Amazon"],
  estimatedMinutes: 10,
  published: true,
  addedAt: "2026-04-01",
  description: "Implement a function that finds the maximum element based on a specified iteratee.",
  problemMdx: "## Overview\n\nImplement `maxBy(array, iteratee)` — returns element with largest iteratee value.\n\n## Examples\n\n```js\nmaxBy([{n:1},{n:2}], o => o.n); // {n:2}\n```\n\n## Solution\n\n<details>\n<summary>Reveal solution</summary>\n\n\`\`\`js\nfunction maxBy(array, iteratee) {\n  if (!array.length) return undefined;\n  let max = array[0], maxV = iteratee(array[0]);\n  for (let i = 1; i < array.length; i++) {\n    const v = iteratee(array[i]);\n    if (v > maxV) { maxV = v; max = array[i]; }\n  }\n  return max;\n}\n\`\`\`\n\n</details>",
  starterCode: "/**\n * Find element with max iteratee value.\n * @param {Array} array\n * @param {Function} iteratee\n * @returns {*}\n */\nfunction maxBy(array, iteratee) {\n  // your implementation\n}",
  solution: "function maxBy(array, iteratee) {\n  if (!array.length) return undefined;\n  let max = array[0], maxV = iteratee(array[0]);\n  for (let i = 1; i < array.length; i++) {\n    const v = iteratee(array[i]);\n    if (v > maxV) { maxV = v; max = array[i]; }\n  }\n  return max;\n}",
  harness: "\nfunction solve(input) {\n  return maxBy(input.array, item => typeof item === 'object' ? item[input.key] : item);\n}",
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
      "n": 7
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
    "expected": 3,
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
    "description": "Negatives",
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
      "n": 0
    },
    "isHidden": true
  },
  {
    "id": "h2",
    "description": "First is max",
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
      "n": 3
    },
    "isHidden": true
  },
  {
    "id": "h3",
    "description": "Duplicates",
    "input": {
      "array": [
        {
          "n": 5
        },
        {
          "n": 5
        },
        {
          "n": 3
        }
      ],
      "key": "n"
    },
    "expected": {
      "n": 5
    },
    "isHidden": true
  }
],
};
