import React from "react";
import { Header } from "@/components/public/Header";
import { Footer } from "@/components/public/Footer";
import { prisma } from "@/lib/db";

export default async function RefundPage() {
  const settings = await prisma.setting.findFirst() || {};

  return (
    <div className="flex flex-col min-h-screen">
      <Header settings={settings} />

      <section className="max-w-4xl mx-auto px-6 py-32 space-y-8 bg-white my-12 rounded-3xl border border-neutral/10">
        <h1 className="font-display font-bold text-3xl md:text-5xl tracking-tight text-foreground">
          Refund & Cancellation Policy
        </h1>
        <p className="text-xs text-neutral">Last updated: July 15, 2026</p>

        <div className="space-y-6 text-sm text-neutral-800 leading-relaxed font-medium">
          <p>
            We understand that travel plans can change. Here is our refund and cancellation guideline for all tour bookings:
          </p>
          <h3 className="font-bold text-foreground text-lg pt-4">1. Cancellation Timelines</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>30 days or more before arrival:</strong> 90% refund of the advance deposit.</li>
            <li><strong>15 to 29 days before arrival:</strong> 50% refund of the advance deposit.</li>
            <li><strong>Less than 15 days before arrival:</strong> No refund on the advance deposit (due to hotel reservations and vehicle retention costs).</li>
          </ul>
          <h3 className="font-bold text-foreground text-lg pt-4">2. High Peak Seasons</h3>
          <p>
            During peak spiritual festivals (such as Dev Deepawali in Varanasi, Maha Shivratri, or special Kumbh Mela dates), bookings are non-refundable after confirmation, as hotel bookings are 100% non-refundable during these durations.
          </p>
          <h3 className="font-bold text-foreground text-lg pt-4">3. Force Majeure</h3>
          <p>
            In the event of natural disasters, government lockdowns, or sudden river closures by local administration, we will assist in rescheduling the tour to a later date without any additional administrative fee.
          </p>
        </div>
      </section>

      <Footer settings={settings} />
    </div>
  );
}
