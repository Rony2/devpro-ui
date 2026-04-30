import { runInSandbox } from "./sandbox";

export async function runCode(code, testCases) {
  const results = [];

  for (const testCase of testCases) {
    const result = await runInSandbox(code, testCase.input, 1200);
    if (!result.ok) {
      results.push({
        id: testCase.id,
        description: testCase.description,
        passed: false,
        expected: testCase.expected,
        received: result.error,
        error: result.error,
        logs: result.logs || [],
      });
      continue;
    }

    const passed = JSON.stringify(result.output) === JSON.stringify(testCase.expected);
    results.push({
      id: testCase.id,
      description: testCase.description,
      passed,
      expected: testCase.expected,
      received: result.output,
      error: null,
      logs: result.logs || [],
    });
  }

  return results;
}
