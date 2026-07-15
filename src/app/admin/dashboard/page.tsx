import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { Users, Compass, CheckCircle2, Inbox, Calendar, ArrowRight } from "lucide-react";

export const revalidate = 0;

export default async function AdminDashboardPage() {
  // Query summary statistics
  const totalLeads = await prisma.lead.count();
  const pendingLeads = await prisma.lead.count({ where: { status: "NEW" } });
  const bookedLeads = await prisma.lead.count({ where: { status: "BOOKED" } });
  const activePackages = await prisma.package.count({ where: { status: "PUBLISHED" } });

  // Calculate lead conversion rate
  const conversionRate = totalLeads > 0 ? Math.round((bookedLeads / totalLeads) * 100) : 0;

  // Query recent 5 leads
  const recentLeads = await prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
    take: 5
  });

  // Query featured packages
  const packages = await prisma.package.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { price: "asc" },
    take: 3
  });

  const kpis = [
    { label: "New Inquiries", value: pendingLeads, icon: Inbox, color: "text-amber-600 bg-amber-50" },
    { label: "Total CRM Leads", value: totalLeads, icon: Users, color: "text-sky-600 bg-sky-50" },
    { label: "Lead Conversions", value: `${conversionRate}%`, icon: CheckCircle2, color: "text-emerald-600 bg-emerald-50" },
    { label: "Active Packages", value: activePackages, icon: Compass, color: "text-purple-600 bg-purple-50" },
  ];

  return (
    <div className="space-y-10">
      {/* Header Banner */}
      <div className="space-y-1">
        <h1 className="font-display font-extrabold text-3xl md:text-4xl tracking-tight text-slate-900">
          Admin Dashboard
        </h1>
        <p className="text-sm text-slate-500 font-medium">
          Welcome to the operations center. Here is your overview for today.
        </p>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div key={idx} className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">
                  {kpi.label}
                </span>
                <span className="font-display font-black text-slate-900 text-3xl md:text-4xl block">
                  {kpi.value}
                </span>
              </div>
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${kpi.color}`}>
                <Icon className="w-6 h-6" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Leads Table & Active Packages Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Recent Leads (Left column) */}
        <div className="lg:col-span-8 bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="font-display font-bold text-slate-900 text-xl tracking-tight">
              Recent Leads & Inquiries
            </h3>
            <Link
              href="/admin/leads"
              className="inline-flex items-center gap-1 text-xs text-primary font-bold hover:underline"
            >
              <span>CRM Pipeline</span>
              <ArrowRight className="w-4.5 h-4.5" />
            </Link>
          </div>

          {recentLeads.length === 0 ? (
            <p className="text-slate-400 text-sm py-8 text-center">
              No inquiries received yet. Submit one from the home page!
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 font-bold text-xs uppercase tracking-wider">
                    <th className="pb-3">Name</th>
                    <th className="pb-3">Destination</th>
                    <th className="pb-3">Date</th>
                    <th className="pb-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 font-medium">
                  {recentLeads.map((lead) => {
                    const statusColors: Record<string, string> = {
                      NEW: "text-amber-700 bg-amber-50 border-amber-200",
                      CONTACTED: "text-sky-700 bg-sky-50 border-sky-200",
                      IN_PROGRESS: "text-indigo-700 bg-indigo-50 border-indigo-200",
                      BOOKED: "text-emerald-700 bg-emerald-50 border-emerald-200",
                      LOST: "text-slate-500 bg-slate-50 border-slate-200",
                    };

                    return (
                      <tr key={lead.id} className="hover:bg-slate-50/50 transition-smooth">
                        <td className="py-4">
                          <div className="flex flex-col">
                            <span className="text-slate-900 font-bold text-sm">{lead.name}</span>
                            <span className="text-slate-400 text-xs">{lead.phone}</span>
                          </div>
                        </td>
                        <td className="py-4 text-slate-600">{lead.destination}</td>
                        <td className="py-4 text-slate-500 text-xs">
                          {new Date(lead.createdAt).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short"
                          })}
                        </td>
                        <td className="py-4">
                          <span className={`inline-flex px-2.5 py-0.5 border text-[10px] font-bold rounded-full uppercase ${statusColors[lead.status] || ""}`}>
                            {lead.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Popular Packages (Right column) */}
        <div className="lg:col-span-4 bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="font-display font-bold text-slate-900 text-xl tracking-tight">
              Tour Catalog
            </h3>
            <Link
              href="/admin/packages"
              className="inline-flex items-center gap-1 text-xs text-primary font-bold hover:underline"
            >
              <span>Edit Tours</span>
              <ArrowRight className="w-4.5 h-4.5" />
            </Link>
          </div>

          <div className="space-y-4">
            {packages.map((pkg) => (
              <div key={pkg.id} className="flex items-center gap-4 p-3 border border-slate-50 rounded-2xl">
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                  <img
                    src={pkg.images.split(";")[0]}
                    alt={pkg.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-slate-900 text-xs md:text-sm truncate">
                    {pkg.name}
                  </h4>
                  <p className="text-slate-400 text-xs">
                    {pkg.duration}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="font-bold text-slate-900 text-sm">
                    ₹{pkg.offerPrice || pkg.price}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
