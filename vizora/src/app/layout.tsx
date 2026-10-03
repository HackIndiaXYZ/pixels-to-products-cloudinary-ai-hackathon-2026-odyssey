import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vizora ✨ — Turn Phone Photos into Pro Product Shots",
  description:
    "Vizora uses Cloudinary AI to remove backgrounds, generate professional scenes, and deliver social-ready product photos in seconds.",
  keywords: [
    "AI product photography",
    "Cloudinary",
    "background removal",
    "generative AI",
    "social media",
    "e-commerce",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col font-[family-name:var(--font-inter)]">
        {children}
      </body>
    </html>
  );
}
