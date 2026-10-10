import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}) => {
  const base =
    "inline-flex items-center justify-center font-mono font-semibold rounded transition-all focus:outline-none disabled:opacity-50";
  const sizeClasses = {
    sm: "px-2.5 py-1 text-xs",
    md: "px-3.5 py-1.5 text-xs",
    lg: "px-4 py-2 text-sm",
  };
  const variantClasses = {
    primary: "bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_12px_rgba(59,130,246,0.3)]",
    secondary: "bg-[var(--bg-canvas,#0A0D12)] hover:bg-slate-800 text-slate-200 border border-[var(--border-color,#1F242F)]",
    danger: "bg-red-600 hover:bg-red-500 text-white",
    ghost: "text-slate-400 hover:text-white hover:bg-white/[0.04]",
  };

  return (
    <button
      className={`${base} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
