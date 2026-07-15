import React from "react";
import { Header } from "@/components/public/Header";
import { Footer } from "@/components/public/Footer";
import { prisma } from "@/lib/db";

export const revalidate = 0;

export default async function TermsPage() {
  const settings = await prisma.setting.findFirst() || {};

  return (
    <div className="flex flex-col min-h-screen">
      <Header settings={settings} />

      <section className="max-w-4xl mx-auto px-6 py-32 space-y-8 bg-white my-12 rounded-3xl border border-neutral/10">
        <h1 className="font-display font-bold text-3xl md:text-5xl tracking-tight text-foreground">
          Terms & Conditions
        </h1>
        <p className="text-xs text-neutral">Last updated: July 15, 2026</p>

        <div className="space-y-6 text-sm text-neutral-800 leading-relaxed font-medium">
          <p>
            Welcome to The Enchanting Holidays. By accessing our services or booking tour itineraries with us, you agree to comply with the following Terms and Conditions.
          </p>
          <h3 className="font-bold text-foreground text-lg pt-4">1. Booking & Confirmations</h3>
          <p>
            To confirm a booking, a standard advance deposit must be processed as specified in your invoice details. Final tour bookings are subject to availability of hotel rooms and vehicle allocation.
          </p>
          <h3 className="font-bold text-foreground text-lg pt-4">2. Tour Rates & Taxes</h3>
          <p>
            All listed prices are subject to seasonal changes and peak festival seasons (like Dev Deepawali in Varanasi). Standard GST registration rates are added to invoices as per government mandates.
          </p>
          <h3 className="font-bold text-foreground text-lg pt-4">3. Traveler Responsibilities</h3>
          <p>
            Travelers must hold valid identity proofs (like Aadhar, Passport, or Voter ID cards) to register at hotels and secure temple darshan passes. We are not responsible for delays caused by train cancellation or heavy road traffic.
          </p>
        </div>
      </section>

      <Footer settings={settings} />
    </div>
  );
}
