"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  PenTool,
  Search,
  PlusCircle,
  Trash2,
  Edit,
  Eye,
  X,
  Upload,
  CheckCircle2,
  Clock,
  AlertTriangle,
  RefreshCw,
  ExternalLink,
  Sparkles,
  FolderPlus,
  Plus,
  Tag,
  Check,
} from "lucide-react";
import { BlogPost } from "@/types/database";

const DEFAULT_CATEGORIES = [
  "Sunnah & Nikah",
  "Pre-Marital Advice",
  "Family & In-Laws",
  "Communication & Love",
  "Budget & Simplicity",
];

export default function BlogsManagerPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Create / Edit Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<BlogPost | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Categories State
  const [categories, setCategories] = useState<string[]>(DEFAULT_CATEGORIES);
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [newCategoryInput, setNewCategoryInput] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [categorySuccess, setCategorySuccess] = useState("");
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [editCategoryInput, setEditCategoryInput] = useState("");
  const [isUpdatingCategory, setIsUpdatingCategory] = useState(false);

  // Form fields
  const [formTitle, setFormTitle] = useState("");
  const [formSlug, setFormSlug] = useState("");
  const [formExcerpt, setFormExcerpt] = useState("");
  const [formCategory, setFormCategory] = useState("Sunnah & Nikah");
  const [formImageUrl, setFormImageUrl] = useState("");
  const [formAuthorName, setFormAuthorName] = useState("Asaan Shaadi Editor");
  const [formAuthorRole, setFormAuthorRole] = useState("Matrimonial Advisor");
  const [formContent, setFormContent] = useState("");
  const [formStatus, setFormStatus] = useState<"published" | "draft">("published");
  const [formFeatured, setFormFeatured] = useState(false);

  // ImageKit file upload state
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/blogs");
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setBlogs(json.data);
        const postCategories = json.data
          .map((b: BlogPost) => b.category)
          .filter(Boolean);
        setCategories((prev) => Array.from(new Set([...prev, ...postCategories])));
      }
    } catch (e) {
      console.error("Failed to load blogs:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    try {
      const saved = localStorage.getItem("as_custom_blog_categories");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setCategories((prev) => Array.from(new Set([...DEFAULT_CATEGORIES, ...prev])));
        }
      }
    } catch (e) {
      console.warn("Could not parse saved blog categories", e);
    }
    fetchBlogs();
  }, []);

  const handleCreateCategory = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const raw = newCategoryInput.trim();
    if (!raw) {
      setCategoryError("Please enter a category name");
      return;
    }

    const exists = categories.some((c) => c.toLowerCase() === raw.toLowerCase());
    if (exists) {
      setCategoryError("This category already exists");
      return;
    }

    const updated = [...categories, raw];
    setCategories(updated);

    try {
      const saved = JSON.parse(localStorage.getItem("as_custom_blog_categories") || "[]");
      if (!saved.includes(raw)) {
        localStorage.setItem("as_custom_blog_categories", JSON.stringify([...saved, raw]));
      }
    } catch (err) {
      console.warn("Failed to persist custom category:", err);
    }

    setFormCategory(raw);
    setNewCategoryInput("");
    setCategoryError("");
    setCategorySuccess(`Category "${raw}" created successfully!`);
    setTimeout(() => setCategorySuccess(""), 3000);
  };

  const handleStartEditCategory = (cat: string) => {
    setEditingCategory(cat);
    setEditCategoryInput(cat);
    setCategoryError("");
    setCategorySuccess("");
  };

  const handleCancelEditCategory = () => {
    setEditingCategory(null);
    setEditCategoryInput("");
    setCategoryError("");
  };

  const handleSaveEditedCategory = async (oldName: string) => {
    const newName = editCategoryInput.trim();
    if (!newName) {
      setCategoryError("Category name cannot be empty");
      return;
    }

    if (newName === oldName) {
      setEditingCategory(null);
      return;
    }

    const exists = categories.some(
      (c) => c.toLowerCase() === newName.toLowerCase() && c.toLowerCase() !== oldName.toLowerCase()
    );
    if (exists) {
      setCategoryError("A category with this name already exists");
      return;
    }

    setIsUpdatingCategory(true);

    try {
      // 1. Update categories array
      const updatedCategories = categories.map((c) => (c === oldName ? newName : c));
      setCategories(updatedCategories);

      // 2. Update localStorage
      try {
        const saved = JSON.parse(localStorage.getItem("as_custom_blog_categories") || "[]");
        const updatedSaved = saved.map((c: string) => (c === oldName ? newName : c));
        if (!updatedSaved.includes(newName)) {
          updatedSaved.push(newName);
        }
        localStorage.setItem("as_custom_blog_categories", JSON.stringify(updatedSaved));
      } catch (err) {
        console.warn("Failed to update localStorage categories:", err);
      }

      // 3. Update blogs in state & persist to DB for any blogs using this category
      const affectedBlogs = blogs.filter((b) => b.category === oldName);
      if (affectedBlogs.length > 0) {
        setBlogs((prev) =>
          prev.map((b) => (b.category === oldName ? { ...b, category: newName } : b))
        );

        // Call PATCH /api/blogs for each affected blog to persist the category rename
        await Promise.allSettled(
          affectedBlogs.map((b) =>
            fetch("/api/blogs", {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ id: b.id, category: newName }),
            })
          )
        );
      }

      // 4. Update formCategory or filter if they were selected
      if (formCategory === oldName) {
        setFormCategory(newName);
      }
      if (categoryFilter === oldName) {
        setCategoryFilter(newName);
      }

      setEditingCategory(null);
      setEditCategoryInput("");
      setCategoryError("");
      setCategorySuccess(
        `Category renamed to "${newName}" (${affectedBlogs.length} articles updated)`
      );
      setTimeout(() => setCategorySuccess(""), 4000);
    } catch (err) {
      console.error("Error updating category:", err);
      setCategoryError("Failed to update category");
    } finally {
      setIsUpdatingCategory(false);
    }
  };

  const handleDeleteCategory = (catToDelete: string) => {
    const inUseCount = blogs.filter((b) => b.category === catToDelete).length;
    if (inUseCount > 0) {
      alert(`Cannot delete "${catToDelete}" because ${inUseCount} article(s) are currently using it.`);
      return;
    }

    const updated = categories.filter((c) => c !== catToDelete);
    setCategories(updated);
    try {
      const saved = JSON.parse(localStorage.getItem("as_custom_blog_categories") || "[]");
      const filtered = saved.filter((c: string) => c !== catToDelete);
      localStorage.setItem("as_custom_blog_categories", JSON.stringify(filtered));
    } catch (err) {
      console.warn("Failed to update saved categories:", err);
    }

    if (formCategory === catToDelete) {
      setFormCategory(updated[0] || "Sunnah & Nikah");
    }
  };

  const openCreateModal = () => {
    setEditingBlog(null);
    setFormTitle("");
    setFormSlug("");
    setFormExcerpt("");
    setFormCategory(categories[0] || "Sunnah & Nikah");
    setFormImageUrl("");
    setFormAuthorName("Asaan Shaadi Editor");
    setFormAuthorRole("Matrimonial Advisor");
    setFormContent("");
    setFormStatus("published");
    setFormFeatured(false);
    setModalOpen(true);
  };

  const openEditModal = (blog: BlogPost) => {
    setEditingBlog(blog);
    setFormTitle(blog.title);
    setFormSlug(blog.slug);
    setFormExcerpt(blog.excerpt);
    setFormCategory(blog.category);
    setFormImageUrl(blog.imageUrl);
    setFormAuthorName(blog.author.name);
    setFormAuthorRole(blog.author.role);
    setFormContent(
      blog.content ||
        blog.sections?.map((s) => `${s.heading ? `## ${s.heading}\n` : ""}${s.content.join("\n\n")}`).join("\n\n") ||
        ""
    );
    setFormStatus(blog.status);
    setFormFeatured(Boolean(blog.featured));
    setModalOpen(true);
  };

  // Image upload using ImageKit (/api/upload)
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "/assan_shadi/blogs");

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const json = await res.json();
      if (json.success && json.url) {
        setFormImageUrl(json.url);
      } else {
        alert(json.error || "Failed to upload image to ImageKit");
      }
    } catch (err) {
      console.error("Image upload error:", err);
      alert("Error uploading image");
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formExcerpt.trim()) return;

    setIsSaving(true);
    try {
      if (editingBlog) {
        // Update
        const res = await fetch("/api/blogs", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: editingBlog.id,
            title: formTitle.trim(),
            slug: formSlug.trim(),
            excerpt: formExcerpt.trim(),
            category: formCategory,
            imageUrl: formImageUrl,
            status: formStatus,
            featured: formFeatured,
            content: formContent,
            author: {
              ...editingBlog.author,
              name: formAuthorName,
              role: formAuthorRole,
            },
          }),
        });
        const json = await res.json();
        if (json.success) {
          fetchBlogs();
          setModalOpen(false);
        }
      } else {
        // Create
        const res = await fetch("/api/blogs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: formTitle.trim(),
            slug: formSlug.trim(),
            excerpt: formExcerpt.trim(),
            category: formCategory,
            imageUrl: formImageUrl,
            authorName: formAuthorName,
            authorRole: formAuthorRole,
            status: formStatus,
            featured: formFeatured,
            content: formContent,
          }),
        });
        const json = await res.json();
        if (json.success) {
          fetchBlogs();
          setModalOpen(false);
        }
      }
    } catch (err) {
      console.error("Save blog error:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/blogs?id=${deleteTarget.id}`, {
        method: "DELETE",
      });
      const json = await res.json();
      if (json.success) {
        setBlogs((prev) => prev.filter((b) => b.id !== deleteTarget.id));
        setDeleteTarget(null);
      }
    } catch (e) {
      console.error("Delete error:", e);
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredBlogs = blogs.filter((b) => {
    const matchesCat =
      categoryFilter === "all" ? true : b.category === categoryFilter;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      b.title.toLowerCase().includes(q) ||
      b.excerpt.toLowerCase().includes(q) ||
      b.author.name.toLowerCase().includes(q);

    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans-modern">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif-luxury text-white">
            Articles & Blog Management
          </h1>
          <p className="text-xs sm:text-sm text-stone-400 mt-1">
            Write Sunnah guidance, pre-marital advice, and publish articles to educate families.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchBlogs}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-stone-300 hover:text-white border border-white/10 transition-colors"
            title="Refresh"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>

          <button
            onClick={() => {
              setCategoryError("");
              setCategorySuccess("");
              setCategoryModalOpen(true);
            }}
            className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-[#b9965b]/20 text-[#e5c384] border border-[#b9965b]/30 text-xs sm:text-sm font-semibold transition-all shadow-sm"
            title="Manage and create categories"
          >
            <FolderPlus className="w-4 h-4 text-[#b9965b]" />
            <span>Categories</span>
          </button>

          <button
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#9a6a4f] to-[#b17b5d] hover:from-[#b17b5d] hover:to-[#9a6a4f] text-white text-xs sm:text-sm font-semibold shadow-lg shadow-[#9a6a4f]/25 transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Write New Article</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-[#1e1e1e] rounded-2xl border border-white/10 p-4 sm:p-5 shadow-lg flex flex-col sm:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles by title, excerpt, author..."
            className="w-full bg-[#252525] text-xs sm:text-sm text-white placeholder:text-stone-500 rounded-xl pl-10 pr-4 py-2.5 border border-white/10 focus:border-[#b9965b] focus:outline-none transition-colors"
          />
        </div>

        <div className="w-full sm:w-64">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full bg-[#252525] text-xs sm:text-sm text-stone-200 rounded-xl px-3.5 py-2.5 border border-white/10 focus:border-[#b9965b] focus:outline-none transition-colors"
          >
            <option value="all">Category: All Articles</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {loading ? (
          <div className="col-span-full py-20 flex flex-col items-center justify-center space-y-3">
            <div className="w-8 h-8 rounded-full border-2 border-[#b9965b] border-t-transparent animate-spin" />
            <p className="text-xs text-stone-400">Loading articles...</p>
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="col-span-full py-16 text-center space-y-3 bg-[#1e1e1e] rounded-2xl border border-white/10">
            <div className="w-12 h-12 rounded-2xl bg-white/5 text-stone-400 flex items-center justify-center mx-auto border border-white/10">
              <PenTool className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold font-serif-luxury text-white">
              No Articles Found
            </h3>
            <p className="text-xs text-stone-400 max-w-sm mx-auto">
              No blogs match your filter. Click &quot;Write New Article&quot; to publish your first post.
            </p>
          </div>
        ) : (
          filteredBlogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-[#1e1e1e] rounded-2xl border border-white/10 hover:border-[#b9965b]/40 transition-all shadow-xl overflow-hidden flex flex-col justify-between group"
            >
              <div>
                {/* Thumbnail Image */}
                <div className="relative h-44 w-full bg-[#252525] overflow-hidden">
                  <img
                    src={blog.imageUrl}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="px-2.5 py-1 rounded-full bg-[#171615]/80 backdrop-blur-md border border-white/10 text-[10px] font-semibold uppercase tracking-wider text-[#e5c384]">
                      {blog.category}
                    </span>
                    {blog.featured && (
                      <span className="px-2 py-0.5 rounded-full bg-[#9a6a4f] text-[10px] font-bold text-white flex items-center gap-1">
                        <Sparkles className="w-2.5 h-2.5" /> Featured
                      </span>
                    )}
                  </div>
                </div>

                {/* Body */}
                <div className="p-5 space-y-2.5">
                  <h3 className="text-base font-bold font-serif-luxury text-white group-hover:text-[#e5c384] transition-colors line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="text-xs text-stone-400 line-clamp-2 leading-relaxed">
                    {blog.excerpt}
                  </p>

                  <div className="flex items-center justify-between text-[11px] text-stone-500 pt-3 border-t border-white/5">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full overflow-hidden bg-stone-700 shrink-0">
                        <img
                          src={blog.author.avatar}
                          alt={blog.author.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-stone-300 truncate max-w-[120px]">
                        {blog.author.name}
                      </span>
                    </div>
                    <span>{blog.publishedAt}</span>
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="px-5 py-3.5 bg-[#171615]/50 border-t border-white/5 flex items-center justify-between">
                <Link
                  href={`/blog/${blog.slug}`}
                  target="_blank"
                  className="text-xs text-[#e5c384] hover:underline flex items-center gap-1"
                >
                  <span>Public View</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => openEditModal(blog)}
                    title="Edit Blog"
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-[#b9965b]/20 text-stone-300 hover:text-[#e5c384] border border-white/10 transition-colors"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setDeleteTarget(blog)}
                    title="Delete Blog"
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-red-500/20 text-stone-400 hover:text-red-400 border border-white/10 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Create / Edit Article Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#1e1e1e] border border-[#b9965b]/30 rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-5 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#9a6a4f]/20 border border-[#b9965b]/40 flex items-center justify-center text-[#e5c384]">
                  <PenTool className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-serif-luxury text-white">
                    {editingBlog ? "Edit Article" : "Create New Article"}
                  </h3>
                  <p className="text-xs text-stone-400">
                    Publish insights and relationship guidance
                  </p>
                </div>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-white/5"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveBlog} className="space-y-4">
              {/* Title & Slug */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-stone-300">
                    Article Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formTitle}
                    onChange={(e) => {
                      setFormTitle(e.target.value);
                      if (!editingBlog) {
                        setFormSlug(
                          e.target.value
                            .toLowerCase()
                            .replace(/[^a-z0-9]+/g, "-")
                            .replace(/(^-|-$)+/g, "")
                        );
                      }
                    }}
                    placeholder="e.g. The Barakah of Sunnah Nikah"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#252525] border border-white/10 focus:border-[#b9965b] text-white text-xs sm:text-sm outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-stone-300">
                    URL Slug
                  </label>
                  <input
                    type="text"
                    required
                    value={formSlug}
                    onChange={(e) => setFormSlug(e.target.value)}
                    placeholder="e.g. barakah-sunnah-nikah"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#252525] border border-white/10 focus:border-[#b9965b] text-[#e5c384] text-xs sm:text-sm font-mono outline-none"
                  />
                </div>
              </div>

              {/* Category & Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-semibold text-stone-300">
                      Category *
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setCategoryError("");
                        setCategorySuccess("");
                        setCategoryModalOpen(true);
                      }}
                      className="text-[11px] text-[#b9965b] hover:text-[#e5c384] flex items-center gap-1 font-semibold transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Create New</span>
                    </button>
                  </div>
                  <select
                    value={formCategory}
                    onChange={(e) => {
                      if (e.target.value === "__NEW__") {
                        setCategoryError("");
                        setCategorySuccess("");
                        setCategoryModalOpen(true);
                      } else {
                        setFormCategory(e.target.value);
                      }
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#252525] border border-white/10 focus:border-[#b9965b] text-white text-xs sm:text-sm outline-none"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                    <option value="__NEW__" className="text-[#b9965b] font-semibold">
                      + Create New Category...
                    </option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-stone-300">
                    Status & Visibility
                  </label>
                  <div className="flex items-center gap-4 pt-1">
                    <label className="inline-flex items-center gap-2 text-xs text-stone-300 cursor-pointer">
                      <input
                        type="radio"
                        name="status"
                        checked={formStatus === "published"}
                        onChange={() => setFormStatus("published")}
                        className="accent-[#b9965b]"
                      />
                      <span>Published</span>
                    </label>
                    <label className="inline-flex items-center gap-2 text-xs text-stone-300 cursor-pointer">
                      <input
                        type="radio"
                        name="status"
                        checked={formStatus === "draft"}
                        onChange={() => setFormStatus("draft")}
                        className="accent-[#b9965b]"
                      />
                      <span>Draft</span>
                    </label>
                    <label className="inline-flex items-center gap-2 text-xs text-[#e5c384] cursor-pointer ml-auto">
                      <input
                        type="checkbox"
                        checked={formFeatured}
                        onChange={(e) => setFormFeatured(e.target.checked)}
                        className="accent-[#b9965b]"
                      />
                      <span>Featured</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Excerpt */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-stone-300">
                  Short Excerpt / Summary *
                </label>
                <textarea
                  rows={2}
                  required
                  value={formExcerpt}
                  onChange={(e) => setFormExcerpt(e.target.value)}
                  placeholder="Brief 2-line overview shown on blog list cards..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#252525] border border-white/10 focus:border-[#b9965b] text-white text-xs sm:text-sm outline-none resize-none"
                />
              </div>

              {/* Featured Image with ImageKit Upload */}
              <div className="space-y-2 p-3.5 rounded-xl bg-[#252525] border border-white/5">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-semibold text-stone-300">
                    Featured Image (ImageKit Enabled)
                  </label>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploadingImage}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#9a6a4f]/30 hover:bg-[#9a6a4f]/50 text-[#e5c384] text-xs font-semibold border border-[#b9965b]/40 transition-colors"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>{isUploadingImage ? "Uploading..." : "Upload via ImageKit"}</span>
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>

                <input
                  type="text"
                  value={formImageUrl}
                  onChange={(e) => setFormImageUrl(e.target.value)}
                  placeholder="Image URL or upload a file above..."
                  className="w-full px-3.5 py-2 rounded-lg bg-[#1e1e1e] border border-white/10 text-stone-200 text-xs outline-none"
                />

                {formImageUrl && (
                  <div className="h-28 w-full rounded-lg overflow-hidden border border-white/10 relative mt-2">
                    <img
                      src={formImageUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>

              {/* Author Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-stone-300">
                    Author Name
                  </label>
                  <input
                    type="text"
                    value={formAuthorName}
                    onChange={(e) => setFormAuthorName(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#252525] border border-white/10 text-white text-xs sm:text-sm outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-stone-300">
                    Author Role
                  </label>
                  <input
                    type="text"
                    value={formAuthorRole}
                    onChange={(e) => setFormAuthorRole(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#252525] border border-white/10 text-white text-xs sm:text-sm outline-none"
                  />
                </div>
              </div>

              {/* Full Content */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-stone-300">
                  Full Article Content
                </label>
                <textarea
                  rows={6}
                  value={formContent}
                  onChange={(e) => setFormContent(e.target.value)}
                  placeholder="Write the article text or paste paragraphs here..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#252525] border border-white/10 focus:border-[#b9965b] text-white text-xs sm:text-sm outline-none"
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-stone-300 text-xs font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#9a6a4f] to-[#b17b5d] hover:from-[#b17b5d] hover:to-[#9a6a4f] text-white text-xs sm:text-sm font-semibold shadow-lg shadow-[#9a6a4f]/30 transition-all disabled:opacity-50"
                >
                  {isSaving ? "Saving..." : editingBlog ? "Update Article" : "Publish Article"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Categories Manager Modal */}
      {categoryModalOpen && (
        <div className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-[#1e1e1e] border border-[#b9965b]/40 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl animate-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3.5">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#9a6a4f]/20 border border-[#b9965b]/40 flex items-center justify-center text-[#e5c384]">
                  <FolderPlus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-serif-luxury text-white">
                    Manage & Create Categories
                  </h3>
                  <p className="text-[11px] text-stone-400">
                    Add new categories for blog articles
                  </p>
                </div>
              </div>
              <button
                onClick={() => setCategoryModalOpen(false)}
                className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Create New Category Form */}
            <form onSubmit={handleCreateCategory} className="space-y-3">
              <label className="block text-xs font-semibold text-stone-300">
                New Category Name
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500 pointer-events-none" />
                  <input
                    type="text"
                    value={newCategoryInput}
                    onChange={(e) => {
                      setNewCategoryInput(e.target.value);
                      if (categoryError) setCategoryError("");
                    }}
                    placeholder="e.g. Mahr & Islamic Finance"
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-[#252525] border border-white/10 focus:border-[#b9965b] text-white text-xs sm:text-sm outline-none"
                    autoFocus
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#9a6a4f] to-[#b17b5d] hover:from-[#b17b5d] hover:to-[#9a6a4f] text-white text-xs sm:text-sm font-semibold shadow-md shadow-[#9a6a4f]/25 transition-all shrink-0 flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add</span>
                </button>
              </div>

              {categoryError && (
                <p className="text-xs text-red-400 flex items-center gap-1.5 animate-in fade-in">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                  <span>{categoryError}</span>
                </p>
              )}

              {categorySuccess && (
                <p className="text-xs text-emerald-400 flex items-center gap-1.5 animate-in fade-in">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>{categorySuccess}</span>
                </p>
              )}
            </form>

            {/* Existing Categories List */}
            <div className="space-y-2 pt-2 border-t border-white/10">
              <span className="text-[11px] uppercase tracking-wider text-stone-400 font-semibold block">
                Existing Categories ({categories.length})
              </span>
              <div className="max-h-56 overflow-y-auto space-y-2 custom-scrollbar pr-1">
                {categories.map((cat) => {
                  const articleCount = blogs.filter((b) => b.category === cat).length;
                  const isDefault = DEFAULT_CATEGORIES.includes(cat);
                  const isEditingThis = editingCategory === cat;

                  return (
                    <div
                      key={cat}
                      className="p-2.5 rounded-xl bg-[#252525] border border-white/5 hover:border-white/10 text-xs text-stone-200 transition-colors"
                    >
                      {isEditingThis ? (
                        <div className="flex items-center gap-2 w-full">
                          <input
                            type="text"
                            value={editCategoryInput}
                            onChange={(e) => setEditCategoryInput(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                handleSaveEditedCategory(cat);
                              } else if (e.key === "Escape") {
                                handleCancelEditCategory();
                              }
                            }}
                            autoFocus
                            placeholder="Category name"
                            className="flex-1 bg-[#1a1a1a] text-white px-2.5 py-1.5 rounded-lg border border-[#b9965b] text-xs outline-none focus:ring-1 focus:ring-[#b9965b]"
                          />
                          <button
                            type="button"
                            disabled={isUpdatingCategory}
                            onClick={() => handleSaveEditedCategory(cat)}
                            className="p-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/30 transition-colors disabled:opacity-50"
                            title="Save"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={handleCancelEditCategory}
                            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-stone-400 hover:text-white transition-colors"
                            title="Cancel"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2 truncate flex-1 min-w-0">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#b9965b] shrink-0" />
                            <span className="truncate font-medium">{cat}</span>
                            {isDefault && (
                              <span className="text-[10px] text-stone-500 bg-white/5 px-1.5 py-0.5 rounded shrink-0">
                                Default
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0">
                            <span className="text-[10px] text-stone-400 bg-black/20 px-2 py-0.5 rounded-md">
                              {articleCount} {articleCount === 1 ? "article" : "articles"}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleStartEditCategory(cat)}
                              title="Edit Category Name"
                              className="p-1 text-stone-400 hover:text-[#e5c384] hover:bg-[#b9965b]/10 rounded transition-colors"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            {!isDefault && articleCount === 0 && (
                              <button
                                type="button"
                                onClick={() => handleDeleteCategory(cat)}
                                title="Delete custom category"
                                className="p-1 text-stone-500 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="pt-3 border-t border-white/10 flex justify-end">
              <button
                type="button"
                onClick={() => setCategoryModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#1e1e1e] border border-red-500/30 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center gap-3 text-red-400">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="text-lg font-bold font-serif-luxury text-white">
                Delete Article?
              </h3>
            </div>
            <p className="text-xs text-stone-300 leading-relaxed">
              Are you sure you want to delete <strong className="text-white">&quot;{deleteTarget.title}&quot;</strong>?
            </p>
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
              <button
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-stone-300 text-xs font-semibold transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-semibold shadow-lg shadow-red-600/30 transition-colors disabled:opacity-50"
              >
                {isDeleting ? "Deleting..." : "Confirm Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
