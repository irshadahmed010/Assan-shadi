"use client";

import React, { useState, useEffect, useTransition } from "react";
import Image from "next/image";
import {
  Users,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Clock,
  Eye,
  Trash2,
  Printer,
  ShieldCheck,
  Star,
  Phone,
  Mail,
  MapPin,
  Briefcase,
  GraduationCap,
  X,
  AlertTriangle,
  UploadCloud,
  Check,
  RefreshCw,
  Camera,
  FileText,
  Download,
  MessageSquare,
  User,
} from "lucide-react";
import { Profile, ProfileStatus, Gender, MaritalStatus } from "@/types/database";

export default function BiodatasManagerPage() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [genderFilter, setGenderFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [maritalFilter, setMaritalFilter] = useState<string>("all");

  // Selected profile for inspection modal
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Profile | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [statusUpdatingId, setStatusUpdatingId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const fetchProfiles = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (genderFilter !== "all") params.set("gender", genderFilter);
      if (statusFilter !== "all") params.set("status", statusFilter);
      if (maritalFilter !== "all") params.set("maritalStatus", maritalFilter);
      if (searchQuery.trim()) params.set("q", searchQuery.trim());

      const res = await fetch(`/api/profiles?${params.toString()}`);
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setProfiles(json.data);
      }
    } catch (e) {
      console.error("Failed to load profiles:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProfiles();
    }, 250);
    return () => clearTimeout(timer);
  }, [genderFilter, statusFilter, maritalFilter, searchQuery]);

  // Status Change handler
  const handleStatusChange = async (
    id: string,
    newStatus: ProfileStatus,
    newVerified?: boolean
  ) => {
    setStatusUpdatingId(id);
    // Optimistic UI update
    setProfiles((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              status: newStatus,
              is_verified:
                newVerified !== undefined ? newVerified : p.is_verified,
            }
          : p
      )
    );

    try {
      const res = await fetch(`/api/profiles/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: newStatus,
          is_verified:
            newVerified !== undefined
              ? newVerified
              : newStatus === "approved",
        }),
      });
      const data = await res.json();
      if (!data.success) {
        // Rollback
        fetchProfiles();
      }
    } catch (e) {
      console.error("Failed to update status:", e);
      fetchProfiles();
    } finally {
      setStatusUpdatingId(null);
    }
  };

  // Delete profile
  const handleDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/profiles/${deleteTarget.id}`, {
        method: "DELETE",
      });
      const json = await res.json();
      if (json.success) {
        setProfiles((prev) => prev.filter((p) => p.id !== deleteTarget.id));
        setDeleteTarget(null);
        if (selectedProfile?.id === deleteTarget.id) {
          setSelectedProfile(null);
        }
      }
    } catch (e) {
      console.error("Delete error:", e);
    } finally {
      setIsDeleting(false);
    }
  };

  // Print single profile biodata
  const handlePrintBiodata = (profile: Profile) => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    printWindow.document.write(`
      <html>
        <head>
          <title>Biodata - ${profile.profile_code} (${profile.full_name})</title>
          <style>
            body { font-family: 'Georgia', serif; padding: 40px; color: #171615; line-height: 1.6; }
            .header { text-align: center; border-bottom: 2px solid #b9965b; padding-bottom: 15px; margin-bottom: 25px; }
            .logo { font-size: 24px; font-weight: bold; color: #9a6a4f; }
            .badge { display: inline-block; padding: 4px 12px; background: #FAF3E6; color: #7E5C20; border-radius: 4px; font-size: 12px; font-weight: bold; }
            .section { margin-bottom: 20px; }
            .section-title { font-size: 16px; font-weight: bold; color: #9a6a4f; border-bottom: 1px solid #ddd; padding-bottom: 5px; margin-bottom: 10px; }
            .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
            .label { font-size: 12px; color: #666; text-transform: uppercase; font-family: sans-serif; }
            .value { font-size: 14px; font-weight: 600; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo">ASAAN SHAADI MATRIMONY</div>
            <div style="font-size: 12px; color: #777;">Sunnah Compliant Matrimonial Service • Confidential Profile</div>
            <h2>Biodata: ${profile.full_name} (${profile.profile_code})</h2>
            <span class="badge">${profile.gender.toUpperCase()} • ${profile.age} YRS • ${profile.marital_status.replace("_", " ").toUpperCase()}</span>
          </div>

          <div class="section">
            <div class="section-title">Personal & Religious Information</div>
            <div class="grid">
              <div><span class="label">City / Country</span><div class="value">${profile.city}, ${profile.country}</div></div>
              <div><span class="label">Religion / Sect</span><div class="value">${profile.religion} (${profile.sect})</div></div>
              <div><span class="label">Height</span><div class="value">${profile.height}</div></div>
              <div><span class="label">Mother Tongue</span><div class="value">${profile.mother_tongue}</div></div>
              <div><span class="label">Religious Values</span><div class="value">${profile.religious_values}</div></div>
              <div><span class="label">Caste / Clan</span><div class="value">${profile.caste || "N/A"}</div></div>
            </div>
          </div>

          <div class="section">
            <div class="section-title">Education & Career</div>
            <div class="grid">
              <div><span class="label">Education Level</span><div class="value">${profile.education}</div></div>
              <div><span class="label">Degree Title</span><div class="value">${profile.degree_title}</div></div>
              <div><span class="label">Profession</span><div class="value">${profile.profession}</div></div>
              <div><span class="label">Monthly Income</span><div class="value">${profile.monthly_income || "Undisclosed"}</div></div>
            </div>
          </div>

          <div class="section">
            <div class="section-title">Family & Background</div>
            <div class="grid">
              <div><span class="label">Family Setup</span><div class="value">${profile.family_type} family</div></div>
              <div><span class="label">Family Details</span><div class="value">${profile.family_details || "N/A"}</div></div>
            </div>
          </div>

          <div class="section">
            <div class="section-title">Partner Preferences</div>
            <p>${profile.partner_preferences}</p>
          </div>

          <div class="section" style="border-top: 1px dashed #bbb; padding-top: 15px;">
            <div class="section-title">Guardian Contact Details</div>
            <div class="grid">
              <div><span class="label">Contact Person</span><div class="value">${profile.contact_name} (${profile.contact_relation})</div></div>
              <div><span class="label">Phone</span><div class="value">${profile.contact_phone}</div></div>
              <div><span class="label">Email</span><div class="value">${profile.contact_email || "N/A"}</div></div>
            </div>
          </div>
          <script>
            window.onload = function() { window.print(); }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans-modern">
      {/* 1. Header with Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold font-serif-luxury text-white">
          Biodatas & Candidates Manager
        </h1>
        <p className="text-xs sm:text-sm text-stone-400 mt-1">
          Review submitted matrimony profiles, toggle verification, and moderate public visibility.
        </p>
      </div>

      {/* 2. Search & Refresh Toolbar */}
      <div className="bg-[#1e1e1e] rounded-2xl border border-white/10 p-3 sm:p-4 shadow-lg flex items-center gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#b9965b] pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search code, name, city, job..."
            className="w-full bg-[#252525] text-xs sm:text-sm text-white placeholder:text-stone-500 rounded-xl pl-10 pr-4 py-2.5 sm:py-3 border border-white/10 focus:border-[#b9965b] focus:outline-none transition-colors"
          />
        </div>

        {/* Refresh */}
        <button
          onClick={fetchProfiles}
          className="inline-flex items-center gap-2 px-4 py-2.5 sm:py-3 rounded-xl bg-white/5 hover:bg-white/10 text-stone-200 hover:text-white text-xs sm:text-sm font-semibold border border-white/10 hover:border-[#b9965b]/40 transition-all shadow-sm shrink-0"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* 3. Biodatas Grid Cards */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center space-y-3 bg-[#1e1e1e] rounded-2xl border border-white/10">
          <div className="w-8 h-8 rounded-full border-2 border-[#b9965b] border-t-transparent animate-spin" />
          <p className="text-xs text-stone-400">Loading biodatas registry...</p>
        </div>
      ) : profiles.length === 0 ? (
        <div className="py-16 text-center space-y-3 px-4 bg-[#1e1e1e] rounded-2xl border border-white/10">
          <div className="w-12 h-12 rounded-2xl bg-white/5 text-stone-400 flex items-center justify-center mx-auto border border-white/10">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold font-serif-luxury text-white">
            No Biodatas Found
          </h3>
          <p className="text-xs text-stone-400 max-w-sm mx-auto">
            No profiles matched your filter criteria. Try resetting filters or submit a new biodata.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
          {profiles.map((p) => {
            const cleanPhone = p.contact_phone ? p.contact_phone.replace(/\s+/g, "") : "";
            const formattedDate = p.created_at
              ? new Date(p.created_at).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              : "Recently added";

            return (
              <div
                key={p.id}
                className="bg-[#1e1e1e] rounded-2xl border border-white/10 hover:border-[#b9965b]/50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 p-5 sm:p-6 flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Subtle Top Gold Ambient Line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#b9965b]/50 to-transparent" />

                <div className="space-y-4">
                  {/* Card Header: Avatar / Photo + Name + Code + Status Badge */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-12 h-12 rounded-xl bg-[#252525] border border-white/10 overflow-hidden shrink-0 relative shadow-md">
                        {p.photo_url ? (
                          <img
                            src={p.photo_url}
                            alt={p.full_name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[#e5c384] font-bold text-sm bg-gradient-to-br from-[#9a6a4f]/30 to-[#493831]/30">
                            {p.full_name.charAt(0).toUpperCase()}
                          </div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-bold font-serif-luxury text-base sm:text-lg text-white group-hover:text-[#e5c384] transition-colors truncate">
                          {p.full_name}
                        </h4>
                        <span className="font-jakarta font-sans text-xs font-semibold text-[#e5c384] block mt-0.5 tracking-wide">
                          {p.profile_code}
                        </span>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className="shrink-0 flex items-center gap-1.5">
                      {p.status === "approved" ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                          <CheckCircle2 className="w-3 h-3" /> Approved
                        </span>
                      ) : p.status === "pending" ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                          <Clock className="w-3 h-3" /> Pending
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-red-500/15 text-red-300 border border-red-500/30">
                          <XCircle className="w-3 h-3" /> Rejected
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Demographics / Key Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/5 text-[11px] text-stone-300 capitalize font-medium">
                      {p.gender}, {p.age} yrs
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/5 text-[11px] text-stone-400 capitalize">
                      {p.marital_status.replace("_", " ")}
                    </span>
                    {p.height && (
                      <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/5 text-[11px] text-stone-400">
                        {p.height}
                      </span>
                    )}
                  </div>

                  {/* Details Grid */}
                  <div className="space-y-2 text-xs pt-1 border-t border-white/5">
                    {/* Location */}
                    <div className="flex items-center gap-1.5 text-stone-300">
                      <MapPin className="w-3.5 h-3.5 text-[#b9965b] shrink-0" />
                      <span className="truncate">{p.city}</span>
                    </div>

                    {/* Career & Education */}
                    <div className="flex items-center justify-between gap-2 text-stone-300">
                      <span className="flex items-center gap-1.5 text-stone-200 truncate font-medium">
                        <Briefcase className="w-3.5 h-3.5 text-[#b9965b] shrink-0" />
                        <span className="truncate">{p.profession}</span>
                      </span>
                      <span className="text-[11px] text-stone-400 truncate shrink-0">
                        {p.education}
                      </span>
                    </div>

                    {/* Direct Contact Phone (Call only, Guardian text removed) */}
                    {cleanPhone && (
                      <div className="flex items-center justify-between gap-2 pt-3 border-t border-white/5">
                        <span className="text-[11px] text-stone-400">Phone:</span>
                        <a
                          href={`tel:${cleanPhone}`}
                          className="inline-flex items-center gap-1.5 text-xs font-jakarta font-sans font-semibold text-[#e5c384] hover:text-[#f3d99e] hover:underline shrink-0"
                        >
                          <Phone className="w-3.5 h-3.5 text-[#b9965b]" />
                          <span>{cleanPhone}</span>
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Footer: Submission Date & Actions */}
                <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between gap-2">
                  {/* Submission Date (replacing Reject/Approve buttons) */}
                  <div className="flex items-center gap-1.5 text-xs text-stone-400 font-medium">
                    <Clock className="w-3.5 h-3.5 text-[#b9965b]" />
                    <span>{formattedDate}</span>
                  </div>

                  {/* Utility action icons (Print removed, Inspect & Delete kept) */}
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setSelectedProfile(p)}
                      title="Inspect Full Details"
                      className="p-2 rounded-lg bg-white/5 hover:bg-[#b9965b]/20 text-stone-300 hover:text-[#e5c384] border border-white/10 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeleteTarget(p)}
                      title="Delete Biodata"
                      className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 text-stone-400 hover:text-red-400 border border-white/10 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 4. Full Biodata Details Modal */}
      {selectedProfile && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto font-sans-modern animate-in fade-in duration-200">
          <div className="relative bg-[#1e1e1e] w-full max-w-4xl max-h-[96dvh] sm:max-h-[90vh] rounded-[5px]  shadow-2xl flex flex-col overflow-hidden border border-[#b9965b]/30">
            {/* Modal Header */}
            <div className="px-4 sm:px-6 py-3.5 sm:py-4 border-b border-white/10 flex justify-between items-center bg-[#252525]/90 shrink-0">
              <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-[#2a2420] border border-[#b9965b]/40 flex items-center justify-center shrink-0 shadow-md overflow-hidden relative">
                  {selectedProfile.photo_url ? (
                    <img
                      src={selectedProfile.photo_url}
                      alt={selectedProfile.full_name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-[#e5c384] font-bold text-lg sm:text-xl font-serif-luxury">
                      {selectedProfile.full_name.charAt(0)}
                    </span>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-base sm:text-xl font-bold text-white font-serif-luxury leading-tight break-words pr-2 truncate">
                    {selectedProfile.full_name}
                  </h3>
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-1">
                    {selectedProfile.status === "approved" ? (
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wider uppercase bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                        APPROVED
                      </span>
                    ) : selectedProfile.status === "pending" ? (
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wider uppercase bg-amber-500/15 text-amber-300 border border-amber-500/30">
                        PENDING
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wider uppercase bg-red-500/15 text-red-300 border border-red-500/30">
                        REJECTED
                      </span>
                    )}
                    <span className="text-[10px] text-stone-400 truncate">
                      Submitted {selectedProfile.created_at ? new Date(selectedProfile.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "Recently"}
                    </span>
                    <span className="font-mono text-[11px] text-[#e5c384] bg-[#9a6a4f]/20 px-2 py-0.5 rounded-md border border-[#b9965b]/30">
                      {selectedProfile.profile_code}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-3 shrink-0 ml-2">
                {selectedProfile.photo_url && (
                  <a
                    href={selectedProfile.photo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 justify-center py-1.5 px-2.5 sm:px-4 rounded-xl bg-white/5 hover:bg-[#b9965b]/20 border border-white/10 hover:border-[#b9965b]/50 text-[#e5c384] hover:text-[#f3d99e] transition-colors text-[10px] sm:text-xs font-semibold shadow-sm"
                  >
                    <Camera className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#b9965b]" />
                    <span className="hidden sm:inline">View Photo</span>
                    <span className="sm:hidden">Photo</span>
                  </a>
                )}
                <button
                  onClick={() => setSelectedProfile(null)}
                  className="p-1.5 sm:p-2 rounded-xl hover:bg-white/10 text-stone-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Scrollable Body: Clean without box layout */}
            <div className="flex-grow overflow-y-auto p-5 sm:p-8 custom-scrollbar space-y-7 bg-[#1e1e1e]">
              {/* SECTION 1: Personal Details */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-stone-200 text-xs sm:text-sm font-bold font-serif-luxury uppercase tracking-wider border-b border-white/10 pb-2.5">
                  <User className="w-4 h-4 text-[#e5c384]" />
                  <span>Personal Details</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-4 text-xs">
                  {/* Full Name */}
                  <div className="p-3.5 bg-[#252525] rounded-xl border border-white/10 space-y-1 shadow-sm">
                    <span className="block text-[10px] uppercase tracking-wider text-stone-400 font-semibold">
                      Full Name
                    </span>
                    <span className="block text-xs sm:text-sm font-bold text-white">
                      {selectedProfile.full_name}
                    </span>
                  </div>

                  {/* Gender */}
                  <div className="p-3.5 bg-[#252525] rounded-xl border border-white/10 space-y-1 shadow-sm">
                    <span className="block text-[10px] uppercase tracking-wider text-stone-400 font-semibold">
                      Gender
                    </span>
                    <span className="block text-xs sm:text-sm font-bold text-[#f3d99e] capitalize">
                      {selectedProfile.gender}
                    </span>
                  </div>

                  {/* Looking For */}
                  <div className="p-3.5 bg-[#252525] rounded-xl border border-white/10 space-y-1 shadow-sm">
                    <span className="block text-[10px] uppercase tracking-wider text-stone-400 font-semibold">
                      Looking For
                    </span>
                    <span className="block text-xs sm:text-sm font-semibold text-white">
                      {selectedProfile.contact_relation || "Self"}
                    </span>
                  </div>

                  {/* Current City & State */}
                  <div className="p-3.5 bg-[#252525] rounded-xl border border-white/10 space-y-1 shadow-sm">
                    <span className="block text-[10px] uppercase tracking-wider text-stone-400 font-semibold">
                      Current City &amp; State
                    </span>
                    <span className="block text-xs sm:text-sm font-semibold text-white">
                      {selectedProfile.city}{selectedProfile.country ? `, ${selectedProfile.country}` : ""}
                    </span>
                  </div>
                </div>
              </div>

              {/* Attached Biodata Document (Without heavy double boxes) */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-4 px-1 border-y border-white/10">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-11 h-11 rounded-xl bg-[#b9965b]/20 text-[#e5c384] flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5 text-[#e5c384]" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm sm:text-base font-bold text-white truncate">
                      Attached Biodata Document
                    </h4>
                    <p className="text-xs text-stone-400 font-medium truncate">
                      {selectedProfile.photo_url ? selectedProfile.photo_url.split("/").pop() || "BTU6HAG.webp" : "BTU6HAG.webp"}
                    </p>
                  </div>
                </div>
                <a
                  href={selectedProfile.photo_url || "https://res.cloudinary.com/dbm2dwmvg/image/upload/v1789139335/humnikah/biodata_docs/file_dpxyau.webp"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#b9965b] hover:bg-[#a3824b] text-[#1e1e1e] text-xs sm:text-sm font-bold transition-all shadow-md shrink-0"
                >
                  <Download className="w-4 h-4" />
                  <span>View / Download File</span>
                </a>
              </div>

              {/* SECTION 2: Additional Background Details (Clean without boxes) */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-stone-200 text-xs sm:text-sm font-bold font-serif-luxury uppercase tracking-wider border-b border-white/10 pb-2.5">
                  <GraduationCap className="w-4 h-4 text-[#e5c384]" />
                  <span>Additional Background Details</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-4 gap-x-6 gap-y-10 text-xs">
                  {/* Marital Status */}
                  <div className="space-y-1">
                    <span className="block text-[11px] uppercase tracking-wider text-stone-400 font-medium">
                      Marital Status
                    </span>
                    <span className="block text-sm sm:text-base font-semibold text-white capitalize">
                      {selectedProfile.marital_status.replace("_", " ")}
                    </span>
                  </div>

                  {/* Highest Education */}
                  <div className="space-y-1">
                    <span className="block text-[11px] uppercase tracking-wider text-stone-400 font-medium">
                      Highest Education
                    </span>
                    <span className="block text-sm sm:text-base font-semibold text-white">
                      {selectedProfile.degree_title || selectedProfile.education || "Not Specified"}
                    </span>
                  </div>

                  {/* Profession / Job Title */}
                  <div className="space-y-1">
                    <span className="block text-[11px] uppercase tracking-wider text-stone-400 font-medium">
                      Profession / Job Title
                    </span>
                    <span className="block text-sm sm:text-base font-semibold text-white">
                      {selectedProfile.profession || "Not Specified"}
                    </span>
                  </div>

                  {/* Brief Introduction or Partner Expectations */}
                  <div className="sm:col-span-3 space-y-1.5 pt-2">
                    <span className="block text-[11px] uppercase tracking-wider text-stone-400 font-medium">
                      Brief Introduction or Partner Expectations
                    </span>
                    <p className="text-xs sm:text-sm text-stone-300 leading-relaxed whitespace-pre-line">
                      {selectedProfile.about || selectedProfile.partner_preferences || "No introduction provided."}
                    </p>
                  </div>
                </div>
              </div>

              {/* SECTION 3: Contact & Guardian Details (In styled boxes) */}
              <div className="space-y-4 pt-2 border-t border-white/10">
                <div className="flex items-center gap-2 text-[#e5c384] text-xs sm:text-sm font-bold font-serif-luxury uppercase tracking-wider border-b border-white/10 pb-2.5">
                  <Phone className="w-4 h-4 text-[#e5c384]" />
                  <span>Contact &amp; Guardian Details</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 text-xs">
                  {/* Phone / Calling Number */}
                  <a
                    href={`tel:${(selectedProfile.contact_phone || "").replace(/\s+/g, "")}`}
                    className="group p-3.5 bg-[#252525] hover:bg-[#2e2a26] rounded-xl border border-white/10 hover:border-[#b9965b]/50 transition-all space-y-1.5 block shadow-sm"
                  >
                    <span className="block text-[10px] uppercase tracking-wider text-stone-400 font-semibold">
                      Phone / Calling Number
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-[#e5c384] group-hover:underline block font-mono">
                      {(selectedProfile.contact_phone || "").replace(/\s+/g, "")}
                    </span>
                  </a>

                  {/* WhatsApp No. */}
                  <a
                    href={`https://wa.me/${(selectedProfile.contact_phone || "").replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="group p-3.5 bg-[#252525] hover:bg-[#1f2824] rounded-xl border border-emerald-500/20 hover:border-emerald-500/50 transition-all space-y-1.5 block shadow-sm"
                  >
                    <span className="block text-[10px] uppercase tracking-wider text-stone-400 font-semibold">
                      WhatsApp No.
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-emerald-400 group-hover:underline block font-mono">
                      {(selectedProfile.contact_phone || "").replace(/\s+/g, "")}
                    </span>
                  </a>

                  {/* Email Address */}
                  <a
                    href={`mailto:${selectedProfile.contact_email || ""}`}
                    className="group p-3.5 bg-[#252525] hover:bg-[#2e2a26] rounded-xl border border-white/10 hover:border-[#b9965b]/50 transition-all space-y-1.5 block shadow-sm"
                  >
                    <span className="block text-[10px] uppercase tracking-wider text-stone-400 font-semibold">
                      Email Address
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-stone-200 group-hover:underline block truncate">
                      {selectedProfile.contact_email || "N/A"}
                    </span>
                  </a>
                </div>
              </div>
            </div>

            {/* Modal Bottom Actions */}
            <div className="px-4 sm:px-8 py-3.5 sm:py-4 border-t border-white/10 bg-[#252525]/90 shrink-0 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => {
                  const p = selectedProfile;
                  setSelectedProfile(null);
                  setDeleteTarget(p);
                }}
                className="text-xs font-semibold text-red-400 hover:text-red-300 hover:bg-red-500/10 border border-red-500/20 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl transition-colors flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>

              <div className="flex items-center gap-2 sm:gap-3 flex-1 sm:flex-none justify-end">
                <button
                  onClick={() => {
                    handleStatusChange(selectedProfile.id, "rejected", false);
                    setSelectedProfile(null);
                  }}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs font-bold bg-white/5 text-red-400 border border-red-500/30 hover:bg-red-500/15 transition-colors shadow-sm"
                >
                  <X className="w-4 h-4" />
                  <span>Reject</span>
                </button>

                {selectedProfile.status !== "approved" && (
                  <button
                    onClick={() => {
                      handleStatusChange(selectedProfile.id, "approved", true);
                      setSelectedProfile(null);
                    }}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors shadow-lg"
                  >
                    <Check className="w-4 h-4" />
                    <span>Approve</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#1e1e1e] border border-red-500/30 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center gap-3 text-red-400">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="text-lg font-bold font-serif-luxury text-white">
                Delete Biodata?
              </h3>
            </div>
            <p className="text-xs text-stone-300 leading-relaxed">
              Are you sure you want to delete profile <strong className="text-white">{deleteTarget.full_name} ({deleteTarget.profile_code})</strong>? This action cannot be undone.
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
