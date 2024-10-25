import type { Metadata } from "next";
import { AudioProvider } from "@/context/AudioContext";
import { AudioToggle } from "@/components/AudioToggle";
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
    <html lang="en">
      <head />
      <body>
        <AudioProvider>
          <AudioToggle />
          {children}
        </AudioProvider>
      </body>
    </html>
  );
}
