import { NextRequest, NextResponse } from "next/server";
import { dbService } from "@/lib/supabase";
import { getCurrentAdmin } from "@/lib/auth";

export async function GET() {
  try {
    const blogs = await dbService.getBlogs();
    return NextResponse.json({
      success: true,
      data: blogs,
      count: blogs.length,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch blogs" },
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
    if (!body.title || !body.excerpt) {
      return NextResponse.json(
        { success: false, error: "Title and excerpt are required" },
        { status: 400 }
      );
    }

    const slug =
      body.slug?.trim() ||
      body.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");

    const newBlog = await dbService.createBlog({
      slug,
      title: body.title.trim(),
      excerpt: body.excerpt.trim(),
      category: body.category || "Sunnah & Nikah",
      readTime: body.readTime || "5 min read",
      publishedAt: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
      author: {
        name: body.authorName || admin.name || "Asaan Shaadi Editor",
        role: body.authorRole || "Matrimonial Consultant",
        avatar:
          body.authorAvatar ||
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      },
      imageUrl: body.imageUrl || "",
      tags: body.tags || ["Nikah", "Sunnah", "Marriage"],
      featured: Boolean(body.featured),
      status: body.status || "published",
      content: body.content || "",
      sections: body.sections || [
        {
          heading: "Introduction",
          content: [body.excerpt],
        },
      ],
      keyTakeaways: body.keyTakeaways || [],
    });

    return NextResponse.json(
      {
        success: true,
        message: "Article published successfully",
        data: newBlog,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("POST /api/blogs error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create blog" },
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
        { success: false, error: "Blog ID is required" },
        { status: 400 }
      );
    }

    const updated = await dbService.updateBlog(id, updates);
    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Blog article not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Article updated successfully",
      data: updated,
    });
  } catch (error: any) {
    console.error("PATCH /api/blogs error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update blog" },
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
        { success: false, error: "Blog ID is required" },
        { status: 400 }
      );
    }

    const deleted = await dbService.deleteBlog(id);
    if (!deleted) {
      return NextResponse.json(
        { success: false, error: "Blog article not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Article deleted successfully",
    });
  } catch (error: any) {
    console.error("DELETE /api/blogs error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to delete blog" },
      { status: 500 }
    );
  }
}
