"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, ShieldCheck, ArrowRight, Sparkles, Award } from "lucide-react";
import { ProvenanceBadge } from "@/components/ui/Badge";

interface CraftCluster {
  state: string;
  region: string;
  craftName: string;
  category: string;
  artisan: string;
  lineage: string;
  technique: string;
  imageUrl: string;
  productId: string;
  giState: "GI Registered Craft" | "GI Candidate — Verification Required";
  craftStatus: string;
}

const CRAFT_CLUSTERS: CraftCluster[] = [
  {
    state: "Chhattisgarh",
    region: "Kondagaon, Bastar",
    craftName: "Bastar Dhokra",
    category: "metalwork",
    artisan: "Shanti Devi & Budhram Baghel",
    lineage: "Ghadwa tribal metallurgy lineage (5th Gen)",
    technique: "Cire-Perdue (Lost-wax casting) with hand-wound beeswax filigree over termite clay core",
    imageUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80",
    productId: "prod-dokra-01",
    giState: "GI Registered Craft",
    craftStatus: "GI-Registered Craft",
  },
  {
    state: "Rajasthan",
    region: "Kot Jewar, Jaipur",
    craftName: "Jaipur Blue Pottery",
    category: "pottery",
    artisan: "Ramesh Kripal",
    lineage: "Kot Jewar Pottery Guild (Kripal Kumbh tradition)",
    technique: "Clay-free quartz dough molding, hand-smoothing, cobalt & turquoise oxide freehand glazing",
    imageUrl: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=800&q=80",
    productId: "prod-blue-pottery-02",
    giState: "GI Registered Craft",
    craftStatus: "GI-Registered Craft",
  },
  {
    state: "Bihar",
    region: "Ranti, Madhubani",
    craftName: "Madhubani Painting",
    category: "paintings",
    artisan: "Sita Devi",
    lineage: "Ranti Village Women's Painting Collective",
    technique: "Freehand bamboo twig linework, double-line framing, botanical dyes on handmade cotton paper",
    imageUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80",
    productId: "prod-madhubani-03",
    giState: "GI Registered Craft",
    craftStatus: "GI-Registered Craft",
  },
  {
    state: "Karnataka",
    region: "Channapatna, Ramanagara",
    craftName: "Channapatna Toys",
    category: "woodwork",
    artisan: "Syed Mubarak",
    lineage: "Gombegala Ooru Traditional Woodturners",
    technique: "Lathe woodturning of sustainable Hale wood, friction-heat melting of food-grade natural seedlac",
    imageUrl: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=800&q=80",
    productId: "prod-channapatna-04",
    giState: "GI Registered Craft",
    craftStatus: "GI-Registered Craft",
  },
  {
    state: "Uttar Pradesh",
    region: "Madanpura, Varanasi",
    craftName: "Banarasi Silk Brocade",
    category: "textiles",
    artisan: "Mustaqeem Ansari & Brothers",
    lineage: "Madanpura Handloom Master Weavers (4th Gen)",
    technique: "Fekua & Kadhwa pit-loom weaving with mulberry silk warps and supplementary metallic zari floats",
    imageUrl: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
    productId: "prod-banarasi-05",
    giState: "GI Registered Craft",
    craftStatus: "GI-Registered Craft",
  },
  {
    state: "Gujarat",
    region: "Nirona, Kutch",
    craftName: "Kutch Rogan & Embroidery",
    category: "textiles",
    artisan: "Khatri Abdul Gafur",
    lineage: "Nirona Rogan Master Clan (8th Gen)",
    technique: "Castor seed oil boiled for 48 hours into resin paste, guided in mid-air onto fabric with iron stylus",
    imageUrl: "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=800&q=80",
    productId: "prod-kutch-06",
    giState: "GI Registered Craft",
    craftStatus: "GI-Registered Craft",
  },
  {
    state: "Odisha",
    region: "Raghurajpur, Puri",
    craftName: "Raghurajpur Pattachitra",
    category: "paintings",
    artisan: "Rabindra Maharana",
    lineage: "Raghurajpur Chitrakar Lineage (6th Gen)",
    technique: "Tala Pattachitra: cured palm leaves incised with iron stylus (lekhani) and rubbed with lamp soot",
    imageUrl: "https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?auto=format&fit=crop&w=800&q=80",
    productId: "prod-pattachitra-07",
    giState: "GI Registered Craft",
    craftStatus: "GI-Registered Craft",
  },
  {
    state: "Jammu & Kashmir",
    region: "Zadibal, Srinagar",
    craftName: "Kashmiri Papier-Mâché",
    category: "woodwork",
    artisan: "Ghulam Nabi & Family",
    lineage: "Zadibal Papier-Mâché Ustad Tradition",
    technique: "Sakhtsazi molded paper pulp base burnished with agate stone, finished with 24k gold leaf Naqqashi",
    imageUrl: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80",
    productId: "prod-kashmiri-08",
    giState: "GI Registered Craft",
    craftStatus: "GI-Registered Craft",
  },
];

export const CraftExplorer: React.FC = () => {
  const [selectedClusterIndex, setSelectedClusterIndex] = useState(0);
  const activeCluster = CRAFT_CLUSTERS[selectedClusterIndex];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 craft-border-subtle shadow-xs space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-100 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-[#9A3412] text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#C2410C]" />
            <span>State → Craft → Heritage Record → Artisan</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold font-serif text-stone-900">
            Explore India&apos;s Living Craft Heritage
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Discover indigenous craft knowledge preserved across 8 states and documented in the KarigarSetu Living Heritage Vault
          </p>
        </div>

        <Link
          href="/vault"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-[#1E3A5F] text-white font-semibold text-xs transition shrink-0"
        >
          <Award className="w-4 h-4 text-emerald-400" />
          <span>Full Heritage Vault</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* State & Craft Selector Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
        {CRAFT_CLUSTERS.map((cluster, idx) => {
          const isSelected = selectedClusterIndex === idx;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedClusterIndex(idx)}
              className={`p-2.5 rounded-xl text-left transition cursor-pointer border ${
                isSelected
                  ? "border-[#C2410C] bg-[#FFF7ED] shadow-2xs"
                  : "border-stone-200 hover:border-stone-300 bg-[#FAF7F2]"
              }`}
            >
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#C2410C] truncate">
                {cluster.state}
              </div>
              <div className="text-xs font-bold text-stone-900 truncate mt-0.5">
                {cluster.craftName}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Cluster Spotlight Card */}
      <div className="bg-[#FAF7F2] rounded-2xl p-6 border border-stone-200 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Visual Preview */}
        <div className="lg:col-span-5 relative h-64 sm:h-72 w-full rounded-xl overflow-hidden shadow-xs">
          <Image
            src={activeCluster.imageUrl}
            alt={activeCluster.craftName}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 40vw"
          />
          <div className="absolute top-3 left-3">
            <ProvenanceBadge label={activeCluster.giState} size="sm" />
          </div>
          <div className="absolute bottom-3 right-3 bg-black/75 backdrop-blur-xs text-white text-xs px-2.5 py-1 rounded-md font-medium flex items-center gap-1">
            <MapPin className="w-3 h-3 text-[#C2410C]" />
            {activeCluster.region}
          </div>
        </div>

        {/* Detailed Metadata Breakdown */}
        <div className="lg:col-span-7 space-y-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold text-[#C2410C] uppercase tracking-wider">
              <span>{activeCluster.state}</span>
              <span>•</span>
              <span className="text-stone-500 font-mono text-[11px]">{activeCluster.craftStatus}</span>
            </div>
            <h4 className="text-2xl font-bold font-serif text-stone-900">
              {activeCluster.craftName}
            </h4>
            <div className="text-xs text-stone-600">
              Preserved by <strong className="text-stone-900">{activeCluster.artisan}</strong> ({activeCluster.lineage})
            </div>
          </div>

          <div className="p-3.5 bg-white rounded-xl border border-stone-200 text-xs space-y-1">
            <span className="font-bold text-stone-900 block">Documented Traditional Technique:</span>
            <p className="text-stone-700 leading-relaxed">{activeCluster.technique}</p>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href={`/heritage/${activeCluster.productId}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#C2410C] hover:bg-[#9A3412] text-white font-bold text-xs shadow-xs transition"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Inspect Heritage Passport</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              href={`/catalogue?category=${activeCluster.category}`}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 text-stone-800 font-semibold text-xs transition"
            >
              <span>View Market Listing</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
