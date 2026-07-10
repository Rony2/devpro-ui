import { cookies } from 'next/headers';
import { getSession, touchSession, getMessages, isOtherOnline, subscribe, getSignals } from '@/lib/sc/store';

const COOKIE_NAME = '__sc';

// SSE stream — holds connection up to 25s, pushes events in real-time
// Client auto-reconnects via EventSource when connection closes
export async function GET() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(COOKIE_NAME)?.value;

  if (!sessionId) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const session = getSession(sessionId);
  if (!session) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  touchSession(sessionId);

  const encoder = new TextEncoder();
  let closed = false;
  let unsubscribe = null;
  let heartbeatTimer = null;
  let closeTimer = null;

  const stream = new ReadableStream({
    start(controller) {
      // Helper to send an SSE event
      function send(data) {
        if (closed) return;
        try {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
        } catch {
          closed = true;
        }
      }

      // Send initial state immediately
      touchSession(sessionId);
      const msgs = getMessages(sessionId);
      const otherOnline = isOtherOnline(sessionId);
      send({ messages: msgs, me: session.name, otherOnline });

      // Also flush any pending signals
      const pendingSignals = getSignals(sessionId);
      if (pendingSignals.length > 0) {
        send({ signals: pendingSignals });
      }

      // Subscribe to store events and push relevant ones
      unsubscribe = subscribe((event) => {
        if (closed) return;
        touchSession(sessionId);

        if (event.type === 'message' || event.type === 'seen' || event.type === 'config') {
          // Push full message state to this client
          const msgs = getMessages(sessionId);
          const otherOnline = isOtherOnline(sessionId);
          send({ messages: msgs, me: session.name, otherOnline });
        }

        if (event.type === 'signal' && event.toSessionId === sessionId) {
          // Push signal directly to this client
          const signals = getSignals(sessionId);
          if (signals.length > 0) {
            send({ signals });
          }
        }
      });

      // Heartbeat every 15s to keep connection alive
      heartbeatTimer = setInterval(() => {
        if (closed) return;
        try {
          controller.enqueue(encoder.encode(': heartbeat\n\n'));
          // Also refresh online status
          touchSession(sessionId);
          const otherOnline = isOtherOnline(sessionId);
          send({ otherOnline, me: session.name, messages: getMessages(sessionId) });
        } catch {
          closed = true;
        }
      }, 15000);

      // Close connection after 25s (Vercel limit buffer)
      closeTimer = setTimeout(() => {
        closed = true;
        if (unsubscribe) unsubscribe();
        if (heartbeatTimer) clearInterval(heartbeatTimer);
        try {
          controller.close();
        } catch {}
      }, 25000);
    },

    cancel() {
      closed = true;
      if (unsubscribe) unsubscribe();
      if (heartbeatTimer) clearInterval(heartbeatTimer);
      if (closeTimer) clearTimeout(closeTimer);
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
      'X-Accel-Buffering': 'no',
    },
  });
}
