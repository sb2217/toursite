import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { Header } from "@/components/public/Header";
import { Footer } from "@/components/public/Footer";
import { PackageCard } from "@/components/public/PackageCard";
import { InquiryForm } from "@/components/public/InquiryForm";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { MapPin, Calendar, Award, Shield, Users, Star, ArrowRight } from "lucide-react";

export const revalidate = 0; // Disable caching for development testing

export default async function HomePage() {
  // Fetch settings, destinations, and featured packages from DB on server side
  const settings = await prisma.setting.findFirst() || {
    phone1: "+91 9450204681",
    phone2: "+91 6290350925",
    email1: "info@theenchantingholidays.com",
    whatsapp: "+919450204681",
    address: "S-19/132-5A, Near PWD Office (Varuna Bridge), Varanasi - 221002, Uttar Pradesh, India"
  };

  const destinations = await prisma.destination.findMany({
    where: { isPopular: true },
    take: 3
  });

  const featuredPackages = await prisma.package.findMany({
    where: { isFeatured: true, status: "PUBLISHED" },
    take: 3
  });

  const faqs = [
    {
      title: "What is the best time to visit Varanasi (Kashi)?",
      content: "The best time to visit Varanasi is from October to March, when the temperature is pleasant and ideal for exploring temples, ghats, and heritage walks. Summers (April to June) can be extremely hot, while monsoons (July to September) bring high river tides, restricting boat rides."
    },
    {
      title: "Can I customize the tour packages?",
      content: "Absolutely. Over 80% of our guests choose customized itineraries. You can tailor hotel categories (3-star, 4-star, or luxury heritage), add destinations like Bodhgaya or Ayodhya, adjust days, or arrange private transport. Just fill out our inquiry form or contact us via WhatsApp."
    },
    {
      title: "Do you provide tour guides who speak different languages?",
      content: "Yes, we arrange certified, professional local tour guides who possess deep knowledge of local history, philosophy, and rituals. Language guides (English, Hindi, Bengali, Tamil, etc.) can be arranged upon request."
    },
    {
      title: "How do I secure my booking?",
      content: "Once you align on the itinerary with our travel specialist, we will share a detailed invoice. You can secure your booking by paying a standard advance deposit via bank transfer. The remaining balance is payable upon arrival before the commencement of the services."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header settings={settings} />

      {/* Hero Section */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center bg-neutral-900 overflow-hidden pt-16">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero.png"
            alt="Evening Ganga Aarti in Varanasi"
            className="w-full h-full object-cover opacity-45 scale-102"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-neutral-950/50" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-secondary space-y-6">
          <span className="inline-flex items-center gap-1.5 text-xs md:text-sm bg-primary/20 border border-primary/30 text-primary px-4 py-1.5 rounded-full font-bold uppercase tracking-wider">
            15+ Years of Travel Expertise
          </span>
          <h1 className="font-display font-extrabold text-4xl md:text-6xl lg:text-7xl leading-tight tracking-tight text-white">
            Experience the Spiritual <br className="hidden md:inline" />
            <span className="text-gradient">Heart of India</span>
          </h1>
          <p className="max-w-2xl mx-auto text-neutral-300 text-base md:text-lg leading-relaxed font-medium">
            Immerse yourself in Kashi, Ayodhya, Prayagraj, and Bodhgaya. Professionally managed, fully customized private tours designed around faith, culture, and comfort.
          </p>

          <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/packages">
              <Button size="lg" className="w-full sm:w-auto">
                Explore Tour Packages
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                Request Custom Plan
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Value Proposition / trust signals */}
      <section className="py-16 border-b border-neutral/10 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex gap-4 items-start p-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-display font-bold text-foreground text-lg mb-1">True Hospitality</h3>
              <p className="text-neutral text-sm leading-relaxed">
                Guided by the philosophy of true care, we guarantee comfortable stays, modern private vehicles, and expert drivers.
              </p>
            </div>
          </div>
          <div className="flex gap-4 items-start p-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-display font-bold text-foreground text-lg mb-1">Local & Cultural Expertise</h3>
              <p className="text-neutral text-sm leading-relaxed">
                Varanasi-based insights with access to certified guides, priority temple darshan guides, and exclusive ceremonies.
              </p>
            </div>
          </div>
          <div className="flex gap-4 items-start p-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
              <Award className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-display font-bold text-foreground text-lg mb-1">Government Approved</h3>
              <p className="text-neutral text-sm leading-relaxed">
                A fully licensed Destination Management Company recognized by UP Tourism, the Ministry of Tourism, and ABTOI.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
            <div className="space-y-2">
              <span className="text-xs font-bold text-primary uppercase tracking-widest block">
                Where We Take You
              </span>
              <h2 className="font-display font-bold text-foreground text-3xl md:text-5xl tracking-tight">
                Explore Sacred Destinations
              </h2>
            </div>
            <Link href="/destinations">
              <Button variant="outline" className="flex items-center gap-1.5 group">
                <span>View All Destinations</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {destinations.map((dest) => (
              <Link
                key={dest.id}
                href={`/destinations/${dest.slug}`}
                className="group relative h-96 rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-smooth block"
              >
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                  <h3 className="font-display font-bold text-2xl tracking-tight">
                    {dest.name}
                  </h3>
                  <p className="text-xs text-neutral-300 line-clamp-2 leading-relaxed">
                    {dest.description}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-xs text-primary font-bold pt-2 group-hover:underline">
                    Explore Guides & Tours →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tour Packages */}
      <section className="py-24 bg-white border-t border-b border-neutral/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
            <div className="space-y-2">
              <span className="text-xs font-bold text-primary uppercase tracking-widest block">
                Curated Experiences
              </span>
              <h2 className="font-display font-bold text-foreground text-3xl md:text-5xl tracking-tight">
                Featured Pilgrimage Packages
              </h2>
            </div>
            <Link href="/packages">
              <Button variant="outline" className="flex items-center gap-1.5 group">
                <span>View All Tours</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredPackages.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
        </div>
      </section>

      {/* Trust Counters */}
      <section className="py-20 bg-neutral-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center relative z-10">
          <div className="space-y-2">
            <p className="text-primary font-display font-extrabold text-4xl md:text-5xl">15+</p>
            <p className="text-xs md:text-sm text-neutral-400 font-bold uppercase tracking-wider">
              Years Experience
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-primary font-display font-extrabold text-4xl md:text-5xl">50k+</p>
            <p className="text-xs md:text-sm text-neutral-400 font-bold uppercase tracking-wider">
              Happy Travelers
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-primary font-display font-extrabold text-4xl md:text-5xl">4.9 / 5</p>
            <p className="text-xs md:text-sm text-neutral-400 font-bold uppercase tracking-wider">
              Google Review Rating
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-primary font-display font-extrabold text-4xl md:text-5xl">200+</p>
            <p className="text-xs md:text-sm text-neutral-400 font-bold uppercase tracking-wider">
              Customized Itineraries
            </p>
          </div>
        </div>
      </section>

      {/* Inquiry & FAQs Container */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* FAQs column */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-2">
              <span className="text-xs font-bold text-primary uppercase tracking-widest block">
                Got Questions?
              </span>
              <h2 className="font-display font-bold text-foreground text-3xl md:text-4xl tracking-tight">
                Frequently Asked Questions
              </h2>
            </div>
            <Accordion items={faqs} />
          </div>

          {/* Form column */}
          <div className="lg:col-span-5">
            <InquiryForm />
          </div>
        </div>
      </section>

      <Footer settings={settings} />
    </div>
  );
}
