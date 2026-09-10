"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  MessageSquareHeart,
  Globe,
  LogOut,
  Menu,
  X,
  HeartHandshake,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === "/admin/login";

  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [adminUser, setAdminUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    if (!isLoginPage) {
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
          }
        })
        .catch(() => {
          router.push("/admin/login");
        });
    }
  }, [pathname, isLoginPage, router]);

  if (isLoginPage) {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (e) {
      console.error("Logout error:", e);
    }
  };

  const navItems = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
    { href: "/admin/profiles", label: "Manage Profiles", icon: Users, exact: false },
    { href: "/admin/inquiries", label: "Match Inquiries", icon: MessageSquareHeart, exact: false },
  ];

  return (
    <div className="min-h-screen bg-[#171615] text-[#FAF7F2] flex flex-col md:flex-row font-sans-modern">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:w-64 flex-col justify-between bg-[#11100f] border-r border-[#E7DDD0]/15 p-6">
        <div className="space-y-8">
          {/* Brand */}
          <Link href="/admin" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#9a6a4f] to-[#493831] flex items-center justify-center text-[#B9965B] shadow-md">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <span className="text-lg font-bold font-serif-luxury text-white block">
                Assan Shadi
              </span>
              <span className="text-[10px] uppercase tracking-wider text-[#B9965B] font-semibold">
                Admin Console
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const isActive = item.exact
                ? pathname === item.href
                : pathname.startsWith(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-[#9a6a4f] text-white font-semibold"
                      : "text-[#756D65] hover:text-[#FAF7F2] hover:bg-[#171615]"
                  }`}
                >
                  <Icon className="w-4 h-4 text-[#B9965B]" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="space-y-4 pt-6 border-t border-[#E7DDD0]/15">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-4 py-2 text-xs text-[#756D65] hover:text-[#B9965B] transition-colors"
          >
            <Globe className="w-4 h-4" />
            <span>View Public Website</span>
          </Link>

          <div className="p-3 bg-[#171615] rounded-2xl border border-[#E7DDD0]/15 flex items-center justify-between">
            <div className="truncate pr-2">
              <span className="text-xs font-semibold text-white block truncate">
                {adminUser?.name || "Administrator"}
              </span>
              <span className="text-[10px] text-[#756D65] block truncate">
                {adminUser?.email || "admin@assanshadi.com"}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="p-1.5 text-[#756D65] hover:text-[#b17b5d] rounded-lg hover:bg-[#11100f] transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Top Navigation Header */}
      <div className="md:hidden bg-[#11100f] border-b border-[#E7DDD0]/15 p-4 flex items-center justify-between">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#9a6a4f] flex items-center justify-center text-[#B9965B]">
            <HeartHandshake className="w-4 h-4" />
          </div>
          <span className="font-bold font-serif-luxury text-white text-base">
            Assan Shadi Admin
          </span>
        </Link>
        <button
          onClick={() => setMobileNavOpen(!mobileNavOpen)}
          className="p-2 text-[#756D65] hover:text-white"
        >
          {mobileNavOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileNavOpen && (
        <div className="md:hidden bg-[#11100f] border-b border-[#E7DDD0]/15 p-4 space-y-2">
          {navItems.map((item) => {
            const isActive = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileNavOpen(false)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium ${
                  isActive ? "bg-[#9a6a4f] text-white font-semibold" : "text-[#756D65]"
                }`}
              >
                <Icon className="w-4 h-4 text-[#B9965B]" />
                <span>{item.label}</span>
              </Link>
            );
          })}
          <div className="pt-2 border-t border-[#E7DDD0]/15 flex items-center justify-between">
            <Link
              href="/"
              target="_blank"
              className="text-xs text-[#B9965B] py-2 inline-flex items-center gap-1.5"
            >
              <Globe className="w-3.5 h-3.5" /> View Public Site
            </Link>
            <Button variant="danger" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 bg-[#171615] overflow-y-auto p-6 sm:p-10">
        {children}
      </main>
    </div>
  );
}
