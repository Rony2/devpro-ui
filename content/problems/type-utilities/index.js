export const problem = {
  slug: "type-utilities",  category: "js-75",
  title: "Type Utilities",
  difficulty: "easy",
  type: "coding",
  topics: ["JavaScript","Types","Functions"],
  companies: ["Google","Meta","Amazon"],
  estimatedMinutes: 10,
  published: true,
  addedAt: "2026-04-01",
  description: "Implement utilities to determine primitive variable types in JavaScript.",
  problemMdx: "## Overview\n\nImplement `isString`, `isNumber`, `isBoolean`, `isNull`, `isUndefined`.\n\n## Examples\n\n```js\nisString('hello'); // true\nisNumber(42); // true\nisNull(null); // true\n```\n\n## Solution\n\n<details>\n<summary>Reveal solution</summary>\n\n\`\`\`js\nfunction isString(v) { return typeof v === 'string'; }\nfunction isNumber(v) { return typeof v === 'number'; }\nfunction isBoolean(v) { return typeof v === 'boolean'; }\nfunction isNull(v) { return v === null; }\nfunction isUndefined(v) { return v === undefined; }\n\`\`\`\n\n</details>",
  starterCode: "function isString(value) { /* implement */ }\nfunction isNumber(value) { /* implement */ }\nfunction isBoolean(value) { /* implement */ }\nfunction isNull(value) { /* implement */ }\nfunction isUndefined(value) { /* implement */ }",
  solution: "function isString(v) { return typeof v === 'string'; }\nfunction isNumber(v) { return typeof v === 'number'; }\nfunction isBoolean(v) { return typeof v === 'boolean'; }\nfunction isNull(v) { return v === null; }\nfunction isUndefined(v) { return v === undefined; }",
  harness: "\nfunction solve(input) {\n  const fns = { isString, isNumber, isBoolean, isNull, isUndefined };\n  return fns[input.fn](input.value);\n}",
  tests: [
  {
    "id": "str",
    "description": "isString",
    "input": {
      "fn": "isString",
      "value": "hi"
    },
    "expected": true,
    "isHidden": false
  },
  {
    "id": "num",
    "description": "isNumber",
    "input": {
      "fn": "isNumber",
      "value": 42
    },
    "expected": true,
    "isHidden": false
  },
  {
    "id": "null",
    "description": "isNull",
    "input": {
      "fn": "isNull",
      "value": null
    },
    "expected": true,
    "isHidden": false
  },
  {
    "id": "h1",
    "description": "isBoolean",
    "input": {
      "fn": "isBoolean",
      "value": true
    },
    "expected": true,
    "isHidden": true
  },
  {
    "id": "h2",
    "description": "isUndefined",
    "input": {
      "fn": "isUndefined"
    },
    "expected": true,
    "isHidden": true
  },
  {
    "id": "h3",
    "description": "isNumber false for string",
    "input": {
      "fn": "isNumber",
      "value": "42"
    },
    "expected": false,
    "isHidden": true
  }
],
};
