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
        "bg-[#9a6a4f] hover:bg-[#b17b5d] text-white shadow-sm hover:shadow-md focus:ring-[#9a6a4f]",
      secondary:
        "bg-[#333333] hover:bg-[#444444] text-white shadow-sm hover:shadow focus:ring-[#333333]",
      gold: "bg-[#b9965b] hover:bg-[#9d7b47] text-[#171615] font-semibold shadow-sm hover:shadow-md focus:ring-[#b9965b]",
      outline:
        "border border-white/20 hover:border-[#b9965b] bg-white/5 hover:bg-white/10 text-[#FAF7F2] focus:ring-[#9a6a4f]",
      ghost:
        "text-[#FAF7F2] hover:bg-white/10 hover:text-[#b9965b] focus:ring-[#9a6a4f]",
      danger:
        "bg-[#c24141] hover:bg-[#a32e2e] text-white shadow-sm hover:shadow focus:ring-[#c24141]",
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
