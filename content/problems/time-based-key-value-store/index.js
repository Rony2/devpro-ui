export const problem = {
  slug: "time-based-key-value-store",  category: "js-75",
  title: "Time Based Key-Value Store",
  difficulty: "medium",
  type: "coding",
  topics: ["Algorithms", "Binary Search", "Design", "Hash Map"],
  companies: ["Google", "Meta"],
  estimatedMinutes: 35,
  published: true,
  addedAt: "2026-04-01",
  description: "Implement a key-value store that can retrieve values by key and timestamp.",

  problemMdx: `## Overview

Design a time-based key-value store that supports:
- \`set(key, value, timestamp)\` — store the key-value pair at the given timestamp
- \`get(key, timestamp)\` — return the value with the largest timestamp ≤ given timestamp, or \`""\` if none exists

Timestamps in \`set\` are strictly increasing.

## Constraints

- \`1 <= key.length, value.length <= 100\`
- Timestamps are positive integers.
- \`set\` timestamps are strictly increasing for the same key.

## Examples

\`\`\`js
const store = new TimeMap();
store.set("foo", "bar", 1);
store.get("foo", 1);  // => "bar"
store.get("foo", 3);  // => "bar"
store.set("foo", "bar2", 4);
store.get("foo", 4);  // => "bar2"
store.get("foo", 5);  // => "bar2"
\`\`\`

## Solution

<details>
<summary>Reveal solution</summary>

\`\`\`js
class TimeMap {
  constructor() { this.map = {}; }
  set(key, value, timestamp) {
    if (!this.map[key]) this.map[key] = [];
    this.map[key].push([timestamp, value]);
  }
  get(key, timestamp) {
    const entries = this.map[key] || [];
    let lo = 0, hi = entries.length - 1, result = "";
    while (lo <= hi) {
      const mid = (lo + hi) >> 1;
      if (entries[mid][0] <= timestamp) { result = entries[mid][1]; lo = mid + 1; }
      else hi = mid - 1;
    }
    return result;
  }
}
\`\`\`

</details>

## Resources

- [Time Based Key-Value Store — LeetCode](https://leetcode.com/problems/time-based-key-value-store/)`,

  starterCode: `/**
 * Time-based key-value store.
 */
class TimeMap {
  constructor() { }
  set(key, value, timestamp) { }
  get(key, timestamp) { }
}`,

  solution: `class TimeMap {
  constructor() { this.map = {}; }
  set(key, value, timestamp) {
    if (!this.map[key]) this.map[key] = [];
    this.map[key].push([timestamp, value]);
  }
  get(key, timestamp) {
    const entries = this.map[key] || [];
    let lo = 0, hi = entries.length - 1, result = "";
    while (lo <= hi) {
      const mid = (lo + hi) >> 1;
      if (entries[mid][0] <= timestamp) { result = entries[mid][1]; lo = mid + 1; }
      else hi = mid - 1;
    }
    return result;
  }
}`,

  harness: `
function solve(input) {
  const tm = new TimeMap();
  const results = [];
  for (const op of input.operations) {
    if (op[0] === "set") { tm.set(op[1], op[2], op[3]); results.push(null); }
    else results.push(tm.get(op[1], op[2]));
  }
  return results;
}`,

  tests: [
    { id: "basic", description: "Set and get with timestamps", input: { operations: [["set","foo","bar",1],["get","foo",1],["get","foo",3],["set","foo","bar2",4],["get","foo",4],["get","foo",5]] }, expected: [null,"bar","bar",null,"bar2","bar2"], isHidden: false },
    { id: "before-any", description: "Get before any set", input: { operations: [["set","k","v",2],["get","k",1]] }, expected: [null,""], isHidden: false },
    { id: "missing-key", description: "Get missing key", input: { operations: [["get","x",1]] }, expected: [""], isHidden: false },
    { id: "exact-ts", description: "Exact timestamp match", input: { operations: [["set","a","1",1],["set","a","2",2],["get","a",2]] }, expected: [null,null,"2"], isHidden: true },
    { id: "between", description: "Timestamp between sets", input: { operations: [["set","a","v1",1],["set","a","v3",3],["get","a",2]] }, expected: [null,null,"v1"], isHidden: true },
    { id: "multi-key", description: "Multiple keys", input: { operations: [["set","a","1",1],["set","b","2",1],["get","a",1],["get","b",1]] }, expected: [null,null,"1","2"], isHidden: true },
  ],
};
