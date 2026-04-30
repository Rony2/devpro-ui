export const problem = {
  slug: "debounce-enhanced",  category: "js-75",
  title: "Debounce Enhanced",
  difficulty: "medium",
  type: "coding",
  topics: ["JavaScript","Functions","Timing"],
  companies: ["Meta","Vercel","Stripe"],
  estimatedMinutes: 25,
  published: true,
  addedAt: "2026-04-01",
  description: "Implement debounce with cancel and flush capabilities.",
  problemMdx: "## Overview\n\nImplement `debounce(fn, delay)` that returns a debounced function with `.cancel()` and `.flush()` methods.\n\n- `.cancel()` — cancels pending invocation\n- `.flush()` — immediately invokes pending invocation\n\n## Examples\n\n```js\nconst d = debounce(fn, 100);\nd('a'); d('b');\nd.flush(); // immediately calls fn('b')\n```\n\n## Solution\n\n<details>\n<summary>Reveal solution</summary>\n\n\`\`\`js\nfunction debounce(fn, delay) {\n  let timer = null;\n  let lastArgs = null;\n  let lastThis = null;\n  function debounced(...args) {\n    lastArgs = args;\n    lastThis = this;\n    if (timer) clearTimeout(timer);\n    timer = setTimeout(() => { fn.apply(lastThis, lastArgs); timer = null; lastArgs = null; }, delay);\n  }\n  debounced.cancel = () => { if (timer) { clearTimeout(timer); timer = null; lastArgs = null; } };\n  debounced.flush = () => { if (timer) { clearTimeout(timer); timer = null; fn.apply(lastThis, lastArgs); lastArgs = null; } };\n  return debounced;\n}\n\`\`\`\n\n</details>",
  starterCode: "/**\n * Debounce with cancel and flush.\n * @param {Function} fn\n * @param {number} delay\n * @returns {Function}\n */\nfunction debounce(fn, delay) {\n  // your implementation\n}",
  solution: "function debounce(fn, delay) {\n  let timer = null;\n  let lastArgs = null;\n  let lastThis = null;\n  function debounced(...args) {\n    lastArgs = args;\n    lastThis = this;\n    if (timer) clearTimeout(timer);\n    timer = setTimeout(() => { fn.apply(lastThis, lastArgs); timer = null; lastArgs = null; }, delay);\n  }\n  debounced.cancel = () => { if (timer) { clearTimeout(timer); timer = null; lastArgs = null; } };\n  debounced.flush = () => { if (timer) { clearTimeout(timer); timer = null; fn.apply(lastThis, lastArgs); lastArgs = null; } };\n  return debounced;\n}",
  harness: "\nasync function solve(input) {\n  const log = [];\n  const d = debounce((...args) => log.push(args), input.delay);\n  for (const op of input.ops) {\n    if (op.type === 'call') d(...op.args);\n    else if (op.type === 'cancel') d.cancel();\n    else if (op.type === 'flush') d.flush();\n    if (op.wait) await new Promise(r => setTimeout(r, op.wait));\n  }\n  await new Promise(r => setTimeout(r, input.delay + 50));\n  return log;\n}",
  tests: [
  {
    "id": "basic",
    "description": "Debounce multiple calls",
    "input": {
      "delay": 50,
      "ops": [
        {
          "type": "call",
          "args": [
            "a"
          ]
        },
        {
          "type": "call",
          "args": [
            "b"
          ]
        }
      ]
    },
    "expected": [
      [
        "b"
      ]
    ],
    "isHidden": false
  },
  {
    "id": "cancel",
    "description": "Cancel pending",
    "input": {
      "delay": 100,
      "ops": [
        {
          "type": "call",
          "args": [
            "x"
          ]
        },
        {
          "type": "cancel"
        }
      ]
    },
    "expected": [],
    "isHidden": false
  },
  {
    "id": "flush",
    "description": "Flush immediately",
    "input": {
      "delay": 100,
      "ops": [
        {
          "type": "call",
          "args": [
            "y"
          ]
        },
        {
          "type": "flush"
        }
      ]
    },
    "expected": [
      [
        "y"
      ]
    ],
    "isHidden": false
  },
  {
    "id": "h1",
    "description": "Call after cancel",
    "input": {
      "delay": 50,
      "ops": [
        {
          "type": "call",
          "args": [
            "a"
          ]
        },
        {
          "type": "cancel"
        },
        {
          "type": "call",
          "args": [
            "b"
          ]
        }
      ]
    },
    "expected": [
      [
        "b"
      ]
    ],
    "isHidden": true
  },
  {
    "id": "h2",
    "description": "Flush with no pending",
    "input": {
      "delay": 50,
      "ops": [
        {
          "type": "flush"
        }
      ]
    },
    "expected": [],
    "isHidden": true
  },
  {
    "id": "h3",
    "description": "Multiple flushes",
    "input": {
      "delay": 100,
      "ops": [
        {
          "type": "call",
          "args": [
            "z"
          ]
        },
        {
          "type": "flush"
        },
        {
          "type": "call",
          "args": [
            "w"
          ]
        },
        {
          "type": "flush"
        }
      ]
    },
    "expected": [
      [
        "z"
      ],
      [
        "w"
      ]
    ],
    "isHidden": true
  }
],
};
