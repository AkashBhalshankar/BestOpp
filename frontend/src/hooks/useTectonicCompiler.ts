"use client";

import { useState } from "react";
import { TectonicCompileResponse } from "../types/resume.types";
import { apiClient } from "../lib/api-client";

export function useTectonicCompiler() {
  const [isCompiling, setIsCompiling] = useState(false);
  const [result, setResult] = useState<TectonicCompileResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const compile = async (latexSource: string) => {
    setIsCompiling(true);
    setError(null);
    try {
      const res = await apiClient<TectonicCompileResponse>("/resume/compile", {
        method: "POST",
        body: JSON.stringify({ latex_source: latexSource }),
      });
      setResult(res);
      return res;
    } catch (err: any) {
      setError(err.message || "Compilation failed");
      return null;
    } finally {
      setIsCompiling(false);
    }
  };

  return { compile, isCompiling, result, error };
}
