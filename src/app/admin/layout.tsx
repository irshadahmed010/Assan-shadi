import React from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Portal | Asaan Shaadi Matrimony",
  description: "Secure management console for Asaan Shaadi matrimonial platform.",
  robots: "noindex, nofollow",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminShell>{children}</AdminShell>;
}
