import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getSession, getConfig, updateConfig, verifyOwnerKey } from '@/lib/sc/store';

const COOKIE_NAME = '__sc';

/**
 * GET /api/_x/config — get chat settings
 */
export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get(COOKIE_NAME)?.value;
    if (!sessionId || !getSession(sessionId)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    return NextResponse.json({ config: getConfig() });
  } catch {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}

/**
 * PATCH /api/_x/config — update chat settings
 */
export async function PATCH(request) {
  try {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get(COOKIE_NAME)?.value;
    if (!sessionId || !getSession(sessionId)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { deleteMode, deleteAfterMinutes } = await request.json();

    const validModes = ['time', 'on-seen', 'manual'];
    if (deleteMode && !validModes.includes(deleteMode)) {
      return NextResponse.json({ error: 'Invalid delete mode' }, { status: 400 });
    }

    const updated = updateConfig({
      ...(deleteMode && { deleteMode }),
      ...(deleteAfterMinutes !== undefined && { deleteAfterMinutes }),
    });

    return NextResponse.json({ config: updated });
  } catch {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
