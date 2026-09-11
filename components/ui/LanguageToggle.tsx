"use client";

import React from "react";
import { Languages } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageContext";

export const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <button
      onClick={() => setLanguage(language === "en" ? "hi" : "en")}
      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#E7E0D3] bg-white hover:bg-[#FFF7ED] text-[#1F2421] text-sm font-semibold transition-all shadow-2xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#C2410C]"
      title="Toggle Language / भाषा बदलें"
      aria-label="Toggle Language"
    >
      <Languages className="w-4 h-4 text-[#C2410C]" />
      <span>{language === "en" ? "हिंदी" : "English"}</span>
    </button>
  );
};
