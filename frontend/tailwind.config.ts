import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/context/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          // Default Theme (Midnight Cobalt)
          canvas: "var(--bg-canvas, #0A0D12)",
          panel: "var(--bg-panel, #12161F)",
          bright: "var(--bg-bright, #181E2B)",
          border: "var(--border-color, #1F242F)",
          subtle: "var(--border-subtle, #181C26)",
          primary: "var(--accent-primary, #3B82F6)",
          emerald: "var(--accent-emerald, #10B981)",
          amber: "var(--accent-amber, #F59E0B)",
          crimson: "var(--accent-crimson, #EF4444)",

          // Alternate Theme (Earthy Tone)
          earthyCanvas: "#1A1F16",
          earthyPanel: "#242B1F",
          earthyBorder: "#2E3827",
          earthySage: "#84A98C",
        },
      },
      fontFamily: {
        sans: ["Geist", "Inter", "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
      },
    },
  },
  plugins: [],
};

export default config;
