import React from "react";
import Link from "next/link";
import { Clock, Tag, ArrowRight } from "lucide-react";
import { Button } from "../ui/Button";

export interface PackageData {
  id: string;
  name: string;
  slug: string;
  destinationSlug: string;
  duration: string;
  price: number;
  offerPrice: number | null;
  overview: string;
  highlights: string;
  images: string;
}

interface PackageCardProps {
  pkg: PackageData;
}

export const PackageCard: React.FC<PackageCardProps> = ({ pkg }) => {
  const highlightsList = pkg.highlights.split(";").slice(0, 3);
  const imageUrls = pkg.images.split(";");
  const mainImage = imageUrls[0] || "/images/hero.png";

  return (
    <div className="group border border-neutral/10 rounded-3xl bg-white overflow-hidden shadow-sm hover:shadow-xl transition-smooth flex flex-col h-full">
      {/* Package Image & Badges */}
      <div className="relative h-64 w-full overflow-hidden bg-neutral-100">
        <img
          src={mainImage}
          alt={pkg.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />
        {pkg.offerPrice && (
          <span className="absolute top-4 left-4 bg-primary text-secondary text-xs font-bold px-3.5 py-1.5 rounded-full shadow-sm">
            Save ₹{Math.round(pkg.price - pkg.offerPrice)}
          </span>
        )}
      </div>

      {/* Card Content */}
      <div className="p-6 md:p-8 flex flex-col flex-grow">
        {/* Duration & Price Details */}
        <div className="flex justify-between items-center gap-4 text-xs font-semibold text-neutral mb-3 uppercase tracking-wider">
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-primary" />
            {pkg.duration}
          </span>
          <span className="flex items-center gap-1.5">
            <Tag className="w-4 h-4 text-primary" />
            {pkg.destinationSlug}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-display font-bold text-foreground text-xl md:text-2xl mb-3 tracking-tight group-hover:text-primary transition-smooth line-clamp-1">
          {pkg.name}
        </h3>

        {/* Overview */}
        <p className="text-neutral text-sm leading-relaxed mb-6 line-clamp-2">
          {pkg.overview}
        </p>

        {/* Bullet Highlights */}
        <ul className="space-y-2 mb-8 mt-auto">
          {highlightsList.map((highlight, idx) => (
            <li key={idx} className="flex items-start gap-2 text-xs text-foreground/80 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>

        {/* Pricing CTA */}
        <div className="border-t border-neutral/5 pt-6 flex items-center justify-between gap-4 mt-auto">
          <div className="flex flex-col">
            <span className="text-[10px] text-neutral font-bold uppercase tracking-widest">
              Starting from
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="font-display font-extrabold text-foreground text-xl">
                ₹{pkg.offerPrice || pkg.price}
              </span>
              {pkg.offerPrice && (
                <span className="text-xs text-neutral line-through">
                  ₹{pkg.price}
                </span>
              )}
            </div>
          </div>
          <Link href={`/packages/${pkg.slug}`}>
            <Button size="sm" variant="outline" className="flex items-center gap-1.5 group/btn">
              <span>View Itinerary</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
