import React from "react";

interface PageBudgetRulerProps {
  fillPercentage: number;
}

export const PageBudgetRuler: React.FC<PageBudgetRulerProps> = ({ fillPercentage }) => {
  const isOverflow = fillPercentage > 100;

  return (
    <div className="flex items-center gap-2.5 font-mono text-xs">
      <span className="text-slate-400">1-Page Budget:</span>
      <div className="w-28 h-2 bg-slate-800 rounded-full overflow-hidden flex">
        <div
          className={`h-full transition-all duration-300 ${
            isOverflow ? "bg-red-500" : "bg-emerald-400"
          }`}
          style={{ width: `${Math.min(100, fillPercentage)}%` }}
        />
      </div>
      <span className={`font-bold ${isOverflow ? "text-red-400" : "text-emerald-400"}`}>
        {fillPercentage}% {isOverflow ? "(SPILLOVER ALERT)" : "(Clean)"}
      </span>
    </div>
  );
};
