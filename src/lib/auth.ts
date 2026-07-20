import { timingSafeEqual } from "node:crypto";
import { SignJWT, jwtVerify } from "jose";

export const SESSION_COOKIE = "ol_session";

function getSecretKey() {
  const secret = process.env.AUTH_SECRET || "dev-only-secret-please-change-this";
  return new TextEncoder().encode(secret);
}

export async function createSessionToken() {
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecretKey());
}

export async function verifySessionToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    return payload.role === "admin";
  } catch {
    return false;
  }
}

function safeStringEqual(a: string, b: string) {
  const aBuf = Buffer.from(a);
  const bBuf = Buffer.from(b);
  if (aBuf.length !== bBuf.length) return false;
  return timingSafeEqual(aBuf, bBuf);
}

export function checkAdminCredentials(username: string, password: string) {
  const validUser = process.env.ADMIN_USERNAME;
  const validPass = process.env.ADMIN_PASSWORD;
  if (!validUser || !validPass) return false;
  return safeStringEqual(username, validUser) && safeStringEqual(password, validPass);
}
