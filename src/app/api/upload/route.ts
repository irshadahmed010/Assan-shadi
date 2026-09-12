import { NextRequest, NextResponse } from "next/server";
import { uploadToImageKit } from "@/lib/imagekit";
import { getCurrentAdmin } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json(
        { success: false, error: "Unauthorized access" },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string) || "/assan_shadi";

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file provided" },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const result = await uploadToImageKit({
      file: buffer,
      fileName: file.name || `img_${Date.now()}`,
      folder,
    });

    if (!result) {
      return NextResponse.json(
        { success: false, error: "Failed to upload to ImageKit" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      url: result.url,
      fileId: result.fileId,
    });
  } catch (error: any) {
    console.error("Upload route error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
