"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Target,
  MessageSquareHeart,
  PenTool,
  Image as ImageIcon,
  Globe,
  LogOut,
  HeartHandshake,
  Shield,
  ChevronRight,
} from "lucide-react";
import { AdminUser } from "@/types/database";

interface AdminSidebarProps {
  user: AdminUser | null;
  onLogout: () => void;
  onNavigate?: () => void;
  unreadCount?: { leads: number; inquiries: number };
}

export const navItems = [
  {
    href: "/admin",
    label: "Overview",
    icon: LayoutDashboard,
    exact: true,
    badge: null,
  },
  {
    href: "/admin/biodata",
    label: "Biodatas",
    icon: Users,
    exact: false,
    badge: null,
  },
  {
    href: "/admin/leads",
    label: "Leads",
    icon: Target,
    exact: false,
    badgeKey: "leads",
  },
  {
    href: "/admin/blogs",
    label: "Blogs",
    icon: PenTool,
    exact: false,
    badge: null,
  },
  {
    href: "/admin/gallery",
    label: "Gallery",
    icon: ImageIcon,
    exact: false,
    badge: null,
  },
  {
    href: "/admin/messages",
    label: "Messages",
    icon: MessageSquareHeart,
    exact: false,
    badgeKey: "inquiries",
  },
];

export function AdminSidebar({
  user,
  onLogout,
  onNavigate,
  unreadCount = { leads: 0, inquiries: 0 },
}: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="w-full h-full flex flex-col justify-between bg-[#1e1e1e] border-r border-white/10 select-none font-sans-modern">
      <div className="p-5 sm:p-6 space-y-6">
        {/* Brand Header */}
        <Link
          href="/admin"
          onClick={onNavigate}
          className="flex items-center gap-3.5 group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#9a6a4f] to-[#493831] border border-[#b9965b]/40 flex items-center justify-center text-[#b9965b] shadow-lg shadow-[#9a6a4f]/20 shrink-0 group-hover:scale-105 transition-transform">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <span className="text-lg font-bold font-serif-luxury text-white tracking-tight block truncate">
              Asaan Shaadi
            </span>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#b9965b] animate-pulse" />
              <span className="text-[10px] uppercase tracking-wider text-[#b9965b] font-semibold">
                Control Hub
              </span>
            </div>
          </div>
        </Link>

        {/* Navigation Sections */}
        <div className="space-y-1">
          <p className="text-[10px] uppercase font-semibold text-stone-400 px-3 tracking-wider mb-2">
            Main Navigation
          </p>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = item.exact
                ? pathname === item.href
                : pathname === item.href ||
                  pathname.startsWith(`${item.href}/`) ||
                  (item.href === "/admin/biodata" &&
                    pathname.startsWith("/admin/profiles")) ||
                  (item.href === "/admin/messages" &&
                    pathname.startsWith("/admin/inquiries"));

              const Icon = item.icon;
              const badgeNum =
                item.badgeKey === "leads"
                  ? unreadCount.leads
                  : item.badgeKey === "inquiries"
                    ? unreadCount.inquiries
                    : 0;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onNavigate}
                  className={`flex items-center justify-between px-3 py-2.5 my-2 rounded-[5px] text-xs sm:text-sm font-medium transition-all group ${
                    isActive
                      ? "bg-gradient-to-r from-[#9a6a4f] to-[#b17b5d] text-white font-semibold shadow-md shadow-[#9a6a4f]/25 border border-[#b9965b]/30"
                      : "text-stone-300 hover:text-white hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Icon
                      className={`w-4 h-4 shrink-0 transition-colors ${
                        isActive
                          ? "text-[#FAF7F2]"
                          : "text-[#b9965b] group-hover:text-[#e5c384]"
                      }`}
                    />
                    <span className="truncate">{item.label}</span>
                  </div>

                  {badgeNum > 0 ? (
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isActive
                          ? "bg-black/40 text-white"
                          : "bg-[#b9965b]/20 text-[#e5c384] border border-[#b9965b]/40"
                      }`}
                    >
                      {badgeNum}
                    </span>
                  ) : isActive ? (
                    <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                  ) : null}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Footer Area */}
      <div className="p-4 sm:p-5 border-t border-white/10 space-y-3 bg-[#181818]/60">
        {/* Public Website Link */}
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3 py-2 rounded-xl text-xs text-stone-400 hover:text-[#e5c384] hover:bg-white/5 transition-colors border border-transparent hover:border-white/5"
        >
          <div className="flex items-center gap-2.5">
            <Globe className="w-4 h-4 text-[#b9965b]" />
            <span>Public Website</span>
          </div>
          <ChevronRight className="w-3.5 h-3.5 opacity-60" />
        </Link>

        {/* User Profile Card */}
        <div className="p-3 bg-[#252525] rounded-xl border border-white/10 flex items-center justify-between gap-3 shadow-inner">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-[#9a6a4f]/30 border border-[#b9965b]/40 flex items-center justify-center text-[#e5c384] shrink-0">
              <Shield className="w-4 h-4" />
            </div>
            <div className="min-w-0 truncate">
              <span className="text-xs font-semibold text-white block truncate leading-tight">
                {user?.name || "Administrator"}
              </span>
              <span className="text-[10px] text-stone-400 block truncate leading-tight mt-0.5">
                {user?.email || "Admin Session"}
              </span>
            </div>
          </div>

          <button
            onClick={onLogout}
            title="Sign Out"
            className="p-1.5 text-stone-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors shrink-0"
            aria-label="Log Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
