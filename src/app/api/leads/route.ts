import { NextRequest, NextResponse } from "next/server";
import { dbService } from "@/lib/supabase";
import { getCurrentAdmin } from "@/lib/auth";

export async function GET() {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Admin session required" },
        { status: 401 }
      );
    }

    const leads = await dbService.getLeads();
    return NextResponse.json({
      success: true,
      data: leads,
      count: leads.length,
    });
  } catch (error) {
    console.error("GET /api/leads error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch leads" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.full_name || !body.mobile_number) {
      return NextResponse.json(
        { success: false, error: "Full name and mobile number are required" },
        { status: 400 }
      );
    }

    const newLead = await dbService.createLead({
      full_name: body.full_name.trim(),
      gender: body.gender === "Female" ? "Female" : "Male",
      mobile_number: body.mobile_number.trim(),
      email_address: (body.email_address || "").trim(),
      seeking_for: body.seeking_for || "Myself",
      note: body.note || "",
      source: body.source || "Quick Profile Submission",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Inquiry received successfully! Our advisors will reach out to you.",
        data: newLead,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/leads error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to submit lead" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id, status } = await request.json();
    if (!id || !status) {
      return NextResponse.json(
        { success: false, error: "Lead ID and status are required" },
        { status: 400 }
      );
    }

    const updated = await dbService.updateLeadStatus(id, status);
    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Lead not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Lead status updated",
    });
  } catch (error) {
    console.error("PATCH /api/leads error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update lead" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { success: false, error: "Lead ID is required" },
        { status: 400 }
      );
    }

    const deleted = await dbService.deleteLead(id);
    if (!deleted) {
      return NextResponse.json(
        { success: false, error: "Lead not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Lead deleted successfully",
    });
  } catch (error) {
    console.error("DELETE /api/leads error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete lead" },
      { status: 500 }
    );
  }
}
