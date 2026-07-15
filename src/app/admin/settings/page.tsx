"use client";

import React, { useState, useEffect } from "react";
import { Settings, Save, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface SettingsData {
  phone1: string;
  phone2: string;
  email1: string;
  email2: string;
  whatsapp: string;
  address: string;
  facebook: string;
  instagram: string;
  youtube: string;
}

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  // Form Fields
  const [phone1, setPhone1] = useState("");
  const [phone2, setPhone2] = useState("");
  const [email1, setEmail1] = useState("");
  const [email2, setEmail2] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [address, setAddress] = useState("");
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [youtube, setYoutube] = useState("");

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/settings");
      if (response.ok) {
        const data = await response.json();
        if (data) {
          setPhone1(data.phone1 || "");
          setPhone2(data.phone2 || "");
          setEmail1(data.email1 || "");
          setEmail2(data.email2 || "");
          setWhatsapp(data.whatsapp || "");
          setAddress(data.address || "");
          setFacebook(data.facebook || "");
          setInstagram(data.instagram || "");
          setYoutube(data.youtube || "");
        }
      }
    } catch (err) {
      console.error("Failed to load settings:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);

    try {
      const response = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone1,
          phone2,
          email1,
          email2,
          whatsapp,
          address,
          facebook,
          instagram,
          youtube,
        }),
      });

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        alert("Failed to save settings");
      }
    } catch (err) {
      console.error(err);
      alert("Error saving settings");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-10">
      {/* Title Header */}
      <div className="space-y-1">
        <h1 className="font-display font-extrabold text-3xl md:text-4xl tracking-tight text-slate-900">
          Global Settings Panel
        </h1>
        <p className="text-sm text-slate-500 font-medium">
          Edit telephone contacts, support emails, head office addresses, and social handles displayed on public footers.
        </p>
      </div>

      {loading ? (
        <div className="text-center py-24 space-y-3 bg-white border border-slate-100 rounded-3xl p-8">
          <Loader2 className="w-10 h-10 text-primary animate-spin mx-auto" />
          <p className="text-sm text-slate-500 font-medium">Loading settings metadata...</p>
        </div>
      ) : (
        <form onSubmit={handleSaveSettings} className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-sm space-y-8 max-w-3xl">
          
          {success && (
            <div className="flex items-center gap-2.5 p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-2xl animate-in fade-in">
              <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600" />
              <span>Global contact and social settings have been updated successfully!</span>
            </div>
          )}

          {/* Contact Numbers */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50 pb-2">
              Contact Numbers
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500">Primary Support Phone</label>
                <input
                  type="text"
                  value={phone1}
                  onChange={(e) => setPhone1(e.target.value)}
                  placeholder="+91 9450204681"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500">Secondary Backup Phone</label>
                <input
                  type="text"
                  value={phone2}
                  onChange={(e) => setPhone2(e.target.value)}
                  placeholder="+91 6290350925"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary"
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500">WhatsApp Link Phone (Full country prefix, no spaces)</label>
              <input
                type="text"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                placeholder="+919450204681"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          {/* Support Email Addresses */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50 pb-2">
              Support Emails
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500">Primary Contact Email</label>
                <input
                  type="email"
                  value={email1}
                  onChange={(e) => setEmail1(e.target.value)}
                  placeholder="info@theenchantingholidays.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500">Secondary Booking Email</label>
                <input
                  type="email"
                  value={email2}
                  onChange={(e) => setEmail2(e.target.value)}
                  placeholder="sales@theenchantingholidays.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary"
                />
              </div>
            </div>
          </div>

          {/* Head Office Address */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50 pb-2">
              Office Location Address
            </h3>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500">Office Physical Address</label>
              <textarea
                rows={2}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter office address..."
                className="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-primary resize-none"
              />
            </div>
          </div>

          {/* Social Media Link Handles */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50 pb-2">
              Social Channels
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 font-bold tracking-tight">Facebook URL</label>
                <input
                  type="url"
                  value={facebook}
                  onChange={(e) => setFacebook(e.target.value)}
                  placeholder="https://facebook.com/..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-primary"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 font-bold tracking-tight">Instagram URL</label>
                <input
                  type="url"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  placeholder="https://instagram.com/..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-primary"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 font-bold tracking-tight">YouTube Channel</label>
                <input
                  type="url"
                  value={youtube}
                  onChange={(e) => setYoutube(e.target.value)}
                  placeholder="https://youtube.com/..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-primary"
                />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="border-t border-slate-100 pt-6 flex justify-end">
            <Button type="submit" disabled={saving} className="flex items-center gap-1.5">
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Saving Updates...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save Global Settings</span>
                </>
              )}
            </Button>
          </div>

        </form>
      )}
    </div>
  );
}
