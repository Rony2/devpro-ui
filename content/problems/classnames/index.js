export const problem = {
  slug: "classnames",  category: "js-75",
  title: "Classnames",
  difficulty: "medium",
  type: "coding",
  topics: ["JavaScript","Strings","Objects"],
  companies: ["Meta","Vercel","Shopify"],
  estimatedMinutes: 25,
  published: true,
  addedAt: "2026-04-01",
  description: "Implement a function that conditionally joins class names together.",
  problemMdx: "## Overview\n\nImplement `classnames(...args)` that joins class names. Supports strings, objects (keys with truthy values), and arrays.\n\n## Examples\n\n```js\nclassnames('foo', { bar: true, baz: false }, 'qux'); // 'foo bar qux'\nclassnames('a', ['b', { c: true }]); // 'a b c'\n```\n\n## Solution\n\n<details>\n<summary>Reveal solution</summary>\n\n\`\`\`js\nfunction classnames(...args) {\n  const classes = [];\n  for (const arg of args) {\n    if (!arg) continue;\n    if (typeof arg === 'string') classes.push(arg);\n    else if (Array.isArray(arg)) classes.push(classnames(...arg));\n    else if (typeof arg === 'object') {\n      for (const [k, v] of Object.entries(arg)) { if (v) classes.push(k); }\n    }\n  }\n  return classes.filter(Boolean).join(' ');\n}\n\`\`\`\n\n</details>",
  starterCode: "/**\n * Conditionally join class names.\n * @param {...*} args\n * @returns {string}\n */\nfunction classnames(...args) {\n  // your implementation\n}",
  solution: "function classnames(...args) {\n  const classes = [];\n  for (const arg of args) {\n    if (!arg) continue;\n    if (typeof arg === 'string') classes.push(arg);\n    else if (Array.isArray(arg)) classes.push(classnames(...arg));\n    else if (typeof arg === 'object') {\n      for (const [k, v] of Object.entries(arg)) { if (v) classes.push(k); }\n    }\n  }\n  return classes.filter(Boolean).join(' ');\n}",
  harness: "\nfunction solve(input) { return classnames(...input.args); }",
  tests: [
  {
    "id": "strings",
    "description": "String args",
    "input": {
      "args": [
        "foo",
        "bar"
      ]
    },
    "expected": "foo bar",
    "isHidden": false
  },
  {
    "id": "objects",
    "description": "Object args",
    "input": {
      "args": [
        "foo",
        {
          "bar": true,
          "baz": false
        },
        "qux"
      ]
    },
    "expected": "foo bar qux",
    "isHidden": false
  },
  {
    "id": "arrays",
    "description": "Array args",
    "input": {
      "args": [
        "a",
        [
          "b",
          {
            "c": true
          }
        ]
      ]
    },
    "expected": "a b c",
    "isHidden": false
  },
  {
    "id": "h1",
    "description": "All falsey",
    "input": {
      "args": [
        null,
        null,
        false,
        ""
      ]
    },
    "expected": "",
    "isHidden": true
  },
  {
    "id": "h2",
    "description": "Mixed complex",
    "input": {
      "args": [
        "x",
        {
          "y": 1,
          "z": 0
        },
        [
          "w",
          {
            "v": true
          }
        ]
      ]
    },
    "expected": "x y w v",
    "isHidden": true
  },
  {
    "id": "h3",
    "description": "Only object",
    "input": {
      "args": [
        {
          "active": true,
          "disabled": false,
          "visible": true
        }
      ]
    },
    "expected": "active visible",
    "isHidden": true
  }
],
};
