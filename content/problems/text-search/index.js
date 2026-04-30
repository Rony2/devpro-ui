export const problem = {
  slug: "text-search",  category: "js-75",
  title: "Text Search",
  difficulty: "medium",
  type: "coding",
  topics: ["JavaScript","Strings","Algorithms"],
  companies: ["Google","Meta","Amazon"],
  estimatedMinutes: 25,
  published: true,
  addedAt: "2026-04-01",
  description: "Implement a function that finds all occurrences of a pattern in text and returns their indices.",
  problemMdx: "## Overview\n\nImplement `textSearch(text, pattern)` that returns an array of starting indices where `pattern` appears in `text`.\n\n## Examples\n\n```js\ntextSearch('ababab', 'ab'); // [0, 2, 4]\ntextSearch('hello', 'xyz'); // []\n```\n\n## Solution\n\n<details>\n<summary>Reveal solution</summary>\n\n\`\`\`js\nfunction textSearch(text, pattern) {\n  if (!pattern) return [];\n  const indices = [];\n  let idx = text.indexOf(pattern);\n  while (idx !== -1) {\n    indices.push(idx);\n    idx = text.indexOf(pattern, idx + 1);\n  }\n  return indices;\n}\n\`\`\`\n\n</details>",
  starterCode: "/**\n * Find all indices of pattern in text.\n * @param {string} text\n * @param {string} pattern\n * @returns {number[]}\n */\nfunction textSearch(text, pattern) {\n  // your implementation\n}",
  solution: "function textSearch(text, pattern) {\n  if (!pattern) return [];\n  const indices = [];\n  let idx = text.indexOf(pattern);\n  while (idx !== -1) {\n    indices.push(idx);\n    idx = text.indexOf(pattern, idx + 1);\n  }\n  return indices;\n}",
  harness: "\nfunction solve(input) { return textSearch(input.text, input.pattern); }",
  tests: [
  {
    "id": "basic",
    "description": "Multiple matches",
    "input": {
      "text": "ababab",
      "pattern": "ab"
    },
    "expected": [
      0,
      2,
      4
    ],
    "isHidden": false
  },
  {
    "id": "none",
    "description": "No match",
    "input": {
      "text": "hello",
      "pattern": "xyz"
    },
    "expected": [],
    "isHidden": false
  },
  {
    "id": "single",
    "description": "Single match",
    "input": {
      "text": "abcdef",
      "pattern": "cde"
    },
    "expected": [
      2
    ],
    "isHidden": false
  },
  {
    "id": "h1",
    "description": "Overlapping",
    "input": {
      "text": "aaa",
      "pattern": "aa"
    },
    "expected": [
      0,
      1
    ],
    "isHidden": true
  },
  {
    "id": "h2",
    "description": "Full match",
    "input": {
      "text": "abc",
      "pattern": "abc"
    },
    "expected": [
      0
    ],
    "isHidden": true
  },
  {
    "id": "h3",
    "description": "Empty pattern",
    "input": {
      "text": "hello",
      "pattern": ""
    },
    "expected": [],
    "isHidden": true
  }
],
};
