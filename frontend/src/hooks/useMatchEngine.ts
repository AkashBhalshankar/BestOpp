"use client";

import { useState } from "react";
import { MatchRecord } from "../types/match.types";
import { apiClient } from "../lib/api-client";

export function useMatchEngine() {
  const [matches, setMatches] = useState<MatchRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMatches = async (profileId?: string) => {
    setIsLoading(true);
    try {
      const endpoint = profileId ? `/matches?profile_id=${profileId}` : "/matches";
      const data = await apiClient<MatchRecord[]>(endpoint);
      setMatches(data);
    } catch {
      // Fallback state
    } finally {
      setIsLoading(false);
    }
  };

  return { matches, isLoading, fetchMatches };
}
