"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AdminHeader } from "./AdminHeader";
import { AdminSidebar } from "./AdminSidebar";
import { AdminUser } from "@/types/database";
import { X } from "lucide-react";

interface AdminShellProps {
  children: React.ReactNode;
}

export function AdminShell({ children }: AdminShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === "/admin/login";

  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(!isLoginPage);
  const [unreadCount, setUnreadCount] = useState<{ leads: number; inquiries: number }>({
    leads: 0,
    inquiries: 0,
  });

  // Dynamic header title based on current route
  const getHeaderTitle = () => {
    if (pathname === "/admin") return "Dashboard Overview";
    if (pathname.startsWith("/admin/biodata") || pathname.startsWith("/admin/profiles"))
      return "Biodatas Management";
    if (pathname.startsWith("/admin/leads")) return "Leads & Consultations";
    if (pathname.startsWith("/admin/messages") || pathname.startsWith("/admin/inquiries"))
      return "Inquiries & Messages";
    if (pathname.startsWith("/admin/blogs")) return "Articles & Blog Manager";
    if (pathname.startsWith("/admin/gallery")) return "Media & Gallery Showcase";
    return "Admin Dashboard";
  };

  useEffect(() => {
    if (!isLoginPage) {
      // 1. Check Session
      fetch("/api/auth/me")
        .then((res) => {
          if (!res.ok) {
            router.push("/admin/login");
            return null;
          }
          return res.json();
        })
        .then((json) => {
          if (json?.user) {
            setAdminUser(json.user);
          } else {
            router.push("/admin/login");
          }
        })
        .catch(() => {
          router.push("/admin/login");
        })
        .finally(() => {
          setIsLoadingAuth(false);
        });

      // 2. Fetch Unread counts
      fetch("/api/admin/stats")
        .then((res) => (res.ok ? res.json() : null))
        .then((json) => {
          if (json?.data) {
            setUnreadCount({
              leads: json.data.newLeads || 0,
              inquiries: json.data.pendingInquiries || 0,
            });
          }
        })
        .catch(() => {});
    }
  }, [pathname, isLoginPage, router]);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (e) {
      console.error("Logout failed:", e);
      router.push("/admin/login");
    }
  };

  // If on login page, render children raw
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Loading state during auth check
  if (isLoadingAuth) {
    return (
      <div className="min-h-screen bg-[#252525] flex flex-col items-center justify-center text-[#FAF7F2] font-sans-modern">
        <div className="w-12 h-12 rounded-2xl bg-[#9a6a4f]/20 border border-[#b9965b]/40 flex items-center justify-center animate-pulse mb-4">
          <div className="w-6 h-6 rounded-full border-2 border-[#b9965b] border-t-transparent animate-spin" />
        </div>
        <p className="text-sm font-semibold text-stone-300">
          Verifying Asaan Shaadi Staff Session...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#252525] text-[#FAF7F2] flex font-sans-modern selection:bg-[#b9965b] selection:text-[#171615]">
      {/* Desktop Sidebar (Fixed / Sticky left column) */}
      <div className="hidden md:block md:w-64 lg:w-72 shrink-0 sticky top-0 h-screen overflow-y-auto z-20">
        <AdminSidebar
          user={adminUser}
          onLogout={handleLogout}
          unreadCount={unreadCount}
        />
      </div>

      {/* Mobile Slide-over Drawer Backdrop */}
      {mobileNavOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm md:hidden transition-opacity"
          onClick={() => setMobileNavOpen(false)}
        />
      )}

      {/* Mobile Slide-over Drawer */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] bg-[#1e1e1e] transform transition-transform duration-300 ease-in-out md:hidden shadow-2xl flex flex-col ${
          mobileNavOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={() => setMobileNavOpen(false)}
            className="p-1.5 rounded-lg text-stone-400 hover:text-white bg-white/5 hover:bg-white/10"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <AdminSidebar
          user={adminUser}
          onLogout={handleLogout}
          onNavigate={() => setMobileNavOpen(false)}
          unreadCount={unreadCount}
        />
      </div>

      {/* Main Content Column (Natural scroll) */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen bg-[#252525]">
        <AdminHeader
          user={adminUser}
          onOpenMobileNav={() => setMobileNavOpen(true)}
          onLogout={handleLogout}
          title={getHeaderTitle()}
          unreadCount={unreadCount}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6">
          {children}
        </main>
      </div>
    </div>
  );
}
