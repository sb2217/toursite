"use client";

import React, { useState, useEffect } from "react";
import { Users, Mail, Phone, Calendar, ArrowUpRight, Search, Filter, Loader2, CheckCircle2, MessageSquare, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  destination: string;
  packageSlug: string | null;
  travelDate: string | null;
  adults: number;
  children: number;
  budget: string | null;
  message: string | null;
  status: string;
  notes: string | null;
  createdAt: string;
}

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  // CRM Detail modal state
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [newStatus, setNewStatus] = useState("");
  const [newNotes, setNewNotes] = useState("");
  const [updating, setUpdating] = useState(false);

  // Fetch leads on mount
  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/leads");
      if (!response.ok) {
        throw new Error("Failed to fetch leads from server");
      }
      const data = await response.json();
      setLeads(data);
      setFilteredLeads(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An error occurred while fetching leads.");
    } finally {
      setLoading(false);
    }
  };

  // Run filtering logic when query, filter, or leads change
  useEffect(() => {
    let result = leads;

    if (statusFilter !== "ALL") {
      result = result.filter((lead) => lead.status === statusFilter);
    }

    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (lead) =>
          lead.name.toLowerCase().includes(query) ||
          lead.email.toLowerCase().includes(query) ||
          lead.phone.toLowerCase().includes(query) ||
          lead.destination.toLowerCase().includes(query)
      );
    }

    setFilteredLeads(result);
  }, [searchQuery, statusFilter, leads]);

  const openLeadDetails = (lead: Lead) => {
    setSelectedLead(lead);
    setNewStatus(lead.status);
    setNewNotes(lead.notes || "");
    setModalOpen(true);
  };

  const handleUpdateLead = async () => {
    if (!selectedLead) return;

    setUpdating(true);
    try {
      const response = await fetch("/api/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          leadId: selectedLead.id,
          status: newStatus,
          notes: newNotes,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to update lead");
      }

      // Refresh list locally
      setLeads((prev) =>
        prev.map((l) => (l.id === selectedLead.id ? { ...l, status: newStatus, notes: newNotes } : l))
      );

      setModalOpen(false);
      setSelectedLead(null);
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Failed to update lead status");
    } finally {
      setUpdating(false);
    }
  };

  const statusOptions = ["NEW", "CONTACTED", "IN_PROGRESS", "BOOKED", "LOST"];

  const statusColors: Record<string, string> = {
    NEW: "text-amber-700 bg-amber-50 border-amber-200",
    CONTACTED: "text-sky-700 bg-sky-50 border-sky-200",
    IN_PROGRESS: "text-indigo-700 bg-indigo-50 border-indigo-200",
    BOOKED: "text-emerald-700 bg-emerald-50 border-emerald-200",
    LOST: "text-slate-500 bg-slate-50 border-slate-200",
  };

  return (
    <div className="space-y-10">
      {/* Title */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <h1 className="font-display font-extrabold text-3xl md:text-4xl tracking-tight text-slate-900">
            CRM Leads Pipeline
          </h1>
          <p className="text-sm text-slate-500 font-medium">
            Monitor tour inquiries, change status, and log communication notes.
          </p>
        </div>
        <Button onClick={fetchLeads} variant="outline" size="sm">
          Refresh Leads
        </Button>
      </div>

      {/* Filters Bar */}
      <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        {/* Search */}
        <div className="md:col-span-8 relative">
          <Search className="w-4.5 h-4.5 text-slate-400 absolute left-4 top-3.5" />
          <input
            type="text"
            placeholder="Search leads by name, email, phone, or destination..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-100 text-sm bg-slate-50/50 focus:outline-none focus:border-primary transition-smooth focus:bg-white"
          />
        </div>

        {/* Filter dropdown */}
        <div className="md:col-span-4 relative">
          <Filter className="w-4.5 h-4.5 text-slate-400 absolute left-4 top-3.5" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-100 text-sm bg-slate-50/50 focus:outline-none focus:border-primary transition-smooth focus:bg-white cursor-pointer appearance-none"
          >
            <option value="ALL">All Statuses</option>
            {statusOptions.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main CRM Table Container */}
      {loading ? (
        <div className="text-center py-24 space-y-3">
          <Loader2 className="w-10 h-10 text-primary animate-spin mx-auto" />
          <p className="text-sm text-slate-500 font-medium">Loading CRM leads...</p>
        </div>
      ) : error ? (
        <div className="bg-rose-50 border border-rose-100 p-6 rounded-3xl text-center space-y-4 max-w-md mx-auto">
          <AlertCircle className="w-12 h-12 text-rose-500 mx-auto" />
          <p className="text-slate-800 text-sm font-semibold">{error}</p>
          <Button onClick={fetchLeads} size="sm">
            Retry Connection
          </Button>
        </div>
      ) : filteredLeads.length === 0 ? (
        <div className="bg-white border border-slate-100 rounded-3xl p-12 text-center text-slate-400 text-sm">
          No leads match your search queries.
        </div>
      ) : (
        <div className="bg-white border border-slate-100 rounded-3xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-bold text-xs uppercase tracking-wider bg-slate-50/30">
                  <th className="px-6 py-4">Lead Name</th>
                  <th className="px-6 py-4">Trip Details</th>
                  <th className="px-6 py-4">Date Logged</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50/40 transition-smooth">
                    <td className="px-6 py-5">
                      <div className="flex flex-col space-y-1">
                        <span className="text-slate-900 font-bold text-sm">{lead.name}</span>
                        <div className="flex flex-col text-slate-400 text-xs">
                          <span className="flex items-center gap-1">
                            <Mail className="w-3.5 h-3.5 text-primary shrink-0" />
                            {lead.email}
                          </span>
                          <span className="flex items-center gap-1">
                            <Phone className="w-3.5 h-3.5 text-primary shrink-0" />
                            {lead.phone}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex flex-col text-xs text-slate-600">
                        <span className="text-slate-900 font-bold">{lead.destination}</span>
                        <span>{lead.adults} Adults, {lead.children} Kids</span>
                        {lead.budget && (
                          <span className="text-primary font-bold">Budget: {lead.budget}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-5 text-slate-500 text-xs">
                      {new Date(lead.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="px-6 py-5">
                      <span className={`inline-flex px-2.5 py-0.5 border text-[10px] font-bold rounded-full uppercase ${statusColors[lead.status]}`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <Button
                        onClick={() => openLeadDetails(lead)}
                        size="sm"
                        variant="secondary"
                        className="rounded-xl"
                      >
                        Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* CRM Details Modal */}
      {modalOpen && selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white border border-slate-100 rounded-3xl w-full max-w-2xl overflow-hidden shadow-xl max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="font-display font-bold text-slate-900 text-xl tracking-tight">
                CRM Lead Details
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Modal Scroll Content */}
            <div className="flex-1 p-6 md:p-8 space-y-6 overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Guest Details */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Guest Information
                  </h4>
                  <ul className="space-y-2.5 text-sm font-semibold">
                    <li className="flex justify-between border-b border-slate-50 pb-1.5">
                      <span className="text-slate-500 font-medium">Full Name</span>
                      <span className="text-slate-900">{selectedLead.name}</span>
                    </li>
                    <li className="flex justify-between border-b border-slate-50 pb-1.5">
                      <span className="text-slate-500 font-medium">Email</span>
                      <span className="text-slate-900">{selectedLead.email}</span>
                    </li>
                    <li className="flex justify-between border-b border-slate-50 pb-1.5">
                      <span className="text-slate-500 font-medium">Phone</span>
                      <span className="text-slate-900">{selectedLead.phone}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-slate-500 font-medium">Logged Date</span>
                      <span className="text-slate-900">
                        {new Date(selectedLead.createdAt).toLocaleDateString("en-IN")}
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Trip Details */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Trip Requirements
                  </h4>
                  <ul className="space-y-2.5 text-sm font-semibold">
                    <li className="flex justify-between border-b border-slate-50 pb-1.5">
                      <span className="text-slate-500 font-medium">Destination</span>
                      <span className="text-primary font-extrabold">{selectedLead.destination}</span>
                    </li>
                    <li className="flex justify-between border-b border-slate-50 pb-1.5">
                      <span className="text-slate-500 font-medium">Travel Date</span>
                      <span className="text-slate-900">{selectedLead.travelDate || "Flexible"}</span>
                    </li>
                    <li className="flex justify-between border-b border-slate-50 pb-1.5">
                      <span className="text-slate-500 font-medium">Passengers</span>
                      <span className="text-slate-900">
                        {selectedLead.adults} Adults, {selectedLead.children} Children
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-slate-500 font-medium">Est. Budget</span>
                      <span className="text-slate-900">{selectedLead.budget || "Not Specified"}</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Message from traveler */}
              {selectedLead.message && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Custom Requests & Message
                  </h4>
                  <p className="bg-slate-50 border border-slate-100 p-4 rounded-2xl text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
                    {selectedLead.message}
                  </p>
                </div>
              )}

              {/* Status Update & Logs */}
              <div className="space-y-4 border-t border-slate-100 pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Change Status */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-500">Pipeline Status</label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:border-primary transition-smooth bg-white cursor-pointer"
                  >
                    {statusOptions.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Communication logs */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-500">Communication & Follow-up Logs</label>
                  <textarea
                    rows={3}
                    placeholder="Log dates of calls, package options sent, hotel bookings secured..."
                    value={newNotes}
                    onChange={(e) => setNewNotes(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:border-primary transition-smooth resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="px-6 py-4 border-t border-slate-100 flex justify-end gap-3 bg-slate-50/50">
              <Button onClick={() => setModalOpen(false)} variant="secondary" size="sm">
                Cancel
              </Button>
              <Button onClick={handleUpdateLead} disabled={updating} size="sm">
                {updating ? "Saving Changes..." : "Save CRM Log"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
