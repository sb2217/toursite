"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Users, Compass, Settings, LogOut, Globe } from "lucide-react";

interface AdminSidebarProps {
  user: {
    name: string;
    email: string;
    role: string;
  };
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ user }) => {
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { label: "Leads CRM", href: "/admin/leads", icon: Users },
    { label: "Manage Packages", href: "/admin/packages", icon: Compass },
    { label: "Global Settings", href: "/admin/settings", icon: Settings },
  ];

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });
      if (response.ok) {
        router.push("/admin/login");
        router.refresh();
      }
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col shrink-0 border-r border-slate-800">
      {/* Brand Logo Header */}
      <div className="p-6 border-b border-slate-800 flex items-center shrink-0 gap-2">
        <img
          src="/images/logo.png"
          alt="The Enchanting Holidays"
          className="h-8 w-auto object-contain brightness-0 invert"
        />
        <span className="font-sans font-bold text-[8px] text-slate-500 tracking-wider">
          ADMIN
        </span>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-smooth ${
                isActive
                  ? "bg-primary text-white shadow-sm"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Icon className="w-5 h-5 shrink-0" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Info & Actions footer */}
      <div className="p-4 border-t border-slate-800 space-y-4">
        {/* Public view shortcut */}
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-center gap-2 w-full p-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold transition-smooth"
        >
          <Globe className="w-4 h-4 text-primary" />
          <span>View Live Website</span>
        </Link>

        {/* User Card */}
        <div className="flex items-center gap-3 p-2 bg-slate-950/40 rounded-2xl border border-slate-800/60">
          <div className="w-9 h-9 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-sm">
            {user.name.charAt(0)}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-white text-xs font-bold truncate">{user.name}</span>
            <span className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">
              {user.role}
            </span>
          </div>
        </div>

        {/* Logout action */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-400 hover:bg-rose-500/10 hover:text-rose-400 w-full transition-smooth cursor-pointer"
        >
          <LogOut className="w-5 h-5 shrink-0" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};
