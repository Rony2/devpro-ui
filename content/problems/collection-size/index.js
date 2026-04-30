export const problem = {
  slug: "collection-size",  category: "js-75",
  title: "Size",
  difficulty: "easy",
  type: "coding",
  topics: ["JavaScript","Functions","Data Structures"],
  companies: ["Google","Meta","Amazon"],
  estimatedMinutes: 10,
  published: true,
  addedAt: "2026-04-01",
  description: "Implement a function that returns the size of a collection.",
  problemMdx: "## Overview\n\nImplement `size(collection)` — returns length for arrays/strings, key count for objects.\n\n## Examples\n\n```js\nsize([1,2,3]); // 3\nsize({a:1,b:2}); // 2\nsize('hello'); // 5\n```\n\n## Solution\n\n<details>\n<summary>Reveal solution</summary>\n\n\`\`\`js\nfunction size(collection) {\n  if (collection == null) return 0;\n  if (Array.isArray(collection) || typeof collection === 'string') return collection.length;\n  return Object.keys(collection).length;\n}\n\`\`\`\n\n</details>",
  starterCode: "/**\n * Return size of a collection.\n * @param {Array|Object|string} collection\n * @returns {number}\n */\nfunction size(collection) {\n  // your implementation\n}",
  solution: "function size(collection) {\n  if (collection == null) return 0;\n  if (Array.isArray(collection) || typeof collection === 'string') return collection.length;\n  return Object.keys(collection).length;\n}",
  harness: "\nfunction solve(input) { return size(input.collection); }",
  tests: [
  {
    "id": "array",
    "description": "Array",
    "input": {
      "collection": [
        1,
        2,
        3
      ]
    },
    "expected": 3,
    "isHidden": false
  },
  {
    "id": "object",
    "description": "Object",
    "input": {
      "collection": {
        "a": 1,
        "b": 2
      }
    },
    "expected": 2,
    "isHidden": false
  },
  {
    "id": "string",
    "description": "String",
    "input": {
      "collection": "hello"
    },
    "expected": 5,
    "isHidden": false
  },
  {
    "id": "h1",
    "description": "Empty array",
    "input": {
      "collection": []
    },
    "expected": 0,
    "isHidden": true
  },
  {
    "id": "h2",
    "description": "Empty object",
    "input": {
      "collection": {}
    },
    "expected": 0,
    "isHidden": true
  },
  {
    "id": "h3",
    "description": "Null",
    "input": {
      "collection": null
    },
    "expected": 0,
    "isHidden": true
  }
],
};
