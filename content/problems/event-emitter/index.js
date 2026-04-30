export const problem = {
  slug: "event-emitter",  category: "js-75",
  title: "Event Emitter",
  difficulty: "medium",
  type: "coding",
  topics: ["JavaScript","Design Patterns","Classes"],
  companies: ["Meta","Google","Stripe"],
  estimatedMinutes: 25,
  published: true,
  addedAt: "2026-04-01",
  description: "Implement an EventEmitter class with on, off, emit, and once methods.",
  problemMdx: "## Overview\n\nImplement an `EventEmitter` class:\n- `on(event, listener)` — register listener\n- `off(event, listener)` — remove listener\n- `emit(event, ...args)` — call all listeners for event\n- `once(event, listener)` — listener fires only once\n\n## Examples\n\n```js\nconst emitter = new EventEmitter();\nemitter.on('data', val => console.log(val));\nemitter.emit('data', 42); // logs 42\n```\n\n## Solution\n\n<details>\n<summary>Reveal solution</summary>\n\n\`\`\`js\nclass EventEmitter {\n  constructor() { this.events = new Map(); }\n  on(event, listener) {\n    if (!this.events.has(event)) this.events.set(event, []);\n    this.events.get(event).push(listener);\n    return this;\n  }\n  off(event, listener) {\n    const listeners = this.events.get(event);\n    if (listeners) this.events.set(event, listeners.filter(l => l !== listener && l._original !== listener));\n    return this;\n  }\n  emit(event, ...args) {\n    const listeners = this.events.get(event) || [];\n    listeners.forEach(l => l(...args));\n    return this;\n  }\n  once(event, listener) {\n    const wrapper = (...args) => { this.off(event, wrapper); listener(...args); };\n    wrapper._original = listener;\n    return this.on(event, wrapper);\n  }\n}\n\`\`\`\n\n</details>",
  starterCode: "/**\n * Event Emitter implementation.\n */\nclass EventEmitter {\n  constructor() {\n    // your implementation\n  }\n\n  on(event, listener) {\n    // your implementation\n  }\n\n  off(event, listener) {\n    // your implementation\n  }\n\n  emit(event, ...args) {\n    // your implementation\n  }\n\n  once(event, listener) {\n    // your implementation\n  }\n}",
  solution: "class EventEmitter {\n  constructor() { this.events = new Map(); }\n  on(event, listener) {\n    if (!this.events.has(event)) this.events.set(event, []);\n    this.events.get(event).push(listener);\n    return this;\n  }\n  off(event, listener) {\n    const listeners = this.events.get(event);\n    if (listeners) this.events.set(event, listeners.filter(l => l !== listener && l._original !== listener));\n    return this;\n  }\n  emit(event, ...args) {\n    const listeners = this.events.get(event) || [];\n    listeners.forEach(l => l(...args));\n    return this;\n  }\n  once(event, listener) {\n    const wrapper = (...args) => { this.off(event, wrapper); listener(...args); };\n    wrapper._original = listener;\n    return this.on(event, wrapper);\n  }\n}",
  harness: "\nfunction solve(input) {\n  const emitter = new EventEmitter();\n  const log = [];\n  const ops = input.operations;\n  const listeners = {};\n  for (const op of ops) {\n    if (op.type === 'on') { const fn = (...args) => log.push({ event: op.event, args }); listeners[op.listenerId] = fn; emitter.on(op.event, fn); }\n    else if (op.type === 'once') { const fn = (...args) => log.push({ event: op.event, args }); listeners[op.listenerId] = fn; emitter.once(op.event, fn); }\n    else if (op.type === 'off') { emitter.off(op.event, listeners[op.listenerId]); }\n    else if (op.type === 'emit') { emitter.emit(op.event, ...op.args); }\n  }\n  return log;\n}",
  tests: [
  {
    "id": "on-emit",
    "description": "on + emit",
    "input": {
      "operations": [
        {
          "type": "on",
          "event": "data",
          "listenerId": "l1"
        },
        {
          "type": "emit",
          "event": "data",
          "args": [
            42
          ]
        },
        {
          "type": "emit",
          "event": "data",
          "args": [
            99
          ]
        }
      ]
    },
    "expected": [
      {
        "event": "data",
        "args": [
          42
        ]
      },
      {
        "event": "data",
        "args": [
          99
        ]
      }
    ],
    "isHidden": false
  },
  {
    "id": "once",
    "description": "once fires once",
    "input": {
      "operations": [
        {
          "type": "once",
          "event": "ping",
          "listenerId": "l1"
        },
        {
          "type": "emit",
          "event": "ping",
          "args": [
            1
          ]
        },
        {
          "type": "emit",
          "event": "ping",
          "args": [
            2
          ]
        }
      ]
    },
    "expected": [
      {
        "event": "ping",
        "args": [
          1
        ]
      }
    ],
    "isHidden": false
  },
  {
    "id": "off",
    "description": "off removes listener",
    "input": {
      "operations": [
        {
          "type": "on",
          "event": "x",
          "listenerId": "l1"
        },
        {
          "type": "emit",
          "event": "x",
          "args": [
            1
          ]
        },
        {
          "type": "off",
          "event": "x",
          "listenerId": "l1"
        },
        {
          "type": "emit",
          "event": "x",
          "args": [
            2
          ]
        }
      ]
    },
    "expected": [
      {
        "event": "x",
        "args": [
          1
        ]
      }
    ],
    "isHidden": false
  },
  {
    "id": "h1",
    "description": "Multiple listeners",
    "input": {
      "operations": [
        {
          "type": "on",
          "event": "e",
          "listenerId": "l1"
        },
        {
          "type": "on",
          "event": "e",
          "listenerId": "l2"
        },
        {
          "type": "emit",
          "event": "e",
          "args": [
            5
          ]
        }
      ]
    },
    "expected": [
      {
        "event": "e",
        "args": [
          5
        ]
      },
      {
        "event": "e",
        "args": [
          5
        ]
      }
    ],
    "isHidden": true
  },
  {
    "id": "h2",
    "description": "No listeners",
    "input": {
      "operations": [
        {
          "type": "emit",
          "event": "none",
          "args": [
            1
          ]
        }
      ]
    },
    "expected": [],
    "isHidden": true
  },
  {
    "id": "h3",
    "description": "Once + off",
    "input": {
      "operations": [
        {
          "type": "once",
          "event": "z",
          "listenerId": "l1"
        },
        {
          "type": "off",
          "event": "z",
          "listenerId": "l1"
        },
        {
          "type": "emit",
          "event": "z",
          "args": [
            1
          ]
        }
      ]
    },
    "expected": [],
    "isHidden": true
  }
],
};
