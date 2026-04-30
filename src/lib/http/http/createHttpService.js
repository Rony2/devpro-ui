import { HttpError } from "@/lib/http/errors/httpError";

const DEFAULT_TIMEOUT_MS = 10_000;
const IDEMPOTENT_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
const DEFAULT_RETRY_COUNT = 1;
const RETRYABLE_STATUS_CODES = new Set([502, 503, 504]);

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function createHttpService({
  baseUrl = "",
  logger,
  timeout = DEFAULT_TIMEOUT_MS,
  retries = DEFAULT_RETRY_COUNT,
}) {
  const requestInterceptors = [];
  const responseInterceptors = [];

  async function request(
    method,
    path,
    { params, body, headers, timeout: perRequestTimeout, retries: perRequestRetries } = {},
  ) {
    const url = new URL(path, baseUrl || "http://localhost");
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.set(key, String(value));
        }
      });
    }

    let reqHeaders = { ...(headers || {}) };
    if (body) {
      reqHeaders["Content-Type"] = reqHeaders["Content-Type"] || "application/json";
    }
    for (const interceptor of requestInterceptors) {
      reqHeaders = await interceptor(reqHeaders);
    }

    const resolvedUrl = baseUrl
      ? url.toString()
      : `${path}${url.search}`;
    const resolvedTimeout = perRequestTimeout ?? timeout;
    const maxAttempts =
      IDEMPOTENT_METHODS.has(method)
        ? (perRequestRetries ?? retries) + 1
        : 1;

    let lastError;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      const controller = new AbortController();
      const timer = resolvedTimeout
        ? setTimeout(() => controller.abort(), resolvedTimeout)
        : null;

      const start = performance.now();
      let response;

      try {
        response = await fetch(resolvedUrl, {
          method,
          headers: reqHeaders,
          body: body ? JSON.stringify(body) : undefined,
          signal: controller.signal,
        });
      } catch (error) {
        clearTimeout(timer);
        const durationMs = Math.round(performance.now() - start);

        if (error.name === "AbortError") {
          lastError = new HttpError(
            { kind: "NETWORK", status: 0, message: `Request timed out after ${resolvedTimeout}ms` },
            error,
          );
        } else {
          lastError = new HttpError(
            { kind: "NETWORK", status: 0, message: error.message },
            error,
          );
        }

        logger?.warn("HTTP request failed (network)", {
          method,
          path,
          attempt,
          durationMs,
          error: lastError.message,
        });

        if (attempt < maxAttempts) {
          await sleep(2 ** (attempt - 1) * 200);
          continue;
        }
        throw lastError;
      } finally {
        if (timer) clearTimeout(timer);
      }

      const durationMs = Math.round(performance.now() - start);
      const text = await response.text();
      let data = null;

      if (text) {
        try {
          data = JSON.parse(text);
        } catch {
          data = text;
        }
      }

      if (!response.ok) {
        const kind = response.status >= 500 ? "HTTP_5XX" : "HTTP_4XX";
        logger?.error("HTTP request failed", {
          method,
          path,
          status: response.status,
          durationMs,
          attempt,
        });

        lastError = new HttpError({
          kind,
          status: response.status,
          message: (typeof data === "object" && data?.message) || "Request failed",
        });

        if (RETRYABLE_STATUS_CODES.has(response.status) && attempt < maxAttempts) {
          await sleep(2 ** (attempt - 1) * 200);
          continue;
        }
        throw lastError;
      }

      logger?.info("HTTP request completed", {
        method,
        path,
        status: response.status,
        durationMs,
      });

      let result = { data, status: response.status };
      for (const interceptor of responseInterceptors) {
        result = await interceptor(result);
      }

      return result;
    }

    throw lastError;
  }

  return {
    get: (path, options) => request("GET", path, options),
    post: (path, body, options = {}) =>
      request("POST", path, { ...options, body }),
    put: (path, body, options = {}) =>
      request("PUT", path, { ...options, body }),
    patch: (path, body, options = {}) =>
      request("PATCH", path, { ...options, body }),
    delete: (path, options) => request("DELETE", path, options),
    addRequestInterceptor: (interceptor) =>
      requestInterceptors.push(interceptor),
    addResponseInterceptor: (interceptor) =>
      responseInterceptors.push(interceptor),
  };
}
