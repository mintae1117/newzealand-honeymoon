// 편집 보호용 HMAC 토큰 생성/검증.
// Next.js route 파일은 HTTP 핸들러만 export할 수 있어(빌드 타입 검증에서 에러),
// 여러 라우트(auth, auth/check, schedules/[id])가 공유하는 이 로직은 lib에 둔다.
export const EDIT_PASSWORD = process.env.EDIT_PASSWORD || "";
export const TOKEN_EXPIRY = 60 * 60 * 24; // 24시간 (초)

export async function createToken(): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(EDIT_PASSWORD),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const timestamp = Date.now().toString();
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(timestamp),
  );
  const signatureHex = Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return `${timestamp}.${signatureHex}`;
}

export async function verifyToken(token: string): Promise<boolean> {
  try {
    const [timestamp, signature] = token.split(".");
    if (!timestamp || !signature) return false;

    // 토큰 만료 확인 (24시간)
    const tokenTime = parseInt(timestamp, 10);
    if (Date.now() - tokenTime > TOKEN_EXPIRY * 1000) return false;

    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(EDIT_PASSWORD),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"],
    );
    const expectedSignature = await crypto.subtle.sign(
      "HMAC",
      key,
      encoder.encode(timestamp),
    );
    const expectedHex = Array.from(new Uint8Array(expectedSignature))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    return signature === expectedHex;
  } catch {
    return false;
  }
}
