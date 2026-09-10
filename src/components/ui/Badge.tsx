import React from "react";
import { cn } from "@/lib/utils";
import { CheckCircle2, ShieldCheck, Star } from "lucide-react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "verified" | "featured" | "primary" | "gold" | "slate" | "warning" | "danger";
  size?: "sm" | "md";
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = "primary",
  size = "sm",
  children,
  ...props
}) => {
  const sizeStyles = {
    sm: "text-xs px-2.5 py-0.5 gap-1",
    md: "text-xs font-semibold px-3 py-1 gap-1.5",
  };

  const variantStyles = {
    verified: "bg-[#9a6a4f]/25 text-[#B9965B] border border-[#9a6a4f]/40 font-medium",
    featured: "bg-[#B9965B]/20 text-[#B9965B] border border-[#B9965B]/35 font-medium",
    primary: "bg-[#9a6a4f]/20 text-[#FAF7F2] border border-[#9a6a4f]/30",
    gold: "bg-[#B9965B]/20 text-[#B9965B] border border-[#B9965B]/30",
    slate: "bg-white/5 text-stone-300 border border-white/10",
    warning: "bg-amber-500/20 text-amber-300 border border-amber-500/30",
    danger: "bg-rose-500/20 text-rose-300 border border-rose-500/30",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-medium tracking-wide transition-colors",
        sizeStyles[size],
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {variant === "verified" && <ShieldCheck className="w-3.5 h-3.5 text-[#9a6a4f]" />}
      {variant === "featured" && <Star className="w-3.5 h-3.5 text-[#B9965B] fill-[#B9965B]" />}
      {children}
    </span>
  );
};
