"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, MessageSquare } from "lucide-react";
import { Button } from "../ui/Button";

interface HeaderProps {
  settings?: {
    phone1?: string | null;
    phone2?: string | null;
    whatsapp?: string | null;
  };
}

export const Header: React.FC<HeaderProps> = ({ settings }) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const phone1 = settings?.phone1 || "+91 9450204681";
  const phone2 = settings?.phone2 || "+91 6290350925";
  const whatsapp = settings?.whatsapp || "+919450204681";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Destinations", href: "/destinations" },
    { label: "Tours", href: "/packages" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-smooth ${
        scrolled
          ? "bg-background/95 backdrop-blur-md border-b border-neutral/10 shadow-sm"
          : "bg-transparent"
      }`}
    >
      {/* Dynamic Saffron/Slate Info Banner */}
      <div className={`py-1.5 px-6 text-[10px] sm:text-xs font-semibold border-b transition-smooth flex flex-wrap justify-between items-center gap-2 ${
        scrolled
          ? "bg-slate-900 text-white/90 border-slate-800"
          : "bg-slate-950/85 text-white/80 border-white/5"
      }`}>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <span>WhatsApp Support: <a href="https://wa.me/919450204681" target="_blank" rel="noopener noreferrer" className="hover:underline font-bold text-primary">{phone1}</a></span>
          <span className="text-white/20">|</span>
          <span>Backup: <a href="https://wa.me/916290350925" target="_blank" rel="noopener noreferrer" className="hover:underline font-bold text-primary">{phone2}</a></span>
        </div>
        <span className="text-[9px] uppercase font-bold tracking-wider text-white/40 hidden md:inline">24/7 Spiritual Travel Support</span>
      </div>

      <div className={`max-w-7xl mx-auto px-6 flex justify-between items-center transition-all ${
        scrolled ? "py-2.5" : "py-4"
      }`}>
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <img
            src="/images/logo.png"
            alt="The Enchanting Holidays"
            className={`h-9 sm:h-11 md:h-12 w-auto object-contain transition-smooth ${
              scrolled ? "" : "brightness-0 invert"
            }`}
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-smooth hover:text-primary ${
                  isActive
                    ? "text-primary"
                    : scrolled
                    ? "text-foreground/85 hover:text-primary"
                    : "text-white/85 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href="https://wa.me/919450204681"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-1.5 text-sm font-semibold hover:text-primary transition-smooth ${
              scrolled ? "text-foreground/80" : "text-white/85"
            }`}
          >
            <MessageSquare className="w-4 h-4 text-primary shrink-0" />
            <span>WhatsApp Us</span>
          </a>
          <Link href="/contact">
            <Button size="sm">Plan My Trip</Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-3 lg:hidden">
          <a
            href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-smooth"
            aria-label="WhatsApp Us"
          >
            <MessageSquare className="w-5 h-5" />
          </a>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`p-2 transition-smooth cursor-pointer ${
              scrolled ? "text-foreground hover:text-primary" : "text-white hover:text-white/80"
            }`}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <div
        className={`fixed inset-x-0 bottom-0 top-[90px] z-40 bg-background border-t border-neutral/10 lg:hidden transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 space-y-6 flex flex-col h-full bg-white overflow-y-auto">
          <nav className="space-y-4 flex flex-col">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-lg font-medium p-2 rounded-xl transition-smooth hover:bg-neutral/5 ${
                    isActive ? "text-primary bg-primary/5" : "text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          
          <div className="pt-6 border-t border-neutral/10 space-y-3 mt-auto">
            <a
              href="https://wa.me/919450204681"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 p-3.5 bg-primary text-secondary rounded-2xl font-bold hover:opacity-95 transition-smooth text-sm shadow-sm"
            >
              <MessageSquare className="w-5 h-5 shrink-0" />
              <span>WhatsApp Primary: {phone1}</span>
            </a>
            <a
              href="https://wa.me/916290350925"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 p-3.5 border border-neutral/20 rounded-2xl font-semibold hover:bg-neutral/5 transition-smooth text-sm text-foreground"
            >
              <MessageSquare className="w-5 h-5 text-primary shrink-0" />
              <span>WhatsApp Backup: {phone2}</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
