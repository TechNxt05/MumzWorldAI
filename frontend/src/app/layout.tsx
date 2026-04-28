import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mumzworld AI Shopping Assistant",
  description:
    "An AI-powered shopping assistant for moms. Convert your needs into structured shopping lists, product recommendations, and reminders — in English and Arabic.",
  keywords: ["mumzworld", "AI", "shopping", "assistant", "baby", "mom", "Arabic"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased min-h-screen font-sans`}>
        {children}
      </body>
    </html>
  );
}
