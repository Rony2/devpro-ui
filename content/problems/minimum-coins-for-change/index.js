export const problem = {
  slug: "minimum-coins-for-change",  category: "grind-75",
  title: "Minimum Coins for Change",
  difficulty: "medium",
  type: "coding",
  topics: ["Algorithms", "Dynamic Programming"],
  companies: ["Google", "Stripe", "Meta"],
  estimatedMinutes: 30,
  published: true,
  addedAt: "2026-04-01",
  description:
    "Implement a function to return minimum coins needed to make the given amount.",

  problemMdx: `## Overview

Given an array of coin denominations and a target amount, return the **fewest number of coins** needed to make up that amount. If the amount cannot be made up by any combination of the given coins, return \`-1\`.

You have an infinite supply of each coin denomination.

## Constraints

- \`1 <= coins.length <= 12\`
- \`1 <= coins[i] <= 2^31 - 1\`
- \`0 <= amount <= 10,000\`
- Each coin denomination is a positive integer.
- Coins array may not be sorted.

## Examples

\`\`\`js
minCoins([1, 5, 10, 25], 36);
// => 3  (25 + 10 + 1)
\`\`\`

\`\`\`js
minCoins([2], 3);
// => -1  (impossible with only 2-cent coins)

minCoins([1], 0);
// => 0  (no coins needed for amount 0)
\`\`\`

## Solution

<details>
<summary>Reveal solution</summary>

\`\`\`js
function minCoins(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;

  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (coin <= i && dp[i - coin] + 1 < dp[i]) {
        dp[i] = dp[i - coin] + 1;
      }
    }
  }

  return dp[amount] === Infinity ? -1 : dp[amount];
}
\`\`\`

Classic bottom-up DP. For each amount \`i\`, try subtracting each coin and take the minimum.

</details>

## Resources

- [Coin Change — LeetCode](https://leetcode.com/problems/coin-change/)
- [Dynamic Programming — Wikipedia](https://en.wikipedia.org/wiki/Dynamic_programming)`,

  starterCode: `/**
 * Return the minimum number of coins needed to make the given amount.
 * Return -1 if it's impossible.
 * @param {number[]} coins - array of coin denominations
 * @param {number} amount - target amount
 * @returns {number}
 */
function minCoins(coins, amount) {
  // your implementation
}`,

  solution: `function minCoins(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;

  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (coin <= i && dp[i - coin] + 1 < dp[i]) {
        dp[i] = dp[i - coin] + 1;
      }
    }
  }

  return dp[amount] === Infinity ? -1 : dp[amount];
}`,

  harness: `
function solve(input) {
  return minCoins(input.coins, input.amount);
}`,

  tests: [
    {
      id: "us-coins",
      description: "Standard US coins for 36 cents",
      input: { coins: [1, 5, 10, 25], amount: 36 },
      expected: 3,
      isHidden: false,
    },
    {
      id: "impossible",
      description: "Impossible amount returns -1",
      input: { coins: [2], amount: 3 },
      expected: -1,
      isHidden: false,
    },
    {
      id: "zero-amount",
      description: "Zero amount needs zero coins",
      input: { coins: [1], amount: 0 },
      expected: 0,
      isHidden: false,
    },
    {
      id: "exact-coin",
      description: "Amount equals a single coin",
      input: { coins: [1, 3, 5], amount: 5 },
      expected: 1,
      isHidden: true,
    },
    {
      id: "greedy-fails",
      description: "Greedy approach would fail — needs DP",
      input: { coins: [1, 3, 4], amount: 6 },
      expected: 2,
      isHidden: true,
    },
    {
      id: "large-amount",
      description: "Handles larger amounts efficiently",
      input: { coins: [1, 5, 10, 25], amount: 100 },
      expected: 4,
      isHidden: true,
    },
  ],
};
