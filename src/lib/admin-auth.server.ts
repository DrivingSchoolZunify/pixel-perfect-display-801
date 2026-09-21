import { createHmac, timingSafeEqual } from "node:crypto";
import { getRequestHeader, setResponseHeader } from "@tanstack/react-start/server";

const COOKIE = "apex_admin";
const MAX_AGE = 60 * 60 * 8; // 8 hours

function secret() {
  const value = process.env["ADMIN_SESSION_SECRET"];
  if (!value) throw new Error("ADMIN_SESSION_SECRET is not configured");
  return value;
}

function sign(payload: string) {
  return createHmac("sha256", secret()).update(payload).digest("hex");
}

function safeEqual(a: string, b: string) {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

/** Verify email/password against the configured admin credentials. */
export function verifyCredentials(email: string, password: string) {
  const adminEmail = process.env["ADMIN_EMAIL"];
  const adminPassword = process.env["ADMIN_PASSWORD"];
  if (!adminEmail || !adminPassword) throw new Error("Admin credentials are not configured");
  return (
    safeEqual(email.trim().toLowerCase(), adminEmail.trim().toLowerCase()) &&
    safeEqual(password, adminPassword)
  );
}

export function issueSession(email: string) {
  const expires = Date.now() + MAX_AGE * 1000;
  const payload = `${email.trim().toLowerCase()}|${expires}`;
  const token = `${payload}|${sign(payload)}`;
  setResponseHeader(
    "Set-Cookie",
    `${COOKIE}=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Lax; Secure; Max-Age=${MAX_AGE}`,
  );
}

export function clearSession() {
  setResponseHeader(
    "Set-Cookie",
    `${COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Secure; Max-Age=0`,
  );
}

export function getAdminEmail(): string | null {
  const cookieHeader = getRequestHeader("cookie") ?? "";
  const raw = cookieHeader
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${COOKIE}=`));
  if (!raw) return null;
  const token = decodeURIComponent(raw.slice(COOKIE.length + 1));
  // Emails contain dots, so split from the right: <email>|<expires>|<signature>
  const parts = token.split("|");
  if (parts.length !== 3) return null;
  const [email, expires, signature] = parts as [string, string, string];
  if (!safeEqual(signature, sign(`${email}|${expires}`))) return null;
  if (Number(expires) < Date.now()) return null;
  return email;
}

export function requireAdmin() {
  const email = getAdminEmail();
  if (!email) throw new Error("Not signed in");
  return email;
}
