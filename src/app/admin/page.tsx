import React from "react";
import Link from "next/link";
import { dbService } from "@/lib/supabase";
import { Button } from "@/components/ui/Button";
import {
  Users,
  MessageSquareHeart,
  ShieldCheck,
  Star,
  ArrowUpRight,
  Clock,
  CheckCircle2,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const profiles = await dbService.getProfiles();
  const inquiries = await dbService.getInquiries();

  const totalProfiles = profiles.length;
  const verifiedProfiles = profiles.filter((p) => p.is_verified).length;
  const featuredProfiles = profiles.filter((p) => p.is_featured).length;
  const pendingInquiries = inquiries.filter((i) => i.status === "pending").length;

  return (
    <div className="space-y-8 max-w-7xl mx-auto font-sans-modern">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-serif-luxury text-white">
            Dashboard Overview
          </h1>
          <p className="text-sm text-[#756D65] mt-1">
            Monitor verified candidate biodatas, pending moderation, and guardian match inquiries.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/admin/profiles">
            <Button
              variant="outline"
              size="sm"
              className="bg-[#11100f] text-white border-[#E7DDD0]/20 hover:bg-[#171615]"
            >
              Manage Profiles
            </Button>
          </Link>
          <Link href="/admin/inquiries">
            <Button
              variant="primary"
              size="sm"
              className="bg-[#9a6a4f] hover:bg-[#b17b5d]"
            >
              View Inquiries ({pendingInquiries} New)
            </Button>
          </Link>
        </div>
      </div>

      {/* Analytical Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-[#11100f] p-6 rounded-3xl border border-[#E7DDD0]/15 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#756D65] uppercase tracking-wider">
              Total Profiles
            </span>
            <div className="w-10 h-10 rounded-xl bg-[#9a6a4f]/20 text-[#f5ede6] flex items-center justify-center border border-[#9a6a4f]/40">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-bold font-serif-luxury text-white">
            {totalProfiles}
          </div>
          <p className="text-xs text-[#f5ede6] flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#B9965B]" /> Active in database
          </p>
        </div>

        <div className="bg-[#11100f] p-6 rounded-3xl border border-[#E7DDD0]/15 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#756D65] uppercase tracking-wider">
              Guardian Inquiries
            </span>
            <div className="w-10 h-10 rounded-xl bg-[#B9965B]/20 text-[#B9965B] flex items-center justify-center border border-[#B9965B]/40">
              <MessageSquareHeart className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-bold font-serif-luxury text-white">
            {inquiries.length}
          </div>
          <p className="text-xs text-[#B9965B] flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> {pendingInquiries} pending review
          </p>
        </div>

        <div className="bg-[#11100f] p-6 rounded-3xl border border-[#E7DDD0]/15 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#756D65] uppercase tracking-wider">
              Verified Biodatas
            </span>
            <div className="w-10 h-10 rounded-xl bg-[#9a6a4f]/20 text-[#f5ede6] flex items-center justify-center border border-[#9a6a4f]/40">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-bold font-serif-luxury text-white">
            {verifiedProfiles}
          </div>
          <p className="text-xs text-[#f5ede6]">Guardian authenticated</p>
        </div>

        <div className="bg-[#11100f] p-6 rounded-3xl border border-[#E7DDD0]/15 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#756D65] uppercase tracking-wider">
              Featured Profiles
            </span>
            <div className="w-10 h-10 rounded-xl bg-[#B9965B]/20 text-[#B9965B] flex items-center justify-center border border-[#B9965B]/40">
              <Star className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-bold font-serif-luxury text-white">
            {featuredProfiles}
          </div>
          <p className="text-xs text-[#B9965B]">Highlighted on homepage</p>
        </div>
      </div>

      {/* Recent Inquiries List */}
      <div className="bg-[#11100f] rounded-3xl border border-[#E7DDD0]/15 p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold font-serif-luxury text-white">
              Recent Proposal Inquiries
            </h2>
            <p className="text-xs text-[#756D65]">
              Latest matrimonial interests expressed by prospective families.
            </p>
          </div>
          <Link
            href="/admin/inquiries"
            className="text-xs text-[#B9965B] hover:text-[#9D7B47] font-semibold flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-[#FAF7F2]/80">
            <thead className="text-xs uppercase bg-[#171615] text-[#756D65] border-b border-[#E7DDD0]/15">
              <tr>
                <th className="px-4 py-3 rounded-l-xl">Target Profile</th>
                <th className="px-4 py-3">Sender Name</th>
                <th className="px-4 py-3">Relationship</th>
                <th className="px-4 py-3">Contact</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 rounded-r-xl">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E7DDD0]/10">
              {inquiries.slice(0, 5).map((inq) => (
                <tr key={inq.id} className="hover:bg-[#171615]/50 transition-colors">
                  <td className="px-4 py-3.5 font-mono text-[#B9965B] font-medium">
                    {inq.profile_code}
                  </td>
                  <td className="px-4 py-3.5 font-medium text-white">
                    {inq.sender_name}
                  </td>
                  <td className="px-4 py-3.5 text-[#756D65]">
                    {inq.sender_relation} ({inq.sender_city})
                  </td>
                  <td className="px-4 py-3.5 text-xs text-[#FAF7F2]/70">
                    {inq.sender_phone}
                  </td>
                  <td className="px-4 py-3.5">
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-semibold uppercase tracking-wider ${
                        inq.status === "pending"
                          ? "bg-[#B9965B]/10 text-[#B9965B] border border-[#B9965B]/30"
                          : inq.status === "contacted"
                          ? "bg-[#9a6a4f]/20 text-[#f5ede6] border border-[#9a6a4f]/40"
                          : "bg-[#171615] text-[#756D65]"
                      }`}
                    >
                      {inq.status}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-xs text-[#756D65]">
                    {new Date(inq.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
