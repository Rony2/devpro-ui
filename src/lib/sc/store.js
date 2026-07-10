import { timingSafeEqual } from 'crypto';

// --- In-Memory State ---

let pin = process.env.SC_PIN || '0909098';
const ownerKey = process.env.SC_OWNER_KEY || 'Salil@2026';

const sessions = new Map();
let messages = [];
let config = {
  deleteMode: 'time',
  deleteAfterMinutes: 5,
};

// Rate limiting
const pinAttempts = new Map();
const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 15 * 60 * 1000;

// --- Helpers ---

function generateId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function safeCompare(a, b) {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) {
    timingSafeEqual(bufA, bufA);
    return false;
  }
  return timingSafeEqual(bufA, bufB);
}

function cleanExpiredMessages() {
  const now = Date.now();
  messages = messages.filter((m) => !m.expiresAt || m.expiresAt > now);
}

// --- PIN & Rate Limiting ---

export function checkRateLimit(ip) {
  const now = Date.now();
  const entry = pinAttempts.get(ip);

  if (!entry || now > entry.resetAt) {
    pinAttempts.set(ip, { count: 1, resetAt: now + LOCKOUT_MS });
    return { allowed: true, remaining: MAX_ATTEMPTS - 1 };
  }

  if (entry.count >= MAX_ATTEMPTS) {
    return { allowed: false, remaining: 0 };
  }

  entry.count++;
  return { allowed: true, remaining: MAX_ATTEMPTS - entry.count };
}

export function resetRateLimit(ip) {
  pinAttempts.delete(ip);
}

export function verifyPin(attempt) {
  return safeCompare(attempt, pin);
}

export function verifyOwnerKey(attempt) {
  return safeCompare(attempt, ownerKey);
}

export function getPin() {
  return pin;
}

export function setPin(newPin) {
  pin = newPin;
  messages = [];
}

export function generatePin() {
  const digits = Array.from({ length: 6 }, () => Math.floor(Math.random() * 10));
  const newPin = digits.join('');
  setPin(newPin);
  return newPin;
}

// --- Sessions ---

export function createSession() {
  if (sessions.size >= 2) {
    let oldest = null;
    for (const s of sessions.values()) {
      if (!oldest || s.lastPoll < oldest.lastPoll) oldest = s;
    }
    if (oldest) sessions.delete(oldest.id);
  }

  // Pick a name not already taken
  const takenNames = new Set([...sessions.values()].map((s) => s.name));
  const name = !takenNames.has('user1') ? 'user1' : 'user2';
  const session = {
    id: generateId(),
    name,
    lastPoll: Date.now(),
  };
  sessions.set(session.id, session);
  return session;
}

export function getSession(id) {
  return sessions.get(id) || null;
}

export function touchSession(id) {
  const s = sessions.get(id);
  if (s) s.lastPoll = Date.now();
}

export function isOtherOnline(mySessionId) {
  for (const [id, s] of sessions) {
    if (id !== mySessionId && Date.now() - s.lastPoll < 10000) {
      return true;
    }
  }
  return false;
}

// --- Messages ---

export function getMessages(sessionId) {
  cleanExpiredMessages();

  const session = sessions.get(sessionId);
  if (!session) return [];

  for (const msg of messages) {
    if (msg.sender !== sessionId && msg.status === 'sent') {
      msg.status = 'delivered';
    }
  }

  return [...messages];
}

export function addMessage(sessionId, text, media = null) {
  const session = sessions.get(sessionId);
  if (!session) return null;

  const msg = {
    id: generateId(),
    sender: sessionId,
    senderName: session.name,
    text: text || '',
    media, // { type: 'image'|'video', data: 'data:...' }
    status: 'sent',
    createdAt: Date.now(),
    expiresAt:
      config.deleteMode === 'time'
        ? Date.now() + config.deleteAfterMinutes * 60 * 1000
        : null,
  };

  messages.push(msg);
  notify({ type: 'message', sessionId });
  return msg;
}

export function markSeen(messageId, sessionId) {
  const msg = messages.find((m) => m.id === messageId);
  if (!msg || msg.sender === sessionId) return false;

  msg.status = 'seen';

  if (config.deleteMode === 'on-seen') {
    messages = messages.filter((m) => m.id !== messageId);
  }

  notify({ type: 'seen', messageId, sessionId });
  return true;
}

// --- Config ---

export function getConfig() {
  return { ...config };
}

export function updateConfig(updates) {
  if (updates.deleteMode) {
    config.deleteMode = updates.deleteMode;

    // When switching to on-seen, purge all already-seen messages
    if (updates.deleteMode === 'on-seen') {
      messages = messages.filter((m) => m.status !== 'seen');
    }
  }
  if (updates.deleteAfterMinutes !== undefined) {
    config.deleteAfterMinutes = Math.max(1, Math.min(1440, updates.deleteAfterMinutes));
  }
  notify({ type: 'config' });
  return { ...config };
}

// --- SSE Event Bus ---

const listeners = new Set();

export function subscribe(callback) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

export function notify(event) {
  for (const cb of listeners) {
    try { cb(event); } catch {}
  }
}

// --- Call Signaling ---

// Signals are short-lived messages for WebRTC negotiation
// Each entry: { id, from, to, type, payload, createdAt }
let signals = [];

export function addSignal(fromSessionId, toSessionId, type, payload) {
  const signal = {
    id: generateId(),
    from: fromSessionId,
    to: toSessionId,
    type, // 'offer' | 'answer' | 'ice-candidate' | 'call-request' | 'call-accept' | 'call-reject' | 'call-end'
    payload,
    createdAt: Date.now(),
  };
  signals.push(signal);
  // Clean old signals (older than 30s)
  signals = signals.filter((s) => Date.now() - s.createdAt < 30000);
  // Notify SSE listeners about the new signal
  notify({ type: 'signal', toSessionId });
  return signal;
}

export function getSignals(forSessionId) {
  const mine = signals.filter((s) => s.to === forSessionId);
  // Remove consumed signals
  signals = signals.filter((s) => s.to !== forSessionId);
  return mine;
}

export function getOtherSessionId(mySessionId) {
  for (const [id] of sessions) {
    if (id !== mySessionId) return id;
  }
  return null;
}
