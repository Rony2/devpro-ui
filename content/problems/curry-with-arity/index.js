export const problem = {
  // ── Meta ────────────────────────────────────────────────────
  slug: "curry-with-arity",  category: "js-75",
  title: "Curry With Arity",
  difficulty: "hard",
  type: "coding",
  topics: ["JavaScript", "Functions", "APIs"],
  companies: ["Vercel", "Stripe"],
  estimatedMinutes: 35,
  published: true,
  addedAt: "2026-03-30",
  description:
    "Implement a generic curry function that collects arguments across multiple calls and invokes the original function once the required arity is met.",

  // ── Problem description (MDX) ──────────────────────────────
  problemMdx: `## Overview

Currying transforms a function that takes multiple arguments into a chain of single-argument (or partial-argument) functions. Your \`curry(fn)\` should return a new function that:

- Collects arguments across successive calls.
- Invokes the original \`fn\` once enough arguments have been accumulated (based on \`fn.length\`).
- Supports passing multiple arguments in a single call (\`curried(1, 2)(3)\`).

This is a common utility in functional programming and a frequently tested concept in senior-level interviews.

## Constraints

- Use \`fn.length\` to determine the target arity.
- Preserve argument order across all calls.
- Once arity is satisfied, invoke \`fn\` immediately and return the result.
- Extra arguments beyond arity should be ignored.
- If \`fn.length\` is 0, invoke \`fn\` immediately on the first call.
- Do not use \`Function.prototype.bind\` internally.

## Examples

\`\`\`js
// Basic currying.
function add(a, b, c) {
  return a + b + c;
}

const curriedAdd = curry(add);
curriedAdd(1)(2)(3);    // 6
curriedAdd(1, 2)(3);    // 6
curriedAdd(1)(2, 3);    // 6
curriedAdd(1, 2, 3);    // 6
\`\`\`

\`\`\`js
// Partial application reuse.
function multiply(a, b) {
  return a * b;
}

const double = curry(multiply)(2);
double(5);  // 10
double(10); // 20
\`\`\`

## Notes

- The key insight is recursion: each call returns a new function if not enough arguments have been collected yet.
- Think about how to track accumulated arguments across calls — closures are your friend.
- \`fn.length\` returns the number of declared parameters (not counting rest params or default values).

## Solution

<details>
<summary>Reveal solution</summary>

\`\`\`js
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn(...args.slice(0, fn.length));
    }
    return function (...next) {
      return curried(...args, ...next);
    };
  };
}
\`\`\`

</details>

## Resources

- [Currying — Wikipedia](https://en.wikipedia.org/wiki/Currying)
- [Function.length — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length)
- [Closures — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)`,

  // ── Starter code ───────────────────────────────────────────
  starterCode: `/**
 * Create a curried version of the provided function.
 * The curried function collects arguments across calls and invokes
 * the original function once fn.length arguments are collected.
 *
 * @param {Function} fn - The function to curry
 * @returns {Function} A curried version of fn
 */
function curry(fn) {
  // your implementation
}`,

  // ── Solution (server-only, never sent to client) ───────────
  solution: `function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn(...args.slice(0, fn.length));
    }
    return function (...next) {
      return curried(...args, ...next);
    };
  };
}`,

  // ── Harness (appended server-side to user code before execution) ──
  harness: `
function solve(input) {
  const { arity, calls } = input;

  // Build a target function with the specified arity
  const params = Array.from({ length: arity }, (_, i) => "a" + i);
  const target = new Function(...params, "return [" + params.join(",") + "]");

  const curried = curry(target);
  let result = curried;

  for (const segment of calls) {
    result = result(...segment);
    // If result is not a function, we got the final value
    if (typeof result !== "function") break;
  }

  return typeof result === "function" ? null : result;
}`,

  // ── Test cases ─────────────────────────────────────────────
  tests: [
    {
      id: "basic-curry",
      description: "Curries across multiple single-arg calls",
      input: { arity: 3, calls: [[1], [2], [3]] },
      expected: [1, 2, 3],
      isHidden: false,
    },
    {
      id: "multi-arg-calls",
      description: "Handles multi-argument partial calls",
      input: { arity: 4, calls: [[1, 2], [3, 4]] },
      expected: [1, 2, 3, 4],
      isHidden: false,
    },
    {
      id: "all-at-once",
      description: "All arguments in a single call",
      input: { arity: 3, calls: [[10, 20, 30]] },
      expected: [10, 20, 30],
      isHidden: false,
    },
    {
      id: "hidden-extra-args",
      description: "Extra arguments beyond arity are ignored",
      input: { arity: 2, calls: [[1, 2, 3, 4]] },
      expected: [1, 2],
      isHidden: true,
    },
    {
      id: "hidden-single-arg-fn",
      description: "Arity of 1 invokes immediately",
      input: { arity: 1, calls: [[42]] },
      expected: [42],
      isHidden: true,
    },
    {
      id: "hidden-many-partial",
      description: "Many partial calls of 1 arg each",
      input: { arity: 5, calls: [[1], [2], [3], [4], [5]] },
      expected: [1, 2, 3, 4, 5],
      isHidden: true,
    },
  ],
};
