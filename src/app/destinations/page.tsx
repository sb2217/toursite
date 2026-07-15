import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { Header } from "@/components/public/Header";
import { Footer } from "@/components/public/Footer";
import { Button } from "@/components/ui/Button";
import { MapPin, Calendar, Compass } from "lucide-react";

export const revalidate = 0;

export default async function DestinationsPage() {
  const settings = await prisma.setting.findFirst() || {};
  const destinations = await prisma.destination.findMany({
    orderBy: { name: "asc" }
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Header settings={settings} />

      {/* Hero */}
      <section className="relative bg-neutral-900 pt-36 pb-24 text-center text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero.png"
            alt="Spiritual cities in India"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-neutral-950/60" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 space-y-4">
          <span className="text-xs font-bold text-primary uppercase tracking-widest block">
            Sacred Pilgrimages
          </span>
          <h1 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl text-white tracking-tight">
            Our Spiritual Destinations
          </h1>
          <p className="max-w-2xl mx-auto text-neutral-300 text-sm md:text-base leading-relaxed">
            Discover the rich historical heritage and religious significance of Varanasi, Ayodhya, Prayagraj, and Bodhgaya.
          </p>
        </div>
      </section>

      {/* Directory Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {destinations.map((dest) => {
              const attractionsList = JSON.parse(dest.attractions).slice(0, 3);
              return (
                <div
                  key={dest.id}
                  className="group border border-neutral/10 bg-background rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-smooth flex flex-col"
                >
                  <div className="relative h-64 w-full overflow-hidden bg-neutral-100">
                    <img
                      src={dest.image}
                      alt={dest.name}
                      className="w-full h-full object-cover transition-transform duration-750 group-hover:scale-102"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-8 flex flex-col flex-grow space-y-5">
                    <div className="space-y-2">
                      <h2 className="font-display font-bold text-foreground text-2xl md:text-3xl tracking-tight">
                        {dest.name}
                      </h2>
                      <p className="text-neutral text-sm leading-relaxed line-clamp-3">
                        {dest.description}
                      </p>
                    </div>

                    <div className="border-t border-neutral/10 pt-4 space-y-3">
                      <div className="flex items-center gap-2 text-xs font-semibold text-neutral">
                        <Calendar className="w-4 h-4 text-primary" />
                        <span>Best Time: {dest.bestTime}</span>
                      </div>
                      <div className="space-y-1.5">
                        <span className="text-[10px] uppercase font-bold text-neutral tracking-widest block">
                          Top Attractions:
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {attractionsList.map((att: any, idx: number) => (
                            <span
                              key={idx}
                              className="text-xs bg-white border border-neutral/10 px-3 py-1 rounded-full font-medium text-foreground/80"
                            >
                              {att.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 mt-auto">
                      <Link href={`/destinations/${dest.slug}`} className="w-full block">
                        <Button className="w-full justify-center">
                          Explore Guide & Tours
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer settings={settings} />
    </div>
  );
}
