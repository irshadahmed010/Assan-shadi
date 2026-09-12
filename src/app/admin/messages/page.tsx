"use client";

import React, { useState, useEffect } from "react";
import {
  MessageSquareHeart,
  Search,
  Phone,
  Mail,
  Trash2,
  Eye,
  X,
  AlertTriangle,
  RefreshCw,
  Clock,
  User,
  Heart,
  Send,
  Sparkles,
  Check,
  Tag,
} from "lucide-react";
import { Lead, LeadStatus } from "@/types/database";

export default function MessagesManagerPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Lead | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/leads");
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setLeads(json.data);
      }
    } catch (e) {
      console.error("Failed to load inquiries:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleStatusChange = async (id: string, newStatus: LeadStatus) => {
    // Optimistic UI update
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l))
    );
    if (selectedLead?.id === id) {
      setSelectedLead((prev) => (prev ? { ...prev, status: newStatus } : null));
    }

    try {
      await fetch("/api/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
    } catch (e) {
      console.error("Status update error:", e);
      fetchLeads();
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/leads?id=${deleteTarget.id}`, {
        method: "DELETE",
      });
      const json = await res.json();
      if (json.success) {
        setLeads((prev) => prev.filter((l) => l.id !== deleteTarget.id));
        setDeleteTarget(null);
        if (selectedLead?.id === deleteTarget.id) {
          setSelectedLead(null);
        }
      }
    } catch (e) {
      console.error("Delete error:", e);
    } finally {
      setIsDeleting(false);
    }
  };

  // Filtered inquiries strictly matching the 5 fields
  const filteredLeads = leads.filter((lead) => {
    const matchesStatus =
      statusFilter === "all" ? true : lead.status === statusFilter;
    const q = searchQuery.toLowerCase().trim();
    const cleanPhone = (lead.mobile_number || "").replace(/\s+/g, "");
    const matchesSearch =
      !q ||
      lead.full_name.toLowerCase().includes(q) ||
      (lead.email_address && lead.email_address.toLowerCase().includes(q)) ||
      lead.mobile_number.includes(q) ||
      cleanPhone.includes(q) ||
      (lead.seeking_for && lead.seeking_for.toLowerCase().includes(q)) ||
      (lead.note && lead.note.toLowerCase().includes(q));

    return matchesStatus && matchesSearch;
  });

  // Summary counts
  const totalCount = leads.length;
  const newCount = leads.filter((l) => l.status === "new").length;
  const contactedCount = leads.filter((l) => l.status === "contacted").length;
  const doneCount = leads.filter((l) => l.status === "closed").length;

  const getStatusBadge = (status: LeadStatus) => {
    switch (status) {
      case "new":
        return {
          label: "New",
          className: "bg-amber-500/15 text-amber-300 border-amber-500/30",
        };
      case "contacted":
        return {
          label: "Contacted",
          className: "bg-blue-500/15 text-blue-300 border-blue-500/30",
        };
      case "closed":
        return {
          label: "Done",
          className: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
        };
      default:
        return {
          label: status,
          className: "bg-stone-500/15 text-stone-300 border-stone-500/30",
        };
    }
  };

  const selectedIndex = selectedLead
    ? filteredLeads.findIndex((l) => l.id === selectedLead.id)
    : -1;

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans-modern font-jakarta">
      {/* 1. Header with Title & Stats */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif-luxury text-white">
           Inquiries & Messages
          </h1>
          <p className="text-xs sm:text-sm text-stone-400 mt-1">
            Public Inquiry Form submissions: Name, Mobile, Email, Alliance Preference & Note.
          </p>
        </div>

        <button
          onClick={fetchLeads}
          className="inline-flex items-center gap-2 px-4 py-2 sm:py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-stone-200 hover:text-white text-xs sm:text-sm font-semibold border border-white/10 hover:border-[#b9965b]/40 transition-all shadow-sm shrink-0 self-start lg:self-center"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* 2. Search & Filter Bar */}
      <div className="bg-[#1e1e1e] rounded-2xl border border-white/10 p-3 sm:p-4 shadow-lg flex flex-col sm:flex-row items-center gap-3">
        {/* Search */}
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#b9965b] pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, mobile, email, seeking for, or note..."
            className="w-full bg-[#252525] text-xs sm:text-sm text-white placeholder:text-stone-500 rounded-xl pl-10 pr-4 py-2.5 sm:py-3 border border-white/10 focus:border-[#b9965b] focus:outline-none transition-colors"
          />
        </div>

        {/* Status Filter */}
        <div className="w-full sm:w-56">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full bg-[#252525] text-xs sm:text-sm text-stone-200 rounded-xl px-3.5 py-2.5 sm:py-3 border border-white/10 focus:border-[#b9965b] focus:outline-none transition-colors"
          >
            <option value="all">Status: All Inquiries</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="closed">Done</option>
          </select>
        </div>
      </div>

      {/* 3. Inquiries Responsive Cards Grid */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center space-y-3 bg-[#1e1e1e] rounded-2xl border border-white/10">
          <div className="w-8 h-8 rounded-full border-2 border-[#b9965b] border-t-transparent animate-spin" />
          <p className="text-xs text-stone-400">Loading inquiries...</p>
        </div>
      ) : filteredLeads.length === 0 ? (
        <div className="py-16 text-center space-y-3 px-4 bg-[#1e1e1e] rounded-2xl border border-white/10">
          <div className="w-12 h-12 rounded-2xl bg-white/5 text-[#e5c384] flex items-center justify-center mx-auto border border-white/10">
            <MessageSquareHeart className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold font-serif-luxury text-white">
            No Inquiries Found
          </h3>
          <p className="text-xs text-stone-400 max-w-sm mx-auto">
            No inquiry matches your current search or status filter.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
          {filteredLeads.map((inq, index) => {
            const cleanPhone = (inq.mobile_number || "").replace(/\s+/g, "");
            const formattedDate = inq.created_at
              ? new Date(inq.created_at).toLocaleString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })
              : "Recently";

            const badge = getStatusBadge(inq.status);

            return (
              <div
                key={inq.id}
                className="bg-[#1e1e1e] rounded-2xl border border-white/10 hover:border-[#b9965b]/50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 p-5 sm:p-6 flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Top Accent Gradient Line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#b9965b]/50 to-transparent" />

                <div className="space-y-4">
                  {/* Top Bar: Inquiry Number Tag, Seeking For Pill & Status Badge */}
                  <div className="flex items-center justify-between gap-2.5 flex-wrap">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#9a6a4f]/20 border border-[#b9965b]/30 text-[#e5c384] font-mono text-xs font-bold">
                        <Tag className="w-3.5 h-3.5 text-[#b9965b]" />
                        <span>{index + 1}</span>
                      </span>

                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#b9965b]/15 border border-[#b9965b]/30 text-[#e5c384] text-xs font-semibold">
                        <Heart className="w-3.5 h-3.5 text-[#b9965b]" />
                        <span>{inq.seeking_for || "Alliance"}</span>
                      </span>
                    </div>

                    <span
                      className={`text-[10px] font-bold px-2.5 py-1 rounded-[5px] uppercase tracking-wider border ${badge.className}`}
                    >
                      {badge.label}
                    </span>
                  </div>

                  {/* Candidate / Inquirer Name (without Full Name label) */}
                  <div>
                    <h4 className="font-bold font-serif-luxury text-base sm:text-lg text-white group-hover:text-[#e5c384] transition-colors truncate">
                      {inq.full_name}
                    </h4>
                  </div>

                  {/* Mobile Number Row with Icon Tab */}
                  {cleanPhone && (
                    <div className="flex items-center justify-between gap-2 pt-3 border-t border-white/5">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#252525] border border-white/10 hover:border-[#b9965b]/40 transition-colors">
                        <Phone className="w-3.5 h-3.5 text-[#b9965b]" />
                        <a
                          href={`tel:${cleanPhone}`}
                          className="text-xs font-bold text-[#e5c384] hover:text-[#f3d99e] hover:underline font-mono"
                        >
                          {inq.mobile_number}
                        </a>
                      </div>

                      <a
                        href={`https://wa.me/${cleanPhone.replace(/[^0-9]/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 border border-emerald-500/30 text-xs font-semibold transition-colors"
                        title="Chat on WhatsApp"
                      >
                        <Send className="w-3 h-3" />
                        <span>WhatsApp</span>
                      </a>
                    </div>
                  )}
                </div>

                {/* Card Footer: Submission Date, Status Toggle & Action Icons */}
                <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 text-xs text-stone-400 font-medium">
                    <Clock className="w-3.5 h-3.5 text-[#b9965b]" />
                    <span>{formattedDate}</span>
                  </div>

                  <div className="flex items-center gap-1.5">

                    <button
                      onClick={() => setSelectedLead(inq)}
                      title="Inspect Inquiry"
                      className="p-2 rounded-lg bg-white/5 hover:bg-[#b9965b]/20 text-stone-300 hover:text-[#e5c384] border border-white/10 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeleteTarget(inq)}
                      title="Delete Inquiry"
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

      {/* 4. Inspect Full Inquiry Modal (Strictly the 5 fields only) */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
          <div className="relative bg-[#1e1e1e] w-full max-w-xl max-h-[90vh] rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-white/15 animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="px-4 sm:px-7 py-4 border-b border-white/10 flex justify-between items-center bg-[#252525]/90 shrink-0">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-[#9a6a4f]/20 border border-[#b9965b]/30 text-[#e5c384] font-mono text-xs font-bold">
                    <Tag className="w-3 h-3 text-[#b9965b]" />
                    <span>{selectedIndex !== -1 ? selectedIndex + 1 : 1}</span>
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wider uppercase border ${
                      getStatusBadge(selectedLead.status).className
                    }`}
                  >
                    {getStatusBadge(selectedLead.status).label}
                  </span>
                  <span className="text-[11px] text-stone-400">
                    Submitted {selectedLead.created_at ? new Date(selectedLead.created_at).toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit", hour12: true }) : "Recently"}
                  </span>
                </div>
                <h3 className="text-base sm:text-xl font-bold text-white font-serif-luxury leading-tight truncate">
                  {selectedLead.full_name}
                </h3>
              </div>

              <button
                onClick={() => setSelectedLead(null)}
                className="p-1.5 sm:p-2 rounded-xl hover:bg-white/10 text-stone-400 hover:text-white transition-colors ml-2"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body: Strictly ONLY the 5 fields from the form */}
            <div className="flex-grow overflow-y-auto p-5 sm:p-7 custom-scrollbar space-y-4 bg-[#1e1e1e]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                {/* 1. Full Name */}
                <div className="p-3.5 bg-[#252525] rounded-xl border border-white/10 space-y-1 shadow-sm">
                  <span className="block text-[10px] uppercase tracking-wider text-stone-400 font-semibold">
                    Full Name
                  </span>
                  <span className="block text-xs sm:text-sm font-bold text-white">
                    {selectedLead.full_name}
                  </span>
                </div>

                {/* 2. Seeking Alliance For */}
                <div className="p-3.5 bg-[#252525] rounded-xl border border-white/10 space-y-1 shadow-sm">
                  <span className="block text-[10px] uppercase tracking-wider text-stone-400 font-semibold">
                    Seeking Alliance For
                  </span>
                  <span className="block text-xs sm:text-sm font-bold text-[#f3d99e]">
                    {selectedLead.seeking_for || "Not Specified"}
                  </span>
                </div>

                {/* 3. Mobile Number */}
                <div className="p-3.5 bg-[#252525] rounded-xl border border-white/10 space-y-1 shadow-sm">
                  <span className="block text-[10px] uppercase tracking-wider text-stone-400 font-semibold">
                    Mobile Number
                  </span>
                  <a
                    href={`tel:${(selectedLead.mobile_number || "").replace(/\s+/g, "")}`}
                    className="text-xs sm:text-sm font-bold text-[#e5c384] hover:underline block font-mono"
                  >
                    {selectedLead.mobile_number}
                  </a>
                </div>

                {/* 4. Email Address */}
                <div className="p-3.5 bg-[#252525] rounded-xl border border-white/10 space-y-1 shadow-sm">
                  <span className="block text-[10px] uppercase tracking-wider text-stone-400 font-semibold">
                    Email Address
                  </span>
                  <a
                    href={`mailto:${selectedLead.email_address || ""}`}
                    className="text-xs sm:text-sm font-semibold text-stone-200 hover:text-[#e5c384] hover:underline block truncate"
                  >
                    {selectedLead.email_address || "N/A"}
                  </a>
                </div>
              </div>

              {/* 5. Note */}
              <div className="p-4 bg-[#252525] rounded-xl border border-white/10 space-y-1.5 shadow-sm">
                <span className="block text-[10px] uppercase tracking-wider text-stone-400 font-semibold">
                  Note
                </span>
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed whitespace-pre-line">
                  {selectedLead.note || "No note provided."}
                </p>
              </div>

              {/* Quick Communication Bar */}
              <div className="p-3.5 bg-[#24201c] border border-[#b9965b]/30 rounded-xl flex items-center justify-between gap-3 shadow-sm">
                <span className="text-xs text-stone-300 font-medium">
                  Direct contact:
                </span>
                <div className="flex items-center gap-2">
                  <a
                    href={`https://wa.me/${(selectedLead.mobile_number || "").replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-sm"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                  <a
                    href={`tel:${(selectedLead.mobile_number || "").replace(/\s+/g, "")}`}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#9a6a4f] hover:bg-[#b17b5d] text-white text-xs font-bold transition-all shadow-sm"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Modal Bottom Actions */}
            <div className="px-4 sm:px-7 py-3.5 sm:py-4 border-t border-white/10 bg-[#252525]/90 shrink-0 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => {
                  const target = selectedLead;
                  setSelectedLead(null);
                  setDeleteTarget(target);
                }}
                className="text-xs font-semibold text-red-400 hover:text-red-300 hover:bg-red-500/10 border border-red-500/20 px-3.5 py-2 rounded-xl transition-colors flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>

              <div className="flex items-center gap-2">
                {selectedLead.status === "new" ? (
                  <button
                    onClick={() => handleStatusChange(selectedLead.id, "contacted")}
                    className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-blue-500/15 hover:bg-blue-500/25 text-blue-300 border border-blue-500/30 transition-colors"
                  >
                    Mark Contacted
                  </button>
                ) : selectedLead.status === "contacted" ? (
                  <button
                    onClick={() => handleStatusChange(selectedLead.id, "closed")}
                    className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 transition-colors"
                  >
                    Mark Done
                  </button>
                ) : (
                  <button
                    disabled
                    className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 opacity-70 cursor-default flex items-center gap-1"
                  >
                    <Check className="w-3 h-3" />
                    <span>Done</span>
                  </button>
                )}

                <button
                  onClick={() => setSelectedLead(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/15 text-white transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#1e1e1e] border border-red-500/30 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3 text-red-400">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="text-lg font-bold font-serif-luxury text-white">
                Delete Inquiry?
              </h3>
            </div>
            <p className="text-xs text-stone-300 leading-relaxed">
              Are you sure you want to delete the inquiry from{" "}
              <strong className="text-white">{deleteTarget.full_name}</strong> ({deleteTarget.mobile_number})?
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
