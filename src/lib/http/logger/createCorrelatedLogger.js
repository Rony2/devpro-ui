const LOG_LEVELS = { error: 0, warn: 1, info: 2, debug: 3 };

const REDACT_KEYS = new Set([
  "password",
  "token",
  "secret",
  "authorization",
  "cookie",
  "credit_card",
  "ssn",
]);

function getLogLevel() {
  const env =
    typeof process !== "undefined" ? process.env?.LOG_LEVEL : undefined;
  return LOG_LEVELS[env] ?? LOG_LEVELS.info;
}

function redactMeta(meta) {
  if (!meta || typeof meta !== "object") return meta;
  const redacted = {};
  for (const [key, value] of Object.entries(meta)) {
    if (REDACT_KEYS.has(key.toLowerCase())) {
      redacted[key] = "[REDACTED]";
    } else if (value && typeof value === "object" && !Array.isArray(value)) {
      redacted[key] = redactMeta(value);
    } else {
      redacted[key] = value;
    }
  }
  return redacted;
}

const defaultTransport = {
  write(level, payload) {
    const fn =
      level === "error"
        ? console.error
        : level === "warn"
          ? console.warn
          : console.log;
    fn(JSON.stringify(payload));
  },
};

let activeTransport = defaultTransport;

export function setLogTransport(transport) {
  activeTransport = transport;
}

export function createCorrelatedLogger(namespace) {
  function withCorrelationId(correlationId) {
    function log(level, message, meta = {}) {
      if (LOG_LEVELS[level] > getLogLevel()) return;

      const payload = {
        timestamp: new Date().toISOString(),
        level,
        namespace,
        correlationId,
        message,
        ...redactMeta(meta),
      };
      activeTransport.write(level, payload);
    }

    return {
      info: (message, meta) => log("info", message, meta),
      warn: (message, meta) => log("warn", message, meta),
      error: (message, meta) => log("error", message, meta),
      debug: (message, meta) => log("debug", message, meta),
    };
  }

  return {
    withCorrelationId,
    info: (message, meta) =>
      withCorrelationId(crypto.randomUUID()).info(message, meta),
    warn: (message, meta) =>
      withCorrelationId(crypto.randomUUID()).warn(message, meta),
    error: (message, meta) =>
      withCorrelationId(crypto.randomUUID()).error(message, meta),
    debug: (message, meta) =>
      withCorrelationId(crypto.randomUUID()).debug(message, meta),
  };
}
