"use client";

import React from "react";
import { Camera, X } from "lucide-react";

interface PreFlightHudModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PreFlightHudModal: React.FC<PreFlightHudModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg rounded-xl bg-[var(--bg-surface,#12161F)] border border-[var(--border-color,#1F242F)] p-5 space-y-4 font-mono text-xs">
        <div className="flex justify-between items-center border-b border-slate-800 pb-2">
          <div className="flex items-center gap-2 text-white font-bold">
            <Camera className="w-4 h-4 text-blue-400" />
            <span>Pinned Pre-Flight Interview HUD</span>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="aspect-video bg-black rounded-lg border border-slate-800 flex items-center justify-center text-slate-500 text-xs">
          [Webcam Sandboxed Stream: Ready for Telemetry]
        </div>

        <div className="space-y-1.5 text-slate-300">
          <div className="flex justify-between">
            <span>Audio Latency Check:</span>
            <span className="text-emerald-400 font-bold">Clean (&lt;12ms)</span>
          </div>
          <div className="flex justify-between">
            <span>Lighting & Gaze Alignment:</span>
            <span className="text-emerald-400 font-bold">Optimal</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2 rounded bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all"
        >
          Launch Clean Loop Session
        </button>
      </div>
    </div>
  );
};
