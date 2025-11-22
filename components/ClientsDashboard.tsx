"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, TrendingUp, CheckCircle, AlertCircle, Mail } from "lucide-react";

interface Client {
  id: string;
  name: string;
  company: string;
  email: string;
  status: "hot" | "warm" | "cold" | "contacted";
  score: number;
  lastInteraction?: string;
  notes?: string;
}

interface DashboardStats {
  totalClients: number;
  hotLeads: number;
  conversionRate: number;
  avgTimeToContact: number;
}

export function ClientsDashboard() {
  const [clients, setClients] = useState<Client[]>([
    {
      id: "1",
      name: "John Smith",
      company: "TechCorp Inc",
      email: "john@techcorp.com",
      status: "hot",
      score: 9,
      lastInteraction: "2 hours ago",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      company: "StartUp Labs",
      email: "sarah@startuplabs.com",
      status: "warm",
      score: 7,
      lastInteraction: "1 day ago",
    },
  ]);

  const stats: DashboardStats = {
    totalClients: clients.length,
    hotLeads: clients.filter((c) => c.status === "hot").length,
    conversionRate: 32,
    avgTimeToContact: 2,
  };

  const getStatusColor = (status: Client["status"]) => {
    const colors = {
      hot: "bg-red-100 text-red-800",
      warm: "bg-orange-100 text-orange-800",
      cold: "bg-blue-100 text-blue-800",
      contacted: "bg-green-100 text-green-800",
    };
    return colors[status];
  };

  const getStatusIcon = (status: Client["status"]) => {
    const icons = {
      hot: <TrendingUp className="w-4 h-4" />,
      warm: <AlertCircle className="w-4 h-4" />,
      cold: <Users className="w-4 h-4" />,
      contacted: <CheckCircle className="w-4 h-4" />,
    };
    return icons[status];
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Clients Dashboard</h1>
          <p className="text-gray-600">Manage and track all your leads and client relationships</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600">Total Clients</p>
                <p className="text-2xl font-bold">{stats.totalClients}</p>
              </div>
              <Users className="w-8 h-8 text-blue-600 opacity-20" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600">Hot Leads</p>
                <p className="text-2xl font-bold">{stats.hotLeads}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-red-600 opacity-20" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600">Conversion Rate</p>
                <p className="text-2xl font-bold">{stats.conversionRate}%</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600 opacity-20" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600">Avg. Contact Time</p>
                <p className="text-2xl font-bold">{stats.avgTimeToContact}h</p>
              </div>
              <Mail className="w-8 h-8 text-orange-600 opacity-20" />
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">All ({clients.length})</TabsTrigger>
            <TabsTrigger value="hot">Hot ({clients.filter((c) => c.status === "hot").length})</TabsTrigger>
            <TabsTrigger value="warm">Warm ({clients.filter((c) => c.status === "warm").length})</TabsTrigger>
            <TabsTrigger value="cold">Cold ({clients.filter((c) => c.status === "cold").length})</TabsTrigger>
            <TabsTrigger value="contacted">Contacted ({clients.filter((c) => c.status === "contacted").length})</TabsTrigger>
          </TabsList>

          {/* All Clients */}
          <TabsContent value="all" className="space-y-4">
            {clients.map((client) => (
              <ClientCard key={client.id} client={client} />
            ))}
          </TabsContent>

          {/* Hot */}
          <TabsContent value="hot" className="space-y-4">
            {clients
              .filter((c) => c.status === "hot")
              .map((client) => (
                <ClientCard key={client.id} client={client} />
              ))}
          </TabsContent>

          {/* Warm */}
          <TabsContent value="warm" className="space-y-4">
            {clients
              .filter((c) => c.status === "warm")
              .map((client) => (
                <ClientCard key={client.id} client={client} />
              ))}
          </TabsContent>

          {/* Cold */}
          <TabsContent value="cold" className="space-y-4">
            {clients
              .filter((c) => c.status === "cold")
              .map((client) => (
                <ClientCard key={client.id} client={client} />
              ))}
          </TabsContent>

          {/* Contacted */}
          <TabsContent value="contacted" className="space-y-4">
            {clients
              .filter((c) => c.status === "contacted")
              .map((client) => (
                <ClientCard key={client.id} client={client} />
              ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function ClientCard({ client }: { client: Client }) {
  return (
    <Card className="p-6 hover:shadow-lg transition">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
        <div>
          <h3 className="font-bold text-lg">{client.name}</h3>
          <p className="text-sm text-gray-600">{client.company}</p>
          <p className="text-sm text-blue-600 mt-1">{client.email}</p>
        </div>

        <div>
          <p className="text-sm font-semibold text-gray-600 mb-1">Status</p>
          <div className="flex items-center gap-2">
            <Badge className={`${client.status === "hot" ? "bg-red-100 text-red-800" : client.status === "warm" ? "bg-orange-100 text-orange-800" : client.status === "cold" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"}`}>
              {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
            </Badge>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold text-gray-600 mb-1">Score</p>
          <div className="flex items-center gap-2">
            <div className="w-full bg-gray-200 rounded-full h-2 max-w-xs">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: `${(client.score / 10) * 100}%` }}
              />
            </div>
            <span className="font-bold text-sm">{client.score}/10</span>
          </div>
        </div>

        <div className="flex gap-2 justify-end">
          <Button size="sm" variant="outline">
            View Details
          </Button>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
            Send Message
          </Button>
        </div>
      </div>
    </Card>
  );
}
