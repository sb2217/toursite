"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Login failed");
      }

      router.push("/admin/dashboard");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-4">
        {/* Logo */}
        <div className="flex justify-center">
          <img
            src="/images/logo.png"
            alt="The Enchanting Holidays"
            className="h-14 w-auto object-contain"
          />
        </div>
        <h2 className="text-3xl font-display font-extrabold text-foreground tracking-tight">
          Admin Portal Login
        </h2>
        <p className="text-sm text-neutral font-medium">
          Secure access for travel coordinators and editors.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 border border-neutral/10 rounded-3xl shadow-sm sm:px-10 space-y-6">
          {error && (
            <div className="flex items-center gap-2.5 p-3.5 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-2xl">
              <AlertCircle className="w-5 h-5 shrink-0 text-rose-600" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground/80 block">
                Email Address
              </label>
              <input
                type="email"
                placeholder="admin@enchantingholidays.com"
                {...register("email")}
                className="w-full px-4 py-3 rounded-2xl border border-neutral/20 text-sm focus:outline-none focus:border-primary transition-smooth"
              />
              {errors.email && (
                <p className="text-rose-600 text-xs mt-1">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground/80 block">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                {...register("password")}
                className="w-full px-4 py-3 rounded-2xl border border-neutral/20 text-sm focus:outline-none focus:border-primary transition-smooth"
              />
              {errors.password && (
                <p className="text-rose-600 text-xs mt-1">{errors.password.message}</p>
              )}
            </div>

            <Button type="submit" disabled={isLoading} className="w-full justify-center">
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  <span>Logging in...</span>
                </>
              ) : (
                <span>Access Dashboard</span>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
