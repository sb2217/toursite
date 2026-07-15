import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { LayoutDashboard, Users, Map, Settings, LogOut, Globe } from "lucide-react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_session")?.value;

  // Final server-side check before rendering administrative view
  if (!token || !verifyToken(token)) {
    redirect("/admin/login");
  }

  const payload = verifyToken(token)!;

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
      {/* Admin Sidebar */}
      <AdminSidebar user={payload} />

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
