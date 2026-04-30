export const problem = {
  slug: "middleware-pipeline",  category: "js-75",
  title: "Middleware Pipeline",
  difficulty: "medium",
  type: "coding",
  topics: ["JavaScript","Design Patterns","Functions"],
  companies: ["Vercel","Stripe","Shopify"],
  estimatedMinutes: 25,
  published: true,
  addedAt: "2026-04-01",
  description: "Implement a middleware pipeline that processes a context object through a series of functions.",
  problemMdx: "## Overview\n\nImplement `createPipeline(middlewares)` that returns an async function processing a context through each middleware sequentially.\n\nEach middleware has the signature `(ctx, next) => {}` — must call `next()` to continue.\n\n## Examples\n\n```js\nconst pipeline = createPipeline([\n  async (ctx, next) => { ctx.x = 1; await next(); },\n  async (ctx, next) => { ctx.y = 2; await next(); },\n]);\nconst ctx = {};\nawait pipeline(ctx); // ctx = { x: 1, y: 2 }\n```\n\n## Solution\n\n<details>\n<summary>Reveal solution</summary>\n\n\`\`\`js\nfunction createPipeline(middlewares) {\n  return async function(ctx) {\n    let index = 0;\n    async function next() {\n      if (index < middlewares.length) {\n        const mw = middlewares[index++];\n        await mw(ctx, next);\n      }\n    }\n    await next();\n    return ctx;\n  };\n}\n\`\`\`\n\n</details>",
  starterCode: "/**\n * Create a middleware pipeline.\n * @param {Function[]} middlewares\n * @returns {Function}\n */\nfunction createPipeline(middlewares) {\n  // your implementation\n}",
  solution: "function createPipeline(middlewares) {\n  return async function(ctx) {\n    let index = 0;\n    async function next() {\n      if (index < middlewares.length) {\n        const mw = middlewares[index++];\n        await mw(ctx, next);\n      }\n    }\n    await next();\n    return ctx;\n  };\n}",
  harness: "\nasync function solve(input) {\n  const mws = input.steps.map(step => {\n    return async (ctx, next) => {\n      ctx[step.key] = step.value;\n      if (step.shouldContinue !== false) await next();\n    };\n  });\n  const pipeline = createPipeline(mws);\n  const ctx = {};\n  await pipeline(ctx);\n  return ctx;\n}",
  tests: [
  {
    "id": "basic",
    "description": "Two middlewares",
    "input": {
      "steps": [
        {
          "key": "a",
          "value": 1
        },
        {
          "key": "b",
          "value": 2
        }
      ]
    },
    "expected": {
      "a": 1,
      "b": 2
    },
    "isHidden": false
  },
  {
    "id": "three",
    "description": "Three middlewares",
    "input": {
      "steps": [
        {
          "key": "x",
          "value": 10
        },
        {
          "key": "y",
          "value": 20
        },
        {
          "key": "z",
          "value": 30
        }
      ]
    },
    "expected": {
      "x": 10,
      "y": 20,
      "z": 30
    },
    "isHidden": false
  },
  {
    "id": "stop",
    "description": "Stops if no next()",
    "input": {
      "steps": [
        {
          "key": "a",
          "value": 1
        },
        {
          "key": "b",
          "value": 2,
          "shouldContinue": false
        },
        {
          "key": "c",
          "value": 3
        }
      ]
    },
    "expected": {
      "a": 1,
      "b": 2
    },
    "isHidden": false
  },
  {
    "id": "h1",
    "description": "Single middleware",
    "input": {
      "steps": [
        {
          "key": "only",
          "value": 42
        }
      ]
    },
    "expected": {
      "only": 42
    },
    "isHidden": true
  },
  {
    "id": "h2",
    "description": "Empty pipeline",
    "input": {
      "steps": []
    },
    "expected": {},
    "isHidden": true
  },
  {
    "id": "h3",
    "description": "Override value",
    "input": {
      "steps": [
        {
          "key": "v",
          "value": 1
        },
        {
          "key": "v",
          "value": 2
        }
      ]
    },
    "expected": {
      "v": 2
    },
    "isHidden": true
  }
],
};
