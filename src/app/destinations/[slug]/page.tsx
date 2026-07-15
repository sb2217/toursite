import React from "react";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { Header } from "@/components/public/Header";
import { Footer } from "@/components/public/Footer";
import { PackageCard } from "@/components/public/PackageCard";
import { InquiryForm } from "@/components/public/InquiryForm";
import { MapPin, Calendar, Compass, Star } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 0;

export default async function DestinationDetailPage({ params }: PageProps) {
  const { slug } = await params;

  // Fetch destination details
  const destination = await prisma.destination.findUnique({
    where: { slug }
  });

  if (!destination) {
    notFound();
  }

  // Fetch related packages
  const relatedPackages = await prisma.package.findMany({
    where: { destinationSlug: slug, status: "PUBLISHED" },
    take: 3
  });

  const settings = await prisma.setting.findFirst() || {};
  const attractions = JSON.parse(destination.attractions);
  const galleryImages = destination.gallery.split(";");

  return (
    <div className="flex flex-col min-h-screen">
      <Header settings={settings} />

      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-end bg-neutral-900 overflow-hidden pb-12 pt-24">
        <div className="absolute inset-0 z-0">
          <img
            src={destination.image}
            alt={destination.name}
            className="w-full h-full object-cover opacity-45 scale-102"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full text-white space-y-3">
          <span className="text-xs font-bold text-primary uppercase tracking-widest block">
            Sacred Destination Guide
          </span>
          <h1 className="font-display font-extrabold text-4xl md:text-6xl text-white tracking-tight">
            {destination.name}
          </h1>
          <div className="flex items-center gap-2 text-xs md:text-sm text-neutral-300">
            <MapPin className="w-4 h-4 text-primary shrink-0" />
            <span>India's Spiritual Heartland</span>
            <span className="text-neutral-500">|</span>
            <Calendar className="w-4 h-4 text-primary shrink-0" />
            <span>Best Time to Visit: {destination.bestTime}</span>
          </div>
        </div>
      </section>

      {/* Overview & Booking */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Main Info */}
          <div className="lg:col-span-7 space-y-12">
            <div className="space-y-4">
              <h2 className="font-display font-bold text-foreground text-3xl tracking-tight">
                About the Sacred City
              </h2>
              <p className="text-neutral text-sm md:text-base leading-relaxed">
                {destination.description}
              </p>
              {destination.whyVisit && (
                <div className="bg-background border border-neutral/10 rounded-2xl p-6 space-y-2 mt-6">
                  <h4 className="font-display font-bold text-primary text-base flex items-center gap-1.5">
                    <Compass className="w-5 h-5 text-primary" />
                    Why You Should Visit
                  </h4>
                  <p className="text-neutral text-xs md:text-sm leading-relaxed">
                    {destination.whyVisit}
                  </p>
                </div>
              )}
            </div>

            {/* Attractions */}
            <div className="space-y-6">
              <h3 className="font-display font-bold text-foreground text-2xl tracking-tight">
                Key Attractions in {destination.name}
              </h3>
              <div className="grid grid-cols-1 gap-6">
                {attractions.map((att: any, idx: number) => (
                  <div
                    key={idx}
                    className="border border-neutral/10 rounded-2xl p-6 bg-background space-y-2"
                  >
                    <h4 className="font-bold text-foreground text-base md:text-lg flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold shrink-0">
                        {idx + 1}
                      </span>
                      {att.name}
                    </h4>
                    <p className="text-neutral text-xs md:text-sm leading-relaxed pl-8">
                      {att.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Image Gallery */}
            <div className="space-y-4">
              <h3 className="font-display font-bold text-foreground text-2xl tracking-tight">
                Visual Gallery
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {galleryImages.map((img, idx) => (
                  <div key={idx} className="h-48 md:h-64 rounded-2xl overflow-hidden bg-neutral-100 shadow-sm">
                    <img
                      src={img}
                      alt={`${destination.name} view ${idx + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-smooth duration-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Inquiry form */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <InquiryForm defaultDestination={destination.name} />
          </div>
        </div>
      </section>

      {/* Related Tour Packages */}
      {relatedPackages.length > 0 && (
        <section className="py-24 bg-background border-t border-b border-neutral/10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="space-y-2 mb-16 text-center md:text-left">
              <span className="text-xs font-bold text-primary uppercase tracking-widest block">
                Itineraries
              </span>
              <h2 className="font-display font-bold text-foreground text-3xl md:text-4xl tracking-tight">
                Related {destination.name} Tour Packages
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPackages.map((pkg) => (
                <PackageCard key={pkg.id} pkg={pkg} />
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer settings={settings} />
    </div>
  );
}
