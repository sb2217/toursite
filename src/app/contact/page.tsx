import React from "react";
import { prisma } from "@/lib/db";
import { Header } from "@/components/public/Header";
import { Footer } from "@/components/public/Footer";
import { InquiryForm } from "@/components/public/InquiryForm";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export const revalidate = 0;

export default async function ContactPage() {
  const settings = await prisma.setting.findFirst() || {
    phone1: "+91 9450204681",
    phone2: "+91 6290350925",
    email1: "info@theenchantingholidays.com",
    email2: "enchantingholidaysvns@gmail.com",
    address: "S-19/132-5A, Near PWD Office (Varuna Bridge), Varanasi - 221002, Uttar Pradesh, India"
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header settings={settings} />

      {/* Hero */}
      <section className="relative bg-neutral-900 pt-36 pb-24 text-center text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero.png"
            alt="Contact Enchanting Holidays"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-neutral-950/60" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 space-y-4">
          <span className="text-xs font-bold text-primary uppercase tracking-widest block">
            Get In Touch
          </span>
          <h1 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl text-white tracking-tight">
            Contact Our Travel Experts
          </h1>
          <p className="max-w-2xl mx-auto text-neutral-300 text-sm md:text-base leading-relaxed">
            Have questions about Varanasi Aarti bookings, hotel availability, or custom routes? We are here to help 24/7.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Contact details */}
          <div className="lg:col-span-6 space-y-12">
            <div className="space-y-4">
              <h2 className="font-display font-bold text-foreground text-3xl tracking-tight">
                Our Office & Support Channels
              </h2>
              <p className="text-neutral text-sm md:text-base leading-relaxed">
                Feel free to drop by our main office in Varanasi, call us, or initiate a chat on WhatsApp. We generally respond to form inquiries in under 2 hours.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <h4 className="font-bold text-foreground text-base flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary shrink-0" /> Head Office
                </h4>
                <p className="text-xs md:text-sm text-neutral leading-relaxed">
                  {settings.address}
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-foreground text-base flex items-center gap-2">
                  <Phone className="w-5 h-5 text-primary shrink-0" /> Call Directly
                </h4>
                <div className="flex flex-col text-xs md:text-sm text-neutral">
                  <a href={`tel:${settings.phone1}`} className="hover:text-primary font-medium transition-smooth">
                    {settings.phone1}
                  </a>
                  <a href={`tel:${settings.phone2}`} className="hover:text-primary transition-smooth text-neutral-400">
                    {settings.phone2}
                  </a>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-foreground text-base flex items-center gap-2">
                  <Mail className="w-5 h-5 text-primary shrink-0" /> Email Support
                </h4>
                <div className="flex flex-col text-xs md:text-sm text-neutral">
                  <a href={`mailto:${settings.email1}`} className="hover:text-primary font-medium transition-smooth">
                    {settings.email1}
                  </a>
                  <a href={`mailto:${settings.email2}`} className="hover:text-primary transition-smooth text-neutral-400">
                    {settings.email2}
                  </a>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-foreground text-base flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary shrink-0" /> Business Hours
                </h4>
                <p className="text-xs md:text-sm text-neutral leading-relaxed">
                  Monday – Sunday: 24/7 Operations Support
                </p>
              </div>
            </div>

            {/* Google Map Embed Placeholder */}
            <div className="border border-neutral/10 rounded-3xl overflow-hidden h-[300px] bg-neutral-100 relative shadow-sm">
              {/* Fallback mock map visuals using CSS */}
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-50 p-6 text-center space-y-3">
                <MapPin className="w-12 h-12 text-primary animate-bounce" />
                <h4 className="font-bold text-foreground text-sm">Main Office Location Map</h4>
                <p className="text-xs text-neutral max-w-sm">
                  Varuna Bridge Area, Near PWD Office, Varanasi, Uttar Pradesh - 221002
                </p>
                <a
                  href="https://maps.google.com/?q=S-19/132-5A+PWD+Office+Varanasi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex text-xs text-primary font-bold hover:underline"
                >
                  Open in Google Maps →
                </a>
              </div>
            </div>
          </div>

          {/* Form column */}
          <div className="lg:col-span-6">
            <InquiryForm />
          </div>

        </div>
      </section>

      <Footer settings={settings} />
    </div>
  );
}
