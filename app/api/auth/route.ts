import { NextRequest, NextResponse } from "next/server";
import { createToken, EDIT_PASSWORD, TOKEN_EXPIRY } from "@/lib/auth";

const COOKIE_NAME = "edit_token";

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
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: TOKEN_EXPIRY,
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}

// DELETE /api/auth — 로그아웃 (쿠키 삭제)
export async function DELETE() {
  const response = NextResponse.json({ success: true });

  response.cookies.set(COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 0,
    path: "/",
  });

  return response;
}
