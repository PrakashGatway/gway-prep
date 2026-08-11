import jwt, {
  JwtPayload,
  SignOptions,
  TokenExpiredError,
  JsonWebTokenError,
} from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { JWTPayload } from "../type";

const secret = process.env.JWT_SECRET;

if (!secret) {
  throw new Error("JWT_SECRET is not configured");
}

const expiresIn = (process.env.JWT_EXPIRES_IN || "5d") as SignOptions["expiresIn"];

export function signToken(payload: JwtPayload): string {
  return jwt.sign(payload, secret, {
    expiresIn,
  });
}

export function verifyToken(token: string): JWTPayload {
  return jwt.verify(token, secret) as JWTPayload;
}

export async function getSession(): Promise<JWTPayload | null> {
  try {
    const cookieStore = await cookies();
    // const token = cookieStore.get("token")?.value;
    const token = cookieStore.get("adminToken")?.value;

    if (!token) {
      return null;
    }

    return verifyToken(token);
  } catch {
    return null;
  }
}

export async function clearAuthCookie() {
  const cookieStore = await cookies();

  cookieStore.delete("token");
}

export function Tokenchecker(token: string) {
  try {
    const decoded = jwt.verify(token, secret) as JWTPayload;

    return {
      valid: true,
      expired: false,
      payload: decoded,
    };
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return {
        valid: false,
        expired: true,
        payload: null,
      };
    }

    if (error instanceof JsonWebTokenError) {
      return {
        valid: false,
        expired: false,
        payload: null,
      };
    }

    return {
      valid: false,
      expired: false,
      payload: null,
    };
  }
}

export function verifyTokenResponse(token: string) {
  const result = Tokenchecker(token);

  if (!result.valid) {
    return NextResponse.json(
      {
        success: false,
        error: result.expired
          ? "Token expired"
          : "Invalid token",
      },
      { status: 401 }
    );
  }

  return NextResponse.json({
    success: true,
    user: result.payload,
  });
}






// import jwt, { JwtPayload } from "jsonwebtoken";
// import { cookies } from "next/headers";
// import type { JWTPayload } from "../type";
// import { NextResponse } from "next/server";

// const secret = process.env.JWT_SECRET!;
// const expires_in = process.env.JWT_EXPIRES_IN ?? "5d";

// export function signToken(payload: JwtPayload): string {    
//   return jwt.sign(payload, secret, { expiresIn: expires_in });
// }

// export function verifyToken(token: string): JWTPayload {
//   return jwt.verify(token, secret) as JWTPayload;
// }

// export async function getSession(): Promise<JwtPayload | null> {
//   try {
//     const cookieStore = await cookies();
//     const token = cookieStore.get("token")?.value;
//     if (!token) return null;
//     return verifyToken(token);
//   } catch {
//     return null;
//   }
// }



// export function Tokenchecker(token: string) {
//   try {
//     return jwt.verify(token, secret);
//   } catch (error) {
//     return NextResponse.json({ error: "Invalid token" }, { status: 401 });
//   }
// }
