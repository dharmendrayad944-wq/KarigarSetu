"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/components/providers/LanguageContext";
import {
  Sparkles,
  Mic,
  ShieldCheck,
  TrendingUp,
  ArrowRight,
  Camera,
  CheckCircle2,
  Award,
  Cpu,
  BookOpen,
  Users,
  ExternalLink,
  Layers,
  HeartHandshake,
} from "lucide-react";
import { ProvenanceBadge } from "@/components/ui/Badge";
import { ImageFallback } from "@/components/ui/ImageFallback";
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
                An AI-powered artisan onboarding and digital heritage platform. Transforming local-language speech and smartphone photos into structured marketplace listings, while documenting India&apos;s traditional craft techniques in the KarigarSetu Living Heritage Vault.
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
                  <ImageFallback
                    src="/crafts/bastar-dhokra.jpg"
                    alt="Bastar Dhokra Handcrafted Metal Art"
                    craft="Bastar Dhokra"
                    region="Bastar, Chhattisgarh"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 400px"
                    priority
                  />
                  <div className="absolute top-3 left-3">
                    <ProvenanceBadge label="GI-Registered Craft" size="sm" />
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-xs text-white text-xs px-2.5 py-1 rounded-md font-medium">
                    Bastar, Chhattisgarh
                  </div>
                </div>

                <p className="text-[10px] text-stone-500 leading-tight">
                  Real craft photograph sourced from Wikimedia Commons with attribution (CC BY-SA 4.0). Sourced to represent the craft tradition; not claimed to depict the demo artisan.
                </p>

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
                      Benchmark listing analysis (Amazon, Flipkart, ONDC). Market median: ₹3,775 (Simulated Market Data — SIH Demo Mode).
                    </div>
                  </div>

                  <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-stone-500 block text-[11px]">Recommended Market Range:</span>
                      <span className="text-base font-bold text-stone-900 font-mono">₹3,600 – ₹4,100</span>
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

      {/* 2. THE PROBLEM SECTION (Phase 2 Cleaned Claims) */}
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
              Millions of traditional artisans remain underserved by digital commerce due to technological and linguistic barriers.
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
                Oral Knowledge Disappearance
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Traditional recipes, organic dye processes, and sacred motifs risk disappearing without structured digital archiving as older master ustads pass down memory only verbally.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-stone-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                3
              </div>
              <h4 className="text-base font-bold text-stone-900 font-serif">
                Opaque Price Discovery
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Without transparent market price benchmarks comparing genuinely similar handmade listings, artisans lack negotiation power while intermediaries capture disproportionate margins.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. HOW KARIGARSETU WORKS (Photo + Voice Workflow) */}
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
              The Photo + Voice → AI → Market Discovery → Approval workflow makes onboarding accessible in under 90 seconds.
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
                Artisan speaks naturally in Hindi or their regional language, describing materials and technique.
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
                Multimodal AI analyzes visual features + speech transcript to extract structured craft metadata.
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
                Artisan reviews & approves or edits the listing and sets final price. Never published without consent.
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
                Registers a Digital Heritage Passport in the Vault & prepares an ONDC integration-ready catalogue record (Beckn-compatible).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. LIVE INTERACTIVE 90-SECOND DEMO SECTION (Phase 30 8-Step Simulation) */}
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
                  <span>Pre-generation inspection of extracted acoustic terms</span>
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
                KarigarSetu Living Heritage Vault preserving oral stories, techniques, and materials. Explicit verification states prevent fabricated GI certifications.
              </p>
              <ul className="text-xs text-stone-700 space-y-2 pt-2 border-t border-stone-100">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>8 explicit verification & provenance truth states</span>
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

      {/* 7. PHASE 31: MEASURABLE IMPACT SECTION (Economic, Social, Heritage) */}
      <section className="py-20 bg-[#FAF7F2] border-b border-[#E7E0D3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-xs font-bold tracking-widest uppercase text-[#C2410C]">
              Measurable Platform Impact
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-stone-900 font-serif">
              Three-Dimensional Impact Framework
            </h3>
            <p className="text-stone-600 text-sm sm:text-base">
              Addressing economic enablement, social inclusion, and cultural heritage preservation through responsible technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Economic Impact */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl craft-border-subtle shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold font-serif text-stone-900">
                Economic Impact
              </h4>
              <ul className="text-xs sm:text-sm text-stone-600 space-y-2.5">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Increased Digital Discoverability:</strong> Direct cataloguing enables indexing across ONDC buyer apps and digital portals.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Market Access & Visibility:</strong> Structured data formatting removes technical barriers to multi-channel listing.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Market-Informed Price Transparency:</strong> Multi-marketplace comparable analysis prevents distress under-pricing.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Reduced Onboarding Friction:</strong> Turnaround reduced from multiple days via intermediaries to under 90 seconds.</span>
                </li>
              </ul>
            </div>

            {/* Social Impact */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl craft-border-subtle shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-800 font-bold">
                <Users className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold font-serif text-stone-900">
                Social Impact
              </h4>
              <ul className="text-xs sm:text-sm text-stone-600 space-y-2.5">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <span><strong>Lower Literacy Barrier:</strong> Voice-first interaction allows non-literate artisans to catalogue products autonomously.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <span><strong>Local-Language Interaction:</strong> Native Hindi, Maithili, Odia, Gujarati, and regional speech processing.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <span><strong>Support for Rural & Women Artisans:</strong> Enables home-based creators to participate directly in national trade networks.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <span><strong>Direct Digital Participation:</strong> Eliminates middleman text transcription dependency.</span>
                </li>
              </ul>
            </div>

            {/* Heritage Impact */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl craft-border-subtle shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-100 flex items-center justify-center text-[#1E3A5F] font-bold">
                <Award className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold font-serif text-stone-900">
                Heritage Impact
              </h4>
              <ul className="text-xs sm:text-sm text-stone-600 space-y-2.5">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-700 shrink-0 mt-0.5" />
                  <span><strong>Living Heritage Documentation:</strong> Archiving oral techniques, natural dye chemistry, and clay formulations.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-700 shrink-0 mt-0.5" />
                  <span><strong>Artisan Story Archival:</strong> Preserving 5th-generation lineage narratives in the master artisan&apos;s own voice.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-700 shrink-0 mt-0.5" />
                  <span><strong>Traditional Motifs & Materials:</strong> Systematic tagging of indigenous motifs and non-ferrous metallurgical methods.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-700 shrink-0 mt-0.5" />
                  <span><strong>Intergenerational Knowledge Safeguarding:</strong> Digital museum records accessible for research and provenance verification.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 8. PHASE 32: EVIDENCE & AUTHORITATIVE SOURCES SECTION */}
      <section className="py-20 bg-white border-b border-[#E7E0D3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-xs font-bold tracking-widest uppercase text-[#C2410C]">
              Institutional Integrity
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-stone-900 font-serif">
              Authoritative Evidence & Sources
            </h3>
            <p className="text-stone-600 text-sm sm:text-base">
              Distinguishing source-derived institutional facts from KarigarSetu demo metrics and algorithmic price estimates.
            </p>
          </div>

          {/* Evidence Table */}
          <div className="overflow-x-auto bg-[#FAF7F2] rounded-3xl p-6 border border-stone-200 shadow-xs">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-stone-300 text-stone-700 font-bold uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4">Claim / Scope</th>
                  <th className="py-3 px-4">Authoritative Source</th>
                  <th className="py-3 px-4">Reference Date</th>
                  <th className="py-3 px-4">Type</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 text-stone-800">
                <tr>
                  <td className="py-3.5 px-4 font-semibold">
                    Geographical Indications of Goods Registry (Bastar Dhokra, Jaipur Blue Pottery, Madhubani, Channapatna)
                  </td>
                  <td className="py-3.5 px-4 text-stone-600">
                    Geographical Indications Registry, Intellectual Property India, Ministry of Commerce & Industry
                  </td>
                  <td className="py-3.5 px-4 font-mono text-stone-500">Official GI Journal</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 font-bold text-[10px]">
                      Source-Derived Fact
                    </span>
                  </td>
                </tr>

                <tr>
                  <td className="py-3.5 px-4 font-semibold">
                    Digital Commerce Protocol & Direct Artisan Onboarding Architecture
                  </td>
                  <td className="py-3.5 px-4 text-stone-600">
                    Open Network for Digital Commerce (ONDC) Open Protocol Documentation & Seller Enablement Guidelines
                  </td>
                  <td className="py-3.5 px-4 font-mono text-stone-500">2023–2026</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-900 font-bold text-[10px]">
                      Protocol Standard
                    </span>
                  </td>
                </tr>

                <tr>
                  <td className="py-3.5 px-4 font-semibold">
                    Traditional Craft Documentation & Intangible Cultural Heritage Guidelines
                  </td>
                  <td className="py-3.5 px-4 text-stone-600">
                    Ministry of Culture, Government of India & UNESCO Intangible Cultural Heritage Convention
                  </td>
                  <td className="py-3.5 px-4 font-mono text-stone-500">National Archive</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 font-bold text-[10px]">
                      Source-Derived Fact
                    </span>
                  </td>
                </tr>

                <tr>
                  <td className="py-3.5 px-4 font-semibold">
                    8 Regional Living Craft Pilot Dataset (Bastar, Jaipur, Madhubani, etc.)
                  </td>
                  <td className="py-3.5 px-4 text-stone-600">
                    KarigarSetu SIH26090 Seed Architecture (Deterministic local repository)
                  </td>
                  <td className="py-3.5 px-4 font-mono text-stone-500">SIH 2026</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold text-[10px]">
                      KarigarSetu Demo Metric
                    </span>
                  </td>
                </tr>

                <tr>
                  <td className="py-3.5 px-4 font-semibold">
                    Market Price Discovery Range Analysis (Simulated benchmark listings — SIH Demo Mode)
                  </td>
                  <td className="py-3.5 px-4 text-stone-600">
                    MarketPriceProvider Aggregation Service with Comparability Scoring (Final price set by artisan)
                  </td>
                  <td className="py-3.5 px-4 font-mono text-stone-500">Benchmark snapshot</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-full bg-orange-100 text-orange-900 font-bold text-[10px]">
                      Benchmark Estimate
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 9. BOTTOM CALL TO ACTION */}
      <section className="py-16 bg-[#FFF7ED]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-center">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-serif">
            Preserve Cultural Memory. Discover Fair Market Value.
          </h3>
          <p className="text-stone-600 text-sm max-w-xl mx-auto">
            Experience how voice-first AI and provenance verification empower traditional master artisans without middlemen.
          </p>

          <div className="pt-2">
            <Link
              href="/products/new"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#C2410C] hover:bg-[#9A3412] text-white text-base font-bold shadow-md transition"
            >
              <Sparkles className="w-5 h-5" />
              <span>Launch AI Onboarding Studio</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
