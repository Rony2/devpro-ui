export const problem = {
  slug: "deep-clone-ii",  category: "js-75",
  title: "Deep Clone II",
  difficulty: "hard",
  type: "coding",
  topics: ["JavaScript","Objects","Recursion"],
  companies: ["Google","Meta","Stripe"],
  estimatedMinutes: 45,
  published: true,
  addedAt: "2026-04-01",
  description: "Implement deep clone supporting circular references, Map, Set, Date, and RegExp.",
  problemMdx: "## Overview\n\nImplement `deepClone(value)` handling:\n- Circular references\n- `Date`, `RegExp`, `Map`, `Set`\n- Nested objects and arrays\n\n## Constraints\n\n- Must not enter infinite loops on circular refs\n- Preserve prototypes of built-in types\n\n## Examples\n\n```js\nconst obj = { a: new Date(), b: /test/gi };\nconst clone = deepClone(obj);\nclone.a !== obj.a; // true, different instances\n```\n\n## Solution\n\n<details>\n<summary>Reveal solution</summary>\n\n\`\`\`js\nfunction deepClone(value, seen = new Map()) {\n  if (value === null || typeof value !== 'object') return value;\n  if (seen.has(value)) return seen.get(value);\n  if (value instanceof Date) return new Date(value.getTime());\n  if (value instanceof RegExp) return new RegExp(value.source, value.flags);\n  if (value instanceof Map) {\n    const m = new Map();\n    seen.set(value, m);\n    value.forEach((v, k) => m.set(deepClone(k, seen), deepClone(v, seen)));\n    return m;\n  }\n  if (value instanceof Set) {\n    const s = new Set();\n    seen.set(value, s);\n    value.forEach(v => s.add(deepClone(v, seen)));\n    return s;\n  }\n  const result = Array.isArray(value) ? [] : {};\n  seen.set(value, result);\n  for (const key of Object.keys(value)) result[key] = deepClone(value[key], seen);\n  return result;\n}\n\`\`\`\n\n</details>",
  starterCode: "/**\n * Advanced deep clone with special type support.\n * @param {*} value\n * @returns {*}\n */\nfunction deepClone(value) {\n  // your implementation\n}",
  solution: "function deepClone(value, seen = new Map()) {\n  if (value === null || typeof value !== 'object') return value;\n  if (seen.has(value)) return seen.get(value);\n  if (value instanceof Date) return new Date(value.getTime());\n  if (value instanceof RegExp) return new RegExp(value.source, value.flags);\n  if (value instanceof Map) {\n    const m = new Map();\n    seen.set(value, m);\n    value.forEach((v, k) => m.set(deepClone(k, seen), deepClone(v, seen)));\n    return m;\n  }\n  if (value instanceof Set) {\n    const s = new Set();\n    seen.set(value, s);\n    value.forEach(v => s.add(deepClone(v, seen)));\n    return s;\n  }\n  const result = Array.isArray(value) ? [] : {};\n  seen.set(value, result);\n  for (const key of Object.keys(value)) result[key] = deepClone(value[key], seen);\n  return result;\n}",
  harness: "\nfunction solve(input) {\n  if (input.type === 'circular') {\n    const obj = { a: 1 }; obj.self = obj;\n    const cloned = deepClone(obj);\n    return { a: cloned.a, hasSelf: cloned.self === cloned, isNew: cloned !== obj };\n  }\n  if (input.type === 'date') {\n    const d = new Date(input.value);\n    const cloned = deepClone({ d });\n    return { time: cloned.d.getTime(), isDate: cloned.d instanceof Date };\n  }\n  if (input.type === 'nested') {\n    const cloned = deepClone(input.value);\n    return { cloned, match: JSON.stringify(cloned) === JSON.stringify(input.value) };\n  }\n  return deepClone(input.value);\n}",
  tests: [
  {
    "id": "circular",
    "description": "Circular reference",
    "input": {
      "type": "circular"
    },
    "expected": {
      "a": 1,
      "hasSelf": true,
      "isNew": true
    },
    "isHidden": false
  },
  {
    "id": "date",
    "description": "Date cloning",
    "input": {
      "type": "date",
      "value": "2024-01-01T00:00:00.000Z"
    },
    "expected": {
      "time": 1704067200000,
      "isDate": true
    },
    "isHidden": false
  },
  {
    "id": "nested",
    "description": "Nested objects",
    "input": {
      "type": "nested",
      "value": {
        "a": {
          "b": {
            "c": 1
          }
        },
        "d": [
          1,
          2
        ]
      }
    },
    "expected": {
      "cloned": {
        "a": {
          "b": {
            "c": 1
          }
        },
        "d": [
          1,
          2
        ]
      },
      "match": true
    },
    "isHidden": false
  },
  {
    "id": "h1",
    "description": "Primitive passthrough",
    "input": {
      "type": "nested",
      "value": 42
    },
    "expected": {
      "cloned": 42,
      "match": true
    },
    "isHidden": true
  },
  {
    "id": "h2",
    "description": "Array of objects",
    "input": {
      "type": "nested",
      "value": [
        {
          "a": 1
        },
        {
          "b": 2
        }
      ]
    },
    "expected": {
      "cloned": [
        {
          "a": 1
        },
        {
          "b": 2
        }
      ],
      "match": true
    },
    "isHidden": true
  },
  {
    "id": "h3",
    "description": "Null handling",
    "input": {
      "type": "nested",
      "value": {
        "a": null,
        "b": {
          "c": null
        }
      }
    },
    "expected": {
      "cloned": {
        "a": null,
        "b": {
          "c": null
        }
      },
      "match": true
    },
    "isHidden": true
  }
],
};
