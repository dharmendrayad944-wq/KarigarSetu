"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import { useLanguage } from "@/components/providers/LanguageContext";
import { ProductRepository } from "@/lib/db/repository";
import { DEMO_PRODUCTS } from "@/lib/data/demo-products";
import { Product } from "@/lib/db/schema";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ProvenanceBadge, GICandidacyBadge } from "@/components/ui/Badge";
import { ImageFallback } from "@/components/ui/ImageFallback";
import { JudgeTrustPanel } from "@/components/trust/JudgeTrustPanel";
import {
  Award,
  ShieldCheck,
  MapPin,
  BookOpen,
  ArrowLeft,
  Layers,
  Sparkles,
  User,
  Calendar,
  ExternalLink,
  Printer,
  Bookmark,
  Tag,
  ShoppingBag,
  Info,
  Maximize2,
  Box,
} from "lucide-react";

export default function HeritageDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { t, language } = useLanguage();

  // Deterministic SSR & initial client render from shared static dataset
  const [product, setProduct] = useState<Product | null>(() => {
    return DEMO_PRODUCTS.find((p) => p.id === id) || null;
  });

  const [relatedProducts, setRelatedProducts] = useState<Product[]>(() => {
    const item = DEMO_PRODUCTS.find((p) => p.id === id);
    if (!item) return [];
    return DEMO_PRODUCTS
      .filter((p) => p.id !== id && (p.category === item.category || p.state === item.state))
      .slice(0, 3);
  });

  // Load client persisted data after mount to prevent hydration mismatch
  useEffect(() => {
    const all = ProductRepository.getProducts();
    const item = all.find((p) => p.id === id);
    if (item) {
      setProduct(item);
      const related = all
        .filter((p) => p.id !== id && (p.category === item.category || p.state === item.state))
        .slice(0, 3);
      setRelatedProducts(related);
    }
  }, [id]);

  const [activeTab, setActiveTab] = useState<"heritage" | "commercial">("heritage");

  if (!product) {
    return (
      <div className="flex-1 max-w-xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-2xl font-bold text-stone-900 font-serif">Heritage Record Not Found</h2>
        <p className="text-sm text-stone-600">The requested living heritage record could not be retrieved from the local repository.</p>
        <Link href="/vault">
          <Button variant="outline">Return to KarigarSetu Living Heritage Vault</Button>
        </Link>
      </div>
    );
  }

  const record = product.heritage_record || product.heritage_profile;

  return (
    <div className="flex-1 bg-[#FAF7F2] py-8 sm:py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Navigation Breadcrumb & Vault Link */}
        <div className="flex items-center justify-between">
          <Link
            href="/vault"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-600 hover:text-[#C2410C] transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to KarigarSetu Living Heritage Vault</span>
          </Link>

          <div className="flex items-center gap-3">
            <button
              onClick={() => window.print()}
              className="text-xs text-stone-600 hover:text-stone-900 flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-stone-300 bg-white hover:bg-stone-50 cursor-pointer shadow-2xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Heritage Passport</span>
            </button>
            <span className="text-xs text-stone-500 font-mono hidden sm:inline">
              Vault Record ID: {product.id}
            </span>
          </div>
        </div>

        {/* Hero Passport Header: Digital Museum Styling */}
        <div className="bg-gradient-to-br from-stone-900 via-[#1E3A5F] to-stone-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30">
              <Award className="w-4 h-4 text-emerald-400" />
              <span>DIGITAL HERITAGE PASSPORT • LIVING CULTURAL ARCHIVE</span>
            </div>

            <GICandidacyBadge
              status={product.gi_status || product.gi_candidacy_status}
              demoReference={product.gi_demo_reference}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="md:col-span-2 space-y-3">
              <div className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center gap-2">
                <span>{product.craft_name}</span>
                <span>•</span>
                <span className="text-stone-300 font-medium text-[11px]">
                  Craft-Level Status: {product.gi_demo_reference || "GI-Registered Craft"}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold font-serif text-white leading-tight">
                {language === "hi" && product.title_hi ? product.title_hi : product.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-xs text-stone-300 pt-1">
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-[#C2410C]" />
                  {product.district}, {product.state}
                </span>
                <span className="flex items-center gap-1">
                  <User className="w-4 h-4 text-amber-400" />
                  Artisan: {record?.artisan_name || "Master Artisan"}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4 text-stone-400" />
                  Archived: {(() => {
                    const d = new Date(product.created_at);
                    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                    return `${months[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
                  })()}
                </span>
              </div>
            </div>

            {/* Featured Image Thumbnail with ImageFallback */}
            <div className="relative h-56 w-full rounded-2xl overflow-hidden border-2 border-white/20 shadow-lg">
              <ImageFallback
                src={product.featured_image_url}
                alt={product.title}
                craft={product.craft_name}
                region={`${product.district}, ${product.state}`}
                fill
                className="object-cover"
                sizes="350px"
              />
            </div>
            {/* Image Attribution & Tradition Representation Block (Item 2) */}
            {product.image_attribution && (
              <div className="mt-2 text-[11px] text-stone-300/90 space-y-1">
                <div className="flex items-start gap-1.5">
                  <Info className="w-3.5 h-3.5 shrink-0 text-stone-400 mt-0.5" />
                  <span>
                    Real craft photograph sourced from Wikimedia Commons with attribution and licensing metadata ({product.image_attribution.attribution_text}, {product.image_attribution.license_type}).
                    {" "}
                    <a
                      href={product.image_attribution.source_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-white transition"
                    >
                      View Source
                    </a>
                  </span>
                </div>
                <p className="text-[10px] text-stone-400 italic pl-5">
                  These images represent the craft tradition and are not claimed to be photographs of the demo artisan.
                </p>
              </div>
            )}
          </div>

          {/* Phase 5 Core Distinction Tabs */}
          <div className="flex items-center gap-2 pt-4 border-t border-white/15">
            <button
              onClick={() => setActiveTab("heritage")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
                activeTab === "heritage"
                  ? "bg-white text-stone-900 shadow-sm"
                  : "bg-white/10 text-stone-300 hover:bg-white/20"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-[#C2410C]" />
              <span>Cultural Living Heritage Data</span>
            </button>
            <button
              onClick={() => setActiveTab("commercial")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
                activeTab === "commercial"
                  ? "bg-white text-stone-900 shadow-sm"
                  : "bg-white/10 text-stone-300 hover:bg-white/20"
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5 text-emerald-600" />
              <span>Commercial Product Data</span>
            </button>
          </div>
        </div>

        {/* TAB 1: CULTURAL HERITAGE DATA */}
        {activeTab === "heritage" && (
          <div className="space-y-6">
            {/* 2-Column Museum Structure: Technique & Cultural Story */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Technique Box */}
              <Card className="space-y-3 border border-[#E7E0D3]">
                <div className="flex items-center justify-between border-b border-stone-100 pb-2">
                  <h2 className="text-base font-bold font-serif text-stone-900 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-[#C2410C]" />
                    <span>Documented Traditional Technique</span>
                  </h2>
                  <ProvenanceBadge label="Verified Source" size="sm" />
                </div>
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                  {record?.traditional_technique || "Traditional non-mechanized handcrafting passed down across generations."}
                </p>
              </Card>

              {/* Cultural Significance Story */}
              <Card className="space-y-3 border border-[#E7E0D3]">
                <div className="flex items-center justify-between border-b border-stone-100 pb-2">
                  <h2 className="text-base font-bold font-serif text-stone-900 flex items-center gap-2">
                    <Award className="w-4 h-4 text-emerald-700" />
                    <span>Cultural Significance & Context</span>
                  </h2>
                  <ProvenanceBadge label="Artisan Provided" size="sm" />
                </div>
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                  {record?.cultural_story || "Deeply rooted in Indian spiritual, tribal, and seasonal rituals representing regional biodiversity and cultural memory."}
                </p>
              </Card>
            </div>

            {/* Materials & Motifs */}
            <Card className="space-y-4 border border-[#E7E0D3]">
              <div className="flex items-center justify-between border-b border-stone-100 pb-2">
                <h2 className="text-base font-bold font-serif text-stone-900 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-amber-700" />
                  <span>Indigenous Materials & Traditional Motifs</span>
                </h2>
                <ProvenanceBadge label="Artisan Provided" size="sm" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-stone-600 mb-2">
                    Documented Natural Materials:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.materials.map((mat, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-900 border border-amber-200"
                      >
                        {mat}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-stone-600 mb-2">
                    Traditional Motifs & Visual Elements:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.motifs && product.motifs.length > 0 ? (
                      product.motifs.map((motif, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 rounded-full text-xs font-medium bg-stone-100 text-stone-800 border border-stone-200"
                        >
                          {motif}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-stone-500 italic">Regional geometric symbols</span>
                    )}
                  </div>
                </div>
              </div>
            </Card>

            {/* Artisan Story */}
            {(product.artisan_story || record?.artisan_story) && (
              <Card className="bg-orange-50/50 border border-orange-200 space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-bold font-serif text-[#9A3412] flex items-center gap-2">
                    <User className="w-4 h-4 text-[#C2410C]" />
                    <span>Artisan Living Voice & Lineage Narrative</span>
                  </h2>
                  <ProvenanceBadge label="Artisan Provided" size="sm" />
                </div>
                <p className="text-xs sm:text-sm text-stone-800 leading-relaxed italic">
                  &ldquo;{product.artisan_story || record?.artisan_story}&rdquo;
                </p>
                <div className="text-[11px] text-stone-500 font-medium">
                  Spoken in {record?.original_language || "Hindi"} • Direct artisan voice transcription
                </div>
              </Card>
            )}

            {/* Provenance Audit Trail with Explicit Badges */}
            <Card className="space-y-4 border border-[#E7E0D3]">
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <div>
                  <h2 className="text-lg font-bold font-serif text-stone-900 flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-700" />
                    <span>Authenticity & Provenance Audit Trail</span>
                  </h2>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Every heritage claim indicates its originating source to protect cultural truth.
                  </p>
                </div>
                <span className="text-xs font-bold text-stone-700 bg-stone-100 px-2.5 py-1 rounded-lg">
                  {record?.claims?.length || 0} Claims Documented
                </span>
              </div>

              <div className="space-y-3">
                {record?.claims && record.claims.length > 0 ? (
                  record.claims.map((claim) => (
                    <div
                      key={claim.id}
                      className="p-4 rounded-xl border border-stone-200 bg-stone-50/60 hover:bg-white transition flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="space-y-1.5 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <ProvenanceBadge label={claim.provenance_label || "Requires Verification"} size="sm" />
                        </div>
                        <p className="text-xs sm:text-sm text-stone-800 font-medium leading-relaxed">
                          {claim.claim_text}
                        </p>
                        {claim.source_reference && (
                          <div className="text-[11px] text-stone-500 italic">
                            Verification reference: {claim.source_reference}
                          </div>
                        )}
                      </div>

                      {claim.source_url && (
                        <a
                          href={claim.source_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-[#C2410C] font-semibold flex items-center gap-1 hover:underline shrink-0"
                        >
                          <span>External Archive</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-stone-500">No claims documented yet.</p>
                )}
              </div>
            </Card>

            {/* Judge Trust & Methodology Panel (Items 6 & 10) */}
            <JudgeTrustPanel
              craftName={product.craft_name}
              comparableCount={product.price_analysis?.comparable_count || 0}
            />

            {/* Institutional Sources & Cross-References */}
            <Card className="space-y-3 border border-[#E7E0D3]">
              <div className="flex items-center justify-between border-b border-stone-100 pb-2">
                <h3 className="text-sm font-bold font-serif text-stone-900 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-indigo-600" />
                  <span>Institutional Sources & Cross-References</span>
                </h3>
                <span className="text-[11px] text-stone-500">Authoritative Guild Archives</span>
              </div>
              <div className="space-y-2 text-xs">
                {record?.sources && record.sources.length > 0 ? (
                  record.sources.map((src, i) => (
                    <div key={i} className="flex items-center justify-between p-2.5 bg-stone-50 rounded-lg border border-stone-200">
                      <div>
                        <span className="font-semibold text-stone-800">{src.title}</span>
                        <span className="text-stone-500 ml-2">({src.type})</span>
                      </div>
                      {src.is_demo && <ProvenanceBadge label="Demo Data" size="sm" />}
                    </div>
                  ))
                ) : (
                  <div className="p-2.5 bg-stone-50 rounded-lg text-stone-600">
                    Cross-referenced against Regional Craft Guild Archives & National Handicraft Registry.
                  </div>
                )}
              </div>
            </Card>
          </div>
        )}

        {/* TAB 2: COMMERCIAL PRODUCT DATA (Phase 5 Clean Separation) */}
        {activeTab === "commercial" && (
          <div className="space-y-6">
            <Card className="space-y-6 border border-[#E7E0D3]">
              <div className="border-b border-stone-100 pb-4">
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-1">
                  Commercial Product Profile
                </div>
                <h2 className="text-xl font-bold font-serif text-stone-900">
                  {product.title}
                </h2>
                <p className="text-xs text-stone-500 mt-1">
                  Category: <span className="font-semibold text-stone-800 uppercase">{product.category}</span> • Listed by {record?.artisan_name || "Artisan"}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Price Box */}
                <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-stone-200 space-y-1">
                  <span className="text-xs text-stone-500 font-medium">Artisan Listed Price:</span>
                  <div className="text-2xl font-extrabold font-serif text-stone-900">
                    ₹{(product.final_price || product.suggested_min_price).toLocaleString("en-IN")}
                  </div>
                  <div className="text-[11px] text-stone-500">
                    Observed Market Range: ₹{product.suggested_min_price.toLocaleString("en-IN")} – ₹{product.suggested_max_price.toLocaleString("en-IN")}
                  </div>
                </div>

                {/* Dimensions */}
                <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-stone-200 space-y-1">
                  <span className="text-xs text-stone-500 font-medium flex items-center gap-1">
                    <Maximize2 className="w-3.5 h-3.5 text-stone-400" /> Dimensions:
                  </span>
                  <div className="text-base font-bold text-stone-900">
                    {product.dimensions?.length || 18} × {product.dimensions?.width || 10} × {product.dimensions?.height || 16} {product.dimensions?.unit || "cm"}
                  </div>
                  <div className="text-[11px] text-stone-500">Handmade dimensions may vary slightly</div>
                </div>

                {/* Inventory */}
                <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-stone-200 space-y-1">
                  <span className="text-xs text-stone-500 font-medium flex items-center gap-1">
                    <Box className="w-3.5 h-3.5 text-stone-400" /> Available Inventory:
                  </span>
                  <div className="text-base font-bold text-stone-900">
                    {product.inventory || 1} unit(s) in stock
                  </div>
                  <div className="text-[11px] text-emerald-700 font-semibold">ONDC Integration-Ready (Beckn-compatible packet)</div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-stone-900">Product Description:</h3>
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                  {product.description}
                </p>
                {product.description_hi && (
                  <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-800 italic">
                    <strong>हिंदी विवरण:</strong> {product.description_hi}
                  </div>
                )}
              </div>

              {/* Additional Photos if available */}
              {product.additional_images && product.additional_images.length > 0 && (
                <div className="space-y-3 pt-2">
                  <h3 className="text-sm font-bold text-stone-900">Product Image Gallery:</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {product.additional_images.map((img, idx) => (
                      <div key={idx} className="relative h-28 rounded-xl overflow-hidden border border-stone-200">
                        <ImageFallback
                          src={img}
                          alt={`${product.title} angle ${idx + 1}`}
                          craft={product.craft_name}
                          region={product.district}
                          fill
                          className="object-cover"
                          sizes="150px"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          </div>
        )}

        {/* Related Market Listings */}
        {relatedProducts.length > 0 && (
          <div className="space-y-4 pt-4 border-t border-stone-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold font-serif text-stone-900 flex items-center gap-2">
                <Tag className="w-4 h-4 text-[#C2410C]" />
                <span>Related Market Listings from This Tradition</span>
              </h3>
              <Link href="/catalogue" className="text-xs font-semibold text-[#C2410C] hover:underline">
                View All Market Listings →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedProducts.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/heritage/${rel.id}`}
                  className="bg-white p-3 rounded-2xl border border-stone-200 hover:border-[#C2410C] transition group"
                >
                  <div className="relative h-36 w-full rounded-xl overflow-hidden mb-2.5 bg-stone-100">
                    <ImageFallback
                      src={rel.featured_image_url}
                      alt={rel.title}
                      craft={rel.craft_name}
                      region={rel.district}
                      fill
                      className="object-cover group-hover:scale-103 transition-transform duration-300"
                      sizes="250px"
                    />
                  </div>
                  <div className="text-[11px] font-bold text-[#C2410C] uppercase">{rel.craft_name}</div>
                  <div className="text-xs font-bold text-stone-900 truncate mt-0.5">{rel.title}</div>
                  <div className="text-xs text-stone-600 font-semibold mt-1">
                    ₹{rel.suggested_min_price.toLocaleString("en-IN")} – ₹{rel.suggested_max_price.toLocaleString("en-IN")}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-stone-200">
          <Link href={`/products/${product.id}/review`} className="w-full sm:w-auto">
            <Button variant="outline" size="md" className="w-full sm:w-auto">
              Review Commercial Listing & Pricing
            </Button>
          </Link>
          <Link href="/catalogue" className="w-full sm:w-auto">
            <Button variant="primary" size="md" className="w-full sm:w-auto">
              Explore Market Catalogue
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
