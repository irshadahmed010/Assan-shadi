"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Profile, ProfileStatus } from "@/types/database";
import {
  ShieldCheck,
  Star,
  Trash2,
  ExternalLink,
  Search,
} from "lucide-react";

export default function AdminProfilesPage() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchProfiles = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/profiles");
      const json = await res.json();
      if (json.success && json.data) {
        setProfiles(json.data);
      }
    } catch (e) {
      console.error("Error loading profiles:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  const handleUpdate = async (id: string, updates: Partial<Profile>) => {
    try {
      setActionLoading(id);
      const res = await fetch(`/api/profiles/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      const json = await res.json();
      if (json.success) {
        setProfiles((prev) =>
          prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
        );
      }
    } catch (e) {
      console.error("Failed to update profile:", e);
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this profile?")) return;
    try {
      setActionLoading(id);
      const res = await fetch(`/api/profiles/${id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) {
        setProfiles((prev) => prev.filter((p) => p.id !== id));
      }
    } catch (e) {
      console.error("Failed to delete profile:", e);
    } finally {
      setActionLoading(null);
    }
  };

  const filtered = profiles.filter((p) => {
    const matchesSearch =
      p.full_name.toLowerCase().includes(search.toLowerCase()) ||
      p.profile_code.toLowerCase().includes(search.toLowerCase()) ||
      p.city.toLowerCase().includes(search.toLowerCase()) ||
      p.profession.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === "all" || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto font-sans-modern">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-serif-luxury text-white">
            Manage Candidate Profiles
          </h1>
          <p className="text-sm text-[#756D65] mt-1">
            Review, verify, feature, or moderate candidate biodatas.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#11100f] p-4 rounded-2xl border border-[#E7DDD0]/15 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#756D65] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search code, name, city, profession..."
            className="w-full bg-[#171615] border border-[#E7DDD0]/15 rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder:text-[#756D65] focus:outline-none focus:border-[#B9965B]"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
          {["all", "approved", "pending", "rejected", "archived"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl capitalize transition-colors ${
                statusFilter === st
                  ? "bg-[#9a6a4f] text-white"
                  : "bg-[#171615] text-[#756D65] hover:text-white"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Profiles Table */}
      <div className="bg-[#11100f] rounded-3xl border border-[#E7DDD0]/15 p-6 overflow-hidden">
        {loading ? (
          <div className="py-16 text-center text-[#756D65]">Loading biodatas...</div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center text-[#756D65]">
            No profiles match your search criteria.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-[#FAF7F2]/80">
              <thead className="text-xs uppercase bg-[#171615] text-[#756D65] border-b border-[#E7DDD0]/15">
                <tr>
                  <th className="px-4 py-3 rounded-l-xl">Code</th>
                  <th className="px-4 py-3">Candidate</th>
                  <th className="px-4 py-3">Details</th>
                  <th className="px-4 py-3">Guardian Contact</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Badges</th>
                  <th className="px-4 py-3 text-right rounded-r-xl">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E7DDD0]/10">
                {filtered.map((p) => (
                  <tr key={p.id} className="hover:bg-[#171615]/50 transition-colors">
                    <td className="px-4 py-4 font-mono text-[#B9965B] font-semibold text-xs">
                      {p.profile_code}
                    </td>
                    <td className="px-4 py-4">
                      <div className="font-semibold text-white">{p.full_name}</div>
                      <div className="text-xs text-[#756D65] capitalize">
                        {p.gender} • {p.age} yrs • {p.city}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-xs text-[#FAF7F2]/70">
                      <div>{p.profession}</div>
                      <div className="text-[#756D65]">{p.education}</div>
                    </td>
                    <td className="px-4 py-4 text-xs text-[#756D65]">
                      <div className="text-white">{p.contact_name}</div>
                      <div>
                        {p.contact_phone} ({p.contact_relation})
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <select
                        value={p.status}
                        disabled={actionLoading === p.id}
                        onChange={(e) =>
                          handleUpdate(p.id, { status: e.target.value as ProfileStatus })
                        }
                        className={`text-xs px-2 py-1 rounded-lg font-semibold uppercase bg-[#171615] border ${
                          p.status === "approved"
                            ? "text-[#f5ede6] bg-[#9a6a4f]/20 border-[#9a6a4f]/40"
                            : p.status === "pending"
                            ? "text-[#B9965B] bg-[#B9965B]/10 border-[#B9965B]/40"
                            : "text-[#756D65] bg-[#171615] border-[#E7DDD0]/15"
                        }`}
                      >
                        <option value="approved">Approved</option>
                        <option value="pending">Pending</option>
                        <option value="rejected">Rejected</option>
                        <option value="archived">Archived</option>
                      </select>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() =>
                            handleUpdate(p.id, { is_verified: !p.is_verified })
                          }
                          title={p.is_verified ? "Revoke Verification" : "Mark Verified"}
                          className={`p-1.5 rounded-lg border transition-colors ${
                            p.is_verified
                              ? "bg-[#9a6a4f]/20 border-[#9a6a4f] text-[#f5ede6]"
                              : "bg-[#171615] border-[#E7DDD0]/15 text-[#756D65] hover:text-[#FAF7F2]"
                          }`}
                        >
                          <ShieldCheck className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            handleUpdate(p.id, { is_featured: !p.is_featured })
                          }
                          title={p.is_featured ? "Remove Featured" : "Feature on Homepage"}
                          className={`p-1.5 rounded-lg border transition-colors ${
                            p.is_featured
                              ? "bg-[#B9965B]/20 border-[#B9965B] text-[#B9965B]"
                              : "bg-[#171615] border-[#E7DDD0]/15 text-[#756D65] hover:text-[#FAF7F2]"
                          }`}
                        >
                          <Star className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          type="button"
                          disabled={actionLoading === p.id}
                          onClick={() => handleDelete(p.id)}
                          className="p-1.5 text-[#756D65] hover:text-[#b17b5d] rounded-lg hover:bg-[#171615] transition-colors"
                          title="Delete Profile"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
