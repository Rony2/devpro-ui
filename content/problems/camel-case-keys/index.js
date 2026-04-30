export const problem = {
  slug: "camel-case-keys",  category: "js-75",
  title: "Camel Case Keys",
  difficulty: "medium",
  type: "coding",
  topics: ["JavaScript","Objects","Strings"],
  companies: ["Google","Meta","Amazon"],
  estimatedMinutes: 25,
  published: true,
  addedAt: "2026-04-01",
  description: "Implement a function that converts all object keys to camelCase.",
  problemMdx: "## Overview\n\nImplement `camelCaseKeys(object)` that deeply converts all keys from snake_case to camelCase.\n\n## Examples\n\n```js\ncamelCaseKeys({ user_name: 'John', user_info: { first_name: 'John' }});\n// { userName: 'John', userInfo: { firstName: 'John' }}\n```\n\n## Solution\n\n<details>\n<summary>Reveal solution</summary>\n\n\`\`\`js\nfunction camelCaseKeys(value) {\n  if (value === null || typeof value !== 'object') return value;\n  if (Array.isArray(value)) return value.map(item => camelCaseKeys(item));\n  const result = {};\n  for (const [k, v] of Object.entries(value)) {\n    const camel = k.replace(/_([a-z])/g, (_, c) => c.toUpperCase());\n    result[camel] = camelCaseKeys(v);\n  }\n  return result;\n}\n\`\`\`\n\n</details>",
  starterCode: "/**\n * Convert object keys to camelCase.\n * @param {*} value\n * @returns {*}\n */\nfunction camelCaseKeys(value) {\n  // your implementation\n}",
  solution: "function camelCaseKeys(value) {\n  if (value === null || typeof value !== 'object') return value;\n  if (Array.isArray(value)) return value.map(item => camelCaseKeys(item));\n  const result = {};\n  for (const [k, v] of Object.entries(value)) {\n    const camel = k.replace(/_([a-z])/g, (_, c) => c.toUpperCase());\n    result[camel] = camelCaseKeys(v);\n  }\n  return result;\n}",
  harness: "\nfunction solve(input) { return camelCaseKeys(input.value); }",
  tests: [
  {
    "id": "basic",
    "description": "Snake to camel",
    "input": {
      "value": {
        "user_name": "John",
        "age": 30
      }
    },
    "expected": {
      "userName": "John",
      "age": 30
    },
    "isHidden": false
  },
  {
    "id": "nested",
    "description": "Nested objects",
    "input": {
      "value": {
        "user_info": {
          "first_name": "John",
          "last_name": "Doe"
        }
      }
    },
    "expected": {
      "userInfo": {
        "firstName": "John",
        "lastName": "Doe"
      }
    },
    "isHidden": false
  },
  {
    "id": "array",
    "description": "With arrays",
    "input": {
      "value": {
        "items": [
          {
            "item_name": "a"
          },
          {
            "item_name": "b"
          }
        ]
      }
    },
    "expected": {
      "items": [
        {
          "itemName": "a"
        },
        {
          "itemName": "b"
        }
      ]
    },
    "isHidden": false
  },
  {
    "id": "h1",
    "description": "Already camel",
    "input": {
      "value": {
        "userName": "test"
      }
    },
    "expected": {
      "userName": "test"
    },
    "isHidden": true
  },
  {
    "id": "h2",
    "description": "Deep nesting",
    "input": {
      "value": {
        "a_b": {
          "c_d": {
            "e_f": 1
          }
        }
      }
    },
    "expected": {
      "aB": {
        "cD": {
          "eF": 1
        }
      }
    },
    "isHidden": true
  },
  {
    "id": "h3",
    "description": "Empty",
    "input": {
      "value": {}
    },
    "expected": {},
    "isHidden": true
  }
],
};
