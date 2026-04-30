export const problem = {
  // ── Meta ────────────────────────────────────────────────────
  slug: "optimal-stock-trading",  category: "grind-75",
  title: "Optimal Stock Trading",
  difficulty: "easy",
  type: "coding",
  topics: ["Algorithms", "Dynamic Programming", "Arrays"],
  companies: ["Google", "Amazon", "Meta", "Stripe"],
  estimatedMinutes: 25,
  published: true,
  addedAt: "2026-04-01",
  description:
    "Implement a function to find the maximum profit achievable by buying and selling a stock once.",

  // ── Problem description (MDX) ──────────────────────────────
  problemMdx: `## Overview

You are given an array \`prices\` where \`prices[i]\` is the price of a given stock on the \`i\`th day.

You want to maximize your profit by choosing a **single day** to buy and a **different day in the future** to sell. Return the maximum profit you can achieve. If no profit is possible, return \`0\`.

Implement \`maxProfit(prices)\`.

## Constraints

- \`1 ≤ prices.length ≤ 100000\`
- \`0 ≤ prices[i] ≤ 10000\`
- You must buy before you sell (buy day < sell day).
- Only one transaction allowed.
- Aim for $O(n)$ time, $O(1)$ space.

## Examples

\`\`\`js
maxProfit([7, 1, 5, 3, 6, 4]);
// → 5  — buy on day 1 (price 1), sell on day 4 (price 6) → 6 - 1 = 5

maxProfit([7, 6, 4, 3, 1]);
// → 0  — prices only decrease, no profitable transaction

maxProfit([2, 4, 1]);
// → 2  — buy day 0, sell day 1
\`\`\`

## Notes

- Track the minimum price seen so far. At each day, compute the profit if you sold today (\`price - minSoFar\`) and track the global max.
- Single pass, constant space.

## Solution

<details>
<summary>Reveal solution</summary>

\`\`\`js
function maxProfit(prices) {
  let minPrice = Infinity;
  let maxProfit = 0;

  for (const price of prices) {
    if (price < minPrice) {
      minPrice = price;
    } else {
      maxProfit = Math.max(maxProfit, price - minPrice);
    }
  }

  return maxProfit;
}
\`\`\`

</details>

## Resources

- [Best Time to Buy and Sell Stock — LeetCode](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/)`,

  // ── Starter code ───────────────────────────────────────────
  starterCode: `/**
 * Find the maximum profit from one buy-sell transaction.
 *
 * @param {number[]} prices - Stock prices on each day
 * @returns {number} Maximum profit (0 if no profit possible)
 */
function maxProfit(prices) {
  // your implementation
}`,

  // ── Solution (server-only) ─────────────────────────────────
  solution: `function maxProfit(prices) {
  let minPrice = Infinity;
  let maxProfit = 0;

  for (const price of prices) {
    if (price < minPrice) {
      minPrice = price;
    } else {
      maxProfit = Math.max(maxProfit, price - minPrice);
    }
  }

  return maxProfit;
}`,

  // ── Harness ────────────────────────────────────────────────
  harness: `
function solve(input) {
  return maxProfit(input.prices);
}`,

  // ── Test cases ─────────────────────────────────────────────
  tests: [
    {
      id: "basic-profit",
      description: "Buy low sell high for profit 5",
      input: { prices: [7, 1, 5, 3, 6, 4] },
      expected: 5,
      isHidden: false,
    },
    {
      id: "no-profit",
      description: "Decreasing prices — no profit",
      input: { prices: [7, 6, 4, 3, 1] },
      expected: 0,
      isHidden: false,
    },
    {
      id: "early-profit",
      description: "Best trade is early",
      input: { prices: [2, 4, 1] },
      expected: 2,
      isHidden: false,
    },
    {
      id: "hidden-single",
      description: "Single price — no transaction possible",
      input: { prices: [5] },
      expected: 0,
      isHidden: true,
    },
    {
      id: "hidden-same",
      description: "All same prices",
      input: { prices: [3, 3, 3, 3] },
      expected: 0,
      isHidden: true,
    },
    {
      id: "hidden-valley",
      description: "Valley then peak",
      input: { prices: [10, 8, 2, 9, 1, 7] },
      expected: 7,
      isHidden: true,
    },
  ],
};
