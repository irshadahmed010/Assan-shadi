import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { AdminUser } from "@/types/database";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "assan_shadi_secure_super_secret_jwt_key_2026"
);

export const AUTH_COOKIE_NAME = "as_admin_token";

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function createSessionToken(user: AdminUser): Promise<string> {
  return new SignJWT({
    sub: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(JWT_SECRET);
}

export async function verifySessionToken(token: string): Promise<AdminUser | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    if (!payload || !payload.sub || !payload.email) return null;

    return {
      id: payload.sub as string,
      email: payload.email as string,
      name: (payload.name as string) || "Admin",
      role: (payload.role as "superadmin" | "moderator") || "moderator",
    };
  } catch (error) {
    return null;
  }
}

export async function getCurrentAdmin(): Promise<AdminUser | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
    if (!token) return null;
    return verifySessionToken(token);
  } catch {
    return null;
  }
}

export async function verifySession(): Promise<AdminUser | null> {
  return getCurrentAdmin();
}


