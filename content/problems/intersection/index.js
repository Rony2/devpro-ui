export const problem = {
  slug: "intersection",  category: "js-75",
  title: "Intersection",
  difficulty: "easy",
  type: "coding",
  topics: ["JavaScript","Arrays"],
  companies: ["Google","Meta","Amazon"],
  estimatedMinutes: 10,
  published: true,
  addedAt: "2026-04-01",
  description: "Implement a function that computes the intersection of arrays.",
  problemMdx: "## Overview\n\nImplement `intersection(a, b)` returning unique values present in both arrays.\n\n## Examples\n\n```js\nintersection([1,2,3], [2,3,4]); // [2,3]\n```\n\n## Solution\n\n<details>\n<summary>Reveal solution</summary>\n\n\`\`\`js\nfunction intersection(a, b) {\n  const set = new Set(b);\n  return [...new Set(a)].filter(x => set.has(x));\n}\n\`\`\`\n\n</details>",
  starterCode: "/**\n * Compute array intersection.\n * @param {Array} a\n * @param {Array} b\n * @returns {Array}\n */\nfunction intersection(a, b) {\n  // your implementation\n}",
  solution: "function intersection(a, b) {\n  const set = new Set(b);\n  return [...new Set(a)].filter(x => set.has(x));\n}",
  harness: "\nfunction solve(input) { return intersection(input.a, input.b); }",
  tests: [
  {
    "id": "basic",
    "description": "Overlap",
    "input": {
      "a": [
        1,
        2,
        3
      ],
      "b": [
        2,
        3,
        4
      ]
    },
    "expected": [
      2,
      3
    ],
    "isHidden": false
  },
  {
    "id": "none",
    "description": "No overlap",
    "input": {
      "a": [
        1,
        2
      ],
      "b": [
        3,
        4
      ]
    },
    "expected": [],
    "isHidden": false
  },
  {
    "id": "all",
    "description": "Full overlap",
    "input": {
      "a": [
        1,
        2,
        3
      ],
      "b": [
        1,
        2,
        3
      ]
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
    "description": "Duplicates in a",
    "input": {
      "a": [
        1,
        1,
        2,
        2
      ],
      "b": [
        1,
        2
      ]
    },
    "expected": [
      1,
      2
    ],
    "isHidden": true
  },
  {
    "id": "h2",
    "description": "Empty a",
    "input": {
      "a": [],
      "b": [
        1,
        2
      ]
    },
    "expected": [],
    "isHidden": true
  },
  {
    "id": "h3",
    "description": "Strings",
    "input": {
      "a": [
        "a",
        "b",
        "c"
      ],
      "b": [
        "b",
        "c",
        "d"
      ]
    },
    "expected": [
      "b",
      "c"
    ],
    "isHidden": true
  }
],
};
