"use client";

import React, { useState, useEffect } from "react";
import {
  Target,
  Search,
  Phone,
  Mail,
  User,
  Trash2,
  CheckCircle2,
  Eye,
  X,
  AlertTriangle,
  RefreshCw,
  Sparkles,
  PhoneCall,
} from "lucide-react";
import { Lead, LeadStatus } from "@/types/database";

export default function LeadsManagerPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [genderFilter, setGenderFilter] = useState<string>("all");

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
      console.error("Failed to load leads:", e);
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

  // Filtered Leads
  const filteredLeads = leads.filter((lead) => {
    const matchesStatus =
      statusFilter === "all" ? true : lead.status === statusFilter;
    const matchesGender =
      genderFilter === "all" ? true : lead.gender === genderFilter;
    const q = searchQuery.toLowerCase().trim();
    const cleanPhone = lead.mobile_number.replace(/\s+/g, "");
    const matchesSearch =
      !q ||
      lead.full_name.toLowerCase().includes(q) ||
      (lead.email_address && lead.email_address.toLowerCase().includes(q)) ||
      lead.mobile_number.includes(q) ||
      cleanPhone.includes(q) ||
      (lead.gender && lead.gender.toLowerCase().includes(q));

    return matchesStatus && matchesGender && matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans-modern select-none">
      {/* 1. Header (Clean, Background-free) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-1">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#9a6a4f]/25 border border-[#b9965b]/40 text-[#f3d99e] text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#b9965b]" />
            <span>Quick Profile Submission CRM</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif-luxury text-white tracking-tight">
            Quick Profile Leads
          </h1>
          <p className="text-xs sm:text-sm text-stone-300 max-w-2xl leading-relaxed">
            Quick Profile submissions: Name, Gender, Phone & Email.
          </p>
        </div>

        <button
          onClick={fetchLeads}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-stone-200 hover:text-white text-xs font-semibold border border-white/10 hover:border-[#b9965b]/40 transition-all shadow-sm shrink-0 self-start sm:self-center"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* 2. Search & Filter Bar */}
      <div className="bg-[#1e1e1e] rounded-2xl border border-[#b9965b]/25 p-4 sm:p-5 shadow-xl flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
        {/* Search */}
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#b9965b] pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, phone number, email, or gender..."
            className="w-full bg-[#252525] text-xs sm:text-sm text-white placeholder:text-stone-500 rounded-xl pl-10 pr-4 py-2.5 sm:py-3 border border-white/10 focus:border-[#b9965b] focus:ring-1 focus:ring-[#b9965b]/30 focus:outline-none transition-all"
          />
        </div>

        {/* Gender Filter */}
        <div className="w-full sm:w-44">
          <select
            value={genderFilter}
            onChange={(e) => setGenderFilter(e.target.value)}
            className="w-full bg-[#252525] text-xs sm:text-sm text-stone-200 rounded-xl px-3.5 py-2.5 sm:py-3 border border-white/10 focus:border-[#b9965b] focus:outline-none transition-colors"
          >
            <option value="all">Gender: All</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        {/* Status Dropdown Filter */}
        <div className="w-full sm:w-56">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full bg-[#252525] text-xs sm:text-sm text-stone-200 rounded-xl px-3.5 py-2.5 sm:py-3 border border-white/10 focus:border-[#b9965b] focus:outline-none transition-colors"
          >
            <option value="all">Status: All</option>
            <option value="new">Mark Contacted</option>
            <option value="contacted">Mark Done</option>
            <option value="closed">DONE</option>
          </select>
        </div>
      </div>

      {/* 3. Leads Grid Cards */}
      {loading ? (
        <div className="py-24 flex flex-col items-center justify-center space-y-3 bg-[#1e1e1e] rounded-2xl border border-white/10">
          <div className="w-10 h-10 rounded-2xl bg-[#9a6a4f]/20 border border-[#b9965b]/40 flex items-center justify-center animate-pulse">
            <div className="w-5 h-5 rounded-full border-2 border-[#b9965b] border-t-transparent animate-spin" />
          </div>
          <p className="text-xs font-semibold text-stone-400">
            Retrieving quick profile submissions...
          </p>
        </div>
      ) : filteredLeads.length === 0 ? (
        <div className="py-20 text-center space-y-3 px-4 bg-[#1e1e1e] rounded-2xl border border-white/10">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#9a6a4f]/20 to-[#493831]/20 border border-[#b9965b]/30 text-[#e5c384] flex items-center justify-center mx-auto shadow-lg">
            <Target className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold font-serif-luxury text-white">
            No Matching Leads
          </h3>
          <p className="text-xs text-stone-400 max-w-md mx-auto leading-relaxed">
            No leads match your current search query or filter. Reset filters to see all recorded entries.
          </p>
        </div>
      ) : (
        /* Responsive Grid (1 col mobile, 2 col tablet, 3 col desktop) */
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
          {filteredLeads.map((lead) => {
            const initials = lead.full_name
              .split(" ")
              .map((n) => n[0])
              .slice(0, 2)
              .join("")
              .toUpperCase();

            const formattedDate = new Date(lead.created_at).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            });

            const cleanPhone = lead.mobile_number.replace(/\s+/g, "");

            return (
              <div
                key={lead.id}
                className="bg-[#1e1e1e] rounded-2xl border border-white/10 hover:border-[#b9965b]/50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 p-5 sm:p-6 flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Subtle Top Gold Ambient Line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#b9965b]/50 to-transparent" />

                <div className="space-y-4">
                  {/* Card Header: Avatar Monogram + Lead Name + Status Badge */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#9a6a4f] to-[#493831] border border-[#b9965b]/40 flex items-center justify-center text-[#f3d99e] font-serif-luxury font-bold text-base shadow-md shrink-0">
                        {initials || "AS"}
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-bold font-serif-luxury text-base sm:text-lg text-white group-hover:text-[#e5c384] transition-colors truncate">
                          {lead.full_name}
                        </h4>
                        <span className="text-[11px] text-stone-400 block mt-0.5 truncate">
                          Quick Profile • {formattedDate}
                        </span>
                      </div>
                    </div>

                    {/* Status Badge (Display only) */}
                    <div className="shrink-0">
                      <span
                        className={`text-[11px] px-2.5 py-1 rounded-xl font-semibold uppercase tracking-wider border inline-flex items-center gap-1.5 ${
                          lead.status === "closed"
                            ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/30"
                            : lead.status === "contacted"
                            ? "bg-blue-500/15 text-blue-300 border-blue-500/30"
                            : "bg-gradient-to-r from-[#b9965b]/20 to-[#9a6a4f]/20 text-[#f3d99e] border-[#b9965b]/40 shadow-sm"
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                        <span>
                          {lead.status === "closed"
                            ? "Done"
                            : lead.status === "contacted"
                            ? "Contacted"
                            : "New"}
                        </span>
                      </span>
                    </div>
                  </div>

                  {/* Call with Number (No spaces) */}
                  <div className="py-3.5 px-4 rounded-xl bg-[#252525] border border-white/5 hover:border-[#b9965b]/40 transition-all flex items-center justify-between group/call">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#9a6a4f]/30 to-[#493831]/30 border border-[#b9965b]/30 flex items-center justify-center text-[#e5c384] group-hover/call:text-white group-hover/call:border-[#b9965b] transition-all shrink-0">
                        <PhoneCall className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[10px] text-stone-400 block font-semibold uppercase tracking-wider">
                          Call / Phone
                        </span>
                        <a
                          href={`tel:${cleanPhone}`}
                          className="font-jakarta font-sans font-bold text-[11px] sm:text-[12px] text-[#e5c384] group-hover/call:text-white hover:underline truncate block"
                        >
                          {cleanPhone}
                        </a>
                      </div>
                    </div>

                    <a
                      href={`tel:${cleanPhone}`}
                      title={`Call ${lead.full_name}`}
                      className="py-2 px-3.5 rounded-xl bg-[#9a6a4f]/25 hover:bg-[#9a6a4f] text-[#f3d99e] hover:text-white border border-[#9a6a4f]/40 font-semibold text-xs flex items-center gap-1.5 transition-all shadow-sm shrink-0"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Call</span>
                    </a>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="pt-4 mt-4 border-t border-white/5 flex items-center gap-2">
                  {/* Status Button: Mark Contacted -> Mark Done -> DONE (Disabled) */}
                  <button
                    type="button"
                    disabled={lead.status === "closed"}
                    onClick={() => {
                      if (lead.status === "new") {
                        handleStatusChange(lead.id, "contacted");
                      } else if (lead.status === "contacted") {
                        handleStatusChange(lead.id, "closed");
                      }
                    }}
                    className={`flex-1 py-2.5 px-3 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-sm border ${
                      lead.status === "closed"
                        ? "bg-emerald-600/20 text-emerald-300 border-emerald-500/40 cursor-not-allowed opacity-80"
                        : lead.status === "contacted"
                        ? "bg-blue-500/20 text-blue-300 border-blue-500/40 hover:bg-blue-500/30 cursor-pointer"
                        : "bg-[#9a6a4f]/25 text-[#f3d99e] border-[#9a6a4f]/40 hover:bg-[#9a6a4f] hover:text-white cursor-pointer"
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>
                      {lead.status === "closed"
                        ? "DONE"
                        : lead.status === "contacted"
                        ? "Mark Done"
                        : "Mark Contacted"}
                    </span>
                  </button>

                  {/* Inspect Button */}
                  <button
                    onClick={() => setSelectedLead(lead)}
                    title="Inspect Lead Details"
                    className="p-2.5 rounded-xl bg-white/5 hover:bg-[#b9965b]/20 text-stone-300 hover:text-[#f3d99e] border border-white/10 hover:border-[#b9965b]/40 transition-colors shrink-0"
                  >
                    <Eye className="w-4 h-4" />
                  </button>

                  {/* Delete Button */}
                  <button
                    onClick={() => setDeleteTarget(lead)}
                    title="Delete Lead"
                    className="p-2.5 rounded-xl bg-white/5 hover:bg-red-500/20 text-stone-400 hover:text-red-400 border border-white/10 hover:border-red-500/30 transition-colors shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 4. Detailed Inspection Modal (Quick Profile Submission View) */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#1e1e1e] border border-[#b9965b]/35 rounded-2xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#9a6a4f] to-[#493831] border border-[#b9965b]/40 flex items-center justify-center text-[#f3d99e] font-serif-luxury font-bold text-base shadow-lg shrink-0">
                  {selectedLead.full_name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-[#b9965b]">
                      Quick Profile Submission
                    </span>
                  </div>
                  <h3 className="text-xl font-bold font-serif-luxury text-white">
                    {selectedLead.full_name}
                  </h3>
                  <span className="text-xs text-stone-400 block mt-0.5">
                    Gender: <strong className="text-[#f3d99e]">{selectedLead.gender || "Male"}</strong>
                  </span>
                </div>
              </div>

              <button
                onClick={() => setSelectedLead(null)}
                className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-white/5"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Information Grid: Exactly the 4 Quick Profile Submission fields */}
            <div className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                {/* 1. Full Name */}
                <div className="p-3.5 bg-[#252525] rounded-xl border border-white/5 space-y-1">
                  <span className="text-stone-400 block text-[10px] uppercase font-semibold">
                    Full Name
                  </span>
                  <span className="text-white font-bold text-sm block truncate">
                    {selectedLead.full_name}
                  </span>
                </div>

                {/* 2. Gender */}
                <div className="p-3.5 bg-[#252525] rounded-xl border border-white/5 space-y-1">
                  <span className="text-stone-400 block text-[10px] uppercase font-semibold">
                    Gender
                  </span>
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold border mt-0.5 ${
                      selectedLead.gender === "Female"
                        ? "bg-rose-500/15 text-rose-300 border-rose-500/30"
                        : "bg-[#b9965b]/15 text-[#f3d99e] border-[#b9965b]/30"
                    }`}
                  >
                    <User className="w-3 h-3" />
                    <span>{selectedLead.gender || "Male"}</span>
                  </span>
                </div>
              </div>

              {/* 3. WhatsApp / Calling Number */}
              <div className="p-3.5 bg-[#252525] rounded-xl border border-white/5 space-y-1">
                <span className="text-stone-400 block text-[10px] uppercase font-semibold">
                  WhatsApp / Calling Number
                </span>
                <a
                  href={`tel:${selectedLead.mobile_number.replace(/\s+/g, "")}`}
                  className="text-[#e5c384] font-mono font-bold text-sm hover:underline block"
                >
                  {selectedLead.mobile_number.replace(/\s+/g, "")}
                </a>
              </div>

              {/* 4. Email Address */}
              <div className="p-3.5 bg-[#252525] rounded-xl border border-white/5 space-y-1">
                <span className="text-stone-400 block text-[10px] uppercase font-semibold">
                  Email Address
                </span>
                {selectedLead.email_address ? (
                  <a
                    href={`mailto:${selectedLead.email_address}`}
                    className="text-stone-200 font-medium hover:text-[#e5c384] block truncate"
                  >
                    {selectedLead.email_address}
                  </a>
                ) : (
                  <span className="text-stone-500 italic block">Not provided</span>
                )}
              </div>

              {/* Timestamp & Status info */}
              <div className="flex items-center justify-between text-[11px] text-stone-500 pt-1">
                <span>Inquiry ID: {selectedLead.id}</span>
                <span>{new Date(selectedLead.created_at).toLocaleString()}</span>
              </div>

              {/* Contact Action Bar */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <a
                  href={`https://wa.me/${selectedLead.mobile_number.replace(/[^0-9]/g, "")}?text=Hello%20${encodeURIComponent(
                    selectedLead.full_name
                  )},%20I%20am%20calling%20from%20Asaan%20Shaadi%20regarding%20your%20quick%20profile%20submission.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Open WhatsApp</span>
                </a>

                <a
                  href={`tel:${selectedLead.mobile_number.replace(/\s+/g, "")}`}
                  className="py-3 rounded-xl bg-gradient-to-r from-[#9a6a4f] to-[#b17b5d] hover:from-[#b17b5d] hover:to-[#9a6a4f] text-white font-semibold text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#9a6a4f]/25"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Directly</span>
                </a>
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
                Delete Quick Profile Lead?
              </h3>
            </div>
            <p className="text-xs text-stone-300 leading-relaxed">
              Are you sure you want to remove lead from <strong className="text-white">{deleteTarget.full_name}</strong>? This action cannot be reversed.
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
