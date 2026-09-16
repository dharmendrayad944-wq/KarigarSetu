"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Mic,
  Camera,
  Sparkles,
  CheckCircle2,
  RefreshCw,
  Eye,
  ShieldCheck,
  TrendingUp,
  ArrowRight,
  RotateCcw,
  Volume2,
  Award,
  BookOpen,
  Edit3,
  Check,
  Package,
} from "lucide-react";
import { ProvenanceBadge, GICandidacyBadge } from "@/components/ui/Badge";
import { ImageFallback } from "@/components/ui/ImageFallback";

const DEMO_STEPS = [
  "1. Photo",
  "2. Voice",
  "3. AI Process",
  "4. Understood",
  "5. Price Discovery",
  "6. Passport",
  "7. Approval",
  "8. Catalogue",
];

const CHECKLIST = [
  "✓ High-resolution image received & visual geometry scanned",
  "✓ Spoken Hindi voice recording transcribed",
  "✓ Regional craft vocabulary & dialect identified",
  "✓ Cire-Perdue (lost-wax) technique & brass scrap alloy mapped",
  "✓ Approved market data feeds queried (Amazon, Flipkart, ONDC)",
  "✓ Heritage Passport & Market Price Discovery prepared",
];

export const InteractiveDemo: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [isEditingTranscript, setIsEditingTranscript] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>(
    "यह बस्तर का पारंपरिक ढोकरा शिल्प है, जिसे घंटी धातु और मधुमक्खी के मोम की लॉस्ट-वैक्स तकनीक से हाथ से ढाला गया है। यह नंदी बैल की पवित्र प्रतिमा है।"
  );
  const [artisanPrice, setArtisanPrice] = useState<number>(3900);
  const [isApproved, setIsApproved] = useState<boolean>(false);

  const handleSimulateProcessing = () => {
    setActiveStep(3);
    setTimeout(() => {
      setActiveStep(4);
    }, 1500);
  };

  const handleResetDemo = () => {
    setActiveStep(1);
    setIsApproved(false);
    setIsPlayingAudio(false);
    setIsEditingTranscript(false);
    setArtisanPrice(3900);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 craft-border-subtle shadow-md space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-[#9A3412] text-xs font-bold mb-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#C2410C]" />
            <span>Interactive 90-Second SIH Simulation</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold font-serif text-stone-900">
            Live AI Onboarding Demonstration
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Experience the complete 8-step flow from indigenous artisan voice to verified Heritage Passport and Catalogue.
          </p>
        </div>

        <button
          onClick={handleResetDemo}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-stone-300 text-stone-600 hover:text-stone-900 hover:bg-stone-50 text-xs font-semibold cursor-pointer transition self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Demo Flow</span>
        </button>
      </div>

      {/* 8-Step Process Stepper */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
        {DEMO_STEPS.map((name, i) => {
          const stepNum = i + 1;
          const isDone = activeStep > stepNum || (activeStep === 8 && isApproved);
          const isCurrent = activeStep === stepNum && !isApproved;

          return (
            <button
              key={i}
              type="button"
              onClick={() => setActiveStep(stepNum)}
              className={`p-2 rounded-xl text-left border text-xs transition cursor-pointer ${
                isCurrent
                  ? "border-[#C2410C] bg-[#FFF7ED] font-bold text-[#9A3412] shadow-2xs"
                  : isDone
                  ? "border-emerald-200 bg-emerald-50 text-emerald-900 font-semibold"
                  : "border-stone-200 bg-[#FAF7F2] text-stone-500"
              }`}
            >
              <div className="flex items-center gap-1 mb-0.5">
                {isDone ? (
                  <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                ) : (
                  <span
                    className={`w-3.5 h-3.5 rounded-full text-[9px] flex items-center justify-center font-bold shrink-0 ${
                      isCurrent ? "bg-[#C2410C] text-white" : "bg-stone-300 text-stone-700"
                    }`}
                  >
                    {stepNum}
                  </span>
                )}
                <span className="text-[9px] uppercase tracking-wider font-bold">Step {stepNum}</span>
              </div>
              <div className="truncate text-[11px]">{name.split(". ")[1]}</div>
            </button>
          );
        })}
      </div>

      {/* Step Contents */}
      <div className="bg-[#FAF7F2] rounded-2xl p-6 sm:p-8 border border-stone-200 min-h-[380px] flex flex-col justify-between">
        {/* STEP 1: Artisan Photo */}
        {activeStep === 1 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-5 relative h-56 w-full rounded-2xl overflow-hidden shadow-xs">
                <ImageFallback
                  src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80"
                  alt="Bastar Dhokra Nandi Bull"
                  craft="Bastar Dhokra"
                  region="Bastar, Chhattisgarh"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-2.5 left-2.5">
                  <ProvenanceBadge label="Artisan Provided" size="sm" />
                </div>
                <div className="absolute bottom-2.5 right-2.5 bg-black/80 backdrop-blur-xs text-white text-[11px] px-2.5 py-1 rounded-md">
                  Kondagaon, Bastar
                </div>
              </div>

              <div className="md:col-span-7 space-y-4">
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase text-[#C2410C]">Step 1: Product Photography</span>
                  <h4 className="text-xl font-bold font-serif text-stone-900">
                    Capture Smartphone Craft Photo
                  </h4>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Artisan Shanti Devi photographs her freshly cast bell metal Nandi bull using a basic smartphone camera.
                    No professional studio or lightbox required.
                  </p>
                </div>

                <div className="p-3 bg-white rounded-xl border border-stone-200 text-xs space-y-1">
                  <div className="font-semibold text-stone-800">Visual Quality Inspection:</div>
                  <div className="text-emerald-700 font-medium flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" /> High-contrast natural lighting detected
                  </div>
                  <div className="text-emerald-700 font-medium flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Distinct metallic filigree patterns visible
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveStep(2)}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#C2410C] hover:bg-[#9A3412] text-white text-xs font-bold shadow-md cursor-pointer transition"
                  >
                    <span>Proceed to Step 2: Record Voice</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Artisan Voice */}
        {activeStep === 2 && (
          <div className="space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase text-[#C2410C]">Step 2: Spoken Voice Description</span>
              <h4 className="text-xl font-bold font-serif text-stone-900">
                Natural Mother-Tongue Narration
              </h4>
              <p className="text-xs text-stone-600">
                Artisans speak naturally in Hindi, avoiding complex English e-commerce forms.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-stone-200 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-orange-100 text-[#C2410C] flex items-center justify-center">
                    <Mic className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-stone-900">Spoken Audio: Hindi (Central Bastar dialect)</span>
                </div>
                <button
                  onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                  className="text-xs text-[#C2410C] font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  {isPlayingAudio ? "Pause Audio" : "Play Sample Voice"}
                </button>
              </div>

              {/* Transcript box with inline edit */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-stone-500">
                  <span className="font-semibold text-stone-700">Acoustic Transcript:</span>
                  <button
                    onClick={() => setIsEditingTranscript(!isEditingTranscript)}
                    className="text-[#C2410C] font-medium flex items-center gap-1 hover:underline cursor-pointer"
                  >
                    <Edit3 className="w-3 h-3" />
                    {isEditingTranscript ? "Close Editor" : "Edit Transcript"}
                  </button>
                </div>

                {isEditingTranscript ? (
                  <div className="space-y-2">
                    <textarea
                      rows={3}
                      value={transcript}
                      onChange={(e) => setTranscript(e.target.value)}
                      className="w-full p-3 text-xs border border-orange-300 rounded-xl focus:ring-1 focus:ring-[#C2410C] text-stone-800"
                    />
                    <div className="flex justify-end">
                      <button
                        onClick={() => setIsEditingTranscript(false)}
                        className="px-3 py-1.5 bg-[#C2410C] text-white rounded-lg text-xs font-semibold hover:bg-[#9A3412] flex items-center gap-1 cursor-pointer"
                      >
                        <Check className="w-3 h-3" /> Save Changes
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs sm:text-sm text-stone-800 italic bg-[#FAF7F2] p-3 rounded-xl border border-stone-200">
                    &ldquo;{transcript}&rdquo;
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={handleSimulateProcessing}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#C2410C] hover:bg-[#9A3412] text-white text-xs font-bold shadow-md cursor-pointer transition"
              >
                <Sparkles className="w-4 h-4" />
                <span>Trigger Multimodal AI Processing</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: AI Processing */}
        {activeStep === 3 && (
          <div className="space-y-6 max-w-xl mx-auto text-center py-6">
            <div className="w-16 h-16 rounded-full border-4 border-orange-200 border-t-[#C2410C] animate-spin mx-auto" />
            <div className="space-y-1">
              <h4 className="text-xl font-bold font-serif text-stone-900">
                Step 3: Multimodal AI Processing
              </h4>
              <p className="text-xs text-stone-500">
                Analyzing visual geometry, acoustic phonemes, and cross-referencing approved market feeds
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-stone-200 text-left space-y-2 text-xs">
              {CHECKLIST.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-emerald-700 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 4: What AI Understood */}
        {activeStep === 4 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <div className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-indigo-600" />
                <h4 className="text-lg font-bold font-serif text-stone-900">
                  Step 4: What AI Understood (Pre-Generation Inspection)
                </h4>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                Confidence: 96%
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-white rounded-xl border border-stone-200">
                <span className="text-stone-500 block text-[11px]">Craft:</span>
                <strong className="text-stone-900 text-sm">Bastar Dhokra</strong>
              </div>
              <div className="p-3 bg-white rounded-xl border border-stone-200">
                <span className="text-stone-500 block text-[11px]">Region:</span>
                <strong className="text-stone-900 text-sm">Bastar, Chhattisgarh</strong>
              </div>
              <div className="p-3 bg-white rounded-xl border border-stone-200">
                <span className="text-stone-500 block text-[11px]">Material:</span>
                <strong className="text-stone-900 text-sm">Bell metal / beeswax / clay</strong>
              </div>
              <div className="p-3 bg-white rounded-xl border border-stone-200">
                <span className="text-stone-500 block text-[11px]">Motif:</span>
                <strong className="text-stone-900 text-sm">Spiraled wax filigree / Nandi</strong>
              </div>
              <div className="p-3 bg-white rounded-xl border border-stone-200">
                <span className="text-stone-500 block text-[11px]">Language:</span>
                <strong className="text-stone-900 text-sm">Hindi (Central dialect)</strong>
              </div>
              <div className="p-3 bg-white rounded-xl border border-stone-200">
                <span className="text-stone-500 block text-[11px]">GI Craft Status:</span>
                <strong className="text-emerald-800 text-sm">GI-Registered Craft</strong>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-white rounded-xl border border-stone-200 space-y-1">
                <span className="text-stone-500 font-semibold block text-[11px]">Spoken Keywords Detected:</span>
                <div className="flex flex-wrap gap-1">
                  {["ढोकरा", "घंटी धातु", "मोम ढलाई", "बस्तर", "नंदी बैल"].map((kw, i) => (
                    <span key={i} className="px-2 py-0.5 bg-orange-50 text-[#C2410C] rounded font-medium">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-3 bg-white rounded-xl border border-stone-200 space-y-1">
                <span className="text-stone-500 font-semibold block text-[11px]">Visual Morphology Features:</span>
                <div className="flex flex-wrap gap-1">
                  {["Twisted wax filigree", "Hollow core bronze casting", "Bovine horned silhouette"].map((feat, i) => (
                    <span key={i} className="px-2 py-0.5 bg-stone-100 text-stone-800 rounded font-medium">
                      {feat}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setActiveStep(5)}
                className="px-6 py-2.5 rounded-xl bg-[#C2410C] hover:bg-[#9A3412] text-white text-xs font-bold shadow-xs cursor-pointer inline-flex items-center gap-1.5"
              >
                <span>Proceed to Step 5: Market Price Discovery</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: Market Price Analysis */}
        {activeStep === 5 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#C2410C]" />
                <h4 className="text-lg font-bold font-serif text-stone-900">
                  Step 5: Market Price Discovery (Approved Providers)
                </h4>
              </div>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full border border-emerald-300">
                Evidence: HIGH
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 bg-white rounded-xl border border-stone-200 space-y-2">
                <div className="font-bold text-stone-700">Amazon Marketplace</div>
                <div className="text-stone-600">Similar Bastar Dhokra Figurine</div>
                <div className="text-lg font-mono font-bold text-stone-900">₹3,799</div>
                <div className="text-[10px] text-emerald-700 font-semibold">92% comparability score</div>
              </div>

              <div className="p-4 bg-white rounded-xl border border-stone-200 space-y-2">
                <div className="font-bold text-stone-700">Flipkart Crafts</div>
                <div className="text-stone-600">Similar Bell Metal Figurine</div>
                <div className="text-lg font-mono font-bold text-stone-900">₹3,499</div>
                <div className="text-[10px] text-emerald-700 font-semibold">89% comparability score</div>
              </div>

              <div className="p-4 bg-white rounded-xl border border-stone-200 space-y-2">
                <div className="font-bold text-stone-700">ONDC / Tribes India</div>
                <div className="text-stone-600">Handmade Dhokra Craft</div>
                <div className="text-lg font-mono font-bold text-stone-900">₹4,100</div>
                <div className="text-[10px] text-emerald-700 font-semibold">95% comparability score</div>
              </div>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-stone-200 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-4 text-xs">
                <div>
                  <span className="text-stone-500 block text-[11px]">Observed Market Range:</span>
                  <span className="font-bold text-stone-800 font-mono text-sm">₹3,499 – ₹4,299</span>
                </div>
                <div>
                  <span className="text-stone-500 block text-[11px]">Market Median:</span>
                  <span className="font-bold text-stone-900 font-mono text-sm">₹3,775</span>
                </div>
                <div>
                  <span className="text-stone-500 block text-[11px]">Recommended Market Range:</span>
                  <span className="font-bold text-[#C2410C] font-mono text-sm">₹3,600 – ₹4,100</span>
                </div>
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div>
                  <span className="font-bold text-emerald-950 block">Your Final Price (Artisan Sovereign Decision):</span>
                  <span className="text-[11px] text-emerald-800">Final price is decided by the artisan. Never mandatory.</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-stone-700">₹</span>
                  <input
                    type="number"
                    value={artisanPrice}
                    onChange={(e) => setArtisanPrice(Number(e.target.value))}
                    className="w-24 p-1.5 rounded-lg border border-emerald-300 font-mono font-bold text-stone-900 text-sm bg-white"
                  />
                  <button
                    onClick={() => setArtisanPrice(3900)}
                    className="text-[11px] text-[#C2410C] font-semibold hover:underline"
                  >
                    Use Recommended
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setActiveStep(6)}
                className="px-6 py-2.5 rounded-xl bg-[#C2410C] hover:bg-[#9A3412] text-white text-xs font-bold shadow-xs cursor-pointer inline-flex items-center gap-1.5"
              >
                <span>Proceed to Step 6: Heritage Passport</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 6: Heritage Passport */}
        {activeStep === 6 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-indigo-700" />
                <h4 className="text-lg font-bold font-serif text-stone-900">
                  Step 6: Digital Heritage Passport Generated
                </h4>
              </div>
              <div className="flex gap-2">
                <ProvenanceBadge label="Verified Source" size="sm" />
                <ProvenanceBadge label="Artisan Provided" size="sm" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-white p-4 rounded-xl border border-stone-200 space-y-2">
                <div className="font-bold text-[#C2410C] uppercase tracking-wider text-[11px]">
                  Traditional Technique
                </div>
                <p className="text-stone-700 leading-relaxed">
                  Cire-Perdue (Lost-Wax) Indigenous Metallurgy: Single-pour brass bell metal alloy cast over termite clay core. Unbroken craft continuum with ancient Indus Valley civilizations.
                </p>
                <div className="text-[11px] text-stone-500 italic pt-1">
                  Source: Bastar Tribal Handicrafts Guild Archive
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-stone-200 space-y-2">
                <div className="font-bold text-emerald-800 uppercase tracking-wider text-[11px]">
                  Cultural Story & Symbolism
                </div>
                <p className="text-stone-700 leading-relaxed">
                  The Nandi bull represents agrarian fertility, strength, and tribal ritual protection. Handcrafted without mechanized lathe or standard molds.
                </p>
                <div className="text-[11px] text-stone-500 italic pt-1">
                  Provenance: Artisan Oral Lineage (5th Generation)
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setActiveStep(7)}
                className="px-6 py-2.5 rounded-xl bg-[#C2410C] hover:bg-[#9A3412] text-white text-xs font-bold shadow-xs cursor-pointer inline-flex items-center gap-1.5"
              >
                <span>Proceed to Step 7: Artisan Approval</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 7: Artisan Approval */}
        {activeStep === 7 && (
          <div className="space-y-6 text-center py-4">
            {!isApproved ? (
              <div className="max-w-md mx-auto space-y-4">
                <div className="w-14 h-14 rounded-full bg-amber-100 text-[#C2410C] flex items-center justify-center mx-auto">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-2xl font-bold font-serif text-stone-900">
                    Step 7: Artisan Review & Final Approval
                  </h4>
                  <p className="text-xs text-stone-600">
                    KarigarSetu never automatically publishes an AI listing. Explicit approval is required before saving or publishing.
                  </p>
                </div>

                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-950 text-left">
                  <strong>Approval Rule:</strong> &ldquo;I confirm that the materials, technique description, and final price of ₹{artisanPrice.toLocaleString("en-IN")} accurately represent my authentic handcrafted work.&rdquo;
                </div>

                <div className="flex justify-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveStep(5)}
                    className="px-4 py-2.5 rounded-xl border border-stone-300 text-stone-700 text-xs font-semibold hover:bg-stone-100 cursor-pointer"
                  >
                    Adjust Price
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsApproved(true);
                      setActiveStep(8);
                    }}
                    className="px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-md cursor-pointer inline-flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Approve & Publish to Catalogue</span>
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        )}

        {/* STEP 8: Published to Catalogue & Vault */}
        {activeStep === 8 && (
          <div className="space-y-6 text-center py-4">
            <div className="max-w-md mx-auto space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div className="space-y-1">
                <h4 className="text-2xl font-bold font-serif text-stone-900">
                  Step 8: Approved & Published!
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Bastar Dhokra Nandi Bull is now archived in the KarigarSetu Living Heritage Vault and live in Market Listings with your final price of ₹{artisanPrice.toLocaleString("en-IN")}.
                </p>
              </div>

              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-left text-xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-stone-500">Listed Title:</span>
                  <span className="font-bold text-stone-900">Bastar Dhokra Bell Metal Nandi Bull</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-500">Final Artisan Price:</span>
                  <span className="font-mono font-bold text-emerald-800">₹{artisanPrice.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-500">GI Status:</span>
                  <span className="font-medium text-stone-700">GI-Registered Craft (Verification Pending)</span>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-3 pt-3">
                <Link
                  href="/heritage/prod-dokra-01"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#1E3A5F] hover:bg-stone-900 text-white text-xs font-bold shadow-xs"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-300" />
                  <span>View Heritage Passport</span>
                </Link>

                <Link
                  href="/catalogue"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#C2410C] hover:bg-[#9A3412] text-white text-xs font-bold shadow-xs"
                >
                  <Package className="w-4 h-4" />
                  <span>View in Market Listings</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
