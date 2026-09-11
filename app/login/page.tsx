"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/providers/LanguageContext";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { 
  Palette, 
  Phone, 
  Lock, 
  Sparkles, 
  UserCheck, 
  ArrowRight,
  ShieldCheck,
  User,
  Building2
} from "lucide-react";

export default function LoginPage() {
  const { language } = useLanguage();
  const router = useRouter();
  const [mobileOrEmail, setMobileOrEmail] = useState("");
  const [activeTab, setActiveTab] = useState<"artisan" | "verifier">("artisan");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem(
        "karigar_active_artisan",
        JSON.stringify({
          id: activeTab === "artisan" ? "artisan-shanti-devi" : "verifier-bihar-craft-board",
          name: activeTab === "artisan" ? "Shanti Devi" : "Dr. A. K. Verma (State GI Verifier)",
          role: activeTab,
          craft: "Madhubani Painting",
          state: "Bihar",
          district: "Madhubani",
        })
      );
      router.push(activeTab === "artisan" ? "/dashboard" : "/vault");
    }, 600);
  };

  const handleQuickDemoLogin = (name: string, craft: string, state: string, district: string, role: string = "artisan") => {
    localStorage.setItem(
      "karigar_active_artisan",
      JSON.stringify({
        id: `artisan-${name.toLowerCase().replace(/\s+/g, "-")}`,
        name,
        role,
        craft,
        state,
        district,
      })
    );
    router.push(role === "verifier" ? "/vault" : "/dashboard");
  };

  return (
    <div className="flex-1 flex items-center justify-center px-4 py-12 bg-[#FAF7F2]">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex w-12 h-12 rounded-2xl bg-[#C2410C] items-center justify-center text-white shadow-md mx-auto">
            <Palette className="w-6 h-6" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif text-stone-900">
            {language === "hi" ? "कारीगर एवं पुरालेख प्रवेश" : "Portal Sign In"}
          </h1>
          <p className="text-xs sm:text-sm text-stone-600">
            {language === "hi"
              ? "AI ऑनबोर्डिंग स्टूडियो या धरोहर सत्यापनकर्ता के रूप में प्रवेश करें"
              : "Access the AI Onboarding Studio or Institutional Heritage Vault"}
          </p>
        </div>

        {/* Role Selection Tabs */}
        <div className="grid grid-cols-2 p-1.5 bg-stone-200/70 rounded-2xl">
          <button
            type="button"
            onClick={() => setActiveTab("artisan")}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === "artisan"
                ? "bg-white text-stone-900 shadow-xs"
                : "text-stone-600 hover:text-stone-900"
            }`}
          >
            <User className="w-3.5 h-3.5 text-[#C2410C]" />
            <span>Master Artisan</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("verifier")}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === "verifier"
                ? "bg-white text-stone-900 shadow-xs"
                : "text-stone-600 hover:text-stone-900"
            }`}
          >
            <Building2 className="w-3.5 h-3.5 text-emerald-700" />
            <span>GI Verifier / Council</span>
          </button>
        </div>

        <Card className="space-y-5 border border-[#E7E0D3]">
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                {activeTab === "artisan" ? "Mobile Number (OTP Login)" : "Official Institutional Email / ID"}
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                  <Phone className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  required
                  value={mobileOrEmail}
                  onChange={(e) => setMobileOrEmail(e.target.value)}
                  placeholder={activeTab === "artisan" ? "+91 98765 43210" : "officer@handicrafts.gov.in"}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-stone-300 text-stone-900 placeholder-stone-400 focus:ring-2 focus:ring-[#C2410C] text-base"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                {language === "hi" ? "ओटीपी / सुरक्षा पिन" : "Security PIN / Password"}
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  type="password"
                  placeholder="••••••••"
                  defaultValue="123456"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-stone-300 text-stone-900 placeholder-stone-400 focus:ring-2 focus:ring-[#C2410C] text-base"
                />
              </div>
            </div>

            <Button
              type="submit"
              isLoading={loading}
              className="w-full text-base font-bold min-h-[50px]"
            >
              <span>{activeTab === "artisan" ? "Enter Artisan Studio" : "Open Verification Vault"}</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </form>

          {/* Quick Demo Logins for Hackathon Judges */}
          <div className="pt-3 border-t border-stone-200 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-stone-600">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>SIH Presentation Demo Logins:</span>
            </div>
            
            <button
              type="button"
              onClick={() =>
                handleQuickDemoLogin("Shanti Devi", "Madhubani Painting", "Bihar", "Madhubani", "artisan")
              }
              className="w-full text-left px-3.5 py-2 rounded-xl border border-stone-200 hover:border-[#C2410C] hover:bg-orange-50/60 transition flex items-center justify-between text-xs cursor-pointer group"
            >
              <div>
                <div className="font-bold text-stone-900 group-hover:text-[#C2410C]">
                  Shanti Devi (Artisan Studio)
                </div>
                <div className="text-stone-500">Mithila Painting Artisan, Bihar</div>
              </div>
              <UserCheck className="w-4 h-4 text-emerald-600" />
            </button>

            <button
              type="button"
              onClick={() =>
                handleQuickDemoLogin("State GI Verification Board", "Registry Verification", "National", "New Delhi", "verifier")
              }
              className="w-full text-left px-3.5 py-2 rounded-xl border border-stone-200 hover:border-emerald-600 hover:bg-emerald-50/60 transition flex items-center justify-between text-xs cursor-pointer group"
            >
              <div>
                <div className="font-bold text-stone-900 group-hover:text-emerald-700">
                  Dr. A. K. Verma (State GI Verifier)
                </div>
                <div className="text-stone-500">Examines Candidate GI Claims</div>
              </div>
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
            </button>
          </div>
        </Card>

        <div className="text-center text-sm text-stone-600">
          <span>{language === "hi" ? "नए कारीगर हैं? " : "New craft artisan? "}</span>
          <Link href="/register" className="font-bold text-[#C2410C] hover:underline">
            {language === "hi" ? "निःशुल्क ऑनबोर्डिंग शुरू करें" : "Begin Free AI Onboarding"}
          </Link>
        </div>
      </div>
    </div>
  );
}
