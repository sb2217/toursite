import React from "react";
import { Header } from "@/components/public/Header";
import { Footer } from "@/components/public/Footer";
import { prisma } from "@/lib/db";

export default async function PrivacyPage() {
  const settings = await prisma.setting.findFirst() || {};

  return (
    <div className="flex flex-col min-h-screen">
      <Header settings={settings} />

      <section className="max-w-4xl mx-auto px-6 py-32 space-y-8 bg-white my-12 rounded-3xl border border-neutral/10">
        <h1 className="font-display font-bold text-3xl md:text-5xl tracking-tight text-foreground">
          Privacy Policy
        </h1>
        <p className="text-xs text-neutral">Last updated: July 15, 2026</p>

        <div className="space-y-6 text-sm text-neutral-800 leading-relaxed font-medium">
          <p>
            At The Enchanting Holidays, accessible from https://theenchantingholidays.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by us and how we use it.
          </p>
          <h3 className="font-bold text-foreground text-lg pt-4">1. Information We Collect</h3>
          <p>
            We collect personal information that you provide to us when you fill out an inquiry form, request a custom travel quote, or contact us. This may include your name, email address, phone number, travel dates, passenger counts, budget, and custom requirements.
          </p>
          <h3 className="font-bold text-foreground text-lg pt-4">2. How We Use Your Information</h3>
          <p>
            We use the information we collect to communicate with you, process your booking requests, customize travel itineraries, and coordinate logistics with our transport and accommodation partners.
          </p>
          <h3 className="font-bold text-foreground text-lg pt-4">3. Data Security</h3>
          <p>
            We implement appropriate safety protocols to safeguard your personal data. We do not sell, trade, or transfer your personally identifiable details to third parties for marketing purposes.
          </p>
        </div>
      </section>

      <Footer settings={settings} />
    </div>
  );
}
