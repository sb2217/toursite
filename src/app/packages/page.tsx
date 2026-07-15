import React from "react";
import { prisma } from "@/lib/db";
import { Header } from "@/components/public/Header";
import { Footer } from "@/components/public/Footer";
import { PackageCard } from "@/components/public/PackageCard";

export const revalidate = 0;

export default async function PackagesPage() {
  const settings = await prisma.setting.findFirst() || {};
  const packages = await prisma.package.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { price: "asc" }
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Header settings={settings} />

      {/* Hero */}
      <section className="relative bg-neutral-900 pt-36 pb-24 text-center text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero.png"
            alt="Pilgrimage tours India"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-neutral-950/60" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 space-y-4">
          <span className="text-xs font-bold text-primary uppercase tracking-widest block">
            Guided Tours
          </span>
          <h1 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl text-white tracking-tight">
            Our Spiritual & Cultural Packages
          </h1>
          <p className="max-w-2xl mx-auto text-neutral-300 text-sm md:text-base leading-relaxed">
            Browse our carefully crafted private itineraries. From one-day Varanasi sightseeing to comprehensive multi-city spiritual triangles.
          </p>
        </div>
      </section>

      {/* Package Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {packages.length === 0 ? (
            <div className="text-center py-12 text-neutral">
              No packages found. Check back later or contact us for a custom plan.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {packages.map((pkg) => (
                <PackageCard key={pkg.id} pkg={pkg} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer settings={settings} />
    </div>
  );
}
