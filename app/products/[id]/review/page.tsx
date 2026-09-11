"use client";

import React, { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import confetti from "canvas-confetti";
import { useLanguage } from "@/components/providers/LanguageContext";
import { ProductRepository } from "@/lib/db/repository";
import { Product, HeritageClaim, PricingBreakdown, AIUnderstanding, Dimensions, CraftComplexity } from "@/lib/db/schema";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
  ProvenanceBadge,
  ProductStatusBadge,
  GICandidacyBadge,
} from "@/components/ui/Badge";
import {
  Sparkles,
  CheckCircle2,
  Save,
  Award,
  ShieldCheck,
  MapPin,
  Tag,
  IndianRupee,
  Layers,
  AlertCircle,
  ExternalLink,
  Eye,
  Info,
  Sliders,
  FileJson,
  Download,
  Ruler,
  Check,
} from "lucide-react";

export default function ReviewProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { t, language } = useLanguage();
  const router = useRouter();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [approving, setApproving] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [regenerating, setRegenerating] = useState(false);

  // Editable Form Fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [craftName, setCraftName] = useState("");
  const [category, setCategory] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [materials, setMaterials] = useState<string[]>([]);
  const [newMaterial, setNewMaterial] = useState("");
  const [dimensions, setDimensions] = useState<Dimensions>({ length: 18, width: 10, height: 16, unit: "cm" });
  const [minPrice, setMinPrice] = useState(3500);
  const [maxPrice, setMaxPrice] = useState(4500);
  const [artisanStory, setArtisanStory] = useState("");
  const [technique, setTechnique] = useState("");
  const [significance, setSignificance] = useState("");
  const [claims, setClaims] = useState<HeritageClaim[]>([]);
  const [pricingBreakdown, setPricingBreakdown] = useState<PricingBreakdown | undefined>(undefined);
  const [aiUnderstanding, setAiUnderstanding] = useState<AIUnderstanding | undefined>(undefined);

  // Configurable Pricing Baseline Inputs
  const [materialCostInput, setMaterialCostInput] = useState<number>(850);
  const [laborHoursInput, setLaborHoursInput] = useState<number>(22);
  const [hourlyBenchmarkInput, setHourlyBenchmarkInput] = useState<number>(140);
  const [craftComplexityInput, setCraftComplexityInput] = useState<CraftComplexity>("High");

  useEffect(() => {
    const loaded = ProductRepository.getProductById(id);
    if (loaded) {
      setProduct(loaded);
      setTitle(language === "hi" && loaded.title_hi ? loaded.title_hi : loaded.title);
      setDescription(language === "hi" && loaded.description_hi ? loaded.description_hi : loaded.description);
      setCraftName(loaded.craft_name);
      setCategory(loaded.category);
      setState(loaded.state);
      setDistrict(loaded.district);
      setMaterials(loaded.materials || []);
      if (loaded.dimensions) setDimensions(loaded.dimensions);
      setMinPrice(loaded.suggested_min_price);
      setMaxPrice(loaded.suggested_max_price);
      setArtisanStory(loaded.artisan_story || "");

      const record = loaded.heritage_record || loaded.heritage_profile;
      setTechnique(record?.traditional_technique || "");
      setSignificance(record?.cultural_story || (record as any)?.cultural_significance || "");
      setClaims(record?.claims || []);

      if (loaded.pricing_breakdown) {
        setPricingBreakdown(loaded.pricing_breakdown);
        setMaterialCostInput(loaded.pricing_breakdown.material_cost ?? (loaded.pricing_breakdown as any).raw_materials_cost ?? 850);
        setLaborHoursInput(loaded.pricing_breakdown.labor_hours ?? (loaded.pricing_breakdown as any).artisan_labor_hours ?? 22);
        setHourlyBenchmarkInput(loaded.pricing_breakdown.hourly_benchmark ?? (loaded.pricing_breakdown as any).hourly_living_wage ?? 140);
        setCraftComplexityInput(loaded.pricing_breakdown.craft_complexity || "High");
      }
      setAiUnderstanding(loaded.ai_understanding);
    }
    setLoading(false);
  }, [id, language]);

  // Recalculate Fair Price Baseline when inputs change
  const handleRecalculatePricing = (
    matCost: number,
    hrs: number,
    bench: number,
    comp: CraftComplexity
  ) => {
    const laborSubtotal = Math.round(hrs * bench);
    const newMin = Math.round(matCost + laborSubtotal);
    const newMax = Math.round(newMin * 1.28);
    setMinPrice(newMin);
    setMaxPrice(newMax);

    const updatedBreakdown: PricingBreakdown = {
      material_cost: matCost,
      labor_hours: hrs,
      craft_complexity: comp,
      hourly_benchmark: bench,
      fair_wage_subtotal: laborSubtotal,
      suggested_min_price: newMin,
      suggested_max_price: newMax,
      ondc_export_markup_suggestion: Math.round(newMax * 1.2),
      benchmark_source: `${district} Regional Craft Guild Standard`,
      rationale: `Material Cost ₹${matCost} + Labour (${hrs} hrs @ ₹${bench}/hr benchmark = ₹${laborSubtotal}) with ${comp} complexity. Suggested range ₹${newMin.toLocaleString()} – ₹${newMax.toLocaleString()}. Final price is decided by the artisan.`,
    };
    setPricingBreakdown(updatedBreakdown);
  };

  const handleAddMaterial = () => {
    if (newMaterial.trim() && !materials.includes(newMaterial.trim())) {
      setMaterials([...materials, newMaterial.trim()]);
      setNewMaterial("");
    }
  };

  const handleRemoveMaterial = (item: string) => {
    setMaterials(materials.filter((m) => m !== item));
  };

  // Toggle Claim Verification Status: Artisan clicks to verify claim
  const handleToggleClaimStatus = (claimId: string | undefined) => {
    if (!claimId) return;
    setClaims((prev) =>
      prev.map((c) => {
        if (c.id === claimId) {
          const nextStatus = c.verification_status === "verified" ? "requires_verification" : "verified";
          const nextLabel = nextStatus === "verified" ? "Verified Source" : "Requires Verification";
          return { ...c, verification_status: nextStatus, provenance_label: nextLabel };
        }
        return c;
      })
    );
  };

  // Save Draft (Artisan Edited)
  const handleSaveDraft = () => {
    if (!product) return;
    setSaving(true);
    const updated: Product = {
      ...product,
      title,
      description,
      craft_name: craftName,
      category,
      state,
      district,
      materials,
      dimensions,
      suggested_min_price: minPrice,
      suggested_max_price: maxPrice,
      artisan_story: artisanStory,
      pricing_breakdown: pricingBreakdown,
      ai_understanding: aiUnderstanding,
      heritage_record: product.heritage_record
        ? {
            ...product.heritage_record,
            craft_name: craftName,
            traditional_technique: technique,
            cultural_story: significance,
            claims,
          }
        : undefined,
      heritage_profile: product.heritage_record
        ? {
            ...product.heritage_record,
            craft_name: craftName,
            traditional_technique: technique,
            cultural_story: significance,
            claims,
          }
        : undefined,
      status: "artisan_edited",
      updated_at: new Date().toISOString(),
    };

    ProductRepository.saveProduct(updated);
    setProduct(updated);
    setTimeout(() => {
      setSaving(false);
      alert("Draft saved in artisan workspace with status [Artisan Edited]!");
    }, 400);
  };

  // Approve & Save to Catalogue
  const handleApproveAndPublish = () => {
    if (!product) return;
    setApproving(true);

    const updated: Product = {
      ...product,
      title,
      description,
      craft_name: craftName,
      category,
      state,
      district,
      materials,
      dimensions,
      suggested_min_price: minPrice,
      suggested_max_price: maxPrice,
      final_price: Math.round((minPrice + maxPrice) / 2),
      artisan_story: artisanStory,
      pricing_breakdown: pricingBreakdown,
      ai_understanding: aiUnderstanding,
      heritage_record: product.heritage_record
        ? {
            ...product.heritage_record,
            craft_name: craftName,
            traditional_technique: technique,
            cultural_story: significance,
            claims,
          }
        : undefined,
      heritage_profile: product.heritage_record
        ? {
            ...product.heritage_record,
            craft_name: craftName,
            traditional_technique: technique,
            cultural_story: significance,
            claims,
          }
        : undefined,
      status: "approved",
      updated_at: new Date().toISOString(),
    };

    ProductRepository.saveProduct(updated);
    ProductRepository.publishProduct(product.id);

    try {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#C2410C", "#D97706", "#15803D", "#1E3A5F"],
      });
    } catch (e) {}

    setTimeout(() => {
      setApproving(false);
      setShowSuccessModal(true);
    }, 400);
  };

  // Download ONDC / Marketplace JSON Packet
  const handleDownloadOndcPacket = () => {
    if (!product) return;
    const packet = {
      platform: "KarigarSetu - SIH26090",
      specification: "ONDC-Beckn-Compliant Catalog Record",
      generated_at: new Date().toISOString(),
      ondc_catalog_item: {
        id: product.id,
        descriptor: {
          name: title,
          symbol: product.featured_image_url,
          short_desc: description.slice(0, 150),
          long_desc: description,
          images: [product.featured_image_url],
        },
        price: {
          currency: "INR",
          value: product.final_price || Math.round((minPrice + maxPrice) / 2),
          suggested_range: { min: minPrice, max: maxPrice },
        },
        category_id: category,
        tags: [
          { code: "craft_name", value: craftName },
          { code: "origin_district", value: district },
          { code: "origin_state", value: state },
          { code: "gi_status", value: product.gi_status },
          { code: "materials", value: materials.join(", ") },
        ],
      },
      heritage_passport: {
        craft_name: craftName,
        traditional_technique: technique,
        cultural_story: significance,
        artisan_story: artisanStory,
        verified_claims: claims.filter((c) => c.verification_status === "verified"),
      },
    };

    const blob = new Blob([JSON.stringify(packet, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ondc-packet-${product.id}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center p-12">
        <div className="w-10 h-10 border-4 border-orange-200 border-t-[#C2410C] rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex-1 max-w-xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-2xl font-bold text-stone-900">Product Not Found</h2>
        <Link href="/dashboard">
          <Button variant="outline">Return to Artisan Studio</Button>
        </Link>
      </div>
    );
  }

  const rawKeywords = aiUnderstanding?.speech_keywords || [];
  const rawFeatures = aiUnderstanding?.visual_features || (aiUnderstanding as any)?.detected_visual_features || [];

  return (
    <div className="flex-1 bg-[#FAF7F2] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Workflow Status & Approval Notice Banner */}
        <div className="bg-[#FFF7ED] border-2 border-orange-200 rounded-3xl p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-[#C2410C] text-white flex items-center justify-center font-bold shadow-xs">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold font-serif text-stone-900">
                  Step 8: Artisan Review & Explicit Approval
                </h1>
                <p className="text-xs text-stone-600">
                  <strong>Approval Rule:</strong> Artisan approval required before publication. Verify AI-generated claims and edit fields below.
                </p>
              </div>
            </div>

            {/* Lifecycle Pill */}
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <ProductStatusBadge status={product.status} />
              <ProvenanceBadge label="Requires Verification" size="sm" />
            </div>
          </div>

          {/* 5-State Lifecycle Stepper */}
          <div className="flex items-center gap-2 text-xs font-semibold overflow-x-auto pt-2 border-t border-orange-200/80">
            <span className="text-stone-400">1. Draft</span>
            <span className="text-stone-300">→</span>
            <span className="text-stone-400">2. AI Generated</span>
            <span className="text-stone-300">→</span>
            <span className="bg-[#C2410C] text-white px-2.5 py-1 rounded-md font-bold">
              3. Artisan Review (Current)
            </span>
            <span className="text-stone-300">→</span>
            <span className="text-stone-500">4. Approved</span>
            <span className="text-stone-300">→</span>
            <span className="text-stone-500">5. Published to Catalogue & Vault</span>
          </div>
        </div>

        {/* What the AI Understood Inspection Panel */}
        {aiUnderstanding && (
          <Card className="bg-white border-2 border-indigo-100 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-indigo-50 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                  <Eye className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-stone-900 font-serif">
                    Multimodal AI Understanding Breakdown
                  </h3>
                  <p className="text-xs text-stone-500">
                    Transparent inspection of acoustic voice terms and visual features recognized from your input
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                  Confidence: {Math.round(aiUnderstanding.confidence_score * 100)}%
                </span>
                <span className="text-xs font-semibold text-stone-600 bg-stone-100 px-2.5 py-1 rounded-md">
                  Language: {aiUnderstanding.language_detected || (aiUnderstanding as any).voice_language_detected || "Hindi"}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              {/* Box 1: Spoken Keywords */}
              <div className="p-3 rounded-xl bg-[#FAF7F2] border border-stone-200 space-y-2">
                <span className="font-bold text-[#C2410C] block uppercase tracking-wider">
                  🎙️ Spoken Terms Extracted:
                </span>
                <div className="flex flex-wrap gap-1">
                  {rawKeywords.map((kw: string, i: number) => (
                    <span key={i} className="px-2 py-0.5 bg-white rounded border border-stone-200 text-stone-800">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>

              {/* Box 2: Visual Features */}
              <div className="p-3 rounded-xl bg-[#FAF7F2] border border-stone-200 space-y-2">
                <span className="font-bold text-indigo-700 block uppercase tracking-wider">
                  👁️ Visual Morphology Recognized:
                </span>
                <div className="flex flex-wrap gap-1">
                  {rawFeatures.map((feat: string, i: number) => (
                    <span key={i} className="px-2 py-0.5 bg-white rounded border border-stone-200 text-stone-800">
                      {feat}
                    </span>
                  ))}
                </div>
              </div>

              {/* Box 3: Candidate Cluster & GI Note */}
              <div className="p-3 rounded-xl bg-[#FAF7F2] border border-stone-200 space-y-2">
                <span className="font-bold text-amber-900 block uppercase tracking-wider">
                  📍 Inferred Craft Cluster:
                </span>
                <div className="font-semibold text-stone-900">
                  {aiUnderstanding.craft_name} — {aiUnderstanding.region}
                </div>
                <p className="text-[11px] text-stone-600 italic">
                  {aiUnderstanding.gi_candidacy_note}
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Two-Column Workspace Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Product Photo & Configurable Fair-Price Baseline (Lg: 5 cols) */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            <Card padded={false} className="overflow-hidden border border-[#E7E0D3]">
              <div className="relative h-80 sm:h-96 w-full bg-stone-100">
                <Image
                  src={product.featured_image_url}
                  alt={title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  priority
                />
                <div className="absolute top-4 left-4">
                  <GICandidacyBadge
                    status={product.gi_status || product.gi_candidacy_status}
                    demoReference={product.gi_demo_reference}
                  />
                </div>
                <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-xs text-white text-xs px-3 py-1 rounded-md font-medium">
                  {district}, {state}
                </div>
              </div>

              {/* Provenance Badge Legend */}
              <div className="p-5 bg-white space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#C2410C]" />
                    <span>Provenance & Truth Labels</span>
                  </span>
                  <span className="text-[11px] text-stone-500 font-normal">SIH26090 Standards</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <ProvenanceBadge label="Artisan Provided" size="sm" />
                  <ProvenanceBadge label="AI Generated" size="sm" />
                  <ProvenanceBadge label="Verified Source" size="sm" />
                  <ProvenanceBadge label="Requires Verification" size="sm" />
                </div>
                <p className="text-[11px] text-stone-500 leading-relaxed pt-2 border-t border-stone-100">
                  Every claim is explicitly marked with its originating source to eliminate fabricated cultural assertions.
                </p>
              </div>
            </Card>

            {/* Configurable AI-Assisted Fair Price Baseline Card */}
            <Card className="bg-white border-2 border-amber-200 space-y-4">
              <div className="flex items-center justify-between border-b border-amber-100 pb-2">
                <div className="flex items-center gap-2">
                  <IndianRupee className="w-5 h-5 text-[#C2410C]" />
                  <div>
                    <h3 className="text-sm font-bold text-stone-900 font-serif">
                      AI-Assisted Fair-Price Baseline
                    </h3>
                    <p className="text-[11px] text-stone-500">
                      Configurable inputs based on regional artisan living wage benchmarks
                    </p>
                  </div>
                </div>
                <ProvenanceBadge label="AI Suggested" size="sm" />
              </div>

              {/* Configurable Interactive Inputs */}
              <div className="bg-[#FAF7F2] p-3.5 rounded-xl border border-stone-200 space-y-3 text-xs">
                <div className="flex items-center justify-between text-stone-700 font-bold uppercase text-[11px]">
                  <span className="flex items-center gap-1">
                    <Sliders className="w-3.5 h-3.5 text-[#C2410C]" /> Configurable Cost Parameters
                  </span>
                  <span className="text-stone-400 font-normal">Live Dynamic Math</span>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="text-[11px] text-stone-500 block mb-0.5">Material Cost (₹):</label>
                    <input
                      type="number"
                      value={materialCostInput}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setMaterialCostInput(val);
                        handleRecalculatePricing(val, laborHoursInput, hourlyBenchmarkInput, craftComplexityInput);
                      }}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-stone-300 font-semibold bg-white text-stone-900"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-stone-500 block mb-0.5">Estimated Labour (Hrs):</label>
                    <input
                      type="number"
                      value={laborHoursInput}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setLaborHoursInput(val);
                        handleRecalculatePricing(materialCostInput, val, hourlyBenchmarkInput, craftComplexityInput);
                      }}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-stone-300 font-semibold bg-white text-stone-900"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-stone-500 block mb-0.5">Hourly Benchmark (₹/hr):</label>
                    <input
                      type="number"
                      value={hourlyBenchmarkInput}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setHourlyBenchmarkInput(val);
                        handleRecalculatePricing(materialCostInput, laborHoursInput, val, craftComplexityInput);
                      }}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-stone-300 font-semibold bg-white text-stone-900"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-stone-500 block mb-0.5">Craft Complexity:</label>
                    <select
                      value={craftComplexityInput}
                      onChange={(e) => {
                        const val = e.target.value as CraftComplexity;
                        setCraftComplexityInput(val);
                        handleRecalculatePricing(materialCostInput, laborHoursInput, hourlyBenchmarkInput, val);
                      }}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-stone-300 font-semibold bg-white text-stone-900"
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                      <option value="Master">Master</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Price Calculation Output Box */}
              <div className="space-y-2 text-xs">
                <div className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-200 space-y-1.5">
                  <div className="flex justify-between items-center text-emerald-950 font-medium">
                    <span>Estimated Labour Subtotal:</span>
                    <span className="font-bold text-emerald-800 text-sm">
                      ₹{(laborHoursInput * hourlyBenchmarkInput).toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-stone-900 font-bold pt-1 border-t border-emerald-200">
                    <span>Suggested Fair Price Range:</span>
                    <span className="text-[#C2410C] text-sm">
                      ₹{minPrice.toLocaleString("en-IN")} – ₹{maxPrice.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                <div className="p-2.5 bg-stone-50 rounded-lg border border-stone-200 text-[11px] text-stone-600 leading-relaxed space-y-1">
                  <div>
                    <strong>Pricing Policy:</strong> Benchmark is configurable by craft and region. Final price is always decided by the artisan.
                  </div>
                  <div className="text-stone-500 italic">
                    Note: Distinguishes estimated baseline price from actual sales revenue in the catalogue.
                  </div>
                </div>
              </div>

              {/* Price Range Slider / Inputs */}
              <div className="pt-2 border-t border-stone-100 space-y-2">
                <span className="text-xs font-bold uppercase text-stone-700 block">
                  Artisan Approved Price Range (INR ₹):
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-[11px] text-stone-500 block">Min Price (₹)</span>
                    <input
                      type="number"
                      value={minPrice}
                      onChange={(e) => setMinPrice(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 font-bold text-sm text-stone-900"
                    />
                  </div>
                  <div>
                    <span className="text-[11px] text-stone-500 block">Max Price (₹)</span>
                    <input
                      type="number"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 font-bold text-sm text-stone-900"
                    />
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column: Editable Commercial Listing & Digital Heritage Profile (Lg: 7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Section 1: Commercial Listing Data */}
            <Card className="space-y-5 border border-[#E7E0D3]">
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <h2 className="text-lg font-bold font-serif text-stone-900 flex items-center gap-2">
                  <Tag className="w-4 h-4 text-[#C2410C]" />
                  <span>Marketplace Listing Specification</span>
                </h2>
                <ProvenanceBadge label="AI Generated" size="sm" />
              </div>

              {/* Title Input */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-700">
                    {t.fieldTitle}
                  </label>
                  <span className="text-[11px] text-stone-400">Editable</span>
                </div>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-stone-300 font-medium text-stone-900 focus:ring-2 focus:ring-[#C2410C] text-base"
                />
              </div>

              {/* Description Input */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-700">
                    {t.fieldDescription}
                  </label>
                  <span className="text-[11px] text-stone-400">Rich Narrative</span>
                </div>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-4 rounded-xl border border-stone-300 text-stone-800 text-sm leading-relaxed focus:ring-2 focus:ring-[#C2410C]"
                />
              </div>

              {/* Grid: Craft Name & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                    {t.fieldCraft}
                  </label>
                  <input
                    type="text"
                    value={craftName}
                    onChange={(e) => setCraftName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                    {t.fieldCategory}
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm font-medium bg-white"
                  >
                    <option value="metalwork">Bell Metal & Brassware</option>
                    <option value="pottery">Pottery & Ceramics</option>
                    <option value="paintings">Folk & Tribal Paintings</option>
                    <option value="textiles">Handloom & Textiles</option>
                    <option value="woodwork">Woodcraft & Lacquerware</option>
                    <option value="jewellery">Traditional Jewellery</option>
                  </select>
                </div>
              </div>

              {/* Grid: State & District */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                    District
                  </label>
                  <input
                    type="text"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm font-medium"
                  />
                </div>
              </div>

              {/* Dimensions Input Row */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-stone-700">
                  <Ruler className="w-3.5 h-3.5 text-[#C2410C]" />
                  <span>Product Dimensions</span>
                </div>
                <div className="grid grid-cols-4 gap-2 text-xs">
                  <div>
                    <span className="text-[11px] text-stone-500 block mb-0.5">Length:</span>
                    <input
                      type="number"
                      value={dimensions.length || 18}
                      onChange={(e) => setDimensions({ ...dimensions, length: Number(e.target.value) })}
                      className="w-full p-2 border border-stone-300 rounded-lg text-stone-900"
                    />
                  </div>
                  <div>
                    <span className="text-[11px] text-stone-500 block mb-0.5">Width:</span>
                    <input
                      type="number"
                      value={dimensions.width || 10}
                      onChange={(e) => setDimensions({ ...dimensions, width: Number(e.target.value) })}
                      className="w-full p-2 border border-stone-300 rounded-lg text-stone-900"
                    />
                  </div>
                  <div>
                    <span className="text-[11px] text-stone-500 block mb-0.5">Height:</span>
                    <input
                      type="number"
                      value={dimensions.height || 16}
                      onChange={(e) => setDimensions({ ...dimensions, height: Number(e.target.value) })}
                      className="w-full p-2 border border-stone-300 rounded-lg text-stone-900"
                    />
                  </div>
                  <div>
                    <span className="text-[11px] text-stone-500 block mb-0.5">Unit:</span>
                    <select
                      value={dimensions.unit}
                      onChange={(e) => setDimensions({ ...dimensions, unit: e.target.value as "cm" | "inches" })}
                      className="w-full p-2 border border-stone-300 rounded-lg bg-white text-stone-900"
                    >
                      <option value="cm">cm</option>
                      <option value="inches">inches</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Materials Tags */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-700">
                    {t.fieldMaterials}
                  </label>
                  <ProvenanceBadge label="Artisan Provided" size="sm" />
                </div>
                <div className="flex flex-wrap gap-2">
                  {materials.map((mat, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-stone-100 text-stone-800 border border-stone-200"
                    >
                      <span>{mat}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveMaterial(mat)}
                        className="hover:text-red-600 font-bold ml-1 cursor-pointer"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2 pt-1">
                  <input
                    type="text"
                    value={newMaterial}
                    onChange={(e) => setNewMaterial(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddMaterial())}
                    placeholder="Add raw material..."
                    className="flex-1 px-3 py-2 text-xs rounded-xl border border-stone-300"
                  />
                  <Button size="sm" variant="outline" onClick={handleAddMaterial}>
                    Add
                  </Button>
                </div>
              </div>
            </Card>

            {/* Section 2: Digital Heritage Profile & Claims */}
            <Card className="space-y-5 border border-[#E7E0D3]">
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <h2 className="text-lg font-bold font-serif text-stone-900 flex items-center gap-2">
                  <Award className="w-5 h-5 text-emerald-700" />
                  <span>Digital Heritage Profile (Vault Record)</span>
                </h2>
                <span className="text-xs text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full font-bold border border-emerald-200">
                  Living Memory Preservation
                </span>
              </div>

              {/* Traditional Technique */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-700">
                    {t.fieldTechnique}
                  </label>
                  <ProvenanceBadge label="Artisan Provided" size="sm" />
                </div>
                <textarea
                  rows={2}
                  value={technique}
                  onChange={(e) => setTechnique(e.target.value)}
                  className="w-full p-3 rounded-xl border border-stone-300 text-xs text-stone-800 leading-relaxed"
                />
              </div>

              {/* Cultural Significance */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-700">
                    {t.fieldSignificance}
                  </label>
                  <ProvenanceBadge label="AI Generated" size="sm" />
                </div>
                <textarea
                  rows={2}
                  value={significance}
                  onChange={(e) => setSignificance(e.target.value)}
                  className="w-full p-3 rounded-xl border border-stone-300 text-xs text-stone-800 leading-relaxed"
                />
              </div>

              {/* Artisan Legacy & Story */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-700">
                    {t.fieldArtisanStory}
                  </label>
                  <ProvenanceBadge label="Artisan Provided" size="sm" />
                </div>
                <textarea
                  rows={2}
                  value={artisanStory}
                  onChange={(e) => setArtisanStory(e.target.value)}
                  className="w-full p-3 rounded-xl border border-stone-300 text-xs text-stone-800 leading-relaxed"
                />
              </div>

              {/* Heritage Claims Verification Matrix */}
              <div className="space-y-3 pt-3 border-t border-stone-100">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-[#C2410C]" />
                      <span>{t.provenanceTitle}</span>
                    </span>
                    <p className="text-[11px] text-stone-500 mt-0.5">
                      Review each claim below before approval. Click to verify or flag claims.
                    </p>
                  </div>
                  <span className="text-[11px] font-bold text-stone-600 bg-stone-100 px-2 py-0.5 rounded">
                    {claims.length} Claims
                  </span>
                </div>

                <div className="space-y-2.5">
                  {claims.map((claim) => (
                    <div
                      key={claim.id}
                      className="p-3.5 rounded-xl border border-stone-200 bg-stone-50/70 hover:bg-white transition flex items-start justify-between gap-3"
                    >
                      <div className="space-y-1.5 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <ProvenanceBadge label={claim.provenance_label || "Requires Verification"} size="sm" />
                        </div>
                        <p className="text-xs text-stone-800 font-medium leading-normal">
                          {claim.claim_text}
                        </p>
                        {claim.source_reference && (
                          <div className="text-[11px] text-stone-500 italic">
                            Verification Trail: {claim.source_reference}
                          </div>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => handleToggleClaimStatus(claim.id)}
                        className={`text-xs px-3 py-1.5 rounded-lg font-bold transition cursor-pointer shrink-0 shadow-2xs ${
                          claim.verification_status === "verified"
                            ? "bg-stone-200 hover:bg-stone-300 text-stone-700"
                            : "bg-emerald-600 hover:bg-emerald-700 text-white"
                        }`}
                      >
                        {claim.verification_status === "verified" ? "Unverify" : "Verify Claim"}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Bottom Actions Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-stone-200">
              <Button
                variant="outline"
                size="md"
                onClick={handleDownloadOndcPacket}
                leftIcon={<FileJson className="w-4 h-4 text-indigo-700" />}
                className="w-full sm:w-auto"
              >
                Download ONDC Listing Packet
              </Button>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Button
                  variant="outline"
                  onClick={handleSaveDraft}
                  isLoading={saving}
                  leftIcon={<Save className="w-4 h-4" />}
                  className="flex-1 sm:flex-initial"
                >
                  Save Draft
                </Button>

                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleApproveAndPublish}
                  isLoading={approving}
                  leftIcon={<CheckCircle2 className="w-5 h-5" />}
                  className="flex-1 sm:flex-initial font-bold shadow-md hover:shadow-lg"
                >
                  Approve & Save to Catalogue
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Success Modal */}
        {showSuccessModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-stone-200 text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto text-emerald-700">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-bold font-serif text-stone-900">
                  Artisan Approved & Published!
                </h3>
                <p className="text-sm text-stone-600">
                  Your handcrafted creation is now registered in the <strong>National Living Heritage Vault</strong> with verified provenance and ready for ONDC / GeM export.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <Link
                  href={`/heritage/${product.id}`}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#C2410C] hover:bg-[#9A3412] text-white font-bold text-sm transition"
                >
                  <Award className="w-4 h-4 text-amber-300" />
                  <span>Inspect Digital Heritage Passport</span>
                </Link>

                <Link
                  href="/catalogue"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl border border-stone-300 hover:bg-stone-50 text-stone-700 font-semibold text-xs transition"
                >
                  <span>View in Market Listings</span>
                </Link>

                <button
                  type="button"
                  onClick={handleDownloadOndcPacket}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#1E3A5F] hover:bg-[#162A45] text-white font-bold text-xs shadow-sm transition cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download ONDC Marketplace Packet</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
