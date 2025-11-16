"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Plus,
  MoreHorizontal,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Building,
  User,
} from "lucide-react";

// Sample leads data
const sampleLeads = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@techcorp.com",
    phone: "+1 (555) 123-4567",
    company: "TechCorp Solutions",
    title: "CTO",
    status: "hot",
    source: "Website",
    value: 50000,
    lastContact: "2024-01-15",
    location: "San Francisco, CA",
    notes: "Interested in enterprise solution. Follow up next week.",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.j@startup.io",
    phone: "+1 (555) 987-6543",
    company: "StartupIO",
    title: "Founder",
    status: "warm",
    source: "Referral",
    value: 25000,
    lastContact: "2024-01-12",
    location: "New York, NY",
    notes: "Looking for MVP development services.",
  },
  {
    id: 3,
    name: "Mike Chen",
    email: "mike.chen@bigcorp.com",
    phone: "+1 (555) 456-7890",
    company: "BigCorp Industries",
    title: "VP Engineering",
    status: "cold",
    source: "LinkedIn",
    value: 100000,
    lastContact: "2024-01-08",
    location: "Austin, TX",
    notes: "Large enterprise client. Long sales cycle expected.",
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily.davis@innovate.com",
    phone: "+1 (555) 321-0987",
    company: "Innovate Labs",
    title: "Product Manager",
    status: "hot",
    source: "Trade Show",
    value: 35000,
    lastContact: "2024-01-14",
    location: "Seattle, WA",
    notes: "Very interested. Wants to schedule demo.",
  },
  {
    id: 5,
    name: "David Wilson",
    email: "david.wilson@scaleup.com",
    phone: "+1 (555) 654-3210",
    company: "ScaleUp Ventures",
    title: "CEO",
    status: "warm",
    source: "Email Campaign",
    value: 75000,
    lastContact: "2024-01-10",
    location: "Boston, MA",
    notes: "Budget approved. Decision maker identified.",
  },
];

const statusColors = {
  hot: "bg-red-100 text-red-800 border-red-200",
  warm: "bg-yellow-100 text-yellow-800 border-yellow-200",
  cold: "bg-blue-100 text-blue-800 border-blue-200",
};

const statusLabels = {
  hot: "Hot",
  warm: "Warm",
  cold: "Cold",
};

const LeadsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredLeads = sampleLeads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || lead.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleAddLead = () => {
    // TODO: Implement add lead functionality
    console.log("Add new lead");
  };

  const handleContactLead = (lead: (typeof sampleLeads)[0]) => {
    // TODO: Implement contact lead functionality
    console.log("Contact lead:", lead.name);
  };

  return (
    <div className="flex flex-col space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Leads</h1>
          <p className="text-muted-foreground">
            Manage and track your sales prospects
          </p>
        </div>
        <Button onClick={handleAddLead} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Lead
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search leads by name, company, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={filterStatus === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterStatus("all")}
          >
            All ({sampleLeads.length})
          </Button>
          <Button
            variant={filterStatus === "hot" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterStatus("hot")}
          >
            Hot ({sampleLeads.filter((l) => l.status === "hot").length})
          </Button>
          <Button
            variant={filterStatus === "warm" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterStatus("warm")}
          >
            Warm ({sampleLeads.filter((l) => l.status === "warm").length})
          </Button>
          <Button
            variant={filterStatus === "cold" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterStatus("cold")}
          >
            Cold ({sampleLeads.filter((l) => l.status === "cold").length})
          </Button>
        </div>
      </div>

      {/* Leads Grid */}
      <div className="grid gap-4">
        {filteredLeads.length === 0 ? (
          <div className="text-center py-12">
            <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No leads found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || filterStatus !== "all"
                ? "Try adjusting your search or filter criteria"
                : "Get started by adding your first lead"}
            </p>
            {!searchTerm && filterStatus === "all" && (
              <Button onClick={handleAddLead}>
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Lead
              </Button>
            )}
          </div>
        ) : (
          filteredLeads.map((lead) => (
            <div
              key={lead.id}
              className="border rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                {/* Lead Info */}
                <div className="flex-1 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <h3 className="text-lg font-semibold">{lead.name}</h3>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium border ${
                        statusColors[lead.status as keyof typeof statusColors]
                      }`}
                    >
                      {statusLabels[lead.status as keyof typeof statusLabels]}
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4" />
                      <span>{lead.company}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{lead.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>
                        Last contact:{" "}
                        {new Date(lead.lastContact).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <a
                        href={`mailto:${lead.email}`}
                        className="text-blue-600 hover:underline"
                      >
                        {lead.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <a
                        href={`tel:${lead.phone}`}
                        className="text-blue-600 hover:underline"
                      >
                        {lead.phone}
                      </a>
                    </div>
                  </div>

                  {lead.notes && (
                    <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-md">
                      {lead.notes}
                    </p>
                  )}
                </div>

                {/* Lead Actions */}
                <div className="flex flex-col sm:flex-row gap-2 lg:flex-col">
                  <div className="text-right mb-2">
                    <div className="text-2xl font-bold text-green-600">
                      ${lead.value.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Potential Value
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleContactLead(lead)}
                      className="flex-1 sm:flex-none"
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Contact
                    </Button>
                    <Button variant="outline" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Summary Stats */}
      {filteredLeads.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-muted/50 rounded-lg">
          <div className="text-center">
            <div className="text-2xl font-bold">{filteredLeads.length}</div>
            <div className="text-sm text-muted-foreground">Total Leads</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              $
              {filteredLeads
                .reduce((sum, lead) => sum + lead.value, 0)
                .toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">Total Value</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">
              {Math.round(
                filteredLeads.reduce((sum, lead) => sum + lead.value, 0) /
                  filteredLeads.length
              ).toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">Avg. Value</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadsPage;
