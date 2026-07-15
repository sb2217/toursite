"use client";

import React, { useState, useEffect } from "react";
import { Plus, Search, Loader2, Compass, Edit2, Trash2, ShieldAlert, CheckCircle2, Star } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface ItineraryDay {
  day: number;
  title: string;
  description: string;
}

interface Package {
  id: string;
  name: string;
  slug: string;
  destinationSlug: string;
  duration: string;
  price: number;
  offerPrice: number | null;
  overview: string;
  highlights: string;
  itinerary: string; // JSON string
  inclusions: string;
  exclusions: string;
  hotelInfo: string | null;
  transportInfo: string | null;
  mealsInfo: string | null;
  images: string;
  isFeatured: boolean;
  status: string;
}

export default function AdminPackagesPage() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [filteredPkgs, setFilteredPkgs] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Editor Modal State
  const [isOpen, setIsOpen] = useState(false);
  const [editingPkg, setEditingPkg] = useState<Package | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Form State Fields
  const [name, setName] = useState("");
  const [destinationSlug, setDestinationSlug] = useState("varanasi");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");
  const [overview, setOverview] = useState("");
  const [highlights, setHighlights] = useState("");
  const [inclusions, setInclusions] = useState("");
  const [exclusions, setExclusions] = useState("");
  const [hotelInfo, setHotelInfo] = useState("");
  const [transportInfo, setTransportInfo] = useState("");
  const [mealsInfo, setMealsInfo] = useState("");
  const [images, setImages] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [itineraryDays, setItineraryDays] = useState<ItineraryDay[]>([]);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/packages");
      if (response.ok) {
        const data = await response.json();
        setPackages(data);
        setFilteredPkgs(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Run Search
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredPkgs(packages);
    } else {
      const query = searchQuery.toLowerCase();
      setFilteredPkgs(
        packages.filter(
          (p) =>
            p.name.toLowerCase().includes(query) ||
            p.destinationSlug.toLowerCase().includes(query)
        )
      );
    }
  }, [searchQuery, packages]);

  const openCreateModal = () => {
    setEditingPkg(null);
    setName("");
    setDestinationSlug("varanasi");
    setDuration("");
    setPrice("");
    setOfferPrice("");
    setOverview("");
    setHighlights("");
    setInclusions("");
    setExclusions("");
    setHotelInfo("");
    setTransportInfo("");
    setMealsInfo("");
    setImages("/images/hero.png");
    setIsFeatured(false);
    setItineraryDays([{ day: 1, title: "", description: "" }]);
    setIsOpen(true);
  };

  const openEditModal = (pkg: Package) => {
    setEditingPkg(pkg);
    setName(pkg.name);
    setDestinationSlug(pkg.destinationSlug);
    setDuration(pkg.duration);
    setPrice(pkg.price.toString());
    setOfferPrice(pkg.offerPrice ? pkg.offerPrice.toString() : "");
    setOverview(pkg.overview);
    setHighlights(pkg.highlights);
    setInclusions(pkg.inclusions);
    setExclusions(pkg.exclusions);
    setHotelInfo(pkg.hotelInfo || "");
    setTransportInfo(pkg.transportInfo || "");
    setMealsInfo(pkg.mealsInfo || "");
    setImages(pkg.images);
    setIsFeatured(pkg.isFeatured);
    try {
      setItineraryDays(JSON.parse(pkg.itinerary));
    } catch (e) {
      setItineraryDays([{ day: 1, title: "", description: "" }]);
    }
    setIsOpen(true);
  };

  const handleAddDay = () => {
    const nextDay = itineraryDays.length + 1;
    setItineraryDays([...itineraryDays, { day: nextDay, title: "", description: "" }]);
  };

  const handleRemoveDay = (index: number) => {
    const updated = itineraryDays.filter((_, idx) => idx !== index);
    // Re-index days
    const reindexed = updated.map((day, idx) => ({ ...day, day: idx + 1 }));
    setItineraryDays(reindexed);
  };

  const handleDayChange = (index: number, field: "title" | "description", value: string) => {
    const updated = itineraryDays.map((day, idx) => {
      if (idx === index) {
        return { ...day, [field]: value };
      }
      return day;
    });
    setItineraryDays(updated);
  };

  const handleSavePackage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !duration || !price || !overview) {
      alert("Please fill out all required fields.");
      return;
    }

    setSubmitting(true);
    const bodyPayload = {
      id: editingPkg?.id,
      name,
      destinationSlug,
      duration,
      price: parseFloat(price),
      offerPrice: offerPrice ? parseFloat(offerPrice) : null,
      overview,
      highlights,
      itinerary: JSON.stringify(itineraryDays),
      inclusions,
      exclusions,
      hotelInfo,
      transportInfo,
      mealsInfo,
      images,
      isFeatured,
    };

    try {
      const response = await fetch("/api/packages", {
        method: editingPkg ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyPayload),
      });

      if (response.ok) {
        fetchPackages();
        setIsOpen(false);
      } else {
        const result = await response.json();
        alert(result.error || "Failed to save package");
      }
    } catch (err) {
      console.error(err);
      alert("Error occurred while saving package");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeletePackage = async (id: string) => {
    if (!confirm("Are you sure you want to delete this travel package? This action is irreversible.")) {
      return;
    }

    try {
      const response = await fetch(`/api/packages?id=${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setPackages((prev) => prev.filter((p) => p.id !== id));
      } else {
        alert("Failed to delete package");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-10">
      {/* Title Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <h1 className="font-display font-extrabold text-3xl md:text-4xl tracking-tight text-slate-900">
            Tour Package Manager
          </h1>
          <p className="text-sm text-slate-500 font-medium">
            Manage prices, highlights, dynamic itinerary days, and featured tour settings.
          </p>
        </div>
        <Button onClick={openCreateModal} className="flex items-center gap-1.5">
          <Plus className="w-5 h-5" />
          <span>Add Tour Package</span>
        </Button>
      </div>

      {/* Search Bar */}
      <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="w-4.5 h-4.5 text-slate-400 absolute left-4 top-3.5" />
          <input
            type="text"
            placeholder="Search packages by name or destination..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-100 text-sm bg-slate-50/50 focus:outline-none focus:border-primary transition-smooth focus:bg-white"
          />
        </div>
      </div>

      {/* Package Grid List */}
      {loading ? (
        <div className="text-center py-24 space-y-3">
          <Loader2 className="w-10 h-10 text-primary animate-spin mx-auto" />
          <p className="text-sm text-slate-500 font-medium">Loading tour packages...</p>
        </div>
      ) : filteredPkgs.length === 0 ? (
        <div className="bg-white border border-slate-100 rounded-3xl p-12 text-center text-slate-400 text-sm">
          No travel packages found. Click "Add Tour Package" to create one.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPkgs.map((pkg) => (
            <div key={pkg.id} className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm flex flex-col hover:shadow-md transition-smooth">
              <div className="h-48 relative overflow-hidden bg-slate-100">
                <img
                  src={pkg.images.split(";")[0]}
                  alt={pkg.name}
                  className="w-full h-full object-cover"
                />
                {pkg.isFeatured && (
                  <span className="absolute top-3 right-3 bg-amber-500 text-white p-1.5 rounded-full shadow-sm">
                    <Star className="w-3.5 h-3.5 fill-white" />
                  </span>
                )}
              </div>
              <div className="p-6 flex-grow flex flex-col space-y-4">
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-primary uppercase tracking-widest block">
                    {pkg.destinationSlug} • {pkg.duration}
                  </span>
                  <h3 className="font-display font-bold text-slate-900 text-lg leading-tight truncate">
                    {pkg.name}
                  </h3>
                </div>

                <div className="flex justify-between items-baseline pt-2 mt-auto border-t border-slate-50">
                  <div className="flex items-baseline gap-1">
                    <span className="font-extrabold text-slate-900 text-lg">₹{pkg.offerPrice || pkg.price}</span>
                    {pkg.offerPrice && <span className="text-xs text-slate-400 line-through">₹{pkg.price}</span>}
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => openEditModal(pkg)}
                      className="p-2 text-slate-500 hover:text-primary hover:bg-slate-50 rounded-xl transition-smooth cursor-pointer"
                      title="Edit Tour"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeletePackage(pkg.id)}
                      className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-smooth cursor-pointer"
                      title="Delete Tour"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Editor Side/Fullscreen Drawer Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white border border-slate-100 rounded-3xl w-full max-w-4xl overflow-hidden shadow-xl max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="font-display font-bold text-slate-900 text-xl tracking-tight">
                {editingPkg ? "Edit Tour Package" : "Create Tour Package"}
              </h3>
              <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                ✕
              </button>
            </div>

            {/* Scrollable Form Body */}
            <form onSubmit={handleSavePackage} className="flex-1 p-6 md:p-8 space-y-6 overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Basic Fields */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">General Info</h4>
                  
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-500">Package Name *</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Varanasi 3-Day Pilgrimage"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-500">Destination *</label>
                      <select
                        value={destinationSlug}
                        onChange={(e) => setDestinationSlug(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary bg-white"
                      >
                        <option value="varanasi">Varanasi</option>
                        <option value="ayodhya">Ayodhya</option>
                        <option value="prayagraj">Prayagraj</option>
                        <option value="bodhgaya">Bodhgaya</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-500">Duration *</label>
                      <input
                        type="text"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        placeholder="e.g. 3 Days / 2 Nights"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-500">Base Price (INR) *</label>
                      <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="e.g. 12000"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-500">Offer Price (Optional)</label>
                      <input
                        type="number"
                        value={offerPrice}
                        onChange={(e) => setOfferPrice(e.target.value)}
                        placeholder="e.g. 9999"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <input
                      type="checkbox"
                      id="isFeatured"
                      checked={isFeatured}
                      onChange={(e) => setIsFeatured(e.target.checked)}
                      className="rounded text-primary focus:ring-primary w-4.5 h-4.5"
                    />
                    <label htmlFor="isFeatured" className="text-xs font-semibold text-slate-700 cursor-pointer">
                      Feature on Home Page Carousel
                    </label>
                  </div>
                </div>

                {/* Description & Lists */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Content & Details</h4>
                  
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-500">Overview *</label>
                    <textarea
                      rows={3}
                      value={overview}
                      onChange={(e) => setOverview(e.target.value)}
                      placeholder="Detailed overview about this spiritual experience..."
                      className="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary resize-none"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-500">
                      Highlights (Separate with semicolons ;)
                    </label>
                    <input
                      type="text"
                      value={highlights}
                      onChange={(e) => setHighlights(e.target.value)}
                      placeholder="Ganga Aarti boat ride;Priority Kashi Darshan"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-500">Inclusions (; split)</label>
                      <textarea
                        rows={2}
                        value={inclusions}
                        onChange={(e) => setInclusions(e.target.value)}
                        placeholder="3-star Hotel;AC Cab;Breakfast"
                        className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-primary resize-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-500">Exclusions (; split)</label>
                      <textarea
                        rows={2}
                        value={exclusions}
                        onChange={(e) => setExclusions(e.target.value)}
                        placeholder="Airfare;Personal tips"
                        className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-primary resize-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Day wise timeline editor */}
              <div className="border-t border-slate-100 pt-6 space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Day-by-Day Itinerary Planner
                  </h4>
                  <Button type="button" onClick={handleAddDay} variant="outline" size="sm">
                    + Add Itinerary Day
                  </Button>
                </div>

                <div className="space-y-4">
                  {itineraryDays.map((day, idx) => (
                    <div key={idx} className="border border-slate-100 rounded-2xl p-4 bg-slate-50/50 space-y-3 relative">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-primary text-sm">Day {day.day}</span>
                        {itineraryDays.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveDay(idx)}
                            className="text-slate-400 hover:text-rose-500 text-xs font-semibold cursor-pointer"
                          >
                            Remove Day
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-1 space-y-1">
                          <label className="text-[10px] font-bold text-slate-400 uppercase">Day Title</label>
                          <input
                            type="text"
                            value={day.title}
                            onChange={(e) => handleDayChange(idx, "title", e.target.value)}
                            placeholder="e.g. Arrival & Evening Aarti"
                            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary bg-white"
                            required
                          />
                        </div>
                        <div className="md:col-span-2 space-y-1">
                          <label className="text-[10px] font-bold text-slate-400 uppercase">Day Description</label>
                          <textarea
                            rows={1}
                            value={day.description}
                            onChange={(e) => handleDayChange(idx, "description", e.target.value)}
                            placeholder="Describe activities, hotel check-ins, transfers..."
                            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary bg-white resize-y"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Extra logistics */}
              <div className="border-t border-slate-100 pt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500 font-bold uppercase tracking-wider block">
                    Hotel Info
                  </label>
                  <input
                    type="text"
                    value={hotelInfo}
                    onChange={(e) => setHotelInfo(e.target.value)}
                    placeholder="e.g. 3-star standard heritage hotels"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-primary"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500 font-bold uppercase tracking-wider block">
                    Transport Info
                  </label>
                  <input
                    type="text"
                    value={transportInfo}
                    onChange={(e) => setTransportInfo(e.target.value)}
                    placeholder="e.g. AC Sedan / SUV"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-primary"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500 font-bold uppercase tracking-wider block">
                    Meals Info
                  </label>
                  <input
                    type="text"
                    value={mealsInfo}
                    onChange={(e) => setMealsInfo(e.target.value)}
                    placeholder="e.g. Breakfast included"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              {/* Modal Actions Footer */}
              <div className="pt-6 border-t border-slate-100 flex justify-end gap-3">
                <Button type="button" onClick={() => setIsOpen(false)} variant="secondary" size="sm">
                  Cancel
                </Button>
                <Button type="submit" disabled={submitting} size="sm">
                  {submitting ? "Saving Package..." : "Save Package"}
                </Button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}
