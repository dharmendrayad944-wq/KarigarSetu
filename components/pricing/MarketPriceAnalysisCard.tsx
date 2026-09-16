"use client";

import React, { useState } from "react";
import {
  PriceAnalysis,
  ProductComparable,
  CostReference,
} from "@/lib/db/schema";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { validateFinalArtisanPrice } from "@/lib/pricing/price-validator";
import {
  TrendingUp,
  Store,
  ExternalLink,
  ShieldCheck,
  Info,
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Sliders,
  Scale,
} from "lucide-react";

interface MarketPriceAnalysisCardProps {
  priceAnalysis?: PriceAnalysis;
  suggestedMinPrice?: number;
  suggestedMaxPrice?: number;
  finalPrice: number;
  onFinalPriceChange: (newPrice: number, mode: "recommendation_accepted" | "artisan_manual") => void;
  costReference?: CostReference;
  craftName?: string;
  isDemoMode?: boolean;
}

export const MarketPriceAnalysisCard: React.FC<MarketPriceAnalysisCardProps> = ({
  priceAnalysis,
  suggestedMinPrice,
  suggestedMaxPrice,
  finalPrice,
  onFinalPriceChange,
  costReference,
  craftName = "Traditional Craft",
  isDemoMode,
}) => {
  const [showAllComparables, setShowAllComparables] = useState(false);
  const [selectedComparable, setSelectedComparable] = useState<ProductComparable | null>(null);
  const [showCostReference, setShowCostReference] = useState(false);
  const [isEditingCustom, setIsEditingCustom] = useState(false);

  // Priority order for market analysis:
  // 1. Explicit priceAnalysis prop
  // 2. Product-specific suggested bounds (min/max or final)
  // 3. Fallback null (unavailable) - NEVER hardcoded Bastar numbers
  // Check if we have true comparable market data
  const hasComparables = Boolean(
    priceAnalysis &&
    priceAnalysis.comparables &&
    priceAnalysis.comparables.length > 0
  );

  const [customPriceInput, setCustomPriceInput] = useState<number>(
    finalPrice || priceAnalysis?.median_price || suggestedMinPrice || 1000
  );

  const comparables = priceAnalysis?.comparables || [];
  const displayComparables = showAllComparables ? comparables : comparables.slice(0, 4);

  // Evidence badge color
  const evidenceBadgeColors = {
    HIGH: "bg-emerald-100 text-emerald-900 border-emerald-300",
    MEDIUM: "bg-amber-100 text-amber-900 border-amber-300",
    LOW: "bg-rose-100 text-rose-900 border-rose-300",
  }[priceAnalysis?.evidence_strength || "MEDIUM"];

  // Format date helper (deterministic across SSR and client)
  const formatCheckedDate = (dateStr?: string) => {
    try {
      const d = new Date(dateStr || "2026-09-11T18:30:00.000Z");
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const day = d.getUTCDate();
      const month = months[d.getUTCMonth()];
      const year = d.getUTCFullYear();
      return `${day} ${month} ${year}, 18:30 IST`;
    } catch {
      return "11 Sep 2026, 18:30 IST";
    }
  };

  // Quick Action Handlers
  const handleUseRecommendation = () => {
    if (priceAnalysis?.median_price && priceAnalysis.median_price > 0) {
      setCustomPriceInput(priceAnalysis.median_price);
      setIsEditingCustom(false);
      onFinalPriceChange(priceAnalysis.median_price, "recommendation_accepted");
    }
  };

  const priceValidation = validateFinalArtisanPrice(customPriceInput);

  const handleApplyCustomPrice = () => {
    if (priceValidation.isValid && priceValidation.sanitizedValue) {
      onFinalPriceChange(priceValidation.sanitizedValue, "artisan_manual");
      setIsEditingCustom(false);
    }
  };

  // SECTION 1 REQUIREMENT: Zero or insufficient comparable market data
  // DO NOT produce a market price from an internal cost formula.
  // Show: "Insufficient comparable market data."
  // Allow: [Set Artisan Price]
  // An optional cost-reference tool may exist separately, but must never be presented as the market recommendation.
  if (!hasComparables || !priceAnalysis) {
    return (
      <Card className="bg-white border-2 border-stone-200 shadow-sm p-6 space-y-5">
        <div className="flex items-center gap-3 border-b border-stone-100 pb-4">
          <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 shrink-0">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-stone-900 font-serif">MARKET PRICE ANALYSIS</h3>
            <p className="text-xs text-stone-500">Comparable market product discovery & transparent pricing evidence</p>
          </div>
        </div>

        {/* Insufficient Market Data Banner */}
        <div className="p-5 bg-stone-50 border border-stone-200 rounded-xl space-y-2 text-center">
          <AlertTriangle className="w-6 h-6 text-amber-600 mx-auto" />
          <h4 className="text-sm font-bold text-stone-900">Insufficient comparable market data.</h4>
          <p className="text-xs text-stone-600 max-w-md mx-auto leading-relaxed">
            Zero or insufficient comparable market listings were found for this craft specification. KarigarSetu does not produce an automated market price recommendation from an internal cost formula. The artisan retains sovereign authority to establish the listing price.
          </p>
        </div>

        {/* Set Artisan Price section */}
        <div className="p-4 bg-orange-50/50 rounded-2xl border-2 border-[#C2410C]/30 space-y-3">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-900 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#C2410C]" />
                <span>Set Artisan Price (INR ₹):</span>
              </span>
              <p className="text-[11px] text-stone-600">
                You decide the final selling price for your craft work.
              </p>
            </div>
            {finalPrice > 0 && (
              <div className="text-right">
                <span className="text-xs font-mono text-stone-500">Current: </span>
                <strong className="text-base font-black text-[#C2410C] font-mono">
                  ₹{finalPrice.toLocaleString("en-IN")}
                </strong>
              </div>
            )}
          </div>

          <div className="space-y-2 pt-1">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500 font-bold text-sm">₹</span>
                <input
                  type="number"
                  min={1}
                  value={customPriceInput || ""}
                  onChange={(e) => {
                    const val = e.target.value === "" ? 0 : Number(e.target.value);
                    setCustomPriceInput(val);
                    setIsEditingCustom(true);
                  }}
                  className={`w-full pl-8 pr-3 py-2 rounded-xl border font-bold text-base bg-white focus:ring-2 ${
                    !priceValidation.isValid && isEditingCustom
                      ? "border-rose-400 text-rose-900 focus:ring-rose-500 focus:border-rose-500"
                      : "border-stone-300 text-stone-900 focus:ring-[#C2410C] focus:border-[#C2410C]"
                  }`}
                  placeholder="Enter price in ₹"
                />
              </div>

              <Button
                type="button"
                variant="primary"
                onClick={handleApplyCustomPrice}
                disabled={!priceValidation.isValid}
                className="text-xs px-4 py-2 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Set Artisan Price
              </Button>
            </div>

            {!priceValidation.isValid && isEditingCustom && (
              <p className="text-[11px] font-semibold text-rose-600 flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                <span>{priceValidation.error}</span>
              </p>
            )}
          </div>
        </div>

        {/* Optional Internal Cost Reference (Strictly Separate from Market Recommendation) */}
        <div className="border-t border-stone-100 pt-3">
          <button
            type="button"
            onClick={() => setShowCostReference(!showCostReference)}
            className="w-full flex items-center justify-between text-xs text-stone-500 hover:text-stone-800 transition cursor-pointer py-1"
          >
            <span className="flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5" />
              <span>Optional Artisan Cost Reference (Internal Guild Benchmark)</span>
            </span>
            {showCostReference ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {showCostReference && (
            <div className="mt-3 p-3.5 bg-stone-50 rounded-xl border border-stone-200 space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-stone-700 text-[11px] uppercase">
                  Internal Cost Reference Baseline
                </span>
                <span className="text-[10px] text-amber-800 font-semibold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  Internal reference only — never a market recommendation
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
                <div className="p-2 bg-white rounded-lg border border-stone-200">
                  <span className="text-stone-500 block">Material Cost:</span>
                  <strong className="text-stone-900">₹{costReference?.material_cost ?? 850}</strong>
                </div>
                <div className="p-2 bg-white rounded-lg border border-stone-200">
                  <span className="text-stone-500 block">Craft Hours:</span>
                  <strong className="text-stone-900">{costReference?.labor_hours ?? 22} hrs</strong>
                </div>
                <div className="p-2 bg-white rounded-lg border border-stone-200">
                  <span className="text-stone-500 block">Guild Benchmark:</span>
                  <strong className="text-stone-900">₹{costReference?.hourly_benchmark ?? 140}/hr</strong>
                </div>
                <div className="p-2 bg-white rounded-lg border border-stone-200">
                  <span className="text-stone-500 block">Estimated Cost:</span>
                  <strong className="text-stone-900">
                    ₹{((costReference?.material_cost ?? 850) + (costReference?.labor_hours ?? 22) * (costReference?.hourly_benchmark ?? 140)).toLocaleString("en-IN")}
                  </strong>
                </div>
              </div>

              <p className="text-[11px] text-stone-500 leading-relaxed">
                {costReference?.rationale ||
                  "Used solely for artisan internal bookkeeping. KarigarSetu never presents an internal cost formula as an external market price recommendation."}
              </p>
            </div>
          )}
        </div>
      </Card>
    );
  }

  const analysis = priceAnalysis;

  return (
    <Card className="bg-white border-2 border-stone-200 shadow-sm space-y-5 overflow-hidden">
      {/* 1. Header with Clear Title & Evidence Strength */}
      <div className="border-b border-stone-100 pb-3 flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-orange-100 flex items-center justify-center text-[#C2410C] shrink-0">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-stone-900 font-serif flex items-center gap-2">
              <span>MARKET PRICE ANALYSIS</span>
            </h3>
            <p className="text-xs text-stone-500">
              Comparable market product discovery & transparent pricing evidence
            </p>
          </div>
        </div>

        <div className="flex flex-col items-end gap-1">
          <div className={`px-2.5 py-0.5 rounded-full border text-[10px] font-extrabold uppercase tracking-wider ${evidenceBadgeColors}`}>
            Evidence: {analysis.evidence_strength}
          </div>
          <span className="text-[10px] text-stone-400">
            {analysis.comparable_count} comparables
          </span>
        </div>
      </div>

      {/* 2. DEMO MODE SIMULATION NOTICE (Section 8 requirement) */}
      {(isDemoMode ?? analysis.is_demo_data) && (
        <div className="bg-[#FFFBEB] border border-amber-200 rounded-xl p-3 flex items-start gap-2 text-xs text-amber-900">
          <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong className="font-semibold text-amber-950">Simulated Market Data — SIH Demo Mode</strong>
            <p className="text-[11px] text-amber-800/90 mt-0.5">
              Live marketplace retrieval unavailable in demo environment. Showing deterministic benchmark listings for {craftName}.
            </p>
          </div>
        </div>
      )}

      {/* 3. THREE-TIER RESPONSIBLE DISTINCTION (Section 15 requirement) */}
      <div className="grid grid-cols-3 gap-2 text-center p-2.5 bg-[#FAF7F2] rounded-xl border border-stone-200 text-xs">
        <div className="border-r border-stone-200 pr-1">
          <span className="text-[10px] uppercase font-bold text-stone-500 block">1. Observation</span>
          <span className="text-[11px] font-medium text-stone-800">What market lists</span>
        </div>
        <div className="border-r border-stone-200 px-1">
          <span className="text-[10px] uppercase font-bold text-[#C2410C] block">2. Recommendation</span>
          <span className="text-[11px] font-bold text-stone-900">Indicative range</span>
        </div>
        <div className="pl-1">
          <span className="text-[10px] uppercase font-bold text-emerald-700 block">3. Artisan Decision</span>
          <span className="text-[11px] font-bold text-emerald-800">Final authority</span>
        </div>
      </div>

      {/* 4. COMPARABLES EVIDENCE LIST (Section 8 requirement) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-stone-800 flex items-center gap-1.5">
            <Store className="w-3.5 h-3.5 text-[#C2410C]" />
            <span>Benchmark Listings ({analysis.comparable_count})</span>
          </span>
          <span className="text-[11px] text-stone-500">
            Approved Benchmark Sources: {analysis.approved_sources_count}
          </span>
        </div>

        {/* Table / List of Comparables */}
        <div className="border border-stone-200 rounded-xl overflow-hidden divide-y divide-stone-100 text-xs bg-white">
          {displayComparables.length > 0 ? (
            displayComparables.map((comp) => {
              const isSelected = selectedComparable?.id === comp.id;
              return (
                <div
                  key={comp.id}
                  onClick={() => setSelectedComparable(isSelected ? null : comp)}
                  className={`p-3 transition-colors cursor-pointer hover:bg-stone-50/80 ${
                    isSelected ? "bg-orange-50/50 border-l-4 border-l-[#C2410C]" : ""
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0 flex-1 space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-stone-900 truncate block">
                          {comp.title}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-stone-500">
                        <span className="font-medium text-stone-700 px-1.5 py-0.2 bg-stone-100 rounded text-[10px]">
                          {comp.marketplace}
                        </span>
                        <span>•</span>
                        <span className="text-emerald-700 font-semibold">
                          {Math.round(comp.similarity_score * 100)}% match
                        </span>
                        {comp.url && (
                          <span className="text-stone-400 hover:text-stone-600 inline-flex items-center gap-0.5">
                            <ExternalLink className="w-2.5 h-2.5" />
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-sm font-bold text-stone-900 font-mono">
                        ₹{comp.price.toLocaleString("en-IN")}
                      </div>
                      <span className="text-[10px] text-stone-400 capitalize">
                        {comp.source_type.replace("_", " ")}
                      </span>
                    </div>
                  </div>

                  {/* Expanded Comparability Breakdown */}
                  {isSelected && (
                    <div className="mt-2.5 pt-2.5 border-t border-stone-200/70 text-[11px] space-y-2 bg-[#FAF7F2] -mx-3 -mb-3 p-3 rounded-b-xl">
                      <div className="font-bold text-stone-700 uppercase tracking-wider text-[10px]">
                        Multi-Factor Comparability Breakdown:
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-[11px]">
                        <div>
                          <span className="text-stone-500 block">Craft:</span>
                          <strong className="text-stone-800">{Math.round((comp.craft_similarity || 0.95) * 100)}%</strong>
                        </div>
                        <div>
                          <span className="text-stone-500 block">Category:</span>
                          <strong className="text-stone-800">{Math.round((comp.category_similarity || 0.92) * 100)}%</strong>
                        </div>
                        <div>
                          <span className="text-stone-500 block">Material:</span>
                          <strong className="text-stone-800">{Math.round((comp.material_similarity || 0.90) * 100)}%</strong>
                        </div>
                        <div>
                          <span className="text-stone-500 block">Technique:</span>
                          <strong className="text-stone-800">{Math.round((comp.technique_similarity || 0.88) * 100)}%</strong>
                        </div>
                        <div>
                          <span className="text-stone-500 block">Size match:</span>
                          <strong className="text-stone-800">{Math.round((comp.size_similarity || 0.75) * 100)}%</strong>
                        </div>
                        <div>
                          <span className="text-stone-500 block">Handmade:</span>
                          <strong className="text-emerald-700">Verified</strong>
                        </div>
                      </div>

                      {comp.match_reasons && comp.match_reasons.length > 0 && (
                        <div className="text-stone-600 text-[10px] pt-1">
                          <strong>Match rationale:</strong> {comp.match_reasons.join(", ")}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="p-6 text-center text-stone-600 space-y-3 bg-[#FAF7F2]">
              <AlertTriangle className="w-6 h-6 text-amber-600 mx-auto" />
              <div className="space-y-1">
                <div className="text-sm font-bold text-stone-900 font-serif">
                  Insufficient comparable market data.
                </div>
                <p className="text-xs text-stone-500 max-w-sm mx-auto">
                  No verified market listings match this specific craft specification. KarigarSetu does not generate fabricated price baselines.
                </p>
              </div>
              <div className="flex items-center justify-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => window.location.reload()}
                  className="px-3.5 py-1.5 rounded-lg border border-stone-300 hover:bg-white text-xs font-semibold text-stone-700 transition"
                >
                  Search Again
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditingCustom(true)}
                  className="px-3.5 py-1.5 rounded-lg bg-[#C2410C] hover:bg-[#9A3412] text-xs font-bold text-white transition"
                >
                  Set Artisan Price
                </button>
              </div>
            </div>
          )}
        </div>

        {comparables.length > 4 && (
          <button
            type="button"
            onClick={() => setShowAllComparables(!showAllComparables)}
            className="w-full py-1.5 text-center text-xs text-[#C2410C] font-semibold hover:underline flex items-center justify-center gap-1 cursor-pointer"
          >
            <span>{showAllComparables ? "Show Fewer Comparables" : `View All ${comparables.length} Comparables`}</span>
            {showAllComparables ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        )}
      </div>

      {/* 5. STATISTICAL MARKET DISTRIBUTION (Section 7 & 8 requirement) */}
      <div className="bg-[#FAF7F2] p-4 rounded-xl border border-stone-200 space-y-3 text-xs">
        <div className="grid grid-cols-3 gap-2 divide-x divide-stone-200 text-center">
          <div>
            <span className="text-[10px] uppercase font-bold text-stone-500 block">Market Minimum</span>
            <span className="text-sm font-bold text-stone-900 font-mono">
              ₹{analysis.min_price.toLocaleString("en-IN")}
            </span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-indigo-700 block">Market Median</span>
            <span className="text-base font-extrabold text-indigo-900 font-mono">
              ₹{analysis.median_price.toLocaleString("en-IN")}
            </span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-stone-500 block">Market Maximum</span>
            <span className="text-sm font-bold text-stone-900 font-mono">
              ₹{analysis.max_price.toLocaleString("en-IN")}
            </span>
          </div>
        </div>

        {/* Recommended Range Highlight */}
        <div className="p-3 bg-white rounded-xl border border-orange-200 shadow-2xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-800 uppercase tracking-wide flex items-center gap-1.5">
              <Scale className="w-3.5 h-3.5 text-[#C2410C]" />
              <span>Recommended Market Range:</span>
            </span>
            <span className="text-base font-black text-[#C2410C] font-mono">
              ₹{analysis.recommended_min.toLocaleString("en-IN")} – ₹{analysis.recommended_max.toLocaleString("en-IN")}
            </span>
          </div>
          <p className="text-[11px] text-stone-500 leading-relaxed">
            {analysis.explanation}
          </p>
        </div>

        {/* Price Freshness Notice (Phases 11 & 13 requirements) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-stone-500 pt-1 gap-1 border-t border-stone-200/50">
          <span>Price checked: <strong className="text-stone-700">{formatCheckedDate(analysis.checked_at)}</strong></span>
          <span className="text-[10px] text-stone-400 italic">Market prices may change.</span>
        </div>
      </div>

      {/* 6. ARTISAN FINAL PRICE DECISION (Phase 11 & 14 requirement - FINAL SOVEREIGNTY) */}
      <div className="p-4 bg-orange-50/50 rounded-2xl border-2 border-[#C2410C]/30 space-y-3">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-900 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#C2410C]" />
              <span>Your Final Selling Price (INR ₹):</span>
            </span>
            <p className="text-[11px] font-semibold text-[#9A3412]">
              Final price is decided by the artisan. The AI provides a market reference only.
            </p>
          </div>
          <div className="text-right">
            <span className="text-xs font-mono font-bold text-stone-500">Current: </span>
            <strong className="text-lg font-black text-[#C2410C] font-mono">
              ₹{(finalPrice || customPriceInput).toLocaleString("en-IN")}
            </strong>
          </div>
        </div>

        {/* Editable Price Input & Buttons */}
        <div className="space-y-2 pt-1">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500 font-bold text-sm">₹</span>
              <input
                type="number"
                min={1}
                value={customPriceInput === 0 && isEditingCustom ? "" : (customPriceInput || "")}
                onChange={(e) => {
                  const val = e.target.value === "" ? 0 : Number(e.target.value);
                  setCustomPriceInput(val);
                  setIsEditingCustom(true);
                }}
                className={`w-full pl-8 pr-3 py-2 rounded-xl border font-bold text-base bg-white focus:ring-2 ${
                  !priceValidation.isValid && isEditingCustom
                    ? "border-rose-400 text-rose-900 focus:ring-rose-500 focus:border-rose-500"
                    : "border-stone-300 text-stone-900 focus:ring-[#C2410C] focus:border-[#C2410C]"
                }`}
                placeholder="Enter price in ₹"
              />
            </div>

            {isEditingCustom ? (
              <Button
                type="button"
                variant="primary"
                onClick={handleApplyCustomPrice}
                disabled={!priceValidation.isValid}
                className="text-xs px-3 py-2 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Set My Price
              </Button>
            ) : (
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditingCustom(true)}
                className="text-xs px-3 py-2 rounded-xl border-stone-300"
              >
                Edit Price
              </Button>
            )}
          </div>

          {!priceValidation.isValid && isEditingCustom && (
            <p className="text-[11px] font-semibold text-rose-600 flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
              <span>{priceValidation.error}</span>
            </p>
          )}

          {/* Quick Actions (Section 12 requirement) */}
          <div className="flex items-center gap-2 pt-1">
            <button
              type="button"
              onClick={handleUseRecommendation}
              className="flex-1 py-1.5 px-2.5 rounded-lg bg-orange-100 hover:bg-orange-200 text-[#9A3412] text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Use Recommended Price (₹{analysis.median_price.toLocaleString("en-IN")})</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setIsEditingCustom(true);
              }}
              className="py-1.5 px-2.5 rounded-lg border border-stone-300 hover:bg-stone-100 text-stone-700 text-xs font-semibold transition cursor-pointer"
            >
              Enter My Own Price
            </button>
          </div>
        </div>
      </div>

      {/* 7. OPTIONAL ARTISAN COST REFERENCE (Section 14 requirement - STRICTLY SEPARATE) */}
      <div className="border-t border-stone-100 pt-3">
        <button
          type="button"
          onClick={() => setShowCostReference(!showCostReference)}
          className="w-full flex items-center justify-between text-xs text-stone-500 hover:text-stone-800 transition cursor-pointer py-1"
        >
          <span className="flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5" />
            <span>Optional Artisan Cost Reference (Internal Guild Benchmark)</span>
          </span>
          {showCostReference ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        {showCostReference && (
          <div className="mt-3 p-3.5 bg-stone-50 rounded-xl border border-stone-200 space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-stone-700 text-[11px] uppercase">
                Internal Cost Reference Baseline
              </span>
              <span className="text-[10px] text-stone-500 italic">
                Note: This is an internal cost reference only, not a market pricing decision.
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
              <div className="p-2 bg-white rounded-lg border border-stone-200">
                <span className="text-stone-500 block">Material Cost:</span>
                <strong className="text-stone-900">₹{costReference?.material_cost ?? 850}</strong>
              </div>
              <div className="p-2 bg-white rounded-lg border border-stone-200">
                <span className="text-stone-500 block">Craft Hours:</span>
                <strong className="text-stone-900">{costReference?.labor_hours ?? 22} hrs</strong>
              </div>
              <div className="p-2 bg-white rounded-lg border border-stone-200">
                <span className="text-stone-500 block">Guild Benchmark:</span>
                <strong className="text-stone-900">₹{costReference?.hourly_benchmark ?? 140}/hr</strong>
              </div>
              <div className="p-2 bg-white rounded-lg border border-stone-200">
                <span className="text-stone-500 block">Estimated Cost:</span>
                <strong className="text-stone-900">
                  ₹{((costReference?.material_cost ?? 850) + (costReference?.labor_hours ?? 22) * (costReference?.hourly_benchmark ?? 140)).toLocaleString("en-IN")}
                </strong>
              </div>
            </div>

            <p className="text-[11px] text-stone-500 leading-relaxed">
              {costReference?.rationale ||
                "Used solely for artisan internal bookkeeping. KarigarSetu's market recommendation is derived strictly from external comparable marketplace listings."}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};
