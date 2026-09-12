import React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "gold" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed select-none active:scale-[0.98]";

    const sizeStyles = {
      sm: "text-xs px-3.5 py-1.5 gap-1.5",
      md: "text-sm px-5 py-2.5 gap-2",
      lg: "text-base px-6 py-3.5 gap-2.5",
    };

    const variantStyles = {
      primary:
        "bg-gradient-to-r from-[#c2794c] to-[#a86036] hover:from-[#d4895c] hover:to-[#be6f42] text-white font-semibold shadow-[0_4px_18px_rgba(194,121,76,0.38)] hover:shadow-[0_6px_25px_rgba(194,121,76,0.55)] focus:ring-[#c2794c]",
      secondary:
        "bg-[#2f2d2a] hover:bg-[#3d3a36] text-stone-100 border border-white/15 hover:border-[#FFD78A]/50 shadow-sm focus:ring-[#c2794c]",
      gold: "bg-gradient-to-r from-[#FFD78A] via-[#E5C384] to-[#C59B48] hover:from-[#FFF0D4] hover:to-[#E5C384] text-stone-950 font-bold shadow-[0_4px_20px_rgba(229,195,132,0.4)] focus:ring-[#E5C384]",
      outline:
        "border border-white/25 hover:border-[#FFD78A] bg-white/10 hover:bg-white/15 text-[#FAF7F2] font-medium shadow-sm focus:ring-[#c2794c]",
      ghost:
        "text-stone-200 hover:bg-white/10 hover:text-[#FFD78A] focus:ring-[#c2794c]",
      danger:
        "bg-[#d33a3a] hover:bg-[#b82e2e] text-white font-semibold shadow-sm hover:shadow focus:ring-[#d33a3a]",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>
        )}
        <span>{children}</span>
        {!isLoading && rightIcon && (
          <span className="inline-flex shrink-0">{rightIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
