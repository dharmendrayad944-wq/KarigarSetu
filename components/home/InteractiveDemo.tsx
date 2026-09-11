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
  IndianRupee,
  Award,
  ArrowRight,
  RotateCcw,
  Volume2,
  TrendingUp,
} from "lucide-react";
import { ProvenanceBadge } from "@/components/ui/Badge";

const DEMO_STEPS = [
  "1. Photo + Voice",
  "2. Multimodal AI Processing",
  "3. What AI Understood",
  "4. Generated Listing & Heritage Passport",
  "5. Artisan Approval",
];

const CHECKLIST = [
  "✓ Image received & visual metallurgy scanned",
  "✓ Spoken Hindi audio transcribed",
  "✓ Language & regional Bastar dialect identified",
  "✓ Cire-Perdue (lost-wax) technique extracted",
  "✓ Market-based price discovery analysis completed",
  "✓ Digital Heritage Profile prepared for review",
];

export const InteractiveDemo: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [isApproved, setIsApproved] = useState<boolean>(false);

  const handleSimulateProcessing = () => {
    setActiveStep(2);
    setTimeout(() => {
      setActiveStep(3);
    }, 1800);
  };

  const handleResetDemo = () => {
    setActiveStep(1);
    setIsApproved(false);
    setIsPlayingAudio(false);
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
            Experience the complete flow from indigenous artisan voice to verified Heritage Passport
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

      {/* 5-Step Process Indicator */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {DEMO_STEPS.map((name, i) => {
          const stepNum = i + 1;
          const isDone = activeStep > stepNum || (activeStep === 5 && isApproved);
          const isCurrent = activeStep === stepNum && !isApproved;

          return (
            <button
              key={i}
              type="button"
              onClick={() => setActiveStep(stepNum)}
              className={`p-2.5 rounded-xl text-left border text-xs transition cursor-pointer ${
                isCurrent
                  ? "border-[#C2410C] bg-[#FFF7ED] font-bold text-[#9A3412] shadow-2xs"
                  : isDone
                  ? "border-emerald-200 bg-emerald-50 text-emerald-900 font-semibold"
                  : "border-stone-200 bg-[#FAF7F2] text-stone-500"
              }`}
            >
              <div className="flex items-center gap-1.5 mb-1">
                {isDone ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <span
                    className={`w-3.5 h-3.5 rounded-full text-[10px] flex items-center justify-center font-bold ${
                      isCurrent ? "bg-[#C2410C] text-white" : "bg-stone-300 text-stone-700"
                    }`}
                  >
                    {stepNum}
                  </span>
                )}
                <span className="text-[10px] uppercase tracking-wider font-bold">Step {stepNum}</span>
              </div>
              <div className="truncate">{name.split(". ")[1]}</div>
            </button>
          );
        })}
      </div>

      {/* Step Contents */}
      <div className="bg-[#FAF7F2] rounded-2xl p-6 sm:p-8 border border-stone-200 min-h-[360px] flex flex-col justify-between">
        {/* STEP 1: Photo + Voice */}
        {activeStep === 1 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-5 relative h-56 w-full rounded-2xl overflow-hidden shadow-xs">
                <Image
                  src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80"
                  alt="Bastar Dhokra Nandi Bull"
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
                  <span className="text-xs font-bold uppercase text-[#C2410C]">Demo Artisan Scenario</span>
                  <h4 className="text-xl font-bold font-serif text-stone-900">
                    Shanti Devi — Bastar Dhokra Artisan
                  </h4>
                  <p className="text-xs text-stone-600">
                    Artisan takes a photo of her handmade bell metal figurine and speaks in Hindi.
                  </p>
                </div>

                <div className="bg-white p-4 rounded-xl border border-stone-200 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-[#C2410C]">
                    <span className="flex items-center gap-1.5">
                      <Volume2 className="w-4 h-4" /> Spoken Audio Input (Hindi)
                    </span>
                    <button
                      onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                      className="text-stone-500 hover:text-stone-800 text-[11px] font-semibold underline cursor-pointer"
                    >
                      {isPlayingAudio ? "Pause Audio" : "Play Spoken Voice"}
                    </button>
                  </div>
                  <p className="text-xs text-stone-800 italic bg-[#FAF7F2] p-2.5 rounded-lg border border-stone-100">
                    &ldquo;यह बस्तर का पारंपरिक ढोकरा शिल्प है, जिसे घंटी धातु और मधुमक्खी के मोम की लॉस्ट-वैक्स तकनीक से हाथ से ढाला गया है। यह नंदी बैल की पवित्र प्रतिमा है।&rdquo;
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleSimulateProcessing}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#C2410C] hover:bg-[#9A3412] text-white text-sm font-bold shadow-md cursor-pointer transition"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Trigger Multimodal AI Processing</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Processing State */}
        {activeStep === 2 && (
          <div className="space-y-6 max-w-xl mx-auto text-center py-6">
            <div className="w-16 h-16 rounded-full border-4 border-orange-200 border-t-[#C2410C] animate-spin mx-auto" />
            <div className="space-y-1">
              <h4 className="text-xl font-bold font-serif text-stone-900">
                AI Multimodal Processing Pipeline
              </h4>
              <p className="text-xs text-stone-500">
                Extracting acoustic terms, identifying metallurgical geometry, and querying GI guild standards
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

        {/* STEP 3: What AI Understood */}
        {activeStep === 3 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <div className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-indigo-600" />
                <h4 className="text-lg font-bold font-serif text-stone-900">
                  Step 3: What AI Understood (Pre-Generation Inspection)
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
                <span className="text-stone-500 block text-[11px]">GI Cluster Match:</span>
                <strong className="text-amber-800 text-sm">Demo Ref #83 (Candidate)</strong>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setActiveStep(4)}
                className="px-6 py-2.5 rounded-xl bg-[#C2410C] hover:bg-[#9A3412] text-white text-xs font-bold shadow-xs cursor-pointer inline-flex items-center gap-1.5"
              >
                <span>Proceed to Listing & Heritage Passport</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Generated Listing & Passport */}
        {activeStep === 4 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <h4 className="text-lg font-bold font-serif text-stone-900 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-700" />
                <span>Step 4: Generated Commercial Listing & Heritage Passport</span>
              </h4>
              <div className="flex gap-2">
                <ProvenanceBadge label="AI Generated" size="sm" />
                <ProvenanceBadge label="GI Registered Craft" size="sm" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {/* Commercial Listing Data */}
              <div className="bg-white p-4 rounded-xl border border-stone-200 space-y-3">
                <span className="font-bold text-[#C2410C] uppercase tracking-wider block">
                  Commercial Listing (Marketplace Ready)
                </span>
                <div className="space-y-1">
                  <strong className="text-stone-900 text-sm block">
                    Bastar Dhokra Bell Metal Nandi Bull Tribal Figurine
                  </strong>
                  <p className="text-stone-600 line-clamp-2">
                    Intricately cast brass bell metal tribal art piece handcrafted using 4,000-year-old lost-wax metallurgy in Bastar.
                  </p>
                </div>

                {/* Market Price Analysis Summary (Market-Based Discovery) */}
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-stone-900 text-[11px] uppercase tracking-wider flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5 text-[#C2410C]" />
                      Market Price Analysis
                    </span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-900 font-bold px-2 py-0.5 rounded-full">
                      Evidence: HIGH
                    </span>
                  </div>

                  <div className="space-y-1 text-[11px]">
                    <div className="flex justify-between text-stone-600">
                      <span>Amazon (Dhokra Figurine):</span>
                      <span className="font-mono font-bold text-stone-800">₹3,799</span>
                    </div>
                    <div className="flex justify-between text-stone-600">
                      <span>Flipkart (Tribal Bull):</span>
                      <span className="font-mono font-bold text-stone-800">₹3,499</span>
                    </div>
                    <div className="flex justify-between text-stone-600">
                      <span>ONDC (Kondagaon Guild):</span>
                      <span className="font-mono font-bold text-stone-800">₹4,100</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-stone-200 space-y-1">
                    <div className="flex justify-between text-stone-700 text-[11px]">
                      <span>Market Median:</span>
                      <span className="font-bold text-stone-900 font-mono">₹3,775</span>
                    </div>
                    <div className="flex justify-between font-bold text-xs">
                      <span className="text-stone-900">Recommended Range:</span>
                      <span className="text-[#C2410C] font-mono">₹3,600 – ₹4,100</span>
                    </div>
                    <div className="flex justify-between pt-1 border-t border-stone-200 font-black text-xs text-emerald-900 bg-emerald-50/80 p-1.5 rounded-lg">
                      <span>Artisan Final Price:</span>
                      <span className="font-mono">₹3,900</span>
                    </div>
                  </div>

                  <div className="text-[10px] text-stone-500 italic pt-0.5">
                    Demo Market Data • Final price chosen by the artisan
                  </div>
                </div>
              </div>

              {/* Digital Heritage Passport Data */}
              <div className="bg-white p-4 rounded-xl border border-stone-200 space-y-3">
                <span className="font-bold text-emerald-800 uppercase tracking-wider block">
                  Living Heritage Record (National Vault)
                </span>
                <div className="space-y-1.5">
                  <div>
                    <span className="text-stone-500 block text-[11px]">Traditional Technique:</span>
                    <p className="text-stone-700 leading-relaxed">
                      Cire-Perdue (Lost Wax) Indigenous Metallurgy: Single-pour alloy casting over termite clay core.
                    </p>
                  </div>
                  <div>
                    <span className="text-stone-500 block text-[11px]">Cultural Significance:</span>
                    <p className="text-stone-700 leading-relaxed">
                      Direct continuum with Mohenjo-Daro bronze traditions; revered tribal protector totems.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setActiveStep(5)}
                className="px-6 py-2.5 rounded-xl bg-[#C2410C] hover:bg-[#9A3412] text-white text-xs font-bold shadow-xs cursor-pointer inline-flex items-center gap-1.5"
              >
                <span>Require Artisan Review & Approval</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: Artisan Approval */}
        {activeStep === 5 && (
          <div className="space-y-6 text-center py-4">
            {!isApproved ? (
              <div className="max-w-md mx-auto space-y-4">
                <div className="w-14 h-14 rounded-full bg-amber-100 text-[#C2410C] flex items-center justify-center mx-auto">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-2xl font-bold font-serif text-stone-900">
                    Artisan Review & Final Approval
                  </h4>
                  <p className="text-xs text-stone-600">
                    KarigarSetu never automatically publishes an AI listing. Explicit approval is required to protect artisan dignity and prevent false claims.
                  </p>
                </div>

                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-950 text-left">
                  <strong>Approval Rule:</strong> &ldquo;I confirm that the materials, technique description, and fair price range accurately reflect my authentic handmade work.&rdquo;
                </div>

                <div className="flex justify-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveStep(4)}
                    className="px-4 py-2.5 rounded-xl border border-stone-300 text-stone-700 text-xs font-semibold hover:bg-stone-100 cursor-pointer"
                  >
                    Edit Details
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsApproved(true)}
                    className="px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-md cursor-pointer inline-flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Approve & Publish to Catalogue</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="max-w-md mx-auto space-y-4 py-2">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto animate-bounce">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-2xl font-bold font-serif text-stone-900">
                    Artisan Approved & Published!
                  </h4>
                  <p className="text-xs text-stone-600">
                    Bastar Dhokra Nandi Bull is now archived in the Living Heritage Vault and ready for ONDC/GeM commercial network discovery.
                  </p>
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
                    href="/products/new"
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#C2410C] hover:bg-[#9A3412] text-white text-xs font-bold shadow-xs"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Onboard Another Craft</span>
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
