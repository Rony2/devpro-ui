export const problem = {
  slug: "from-pairs",  category: "js-75",
  title: "From Pairs",
  difficulty: "easy",
  type: "coding",
  topics: ["JavaScript","Arrays","Objects"],
  companies: ["Google","Meta","Amazon"],
  estimatedMinutes: 10,
  published: true,
  addedAt: "2026-04-01",
  description: "Implement a function that returns an object composed from key-value pairs.",
  problemMdx: "## Overview\n\nImplement `fromPairs(pairs)` where each element is a `[key, value]` array.\n\n## Examples\n\n```js\nfromPairs([['a',1],['b',2]]); // {a:1,b:2}\n```\n\n## Solution\n\n<details>\n<summary>Reveal solution</summary>\n\n\`\`\`js\nfunction fromPairs(pairs) {\n  const r = {};\n  for (const [k,v] of pairs) r[k] = v;\n  return r;\n}\n\`\`\`\n\n</details>",
  starterCode: "/**\n * Convert key-value pairs to an object.\n * @param {Array<[string, any]>} pairs\n * @returns {Object}\n */\nfunction fromPairs(pairs) {\n  // your implementation\n}",
  solution: "function fromPairs(pairs) {\n  const r = {};\n  for (const [k,v] of pairs) r[k] = v;\n  return r;\n}",
  harness: "\nfunction solve(input) { return fromPairs(input.pairs); }",
  tests: [
  {
    "id": "basic",
    "description": "Basic pairs",
    "input": {
      "pairs": [
        [
          "a",
          1
        ],
        [
          "b",
          2
        ]
      ]
    },
    "expected": {
      "a": 1,
      "b": 2
    },
    "isHidden": false
  },
  {
    "id": "single",
    "description": "Single",
    "input": {
      "pairs": [
        [
          "x",
          10
        ]
      ]
    },
    "expected": {
      "x": 10
    },
    "isHidden": false
  },
  {
    "id": "empty",
    "description": "Empty",
    "input": {
      "pairs": []
    },
    "expected": {},
    "isHidden": false
  },
  {
    "id": "h1",
    "description": "Duplicate keys",
    "input": {
      "pairs": [
        [
          "a",
          1
        ],
        [
          "a",
          2
        ]
      ]
    },
    "expected": {
      "a": 2
    },
    "isHidden": true
  },
  {
    "id": "h2",
    "description": "Mixed types",
    "input": {
      "pairs": [
        [
          "a",
          null
        ],
        [
          "b",
          true
        ]
      ]
    },
    "expected": {
      "a": null,
      "b": true
    },
    "isHidden": true
  },
  {
    "id": "h3",
    "description": "Many pairs",
    "input": {
      "pairs": [
        [
          "w",
          1
        ],
        [
          "x",
          2
        ],
        [
          "y",
          3
        ],
        [
          "z",
          4
        ]
      ]
    },
    "expected": {
      "w": 1,
      "x": 2,
      "y": 3,
      "z": 4
    },
    "isHidden": true
  }
],
};
