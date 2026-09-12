"use client";

import React from "react";
import Link from "next/link";
import {
  Menu,
  Bell,
  Search,
  PlusCircle,
  ExternalLink,
  ShieldCheck,
  LogOut,
  User,
} from "lucide-react";
import { AdminUser } from "@/types/database";

interface AdminHeaderProps {
  user: AdminUser | null;
  onOpenMobileNav: () => void;
  onLogout: () => void;
  title?: string;
  unreadCount?: { leads: number; inquiries: number };
}

export function AdminHeader({
  user,
  onOpenMobileNav,
  onLogout,
  title = "Dashboard",
  unreadCount = { leads: 0, inquiries: 0 },
}: AdminHeaderProps) {
  const totalUnread = unreadCount.leads + unreadCount.inquiries;

  return (
    <header className="sticky top-0 z-30 h-16 bg-[#1e1e1e]/95 backdrop-blur-md border-b border-white/10 px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 font-sans-modern">
      {/* Left: Mobile Toggle & Page Context */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onOpenMobileNav}
          className="md:hidden p-2 rounded-xl text-stone-300 hover:text-white hover:bg-white/5 border border-white/10 transition-colors"
          aria-label="Open Navigation Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          <div className="hidden sm:flex w-2 h-2 rounded-full bg-[#b9965b]" />
          <h1 className="text-base sm:text-lg font-[500] font-serif-luxury text-white truncate">
            {title}
          </h1>
        </div>
      </div>


      {/* Right: Quick Action Buttons, Notifications & Admin Info */}
      <div className="flex items-center gap-2.5 sm:gap-3">

        {/* Notifications Button */}
        <Link
          href="/admin/leads"
          className="relative p-2 rounded-xl text-stone-300 hover:text-[#e5c384] hover:bg-white/5 border border-white/10 transition-colors"
          title={`${totalUnread} pending inquiries/leads`}
        >
          <Bell className="w-4 h-4" />
          {totalUnread > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[#b9965b] px-1 text-[10px] font-bold text-[#171615] ring-2 ring-[#1e1e1e]">
              {totalUnread}
            </span>
          )}
        </Link>

        {/* User Identity Chip */}
        <div className="flex items-center gap-2 pl-2 border-l border-white/10">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#9a6a4f] to-[#b17b5d] border border-[#b9965b]/30 flex items-center justify-center text-white shadow-md shrink-0">
            <User className="w-4 h-4 text-white" />
          </div>

          <div className="hidden md:block text-left">
            <span className="text-xs font-semibold text-white block leading-tight">
              {user?.name || "Admin"}
            </span>
            <span className="text-[10px] text-[#b9965b] block leading-tight font-medium">
              Super Admin
            </span>
          </div>

          <button
            onClick={onLogout}
            title="Log Out"
            className="hidden sm:flex p-1.5 text-stone-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors ml-1"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
}
