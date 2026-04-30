export const problem = {
  slug: "maximum-profit-job-scheduling",  category: "grind-75",
  title: "Maximum Profit in Job Scheduling",
  difficulty: "hard",
  type: "coding",
  topics: ["Algorithms", "Dynamic Programming", "Binary Search", "Sorting"],
  companies: ["Google", "Meta"],
  estimatedMinutes: 45,
  published: true,
  addedAt: "2026-04-01",
  description: "Find the maximum profit you can achieve by scheduling non-overlapping jobs.",

  problemMdx: `## Overview

Given \`n\` jobs where job \`i\` has \`startTime[i]\`, \`endTime[i]\`, and \`profit[i]\`, find the **maximum profit** by selecting non-overlapping jobs. You can start a new job at the moment another ends.

## Constraints

- \`1 <= n <= 50,000\`
- \`1 <= startTime[i] < endTime[i] <= 10^9\`
- \`1 <= profit[i] <= 10,000\`

## Examples

\`\`\`js
jobScheduling([1,2,3,3], [3,4,5,6], [50,10,40,70]);
// => 120 (jobs [1,3]+[3,6] → 50+70)

jobScheduling([1,1,1], [2,3,4], [5,6,4]);
// => 6
\`\`\`

## Solution

<details>
<summary>Reveal solution</summary>

\`\`\`js
function jobScheduling(startTime, endTime, profit) {
  const n = startTime.length;
  const jobs = startTime.map((s, i) => [s, endTime[i], profit[i]]);
  jobs.sort((a, b) => a[1] - b[1]);
  const dp = [0];
  const ends = [0];
  for (const [s, e, p] of jobs) {
    let lo = 0, hi = ends.length - 1;
    while (lo < hi) {
      const mid = (lo + hi + 1) >> 1;
      if (ends[mid] <= s) lo = mid; else hi = mid - 1;
    }
    const take = dp[lo] + p;
    const skip = dp[dp.length - 1];
    dp.push(Math.max(take, skip));
    ends.push(e);
  }
  return dp[dp.length - 1];
}
\`\`\`

Sort by end time, then DP: for each job binary search the latest non-overlapping job.

</details>

## Resources

- [Maximum Profit in Job Scheduling — LeetCode](https://leetcode.com/problems/maximum-profit-in-job-scheduling/)`,

  starterCode: `/**
 * Find maximum profit by scheduling non-overlapping jobs.
 * @param {number[]} startTime
 * @param {number[]} endTime
 * @param {number[]} profit
 * @returns {number}
 */
function jobScheduling(startTime, endTime, profit) {
  // your implementation
}`,

  solution: `function jobScheduling(startTime, endTime, profit) {
  const n = startTime.length;
  const jobs = startTime.map((s, i) => [s, endTime[i], profit[i]]);
  jobs.sort((a, b) => a[1] - b[1]);
  const dp = [0];
  const ends = [0];
  for (const [s, e, p] of jobs) {
    let lo = 0, hi = ends.length - 1;
    while (lo < hi) {
      const mid = (lo + hi + 1) >> 1;
      if (ends[mid] <= s) lo = mid; else hi = mid - 1;
    }
    const take = dp[lo] + p;
    const skip = dp[dp.length - 1];
    dp.push(Math.max(take, skip));
    ends.push(e);
  }
  return dp[dp.length - 1];
}`,

  harness: `function solve(input) { return jobScheduling(input.startTime, input.endTime, input.profit); }`,

  tests: [
    { id: "basic", description: "4 jobs → 120", input: { startTime: [1,2,3,3], endTime: [3,4,5,6], profit: [50,10,40,70] }, expected: 120, isHidden: false },
    { id: "all-overlap", description: "All overlap → pick best", input: { startTime: [1,1,1], endTime: [2,3,4], profit: [5,6,4] }, expected: 6, isHidden: false },
    { id: "chain", description: "Chainable jobs", input: { startTime: [1,3,6], endTime: [3,6,9], profit: [10,20,30] }, expected: 60, isHidden: false },
    { id: "single", description: "Single job", input: { startTime: [1], endTime: [2], profit: [50] }, expected: 50, isHidden: true },
    { id: "skip-middle", description: "Skip middle for better combo", input: { startTime: [1,2,4], endTime: [4,3,5], profit: [3,5,6] }, expected: 11, isHidden: true },
    { id: "same-time", description: "Same start/end", input: { startTime: [1,1], endTime: [2,2], profit: [5,10] }, expected: 10, isHidden: true },
  ],
};
