import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getSession, touchSession, getMessages, addMessage, isOtherOnline } from '@/lib/sc/store';

const COOKIE_NAME = '__sc';

async function getSessionFromCookie() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(COOKIE_NAME)?.value;
  if (!sessionId) return null;
  return getSession(sessionId);
}

/**
 * GET /api/_x/messages — poll for messages + mark delivered
 */
export async function GET() {
  try {
    const session = await getSessionFromCookie();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    touchSession(session.id);
    const msgs = getMessages(session.id);
    const otherOnline = isOtherOnline(session.id);

    return NextResponse.json({
      messages: msgs,
      me: session.name,
      otherOnline,
    });
  } catch {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}

/**
 * POST /api/_x/messages — send a message
 */
export async function POST(request) {
  try {
    const session = await getSessionFromCookie();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { text, media } = await request.json();

    if ((!text || typeof text !== 'string' || text.trim().length === 0) && !media) {
      return NextResponse.json({ error: 'Message or media required' }, { status: 400 });
    }

    if (text && text.length > 5000) {
      return NextResponse.json({ error: 'Message too long' }, { status: 400 });
    }

    // Validate media if present (max ~5MB base64)
    if (media) {
      if (!media.type || !['image', 'video'].includes(media.type)) {
        return NextResponse.json({ error: 'Invalid media type' }, { status: 400 });
      }
      if (!media.data || typeof media.data !== 'string' || media.data.length > 7_000_000) {
        return NextResponse.json({ error: 'Media too large (max 5MB)' }, { status: 400 });
      }
    }

    const msg = addMessage(session.id, text ? text.trim() : '', media || null);
    if (!msg) {
      return NextResponse.json({ error: 'Failed to send' }, { status: 500 });
    }

    return NextResponse.json({ message: msg });
  } catch {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
