"use client";

import React, { createContext, useContext, useState } from "react";

export type CandidateTrack = "experienced" | "fresher";

export interface CandidateState {
  id: string;
  fullName: string;
  email: string;
  track: CandidateTrack;
  batchYear?: number;
  collegeTier: string;
  currentTitle: string;
  yearsOfExperience: number;
  targetBaseCtcInr: number;
  productionPeakRps: number;
  githubUrl: string;
  linkedinUrl: string;
}

interface CandidateContextType {
  candidate: CandidateState;
  setTrack: (track: CandidateTrack) => void;
  updateTargetBase: (inr: number) => void;
}

const DEFAULT_CANDIDATE: CandidateState = {
  id: "cand-8821-sys",
  fullName: "Arjun M.",
  email: "arjun.systems@bestopp.dev",
  track: "experienced",
  batchYear: 2021,
  collegeTier: "Tier-1 (IIT/NIT)",
  currentTitle: "Senior Staff Systems Engineer",
  yearsOfExperience: 4.2,
  targetBaseCtcInr: 4200000,
  productionPeakRps: 22000,
  githubUrl: "https://github.com/bestopp",
  linkedinUrl: "https://linkedin.com/in/bestopp",
};

const CandidateContext = createContext<CandidateContextType | undefined>(undefined);

export function CandidateProvider({ children }: { children: React.ReactNode }) {
  const [candidate, setCandidate] = useState<CandidateState>(DEFAULT_CANDIDATE);

  const setTrack = (track: CandidateTrack) => {
    setCandidate((prev) => ({
      ...prev,
      track,
      yearsOfExperience: track === "fresher" ? 0.0 : 4.2,
      currentTitle: track === "fresher" ? "Student IC (2025/2026 Batch)" : "Senior Staff Systems Engineer",
      targetBaseCtcInr: track === "fresher" ? 1400000 : 4200000,
      batchYear: track === "fresher" ? 2025 : 2021,
    }));
  };

  const updateTargetBase = (inr: number) => {
    setCandidate((prev) => ({ ...prev, targetBaseCtcInr: inr }));
  };

  return (
    <CandidateContext.Provider value={{ candidate, setTrack, updateTargetBase }}>
      {children}
    </CandidateContext.Provider>
  );
}

export function useCandidate(): CandidateContextType {
  const context = useContext(CandidateContext);
  if (!context) {
    throw new Error("useCandidate must be used within a CandidateProvider");
  }
  return context;
}
