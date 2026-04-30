export const problem = {
  slug: "chunk",  category: "js-75",
  title: "Chunk",
  difficulty: "easy",
  type: "coding",
  topics: ["JavaScript","Arrays"],
  companies: ["Google","Meta","Amazon"],
  estimatedMinutes: 10,
  published: true,
  addedAt: "2026-04-01",
  description: "Implement a function that splits an array into groups of a specified size.",
  problemMdx: "## Overview\n\nImplement `chunk(array, size)` that splits `array` into sub-arrays of length `size`. The last chunk may be smaller.\n\n## Examples\n\n```js\nchunk([1,2,3,4,5], 2); // [[1,2],[3,4],[5]]\nchunk([1,2,3], 1); // [[1],[2],[3]]\n```\n\n## Solution\n\n<details>\n<summary>Reveal solution</summary>\n\n\`\`\`js\nfunction chunk(array, size) {\n  const r = [];\n  for (let i = 0; i < array.length; i += size) r.push(array.slice(i, i + size));\n  return r;\n}\n\`\`\`\n\n</details>",
  starterCode: "/**\n * Split array into chunks of given size.\n * @param {Array} array\n * @param {number} size\n * @returns {Array[]}\n */\nfunction chunk(array, size) {\n  // your implementation\n}",
  solution: "function chunk(array, size) {\n  const r = [];\n  for (let i = 0; i < array.length; i += size) r.push(array.slice(i, i + size));\n  return r;\n}",
  harness: "\nfunction solve(input) { return chunk(input.array, input.size); }",
  tests: [
  {
    "id": "basic",
    "description": "Chunk by 2",
    "input": {
      "array": [
        1,
        2,
        3,
        4,
        5
      ],
      "size": 2
    },
    "expected": [
      [
        1,
        2
      ],
      [
        3,
        4
      ],
      [
        5
      ]
    ],
    "isHidden": false
  },
  {
    "id": "by-one",
    "description": "Chunk by 1",
    "input": {
      "array": [
        1,
        2,
        3
      ],
      "size": 1
    },
    "expected": [
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
    "isHidden": false
  },
  {
    "id": "exact",
    "description": "Exact division",
    "input": {
      "array": [
        1,
        2,
        3,
        4
      ],
      "size": 2
    },
    "expected": [
      [
        1,
        2
      ],
      [
        3,
        4
      ]
    ],
    "isHidden": false
  },
  {
    "id": "h1",
    "description": "Larger than array",
    "input": {
      "array": [
        1,
        2
      ],
      "size": 5
    },
    "expected": [
      [
        1,
        2
      ]
    ],
    "isHidden": true
  },
  {
    "id": "h2",
    "description": "Empty array",
    "input": {
      "array": [],
      "size": 3
    },
    "expected": [],
    "isHidden": true
  },
  {
    "id": "h3",
    "description": "Chunk by 3",
    "input": {
      "array": [
        1,
        2,
        3,
        4,
        5,
        6,
        7
      ],
      "size": 3
    },
    "expected": [
      [
        1,
        2,
        3
      ],
      [
        4,
        5,
        6
      ],
      [
        7
      ]
    ],
    "isHidden": true
  }
],
};
