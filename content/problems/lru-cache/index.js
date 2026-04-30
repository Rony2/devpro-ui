export const problem = {
  slug: "lru-cache",  category: "js-75",
  title: "LRU Cache",
  difficulty: "medium",
  type: "coding",
  topics: ["Algorithms", "Design", "Hash Map", "Linked Lists"],
  companies: ["Google", "Meta", "Stripe"],
  estimatedMinutes: 30,
  published: true,
  addedAt: "2026-04-01",
  description: "Implement a Least Recently Used (LRU) cache with O(1) get and put.",

  problemMdx: `## Overview

Design a data structure for a **Least Recently Used (LRU)** cache. It should support:
- \`get(key)\` — return the value or -1 if not found
- \`put(key, value)\` — insert/update and evict the least recently used key if at capacity

Both operations must be **O(1)**.

## Constraints

- \`1 <= capacity <= 3000\`
- \`0 <= key, value <= 10,000\`

## Examples

\`\`\`js
const c = new LRUCache(2);
c.put(1, 1); c.put(2, 2);
c.get(1);    // => 1
c.put(3, 3); // evicts key 2
c.get(2);    // => -1
\`\`\`

## Solution

<details>
<summary>Reveal solution</summary>

\`\`\`js
class LRUCache {
  constructor(capacity) {
    this.cap = capacity;
    this.map = new Map();
  }
  get(key) {
    if (!this.map.has(key)) return -1;
    const val = this.map.get(key);
    this.map.delete(key);
    this.map.set(key, val);
    return val;
  }
  put(key, value) {
    this.map.delete(key);
    this.map.set(key, value);
    if (this.map.size > this.cap) {
      this.map.delete(this.map.keys().next().value);
    }
  }
}
\`\`\`

JavaScript's Map maintains insertion order, so the first key is the LRU.

</details>

## Resources

- [LRU Cache — LeetCode](https://leetcode.com/problems/lru-cache/)`,

  starterCode: `/**
 * Least Recently Used cache.
 */
class LRUCache {
  constructor(capacity) { }
  get(key) { }
  put(key, value) { }
}`,

  solution: `class LRUCache {
  constructor(capacity) { this.cap = capacity; this.map = new Map(); }
  get(key) {
    if (!this.map.has(key)) return -1;
    const val = this.map.get(key);
    this.map.delete(key);
    this.map.set(key, val);
    return val;
  }
  put(key, value) {
    this.map.delete(key);
    this.map.set(key, value);
    if (this.map.size > this.cap) this.map.delete(this.map.keys().next().value);
  }
}`,

  harness: `
function solve(input) {
  const c = new LRUCache(input.capacity);
  const results = [];
  for (const op of input.operations) {
    if (op[0] === "put") { c.put(op[1], op[2]); results.push(null); }
    else results.push(c.get(op[1]));
  }
  return results;
}`,

  tests: [
    { id: "basic", description: "Put, get, evict", input: { capacity: 2, operations: [["put",1,1],["put",2,2],["get",1],["put",3,3],["get",2],["put",4,4],["get",1],["get",3],["get",4]] }, expected: [null,null,1,null,-1,null,-1,3,4], isHidden: false },
    { id: "update", description: "Update existing key", input: { capacity: 2, operations: [["put",1,1],["put",1,10],["get",1]] }, expected: [null,null,10], isHidden: false },
    { id: "cap-1", description: "Capacity 1", input: { capacity: 1, operations: [["put",1,1],["put",2,2],["get",1],["get",2]] }, expected: [null,null,-1,2], isHidden: false },
    { id: "get-refreshes", description: "Get refreshes key", input: { capacity: 2, operations: [["put",1,1],["put",2,2],["get",1],["put",3,3],["get",2]] }, expected: [null,null,1,null,-1], isHidden: true },
    { id: "miss", description: "Get missing key", input: { capacity: 2, operations: [["get",5]] }, expected: [-1], isHidden: true },
    { id: "overwrite", description: "Put refreshes existing", input: { capacity: 2, operations: [["put",1,1],["put",2,2],["put",1,10],["put",3,3],["get",2]] }, expected: [null,null,null,null,-1], isHidden: true },
  ],
};
