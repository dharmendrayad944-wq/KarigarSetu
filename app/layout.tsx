import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/providers/LanguageContext";
import { DemoBanner } from "@/components/layout/DemoBanner";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KarigarSetu | Artisan Heritage AI Onboarding",
  description: "AI assistant turning product photos and native-language voice into marketplace-ready listings with verified cultural heritage profiles for Indian artisans.",
  keywords: ["Indian Handicrafts", "Artisans", "Smart India Hackathon", "GI Tag", "Heritage", "Madhubani", "Dokra", "Blue Pottery"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-[#FAF7F2] text-[#1F2421]">
        <LanguageProvider>
          <DemoBanner />
          <Navbar />
          <main className="flex-1 flex flex-col">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
