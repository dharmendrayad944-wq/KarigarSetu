"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/components/providers/LanguageContext";
import { LanguageToggle } from "@/components/ui/LanguageToggle";
import { 
  Palette, 
  PlusCircle, 
  LayoutDashboard, 
  BookOpen, 
  Menu, 
  X,
  Compass,
  Award,
  Sparkles
} from "lucide-react";

export const Navbar: React.FC = () => {
  const { t, language } = useLanguage();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: t.navHome, icon: <Compass className="w-4 h-4" /> },
    { href: "/dashboard", label: t.navDashboard, icon: <LayoutDashboard className="w-4 h-4" /> },
    { href: "/vault", label: t.navVault, icon: <Award className="w-4 h-4 text-emerald-700" /> },
    { href: "/catalogue", label: t.navCatalogue, icon: <BookOpen className="w-4 h-4" /> },
  ];

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E7E0D3] shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group focus:outline-none">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#C2410C] to-[#9A3412] flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105">
              <Palette className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-[#1F2421] font-serif group-hover:text-[#C2410C] transition-colors">
                {language === "hi" ? "कारीगर सेतु" : "KarigarSetu"}
              </span>
              <span className="text-[11px] font-medium text-stone-500 tracking-wider uppercase">
                Artisan AI Onboarding & Heritage Vault
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                  isActive(link.href)
                    ? "bg-[#FFF7ED] text-[#C2410C] font-semibold"
                    : "text-stone-700 hover:bg-[#FAF7F2] hover:text-[#1F2421]"
                }`}
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="hidden sm:flex items-center gap-3">
            <LanguageToggle />

            <Link
              href="/products/new"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#C2410C] hover:bg-[#9A3412] text-white text-sm font-semibold shadow-xs hover:shadow transition cursor-pointer min-h-[44px]"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{t.navAddProduct}</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 sm:hidden">
            <LanguageToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl border border-stone-200 text-stone-700 hover:bg-stone-50 cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-stone-200 bg-white px-4 pt-3 pb-5 space-y-2 shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium ${
                isActive(link.href)
                  ? "bg-[#FFF7ED] text-[#C2410C] font-semibold"
                  : "text-stone-700 hover:bg-stone-50"
              }`}
            >
              {link.icon}
              <span>{link.label}</span>
            </Link>
          ))}
          <div className="pt-2">
            <Link
              href="/products/new"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full px-4 py-3.5 rounded-xl bg-[#C2410C] text-white text-base font-semibold shadow-sm"
            >
              <PlusCircle className="w-5 h-5" />
              <span>{t.navAddProduct}</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
