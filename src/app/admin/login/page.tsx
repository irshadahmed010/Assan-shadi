"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowLeft,
  KeyRound,
  ShieldCheck,
  HeartHandshake,
} from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password: password.trim() }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Invalid email or password");
      }

      router.push("/admin");
      router.refresh();
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to log in");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFillTestCredentials = () => {
    setEmail("admin@assanshadi.com");
    setPassword("Admin@123456");
    setErrorMessage(null);
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center bg-[#252525] text-[#FAF7F2] p-4 sm:p-6 lg:p-8 font-sans-modern overflow-hidden selection:bg-[#B9965B] selection:text-[#171615]">
      {/* Frontend Ambient Glows matching Hero Section */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[650px] h-[450px] bg-gradient-to-b from-[#9a6a4f]/25 via-[#b9965b]/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute -bottom-24 -right-12 w-[420px] h-[420px] bg-gradient-to-tl from-[#b9965b]/15 via-transparent to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 -left-24 w-[380px] h-[380px] bg-gradient-to-br from-[#9a6a4f]/20 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Decorative Subtle Overlay Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none -z-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #FAF7F2 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="w-full max-w-md space-y-6 relative z-10">
        {/* Top Navigation / Back Link */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#a8a29e] hover:text-[#B9965B] transition-colors py-1.5 px-3 rounded-xl bg-white/5 border border-white/5 hover:border-[#B9965B]/30"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Public Site</span>
          </Link>

          <div className="flex items-center gap-1.5 text-[11px] text-[#B9965B] font-medium tracking-wide">
            <span className="w-2 h-2 rounded-full bg-[#B9965B] animate-pulse" />
            <span>Secure Access</span>
          </div>
        </div>

        {/* Login Card matching Frontend Glass Style */}
        <div className="bg-[#2e2e2e]/90 backdrop-blur-xl rounded-[5px] p-6 sm:p-8 shadow-2xl border border-[#B9965B]/25 space-y-6 text-[#FAF7F2] text-left">
          {/* Header */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-[5px] bg-gradient-to-br from-[#9a6a4f] to-[#493831] border border-[#B9965B]/40 flex items-center justify-center text-[#B9965B] shadow-lg shadow-[#9a6a4f]/20 shrink-0">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#B9965B]">
                  Asaan Shaadi
                </span>
              </div>
              <h1 className="text-2xl font-bold font-serif-luxury tracking-tight text-[#FAF7F2]">
                Admin Portal
              </h1>
              <p className="text-xs text-[#a8a29e] mt-0.5">
               Sign in to access your account.
              </p>
            </div>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-[#c24141]/15 border border-[#c24141]/40 text-[#fca5a5] text-xs font-medium flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ef4444]" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field with Icon */}
            <div className="space-y-1.5 text-left">
              <label
                htmlFor="admin-email"
                className="block text-xs font-medium text-[#FAF7F2]/90"
              >
                Staff Email Address
              </label>
              <div className="relative flex items-center">
                <Mail className="absolute left-3.5 w-4 h-4 text-[#B9965B]/80 pointer-events-none transition-colors" />
                <input
                  id="admin-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@assanshadi.com"
                  className="w-full rounded-[5px] border border-[#3d3d3d] bg-[#1E1B18]/90 pl-10 pr-4 py-2.5 sm:py-3 text-sm text-[#FAF7F2] placeholder:text-[#a8a29e]/50 focus:border-[#B9965B] focus:outline-none focus:ring-2 focus:ring-[#B9965B]/20 transition-all"
                />
              </div>
            </div>

            {/* Password Field with Left Icon & Right Toggle Icon */}
            <div className="space-y-1.5 text-left">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="admin-password"
                  className="block text-xs font-medium text-[#FAF7F2]/90"
                >
                  Password
                </label>
                <span className="text-[11px] text-[#a8a29e]">Case-sensitive</span>
              </div>
              <div className="relative flex items-center">
                <Lock className="absolute left-3.5 w-4 h-4 text-[#B9965B]/80 pointer-events-none transition-colors" />
                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full rounded-[5px]  border border-[#3d3d3d] bg-[#1E1B18]/90 pl-10 pr-11 py-2.5 sm:py-3 text-sm text-[#FAF7F2] placeholder:text-[#a8a29e]/50 focus:border-[#B9965B] focus:outline-none focus:ring-2 focus:ring-[#B9965B]/20 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 p-1 text-[#a8a29e] hover:text-[#FAF7F2] focus:outline-none transition-colors rounded-lg hover:bg-white/5"
                  tabIndex={-1}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4 text-[#B9965B]" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isLoading}
              className="w-full bg-gradient-to-r from-[#9a6a4f] to-[#b17b5d] hover:from-[#b17b5d] hover:to-[#9a6a4f] text-white font-semibold mt-3 py-3 rounded-xl shadow-lg shadow-[#9a6a4f]/20 transition-all active:scale-[0.99]"
            >
              Sign In to Admin Portal
            </Button>
          </form>

          {/* Quick Demo Fill Helper */}
          <div className="pt-4 border-t border-white/10 text-center space-y-2">
            <button
              type="button"
              onClick={handleFillTestCredentials}
              className="text-xs text-[#B9965B] hover:text-[#d6b987] font-medium cursor-pointer inline-flex items-center gap-1.5 py-1 px-2.5 rounded-lg hover:bg-[#B9965B]/10 transition-colors"
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>Fill Default Demo Admin Credentials</span>
            </button>
            <p className="text-[11px] text-[#a8a29e]">
              Default: <span className="text-[#FAF7F2]">admin@assanshadi.com</span> / <span className="text-[#FAF7F2]">Admin@123456</span>
            </p>
          </div>
        </div>

        {/* Security / Confidentiality Footer Note */}
        <div className="flex items-center justify-center gap-2 text-[11px] text-[#a8a29e] text-center">
          <ShieldCheck className="w-4 h-4 text-[#B9965B]" />
          <span>Encrypted session • Authorized personnel only</span>
        </div>
      </div>
    </div>
  );
}
