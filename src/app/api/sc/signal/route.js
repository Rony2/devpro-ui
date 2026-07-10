import { cookies } from 'next/headers';
import { getSession, addSignal, getSignals, getOtherSessionId } from '@/lib/sc/store';

function getSessionFromCookie(cookieStore) {
  const sessionId = cookieStore.get('__sc')?.value;
  if (!sessionId) return null;
  return getSession(sessionId);
}

// GET - poll for incoming signals
export async function GET() {
  const cookieStore = await cookies();
  const session = getSessionFromCookie(cookieStore);
  if (!session) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const incoming = getSignals(session.id);
  return Response.json({ signals: incoming });
}

// POST - send a signal to the other user
export async function POST(req) {
  const cookieStore = await cookies();
  const session = getSessionFromCookie(cookieStore);
  if (!session) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { type, payload } = await req.json();

  const validTypes = ['offer', 'answer', 'ice-candidate', 'call-request', 'call-accept', 'call-reject', 'call-end'];
  if (!validTypes.includes(type)) {
    return Response.json({ error: 'Invalid signal type' }, { status: 400 });
  }

  const otherId = getOtherSessionId(session.id);
  if (!otherId) {
    return Response.json({ error: 'No other user connected' }, { status: 404 });
  }

  const signal = addSignal(session.id, otherId, type, payload || {});
  return Response.json({ ok: true, signal: { id: signal.id, type: signal.type } });
}
