import type { Metadata } from "next";
import { ThemeProvider } from "../context/ThemeContext";
import { CandidateProvider } from "../context/CandidateContext";
import { LeftRailNav } from "../components/navigation/LeftRailNav";
import { TopUtilityBar } from "../components/navigation/TopUtilityBar";
import "./globals.css";

export const metadata: Metadata = {
  title: "BestOpp — Best Opportunities",
  description:
    "High-leverage engineering career platform with bi-directional skill parity, ghost job classification, and compensation de-obfuscation.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[var(--bg-canvas,#0A0D12)] text-slate-100 font-sans antialiased h-screen overflow-hidden flex transition-colors duration-200">
        <ThemeProvider>
          <CandidateProvider>
            <div className="flex h-screen w-screen overflow-hidden">
              <LeftRailNav />
              <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
                <TopUtilityBar />
                <main className="flex-1 overflow-y-auto bg-[var(--bg-canvas,#0A0D12)]">
                  {children}
                </main>
              </div>
            </div>
          </CandidateProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
