import React from "react";
import { Loader2 } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" | "success";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  leftIcon,
  rightIcon,
  className = "",
  disabled,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 cursor-pointer select-none focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const sizeStyles = {
    sm: "px-3.5 py-2 text-sm min-h-[40px] gap-1.5",
    md: "px-5 py-3 text-base min-h-[48px] gap-2 shadow-xs", // 48px min touch target
    lg: "px-7 py-4 text-lg min-h-[56px] font-semibold gap-2.5 shadow-sm",
  };

  const variantStyles = {
    primary:
      "bg-[#C2410C] hover:bg-[#9A3412] active:bg-[#7C2D12] text-white focus:ring-[#C2410C] border border-transparent shadow-sm hover:shadow",
    secondary:
      "bg-[#1E3A5F] hover:bg-[#162A45] active:bg-[#0F1E33] text-white focus:ring-[#1E3A5F]",
    outline:
      "border-2 border-[#E7E0D3] hover:border-[#C2410C] hover:bg-[#FFF7ED] text-[#1F2421] active:bg-[#FFEDD5] focus:ring-[#C2410C] bg-white",
    ghost:
      "bg-transparent hover:bg-[#F4EFE6] text-[#1F2421] active:bg-[#EAE2D5] focus:ring-[#C2410C]",
    danger:
      "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500",
    success:
      "bg-[#15803D] hover:bg-[#166534] text-white focus:ring-[#15803D]",
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>{children}</span>
        </>
      ) : (
        <>
          {leftIcon && <span className="shrink-0">{leftIcon}</span>}
          <span>{children}</span>
          {rightIcon && <span className="shrink-0">{rightIcon}</span>}
        </>
      )}
    </button>
  );
};
