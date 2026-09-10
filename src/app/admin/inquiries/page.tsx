"use client";

import React, { useState, useEffect } from "react";
import { Inquiry, InquiryStatus } from "@/types/database";
import {
  Search,
} from "lucide-react";

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/inquiries");
      const json = await res.json();
      if (json.success && json.data) {
        setInquiries(json.data);
      }
    } catch (e) {
      console.error("Error fetching inquiries:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleStatusChange = async (id: string, status: InquiryStatus) => {
    try {
      const res = await fetch("/api/inquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      const json = await res.json();
      if (json.success) {
        setInquiries((prev) =>
          prev.map((i) => (i.id === id ? { ...i, status } : i))
        );
        if (selectedInquiry?.id === id) {
          setSelectedInquiry((prev) => (prev ? { ...prev, status } : null));
        }
      }
    } catch (e) {
      console.error("Failed to update inquiry status:", e);
    }
  };

  const filtered = inquiries.filter((inq) => {
    const matchesSearch =
      inq.sender_name.toLowerCase().includes(search.toLowerCase()) ||
      inq.profile_code.toLowerCase().includes(search.toLowerCase()) ||
      inq.sender_city.toLowerCase().includes(search.toLowerCase()) ||
      inq.sender_phone.includes(search);

    const matchesStatus = statusFilter === "all" || inq.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto font-sans-modern">
      <div>
        <h1 className="text-3xl font-bold font-serif-luxury text-white">
          Match Proposal Inquiries
        </h1>
        <p className="text-sm text-[#756D65] mt-1">
          Review incoming proposal notes from families and coordinate communication with guardians.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#11100f] p-4 rounded-2xl border border-[#E7DDD0]/15 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#756D65] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search candidate code, sender, city, phone..."
            className="w-full bg-[#171615] border border-[#E7DDD0]/15 rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder:text-[#756D65] focus:outline-none focus:border-[#B9965B]"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
          {["all", "pending", "reviewed", "contacted", "closed"].map((st) => (
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

      {/* Inquiries Table */}
      <div className="bg-[#11100f] rounded-3xl border border-[#E7DDD0]/15 p-6 overflow-hidden">
        {loading ? (
          <div className="py-16 text-center text-[#756D65]">Loading inquiries...</div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center text-[#756D65]">
            No inquiries match your current filter.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-[#FAF7F2]/80">
              <thead className="text-xs uppercase bg-[#171615] text-[#756D65] border-b border-[#E7DDD0]/15">
                <tr>
                  <th className="px-4 py-3 rounded-l-xl">Target Code</th>
                  <th className="px-4 py-3">Inquiring Family</th>
                  <th className="px-4 py-3">Phone & Email</th>
                  <th className="px-4 py-3">Proposal Note Preview</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right rounded-r-xl">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E7DDD0]/10">
                {filtered.map((inq) => (
                  <tr key={inq.id} className="hover:bg-[#171615]/50 transition-colors">
                    <td className="px-4 py-4 font-mono font-bold text-[#B9965B] text-xs">
                      {inq.profile_code}
                    </td>
                    <td className="px-4 py-4">
                      <div className="font-semibold text-white">{inq.sender_name}</div>
                      <div className="text-xs text-[#756D65]">
                        {inq.sender_relation} • {inq.sender_city}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-xs text-[#FAF7F2]/70">
                      <div>{inq.sender_phone}</div>
                      <div className="text-[#756D65]">{inq.sender_email}</div>
                    </td>
                    <td className="px-4 py-4 text-xs text-[#756D65] max-w-xs truncate">
                      {inq.message}
                    </td>
                    <td className="px-4 py-4">
                      <select
                        value={inq.status}
                        onChange={(e) =>
                          handleStatusChange(inq.id, e.target.value as InquiryStatus)
                        }
                        className={`text-xs px-2.5 py-1 rounded-lg font-semibold uppercase bg-[#171615] border ${
                          inq.status === "pending"
                            ? "text-[#B9965B] border-[#B9965B]/40 bg-[#B9965B]/10"
                            : inq.status === "contacted"
                            ? "text-[#f5ede6] border-[#9a6a4f]/40 bg-[#9a6a4f]/20"
                            : "text-[#756D65] border-[#E7DDD0]/15"
                        }`}
                      >
                        <option value="pending">Pending</option>
                        <option value="reviewed">Reviewed</option>
                        <option value="contacted">Contacted</option>
                        <option value="closed">Closed</option>
                      </select>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <button
                        type="button"
                        onClick={() => setSelectedInquiry(inq)}
                        className="px-3 py-1 bg-[#171615] hover:bg-[#11100f] border border-[#E7DDD0]/15 text-white rounded-lg text-xs font-medium transition-colors"
                      >
                        Read Note
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Inquiry Detail Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm font-sans-modern">
          <div className="bg-[#11100f] w-full max-w-lg rounded-3xl p-6 sm:p-8 border border-[#E7DDD0]/20 space-y-6 text-white text-left">
            <div className="flex items-center justify-between border-b border-[#E7DDD0]/15 pb-4">
              <div>
                <span className="text-xs font-mono text-[#B9965B]">
                  Target: {selectedInquiry.profile_code}
                </span>
                <h3 className="text-xl font-bold font-serif-luxury text-white mt-1">
                  Inquiry from {selectedInquiry.sender_name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="text-[#756D65] hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs bg-[#171615] p-4 rounded-2xl border border-[#E7DDD0]/15">
              <div>
                <span className="text-[#756D65] block uppercase">Relationship</span>
                <span className="text-white font-medium text-sm">
                  {selectedInquiry.sender_relation}
                </span>
              </div>
              <div>
                <span className="text-[#756D65] block uppercase">City / Country</span>
                <span className="text-white font-medium text-sm">
                  {selectedInquiry.sender_city}
                </span>
              </div>
              <div>
                <span className="text-[#756D65] block uppercase">Phone / WhatsApp</span>
                <span className="text-white font-medium text-sm">
                  {selectedInquiry.sender_phone}
                </span>
              </div>
              <div>
                <span className="text-[#756D65] block uppercase">Email</span>
                <span className="text-white font-medium text-sm">
                  {selectedInquiry.sender_email}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-semibold text-[#756D65] uppercase tracking-wider block">
                Full Family Proposal Note
              </span>
              <p className="text-sm text-[#FAF7F2]/80 bg-[#171615] p-4 rounded-2xl border border-[#E7DDD0]/15 leading-relaxed whitespace-pre-line">
                {selectedInquiry.message}
              </p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[#E7DDD0]/15">
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#756D65]">Status:</span>
                <select
                  value={selectedInquiry.status}
                  onChange={(e) =>
                    handleStatusChange(
                      selectedInquiry.id,
                      e.target.value as InquiryStatus
                    )
                  }
                  className="text-xs px-2.5 py-1 rounded-lg font-semibold uppercase bg-[#171615] border border-[#E7DDD0]/20 text-[#B9965B]"
                >
                  <option value="pending">Pending</option>
                  <option value="reviewed">Reviewed</option>
                  <option value="contacted">Contacted</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="px-4 py-2 bg-[#9a6a4f] hover:bg-[#b17b5d] rounded-xl text-xs font-semibold text-white"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
