export const problem = {
  slug: "data-merging",  category: "js-75",
  title: "Data Merging",
  difficulty: "medium",
  type: "coding",
  topics: ["JavaScript","Objects","Arrays"],
  companies: ["Google","Meta","Amazon"],
  estimatedMinutes: 25,
  published: true,
  addedAt: "2026-04-01",
  description: "Implement a function that merges two arrays of objects by a shared key.",
  problemMdx: "## Overview\n\nImplement `dataMerge(arr1, arr2, key)` that merges objects from both arrays matching on `key`. Properties from `arr2` override `arr1`.\n\n## Examples\n\n```js\ndataMerge(\n  [{ id: 1, name: 'Alice' }],\n  [{ id: 1, age: 25 }],\n  'id'\n); // [{ id: 1, name: 'Alice', age: 25 }]\n```\n\n## Solution\n\n<details>\n<summary>Reveal solution</summary>\n\n\`\`\`js\nfunction dataMerge(arr1, arr2, key) {\n  const map = new Map();\n  for (const item of arr1) map.set(item[key], { ...item });\n  for (const item of arr2) {\n    const existing = map.get(item[key]) || {};\n    map.set(item[key], { ...existing, ...item });\n  }\n  return Array.from(map.values());\n}\n\`\`\`\n\n</details>",
  starterCode: "/**\n * Merge two arrays of objects by key.\n * @param {Object[]} arr1\n * @param {Object[]} arr2\n * @param {string} key\n * @returns {Object[]}\n */\nfunction dataMerge(arr1, arr2, key) {\n  // your implementation\n}",
  solution: "function dataMerge(arr1, arr2, key) {\n  const map = new Map();\n  for (const item of arr1) map.set(item[key], { ...item });\n  for (const item of arr2) {\n    const existing = map.get(item[key]) || {};\n    map.set(item[key], { ...existing, ...item });\n  }\n  return Array.from(map.values());\n}",
  harness: "\nfunction solve(input) { return dataMerge(input.arr1, input.arr2, input.key); }",
  tests: [
  {
    "id": "basic",
    "description": "Merge by id",
    "input": {
      "arr1": [
        {
          "id": 1,
          "name": "Alice"
        }
      ],
      "arr2": [
        {
          "id": 1,
          "age": 25
        }
      ],
      "key": "id"
    },
    "expected": [
      {
        "id": 1,
        "name": "Alice",
        "age": 25
      }
    ],
    "isHidden": false
  },
  {
    "id": "multi",
    "description": "Multiple items",
    "input": {
      "arr1": [
        {
          "id": 1,
          "a": 1
        },
        {
          "id": 2,
          "a": 2
        }
      ],
      "arr2": [
        {
          "id": 2,
          "b": 20
        },
        {
          "id": 3,
          "b": 30
        }
      ],
      "key": "id"
    },
    "expected": [
      {
        "id": 1,
        "a": 1
      },
      {
        "id": 2,
        "a": 2,
        "b": 20
      },
      {
        "id": 3,
        "b": 30
      }
    ],
    "isHidden": false
  },
  {
    "id": "override",
    "description": "Override values",
    "input": {
      "arr1": [
        {
          "id": 1,
          "v": "old"
        }
      ],
      "arr2": [
        {
          "id": 1,
          "v": "new"
        }
      ],
      "key": "id"
    },
    "expected": [
      {
        "id": 1,
        "v": "new"
      }
    ],
    "isHidden": false
  },
  {
    "id": "h1",
    "description": "No overlap",
    "input": {
      "arr1": [
        {
          "id": 1,
          "x": 1
        }
      ],
      "arr2": [
        {
          "id": 2,
          "y": 2
        }
      ],
      "key": "id"
    },
    "expected": [
      {
        "id": 1,
        "x": 1
      },
      {
        "id": 2,
        "y": 2
      }
    ],
    "isHidden": true
  },
  {
    "id": "h2",
    "description": "Empty arr2",
    "input": {
      "arr1": [
        {
          "id": 1,
          "a": 1
        }
      ],
      "arr2": [],
      "key": "id"
    },
    "expected": [
      {
        "id": 1,
        "a": 1
      }
    ],
    "isHidden": true
  },
  {
    "id": "h3",
    "description": "String keys",
    "input": {
      "arr1": [
        {
          "code": "A",
          "v": 1
        }
      ],
      "arr2": [
        {
          "code": "A",
          "v": 2
        }
      ],
      "key": "code"
    },
    "expected": [
      {
        "code": "A",
        "v": 2
      }
    ],
    "isHidden": true
  }
],
};
