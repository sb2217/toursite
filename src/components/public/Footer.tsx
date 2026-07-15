import React from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, Award, CheckCircle } from "lucide-react";

interface FooterProps {
  settings?: {
    phone1?: string | null;
    phone2?: string | null;
    email1?: string | null;
    email2?: string | null;
    address?: string | null;
    facebook?: string | null;
    instagram?: string | null;
    youtube?: string | null;
  };
}

export const Footer: React.FC<FooterProps> = ({ settings }) => {
  const phone1 = settings?.phone1 || "+91 9450204681";
  const phone2 = settings?.phone2 || "+91 6290350925";
  const email1 = settings?.email1 || "info@theenchantingholidays.com";
  const address = settings?.address || "S-19/132-5A, Near PWD Office (Varuna Bridge), Varanasi - 221002, Uttar Pradesh, India";

  const destinations = [
    { name: "Varanasi (Kashi)", href: "/destinations/varanasi" },
    { name: "Ayodhya", href: "/destinations/ayodhya" },
    { name: "Prayagraj (Sangam)", href: "/destinations/prayagraj" },
    { name: "Bodhgaya", href: "/destinations/bodhgaya" },
  ];

  const quickLinks = [
    { name: "About Us", href: "/about" },
    { name: "Tour Packages", href: "/packages" },
    { name: "Travel Blog", href: "/blog" },
    { name: "Contact & Inquiries", href: "/contact" },
  ];

  const policies = [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms & Conditions", href: "/terms" },
    { name: "Refund & Cancellation", href: "/refund" },
  ];

  return (
    <footer className="bg-neutral-900 text-neutral-300 pt-16 pb-8 mt-auto border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand & Trust */}
        <div className="space-y-6">
          <Link href="/" className="flex items-center shrink-0">
            <img
              src="/images/logo.png"
              alt="The Enchanting Holidays"
              className="h-10 w-auto object-contain brightness-0 invert"
            />
          </Link>
          <p className="text-sm text-neutral-400 leading-relaxed">
            Varanasi-based Destination Management Company with 15+ years of expertise. We craft authentic, comfortable, and deeply spiritual journeys across Northern and Eastern India.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <span className="inline-flex items-center gap-1.5 text-xs bg-neutral-800 text-primary border border-neutral-700 px-3 py-1 rounded-full font-medium">
              <Award className="w-3.5 h-3.5" />
              Approved by UP Tourism
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs bg-neutral-800 text-primary border border-neutral-700 px-3 py-1 rounded-full font-medium">
              <CheckCircle className="w-3.5 h-3.5" />
              Member of ABTOI
            </span>
          </div>
        </div>

        {/* Popular Destinations */}
        <div>
          <h3 className="text-white font-display font-bold text-base mb-6 tracking-tight">
            Popular Destinations
          </h3>
          <ul className="space-y-3 text-sm">
            {destinations.map((dest) => (
              <li key={dest.name}>
                <Link
                  href={dest.href}
                  className="hover:text-primary transition-smooth"
                >
                  {dest.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Links & Policies */}
        <div>
          <h3 className="text-white font-display font-bold text-base mb-6 tracking-tight">
            Quick Links
          </h3>
          <ul className="space-y-3 text-sm">
            {quickLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="hover:text-primary transition-smooth"
                >
                  {link.name}
                </Link>
              </li>
            ))}
            {policies.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="text-neutral-500 hover:text-primary transition-smooth text-xs"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-6">
          <h3 className="text-white font-display font-bold text-base tracking-tight">
            Head Office
          </h3>
          <ul className="space-y-4 text-sm">
            <li className="flex gap-3">
              <MapPin className="w-5 h-5 text-primary shrink-0" />
              <span className="text-neutral-400 leading-relaxed">{address}</span>
            </li>
            <li className="flex gap-3">
              <Phone className="w-5 h-5 text-primary shrink-0" />
              <div className="flex flex-col">
                <a href={`tel:${phone1}`} className="hover:text-primary transition-smooth">
                  {phone1}
                </a>
                <a href={`tel:${phone2}`} className="hover:text-primary transition-smooth text-xs text-neutral-500">
                  {phone2}
                </a>
              </div>
            </li>
            <li className="flex gap-3">
              <Mail className="w-5 h-5 text-primary shrink-0" />
              <a href={`mailto:${email1}`} className="hover:text-primary transition-smooth">
                {email1}
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto px-6 border-t border-neutral-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-neutral-500">
        <p>
          © {new Date().getFullYear()} The Enchanting Holidays. All rights reserved.
        </p>
        <p className="flex items-center gap-1.5">
          <span>Crafted with</span>
          <span className="text-primary font-bold text-sm leading-none">♥</span>
          <span>in Varanasi, India</span>
        </p>
      </div>
    </footer>
  );
};
