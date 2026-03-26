import { parse as parseCookieHeader } from "cookie";
import { SignJWT, jwtVerify } from "jose";
import bcryptjs from "bcryptjs";
import type { Request } from "express";
import { ENV } from "./env";

export type SessionPayload = {
  userId: string;
  email: string;
  name: string;
};

const getSecret = () => new TextEncoder().encode(ENV.jwtSecret);

export async function hashPassword(password: string): Promise<string> {
  return bcryptjs.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcryptjs.compare(password, hash);
}

export async function createSessionToken(payload: SessionPayload, expiresInMs = 30 * 24 * 60 * 60 * 1000): Promise<string> {
  const exp = Math.floor((Date.now() + expiresInMs) / 1000);
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setExpirationTime(exp)
    .sign(getSecret());
}

export async function verifySessionToken(token: string | undefined | null): Promise<SessionPayload | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getSecret(), { algorithms: ["HS256"] });
    const { userId, email, name } = payload as Record<string, unknown>;
    if (typeof userId !== "string" || typeof email !== "string") return null;
    return { userId, email: email, name: (name as string) || "" };
  } catch {
    return null;
  }
}

export async function getSessionFromRequest(req: Request): Promise<SessionPayload | null> {
  // Check Bearer token first, then cookie
  const authHeader = req.headers.authorization;
  let token: string | undefined;
  if (typeof authHeader === "string" && authHeader.startsWith("Bearer ")) {
    token = authHeader.slice(7).trim();
  }
  if (!token) {
    const cookies = req.headers.cookie ? parseCookieHeader(req.headers.cookie) : {};
    token = cookies["fileflow_session"];
  }
  return verifySessionToken(token);
}
