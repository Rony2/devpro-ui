export const problem = {
  slug: "backbone-model",  category: "js-75",
  title: "Backbone Model",
  difficulty: "hard",
  type: "coding",
  topics: ["JavaScript","Classes","Design Patterns","Events"],
  companies: ["Meta","Google"],
  estimatedMinutes: 45,
  published: true,
  addedAt: "2026-04-01",
  description: "Implement a simplified Backbone-style Model with get, set, and change events.",
  problemMdx: "## Overview\n\nImplement a `Model` class:\n- `get(attr)` — returns attribute value\n- `set(attr, value)` — sets attribute and emits `change:attr` if different\n- `on(event, handler)` — listen for events\n- `off(event, handler)` — remove listener\n\n## Examples\n\n```js\nconst m = new Model({ name: 'Alice' });\nm.on('change:name', (val) => console.log(val));\nm.set('name', 'Bob'); // logs 'Bob'\nm.get('name'); // 'Bob'\n```\n\n## Solution\n\n<details>\n<summary>Reveal solution</summary>\n\n\`\`\`js\nclass Model {\n  constructor(attrs = {}) {\n    this._attrs = { ...attrs };\n    this._events = {};\n  }\n  get(attr) { return this._attrs[attr]; }\n  set(attr, value) {\n    const old = this._attrs[attr];\n    this._attrs[attr] = value;\n    if (old !== value) {\n      const handlers = this._events['change:' + attr] || [];\n      handlers.forEach(h => h(value, old));\n    }\n  }\n  on(event, handler) {\n    if (!this._events[event]) this._events[event] = [];\n    this._events[event].push(handler);\n  }\n  off(event, handler) {\n    if (this._events[event]) this._events[event] = this._events[event].filter(h => h !== handler);\n  }\n}\n\`\`\`\n\n</details>",
  starterCode: "/**\n * Backbone-style Model.\n */\nclass Model {\n  constructor(attrs) {\n    // your implementation\n  }\n  get(attr) { /* ... */ }\n  set(attr, value) { /* ... */ }\n  on(event, handler) { /* ... */ }\n  off(event, handler) { /* ... */ }\n}",
  solution: "class Model {\n  constructor(attrs = {}) {\n    this._attrs = { ...attrs };\n    this._events = {};\n  }\n  get(attr) { return this._attrs[attr]; }\n  set(attr, value) {\n    const old = this._attrs[attr];\n    this._attrs[attr] = value;\n    if (old !== value) {\n      const handlers = this._events['change:' + attr] || [];\n      handlers.forEach(h => h(value, old));\n    }\n  }\n  on(event, handler) {\n    if (!this._events[event]) this._events[event] = [];\n    this._events[event].push(handler);\n  }\n  off(event, handler) {\n    if (this._events[event]) this._events[event] = this._events[event].filter(h => h !== handler);\n  }\n}",
  harness: "\nfunction solve(input) {\n  const m = new Model(input.initial);\n  const log = [];\n  const listeners = {};\n  for (const op of input.ops) {\n    if (op.type === 'on') {\n      const fn = (val, old) => log.push({ event: op.event, val, old });\n      listeners[op.id] = fn;\n      m.on(op.event, fn);\n    } else if (op.type === 'off') {\n      m.off(op.event, listeners[op.id]);\n    } else if (op.type === 'set') {\n      m.set(op.attr, op.value);\n    } else if (op.type === 'get') {\n      log.push({ get: op.attr, value: m.get(op.attr) });\n    }\n  }\n  return log;\n}",
  tests: [
  {
    "id": "basic",
    "description": "Set and change event",
    "input": {
      "initial": {
        "name": "Alice"
      },
      "ops": [
        {
          "type": "on",
          "event": "change:name",
          "id": "l1"
        },
        {
          "type": "set",
          "attr": "name",
          "value": "Bob"
        },
        {
          "type": "get",
          "attr": "name"
        }
      ]
    },
    "expected": [
      {
        "event": "change:name",
        "val": "Bob",
        "old": "Alice"
      },
      {
        "get": "name",
        "value": "Bob"
      }
    ],
    "isHidden": false
  },
  {
    "id": "no-change",
    "description": "Same value no event",
    "input": {
      "initial": {
        "x": 1
      },
      "ops": [
        {
          "type": "on",
          "event": "change:x",
          "id": "l1"
        },
        {
          "type": "set",
          "attr": "x",
          "value": 1
        }
      ]
    },
    "expected": [],
    "isHidden": false
  },
  {
    "id": "off",
    "description": "Off removes listener",
    "input": {
      "initial": {
        "a": 0
      },
      "ops": [
        {
          "type": "on",
          "event": "change:a",
          "id": "l1"
        },
        {
          "type": "set",
          "attr": "a",
          "value": 1
        },
        {
          "type": "off",
          "event": "change:a",
          "id": "l1"
        },
        {
          "type": "set",
          "attr": "a",
          "value": 2
        }
      ]
    },
    "expected": [
      {
        "event": "change:a",
        "val": 1,
        "old": 0
      }
    ],
    "isHidden": false
  },
  {
    "id": "h1",
    "description": "Multiple attrs",
    "input": {
      "initial": {
        "x": 1,
        "y": 2
      },
      "ops": [
        {
          "type": "on",
          "event": "change:x",
          "id": "l1"
        },
        {
          "type": "on",
          "event": "change:y",
          "id": "l2"
        },
        {
          "type": "set",
          "attr": "x",
          "value": 10
        },
        {
          "type": "set",
          "attr": "y",
          "value": 20
        }
      ]
    },
    "expected": [
      {
        "event": "change:x",
        "val": 10,
        "old": 1
      },
      {
        "event": "change:y",
        "val": 20,
        "old": 2
      }
    ],
    "isHidden": true
  },
  {
    "id": "h2",
    "description": "Get initial",
    "input": {
      "initial": {
        "foo": "bar"
      },
      "ops": [
        {
          "type": "get",
          "attr": "foo"
        }
      ]
    },
    "expected": [
      {
        "get": "foo",
        "value": "bar"
      }
    ],
    "isHidden": true
  },
  {
    "id": "h3",
    "description": "New attribute",
    "input": {
      "initial": {},
      "ops": [
        {
          "type": "on",
          "event": "change:z",
          "id": "l1"
        },
        {
          "type": "set",
          "attr": "z",
          "value": 42
        }
      ]
    },
    "expected": [
      {
        "event": "change:z",
        "val": 42
      }
    ],
    "isHidden": true
  }
],
};
