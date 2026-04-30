export const problem = {
  // ── Meta ────────────────────────────────────────────────────
  slug: "promise-all-polyfill",  category: "js-75",
  title: "Polyfill Promise.all",
  difficulty: "hard",
  type: "coding",
  topics: ["JavaScript", "Promises", "Async"],
  companies: ["Google", "Meta", "Stripe", "Vercel"],
  estimatedMinutes: 35,
  published: true,
  addedAt: "2026-03-31",
  description:
    "Implement a polyfill for Promise.all that resolves with an ordered array of results or rejects on the first failure.",

  // ── Problem description (MDX) ──────────────────────────────
  problemMdx: `## Overview

\`Promise.all\` takes an iterable of promises and returns a single promise that:

- **Resolves** with an array of all fulfilled values (in input order) once every promise settles successfully.
- **Rejects** immediately with the reason of the first promise that rejects.

Implement \`promiseAll(promises)\` that behaves identically to the native \`Promise.all\`, including handling non-promise values in the input array.

## Constraints

- Input is always an array (may contain promises, thenables, or plain values).
- Resolved values must preserve the original index order, not settlement order.
- Must reject with the **first** rejection reason — ignore later rejections.
- An empty array input should resolve immediately with \`[]\`.
- Do not use \`Promise.all\`, \`Promise.allSettled\`, or \`Promise.race\` internally.

## Examples

\`\`\`js
// Resolved example.
const p0 = Promise.resolve(3);
const p1 = 42;
const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('foo');
  }, 100);
});

await promiseAll([p0, p1, p2]); // [3, 42, 'foo']
\`\`\`

\`\`\`js
// Rejection example.
const p0 = Promise.resolve(30);
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('An error occurred!');
  }, 100);
});

try {
  await promiseAll([p0, p1]);
} catch (err) {
  console.log(err); // 'An error occurred!'
}
\`\`\`

## Notes

- Non-promise values should be treated as \`Promise.resolve(value)\`.
- The order of resolution does not matter — only the final array order must match input order.
- Think carefully about the counter: when do you know all promises are done?

## Solution

<details>
<summary>Reveal solution</summary>

\`\`\`js
function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    if (promises.length === 0) {
      resolve([]);
      return;
    }

    const results = new Array(promises.length);
    let settled = 0;

    promises.forEach((item, index) => {
      Promise.resolve(item).then(
        (value) => {
          results[index] = value;
          settled += 1;
          if (settled === promises.length) {
            resolve(results);
          }
        },
        (reason) => {
          reject(reason);
        },
      );
    });
  });
}
\`\`\`

</details>

## Resources

- [Promise.all — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)
- [Promises/A+ Spec](https://promisesaplus.com/)
- [JavaScript Promise Combinators](https://v8.dev/features/promise-combinators)`,

  // ── Starter code ───────────────────────────────────────────
  starterCode: `/**
 * Implement Promise.all from scratch.
 *
 * @param {Array<any>} promises - Array of promises or plain values
 * @returns {Promise<any[]>} Resolves with ordered results or rejects on first failure
 */
function promiseAll(promises) {
  // your implementation
}`,

  // ── Solution (server-only, never sent to client) ───────────
  solution: `function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    if (promises.length === 0) {
      resolve([]);
      return;
    }

    const results = new Array(promises.length);
    let settled = 0;

    promises.forEach((item, index) => {
      Promise.resolve(item).then(
        (value) => {
          results[index] = value;
          settled += 1;
          if (settled === promises.length) {
            resolve(results);
          }
        },
        (reason) => {
          reject(reason);
        },
      );
    });
  });
}`,

  // ── Harness (appended server-side to user code before execution) ──
  harness: `
async function solve(input) {
  const { type, values = [], rejectIndex, rejectReason } = input;
  let items;

  if (type === "empty") {
    items = [];
  } else if (type === "all-resolve") {
    items = values.map((v) => Promise.resolve(v));
  } else if (type === "mixed-values") {
    items = values.map((v, i) => (i % 2 === 0 ? v : Promise.resolve(v)));
  } else if (type === "out-of-order") {
    items = values.map(
      (v, i) => new Promise((res) => setTimeout(() => res(v), (values.length - i) * 10)),
    );
  } else if (type === "first-rejects" || type === "single-reject-among-many") {
    items = values.map((v) => Promise.resolve(v));
    items.splice(rejectIndex, 0, Promise.reject(rejectReason));
  } else {
    items = values.map((v) => Promise.resolve(v));
  }

  try {
    const result = await promiseAll(items);
    return { resolved: true, value: result };
  } catch (reason) {
    return { resolved: false, reason };
  }
}`,

  // ── Test cases ─────────────────────────────────────────────
  tests: [
    {
      id: "all-resolve",
      description: "All promises resolve in order",
      input: { type: "all-resolve", values: [1, 2, 3] },
      expected: { resolved: true, value: [1, 2, 3] },
      isHidden: false,
    },
    {
      id: "first-rejects",
      description: "Rejects with the first rejection reason",
      input: { type: "first-rejects", values: ["ok"], rejectIndex: 1, rejectReason: "fail" },
      expected: { resolved: false, reason: "fail" },
      isHidden: false,
    },
    {
      id: "mixed-values",
      description: "Handles mix of plain values and promises",
      input: { type: "mixed-values", values: [42, "hello", true] },
      expected: { resolved: true, value: [42, "hello", true] },
      isHidden: false,
    },
    {
      id: "hidden-empty-array",
      description: "Empty array resolves to []",
      input: { type: "empty" },
      expected: { resolved: true, value: [] },
      isHidden: true,
    },
    {
      id: "hidden-order-preserved",
      description: "Order preserved regardless of settlement timing",
      input: { type: "out-of-order", values: ["slow", "fast"] },
      expected: { resolved: true, value: ["slow", "fast"] },
      isHidden: true,
    },
    {
      id: "hidden-single-reject-among-many",
      description: "Single rejection among many resolves",
      input: { type: "single-reject-among-many", values: [1, 2, 3, 4, 5], rejectIndex: 2, rejectReason: "boom" },
      expected: { resolved: false, reason: "boom" },
      isHidden: true,
    },
  ],
};
