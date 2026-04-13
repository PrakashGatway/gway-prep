import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
import type { JWTPayload } from "../type";

const secret = process.env.JWT_SECRET!;
const expires_in = process.env.JWT_EXPIRES_IN ?? "5d";

export function signToken(payload: JwtPayload): string {    
  return jwt.sign(payload, secret, { expiresIn: expires_in });
}

export function verifyToken(token: string): JWTPayload {
  return jwt.verify(token, secret) as JWTPayload;
}

export async function getSession(): Promise<JwtPayload | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) return null;
    return verifyToken(token);
  } catch {
    return null;
  }
}
