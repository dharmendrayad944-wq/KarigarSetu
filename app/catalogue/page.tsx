"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/components/providers/LanguageContext";
import { ProductRepository } from "@/lib/db/repository";
import { Product } from "@/lib/db/schema";
import { Card } from "@/components/ui/Card";
import { GICandidacyBadge, ProvenanceBadge } from "@/components/ui/Badge";
import {
  Search,
  MapPin,
  Award,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  Layers,
  Sparkles,
  User,
} from "lucide-react";

export default function CataloguePage() {
  const { t, language } = useLanguage();
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedState, setSelectedState] = useState("all");

  useEffect(() => {
    const list = ProductRepository.getProducts();
    setProducts(list);
  }, []);

  // Filter logic
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      searchTerm === "" ||
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.title_hi && p.title_hi.includes(searchTerm)) ||
      p.craft_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.materials.some((m) => m.toLowerCase().includes(searchTerm.toLowerCase())) ||
      p.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.district.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === "all" || p.category === selectedCategory;
    const matchesState = selectedState === "all" || p.state.toLowerCase() === selectedState.toLowerCase();

    return matchesSearch && matchesCategory && matchesState;
  });

  const availableStates = Array.from(new Set(products.map((p) => p.state))).filter(Boolean);

  return (
    <div className="flex-1 bg-[#FAF7F2] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold">
            <Award className="w-3.5 h-3.5 text-emerald-700" />
            <span>Digital Commerce & Heritage Discovery</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-serif text-stone-900">
            Heritage Market Listings
          </h1>
          <p className="text-stone-600 text-sm sm:text-base">
            Handcrafted creations with verified living heritage profiles, transparent fair-price baselines, and direct artisan attribution.
          </p>
        </div>

        {/* Filter and Search Bar */}
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
                placeholder="Search by craft, material, artisan, or region..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 text-sm text-stone-900 placeholder-stone-400 focus:ring-2 focus:ring-[#C2410C]"
              />
            </div>

            {/* Category Dropdown */}
            <div className="md:col-span-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm font-medium bg-white text-stone-800 focus:ring-2 focus:ring-[#C2410C]"
              >
                <option value="all">All Craft Categories</option>
                <option value="metalwork">Bell Metal & Brassware</option>
                <option value="pottery">Pottery & Ceramics</option>
                <option value="paintings">Folk & Tribal Paintings</option>
                <option value="woodwork">Woodcraft & Lacquerware</option>
                <option value="textiles">Handloom & Textiles</option>
                <option value="jewellery">Traditional Jewellery</option>
              </select>
            </div>

            {/* State Dropdown */}
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

          <div className="flex items-center justify-between text-xs text-stone-500 pt-1">
            <span>Showing {filteredProducts.length} handcrafted items</span>
            {(searchTerm || selectedCategory !== "all" || selectedState !== "all") && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                  setSelectedState("all");
                }}
                className="text-[#C2410C] font-semibold hover:underline cursor-pointer"
              >
                Clear all filters
              </button>
            )}
          </div>
        </div>

        {/* Product Cards Grid: Enhanced with Section 17 Heritage Attributes */}
        {filteredProducts.length === 0 ? (
          <Card className="text-center py-16 space-y-3">
            <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-stone-400">
              <Search className="w-6 h-6" />
            </div>
            <p className="text-stone-600 font-medium">No handcrafted products matched your search.</p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => {
              const record = product.heritage_record || product.heritage_profile;
              const isRegisteredGi =
                product.gi_status === "gi_registered" ||
                product.gi_candidacy_status === "registered_verified";

              return (
                <div
                  key={product.id}
                  className="bg-white rounded-3xl craft-border-subtle overflow-hidden flex flex-col hover:shadow-lg transition-all duration-300 group border border-stone-200"
                >
                  {/* Image Container */}
                  <div className="relative h-60 w-full bg-stone-100 overflow-hidden">
                    <Image
                      src={product.featured_image_url}
                      alt={product.title}
                      fill
                      className="object-cover group-hover:scale-104 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute top-3 left-3 flex flex-col gap-1">
                      <GICandidacyBadge
                        status={product.gi_status || product.gi_candidacy_status}
                        demoReference={product.gi_demo_reference}
                      />
                    </div>
                    <div className="absolute bottom-2.5 right-2.5 bg-black/80 backdrop-blur-xs text-white text-xs px-2.5 py-1 rounded-md font-medium flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#C2410C]" />
                      {product.district}, {product.state}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-[#C2410C] uppercase tracking-wide">
                          {product.craft_name}
                        </span>
                        <span className="text-stone-500 font-medium">{product.state}</span>
                      </div>

                      <h2 className="text-lg font-bold text-stone-900 font-serif leading-snug line-clamp-2">
                        {language === "hi" && product.title_hi ? product.title_hi : product.title}
                      </h2>

                      <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                        {language === "hi" && product.description_hi
                          ? product.description_hi
                          : product.description}
                      </p>
                    </div>

                    {/* Section 17 Heritage Status Indicators */}
                    <div className="p-3 bg-[#FAF7F2] rounded-2xl border border-stone-200 space-y-1.5 text-xs">
                      <div className="flex items-center gap-1.5 text-emerald-800 font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Artisan attributed ({record?.artisan_name || "Master Artisan"})</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-emerald-800 font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Digital heritage profile active</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-stone-700">
                        {isRegisteredGi ? (
                          <>
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span className="font-medium text-emerald-900">
                              {product.gi_demo_reference || "GI registered craft"}
                            </span>
                          </>
                        ) : (
                          <>
                            <AlertTriangle className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                            <span className="text-amber-900 font-medium">GI candidate (Verification required)</span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-stone-100 space-y-3">
                      <div className="flex items-baseline justify-between">
                        <span className="text-xs text-stone-500">Fair Price Range:</span>
                        <span className="text-base font-extrabold text-stone-900 font-serif">
                          ₹{product.suggested_min_price.toLocaleString("en-IN")} – ₹{product.suggested_max_price.toLocaleString("en-IN")}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 pt-1">
                        <Link
                          href={`/heritage/${product.id}`}
                          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-stone-900 hover:bg-[#1E3A5F] text-white font-bold text-xs shadow-xs transition"
                        >
                          <ShieldCheck className="w-4 h-4 text-emerald-300" />
                          <span>View Heritage Passport</span>
                        </Link>

                        <Link
                          href={`/products/${product.id}/review`}
                          className="py-2.5 px-3.5 rounded-xl border border-stone-300 hover:bg-stone-50 text-stone-700 font-semibold text-xs transition"
                        >
                          Review
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
