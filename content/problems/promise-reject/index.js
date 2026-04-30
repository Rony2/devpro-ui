export const problem = {
  slug: "promise-reject",  category: "js-75",
  title: "Promise.reject",
  difficulty: "easy",
  type: "coding",
  topics: ["JavaScript","Promises","Async"],
  companies: ["Google","Meta","Amazon"],
  estimatedMinutes: 10,
  published: true,
  addedAt: "2026-04-01",
  description: "Implement a function to return a Promise object rejected with a given reason.",
  problemMdx: "## Overview\n\nImplement `promiseReject(reason)` that returns a rejected Promise, without using `Promise.reject`.\n\n## Examples\n\n```js\ntry { await promiseReject('error'); } catch(e) { console.log(e); } // 'error'\n```\n\n## Solution\n\n<details>\n<summary>Reveal solution</summary>\n\n\`\`\`js\nfunction promiseReject(reason) {\n  return new Promise((_, reject) => reject(reason));\n}\n\`\`\`\n\n</details>",
  starterCode: "/**\n * Return a rejected promise.\n * @param {*} reason\n * @returns {Promise}\n */\nfunction promiseReject(reason) {\n  // your implementation\n}",
  solution: "function promiseReject(reason) {\n  return new Promise((_, reject) => reject(reason));\n}",
  harness: "\nasync function solve(input) {\n  try { await promiseReject(input.reason); return { rejected: false }; }\n  catch(e) { return { rejected: true, reason: e }; }\n}",
  tests: [
  {
    "id": "string",
    "description": "String reason",
    "input": {
      "reason": "error"
    },
    "expected": {
      "rejected": true,
      "reason": "error"
    },
    "isHidden": false
  },
  {
    "id": "number",
    "description": "Number reason",
    "input": {
      "reason": 42
    },
    "expected": {
      "rejected": true,
      "reason": 42
    },
    "isHidden": false
  },
  {
    "id": "null",
    "description": "Null reason",
    "input": {
      "reason": null
    },
    "expected": {
      "rejected": true,
      "reason": null
    },
    "isHidden": false
  },
  {
    "id": "h1",
    "description": "Object reason",
    "input": {
      "reason": {
        "code": 500
      }
    },
    "expected": {
      "rejected": true,
      "reason": {
        "code": 500
      }
    },
    "isHidden": true
  },
  {
    "id": "h2",
    "description": "Undefined",
    "input": {},
    "expected": {
      "rejected": true
    },
    "isHidden": true
  },
  {
    "id": "h3",
    "description": "Boolean",
    "input": {
      "reason": false
    },
    "expected": {
      "rejected": true,
      "reason": false
    },
    "isHidden": true
  }
],
};
