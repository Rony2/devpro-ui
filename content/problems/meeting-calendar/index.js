export const problem = {
  // ── Meta ────────────────────────────────────────────────────
  slug: "meeting-calendar",  category: "grind-75",
  title: "Meeting Calendar",
  difficulty: "hard",
  type: "coding",
  topics: ["Algorithms", "Sorting", "Data Structures"],
  companies: ["Google", "Amazon", "Meta"],
  estimatedMinutes: 25,
  published: true,
  addedAt: "2026-04-01",
  description:
    "Implement a function to check if all meetings can be attended without conflict.",

  // ── Problem description (MDX) ──────────────────────────────
  problemMdx: `## Overview

Given an array of meeting time intervals where \`intervals[i] = [start, end]\`, determine if a person could attend all meetings (i.e., no two meetings overlap).

Implement \`canAttendAll(intervals)\`.

## Constraints

- Each interval is a two-element array \`[start, end]\` where \`start < end\`.
- Return \`true\` if there are no overlapping meetings, \`false\` otherwise.
- Input may be unsorted.
- Attend means the person must be present for the entire duration. Adjacent meetings (\`[0,5],[5,10]\`) do NOT conflict.
- Aim for $O(n \\log n)$ time.

## Examples

\`\`\`js
canAttendAll([[0,30],[5,10],[15,20]]);
// → false  — [0,30] overlaps with both others

canAttendAll([[7,10],[2,4]]);
// → true  — no overlap

canAttendAll([[1,5],[5,10]]);
// → true  — adjacent, not overlapping
\`\`\`

## Notes

- Sort by start time and compare consecutive pairs.
- If any meeting starts before the previous one ends, return false.

## Solution

<details>
<summary>Reveal solution</summary>

\`\`\`js
function canAttendAll(intervals) {
  intervals.sort((a, b) => a[0] - b[0]);

  for (let i = 1; i < intervals.length; i++) {
    if (intervals[i][0] < intervals[i - 1][1]) {
      return false;
    }
  }

  return true;
}
\`\`\`

</details>

## Resources

- [Meeting Rooms — LeetCode](https://leetcode.com/problems/meeting-rooms/)
- [Interval Scheduling — Wikipedia](https://en.wikipedia.org/wiki/Interval_scheduling)`,

  // ── Starter code ───────────────────────────────────────────
  starterCode: `/**
 * Determine if a person can attend all meetings without conflict.
 *
 * @param {number[][]} intervals - Array of [start, end] meeting times
 * @returns {boolean} True if no meetings overlap
 */
function canAttendAll(intervals) {
  // your implementation
}`,

  // ── Solution (server-only) ─────────────────────────────────
  solution: `function canAttendAll(intervals) {
  intervals.sort((a, b) => a[0] - b[0]);

  for (let i = 1; i < intervals.length; i++) {
    if (intervals[i][0] < intervals[i - 1][1]) {
      return false;
    }
  }

  return true;
}`,

  // ── Harness ────────────────────────────────────────────────
  harness: `
function solve(input) {
  return canAttendAll(input.intervals);
}`,

  // ── Test cases ─────────────────────────────────────────────
  tests: [
    {
      id: "overlap",
      description: "Overlapping meetings → false",
      input: { intervals: [[0,30],[5,10],[15,20]] },
      expected: false,
      isHidden: false,
    },
    {
      id: "no-overlap",
      description: "Non-overlapping meetings → true",
      input: { intervals: [[7,10],[2,4]] },
      expected: true,
      isHidden: false,
    },
    {
      id: "adjacent",
      description: "Adjacent meetings are OK → true",
      input: { intervals: [[1,5],[5,10]] },
      expected: true,
      isHidden: false,
    },
    {
      id: "hidden-single",
      description: "Single meeting → true",
      input: { intervals: [[3,8]] },
      expected: true,
      isHidden: true,
    },
    {
      id: "hidden-empty",
      description: "No meetings → true",
      input: { intervals: [] },
      expected: true,
      isHidden: true,
    },
    {
      id: "hidden-tight",
      description: "Multiple tight non-overlapping meetings",
      input: { intervals: [[1,2],[3,4],[5,6],[7,8],[2,3]] },
      expected: true,
      isHidden: true,
    },
  ],
};
