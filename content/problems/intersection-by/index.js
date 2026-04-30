export const problem = {
  slug: "intersection-by",  category: "js-75",
  title: "Intersection By",
  difficulty: "medium",
  type: "coding",
  topics: ["JavaScript","Arrays","Functions"],
  companies: ["Google","Meta","Amazon"],
  estimatedMinutes: 25,
  published: true,
  addedAt: "2026-04-01",
  description: "Implement a function that returns the intersection of arrays after applying an iteratee.",
  problemMdx: "## Overview\n\nImplement `intersectionBy(iteratee, a, b)` — returns elements from `a` whose iteratee result is also found in `b`.\n\n## Examples\n\n```js\nintersectionBy(Math.floor, [2.1, 1.2], [2.3, 3.4]); // [2.1]\n```\n\n## Solution\n\n<details>\n<summary>Reveal solution</summary>\n\n\`\`\`js\nfunction intersectionBy(iteratee, a, b) {\n  const bSet = new Set(b.map(iteratee));\n  return a.filter(item => bSet.has(iteratee(item)));\n}\n\`\`\`\n\n</details>",
  starterCode: "/**\n * Intersection with iteratee.\n * @param {Function} iteratee\n * @param {Array} a\n * @param {Array} b\n * @returns {Array}\n */\nfunction intersectionBy(iteratee, a, b) {\n  // your implementation\n}",
  solution: "function intersectionBy(iteratee, a, b) {\n  const bSet = new Set(b.map(iteratee));\n  return a.filter(item => bSet.has(iteratee(item)));\n}",
  harness: "\nfunction solve(input) {\n  const fn = input.fn === 'floor' ? Math.floor : input.fn === 'abs' ? Math.abs : x => x;\n  return intersectionBy(fn, input.a, input.b);\n}",
  tests: [
  {
    "id": "floor",
    "description": "Floor intersection",
    "input": {
      "a": [
        2.1,
        1.2
      ],
      "b": [
        2.3,
        3.4
      ],
      "fn": "floor"
    },
    "expected": [
      2.1
    ],
    "isHidden": false
  },
  {
    "id": "abs",
    "description": "Abs intersection",
    "input": {
      "a": [
        -1,
        2,
        -3
      ],
      "b": [
        1,
        -2,
        3
      ],
      "fn": "abs"
    },
    "expected": [
      -1,
      2,
      -3
    ],
    "isHidden": false
  },
  {
    "id": "no-match",
    "description": "No intersection",
    "input": {
      "a": [
        1.1,
        2.1
      ],
      "b": [
        3.1,
        4.1
      ],
      "fn": "floor"
    },
    "expected": [],
    "isHidden": false
  },
  {
    "id": "h1",
    "description": "All match",
    "input": {
      "a": [
        1.5,
        2.5
      ],
      "b": [
        1.9,
        2.9
      ],
      "fn": "floor"
    },
    "expected": [
      1.5,
      2.5
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
      ],
      "fn": "floor"
    },
    "expected": [],
    "isHidden": true
  },
  {
    "id": "h3",
    "description": "Identity",
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
      ],
      "fn": "identity"
    },
    "expected": [
      2,
      3
    ],
    "isHidden": true
  }
],
};
