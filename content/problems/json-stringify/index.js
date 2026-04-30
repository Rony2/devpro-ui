export const problem = {
  slug: "json-stringify",  category: "js-75",
  title: "JSON Stringify",
  difficulty: "medium",
  type: "coding",
  topics: ["JavaScript","Recursion","Strings"],
  companies: ["Google","Amazon"],
  estimatedMinutes: 25,
  published: true,
  addedAt: "2026-04-01",
  description: "Implement a simplified version of JSON.stringify().",
  problemMdx: "## Overview\n\nImplement `jsonStringify(value)` that serializes a value to a JSON string.\n\n## Constraints\n\n- Handle: strings, numbers, booleans, null, arrays, plain objects\n- Do not use `JSON.stringify`\n- Strings must be double-quoted\n\n## Examples\n\n```js\njsonStringify({ a: 1, b: 'hello' }); // '{\"a\":1,\"b\":\"hello\"}'\njsonStringify([1, null, true]); // '[1,null,true]'\n```\n\n## Solution\n\n<details>\n<summary>Reveal solution</summary>\n\n\`\`\`js\nfunction jsonStringify(value) {\n  if (value === null) return 'null';\n  if (typeof value === 'boolean') return value ? 'true' : 'false';\n  if (typeof value === 'number') return String(value);\n  if (typeof value === 'string') return '\"' + value.replace(/\\\\/g,'\\\\\\\\').replace(/\"/g,'\\\\\"') + '\"';\n  if (Array.isArray(value)) return '[' + value.map(v => jsonStringify(v)).join(',') + ']';\n  if (typeof value === 'object') {\n    const pairs = Object.keys(value).map(k => jsonStringify(k) + ':' + jsonStringify(value[k]));\n    return '{' + pairs.join(',') + '}';\n  }\n  return undefined;\n}\n\`\`\`\n\n</details>",
  starterCode: "/**\n * Simplified JSON.stringify.\n * @param {*} value\n * @returns {string}\n */\nfunction jsonStringify(value) {\n  // your implementation\n}",
  solution: "function jsonStringify(value) {\n  if (value === null) return 'null';\n  if (typeof value === 'boolean') return value ? 'true' : 'false';\n  if (typeof value === 'number') return String(value);\n  if (typeof value === 'string') return '\"' + value.replace(/\\\\/g,'\\\\\\\\').replace(/\"/g,'\\\\\"') + '\"';\n  if (Array.isArray(value)) return '[' + value.map(v => jsonStringify(v)).join(',') + ']';\n  if (typeof value === 'object') {\n    const pairs = Object.keys(value).map(k => jsonStringify(k) + ':' + jsonStringify(value[k]));\n    return '{' + pairs.join(',') + '}';\n  }\n  return undefined;\n}",
  harness: "\nfunction solve(input) {\n  const result = jsonStringify(input.value);\n  return JSON.parse(result);\n}",
  tests: [
  {
    "id": "object",
    "description": "Object",
    "input": {
      "value": {
        "a": 1,
        "b": "hello"
      }
    },
    "expected": {
      "a": 1,
      "b": "hello"
    },
    "isHidden": false
  },
  {
    "id": "array",
    "description": "Array",
    "input": {
      "value": [
        1,
        null,
        true
      ]
    },
    "expected": [
      1,
      null,
      true
    ],
    "isHidden": false
  },
  {
    "id": "string",
    "description": "String",
    "input": {
      "value": "test"
    },
    "expected": "test",
    "isHidden": false
  },
  {
    "id": "h1",
    "description": "Nested",
    "input": {
      "value": {
        "a": {
          "b": [
            1,
            2
          ]
        }
      }
    },
    "expected": {
      "a": {
        "b": [
          1,
          2
        ]
      }
    },
    "isHidden": true
  },
  {
    "id": "h2",
    "description": "Boolean",
    "input": {
      "value": false
    },
    "expected": false,
    "isHidden": true
  },
  {
    "id": "h3",
    "description": "Number",
    "input": {
      "value": 42
    },
    "expected": 42,
    "isHidden": true
  }
],
};
