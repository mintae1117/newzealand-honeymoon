import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '../route';

const COOKIE_NAME = 'edit_token';

// GET /api/auth/check — 현재 인증 상태 확인
export async function GET(request: NextRequest) {
  const token = request.cookies.get(COOKIE_NAME)?.value;

  if (!token) {
    return NextResponse.json({ authenticated: false });
  }

  const valid = await verifyToken(token);
  return NextResponse.json({ authenticated: valid });
}
