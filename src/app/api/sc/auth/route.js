import { NextResponse } from 'next/server';
import { verifyPin, checkRateLimit, resetRateLimit, createSession } from '@/lib/sc/store';

const COOKIE_NAME = '__sc';

export async function POST(request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const { allowed, remaining } = checkRateLimit(ip);

    if (!allowed) {
      return NextResponse.json(
        { error: 'Too many attempts. Try again later.' },
        { status: 429 }
      );
    }

    const { pin } = await request.json();

    if (!pin || typeof pin !== 'string') {
      return NextResponse.json({ error: 'PIN required' }, { status: 400 });
    }

    if (!verifyPin(pin)) {
      return NextResponse.json(
        { error: 'Invalid PIN', remaining },
        { status: 401 }
      );
    }

    resetRateLimit(ip);

    const session = createSession();
    if (!session) {
      return NextResponse.json({ error: 'Chat is full' }, { status: 403 });
    }

    const response = NextResponse.json({ success: true, name: session.name });
    response.cookies.set(COOKIE_NAME, session.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 24 * 60 * 60, // 24 hours
    });

    return response;
  } catch {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
