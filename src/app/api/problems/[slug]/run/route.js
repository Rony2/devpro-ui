import { withApiHandler, createCorrelatedLogger } from "@/lib/http";
import { runCode } from "@/lib/executor";
import { getTestsBySlug, getHarnessBySlug } from "@/lib/content/problems";

const logger = createCorrelatedLogger("/api/problems/[slug]/run");

export const POST = withApiHandler("/api/problems/[slug]/run", async (req, correlationId) => {
  const reqLogger = logger.withCorrelationId(correlationId);
  const { code, slug } = await req.json();

  const tests = getTestsBySlug(slug);
  const harness = getHarnessBySlug(slug);
  const fullCode = harness ? `${code}\n\n${harness}` : code;

  reqLogger.info("Running problem tests", { slug, count: tests.length });
  const results = await runCode(fullCode, tests);

  return { results };
});
