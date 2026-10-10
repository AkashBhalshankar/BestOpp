"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type ThemeMode = "midnight" | "earthy";

interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>("midnight");

  useEffect(() => {
    const saved = localStorage.getItem("bestopp_theme") as ThemeMode | null;
    if (saved === "midnight" || saved === "earthy") {
      setThemeState(saved);
      applyThemeToDocument(saved);
    } else {
      applyThemeToDocument("midnight");
    }
  }, []);

  const applyThemeToDocument = (mode: ThemeMode) => {
    if (typeof document !== "undefined") {
      if (mode === "earthy") {
        document.documentElement.classList.add("earthy-mode");
        document.documentElement.classList.remove("midnight-mode");
      } else {
        document.documentElement.classList.add("midnight-mode");
        document.documentElement.classList.remove("earthy-mode");
      }
    }
  };

  const setTheme = (mode: ThemeMode) => {
    setThemeState(mode);
    localStorage.setItem("bestopp_theme", mode);
    applyThemeToDocument(mode);
  };

  const toggleTheme = () => {
    const next = theme === "midnight" ? "earthy" : "midnight";
    setTheme(next);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
