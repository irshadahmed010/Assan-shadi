import { NextRequest, NextResponse } from "next/server";
import { adminLoginSchema } from "@/lib/validations";
import { createSessionToken, verifyPassword, AUTH_COOKIE_NAME } from "@/lib/auth";
import { supabase, supabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";



export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = adminLoginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.errors[0].message },
        { status: 400 }
      );
    }

    const { email, password } = parsed.data;

    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    let adminUser = null;

    const client = supabaseAdmin || supabase;
    if (isSupabaseConfigured && client) {
      const { data, error } = await client
        .from("admin_users")
        .select("*")
        .eq("email", cleanEmail)
        .single();

      if (!error && data) {
        const isMatch = await verifyPassword(cleanPassword, data.password_hash);
        if (isMatch) {
          adminUser = {
            id: data.id,
            email: data.email,
            name: data.name,
            role: data.role,
          };
        }
      }
    }

    if (!adminUser) {
      return NextResponse.json(
        { success: false, error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const token = await createSessionToken(adminUser);

    const response = NextResponse.json({
      success: true,
      message: "Admin login successful",
      user: adminUser,
    });

    response.cookies.set({
      name: AUTH_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login API error:", error);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
