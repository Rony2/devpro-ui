export const problem = {
  slug: "promise-with-resolvers",  category: "js-75",
  title: "Promise.withResolvers",
  difficulty: "medium",
  type: "coding",
  topics: ["JavaScript","Promises"],
  companies: ["Google","Meta","Amazon"],
  estimatedMinutes: 25,
  published: true,
  addedAt: "2026-04-01",
  description: "Implement the Promise.withResolvers() method that returns a promise with exposed resolve and reject.",
  problemMdx: "## Overview\n\nImplement `promiseWithResolvers()` that returns `{ promise, resolve, reject }` — a Promise with externally accessible resolve/reject functions.\n\n## Examples\n\n```js\nconst { promise, resolve } = promiseWithResolvers();\nsetTimeout(() => resolve(42), 100);\nawait promise; // 42\n```\n\n## Solution\n\n<details>\n<summary>Reveal solution</summary>\n\n\`\`\`js\nfunction promiseWithResolvers() {\n  let resolve, reject;\n  const promise = new Promise((res, rej) => { resolve = res; reject = rej; });\n  return { promise, resolve, reject };\n}\n\`\`\`\n\n</details>",
  starterCode: "/**\n * Implement Promise.withResolvers.\n * @returns {{ promise: Promise, resolve: Function, reject: Function }}\n */\nfunction promiseWithResolvers() {\n  // your implementation\n}",
  solution: "function promiseWithResolvers() {\n  let resolve, reject;\n  const promise = new Promise((res, rej) => { resolve = res; reject = rej; });\n  return { promise, resolve, reject };\n}",
  harness: "\nasync function solve(input) {\n  const { promise, resolve, reject } = promiseWithResolvers();\n  if (input.action === 'resolve') setTimeout(() => resolve(input.value), 10);\n  else setTimeout(() => reject(new Error(input.value)), 10);\n  try {\n    const result = await promise;\n    return { result, error: null };\n  } catch(e) {\n    return { result: null, error: e.message };\n  }\n}",
  tests: [
  {
    "id": "resolve",
    "description": "Resolve externally",
    "input": {
      "action": "resolve",
      "value": 42
    },
    "expected": {
      "result": 42,
      "error": null
    },
    "isHidden": false
  },
  {
    "id": "reject",
    "description": "Reject externally",
    "input": {
      "action": "reject",
      "value": "fail"
    },
    "expected": {
      "result": null,
      "error": "fail"
    },
    "isHidden": false
  },
  {
    "id": "string",
    "description": "String resolve",
    "input": {
      "action": "resolve",
      "value": "hello"
    },
    "expected": {
      "result": "hello",
      "error": null
    },
    "isHidden": false
  },
  {
    "id": "h1",
    "description": "Null resolve",
    "input": {
      "action": "resolve",
      "value": null
    },
    "expected": {
      "result": null,
      "error": null
    },
    "isHidden": true
  },
  {
    "id": "h2",
    "description": "Bool resolve",
    "input": {
      "action": "resolve",
      "value": true
    },
    "expected": {
      "result": true,
      "error": null
    },
    "isHidden": true
  },
  {
    "id": "h3",
    "description": "Error message",
    "input": {
      "action": "reject",
      "value": "oops"
    },
    "expected": {
      "result": null,
      "error": "oops"
    },
    "isHidden": true
  }
],
};
