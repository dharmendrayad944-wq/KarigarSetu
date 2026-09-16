"use client";

import React, { useState } from "react";
import { Info, ChevronDown, ChevronUp, ShieldCheck, HelpCircle } from "lucide-react";

interface JudgeTrustPanelProps {
  craftName?: string;
  comparableCount?: number;
  showAllQAsDefault?: boolean;
}

export const JUDGE_QAS = [
  {
    q: "Are these prices live?",
    a: "No. The SIH demonstration uses deterministic market benchmark data. The architecture is designed for authorized live data providers.",
  },
  {
    q: "Is this live ONDC?",
    a: "No. The current prototype demonstrates the ONDC-ready catalog/export layer and simulated network events. Live network integration is a production deployment step.",
  },
  {
    q: "Is the Heritage Vault an official national government database?",
    a: "No. It is the KarigarSetu prototype's living heritage repository, designed to structure and preserve artisan knowledge using authoritative sources where available.",
  },
  {
    q: "Are the images photographs of these artisans?",
    a: "No. They are representative real craft photographs with documented attribution; they are not claimed to depict the specific demo artisans.",
  },
  {
    q: "Does AI decide the price?",
    a: "No. It analyzes comparable market evidence and provides an indicative range. The artisan decides the final price.",
  },
  {
    q: "What happens with zero comparables?",
    a: "We do not invent a market price. We report insufficient market evidence and let the artisan set the price.",
  },
];

export function JudgeTrustPanel({ craftName, comparableCount = 0 }: JudgeTrustPanelProps) {
  const [showQAs, setShowQAs] = useState(false);

  return (
    <div className="bg-[#1E3A5F] text-white rounded-2xl p-5 sm:p-6 space-y-4 shadow-sm border border-slate-700">
      <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-3">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0" />
          <div>
            <h3 className="text-sm font-bold font-serif">SIH26090 Judge Trust & Methodology Panel</h3>
            <p className="text-[11px] text-stone-300">Transparent system boundary, verification criteria & prototype reality</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setShowQAs(!showQAs)}
          className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-amber-300 transition flex items-center gap-1 shrink-0"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>{showQAs ? "Hide Evaluator Q&A" : "Evaluator Q&A (6 Key Answers)"}</span>
          {showQAs ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        </button>
      </div>

      {/* Core Methodology Architecture Mapping */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
        <div className="p-3 bg-white/10 rounded-xl space-y-1">
          <div className="font-bold text-amber-300 flex items-center gap-1.5">
            <span>📸</span> Product Understanding
          </div>
          <p className="text-stone-300 leading-relaxed">
            Extracted from <strong>Photo + Artisan Voice</strong>. Analyzes morphology, materials, and motifs with human-in-the-loop review.
          </p>
        </div>

        <div className="p-3 bg-white/10 rounded-xl space-y-1">
          <div className="font-bold text-amber-300 flex items-center gap-1.5">
            <span>📊</span> Market Price Discovery
          </div>
          <p className="text-stone-300 leading-relaxed">
            Derived from <strong>Comparable Market Evidence</strong> ({comparableCount} benchmark listings). <em>Simulated Market Data in SIH Demo Mode.</em>
          </p>
        </div>

        <div className="p-3 bg-white/10 rounded-xl space-y-1">
          <div className="font-bold text-amber-300 flex items-center gap-1.5">
            <span>🎙️</span> Heritage Story & Claims
          </div>
          <p className="text-stone-300 leading-relaxed">
            Lineage marked as <strong>Artisan Provided / Artisan Attested</strong>. Claims classified as <strong>AI Suggested</strong> or <strong>Verified Source</strong>.
          </p>
        </div>

        <div className="p-3 bg-white/10 rounded-xl space-y-1">
          <div className="font-bold text-amber-300 flex items-center gap-1.5">
            <span>🏛️</span> GI Status Verification
          </div>
          <p className="text-stone-300 leading-relaxed">
            Craft-level GI backed by <strong>Official Registry Evidence (IP India)</strong>. Individual authorised-user status requires official evidence.
          </p>
        </div>

        <div className="p-3 bg-white/10 rounded-xl space-y-1">
          <div className="font-bold text-amber-300 flex items-center gap-1.5">
            <span>⚖️</span> Final Price & Publication
          </div>
          <p className="text-stone-300 leading-relaxed">
            Final Price is an <strong>Artisan Decision</strong>. Publication requires explicit <strong>Artisan Approval</strong> — never published without consent.
          </p>
        </div>

        <div className="p-3 bg-white/10 rounded-xl space-y-1">
          <div className="font-bold text-amber-300 flex items-center gap-1.5">
            <span>💾</span> Prototype Architecture
          </div>
          <p className="text-stone-300 leading-relaxed">
            <strong>SIH prototype: browser-local persistence</strong>. Production roadmap: PostgreSQL/Supabase + object storage. ONDC integration-ready catalogue with simulated network events.
          </p>
        </div>
      </div>

      {/* Built-in Evaluator Q&A Accordion */}
      {showQAs && (
        <div className="mt-4 pt-4 border-t border-white/10 space-y-3">
          <div className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5" />
            <span>Essential Technical & Heritage Answers for SIH Evaluators</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            {JUDGE_QAS.map((item, idx) => (
              <div key={idx} className="p-3 bg-black/25 rounded-xl border border-white/10 space-y-1">
                <div className="font-bold text-amber-200 flex items-start gap-1">
                  <span>Q{idx + 1}:</span>
                  <span>{item.q}</span>
                </div>
                <div className="text-stone-300 leading-relaxed pl-5 text-[11px]">
                  <strong>A:</strong> &ldquo;{item.a}&rdquo;
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="text-[11px] text-stone-400 border-t border-white/10 pt-2.5 flex items-center justify-between">
        <span>⚠ All AI-generated attributes require human verification. Artisan retains 100% pricing and publication sovereignty.</span>
        <span className="text-stone-400 font-mono text-[10px]">SIH26090 Standards</span>
      </div>
    </div>
  );
}
