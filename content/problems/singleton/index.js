export const problem = {
  slug: "singleton",  category: "js-75",
  title: "Singleton",
  difficulty: "easy",
  type: "coding",
  topics: ["JavaScript","Design Patterns","Classes"],
  companies: ["Google","Meta","Amazon"],
  estimatedMinutes: 10,
  published: true,
  addedAt: "2026-04-01",
  description: "Implement a Singleton pattern that ensures a class has only one instance.",
  problemMdx: "## Overview\n\nImplement `createSingleton(BaseClass)` — wraps a class so only one instance is ever created.\n\n## Examples\n\n```js\nconst S = createSingleton(class { constructor(v) { this.v = v; } });\nconst a = new S(1);\nconst b = new S(2);\na === b; // true\na.v; // 1\n```\n\n## Solution\n\n<details>\n<summary>Reveal solution</summary>\n\n\`\`\`js\nfunction createSingleton(BaseClass) {\n  let instance;\n  return function(...args) {\n    if (!instance) instance = new BaseClass(...args);\n    return instance;\n  };\n}\n\`\`\`\n\n</details>",
  starterCode: "/**\n * Wrap a class to make it a singleton.\n * @param {Function} BaseClass\n * @returns {Function}\n */\nfunction createSingleton(BaseClass) {\n  // your implementation\n}",
  solution: "function createSingleton(BaseClass) {\n  let instance;\n  return function(...args) {\n    if (!instance) instance = new BaseClass(...args);\n    return instance;\n  };\n}",
  harness: "\nfunction solve(input) {\n  const Cls = createSingleton(function(v) { this.val = v; });\n  const instances = input.args.map(a => new Cls(a));\n  return { allSame: instances.every(i => i === instances[0]), val: instances[0].val };\n}",
  tests: [
  {
    "id": "two",
    "description": "Two instances",
    "input": {
      "args": [
        1,
        2
      ]
    },
    "expected": {
      "allSame": true,
      "val": 1
    },
    "isHidden": false
  },
  {
    "id": "three",
    "description": "Three instances",
    "input": {
      "args": [
        10,
        20,
        30
      ]
    },
    "expected": {
      "allSame": true,
      "val": 10
    },
    "isHidden": false
  },
  {
    "id": "single",
    "description": "Single",
    "input": {
      "args": [
        42
      ]
    },
    "expected": {
      "allSame": true,
      "val": 42
    },
    "isHidden": false
  },
  {
    "id": "h1",
    "description": "String arg",
    "input": {
      "args": [
        "hello",
        "world"
      ]
    },
    "expected": {
      "allSame": true,
      "val": "hello"
    },
    "isHidden": true
  },
  {
    "id": "h2",
    "description": "Many",
    "input": {
      "args": [
        1,
        2,
        3,
        4,
        5
      ]
    },
    "expected": {
      "allSame": true,
      "val": 1
    },
    "isHidden": true
  },
  {
    "id": "h3",
    "description": "Null",
    "input": {
      "args": [
        null,
        "fallback"
      ]
    },
    "expected": {
      "allSame": true,
      "val": null
    },
    "isHidden": true
  }
],
};
