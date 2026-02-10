import { NextRequest, NextResponse } from 'next/server';

const EDIT_PASSWORD = process.env.EDIT_PASSWORD || '';
const COOKIE_NAME = 'edit_token';
const TOKEN_EXPIRY = 60 * 60 * 24; // 24시간 (초)

async function createToken(): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(EDIT_PASSWORD),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const timestamp = Date.now().toString();
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(timestamp));
  const signatureHex = Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
  return `${timestamp}.${signatureHex}`;
}

export async function verifyToken(token: string): Promise<boolean> {
  try {
    const [timestamp, signature] = token.split('.');
    if (!timestamp || !signature) return false;

    // 토큰 만료 확인 (24시간)
    const tokenTime = parseInt(timestamp, 10);
    if (Date.now() - tokenTime > TOKEN_EXPIRY * 1000) return false;

    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(EDIT_PASSWORD),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );
    const expectedSignature = await crypto.subtle.sign('HMAC', key, encoder.encode(timestamp));
    const expectedHex = Array.from(new Uint8Array(expectedSignature))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');

    return signature === expectedHex;
  } catch {
    return false;
  }
}

// POST /api/auth — 비밀번호 검증 + 쿠키 설정
export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    if (password !== EDIT_PASSWORD) {
      return NextResponse.json({ success: false }, { status: 401 });
    }

    const token = await createToken();
    const response = NextResponse.json({ success: true });

    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: TOKEN_EXPIRY,
      path: '/',
    });

    return response;
  } catch {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}

// DELETE /api/auth — 로그아웃 (쿠키 삭제)
export async function DELETE() {
  const response = NextResponse.json({ success: true });

  response.cookies.set(COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 0,
    path: '/',
  });

  return response;
}
