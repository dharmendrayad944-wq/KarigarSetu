"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/providers/LanguageContext";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Palette, ArrowRight } from "lucide-react";

export default function RegisterPage() {
  const { language } = useLanguage();
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    state: "Rajasthan",
    district: "Jaipur",
    craftCategory: "pottery",
    preferredLanguage: "hi",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem(
        "karigar_active_artisan",
        JSON.stringify({
          id: `artisan-${Date.now()}`,
          name: formData.fullName || "Master Artisan",
          craft: formData.craftCategory,
          state: formData.state,
          district: formData.district,
          language: formData.preferredLanguage,
        })
      );
      router.push("/onboarding");
    }, 600);
  };

  return (
    <div className="flex-1 flex items-center justify-center px-4 py-12 bg-[#FAF7F2]">
      <div className="w-full max-w-lg space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex w-12 h-12 rounded-2xl bg-[#C2410C] items-center justify-center text-white shadow-md mx-auto">
            <Palette className="w-6 h-6" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif text-stone-900">
            {language === "hi" ? "कारीगर पंजीकरण" : "Artisan Registration"}
          </h1>
          <p className="text-sm text-stone-600">
            {language === "hi"
              ? "डिजिटल बाज़ार और विरासत रिकॉर्ड से जुड़ें"
              : "Join India's verified heritage artisan network"}
          </p>
        </div>

        <Card className="space-y-4 border border-[#E7E0D3]">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                {language === "hi" ? "पूरा नाम" : "Full Name"}
              </label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder={language === "hi" ? "उदा. शांति देवी" : "e.g. Shanti Devi"}
                className="w-full px-4 py-3 rounded-xl border border-stone-300 text-stone-900 focus:ring-2 focus:ring-[#C2410C] focus:border-transparent text-base"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                {language === "hi" ? "मोबाइल नंबर" : "Mobile Phone Number"}
              </label>
              <input
                type="tel"
                required
                value={formData.mobile}
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                placeholder="9876543210"
                className="w-full px-4 py-3 rounded-xl border border-stone-300 text-stone-900 focus:ring-2 focus:ring-[#C2410C] focus:border-transparent text-base"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                  {language === "hi" ? "राज्य" : "State"}
                </label>
                <select
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-stone-300 bg-white text-stone-900 focus:ring-2 focus:ring-[#C2410C] text-base"
                >
                  <option value="Rajasthan">Rajasthan</option>
                  <option value="Bihar">Bihar</option>
                  <option value="Chhattisgarh">Chhattisgarh</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="Odisha">Odisha</option>
                  <option value="West Bengal">West Bengal</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                  {language === "hi" ? "ज़िला" : "District"}
                </label>
                <input
                  type="text"
                  required
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  placeholder="Jaipur / Madhubani / Bastar"
                  className="w-full px-4 py-3 rounded-xl border border-stone-300 text-stone-900 focus:ring-2 focus:ring-[#C2410C] text-base"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                  {language === "hi" ? "शिल्प श्रेणी" : "Craft Category"}
                </label>
                <select
                  value={formData.craftCategory}
                  onChange={(e) => setFormData({ ...formData, craftCategory: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-stone-300 bg-white text-stone-900 focus:ring-2 focus:ring-[#C2410C] text-base"
                >
                  <option value="pottery">Pottery & Ceramics</option>
                  <option value="paintings">Folk Painting (Madhubani/Warli)</option>
                  <option value="metalwork">Bell Metal & Brassware</option>
                  <option value="textiles">Handloom & Weaving</option>
                  <option value="woodwork">Woodcraft & Lacquerware</option>
                  <option value="jewellery">Traditional Jewellery</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                  {language === "hi" ? "पसंदीदा भाषा" : "Preferred Language"}
                </label>
                <select
                  value={formData.preferredLanguage}
                  onChange={(e) => setFormData({ ...formData, preferredLanguage: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-stone-300 bg-white text-stone-900 focus:ring-2 focus:ring-[#C2410C] text-base"
                >
                  <option value="hi">हिंदी (Hindi)</option>
                  <option value="en">English</option>
                </select>
              </div>
            </div>

            <Button
              type="submit"
              isLoading={loading}
              className="w-full text-base font-bold min-h-[50px] mt-4"
            >
              <span>{language === "hi" ? "पंजीकरण पूर्ण करें" : "Complete Registration"}</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </form>
        </Card>

        <div className="text-center text-sm text-stone-600">
          <span>{language === "hi" ? "पहले से पंजीकृत हैं? " : "Already have an account? "}</span>
          <Link href="/login" className="font-bold text-[#C2410C] hover:underline">
            {language === "hi" ? "कारीगर प्रवेश करें" : "Sign in here"}
          </Link>
        </div>
      </div>
    </div>
  );
}
