export const problem = {
  slug: "difference",  category: "js-75",
  title: "Difference",
  difficulty: "easy",
  type: "coding",
  topics: ["JavaScript","Arrays"],
  companies: ["Google","Meta","Amazon"],
  estimatedMinutes: 10,
  published: true,
  addedAt: "2026-04-01",
  description: "Implement a function that finds values in the first array not included in the other arrays.",
  problemMdx: "## Overview\n\nImplement `difference(array, values)` that returns elements from `array` not present in `values`.\n\n## Examples\n\n```js\ndifference([1,2,3], [2,3]); // [1]\ndifference([1,2,3,4], [2,4]); // [1,3]\n```\n\n## Solution\n\n<details>\n<summary>Reveal solution</summary>\n\n\`\`\`js\nfunction difference(array, values) {\n  const set = new Set(values);\n  return array.filter(x => !set.has(x));\n}\n\`\`\`\n\n</details>",
  starterCode: "/**\n * Find values not in the exclusion array.\n * @param {Array} array\n * @param {Array} values\n * @returns {Array}\n */\nfunction difference(array, values) {\n  // your implementation\n}",
  solution: "function difference(array, values) {\n  const set = new Set(values);\n  return array.filter(x => !set.has(x));\n}",
  harness: "\nfunction solve(input) { return difference(input.array, input.values); }",
  tests: [
  {
    "id": "basic",
    "description": "Basic difference",
    "input": {
      "array": [
        1,
        2,
        3
      ],
      "values": [
        2,
        3
      ]
    },
    "expected": [
      1
    ],
    "isHidden": false
  },
  {
    "id": "partial",
    "description": "Partial overlap",
    "input": {
      "array": [
        1,
        2,
        3,
        4
      ],
      "values": [
        2,
        4
      ]
    },
    "expected": [
      1,
      3
    ],
    "isHidden": false
  },
  {
    "id": "no-overlap",
    "description": "No overlap",
    "input": {
      "array": [
        1,
        2
      ],
      "values": [
        3,
        4
      ]
    },
    "expected": [
      1,
      2
    ],
    "isHidden": false
  },
  {
    "id": "h1",
    "description": "All removed",
    "input": {
      "array": [
        1,
        2,
        3
      ],
      "values": [
        1,
        2,
        3
      ]
    },
    "expected": [],
    "isHidden": true
  },
  {
    "id": "h2",
    "description": "Empty values",
    "input": {
      "array": [
        1,
        2,
        3
      ],
      "values": []
    },
    "expected": [
      1,
      2,
      3
    ],
    "isHidden": true
  },
  {
    "id": "h3",
    "description": "Duplicates in source",
    "input": {
      "array": [
        1,
        1,
        2,
        3
      ],
      "values": [
        1
      ]
    },
    "expected": [
      2,
      3
    ],
    "isHidden": true
  }
],
};
