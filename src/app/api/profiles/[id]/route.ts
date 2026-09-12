import { NextRequest, NextResponse } from "next/server";
import { dbService, isSupabaseConfigured } from "@/lib/supabase";
import { getCurrentAdmin } from "@/lib/auth";
import { profileModerationSchema } from "@/lib/validations";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const profile = await dbService.getProfileById(id);

    if (!profile) {
      return NextResponse.json(
        { success: false, error: "Profile not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: profile,
    });
  } catch (error) {
    console.error("GET /api/profiles/[id] error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to retrieve profile" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin && isSupabaseConfigured && process.env.NODE_ENV === "production") {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Admin session required" },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await request.json();
    const parsed = profileModerationSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.errors[0].message },
        { status: 400 }
      );
    }

    const updated = await dbService.updateProfile(id, parsed.data);
    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Profile not found or failed to update" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
      data: updated,
    });
  } catch (error) {
    console.error("PATCH /api/profiles/[id] error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update profile" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin && isSupabaseConfigured && process.env.NODE_ENV === "production") {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Admin session required" },
        { status: 401 }
      );
    }

    const { id } = await params;
    const success = await dbService.deleteProfile(id);

    if (!success) {
      return NextResponse.json(
        { success: false, error: "Profile could not be deleted" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Profile removed successfully",
    });
  } catch (error) {
    console.error("DELETE /api/profiles/[id] error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete profile" },
      { status: 500 }
    );
  }
}
