import React from "react";
import Link from "next/link";
import { dbService } from "@/lib/supabase";
import {
  Users,
  Target,
  PenTool,
  Image as ImageIcon,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ExternalLink,
  Phone,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [profiles, leads, _blogs, _gallery, stats] = await Promise.all([
    dbService.getProfiles(),
    dbService.getLeads(),
    dbService.getBlogs(),
    dbService.getGalleryItems(),
    dbService.getDashboardStats(),
  ]);

  // Filter only Quick Profile Leads (exclude contact inquiries/messages)
  const quickLeads = leads.filter(
    (l) => l.source === "Quick Profile Submission" || (!l.note && !l.seeking_for)
  );
  const displayLeads = quickLeads.length > 0 ? quickLeads : leads;

  return (
    <div className="space-y-8 max-w-7xl mx-auto font-sans-modern">
      {/* 1. Top Welcome Banner */}
      <div className="relative rounded-2xl bg-gradient-to-r from-[#1e1e1e] via-[#24201c] to-[#1e1e1e] border border-white/10 p-6 sm:p-8 overflow-hidden shadow-xl">
        {/* Subtle Ambient Glow */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-[#9a6a4f]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-48 h-48 bg-[#b9965b]/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#9a6a4f]/20 border border-[#b9965b]/30 text-[#e5c384] text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Matrimonial Operations Portal</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black font-serif-luxury text-white tracking-tight">
              Dashboard Overview
            </h1>
            <p className="text-xs sm:text-sm text-stone-400 max-w-2xl leading-relaxed">
              Real-time monitor of verified biodatas, consultation inquiries, nikah stories, and media archives.
            </p>
          </div>
        </div>
      </div>

      {/* 2. 4-Stat Metric Cards (Requested in Prompt) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* Card 1: Total Biodatas */}
        <div className="bg-[#1e1e1e] p-5 sm:p-6 rounded-2xl border border-white/10 hover:border-[#b9965b]/40 transition-all shadow-lg group">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider">
              Total Biodatas
            </span>
            <div className="w-10 h-10 rounded-xl bg-[#9a6a4f]/20 text-[#e5c384] flex items-center justify-center border border-[#9a6a4f]/30 group-hover:scale-110 transition-transform">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-bold font-serif-luxury text-white mb-2">
            {stats.totalProfiles}
          </div>
          <div className="flex items-center justify-between text-xs text-stone-400 pt-2 border-t border-white/5">
            <span className="text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> {stats.approvedProfiles} Approved
            </span>
            <span className="text-[#e5c384]">
              {stats.pendingProfiles} Pending
            </span>
          </div>
        </div>

        {/* Card 2: Total Leads */}
        <div className="bg-[#1e1e1e] p-5 sm:p-6 rounded-2xl border border-white/10 hover:border-[#b9965b]/40 transition-all shadow-lg group">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider">
              Total Leads
            </span>
            <div className="w-10 h-10 rounded-xl bg-[#b9965b]/20 text-[#e5c384] flex items-center justify-center border border-[#b9965b]/40 group-hover:scale-110 transition-transform">
              <Target className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-bold font-serif-luxury text-white mb-2">
            {stats.totalLeads}
          </div>
          <div className="flex items-center justify-between text-xs text-stone-400 pt-2 border-t border-white/5">
            <span className="text-amber-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {stats.newLeads} Fresh Inquiries
            </span>
            <Link href="/admin/leads" className="text-xs text-[#e5c384] hover:underline">
              Manage
            </Link>
          </div>
        </div>

        {/* Card 3: Published Blogs */}
        <div className="bg-[#1e1e1e] p-5 sm:p-6 rounded-2xl border border-white/10 hover:border-[#b9965b]/40 transition-all shadow-lg group">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider">
              Published Blogs
            </span>
            <div className="w-10 h-10 rounded-xl bg-[#9a6a4f]/20 text-[#e5c384] flex items-center justify-center border border-[#9a6a4f]/30 group-hover:scale-110 transition-transform">
              <PenTool className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-bold font-serif-luxury text-white mb-2">
            {stats.totalBlogs}
          </div>
          <div className="flex items-center justify-between text-xs text-stone-400 pt-2 border-t border-white/5">
            <span>Articles Online</span>
            <Link href="/admin/blogs" className="text-xs text-[#e5c384] hover:underline">
              View All
            </Link>
          </div>
        </div>

        {/* Card 4: Gallery / Media Items */}
        <div className="bg-[#1e1e1e] p-5 sm:p-6 rounded-2xl border border-white/10 hover:border-[#b9965b]/40 transition-all shadow-lg group">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider">
              Gallery Media
            </span>
            <div className="w-10 h-10 rounded-xl bg-[#b9965b]/20 text-[#e5c384] flex items-center justify-center border border-[#b9965b]/40 group-hover:scale-110 transition-transform">
              <ImageIcon className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-bold font-serif-luxury text-white mb-2">
            {stats.totalGallery}
          </div>
          <div className="flex items-center justify-between text-xs text-stone-400 pt-2 border-t border-white/5">
            <span>Wedding Photos</span>
            <Link href="/admin/gallery" className="text-xs text-[#e5c384] hover:underline">
              Manage
            </Link>
          </div>
        </div>
      </div>

      {/* 3 & 4. Recent Biodatas & Recent Inquiries (Side by Side on Desktop) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* 3. Recent Biodatas Table (Latest 5 submissions) */}
        <div className="bg-[#1e1e1e] rounded-[5px] border border-white/10 p-4 sm:p-5 shadow-xl space-y-3.5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold font-serif-luxury text-white">
                  Recent Biodatas
                </h2>
                
              </div>
              <p className="text-[11px] text-stone-400 mt-0.5">
                Candidate registrations awaiting review
              </p>
            </div>

            <Link
              href="/admin/biodata"
              className="inline-flex items-center gap-1 text-xs text-[#e5c384] hover:text-[#f3d99e] font-semibold transition-colors shrink-0"
            >
              <span>View All</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto rounded-xl border border-white/10">
            <table className="w-full text-left text-xs text-stone-300">
              <tbody className="divide-y divide-white/5">
                {profiles.slice(0, 5).map((p) => (
                  <tr key={p.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-3 py-2.5 whitespace-nowrap">
                      <div className="font-medium text-white truncate max-w-[140px] sm:max-w-[200px]">
                        {p.full_name}
                      </div>
                      <div className="text-[11px] text-stone-400 flex items-center gap-1.5 mt-0.5">
                        <span className="capitalize">{p.gender}, {p.age}y</span>
                        <span className="xl:hidden text-stone-500">• {p.city}</span>
                      </div>
                    </td>
                    <td className="px-3 py-2.5 hidden xl:table-cell whitespace-nowrap">
                      <div className="text-stone-300 truncate max-w-[130px]">{p.profession}</div>
                      <div className="text-[11px] text-stone-400">{p.city}</div>
                    </td>
                    <td className="px-3 py-2.5 text-right whitespace-nowrap">
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider ${
                          p.status === "approved"
                            ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                            : p.status === "pending"
                            ? "bg-amber-500/15 text-amber-300 border border-amber-500/30"
                            : "bg-red-500/15 text-red-300 border border-red-500/30"
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 4. Recent Leads */}
        <div className="bg-[#1e1e1e] rounded-[5px] border border-white/10 p-4 sm:p-5 shadow-xl space-y-3.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#b9965b]/20 text-[#e5c384] flex items-center justify-center border border-[#b9965b]/30">
                <Target className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold font-serif-luxury text-white">
                  Recent Leads
                </h3>
                <p className="text-[11px] text-stone-400">Quick profile submissions</p>
              </div>
            </div>
            <Link
              href="/admin/leads"
              className="text-xs text-[#e5c384] hover:underline flex items-center gap-1 font-semibold shrink-0"
            >
              <span>View All</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-2.5">
            {displayLeads.slice(0, 5).map((l) => (
              <div
                key={l.id}
                className="p-3 rounded-xl bg-[#252525] border border-white/5 hover:border-[#b9965b]/30 transition-colors space-y-1.5"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-xs font-semibold text-white truncate">
                      {l.full_name}
                    </span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-md font-bold shrink-0 ${
                        l.gender === "Female"
                          ? "bg-rose-500/15 text-rose-300 border border-rose-500/30"
                          : "bg-[#b9965b]/15 text-[#f3d99e] border border-[#b9965b]/30"
                      }`}
                    >
                      {l.gender || "Male"}
                    </span>
                  </div>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase shrink-0 ${
                      l.status === "new"
                        ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                        : "bg-white/10 text-stone-300"
                    }`}
                  >
                    {l.status}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-stone-400 pt-0.5">
                  <span className="truncate max-w-[140px]">{l.email_address || "No email"}</span>
                  <span className="font-mono text-[#e5c384] font-semibold shrink-0">{l.mobile_number}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
