"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "../ui/Button";

const leadSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  destination: z.string().min(1, "Please select a destination"),
  packageSlug: z.string().optional(),
  travelDate: z.string().optional(),
  adults: z.number().min(1, "At least 1 adult required"),
  children: z.number().min(0),
  budget: z.string().optional(),
  message: z.string().optional(),
});

type LeadFormValues = z.infer<typeof leadSchema>;

interface InquiryFormProps {
  defaultDestination?: string;
  defaultPackageSlug?: string;
  className?: string;
}

export const InquiryForm: React.FC<InquiryFormProps> = ({
  defaultDestination = "",
  defaultPackageSlug = "",
  className = "",
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      destination: defaultDestination,
      packageSlug: defaultPackageSlug,
      travelDate: "",
      adults: 1,
      children: 0,
      budget: "",
      message: "",
    },
  });

  const onSubmit = async (data: LeadFormValues) => {
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(null);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit lead");
      }

      setSubmitSuccess(result.message);
      reset();
    } catch (err: any) {
      console.error(err);
      setSubmitError(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-8 text-center max-w-md mx-auto shadow-sm transition-smooth animate-in fade-in">
        <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
        <h3 className="font-display font-bold text-foreground text-2xl mb-2">
          Inquiry Submitted!
        </h3>
        <p className="text-neutral text-sm leading-relaxed mb-6">
          {submitSuccess}
        </p>
        <Button onClick={() => setSubmitSuccess(null)} size="sm" className="w-full">
          Submit Another Inquiry
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`bg-white border border-neutral/10 rounded-3xl p-6 md:p-8 shadow-sm space-y-5 ${className}`}
    >
      <div className="space-y-1">
        <h3 className="font-display font-bold text-foreground text-xl md:text-2xl">
          Plan Your Custom Journey
        </h3>
        <p className="text-neutral text-xs leading-none">
          Fill out this form and a travel expert will contact you within 24 hours.
        </p>
      </div>

      {submitError && (
        <div className="flex items-center gap-2.5 p-3.5 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-2xl">
          <AlertCircle className="w-5 h-5 shrink-0 text-rose-600" />
          <span>{submitError}</span>
        </div>
      )}

      {/* Name */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-foreground/80 block">Full Name *</label>
        <input
          type="text"
          placeholder="e.g. Suyash Bajpai"
          {...register("name")}
          className="w-full px-4 py-3 rounded-2xl border border-neutral/20 text-sm focus:outline-none focus:border-primary transition-smooth"
        />
        {errors.name && <p className="text-rose-600 text-xs mt-1">{errors.name.message}</p>}
      </div>

      {/* Email & Phone */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-foreground/80 block">Email Address *</label>
          <input
            type="email"
            placeholder="name@example.com"
            {...register("email")}
            className="w-full px-4 py-3 rounded-2xl border border-neutral/20 text-sm focus:outline-none focus:border-primary transition-smooth"
          />
          {errors.email && <p className="text-rose-600 text-xs mt-1">{errors.email.message}</p>}
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-foreground/80 block">Phone Number *</label>
          <input
            type="tel"
            placeholder="e.g. +91 98765 43210"
            {...register("phone")}
            className="w-full px-4 py-3 rounded-2xl border border-neutral/20 text-sm focus:outline-none focus:border-primary transition-smooth"
          />
          {errors.phone && <p className="text-rose-600 text-xs mt-1">{errors.phone.message}</p>}
        </div>
      </div>

      {/* Destination & Package */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-foreground/80 block">Destination *</label>
          <select
            {...register("destination")}
            className="w-full px-4 py-3 rounded-2xl border border-neutral/20 text-sm focus:outline-none focus:border-primary transition-smooth bg-white"
          >
            <option value="">Select Destination</option>
            <option value="Varanasi">Varanasi (Kashi)</option>
            <option value="Ayodhya">Ayodhya</option>
            <option value="Prayagraj">Prayagraj (Sangam)</option>
            <option value="Bodhgaya">Bodhgaya</option>
            <option value="Spiritual Triangle">Spiritual Triangle (Varanasi-Prayagraj-Ayodhya)</option>
          </select>
          {errors.destination && (
            <p className="text-rose-600 text-xs mt-1">{errors.destination.message}</p>
          )}
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-foreground/80 block">Travel Date</label>
          <input
            type="date"
            {...register("travelDate")}
            className="w-full px-4 py-3 rounded-2xl border border-neutral/20 text-sm focus:outline-none focus:border-primary transition-smooth"
          />
        </div>
      </div>

      {/* Adults & Children */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground/80 block">Adults *</label>
            <input
              type="number"
              min="1"
              {...register("adults", { valueAsNumber: true })}
              className="w-full px-4 py-3 rounded-2xl border border-neutral/20 text-sm focus:outline-none focus:border-primary transition-smooth"
            />
            {errors.adults && <p className="text-rose-600 text-xs mt-1">{errors.adults.message}</p>}
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground/80 block">Children</label>
            <input
              type="number"
              min="0"
              {...register("children", { valueAsNumber: true })}
              className="w-full px-4 py-3 rounded-2xl border border-neutral/20 text-sm focus:outline-none focus:border-primary transition-smooth"
            />
          </div>
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-foreground/80 block">Estimated Budget (Per Person)</label>
          <select
            {...register("budget")}
            className="w-full px-4 py-3 rounded-2xl border border-neutral/20 text-sm focus:outline-none focus:border-primary transition-smooth bg-white"
          >
            <option value="">Select Budget</option>
            <option value="Under ₹10,000">Under ₹10,000</option>
            <option value="₹10,000 - ₹20,000">₹10,000 - ₹20,000</option>
            <option value="₹20,000 - ₹50,000">₹20,000 - ₹50,000</option>
            <option value="Over ₹50,000">Over ₹50,000</option>
          </select>
        </div>
      </div>

      {/* Message */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-foreground/80 block">Custom Requirements</label>
        <textarea
          rows={3}
          placeholder="Let us know if you need specific hotel levels, wheelchair assistance, or custom routes..."
          {...register("message")}
          className="w-full px-4 py-3 rounded-2xl border border-neutral/20 text-sm focus:outline-none focus:border-primary transition-smooth resize-none"
        />
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full justify-center">
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            <span>Submitting Inquiry...</span>
          </>
        ) : (
          <span>Request Custom Plan</span>
        )}
      </Button>
    </form>
  );
};
