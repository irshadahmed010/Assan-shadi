import { NextRequest, NextResponse } from "next/server";
import { dbService } from "@/lib/supabase";
import { getCurrentAdmin } from "@/lib/auth";

export async function GET() {
  try {
    const items = await dbService.getGalleryItems();
    return NextResponse.json({
      success: true,
      data: items,
      count: items.length,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch gallery items" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    if (!body.src || !body.title) {
      return NextResponse.json(
        { success: false, error: "Image source and title are required" },
        { status: 400 }
      );
    }

    const category = body.category || "nikah";
    const categoryLabel =
      category === "nikah"
        ? "Nikah Ceremony"
        : category === "walima"
        ? "Walima & Reception"
        : "Rings & Promises";

    const newItem = await dbService.createGalleryItem({
      src: body.src,
      title: body.title.trim(),
      caption: body.caption?.trim() || "Blessed matrimonial union through Asaan Shaadi.",
      category,
      categoryLabel,
      city: body.city?.trim() || "Bangalore",
      year: body.year?.trim() || new Date().getFullYear().toString(),
    });

    return NextResponse.json(
      {
        success: true,
        message: "Media item added successfully",
        data: newItem,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("POST /api/gallery error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to add media item" },
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

    const { id, ...updates } = await request.json();
    if (!id) {
      return NextResponse.json(
        { success: false, error: "Media ID is required" },
        { status: 400 }
      );
    }

    const updated = await dbService.updateGalleryItem(id, updates);
    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Media item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Media item updated successfully",
      data: updated,
    });
  } catch (error: any) {
    console.error("PATCH /api/gallery error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update media item" },
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
        { success: false, error: "Media ID is required" },
        { status: 400 }
      );
    }

    const deleted = await dbService.deleteGalleryItem(id);
    if (!deleted) {
      return NextResponse.json(
        { success: false, error: "Media item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Media item removed successfully",
    });
  } catch (error: any) {
    console.error("DELETE /api/gallery error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to delete media item" },
      { status: 500 }
    );
  }
}
