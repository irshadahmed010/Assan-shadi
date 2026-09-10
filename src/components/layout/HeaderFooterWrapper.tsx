"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { PageTransitionLoader } from "@/components/common/PageTransitionLoader";
import { FloatingActions } from "@/components/common/FloatingActions";

export interface HeaderFooterWrapperProps {
  children: React.ReactNode;
}

export const HeaderFooterWrapper: React.FC<HeaderFooterWrapperProps> = ({ children }) => {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <PageTransitionLoader />
      <main className="flex-1 min-h-[calc(100vh-80px)] w-full max-w-full overflow-x-hidden">{children}</main>
      <Footer />
      <FloatingActions />
    </>
  );
};
