export const problem = {
  slug: "list-format",  category: "js-75",
  title: "List Format",
  difficulty: "medium",
  type: "coding",
  topics: ["JavaScript","Strings"],
  companies: ["Google","Meta","Amazon"],
  estimatedMinutes: 25,
  published: true,
  addedAt: "2026-04-01",
  description: "Implement a function that formats a list of items into a string with proper grammar.",
  problemMdx: "## Overview\n\nImplement `listFormat(items, options)` — formats an array into a grammatically correct string.\n\n- `{ type: 'conjunction' }` → uses \"and\" (default)\n- `{ type: 'disjunction' }` → uses \"or\"\n\n## Examples\n\n```js\nlistFormat(['a','b','c']); // 'a, b, and c'\nlistFormat(['a','b'], { type: 'disjunction' }); // 'a or b'\n```\n\n## Solution\n\n<details>\n<summary>Reveal solution</summary>\n\n\`\`\`js\nfunction listFormat(items, options) {\n  const word = (options?.type === 'disjunction') ? 'or' : 'and';\n  if (items.length === 0) return '';\n  if (items.length === 1) return items[0];\n  if (items.length === 2) return \`${items[0]} ${word} ${items[1]}\`;\n  return items.slice(0, -1).join(', ') + \`, ${word} \` + items[items.length - 1];\n}\n\`\`\`\n\n</details>",
  starterCode: "/**\n * Format a list into a string.\n * @param {string[]} items\n * @param {{ type?: 'conjunction' | 'disjunction' }} [options]\n * @returns {string}\n */\nfunction listFormat(items, options) {\n  // your implementation\n}",
  solution: "function listFormat(items, options) {\n  const word = (options?.type === 'disjunction') ? 'or' : 'and';\n  if (items.length === 0) return '';\n  if (items.length === 1) return items[0];\n  if (items.length === 2) return `${items[0]} ${word} ${items[1]}`;\n  return items.slice(0, -1).join(', ') + `, ${word} ` + items[items.length - 1];\n}",
  harness: "\nfunction solve(input) { return listFormat(input.items, input.options); }",
  tests: [
  {
    "id": "three-and",
    "description": "Three items, and",
    "input": {
      "items": [
        "a",
        "b",
        "c"
      ],
      "options": {}
    },
    "expected": "a, b, and c",
    "isHidden": false
  },
  {
    "id": "two-or",
    "description": "Two items, or",
    "input": {
      "items": [
        "a",
        "b"
      ],
      "options": {
        "type": "disjunction"
      }
    },
    "expected": "a or b",
    "isHidden": false
  },
  {
    "id": "single",
    "description": "Single item",
    "input": {
      "items": [
        "hello"
      ],
      "options": {}
    },
    "expected": "hello",
    "isHidden": false
  },
  {
    "id": "h1",
    "description": "Empty",
    "input": {
      "items": [],
      "options": {}
    },
    "expected": "",
    "isHidden": true
  },
  {
    "id": "h2",
    "description": "Four items",
    "input": {
      "items": [
        "w",
        "x",
        "y",
        "z"
      ],
      "options": {}
    },
    "expected": "w, x, y, and z",
    "isHidden": true
  },
  {
    "id": "h3",
    "description": "Two and",
    "input": {
      "items": [
        "red",
        "blue"
      ],
      "options": {}
    },
    "expected": "red and blue",
    "isHidden": true
  }
],
};
