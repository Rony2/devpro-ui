import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getSession, markSeen } from '@/lib/sc/store';

const COOKIE_NAME = '__sc';

/**
 * PATCH /api/_x/messages/[id]/seen — mark a message as seen
 */
export async function PATCH(request, { params }) {
  try {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get(COOKIE_NAME)?.value;
    if (!sessionId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const session = getSession(sessionId);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const success = markSeen(id, sessionId);

    if (!success) {
      return NextResponse.json({ error: 'Message not found or cannot mark own message' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
