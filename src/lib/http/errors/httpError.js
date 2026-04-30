export class HttpError extends Error {
  constructor(apiError, cause) {
    super(apiError?.message || "HTTP error", cause ? { cause } : undefined);
    this.name = "HttpError";
    this.apiError = apiError;
  }
}

export function isHttpError(error) {
  return error instanceof HttpError;
}
