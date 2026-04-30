export const problem = {
  slug: "course-dependency",  category: "grind-75",
  title: "Course Dependency",
  difficulty: "medium",
  type: "coding",
  topics: ["Algorithms", "Graphs", "Topological Sort"],
  companies: ["Google", "Meta", "Stripe"],
  estimatedMinutes: 30,
  published: true,
  addedAt: "2026-04-01",
  description:
    "Implement a function to check if all courses can be completed given prerequisites.",

  problemMdx: `## Overview

You are given \`numCourses\` courses labeled from \`0\` to \`numCourses - 1\`, and an array \`prerequisites\` where \`prerequisites[i] = [a, b]\` means you must take course \`b\` before course \`a\`.

Return \`true\` if it is possible to finish all courses, or \`false\` if there is a circular dependency.

## Constraints

- \`1 <= numCourses <= 2000\`
- \`0 <= prerequisites.length <= 5000\`
- \`prerequisites[i].length === 2\`
- \`0 <= prerequisites[i][0], prerequisites[i][1] < numCourses\`
- All prerequisite pairs are unique.

## Examples

\`\`\`js
canFinish(2, [[1, 0]]);
// => true  (take course 0 first, then course 1)
\`\`\`

\`\`\`js
canFinish(2, [[1, 0], [0, 1]]);
// => false  (circular dependency)

canFinish(4, [[1, 0], [2, 1], [3, 2]]);
// => true  (linear chain: 0 -> 1 -> 2 -> 3)
\`\`\`

## Solution

<details>
<summary>Reveal solution</summary>

\`\`\`js
function canFinish(numCourses, prerequisites) {
  const adj = Array.from({ length: numCourses }, () => []);
  const inDegree = new Array(numCourses).fill(0);

  for (const [a, b] of prerequisites) {
    adj[b].push(a);
    inDegree[a]++;
  }

  const queue = [];
  for (let i = 0; i < numCourses; i++) {
    if (inDegree[i] === 0) queue.push(i);
  }

  let completed = 0;
  while (queue.length > 0) {
    const course = queue.shift();
    completed++;
    for (const next of adj[course]) {
      inDegree[next]--;
      if (inDegree[next] === 0) queue.push(next);
    }
  }

  return completed === numCourses;
}
\`\`\`

Kahn's algorithm for topological sort. If we can process all nodes, there's no cycle.

</details>

## Resources

- [Course Schedule — LeetCode](https://leetcode.com/problems/course-schedule/)
- [Topological Sorting — Wikipedia](https://en.wikipedia.org/wiki/Topological_sorting)`,

  starterCode: `/**
 * Determine if all courses can be finished given prerequisites.
 * @param {number} numCourses
 * @param {number[][]} prerequisites - [course, prerequisite] pairs
 * @returns {boolean}
 */
function canFinish(numCourses, prerequisites) {
  // your implementation
}`,

  solution: `function canFinish(numCourses, prerequisites) {
  const adj = Array.from({ length: numCourses }, () => []);
  const inDegree = new Array(numCourses).fill(0);

  for (const [a, b] of prerequisites) {
    adj[b].push(a);
    inDegree[a]++;
  }

  const queue = [];
  for (let i = 0; i < numCourses; i++) {
    if (inDegree[i] === 0) queue.push(i);
  }

  let completed = 0;
  while (queue.length > 0) {
    const course = queue.shift();
    completed++;
    for (const next of adj[course]) {
      inDegree[next]--;
      if (inDegree[next] === 0) queue.push(next);
    }
  }

  return completed === numCourses;
}`,

  harness: `
function solve(input) {
  return canFinish(input.numCourses, input.prerequisites);
}`,

  tests: [
    {
      id: "simple-chain",
      description: "Simple prerequisite chain",
      input: { numCourses: 2, prerequisites: [[1, 0]] },
      expected: true,
      isHidden: false,
    },
    {
      id: "cycle",
      description: "Circular dependency returns false",
      input: { numCourses: 2, prerequisites: [[1, 0], [0, 1]] },
      expected: false,
      isHidden: false,
    },
    {
      id: "linear",
      description: "Linear chain of 4 courses",
      input: { numCourses: 4, prerequisites: [[1, 0], [2, 1], [3, 2]] },
      expected: true,
      isHidden: false,
    },
    {
      id: "no-prereqs",
      description: "No prerequisites — all can finish",
      input: { numCourses: 3, prerequisites: [] },
      expected: true,
      isHidden: true,
    },
    {
      id: "triangle-cycle",
      description: "3-node cycle",
      input: { numCourses: 3, prerequisites: [[0, 1], [1, 2], [2, 0]] },
      expected: false,
      isHidden: true,
    },
    {
      id: "diamond",
      description: "Diamond DAG — no cycle",
      input: { numCourses: 4, prerequisites: [[1, 0], [2, 0], [3, 1], [3, 2]] },
      expected: true,
      isHidden: true,
    },
  ],
};
