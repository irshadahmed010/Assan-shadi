"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import {
  Image as ImageIcon,
  PlusCircle,
  Trash2,
  Eye,
  Edit,
  X,
  Upload,
  RefreshCw,
  AlertTriangle,
  MapPin,
  Calendar,
  ExternalLink,
  FolderPlus,
  Plus,
  Tag,
  Check,
  CheckCircle2,
} from "lucide-react";
import { GalleryItem } from "@/types/database";

interface GalleryCategory {
  id: string;
  label: string;
}

const DEFAULT_GALLERY_CATEGORIES: GalleryCategory[] = [
  { id: "nikah", label: "Nikah Ceremony" },
  { id: "walima", label: "Walima & Reception" },
  { id: "rings", label: "Rings & Promises" },
];

export default function GalleryManagerPage() {
  const [mounted, setMounted] = useState(false);
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState("all");

  useEffect(() => {
    setMounted(true);
  }, []);

  // Add / Edit Media Modal
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [previewItem, setPreviewItem] = useState<GalleryItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<GalleryItem | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Categories State
  const [categories, setCategories] = useState<GalleryCategory[]>(DEFAULT_GALLERY_CATEGORIES);
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [newCategoryLabel, setNewCategoryLabel] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [categorySuccess, setCategorySuccess] = useState("");
  const [editingCatId, setEditingCatId] = useState<string | null>(null);
  const [editCatLabelInput, setEditCatLabelInput] = useState("");
  const [isUpdatingCategory, setIsUpdatingCategory] = useState(false);

  // Form
  const [formSrc, setFormSrc] = useState("");
  const [formTitle, setFormTitle] = useState("");
  const [formCaption, setFormCaption] = useState("");
  const [formCategory, setFormCategory] = useState("nikah");
  const [formCity, setFormCity] = useState("Bangalore");
  const [formYear, setFormYear] = useState(new Date().getFullYear().toString());

  // ImageKit file upload
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/gallery");
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setItems(json.data);
        // Merge categories present in data
        setCategories((prev) => {
          const map = new Map<string, GalleryCategory>();
          prev.forEach((c) => map.set(c.id, c));
          json.data.forEach((item: GalleryItem) => {
            if (item.category && !map.has(item.category)) {
              map.set(item.category, {
                id: item.category,
                label: item.categoryLabel || item.category,
              });
            }
          });
          return Array.from(map.values());
        });
      }
    } catch (e) {
      console.error("Failed to load gallery:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    try {
      const saved = localStorage.getItem("as_custom_gallery_categories");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setCategories((prev) => {
            const map = new Map<string, GalleryCategory>();
            DEFAULT_GALLERY_CATEGORIES.forEach((c) => map.set(c.id, c));
            parsed.forEach((c: GalleryCategory) => {
              if (c && c.id && c.label) map.set(c.id, c);
            });
            return Array.from(map.values());
          });
        }
      }
    } catch (e) {
      console.warn("Could not parse saved gallery categories", e);
    }
    fetchItems();
  }, []);

  const handleCreateCategory = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const rawLabel = newCategoryLabel.trim();
    if (!rawLabel) {
      setCategoryError("Please enter a category name");
      return;
    }

    const id = rawLabel.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "") || `cat-${Date.now()}`;
    const exists = categories.some((c) => c.id === id || c.label.toLowerCase() === rawLabel.toLowerCase());
    if (exists) {
      setCategoryError("This category already exists");
      return;
    }

    const newCat: GalleryCategory = { id, label: rawLabel };
    const updated = [...categories, newCat];
    setCategories(updated);

    try {
      const saved = JSON.parse(localStorage.getItem("as_custom_gallery_categories") || "[]");
      if (!saved.some((c: any) => c.id === id)) {
        localStorage.setItem("as_custom_gallery_categories", JSON.stringify([...saved, newCat]));
      }
    } catch (err) {
      console.warn("Failed to persist custom gallery category:", err);
    }

    setFormCategory(id);
    setNewCategoryLabel("");
    setCategoryError("");
    setCategorySuccess(`Category "${rawLabel}" created successfully!`);
    setTimeout(() => setCategorySuccess(""), 3000);
  };

  const handleStartEditCategory = (cat: GalleryCategory) => {
    setEditingCatId(cat.id);
    setEditCatLabelInput(cat.label);
    setCategoryError("");
    setCategorySuccess("");
  };

  const handleCancelEditCategory = () => {
    setEditingCatId(null);
    setEditCatLabelInput("");
    setCategoryError("");
  };

  const handleSaveEditedCategory = async (catId: string) => {
    const newLabel = editCatLabelInput.trim();
    if (!newLabel) {
      setCategoryError("Category name cannot be empty");
      return;
    }

    const currentCat = categories.find((c) => c.id === catId);
    if (!currentCat || currentCat.label === newLabel) {
      setEditingCatId(null);
      return;
    }

    const exists = categories.some(
      (c) => c.id !== catId && c.label.toLowerCase() === newLabel.toLowerCase()
    );
    if (exists) {
      setCategoryError("Another category with this name already exists");
      return;
    }

    setIsUpdatingCategory(true);
    try {
      const updatedCategories = categories.map((c) =>
        c.id === catId ? { ...c, label: newLabel } : c
      );
      setCategories(updatedCategories);

      try {
        const saved = JSON.parse(localStorage.getItem("as_custom_gallery_categories") || "[]");
        const updatedSaved = saved.map((c: GalleryCategory) =>
          c.id === catId ? { ...c, label: newLabel } : c
        );
        if (!updatedSaved.some((c: GalleryCategory) => c.id === catId)) {
          updatedSaved.push({ id: catId, label: newLabel });
        }
        localStorage.setItem("as_custom_gallery_categories", JSON.stringify(updatedSaved));
      } catch (err) {
        console.warn("Failed to update saved categories:", err);
      }

      const affectedItems = items.filter((i) => i.category === catId);
      if (affectedItems.length > 0) {
        setItems((prev) =>
          prev.map((i) => (i.category === catId ? { ...i, categoryLabel: newLabel } : i))
        );

        await Promise.allSettled(
          affectedItems.map((i) =>
            fetch("/api/gallery", {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ id: i.id, categoryLabel: newLabel }),
            })
          )
        );
      }

      setEditingCatId(null);
      setEditCatLabelInput("");
      setCategoryError("");
      setCategorySuccess(`Category renamed to "${newLabel}"`);
      setTimeout(() => setCategorySuccess(""), 3000);
    } catch (err) {
      console.error("Error updating category:", err);
      setCategoryError("Failed to update category");
    } finally {
      setIsUpdatingCategory(false);
    }
  };

  const handleDeleteCategory = (catIdToDelete: string) => {
    const inUseCount = items.filter((i) => i.category === catIdToDelete).length;
    if (inUseCount > 0) {
      alert(`Cannot delete this category because ${inUseCount} photo(s) are assigned to it.`);
      return;
    }

    const updated = categories.filter((c) => c.id !== catIdToDelete);
    setCategories(updated);
    try {
      const saved = JSON.parse(localStorage.getItem("as_custom_gallery_categories") || "[]");
      const filtered = saved.filter((c: GalleryCategory) => c.id !== catIdToDelete);
      localStorage.setItem("as_custom_gallery_categories", JSON.stringify(filtered));
    } catch (err) {
      console.warn("Failed to update saved categories:", err);
    }

    if (formCategory === catIdToDelete) {
      setFormCategory(updated[0]?.id || "nikah");
    }
    if (categoryFilter === catIdToDelete) {
      setCategoryFilter("all");
    }
  };

  const openAddModal = () => {
    setEditingItem(null);
    setFormSrc("");
    setFormTitle("");
    setFormCaption("");
    setFormCategory(categories[0]?.id || "nikah");
    setFormCity("Bangalore");
    setFormYear(new Date().getFullYear().toString());
    setAddModalOpen(true);
  };

  const openEditModal = (item: GalleryItem) => {
    setEditingItem(item);
    setFormSrc(item.src);
    setFormTitle(item.title);
    setFormCaption(item.caption);
    setFormCategory(item.category);
    setFormCity(item.city);
    setFormYear(item.year);
    setAddModalOpen(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "/assan_shadi/gallery");

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const json = await res.json();
      if (json.success && json.url) {
        setFormSrc(json.url);
      } else {
        alert(json.error || "Failed to upload image to ImageKit");
      }
    } catch (err) {
      console.error("ImageKit upload error:", err);
      alert("Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSaveItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formSrc.trim() || !formTitle.trim()) return;

    setIsSaving(true);
    try {
      const matchedCat = categories.find((c) => c.id === formCategory);
      const categoryLabel = matchedCat ? matchedCat.label : formCategory;

      if (editingItem) {
        const res = await fetch("/api/gallery", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: editingItem.id,
            src: formSrc.trim(),
            title: formTitle.trim(),
            caption: formCaption.trim(),
            category: formCategory,
            categoryLabel,
            city: formCity.trim(),
            year: formYear.trim(),
          }),
        });
        const json = await res.json();
        if (json.success) {
          fetchItems();
          setAddModalOpen(false);
          setEditingItem(null);
        } else {
          alert(json.error || "Failed to update media item");
        }
      } else {
        const res = await fetch("/api/gallery", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            src: formSrc.trim(),
            title: formTitle.trim(),
            caption: formCaption.trim(),
            category: formCategory,
            categoryLabel,
            city: formCity.trim(),
            year: formYear.trim(),
          }),
        });
        const json = await res.json();
        if (json.success) {
          fetchItems();
          setAddModalOpen(false);
          setFormSrc("");
          setFormTitle("");
          setFormCaption("");
        } else {
          alert(json.error || "Failed to add media item");
        }
      }
    } catch (e) {
      console.error("Save gallery item error:", e);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/gallery?id=${deleteTarget.id}`, {
        method: "DELETE",
      });
      const json = await res.json();
      if (json.success) {
        setItems((prev) => prev.filter((i) => i.id !== deleteTarget.id));
        setDeleteTarget(null);
      }
    } catch (e) {
      console.error("Delete error:", e);
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredItems = items.filter((item) => {
    if (categoryFilter === "all") return true;
    return item.category === categoryFilter;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans-modern">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif-luxury text-white">
            Gallery & Media Management
          </h1>
          <p className="text-xs sm:text-sm text-stone-400 mt-1">
            Curate wedding photographs, couple testimonials, and moments of togetherness.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchItems}
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
            title="Manage and create gallery categories"
          >
            <FolderPlus className="w-4 h-4 text-[#b9965b]" />
            <span>Categories</span>
          </button>

          <button
            onClick={openAddModal}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#9a6a4f] to-[#b17b5d] hover:from-[#b17b5d] hover:to-[#9a6a4f] text-white text-xs sm:text-sm font-semibold shadow-lg shadow-[#9a6a4f]/25 transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Upload Photo</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-[#1e1e1e] rounded-2xl border border-white/10 w-fit">
        <button
          onClick={() => setCategoryFilter("all")}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
            categoryFilter === "all"
              ? "bg-[#9a6a4f] text-white shadow-sm"
              : "text-stone-400 hover:text-white hover:bg-white/5"
          }`}
        >
          All Photos
        </button>
        {categories.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setCategoryFilter(tab.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
              categoryFilter === tab.id
                ? "bg-[#9a6a4f] text-white shadow-sm"
                : "text-stone-400 hover:text-white hover:bg-white/5"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Gallery Visual Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {loading ? (
          <div className="col-span-full py-20 flex flex-col items-center justify-center space-y-3">
            <div className="w-8 h-8 rounded-full border-2 border-[#b9965b] border-t-transparent animate-spin" />
            <p className="text-xs text-stone-400">Loading gallery images...</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="col-span-full py-16 text-center space-y-3 bg-[#1e1e1e] rounded-2xl border border-white/10">
            <div className="w-12 h-12 rounded-2xl bg-white/5 text-stone-400 flex items-center justify-center mx-auto border border-white/10">
              <ImageIcon className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold font-serif-luxury text-white">
              No Media Uploads Found
            </h3>
            <p className="text-xs text-stone-400 max-w-sm mx-auto">
              No photos found in this category. Click &quot;Upload Photo&quot; to add new wedding memories.
            </p>
          </div>
        ) : (
          filteredItems.map((item) => (
            <div
              key={item.id}
              className="group bg-[#1e1e1e] rounded-2xl border border-white/10 overflow-hidden hover:border-[#b9965b]/40 transition-all shadow-xl flex flex-col justify-between"
            >
              <div>
                {/* Image Container with overlay buttons */}
                <div className="relative h-48 w-full bg-[#252525] overflow-hidden">
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      onClick={() => setPreviewItem(item)}
                      className="p-2 rounded-xl bg-black/60 text-white hover:text-[#e5c384] hover:bg-black/80 transition-colors"
                      title="Enlarge Photo"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => openEditModal(item)}
                      className="p-2 rounded-xl bg-black/60 text-white hover:text-[#e5c384] hover:bg-black/80 transition-colors"
                      title="Edit Photo Details"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeleteTarget(item)}
                      className="p-2 rounded-xl bg-black/60 text-stone-300 hover:text-red-400 hover:bg-black/80 transition-colors"
                      title="Delete Photo"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-[#171615]/80 backdrop-blur-sm border border-white/10 text-[10px] font-semibold uppercase tracking-wider text-[#e5c384]">
                    {item.categoryLabel || item.category}
                  </span>
                </div>

                {/* Details */}
                <div className="p-4 space-y-1.5">
                  <h4 className="text-sm font-bold font-serif-luxury text-white">
                    {item.title}
                  </h4>
                  <p className="text-xs text-stone-400 line-clamp-2 leading-relaxed">
                    {item.caption}
                  </p>
                </div>
              </div>

              <div className="px-4 py-2.5 bg-[#171615]/50 border-t border-white/5 flex items-center justify-between text-[11px] text-stone-500">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#b9965b]" />
                  <span>{item.city}</span>
                </span>
                <span>{item.year}</span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Upload / Edit Media Modal */}
      {mounted && addModalOpen && createPortal(
        <div className="fixed inset-0 z-[99999] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#1e1e1e] border border-[#b9965b]/30 rounded-2xl max-w-lg w-full p-6 sm:p-7 space-y-5 shadow-2xl my-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <h3 className="text-xl font-bold font-serif-luxury text-white">
                  {editingItem ? "Edit Gallery Photo" : "Add Photo to Gallery"}
                </h3>
                <p className="text-xs text-stone-400">
                  {editingItem
                    ? "Update photo details and category placement"
                    : "ImageKit enabled high-definition media upload"}
                </p>
              </div>
              <button
                onClick={() => setAddModalOpen(false)}
                className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-white/5"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveItem} className="space-y-4">
              {/* Image Source & File Upload */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-stone-300">
                    Image File / URL *
                  </label>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#9a6a4f]/30 hover:bg-[#9a6a4f]/50 text-[#e5c384] text-xs font-semibold border border-[#b9965b]/40 transition-colors"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>{isUploading ? "Uploading to ImageKit..." : "Upload from Device"}</span>
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>

                <input
                  type="text"
                  required
                  value={formSrc}
                  onChange={(e) => setFormSrc(e.target.value)}
                  placeholder="https://... or click Upload above"
                  className="w-full px-3.5 py-2 rounded-lg bg-[#1e1e1e] border border-white/10 text-stone-200 text-xs outline-none"
                />

                {formSrc && (
                  <div className="h-32 w-full rounded-lg overflow-hidden border border-white/10 relative mt-2">
                    <img
                      src={formSrc}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>

              {/* Title */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-stone-300">
                  Couple / Photo Title *
                </label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g. Zubair & Maryam"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#252525] border border-white/10 text-white text-xs sm:text-sm outline-none"
                />
              </div>

              {/* Caption */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-stone-300">
                  Caption / Short Story
                </label>
                <textarea
                  rows={2}
                  value={formCaption}
                  onChange={(e) => setFormCaption(e.target.value)}
                  placeholder="Brief sentence describing the blessed moment..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#252525] border border-white/10 text-white text-xs sm:text-sm outline-none resize-none"
                />
              </div>

              {/* Category, City, Year */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="block text-[11px] font-semibold text-stone-300">
                      Category *
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setCategoryError("");
                        setCategorySuccess("");
                        setCategoryModalOpen(true);
                      }}
                      className="text-[10px] text-[#b9965b] hover:text-[#e5c384] flex items-center gap-0.5 font-semibold transition-colors"
                    >
                      <Plus className="w-2.5 h-2.5" />
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
                    className="w-full px-2.5 py-2 rounded-xl bg-[#252525] border border-white/10 text-xs text-white outline-none"
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.label}
                      </option>
                    ))}
                    <option value="__NEW__" className="text-[#b9965b] font-semibold">
                      + Create New Category...
                    </option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-[11px] font-semibold text-stone-300">
                    City
                  </label>
                  <input
                    type="text"
                    value={formCity}
                    onChange={(e) => setFormCity(e.target.value)}
                    className="w-full px-2.5 py-2 rounded-xl bg-[#252525] border border-white/10 text-xs text-white outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[11px] font-semibold text-stone-300">
                    Year
                  </label>
                  <input
                    type="text"
                    value={formYear}
                    onChange={(e) => setFormYear(e.target.value)}
                    className="w-full px-2.5 py-2 rounded-xl bg-[#252525] border border-white/10 text-xs text-white outline-none"
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-stone-300 text-xs font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#9a6a4f] to-[#b17b5d] hover:from-[#b17b5d] hover:to-[#9a6a4f] text-white text-xs font-semibold shadow-lg shadow-[#9a6a4f]/30 transition-all disabled:opacity-50"
                >
                  {isSaving ? "Saving..." : editingItem ? "Update Photo" : "Add to Gallery"}
                </button>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )}

      {/* Category Manager Modal */}
      {mounted && categoryModalOpen && createPortal(
        <div className="fixed inset-0 z-[99999] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-[#1e1e1e] border border-[#b9965b]/40 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl animate-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3.5">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#9a6a4f]/20 border border-[#b9965b]/40 flex items-center justify-center text-[#e5c384]">
                  <FolderPlus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-serif-luxury text-white">
                    Manage & Create Gallery Categories
                  </h3>
                  <p className="text-[11px] text-stone-400">
                    Add new categories or edit existing labels
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
                    value={newCategoryLabel}
                    onChange={(e) => {
                      setNewCategoryLabel(e.target.value);
                      if (categoryError) setCategoryError("");
                    }}
                    placeholder="e.g. Mehndi & Celebrations"
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
                  const photoCount = items.filter((i) => i.category === cat.id).length;
                  const isDefault = DEFAULT_GALLERY_CATEGORIES.some((c) => c.id === cat.id);
                  const isEditingThis = editingCatId === cat.id;

                  return (
                    <div
                      key={cat.id}
                      className="p-2.5 rounded-xl bg-[#252525] border border-white/5 hover:border-white/10 text-xs text-stone-200 transition-colors"
                    >
                      {isEditingThis ? (
                        <div className="flex items-center gap-2 w-full">
                          <input
                            type="text"
                            value={editCatLabelInput}
                            onChange={(e) => setEditCatLabelInput(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                handleSaveEditedCategory(cat.id);
                              } else if (e.key === "Escape") {
                                handleCancelEditCategory();
                              }
                            }}
                            autoFocus
                            placeholder="Category label"
                            className="flex-1 bg-[#1a1a1a] text-white px-2.5 py-1.5 rounded-lg border border-[#b9965b] text-xs outline-none focus:ring-1 focus:ring-[#b9965b]"
                          />
                          <button
                            type="button"
                            disabled={isUpdatingCategory}
                            onClick={() => handleSaveEditedCategory(cat.id)}
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
                            <span className="truncate font-medium">{cat.label}</span>
                            {isDefault && (
                              <span className="text-[10px] text-stone-500 bg-white/5 px-1.5 py-0.5 rounded shrink-0">
                                Default
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0">
                            <span className="text-[10px] text-stone-400 bg-black/20 px-2 py-0.5 rounded-md">
                              {photoCount} {photoCount === 1 ? "photo" : "photos"}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleStartEditCategory(cat)}
                              title="Edit Category Name"
                              className="p-1 text-stone-400 hover:text-[#e5c384] hover:bg-[#b9965b]/10 rounded transition-colors"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            {!isDefault && photoCount === 0 && (
                              <button
                                type="button"
                                onClick={() => handleDeleteCategory(cat.id)}
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
        </div>,
        document.body
      )}

      {/* Lightbox / Preview Modal */}
      {mounted && previewItem && createPortal(
        <div
          className="fixed inset-0 z-[99999] bg-black/90 backdrop-blur-md overflow-y-auto p-4 sm:p-6 flex items-start sm:items-center justify-center"
          onClick={() => setPreviewItem(null)}
        >
          <div
            className="relative max-w-[460px] sm:max-w-[480px] w-full bg-[#1e1e1e] rounded-2xl overflow-hidden border border-white/15 shadow-2xl transition-all my-auto shrink-0"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image Container */}
            <div className="relative w-full h-56 sm:h-64 bg-black/95 flex items-center justify-center overflow-hidden">
              <img
                src={previewItem.src}
                alt={previewItem.title}
                className="w-full h-full object-contain"
              />
              <button
                onClick={() => setPreviewItem(null)}
                className="absolute top-3 right-3 p-1.5 sm:p-2 rounded-full bg-black/75 hover:bg-[#9a6a4f] text-white border border-white/20 transition-all hover:scale-105 active:scale-95 shadow-lg z-10"
                title="Close preview"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            {/* Content Details */}
            <div className="p-4 sm:p-5 space-y-1.5 bg-[#1e1e1e] border-t border-white/10">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#b9965b]">
                {previewItem.categoryLabel || previewItem.category}
              </span>
              <h3 className="text-lg sm:text-xl font-bold font-serif-luxury text-white">
                {previewItem.title}
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                {previewItem.caption}
              </p>
              <div className="text-xs text-stone-400 pt-2 flex items-center gap-2.5 border-t border-white/5 mt-2">
                <span>{previewItem.city}</span>
                <span>•</span>
                <span>{previewItem.year}</span>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Delete Confirmation Modal */}
      {mounted && deleteTarget && createPortal(
        <div className="fixed inset-0 z-[99999] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#1e1e1e] border border-red-500/30 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center gap-3 text-red-400">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="text-lg font-bold font-serif-luxury text-white">
                Delete Photo?
              </h3>
            </div>
            <p className="text-xs text-stone-300 leading-relaxed">
              Are you sure you want to delete <strong className="text-white">&quot;{deleteTarget.title}&quot;</strong> from the matrimonial gallery?
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
        </div>,
        document.body
      )}
    </div>
  );
}
