import type { Metadata } from "next";
import { AudioProvider } from "@/context/AudioContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { AudioToggle } from "@/components/game/AudioToggle";
import { ThemeToggle } from "@/components/game/ThemeToggle";
import { ThemeScript } from "@/components/ThemeScript";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Thai Language Learning Game",
    template: "%s | Thai Language Learning",
  },
  description: "Learn Thai phrases and script through an interactive quiz game",
  openGraph: {
    title: "Thai Language Learning Game",
    description:
      "Learn Thai phrases and script through an interactive quiz game",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className="min-h-screen bg-background">
        <ThemeScript />
        <ThemeProvider>
          <AudioProvider>
            <div className="relative">
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
