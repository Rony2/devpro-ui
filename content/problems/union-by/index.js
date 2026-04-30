export const problem = {
  slug: "union-by",  category: "js-75",
  title: "Union By",
  difficulty: "medium",
  type: "coding",
  topics: ["JavaScript","Arrays","Functions"],
  companies: ["Google","Meta","Amazon"],
  estimatedMinutes: 25,
  published: true,
  addedAt: "2026-04-01",
  description: "Implement a function that creates a union of arrays using an iteratee for uniqueness.",
  problemMdx: "## Overview\n\nImplement `unionBy(iteratee, ...arrays)` — returns a combined array with uniqueness determined by `iteratee`.\n\n## Examples\n\n```js\nunionBy(Math.floor, [2.1, 1.2], [2.3, 3.4]); // [2.1, 1.2, 3.4]\n```\n\n## Solution\n\n<details>\n<summary>Reveal solution</summary>\n\n\`\`\`js\nfunction unionBy(iteratee, ...arrays) {\n  const seen = new Set();\n  const result = [];\n  for (const arr of arrays) {\n    for (const item of arr) {\n      const key = iteratee(item);\n      if (!seen.has(key)) { seen.add(key); result.push(item); }\n    }\n  }\n  return result;\n}\n\`\`\`\n\n</details>",
  starterCode: "/**\n * Union arrays with iteratee-based uniqueness.\n * @param {Function} iteratee\n * @param {...Array} arrays\n * @returns {Array}\n */\nfunction unionBy(iteratee, ...arrays) {\n  // your implementation\n}",
  solution: "function unionBy(iteratee, ...arrays) {\n  const seen = new Set();\n  const result = [];\n  for (const arr of arrays) {\n    for (const item of arr) {\n      const key = iteratee(item);\n      if (!seen.has(key)) { seen.add(key); result.push(item); }\n    }\n  }\n  return result;\n}",
  harness: "\nfunction solve(input) {\n  const fn = input.fn === 'floor' ? Math.floor : input.fn === 'abs' ? Math.abs : x => x;\n  return unionBy(fn, ...input.arrays);\n}",
  tests: [
  {
    "id": "floor",
    "description": "Floor union",
    "input": {
      "arrays": [
        [
          2.1,
          1.2
        ],
        [
          2.3,
          3.4
        ]
      ],
      "fn": "floor"
    },
    "expected": [
      2.1,
      1.2,
      3.4
    ],
    "isHidden": false
  },
  {
    "id": "abs",
    "description": "Abs union",
    "input": {
      "arrays": [
        [
          -1,
          2
        ],
        [
          -2,
          3
        ]
      ],
      "fn": "abs"
    },
    "expected": [
      -1,
      2,
      3
    ],
    "isHidden": false
  },
  {
    "id": "no-overlap",
    "description": "No overlap",
    "input": {
      "arrays": [
        [
          1,
          2
        ],
        [
          3,
          4
        ]
      ],
      "fn": "floor"
    },
    "expected": [
      1,
      2,
      3,
      4
    ],
    "isHidden": false
  },
  {
    "id": "h1",
    "description": "All same",
    "input": {
      "arrays": [
        [
          1.1,
          1.2
        ],
        [
          1.3
        ]
      ],
      "fn": "floor"
    },
    "expected": [
      1.1
    ],
    "isHidden": true
  },
  {
    "id": "h2",
    "description": "Three arrays",
    "input": {
      "arrays": [
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
      "fn": "floor"
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
    "description": "Empty",
    "input": {
      "arrays": [
        [],
        []
      ],
      "fn": "floor"
    },
    "expected": [],
    "isHidden": true
  }
],
};
