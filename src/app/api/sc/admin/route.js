import { NextResponse } from 'next/server';
import { verifyOwnerKey, getPin, setPin, generatePin } from '@/lib/sc/store';

export async function POST(request) {
  try {
    const { ownerKey, action, newPin } = await request.json();

    if (!ownerKey || !verifyOwnerKey(ownerKey)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (action === 'generate') {
      const pin = generatePin();
      return NextResponse.json({ pin });
    }

    if (action === 'set' && newPin) {
      if (newPin.length < 4 || newPin.length > 20) {
        return NextResponse.json({ error: 'PIN must be 4-20 characters' }, { status: 400 });
      }
      setPin(newPin);
      return NextResponse.json({ pin: newPin });
    }

    if (action === 'get') {
      return NextResponse.json({ pin: getPin() });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
