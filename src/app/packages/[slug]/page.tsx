import React from "react";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { Header } from "@/components/public/Header";
import { Footer } from "@/components/public/Footer";
import { InquiryForm } from "@/components/public/InquiryForm";
import { Button } from "@/components/ui/Button";
import { Clock, Tag, ShieldCheck, HelpCircle, PhoneCall, MessageSquare, Hotel, Car, UtensilsCrossed } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 0;

export default async function PackageDetailPage({ params }: PageProps) {
  const { slug } = await params;

  // Fetch package details
  const pkg = await prisma.package.findUnique({
    where: { slug }
  });

  if (!pkg) {
    notFound();
  }

  const settings = await prisma.setting.findFirst() || {
    phone1: "+91 9450204681",
    whatsapp: "+919450204681"
  };

  const images = pkg.images.split(";");
  const mainImage = images[0] || "/images/hero.png";
  const highlights = pkg.highlights.split(";");
  const inclusions = pkg.inclusions.split(";");
  const exclusions = pkg.exclusions.split(";");
  const itinerary = JSON.parse(pkg.itinerary);

  const whatsappMsg = encodeURIComponent(
    `Hi! I would like to inquire about booking the "${pkg.name}" (${pkg.duration}). Please share availability and current rates.`
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Header settings={settings} />

      {/* Hero Banner */}
      <section className="relative h-[55vh] min-h-[350px] flex items-end bg-neutral-900 overflow-hidden pb-12 pt-24">
        <div className="absolute inset-0 z-0">
          <img
            src={mainImage}
            alt={pkg.name}
            className="w-full h-full object-cover opacity-45 scale-102"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full text-white space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-bold bg-primary text-secondary px-3.5 py-1 rounded-full uppercase tracking-wider">
              {pkg.duration}
            </span>
            <span className="text-xs font-semibold bg-white/20 text-white px-3.5 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm">
              {pkg.difficulty} Difficulty
            </span>
          </div>
          <h1 className="font-display font-extrabold text-3xl md:text-5xl lg:text-6xl text-white tracking-tight">
            {pkg.name}
          </h1>
          <div className="flex items-center gap-3 text-xs md:text-sm text-neutral-300">
            <Tag className="w-4 h-4 text-primary shrink-0" />
            <span>Destination: {pkg.destinationSlug}</span>
            <span className="text-neutral-500">|</span>
            <Clock className="w-4 h-4 text-primary shrink-0" />
            <span>Season: {pkg.season}</span>
          </div>
        </div>
      </section>

      {/* Package Specifics & Form */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Main Info Column */}
          <div className="lg:col-span-7 space-y-12">
            
            {/* Overview */}
            <div className="space-y-4">
              <h2 className="font-display font-bold text-foreground text-2xl md:text-3xl tracking-tight">
                Tour Overview
              </h2>
              <p className="text-neutral text-sm md:text-base leading-relaxed">
                {pkg.overview}
              </p>
            </div>

            {/* Highlights */}
            <div className="space-y-4">
              <h3 className="font-display font-bold text-foreground text-xl md:text-2xl tracking-tight">
                Tour Highlights
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {highlights.map((hl, idx) => (
                  <div key={idx} className="flex gap-2.5 items-start p-3 border border-neutral/10 bg-background rounded-2xl">
                    <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-xs md:text-sm text-foreground/80 font-medium">{hl}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Day Wise Itinerary */}
            <div className="space-y-6">
              <h3 className="font-display font-bold text-foreground text-xl md:text-2xl tracking-tight">
                Day-by-Day Detailed Itinerary
              </h3>
              <div className="relative border-l border-primary/20 ml-3 pl-8 space-y-10">
                {itinerary.map((day: any, idx: number) => (
                  <div key={idx} className="relative">
                    {/* Circle Node */}
                    <span className="absolute -left-[45px] top-1 w-8 h-8 rounded-full bg-primary border-4 border-white text-white flex items-center justify-center font-bold text-xs shadow-sm">
                      {day.day}
                    </span>
                    <div className="space-y-2">
                      <h4 className="font-display font-bold text-foreground text-lg md:text-xl">
                        {day.title}
                      </h4>
                      <p className="text-neutral text-xs md:text-sm leading-relaxed">
                        {day.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Inclusions & Exclusions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-neutral/10 pt-8">
              {/* Inclusions */}
              <div className="space-y-4">
                <h3 className="font-display font-bold text-foreground text-lg md:text-xl">
                  Inclusions
                </h3>
                <ul className="space-y-3">
                  {inclusions.map((inc, idx) => (
                    <li key={idx} className="flex gap-2.5 items-start text-xs md:text-sm text-foreground/80 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Exclusions */}
              <div className="space-y-4">
                <h3 className="font-display font-bold text-foreground text-lg md:text-xl">
                  Exclusions
                </h3>
                <ul className="space-y-3">
                  {exclusions.map((exc, idx) => (
                    <li key={idx} className="flex gap-2.5 items-start text-xs md:text-sm text-neutral/80 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0" />
                      <span>{exc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Travel Comfort Info (Hotels, Transport, Meals) */}
            <div className="border-t border-neutral/10 pt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              {pkg.hotelInfo && (
                <div className="space-y-2">
                  <h4 className="font-bold text-foreground text-sm flex items-center gap-1.5">
                    <Hotel className="w-4 h-4 text-primary shrink-0" />
                    Accommodation
                  </h4>
                  <p className="text-xs text-neutral leading-relaxed">{pkg.hotelInfo}</p>
                </div>
              )}
              {pkg.transportInfo && (
                <div className="space-y-2">
                  <h4 className="font-bold text-foreground text-sm flex items-center gap-1.5">
                    <Car className="w-4 h-4 text-primary shrink-0" />
                    Transportation
                  </h4>
                  <p className="text-xs text-neutral leading-relaxed">{pkg.transportInfo}</p>
                </div>
              )}
              {pkg.mealsInfo && (
                <div className="space-y-2">
                  <h4 className="font-bold text-foreground text-sm flex items-center gap-1.5">
                    <UtensilsCrossed className="w-4 h-4 text-primary shrink-0" />
                    Meal Plan
                  </h4>
                  <p className="text-xs text-neutral leading-relaxed">{pkg.mealsInfo}</p>
                </div>
              )}
            </div>
          </div>

          {/* Form & Direct Actions Column */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
            
            {/* Quick Price Actions */}
            <div className="border border-neutral/10 rounded-3xl p-6 bg-background space-y-4">
              <div className="flex justify-between items-baseline">
                <span className="text-xs text-neutral font-bold uppercase tracking-wider">
                  Starting Package Price:
                </span>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-display font-extrabold text-foreground text-3xl">
                    ₹{pkg.offerPrice || pkg.price}
                  </span>
                  {pkg.offerPrice && (
                    <span className="text-sm text-neutral line-through">
                      ₹{pkg.price}
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <a
                  href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, "")}?text=${whatsappMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 p-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-bold text-xs md:text-sm transition-smooth shadow-sm"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Us</span>
                </a>
                <a
                  href={`tel:${settings.phone1}`}
                  className="flex items-center justify-center gap-2 p-3 border border-neutral/20 hover:bg-neutral/5 text-foreground rounded-2xl font-bold text-xs md:text-sm transition-smooth"
                >
                  <PhoneCall className="w-4 h-4 text-primary" />
                  <span>Call Agent</span>
                </a>
              </div>
            </div>

            {/* Custom Inquiry Form */}
            <InquiryForm defaultDestination={pkg.destinationSlug} defaultPackageSlug={pkg.slug} />
          </div>

        </div>
      </section>

      <Footer settings={settings} />
    </div>
  );
}
