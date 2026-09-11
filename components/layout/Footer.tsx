"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/components/providers/LanguageContext";
import { Palette, Heart, ShieldCheck, CheckCircle2, Award, Sparkles } from "lucide-react";

export const Footer: React.FC = () => {
  const { language } = useLanguage();

  return (
    <footer className="bg-[#1F2421] text-stone-300 mt-auto border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand & Positioning */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#C2410C] flex items-center justify-center text-white">
                <Palette className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold font-serif text-white">
                {language === "hi" ? "कारीगर सेतु" : "KarigarSetu"}
              </span>
            </div>
            <p className="text-sm text-stone-400 max-w-md leading-relaxed">
              Smart India Hackathon 2026 (SIH26090) — Heritage & Culture.
              An AI-powered artisan onboarding and digital heritage platform. Voice-to-catalogue onboarding bridge designed for integration with ONDC, GeM, and global digital commerce networks while archiving living craft knowledge.
            </p>
            <div className="flex items-center gap-2 text-xs text-amber-400 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>National Living Heritage Vault & Fair-Price Baseline Engine</span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-4">
              Platform Modules
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-amber-400 transition">
                  Overview & Live Demo
                </Link>
              </li>
              <li>
                <Link href="/products/new" className="hover:text-amber-400 transition">
                  AI Onboarding Studio
                </Link>
              </li>
              <li>
                <Link href="/vault" className="hover:text-amber-400 transition">
                  Living Heritage Vault
                </Link>
              </li>
              <li>
                <Link href="/catalogue" className="hover:text-amber-400 transition">
                  Market Listings
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-amber-400 transition">
                  Artisan Studio Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Heritage Integrity Architecture */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-4">
              Heritage Integrity
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li className="flex items-center gap-1.5 text-stone-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Artisan Approval Mandatory</span>
              </li>
              <li className="flex items-center gap-1.5 text-stone-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Source Attribution & Provenance</span>
              </li>
              <li className="flex items-center gap-1.5 text-stone-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Explicit Verification States</span>
              </li>
              <li className="flex items-center gap-1.5 text-stone-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>AI Transparency & Confidence</span>
              </li>
              <li className="flex items-center gap-1.5 text-stone-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>No Invented GI Registrations</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-stone-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© 2026 KarigarSetu — Built for Smart India Hackathon 2026 (SIH26090)</p>
          <div className="flex items-center gap-1">
            <span>Preserving Indian Cultural Memory with</span>
            <Heart className="w-3.5 h-3.5 text-[#C2410C] fill-[#C2410C]" />
            <span>and Responsible AI</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
