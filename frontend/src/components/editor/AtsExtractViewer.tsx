import React from "react";

interface AtsExtractViewerProps {
  skillsFound: string[];
  atsScore: number;
}

export const AtsExtractViewer: React.FC<AtsExtractViewerProps> = ({
  skillsFound,
  atsScore,
}) => {
  return (
    <div className="p-3 rounded-lg bg-[var(--bg-canvas,#0A0D12)] border border-[var(--border-subtle,#181C26)] font-mono text-xs space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-slate-400">ATS Entity Parser:</span>
        <span className="text-emerald-400 font-bold">{atsScore}% Parsable</span>
      </div>
      <div className="flex flex-wrap gap-1">
        {skillsFound.map((skill) => (
          <span key={skill} className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px]">
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};
