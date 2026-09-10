import React from "react";
import { cn } from "@/lib/utils";

export interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  title,
  subtitle,
  align = "center",
  className,
}) => {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {badge && (
        <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#B9965B] bg-white/5 border border-[#B9965B]/30 px-3 py-1 rounded-full mb-3 font-sans-modern">
          {badge}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl font-bold font-serif-luxury text-[#FAF7F2] tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-base sm:text-lg text-stone-300 leading-relaxed font-sans-modern">
          {subtitle}
        </p>
      )}
    </div>
  );
};
