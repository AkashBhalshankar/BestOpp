"use client";

import React from "react";

export interface KanbanItem {
  id: string;
  company: string;
  title: string;
  stage: "Saved" | "Applied" | "R1 OA" | "R2 DSA" | "Offer";
}

interface KanbanBoardProps {
  items: KanbanItem[];
}

export const KanbanBoard: React.FC<KanbanBoardProps> = ({ items }) => {
  const stages: Array<KanbanItem["stage"]> = [
    "Saved",
    "Applied",
    "R1 OA",
    "R2 DSA",
    "Offer",
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-3 font-mono text-xs">
      {stages.map((stage) => {
        const stageItems = items.filter((i) => i.stage === stage);
        return (
          <div
            key={stage}
            className="p-3 rounded-lg bg-[var(--bg-canvas,#0A0D12)] border border-[var(--border-subtle,#181C26)] flex flex-col gap-2 min-h-[240px]"
          >
            <div className="flex justify-between items-center pb-1.5 border-b border-slate-800 text-slate-400 font-bold">
              <span>{stage}</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300">
                {stageItems.length}
              </span>
            </div>

            <div className="space-y-2 flex-1">
              {stageItems.map((item) => (
                <div
                  key={item.id}
                  className="p-2.5 rounded bg-[var(--bg-surface,#12161F)] border border-[var(--border-color,#1F242F)] text-[11px] space-y-1 hover:border-blue-500/40 transition-all cursor-pointer"
                >
                  <div className="font-bold text-white">{item.company}</div>
                  <div className="text-slate-400 truncate">{item.title}</div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};
