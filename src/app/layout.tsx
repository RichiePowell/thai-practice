import type { Metadata } from "next";
import "./globals.css";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body>{children}</body>
    </html>
  );
}
