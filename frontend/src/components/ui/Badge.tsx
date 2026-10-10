import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "emerald" | "blue" | "amber" | "crimson" | "slate";
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "blue",
  className = "",
}) => {
  const styles = {
    emerald: "bg-emerald-950 text-emerald-400 border border-emerald-800",
    blue: "bg-blue-950 text-blue-400 border border-blue-800",
    amber: "bg-amber-950 text-amber-400 border border-amber-800",
    crimson: "bg-red-950 text-red-400 border border-red-800",
    slate: "bg-slate-800 text-slate-300 border border-slate-700",
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-semibold ${styles[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
