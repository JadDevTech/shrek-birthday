import { NextRequest, NextResponse } from 'next/server';

const ADMIN_PASSCODE = process.env.ADMIN_PASSCODE || 'Calzone2905';

export async function POST(request: NextRequest) {
  const { passcode } = await request.json();

  if (passcode === ADMIN_PASSCODE) {
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json(
    { ok: false, error: "Codice errato. Solo l'orchessa stessa conosce la parola." },
    { status: 401 }
  );
}
