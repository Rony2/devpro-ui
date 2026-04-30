import { NextResponse } from "next/server";
import { isHttpError } from "@/lib/http/errors/httpError";
import { createCorrelatedLogger } from "@/lib/http/logger/createCorrelatedLogger";

const logger = createCorrelatedLogger("withApiHandler");

export function withApiHandler(route, handler) {
  return async function wrappedHandler(req) {
    const correlationId = crypto.randomUUID();
    const reqLogger = logger.withCorrelationId(correlationId);

    try {
      const data = await handler(req, correlationId);
      return NextResponse.json({ correlationId, data });
    } catch (error) {
      let status = 500;
      let message = `Unhandled error at ${route}`;

      if (isHttpError(error)) {
        status = error.apiError?.status || 500;
        message = error.apiError?.message || message;
      } else if (error instanceof Error) {
        message = error.message;
        if (error.statusCode) status = error.statusCode;
      }

      reqLogger.error("Request failed", {
        route,
        status,
        error: message,
        stack: error instanceof Error ? error.stack : undefined,
      });

      return NextResponse.json(
        { correlationId, message },
        { status },
      );
    }
  };
}
