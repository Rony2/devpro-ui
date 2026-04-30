export const problem = {
  slug: "type-utilities-ii",  category: "js-75",
  title: "Type Utilities II",
  difficulty: "easy",
  type: "coding",
  topics: ["JavaScript","Types","Functions"],
  companies: ["Google","Meta","Amazon"],
  estimatedMinutes: 10,
  published: true,
  addedAt: "2026-04-01",
  description: "Implement utilities to determine non-primitive variable types in JavaScript.",
  problemMdx: "## Overview\n\nImplement `isArray`, `isFunction`, `isObject` (not null/array), `isPlainObject`.\n\n## Examples\n\n```js\nisArray([]); // true\nisObject({}); // true\nisObject(null); // false\n```\n\n## Solution\n\n<details>\n<summary>Reveal solution</summary>\n\n\`\`\`js\nfunction isArray(v) { return Array.isArray(v); }\nfunction isFunction(v) { return typeof v === 'function'; }\nfunction isObject(v) { return typeof v === 'object' && v !== null && !Array.isArray(v); }\nfunction isPlainObject(v) { if (typeof v !== 'object' || v === null) return false; const p = Object.getPrototypeOf(v); return p === Object.prototype || p === null; }\n\`\`\`\n\n</details>",
  starterCode: "function isArray(value) { /* implement */ }\nfunction isFunction(value) { /* implement */ }\nfunction isObject(value) { /* implement */ }\nfunction isPlainObject(value) { /* implement */ }",
  solution: "function isArray(v) { return Array.isArray(v); }\nfunction isFunction(v) { return typeof v === 'function'; }\nfunction isObject(v) { return typeof v === 'object' && v !== null && !Array.isArray(v); }\nfunction isPlainObject(v) { if (typeof v !== 'object' || v === null) return false; const p = Object.getPrototypeOf(v); return p === Object.prototype || p === null; }",
  harness: "\nfunction solve(input) {\n  const fns = { isArray, isFunction, isObject, isPlainObject };\n  const val = input.valueType === 'array' ? [] : input.valueType === 'object' ? {} : input.valueType === 'null' ? null : input.valueType === 'function' ? function(){} : input.valueType === 'number' ? 42 : input.value;\n  return fns[input.fn](val);\n}",
  tests: [
  {
    "id": "arr",
    "description": "isArray",
    "input": {
      "fn": "isArray",
      "valueType": "array"
    },
    "expected": true,
    "isHidden": false
  },
  {
    "id": "fn",
    "description": "isFunction",
    "input": {
      "fn": "isFunction",
      "valueType": "function"
    },
    "expected": true,
    "isHidden": false
  },
  {
    "id": "obj",
    "description": "isObject",
    "input": {
      "fn": "isObject",
      "valueType": "object"
    },
    "expected": true,
    "isHidden": false
  },
  {
    "id": "h1",
    "description": "null not object",
    "input": {
      "fn": "isObject",
      "valueType": "null"
    },
    "expected": false,
    "isHidden": true
  },
  {
    "id": "h2",
    "description": "array not object",
    "input": {
      "fn": "isObject",
      "valueType": "array"
    },
    "expected": false,
    "isHidden": true
  },
  {
    "id": "h3",
    "description": "isPlainObject",
    "input": {
      "fn": "isPlainObject",
      "valueType": "object"
    },
    "expected": true,
    "isHidden": true
  }
],
};
