import React from "react";
import { Header } from "@/components/public/Header";
import { Footer } from "@/components/public/Footer";
import { prisma } from "@/lib/db";
import { Award, Compass, Heart, Users, MapPin } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export const revalidate = 0;

export default async function AboutPage() {
  const settings = await prisma.setting.findFirst() || {
    phone1: "+91 9450204681",
    whatsapp: "+919450204681"
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header settings={settings} />

      {/* Hero */}
      <section className="relative bg-neutral-900 pt-36 pb-24 text-center text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero.png"
            alt="Varanasi sunrise ghats"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-neutral-950/60" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 space-y-4">
          <span className="text-xs font-bold text-primary uppercase tracking-widest block">
            Our Story & Values
          </span>
          <h1 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl text-white tracking-tight">
            About The Enchanting Holidays
          </h1>
          <p className="max-w-2xl mx-auto text-neutral-300 text-sm md:text-base leading-relaxed">
            Delivering authentic destination management and customized pilgrimage tours for over a decade from the sacred banks of the Ganges.
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-6 space-y-6">
            <h2 className="font-display font-bold text-foreground text-3xl md:text-4xl tracking-tight">
              A Legacy of True Hospitality
            </h2>
            <p className="text-neutral text-sm md:text-base leading-relaxed">
              Based in the timeless city of Varanasi, The Enchanting Holidays was founded by a team of passionate travel professionals with a single mission: to redefine hospitality in India's spiritual heartland.
            </p>
            <p className="text-neutral text-sm md:text-base leading-relaxed">
              For more than 15 years, we have guided families, pilgrims, corporate groups, and international scholars through the ghats of Varanasi, the holy lands of Ayodhya and Prayagraj, and the Buddhist circuit of Bodhgaya. We do not just book hotels and cabs—we curate soulful journeys.
            </p>
            
            {/* Core Values */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
              <div className="flex gap-3">
                <Compass className="w-5 h-5 text-primary shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-foreground text-sm">Authenticity</h4>
                  <p className="text-xs text-neutral">Connecting you to local traditions, rituals, and certified guides.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Heart className="w-5 h-5 text-primary shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-foreground text-sm">Guest Comfort</h4>
                  <p className="text-xs text-neutral">Premium air-conditioned transfers and verified accommodation partners.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative h-[450px] rounded-3xl overflow-hidden shadow-md">
            <img
              src="/images/prayagraj.png"
              alt="Prayagraj Sangam confluence"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Affiliations */}
      <section className="py-20 bg-background border-t border-b border-neutral/10 text-center">
        <div className="max-w-4xl mx-auto px-6 space-y-8">
          <h3 className="font-display font-bold text-foreground text-2xl md:text-3xl tracking-tight">
            Recognitions & Accreditations
          </h3>
          <p className="text-neutral text-sm max-w-2xl mx-auto leading-relaxed">
            The Enchanting Holidays is a fully registered Destination Management Company in compliance with the Ministry of Tourism, Government of India, and local travel authorities.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-4">
            <div className="bg-white border border-neutral/10 p-5 rounded-2xl flex flex-col items-center justify-center space-y-2">
              <Award className="w-8 h-8 text-primary" />
              <span className="text-xs font-bold text-foreground">UP Tourism</span>
              <span className="text-[10px] text-neutral">Recognized Agency</span>
            </div>
            <div className="bg-white border border-neutral/10 p-5 rounded-2xl flex flex-col items-center justify-center space-y-2">
              <Users className="w-8 h-8 text-primary" />
              <span className="text-xs font-bold text-foreground">ABTOI</span>
              <span className="text-[10px] text-neutral">Proud Member</span>
            </div>
            <div className="bg-white border border-neutral/10 p-5 rounded-2xl flex flex-col items-center justify-center space-y-2">
              <MapPin className="w-8 h-8 text-primary" />
              <span className="text-xs font-bold text-foreground">Varanasi Guild</span>
              <span className="text-[10px] text-neutral">Affiliated DMC</span>
            </div>
            <div className="bg-white border border-neutral/10 p-5 rounded-2xl flex flex-col items-center justify-center space-y-2">
              <Compass className="w-8 h-8 text-primary" />
              <span className="text-xs font-bold text-foreground">GST Registered</span>
              <span className="text-[10px] text-neutral">100% Tax Compliant</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-neutral-900 text-center text-white">
        <div className="max-w-2xl mx-auto px-6 space-y-6">
          <h3 className="font-display font-bold text-3xl md:text-4xl text-white">
            Ready to Plan Your Pilgrimage?
          </h3>
          <p className="text-neutral-400 text-sm md:text-base leading-relaxed">
            Let us design a seamless itinerary for you and your family. Speak directly with our operations director or request a callback.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/contact">
              <Button size="md">Request Callback</Button>
            </Link>
            <a href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, "")}`} target="_blank" rel="noopener noreferrer">
              <Button variant="secondary" size="md">
                Chat on WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </section>

      <Footer settings={settings} />
    </div>
  );
}
