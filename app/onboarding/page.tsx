"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/providers/LanguageContext";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
  Palette,
  MapPin,
  Sparkles,
  ArrowRight,
  BookOpen,
  Languages,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";

export default function OnboardingPage() {
  const { language } = useLanguage();
  const router = useRouter();

  const [formData, setFormData] = useState({
    artisanName: "",
    state: "Chhattisgarh",
    district: "Bastar",
    craftCategory: "metalwork",
    craftName: "Bastar Dhokra",
    preferredLanguage: "hi",
    lineageHistory: "",
    guildAffiliation: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Prefill from active artisan if exists
    try {
      const stored = localStorage.getItem("karigar_active_artisan");
      if (stored) {
        const parsed = JSON.parse(stored);
        setFormData((prev) => ({
          ...prev,
          artisanName: parsed.name || prev.artisanName,
          state: parsed.state || prev.state,
          district: parsed.district || prev.district,
          craftName: parsed.craft || prev.craftName,
        }));
      }
    } catch {}
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const activeArtisan = {
      id: `artisan-${Date.now()}`,
      name: formData.artisanName || "Master Artisan",
      craft: formData.craftName,
      category: formData.craftCategory,
      state: formData.state,
      district: formData.district,
      language: formData.preferredLanguage,
      lineage: formData.lineageHistory,
      guild: formData.guildAffiliation,
      onboarding_completed: true,
    };

    localStorage.setItem("karigar_active_artisan", JSON.stringify(activeArtisan));

    setTimeout(() => {
      setLoading(false);
      router.push("/dashboard");
    }, 600);
  };

  return (
    <div className="flex-1 flex items-center justify-center px-4 py-12 bg-[#FAF7F2]">
      <div className="w-full max-w-2xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex w-12 h-12 rounded-2xl bg-[#C2410C] items-center justify-center text-white shadow-md mx-auto">
            <Palette className="w-6 h-6" />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-[#9A3412] text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-[#C2410C]" />
            <span>Profile Onboarding • Step 2 of 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif text-stone-900">
            {language === "hi" ? "कारीगर प्रोफाइल ऑनबोर्डिंग" : "Artisan Heritage Profile"}
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
            {language === "hi"
              ? "अपनी शिल्प विरासत और क्षेत्रीय विवरण दर्ज करें। यह डिजिटल पासपोर्ट और बाज़ार लिस्टिंग में उपयोग किया जाएगा।"
              : "Tell us about your traditional craft and lineage. This powers your Digital Heritage Passport and market visibility."}
          </p>
        </div>

        <Card className="space-y-6 border border-[#E7E0D3] p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* 1. Artisan Name & Language */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                  {language === "hi" ? "कारीगर का पूरा नाम" : "Master Artisan Full Name"}
                </label>
                <input
                  type="text"
                  required
                  value={formData.artisanName}
                  onChange={(e) => setFormData({ ...formData, artisanName: e.target.value })}
                  placeholder={language === "hi" ? "उदा. शांति देवी" : "e.g. Shanti Devi"}
                  className="w-full px-4 py-3 rounded-xl border border-stone-300 text-stone-900 placeholder-stone-400 focus:ring-2 focus:ring-[#C2410C] text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                  {language === "hi" ? "पसंदीदा बोलचाल की भाषा" : "Preferred Spoken Language"}
                </label>
                <div className="relative">
                  <select
                    value={formData.preferredLanguage}
                    onChange={(e) => setFormData({ ...formData, preferredLanguage: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-stone-300 bg-white text-stone-900 focus:ring-2 focus:ring-[#C2410C] text-sm appearance-none"
                  >
                    <option value="hi">हिंदी (Hindi)</option>
                    <option value="en">English</option>
                    <option value="bn">বাংলা (Bengali)</option>
                    <option value="te">తెలుగు (Telugu)</option>
                    <option value="ta">தமிழ் (Tamil)</option>
                    <option value="mr">मराठी (Marathi)</option>
                    <option value="gu">ગુજરાતી (Gujarati)</option>
                    <option value="kn">ಕನ್ನಡ (Kannada)</option>
                    <option value="or">ଓଡ଼ିଆ (Odia)</option>
                  </select>
                  <Languages className="w-4 h-4 text-stone-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* 2. State and District */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                  {language === "hi" ? "राज्य" : "State"}
                </label>
                <select
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-stone-300 bg-white text-stone-900 focus:ring-2 focus:ring-[#C2410C] text-sm"
                >
                  <option value="Chhattisgarh">Chhattisgarh</option>
                  <option value="Rajasthan">Rajasthan</option>
                  <option value="Bihar">Bihar</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="Odisha">Odisha</option>
                  <option value="Jammu & Kashmir">Jammu & Kashmir</option>
                  <option value="West Bengal">West Bengal</option>
                  <option value="Madhya Pradesh">Madhya Pradesh</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                  {language === "hi" ? "ज़िला / शिल्प क्लस्टर" : "District / Craft Cluster"}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    placeholder="Bastar / Jaipur / Madhubani / Puri"
                    className="w-full px-4 py-3 rounded-xl border border-stone-300 text-stone-900 placeholder-stone-400 focus:ring-2 focus:ring-[#C2410C] text-sm"
                  />
                  <MapPin className="w-4 h-4 text-stone-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* 3. Craft Tradition & Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                  {language === "hi" ? "शिल्प श्रेणी" : "Craft Category"}
                </label>
                <select
                  value={formData.craftCategory}
                  onChange={(e) => setFormData({ ...formData, craftCategory: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-stone-300 bg-white text-stone-900 focus:ring-2 focus:ring-[#C2410C] text-sm"
                >
                  <option value="metalwork">Bell Metal & Brassware (Dhokra)</option>
                  <option value="pottery">Pottery & Ceramics (Blue Pottery)</option>
                  <option value="paintings">Folk & Tribal Painting (Madhubani / Pattachitra)</option>
                  <option value="woodwork">Woodcraft & Lacquerware (Channapatna / Papier-Mâché)</option>
                  <option value="textiles">Handloom & Weaving (Banarasi / Kutch)</option>
                  <option value="jewellery">Traditional Tribal Jewellery</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                  {language === "hi" ? "पारंपरिक शिल्प का नाम" : "Traditional Craft Name"}
                </label>
                <input
                  type="text"
                  required
                  value={formData.craftName}
                  onChange={(e) => setFormData({ ...formData, craftName: e.target.value })}
                  placeholder="e.g. Bastar Dhokra / Jaipur Blue Pottery"
                  className="w-full px-4 py-3 rounded-xl border border-stone-300 text-stone-900 placeholder-stone-400 focus:ring-2 focus:ring-[#C2410C] text-sm"
                />
              </div>
            </div>

            {/* 4. Optional Heritage Lineage & Guild */}
            <div className="pt-2 border-t border-stone-200/80 space-y-4">
              <div className="flex items-center gap-1.5 text-xs font-bold text-stone-700 uppercase tracking-wider">
                <BookOpen className="w-3.5 h-3.5 text-[#C2410C]" />
                <span>{language === "hi" ? "वैकल्पिक धरोहर विवरण" : "Optional Heritage Information"}</span>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-600 mb-1">
                  {language === "hi" ? "कारीगर घराना / पीढ़ीगत परंपरा" : "Artisan Lineage & Generational Tradition"}
                </label>
                <input
                  type="text"
                  value={formData.lineageHistory}
                  onChange={(e) => setFormData({ ...formData, lineageHistory: e.target.value })}
                  placeholder="e.g. 5th Generation Ghadwa tribal metallurgy lineage"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-stone-900 placeholder-stone-400 focus:ring-2 focus:ring-[#C2410C] text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-600 mb-1">
                  {language === "hi" ? "शिल्प संघ / सहकारी समिति संबद्धता" : "Guild / Cooperative Affiliation (Optional)"}
                </label>
                <input
                  type="text"
                  value={formData.guildAffiliation}
                  onChange={(e) => setFormData({ ...formData, guildAffiliation: e.target.value })}
                  placeholder="e.g. Bastar Tribal Artisans Welfare Cooperative"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-stone-900 placeholder-stone-400 focus:ring-2 focus:ring-[#C2410C] text-xs"
                />
              </div>
            </div>

            {/* Privacy & Provenance note */}
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-start gap-2 text-xs text-stone-600">
              <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <span>
                <strong>Heritage Privacy & Dignity:</strong> Your information remains under your sovereign control.
                KarigarSetu never shares your data with unauthorized commercial intermediaries.
              </span>
            </div>

            <Button
              type="submit"
              isLoading={loading}
              className="w-full text-base font-bold min-h-[50px] shadow-md hover:shadow-lg"
            >
              <span>{language === "hi" ? "ऑनबोर्डिंग पूर्ण करें एवं नियंत्रण कक्ष में जाएं" : "Complete Profile & Enter Studio"}</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </form>
        </Card>

        <div className="text-center text-xs text-stone-500">
          <span>Already completed your profile? </span>
          <Link href="/dashboard" className="font-bold text-[#C2410C] hover:underline">
            Go to Artisan Studio Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
