export const problem = {
  // ── Meta ────────────────────────────────────────────────────
  slug: "minimum-meeting-rooms",  category: "grind-75",
  title: "Minimum Meeting Rooms Needed",
  difficulty: "hard",
  type: "coding",
  topics: ["Algorithms", "Sorting", "Data Structures"],
  companies: ["Google", "Amazon", "Meta", "Stripe"],
  estimatedMinutes: 40,
  published: true,
  addedAt: "2026-04-01",
  description:
    "Implement a function to find the minimum number of conference rooms required to hold all meetings.",

  // ── Problem description (MDX) ──────────────────────────────
  problemMdx: `## Overview

Given an array of meeting time intervals where \`intervals[i] = [start, end]\`, find the minimum number of conference rooms required so that no two overlapping meetings share the same room.

Implement \`minMeetingRooms(intervals)\`.

## Constraints

- Each interval is a two-element array \`[start, end]\` where \`start < end\`.
- Input may be unsorted.
- Return an integer representing the minimum rooms needed.
- Adjacent meetings (\`[0,5],[5,10]\`) do NOT conflict — the first ends as the second begins.
- Aim for $O(n \\log n)$ time.

## Examples

\`\`\`js
minMeetingRooms([[0,30],[5,10],[15,20]]);
// → 2  — [5,10] overlaps with [0,30], but [15,20] also overlaps with [0,30]
//         at most 2 run simultaneously

minMeetingRooms([[7,10],[2,4]]);
// → 1  — no overlap

minMeetingRooms([[0,5],[5,10],[0,10]]);
// → 2  — [0,5] and [0,10] overlap; [5,10] and [0,10] overlap
\`\`\`

## Notes

- **Sweep-line approach**: split each interval into two events — a start (+1) and an end (−1). Sort the events by time (break ties: ends before starts so a room freed at time T can be reused at time T). Sweep and track the running count; the maximum is the answer.
- Alternatively, sort starts and ends in separate arrays and use two pointers.
- Edge cases: empty array → 0, single meeting → 1.

## Solution

<details>
<summary>Reveal solution</summary>

\`\`\`js
function minMeetingRooms(intervals) {
  if (intervals.length === 0) return 0;

  const events = [];
  for (const [start, end] of intervals) {
    events.push([start, 1]);   // meeting starts
    events.push([end, -1]);    // meeting ends
  }

  // Sort by time; if same time, ends (-1) before starts (+1)
  events.sort((a, b) => a[0] - b[0] || a[1] - b[1]);

  let rooms = 0;
  let maxRooms = 0;

  for (const [, delta] of events) {
    rooms += delta;
    maxRooms = Math.max(maxRooms, rooms);
  }

  return maxRooms;
}
\`\`\`

</details>

## Resources

- [Meeting Rooms II — LeetCode](https://leetcode.com/problems/meeting-rooms-ii/)
- [Sweep Line Algorithm — Wikipedia](https://en.wikipedia.org/wiki/Sweep_line_algorithm)`,

  // ── Starter code ───────────────────────────────────────────
  starterCode: `/**
 * Find the minimum number of conference rooms needed.
 *
 * @param {number[][]} intervals - Array of [start, end] meeting times
 * @returns {number} Minimum rooms required
 */
function minMeetingRooms(intervals) {
  // your implementation
}`,

  // ── Solution (server-only) ─────────────────────────────────
  solution: `function minMeetingRooms(intervals) {
  if (intervals.length === 0) return 0;

  const events = [];
  for (const [start, end] of intervals) {
    events.push([start, 1]);
    events.push([end, -1]);
  }

  events.sort((a, b) => a[0] - b[0] || a[1] - b[1]);

  let rooms = 0;
  let maxRooms = 0;

  for (const [, delta] of events) {
    rooms += delta;
    maxRooms = Math.max(maxRooms, rooms);
  }

  return maxRooms;
}`,

  // ── Harness ────────────────────────────────────────────────
  harness: `
function solve(input) {
  return minMeetingRooms(input.intervals);
}`,

  // ── Test cases ─────────────────────────────────────────────
  tests: [
    {
      id: "two-rooms",
      description: "Overlapping meetings need 2 rooms",
      input: { intervals: [[0,30],[5,10],[15,20]] },
      expected: 2,
      isHidden: false,
    },
    {
      id: "one-room",
      description: "Non-overlapping meetings need 1 room",
      input: { intervals: [[7,10],[2,4]] },
      expected: 1,
      isHidden: false,
    },
    {
      id: "adjacent-reuse",
      description: "Adjacent meetings reuse the same room",
      input: { intervals: [[0,5],[5,10],[0,10]] },
      expected: 2,
      isHidden: false,
    },
    {
      id: "hidden-empty",
      description: "No meetings → 0 rooms",
      input: { intervals: [] },
      expected: 0,
      isHidden: true,
    },
    {
      id: "hidden-all-overlap",
      description: "All meetings overlap — each needs its own room",
      input: { intervals: [[1,10],[2,9],[3,8],[4,7]] },
      expected: 4,
      isHidden: true,
    },
    {
      id: "hidden-chain",
      description: "Sequential meetings with partial overlaps",
      input: { intervals: [[0,5],[1,6],[2,7],[6,8],[7,9]] },
      expected: 3,
      isHidden: true,
    },
  ],
};
