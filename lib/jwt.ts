import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET!;
const COOKIE_NAME = "chronicle_token";
const EXPIRES_IN = "7d";

export interface JWTPayload {
  userId: string;
  role: string;
}

/** Sign a JWT and return the token string */
export function signToken(payload: JWTPayload): string {
  return jwt.sign(payload, ACCESS_SECRET, { expiresIn: EXPIRES_IN });
}

/** Verify a JWT string — returns payload or throws */
export function verifyToken(token: string): JWTPayload {
  return jwt.verify(token, ACCESS_SECRET) as JWTPayload;
}

/** Set the HTTP-only auth cookie on a Next.js Response */
export function setAuthCookie(response: Response, token: string): void {
  response.headers.set(
    "Set-Cookie",
    `${COOKIE_NAME}=${token}; HttpOnly; Path=/; SameSite=Lax; Max-Age=${7 * 24 * 60 * 60}${
      process.env.NODE_ENV === "production" ? "; Secure" : ""
    }`
  );
}

/** Clear the auth cookie */
export function clearAuthCookie(response: Response): void {
  response.headers.set(
    "Set-Cookie",
    `${COOKIE_NAME}=; HttpOnly; Path=/; SameSite=Lax; Max-Age=0`
  );
}

/** Read + verify the JWT from the incoming cookie store */
export async function getTokenPayload(): Promise<JWTPayload | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return null;
    return verifyToken(token);
  } catch {
    return null;
  }
}

export { COOKIE_NAME };
