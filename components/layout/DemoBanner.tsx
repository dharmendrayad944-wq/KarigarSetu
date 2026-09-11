"use client";

import React, { useState } from "react";
import { Sparkles, Info, X } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageContext";

export const DemoBanner: React.FC = () => {
  const [dismissed, setDismissed] = useState(false);
  const { t } = useLanguage();

  const isDemo = process.env.NEXT_PUBLIC_DEMO_MODE === "true";

  if (!isDemo || dismissed) return null;

  return (
    <div className="bg-gradient-to-r from-amber-700 via-[#C2410C] to-stone-800 text-white text-xs font-medium px-4 py-2 flex items-center justify-between shadow-xs">
      <div className="flex items-center gap-2 max-w-5xl mx-auto w-full">
        <span className="inline-flex items-center gap-1 bg-white/20 px-2 py-0.5 rounded-full text-[11px] font-bold tracking-wide uppercase">
          <Sparkles className="w-3 h-3 text-amber-300" />
          {t.demoModeBadge}
        </span>
        <span className="hidden sm:inline">
          SIH 2026 Presentation Mode — Deterministic Multimodal AI & Verified Heritage Claims enabled out-of-the-box without external keys.
        </span>
        <span className="sm:hidden">SIH Demo AI Mode Active</span>
      </div>
      <button
        onClick={() => setDismissed(true)}
        className="p-1 hover:bg-white/20 rounded-md transition cursor-pointer"
        aria-label="Dismiss demo banner"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
