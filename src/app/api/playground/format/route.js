import prettier from "prettier";
import { withApiHandler, createCorrelatedLogger } from "@/lib/http";

const logger = createCorrelatedLogger("/api/playground/format");

export const POST = withApiHandler("/api/playground/format", async (req, correlationId) => {
  const reqLogger = logger.withCorrelationId(correlationId);
  const { code, parser = "babel" } = await req.json();

  reqLogger.info("Formatting code", { parser });

  try {
    const formatted = await prettier.format(code, { parser });
    return { formatted };
  } catch {
    return { formatted: code };
  }
});
