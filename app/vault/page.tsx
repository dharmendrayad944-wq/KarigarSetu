"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/components/providers/LanguageContext";
import { ProductRepository } from "@/lib/db/repository";
import { Product } from "@/lib/db/schema";
import { Card } from "@/components/ui/Card";
import { 
  Award, 
  ShieldCheck, 
  MapPin, 
  BookOpen, 
  Search, 
  AlertTriangle, 
  CheckCircle2, 
  Layers, 
  Info,
  Calendar,
  ExternalLink,
  Flame
} from "lucide-react";
import { GICandidacyBadge } from "@/components/ui/Badge";

export default function HeritageVaultPage() {
  const { t, language } = useLanguage();
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGiFilter, setSelectedGiFilter] = useState<string>("all");
  const [selectedState, setSelectedState] = useState<string>("all");

  useEffect(() => {
    const list = ProductRepository.getProducts();
    setProducts(list);
  }, []);

  const filteredVaultItems = products.filter((p) => {
    const matchesSearch =
      searchTerm === "" ||
      p.craft_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.district.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesGi =
      selectedGiFilter === "all" ||
      (selectedGiFilter === "registered" && p.gi_candidacy_status === "registered_verified") ||
      (selectedGiFilter === "candidate" && p.gi_candidacy_status === "candidate_unverified");

    const matchesState =
      selectedState === "all" || p.state.toLowerCase() === selectedState.toLowerCase();

    return matchesSearch && matchesGi && matchesState;
  });

  const availableStates = Array.from(new Set(products.map((p) => p.state))).filter(Boolean);

  const totalVerifiedGi = products.filter((p) => p.gi_candidacy_status === "registered_verified").length;
  const totalCandidates = products.filter((p) => p.gi_candidacy_status === "candidate_unverified").length;

  return (
    <div className="flex-1 bg-[#FAF7F2] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Heritage Vault Grand Header */}
        <div className="bg-gradient-to-r from-stone-900 via-[#1E3A5F] to-stone-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30">
              <Award className="w-4 h-4 text-emerald-400" />
              <span>SIH26090 Heritage & Culture • National Living Archive</span>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="bg-emerald-800/80 px-3 py-1 rounded-full font-semibold border border-emerald-500/30">
                🏛️ {totalVerifiedGi} Verified GI Records
              </span>
              <span className="bg-amber-700/60 px-3 py-1 rounded-full font-semibold border border-amber-500/30">
                ⚠️ {totalCandidates} Candidates Under Evaluation
              </span>
            </div>
          </div>

          <div className="max-w-3xl space-y-3">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-serif tracking-tight text-white">
              {t.vaultTitle}
            </h1>
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              {t.vaultSubtitle}
            </p>
          </div>

          {/* Ethics & Verification Protocol Banner */}
          <div className="p-4 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-xs flex items-start gap-3 text-xs text-stone-200">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <strong className="text-white font-bold">Living Heritage Truth Protocol:</strong>{" "}
              In accordance with national Geographical Indication protection standards, crafts in KarigarSetu are never automatically designated as certified. Candidate items undergo cluster verification, and every cultural assertion is tied to its originating source.
            </div>
          </div>
        </div>

        {/* Filter and Search Controls */}
        <div className="bg-white p-5 rounded-2xl craft-border-subtle shadow-xs space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            {/* Search Input */}
            <div className="md:col-span-6 relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by craft tradition, technique, or region..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 text-sm text-stone-900 placeholder-stone-400 focus:ring-2 focus:ring-[#C2410C]"
              />
            </div>

            {/* GI Status Filter */}
            <div className="md:col-span-3">
              <select
                value={selectedGiFilter}
                onChange={(e) => setSelectedGiFilter(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm font-medium bg-white text-stone-800 focus:ring-2 focus:ring-[#C2410C]"
              >
                <option value="all">All Heritage Records</option>
                <option value="registered">Verified GI Registered</option>
                <option value="candidate">GI Candidates (Requires Verification)</option>
              </select>
            </div>

            {/* State Filter */}
            <div className="md:col-span-3">
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm font-medium bg-white text-stone-800 focus:ring-2 focus:ring-[#C2410C]"
              >
                <option value="all">{t.allRegions}</option>
                {availableStates.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Heritage Vault Archive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVaultItems.map((product) => {
            const hp = product.heritage_profile;
            const isVerifiedGi = product.gi_candidacy_status === "registered_verified";

            return (
              <div
                key={product.id}
                className="bg-white rounded-3xl craft-border-subtle overflow-hidden flex flex-col hover:shadow-lg transition-all duration-300 group border-2 border-stone-100"
              >
                {/* Visual Header */}
                <div className="relative h-64 w-full bg-stone-100 overflow-hidden">
                  <Image
                    src={product.featured_image_url}
                    alt={product.title}
                    fill
                    className="object-cover group-hover:scale-104 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    <GICandidacyBadge status={product.gi_candidacy_status} registryNumber={product.gi_registry_number} />
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-xs text-white text-xs px-2.5 py-1 rounded-md font-medium flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#C2410C]" />
                    {product.district}, {product.state}
                  </div>
                </div>

                {/* Vault Record Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#C2410C] uppercase tracking-wider">
                        {product.craft_name}
                      </span>
                      <span className="text-stone-400 font-mono text-[11px]">
                        ID: {product.id.slice(0, 12)}
                      </span>
                    </div>

                    <h2 className="text-lg font-bold text-stone-900 font-serif leading-snug">
                      {language === "hi" && product.title_hi ? product.title_hi : product.title}
                    </h2>

                    <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">
                      {hp?.traditional_technique || product.description}
                    </p>
                  </div>

                  {/* Claims & Provenance Summary */}
                  <div className="pt-3 border-t border-stone-100 space-y-3">
                    <div className="flex items-center justify-between text-xs text-stone-500">
                      <span>Cultural Claims:</span>
                      <span className="font-semibold text-stone-800">
                        {hp?.claims?.length || 0} documented
                      </span>
                    </div>

                    {/* Materials Summary Pills */}
                    <div className="flex flex-wrap gap-1 text-[11px]">
                      {product.materials.slice(0, 3).map((mat, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-stone-100 text-stone-700">
                          {mat}
                        </span>
                      ))}
                    </div>

                    {/* Action Button */}
                    <div className="pt-1">
                      <Link
                        href={`/heritage/${product.id}`}
                        className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-stone-900 hover:bg-[#1E3A5F] text-white font-bold text-xs shadow-xs transition"
                      >
                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                        <span>Inspect Digital Heritage Passport</span>
                        <ExternalLink className="w-3 h-3 text-stone-400" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
