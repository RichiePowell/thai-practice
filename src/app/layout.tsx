import type { Metadata } from "next";
import { AudioProvider } from "@/context/AudioContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { AudioToggle } from "@/components/game/AudioToggle";
import { ThemeToggle } from "@/components/game/ThemeToggle";
import { ThemeScript } from "@/components/ThemeScript";
import "./globals.css";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Thai Language Game",
  description: "Learn Thai phrases through an interactive quiz!",
  icons: {
    icon: [
      {
        url: "/favicon.svg",
        type: "image/svg+xml",
      },
    ],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className="min-h-screen bg-background">
        <ThemeScript />
        <ThemeProvider>
          <AudioProvider>
            <div className="relative mb-20">
              <ThemeToggle />
              <AudioToggle />
              {children}
            </div>
          </AudioProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
