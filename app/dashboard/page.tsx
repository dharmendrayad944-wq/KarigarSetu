"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/components/providers/LanguageContext";
import { ProductRepository } from "@/lib/db/repository";
import { Product } from "@/lib/db/schema";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ProductStatusBadge, GICandidacyBadge, ProvenanceBadge } from "@/components/ui/Badge";
import {
  Package,
  Sparkles,
  RotateCcw,
  PlusCircle,
  ArrowUpRight,
  ShieldCheck,
  Award,
  BookOpen,
  MapPin,
  Clock,
  ExternalLink,
  MessageSquare,
  IndianRupee,
} from "lucide-react";

export default function DashboardPage() {
  const { t, language } = useLanguage();
  const [products, setProducts] = useState<Product[]>([]);
  const [artisanName, setArtisanName] = useState("Shanti Devi");

  const loadData = () => {
    const list = ProductRepository.getProducts();
    setProducts(list);

    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("karigar_active_artisan");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (parsed.name) setArtisanName(parsed.name);
        } catch (e) {
          console.error(e);
        }
      }
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleResetDemoData = () => {
    if (confirm("Reset demo catalog to initial seed items?")) {
      const reset = ProductRepository.resetToSeed();
      setProducts(reset);
    }
  };

  // Section 15 Required Metrics
  const productsOnboarded = products.length;
  const pendingApprovals = products.filter(
    (p) => p.status === "artisan_review" || p.status === "ai_generated" || p.status === "draft"
  ).length;
  const externalInquiries = 14; // ONDC / GeM network discovery inquiries
  const catalogueValue = products.reduce((acc, p) => acc + (p.final_price || p.suggested_min_price || 0), 0);

  // Heritage Impact Metrics
  const heritageRecordsCount = products.filter((p) => p.heritage_record || p.heritage_profile).length;
  const craftStoriesCount = products.filter((p) => p.artisan_story || p.heritage_record?.artisan_story).length;
  const techniquesCount = products.filter(
    (p) => p.heritage_record?.traditional_technique || p.heritage_profile?.traditional_technique
  ).length;
  const regionsRepresented = new Set(products.map((p) => p.state)).size;

  return (
    <div className="flex-1 bg-[#FAF7F2] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header with Greeting & Add CTA */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl craft-border-subtle shadow-xs">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#C2410C] uppercase tracking-wider mb-1">
              <span>Artisan Studio Dashboard</span>
              <span>•</span>
              <span className="text-stone-900 font-semibold">{artisanName}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-serif text-stone-900">
              {language === "hi" ? "कारीगर नियंत्रण कक्ष" : "Artisan Studio Dashboard"}
            </h1>
            <p className="text-sm text-stone-600 mt-1 max-w-xl">
              Manage your multimodal AI onboardings, review living heritage profiles, and inspect external network discovery.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleResetDemoData}
              className="p-3 text-stone-500 hover:text-stone-800 hover:bg-stone-100 rounded-xl border border-stone-200 text-xs flex items-center gap-1.5 transition cursor-pointer shadow-2xs"
              title="Reset AI Demo Data"
            >
              <RotateCcw className="w-4 h-4" />
              <span className="hidden md:inline">Reset AI Demo Data</span>
            </button>

            <Link href="/products/new">
              <Button
                variant="primary"
                size="lg"
                leftIcon={<PlusCircle className="w-5 h-5" />}
                className="w-full sm:w-auto font-bold shadow-md hover:shadow-lg"
              >
                {t.navAddProduct}
              </Button>
            </Link>
          </div>
        </div>

        {/* 4 Primary Operational Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Metric 1: Products Onboarded */}
          <Card className="flex items-center gap-4 bg-white">
            <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center text-[#C2410C] shrink-0">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-medium text-stone-500 block">Products Onboarded</span>
              <span className="text-2xl font-bold text-stone-900 font-serif">{productsOnboarded}</span>
              <span className="text-[11px] text-stone-400 block mt-0.5">Commercial listings</span>
            </div>
          </Card>

          {/* Metric 2: Pending Approvals */}
          <Card className="flex items-center gap-4 bg-white">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-700 shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-medium text-stone-500 block">Pending Approvals</span>
              <span className="text-2xl font-bold text-amber-900 font-serif">{pendingApprovals}</span>
              <span className="text-[11px] text-stone-400 block mt-0.5">Requires artisan review</span>
            </div>
          </Card>

          {/* Metric 3: Catalogue Value */}
          <Card className="flex items-center gap-4 bg-white">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
              <IndianRupee className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-medium text-stone-500 block">Catalogue Value</span>
              <span className="text-2xl font-bold text-stone-900 font-serif">
                ₹{catalogueValue.toLocaleString("en-IN")}
              </span>
              <span className="text-[11px] text-stone-400 block mt-0.5">Total listed product value</span>
            </div>
          </Card>

          {/* Metric 4: External Market Inquiries */}
          <Card className="flex items-center gap-4 bg-white">
            <div className="w-12 h-12 rounded-2xl bg-indigo-100 flex items-center justify-center text-[#1E3A5F] shrink-0">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-medium text-stone-500 block">Market Inquiries</span>
              <span className="text-2xl font-bold text-stone-900 font-serif">{externalInquiries}</span>
              <span className="text-[11px] text-stone-400 block mt-0.5">ONDC / GeM readiness</span>
            </div>
          </Card>
        </div>

        {/* Section 15: Heritage Impact Section */}
        <div className="bg-gradient-to-r from-stone-900 via-[#1E3A5F] to-stone-900 rounded-3xl p-6 sm:p-8 text-white space-y-6 shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30 mb-1">
                <Award className="w-3.5 h-3.5 text-emerald-400" />
                <span>SIH26090 Heritage Preservation Impact</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-serif">
                Living Heritage Preservation Metrics
              </h2>
            </div>

            <Link
              href="/vault"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold backdrop-blur-xs transition self-start sm:self-auto"
            >
              <span>Explore National Heritage Vault</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
              <span className="text-3xl font-extrabold font-serif text-amber-300 block">
                {heritageRecordsCount}
              </span>
              <span className="text-xs text-stone-300 mt-1 block">Heritage Records</span>
            </div>

            <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
              <span className="text-3xl font-extrabold font-serif text-amber-300 block">
                {craftStoriesCount}
              </span>
              <span className="text-xs text-stone-300 mt-1 block">Craft Stories Captured</span>
            </div>

            <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
              <span className="text-3xl font-extrabold font-serif text-amber-300 block">
                {techniquesCount}
              </span>
              <span className="text-xs text-stone-300 mt-1 block">Techniques Documented</span>
            </div>

            <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
              <span className="text-3xl font-extrabold font-serif text-amber-300 block">
                {regionsRepresented}
              </span>
              <span className="text-xs text-stone-300 mt-1 block">Regions Represented</span>
            </div>
          </div>
        </div>

        {/* Recent Products Catalog Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold font-serif text-stone-900">
                Studio Catalog Records
              </h2>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-stone-200 text-stone-700">
                {products.length}
              </span>
            </div>
            <Link
              href="/catalogue"
              className="text-sm font-semibold text-[#C2410C] hover:underline flex items-center gap-1"
            >
              <span>View All Market Listings</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          {products.length === 0 ? (
            <Card className="text-center py-16 space-y-4">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto text-[#C2410C]">
                <Package className="w-8 h-8" />
              </div>
              <p className="text-base text-stone-600 font-medium">No products onboarded yet.</p>
              <Link href="/products/new">
                <Button variant="primary">Onboard First Craft Creation</Button>
              </Link>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl craft-border-subtle overflow-hidden flex flex-col hover:shadow-md transition-shadow duration-200"
                >
                  {/* Image & Badges */}
                  <div className="relative h-52 w-full bg-stone-100">
                    <Image
                      src={product.featured_image_url}
                      alt={product.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      <ProductStatusBadge status={product.status} />
                      <GICandidacyBadge
                        status={product.gi_status || product.gi_candidacy_status}
                        demoReference={product.gi_demo_reference}
                      />
                    </div>
                    <div className="absolute bottom-2.5 right-2.5 bg-black/75 backdrop-blur-xs text-white text-xs px-2.5 py-1 rounded-md font-medium">
                      {product.district}, {product.state}
                    </div>
                  </div>

                  {/* Body Details */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="text-xs font-bold text-[#C2410C] uppercase tracking-wide">
                        {product.craft_name}
                      </div>
                      <h3 className="text-base font-bold text-stone-900 font-serif leading-snug line-clamp-2">
                        {language === "hi" && product.title_hi ? product.title_hi : product.title}
                      </h3>
                      <p className="text-xs text-stone-600 line-clamp-2">
                        {language === "hi" && product.description_hi
                          ? product.description_hi
                          : product.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-stone-100 space-y-3">
                      <div className="flex items-baseline justify-between text-xs">
                        <span className="text-stone-500">Fair Price Baseline:</span>
                        <span className="text-sm font-bold text-stone-900">
                          ₹{product.suggested_min_price.toLocaleString("en-IN")} – ₹{product.suggested_max_price.toLocaleString("en-IN")}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Link
                          href={`/products/${product.id}/review`}
                          className="flex-1 text-center py-2 px-3 rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-800 font-semibold text-xs transition"
                        >
                          Review & Edit
                        </Link>
                        <Link
                          href={`/heritage/${product.id}`}
                          className="flex-1 text-center py-2 px-3 rounded-xl bg-stone-900 hover:bg-[#1E3A5F] text-white font-semibold text-xs transition"
                        >
                          Passport
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
