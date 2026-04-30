export const problem = {
  slug: "compact",  category: "js-75",
  title: "Compact",
  difficulty: "easy",
  type: "coding",
  topics: ["JavaScript","Arrays"],
  companies: ["Google","Meta","Amazon"],
  estimatedMinutes: 10,
  published: true,
  addedAt: "2026-04-01",
  description: "Implement a function that creates an array with all falsey values removed.",
  problemMdx: "## Overview\n\nImplement `compact(array)` that removes all falsey values (`false`, `null`, `0`, `''`, `undefined`, `NaN`).\n\n## Examples\n\n```js\ncompact([0, 1, false, 2, '', 3]); // [1, 2, 3]\n```\n\n## Solution\n\n<details>\n<summary>Reveal solution</summary>\n\n\`\`\`js\nfunction compact(array) {\n  return array.filter(Boolean);\n}\n\`\`\`\n\n</details>",
  starterCode: "/**\n * Remove falsey values from array.\n * @param {Array} array\n * @returns {Array}\n */\nfunction compact(array) {\n  // your implementation\n}",
  solution: "function compact(array) {\n  return array.filter(Boolean);\n}",
  harness: "\nfunction solve(input) { return compact(input.array); }",
  tests: [
  {
    "id": "basic",
    "description": "Mixed falsey",
    "input": {
      "array": [
        0,
        1,
        false,
        2,
        "",
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
    "id": "all-truthy",
    "description": "All truthy",
    "input": {
      "array": [
        1,
        "a",
        true
      ]
    },
    "expected": [
      1,
      "a",
      true
    ],
    "isHidden": false
  },
  {
    "id": "all-falsey",
    "description": "All falsey",
    "input": {
      "array": [
        0,
        false,
        null,
        "",
        null
      ]
    },
    "expected": [],
    "isHidden": false
  },
  {
    "id": "h1",
    "description": "Empty",
    "input": {
      "array": []
    },
    "expected": [],
    "isHidden": true
  },
  {
    "id": "h2",
    "description": "Strings preserved",
    "input": {
      "array": [
        "",
        0,
        "hello",
        null,
        "world"
      ]
    },
    "expected": [
      "hello",
      "world"
    ],
    "isHidden": true
  },
  {
    "id": "h3",
    "description": "Nested arrays kept",
    "input": {
      "array": [
        0,
        [],
        1,
        {}
      ]
    },
    "expected": [
      [],
      1,
      {}
    ],
    "isHidden": true
  }
],
};
