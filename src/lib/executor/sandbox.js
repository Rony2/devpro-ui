export function runInSandbox(code, input, timeoutMs = 1000) {
  return new Promise((resolve) => {
    let done = false;

    const timer = setTimeout(() => {
      if (!done) {
        done = true;
        resolve({ ok: false, error: `Execution timed out after ${timeoutMs}ms` });
      }
    }, timeoutMs);

    try {
      // Strip ES module syntax — new Function() doesn't support import/export
      const cleaned = code
        .replace(/export\s+default\s+/g, "")
        .replace(/export\s+/g, "");

      const logs = [];
      const fakeCons = { log: (...args) => logs.push(args.map(String).join(" ")), warn: () => {}, error: () => {}, info: () => {} };

      const fn = new Function("input", "console", "Promise", `${cleaned}\n\nreturn typeof solve === 'function' ? solve(input) : null;`);
      const output = fn(input, fakeCons, Promise);

      // Handle async (Promise) return values
      if (output && typeof output.then === "function") {
        output.then(
          (resolved) => {
            if (!done) {
              done = true;
              clearTimeout(timer);
              resolve({ ok: true, output: resolved, logs });
            }
          },
          (err) => {
            if (!done) {
              done = true;
              clearTimeout(timer);
              resolve({ ok: false, error: err instanceof Error ? err.message : String(err), logs });
            }
          },
        );
      } else if (!done) {
        done = true;
        clearTimeout(timer);
        resolve({ ok: true, output, logs });
      }
    } catch (error) {
      if (!done) {
        done = true;
        clearTimeout(timer);
        resolve({ ok: false, error: error instanceof Error ? error.message : "Unknown error", logs: [] });
      }
    }
  });
}
