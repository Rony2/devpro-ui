export const problem = {
  slug: "k-closest-points-to-origin",  category: "grind-75",
  title: "K Closest Points to Origin",
  difficulty: "medium",
  type: "coding",
  topics: ["Algorithms", "Sorting", "Heap", "Arrays"],
  companies: ["Google", "Meta"],
  estimatedMinutes: 30,
  published: true,
  addedAt: "2026-04-01",
  description: "Implement a function to find the k closest points to the origin.",

  problemMdx: `## Overview

Given an array of points \`points\` where \`points[i] = [xi, yi]\` and an integer \`k\`, return the \`k\` closest points to the origin \`(0, 0)\`. Distance is Euclidean. Return in any order.

## Constraints

- \`1 <= k <= points.length <= 10,000\`
- \`-10,000 <= xi, yi <= 10,000\`

## Examples

\`\`\`js
kClosest([[1,3],[-2,2]], 1);
// => [[-2,2]]  (distance √8 < √10)

kClosest([[3,3],[5,-1],[-2,4]], 2);
// => [[3,3],[-2,4]]
\`\`\`

## Solution

<details>
<summary>Reveal solution</summary>

\`\`\`js
function kClosest(points, k) {
  points.sort((a, b) => (a[0]*a[0] + a[1]*a[1]) - (b[0]*b[0] + b[1]*b[1]));
  return points.slice(0, k);
}
\`\`\`

</details>

## Resources

- [K Closest Points to Origin — LeetCode](https://leetcode.com/problems/k-closest-points-to-origin/)`,

  starterCode: `/**
 * Find the k closest points to the origin.
 * @param {number[][]} points
 * @param {number} k
 * @returns {number[][]}
 */
function kClosest(points, k) {
  // your implementation
}`,

  solution: `function kClosest(points, k) {
  points.sort((a, b) => (a[0]*a[0] + a[1]*a[1]) - (b[0]*b[0] + b[1]*b[1]));
  return points.slice(0, k);
}`,

  harness: `function solve(input) {
  const res = kClosest(input.points.map(p => [...p]), input.k);
  return res.map(p => [...p]).sort((a,b) => (a[0]*a[0]+a[1]*a[1]) - (b[0]*b[0]+b[1]*b[1]) || a[0]-b[0] || a[1]-b[1]);
}`,

  tests: [
    { id: "basic", description: "k=1 from two points", input: { points: [[1,3],[-2,2]], k: 1 }, expected: [[-2,2]], isHidden: false },
    { id: "k2", description: "k=2 from three points", input: { points: [[3,3],[5,-1],[-2,4]], k: 2 }, expected: [[-2,4],[3,3]], isHidden: false },
    { id: "all", description: "k equals total points", input: { points: [[1,1],[2,2]], k: 2 }, expected: [[1,1],[2,2]], isHidden: false },
    { id: "origin", description: "Point at origin", input: { points: [[0,0],[1,1]], k: 1 }, expected: [[0,0]], isHidden: true },
    { id: "single", description: "Single point", input: { points: [[3,4]], k: 1 }, expected: [[3,4]], isHidden: true },
    { id: "negatives", description: "Negative coordinates", input: { points: [[-1,-1],[2,2],[-3,0]], k: 2 }, expected: [[-1,-1],[2,2]], isHidden: true },
  ],
};
