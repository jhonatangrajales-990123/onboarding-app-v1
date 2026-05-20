import { NextResponse } from 'next/server';

const GAS_URL = process.env.GAS_URL;

function isTestUser(email) {
  const e = (email || '').trim().toLowerCase();
  return e.endsWith('@alegra.com');
}

export async function POST(request) {
  const body = await request.json();

  // Test user bypass — no requiere GAS ni Google Sheets
  if (isTestUser(body.email)) {
    if (body.action === 'registerOrGetUser') {
      return NextResponse.json({
        found: true, isNew: false,
        progress: {}, rating: '', comments: '',
        country: body.country || '',
        userType: body.userType || '',
      });
    }
    if (body.action === 'saveProgress' || body.action === 'saveCountry' || body.action === 'saveFeedback') {
      return NextResponse.json({ success: true });
    }
  }

  if (!GAS_URL) {
    return NextResponse.json({ error: 'GAS_URL no configurada.' }, { status: 500 });
  }

  try {
    const res = await fetch(GAS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      redirect: 'follow',
    });

    const text = await res.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = { raw: text };
    }

    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
