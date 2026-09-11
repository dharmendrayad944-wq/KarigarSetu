"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/components/providers/LanguageContext";
import {
  Sparkles,
  Mic,
  ShieldCheck,
  TrendingUp,
  ArrowRight,
  Camera,
  CheckCircle2,
  Layers,
  Award,
  BookOpen,
  Cpu,
  AlertTriangle,
  FileCheck2,
  Users,
  Compass,
  Check,
} from "lucide-react";
import { ProvenanceBadge } from "@/components/ui/Badge";
import { InteractiveDemo } from "@/components/home/InteractiveDemo";
import { CraftExplorer } from "@/components/heritage/CraftExplorer";

export default function Home() {
  const { t, language } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#FFF7ED] via-[#FAF7F2] to-[#FAF7F2] pt-12 pb-16 sm:pt-20 sm:pb-24 border-b border-[#E7E0D3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Col: Headline & Core AI Mission */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFEDD5] text-[#9A3412] text-xs sm:text-sm font-semibold border border-orange-200 shadow-2xs">
                <Sparkles className="w-4 h-4 text-[#C2410C]" />
                <span>Smart India Hackathon 2026 • SIH26090 Heritage & Culture</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#1F2421] font-serif tracking-tight leading-[1.12]">
                {language === "hi" ? (
                  <>
                    कारीगर की आवाज़। <br />
                    <span className="text-[#C2410C]">AI ऑनबोर्डिंग और धरोहर सेतु।</span>
                  </>
                ) : (
                  <>
                    Artisan voice. <br />
                    <span className="text-[#C2410C]">AI onboarding & heritage vault.</span>
                  </>
                )}
              </h1>

              <p className="text-base sm:text-lg text-stone-700 max-w-2xl leading-relaxed mx-auto lg:mx-0">
                An AI-powered artisan onboarding and digital heritage platform. Transforming local-language speech and smartphone photos into structured marketplace listings, while archiving India&apos;s endangered techniques in the National Living Heritage Vault.
              </p>

              {/* Not Another Marketplace Positioning Badge */}
              <div className="inline-flex items-start sm:items-center gap-2.5 p-3 sm:px-4 sm:py-2.5 rounded-2xl bg-stone-900 text-white text-xs font-semibold shadow-sm text-left">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5 sm:mt-0" />
                <span>Not another marketplace — An artisan-side onboarding bridge designed for integration with ONDC, GeM & global digital commerce networks</span>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/products/new"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-[#C2410C] hover:bg-[#9A3412] text-white text-base sm:text-lg font-bold shadow-md hover:shadow-lg transition-all min-h-[56px]"
                >
                  <Mic className="w-5 h-5" />
                  <span>Launch AI Onboarding Studio</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>

                <Link
                  href="/vault"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl border-2 border-stone-800 bg-stone-900 text-white text-base font-semibold hover:bg-stone-800 transition-all min-h-[56px]"
                >
                  <Award className="w-5 h-5 text-amber-300" />
                  <span>Explore Heritage Vault</span>
                </Link>
              </div>
            </div>

            {/* Right Col: Hero Preview Card */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md bg-white rounded-3xl p-5 shadow-xl border-2 border-[#E7E0D3] rotate-1 hover:rotate-0 transition-transform duration-300 space-y-4">
                <div className="relative h-64 rounded-2xl overflow-hidden bg-stone-100">
                  <Image
                    src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80"
                    alt="Bastar Dhokra Handcrafted Metal Art"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 400px"
                    priority
                  />
                  <div className="absolute top-3 left-3">
                    <ProvenanceBadge label="GI Registered Craft" size="sm" />
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-xs text-white text-xs px-2.5 py-1 rounded-md font-medium">
                    Bastar, Chhattisgarh
                  </div>
                </div>

                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wide text-[#C2410C] flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" /> Multimodal AI Extracted
                    </span>
                    <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      Artisan Confirmed
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-stone-900 font-serif leading-snug">
                    Bastar Dhokra Bell Metal Nandi Bull
                  </h3>

                  <div className="p-2.5 bg-[#FAF7F2] rounded-xl border border-stone-200 text-xs space-y-1">
                    <div className="font-semibold text-stone-800 flex items-center justify-between">
                      <span>Market Price Analysis:</span>
                      <span className="text-[10px] text-emerald-800 bg-emerald-100 font-bold px-1.5 py-0.5 rounded border border-emerald-300">HIGH Evidence</span>
                    </div>
                    <div className="text-stone-600">
                      Based on 8 comparable market listings (Amazon, Flipkart, ONDC). Market median: ₹3,775.
                    </div>
                  </div>

                  <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-stone-500 block text-[11px]">Recommended Market Range:</span>
                      <span className="text-base font-bold text-stone-900">₹3,600 – ₹4,100</span>
                    </div>
                    <Link
                      href="/heritage/prod-dokra-01"
                      className="text-[#C2410C] font-bold hover:underline inline-flex items-center gap-1 text-xs"
                    >
                      Heritage Passport →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE PROBLEM SECTION */}
      <section className="py-16 bg-white border-b border-[#E7E0D3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-xs font-bold tracking-widest uppercase text-[#C2410C]">
              The Core Challenge
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-[#1F2421] font-serif">
              Why Indigenous Crafts are Excluded from Digital Commerce
            </h3>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              India has over 7 million traditional artisans, yet less than 2% directly access digital commerce channels due to technological and linguistic barriers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-stone-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-red-100 text-red-700 flex items-center justify-center font-bold">
                1
              </div>
              <h4 className="text-base font-bold text-stone-900 font-serif">
                Complex English Seller Forms
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Conventional e-commerce portals require text-heavy cataloguing, complex category trees, and English fluency, forcing artisans into dependency on middlemen.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-stone-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                2
              </div>
              <h4 className="text-base font-bold text-stone-900 font-serif">
                Cultural Knowledge Extinction
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Traditional recipes, organic dye processes, and sacred motifs are disappearing without structured digital archiving as older master ustads pass away.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-stone-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                3
              </div>
              <h4 className="text-base font-bold text-stone-900 font-serif">
                Opaque Middleman Pricing
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Without transparent labor hour standards and raw material formulas, artisans receive fractions of real retail value while intermediaries capture 70%+ margins.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. HOW KARIGARSETU WORKS (5-STEP VISUAL WORKFLOW) */}
      <section className="py-20 bg-[#FAF7F2] border-b border-[#E7E0D3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-xs font-bold tracking-widest uppercase text-[#C2410C]">
              5-Step Architecture
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-[#1F2421] font-serif">
              How KarigarSetu Works
            </h3>
            <p className="text-stone-600 text-sm sm:text-base">
              The Photo + Voice → AI → Heritage → Approval workflow makes onboarding accessible in under 90 seconds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* Step 1 */}
            <div className="bg-white p-5 rounded-2xl craft-border-subtle shadow-xs space-y-3 relative">
              <div className="w-10 h-10 rounded-xl bg-orange-100 text-[#C2410C] flex items-center justify-center font-bold">
                <Camera className="w-5 h-5" />
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#C2410C]">Step 1</div>
              <h4 className="text-base font-bold text-stone-900 font-serif">1. PHOTO</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Artisan takes a photo of their handmade craft using any standard mobile phone camera.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-5 rounded-2xl craft-border-subtle shadow-xs space-y-3 relative">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                <Mic className="w-5 h-5" />
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#C2410C]">Step 2</div>
              <h4 className="text-base font-bold text-stone-900 font-serif">2. VOICE</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Artisan speaks naturally in Hindi, Maithili, Odia, Gujarati, or any native Indian language.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-5 rounded-2xl craft-border-subtle shadow-xs space-y-3 relative">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                <Cpu className="w-5 h-5" />
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#C2410C]">Step 3</div>
              <h4 className="text-base font-bold text-stone-900 font-serif">3. MULTIMODAL AI</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Multimodal AI analyzes visual contours + speech transcript to extract structured craft metadata.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-white p-5 rounded-2xl craft-border-subtle shadow-xs space-y-3 relative">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#C2410C]">Step 4</div>
              <h4 className="text-base font-bold text-stone-900 font-serif">4. ARTISAN APPROVAL</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Artisan reviews & approves or edits the listing and fair price. Never auto-published without consent.
              </p>
            </div>

            {/* Step 5 */}
            <div className="bg-white p-5 rounded-2xl craft-border-subtle shadow-xs space-y-3 relative">
              <div className="w-10 h-10 rounded-xl bg-stone-900 text-white flex items-center justify-center font-bold">
                <Award className="w-5 h-5 text-amber-300" />
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#C2410C]">Step 5</div>
              <h4 className="text-base font-bold text-stone-900 font-serif">5. HERITAGE & ONDC</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Registers a Digital Heritage Passport in the Vault & generates an ONDC/GeM integration packet.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. LIVE INTERACTIVE 90-SECOND DEMO SECTION */}
      <section className="py-20 bg-white border-b border-[#E7E0D3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <InteractiveDemo />
        </div>
      </section>

      {/* 5. THREE CORE PILLARS SECTION */}
      <section className="py-20 bg-[#FAF7F2] border-b border-[#E7E0D3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <h2 className="text-xs font-bold tracking-widest uppercase text-[#C2410C]">
              Platform Architecture
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-[#1F2421] font-serif">
              Built on Three Core Pillars
            </h3>
            <p className="text-stone-600 text-base sm:text-lg">
              KarigarSetu bridges indigenous craftsmanship with digital commerce without stripping away cultural dignity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pillar 1: Access */}
            <div className="bg-white p-8 rounded-3xl craft-border-subtle shadow-xs hover:border-[#C2410C] transition-all space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center text-[#C2410C]">
                <Mic className="w-7 h-7" />
              </div>
              <h4 className="text-xl font-bold text-stone-900 font-serif">
                Access: Voice-First Inclusion
              </h4>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Speech-to-text in regional Indian languages eliminates typing barriers. Artisans speak naturally in their mother tongue to generate comprehensive product specs.
              </p>
              <ul className="text-xs text-stone-700 space-y-2 pt-2 border-t border-stone-100">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Audio transcription with live transcript editor</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Pre-generation inspection of acoustic terms</span>
                </li>
              </ul>
            </div>

            {/* Pillar 2: Income */}
            <div className="bg-white p-8 rounded-3xl craft-border-subtle shadow-xs hover:border-[#C2410C] transition-all space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-700">
                <TrendingUp className="w-7 h-7" />
              </div>
              <h4 className="text-xl font-bold text-stone-900 font-serif">
                Income: Market Price Discovery
              </h4>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Market-driven price discovery analyzing genuinely comparable listings across approved platforms (Amazon, Flipkart, ONDC) with full artisan authority.
              </p>
              <ul className="text-xs text-stone-700 space-y-2 pt-2 border-t border-stone-100">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Transparent comparable product evidence</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Final sale price is always artisan-controlled</span>
                </li>
              </ul>
            </div>

            {/* Pillar 3: Heritage */}
            <div className="bg-white p-8 rounded-3xl craft-border-subtle shadow-xs hover:border-[#C2410C] transition-all space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-indigo-100 flex items-center justify-center text-[#1E3A5F]">
                <Award className="w-7 h-7" />
              </div>
              <h4 className="text-xl font-bold text-stone-900 font-serif">
                Heritage: Provenance Integrity
              </h4>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                National Living Heritage Vault preserving oral stories, techniques, and materials. Explicit verification states prevent fabricated GI certifications.
              </p>
              <ul className="text-xs text-stone-700 space-y-2 pt-2 border-t border-stone-100">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Strict 6-state verification & provenance matrix</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Never invents or auto-claims fake GI numbers</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CRAFT EXPLORER (STATE → CRAFT → PASSPORT) */}
      <section className="py-20 bg-white border-b border-[#E7E0D3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CraftExplorer />
        </div>
      </section>

      {/* 7. IMPACT & METRICS SECTION */}
      <section className="py-16 bg-[#FFF7ED]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-center">
          <div className="max-w-2xl mx-auto space-y-2">
            <h2 className="text-xs font-bold tracking-widest uppercase text-[#C2410C]">
              Measurable Platform Impact
            </h2>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-serif">
              Preserving Indian Craft Memory at National Scale
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl craft-border-subtle shadow-xs">
              <span className="text-3xl sm:text-4xl font-extrabold font-serif text-[#C2410C] block">8</span>
              <span className="text-xs font-medium text-stone-600 mt-1 block">Living Craft Traditions</span>
              <span className="text-[11px] text-stone-400">Archived in Vault</span>
            </div>

            <div className="bg-white p-6 rounded-2xl craft-border-subtle shadow-xs">
              <span className="text-3xl sm:text-4xl font-extrabold font-serif text-emerald-700 block">100%</span>
              <span className="text-xs font-medium text-stone-600 mt-1 block">Artisan Approval Guard</span>
              <span className="text-[11px] text-stone-400">Zero unconsented posts</span>
            </div>

            <div className="bg-white p-6 rounded-2xl craft-border-subtle shadow-xs">
              <span className="text-3xl sm:text-4xl font-extrabold font-serif text-indigo-700 block">6</span>
              <span className="text-xs font-medium text-stone-600 mt-1 block">Provenance Truth States</span>
              <span className="text-[11px] text-stone-400">Anti-fabrication matrix</span>
            </div>

            <div className="bg-white p-6 rounded-2xl craft-border-subtle shadow-xs">
              <span className="text-3xl sm:text-4xl font-extrabold font-serif text-amber-700 block">&lt; 90s</span>
              <span className="text-xs font-medium text-stone-600 mt-1 block">Onboarding Turnaround</span>
              <span className="text-[11px] text-stone-400">Photo + voice to listing</span>
            </div>
          </div>

          <div className="pt-4">
            <Link
              href="/products/new"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#C2410C] hover:bg-[#9A3412] text-white text-base font-bold shadow-md transition"
            >
              <Sparkles className="w-5 h-5" />
              <span>Begin Artisan Onboarding Flow</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
