export const problem = {
  slug: "promise-resolve",  category: "js-75",
  title: "Promise.resolve",
  difficulty: "medium",
  type: "coding",
  topics: ["JavaScript","Promises"],
  companies: ["Google","Meta","Amazon"],
  estimatedMinutes: 25,
  published: true,
  addedAt: "2026-04-01",
  description: "Implement the Promise.resolve() method handling thenables correctly.",
  problemMdx: "## Overview\n\nImplement `promiseResolve(value)` that behaves like `Promise.resolve(value)`.\n\n## Constraints\n\n- If value is a Promise, return it as-is\n- If value is a thenable (has `.then`), wrap it\n- Otherwise, return a resolved promise\n\n## Examples\n\n```js\nawait promiseResolve(42); // 42\nawait promiseResolve(Promise.resolve('already')); // 'already'\n```\n\n## Solution\n\n<details>\n<summary>Reveal solution</summary>\n\n\`\`\`js\nfunction promiseResolve(value) {\n  if (value instanceof Promise) return value;\n  if (value && typeof value === 'object' && typeof value.then === 'function') {\n    return new Promise((resolve, reject) => value.then(resolve, reject));\n  }\n  return new Promise(resolve => resolve(value));\n}\n\`\`\`\n\n</details>",
  starterCode: "/**\n * Implement Promise.resolve.\n * @param {*} value\n * @returns {Promise}\n */\nfunction promiseResolve(value) {\n  // your implementation\n}",
  solution: "function promiseResolve(value) {\n  if (value instanceof Promise) return value;\n  if (value && typeof value === 'object' && typeof value.then === 'function') {\n    return new Promise((resolve, reject) => value.then(resolve, reject));\n  }\n  return new Promise(resolve => resolve(value));\n}",
  harness: "\nasync function solve(input) {\n  let val;\n  if (input.type === 'promise') val = Promise.resolve(input.value);\n  else if (input.type === 'thenable') val = { then: (resolve) => resolve(input.value) };\n  else val = input.value;\n  return await promiseResolve(val);\n}",
  tests: [
  {
    "id": "primitive",
    "description": "Primitive value",
    "input": {
      "type": "primitive",
      "value": 42
    },
    "expected": 42,
    "isHidden": false
  },
  {
    "id": "promise",
    "description": "Promise passthrough",
    "input": {
      "type": "promise",
      "value": "resolved"
    },
    "expected": "resolved",
    "isHidden": false
  },
  {
    "id": "thenable",
    "description": "Thenable object",
    "input": {
      "type": "thenable",
      "value": "from-thenable"
    },
    "expected": "from-thenable",
    "isHidden": false
  },
  {
    "id": "h1",
    "description": "String",
    "input": {
      "type": "primitive",
      "value": "hello"
    },
    "expected": "hello",
    "isHidden": true
  },
  {
    "id": "h2",
    "description": "Null",
    "input": {
      "type": "primitive",
      "value": null
    },
    "expected": null,
    "isHidden": true
  },
  {
    "id": "h3",
    "description": "Boolean",
    "input": {
      "type": "primitive",
      "value": true
    },
    "expected": true,
    "isHidden": true
  }
],
};
