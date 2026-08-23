import type { Metadata, Viewport } from "next";
import { cabinet, satoshi } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Forge — Your athletes deserve one place. Not five.",
  description:
    "Replace the spreadsheets, the shared docs, and the five different apps — with one platform that's actually yours.",
  applicationName: "Forge",
  icons: {
    icon: "/favicon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0f1115",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${satoshi.variable} ${cabinet.variable}`}>
      <body className={`${satoshi.className} antialiased`}>{children}</body>
    </html>
  );
}
