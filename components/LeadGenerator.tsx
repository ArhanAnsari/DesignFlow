"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Loader2, Sparkles, TrendingUp } from "lucide-react";
import { Lead } from "@/lib/ai/service";

interface LeadGeneratorProps {
  onLeadsGenerated?: (leads: Lead[]) => void;
}

export function LeadGenerator({ onLeadsGenerated }: LeadGeneratorProps) {
  const [loading, setLoading] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [formData, setFormData] = useState({
    industry: "",
    companySize: "mid-market",
    location: "",
    budget: "",
    count: 5,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "count" ? parseInt(value) : value,
    }));
  };

  const handleGenerateLeads = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/ai/generate-leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to generate leads");

      const data = await response.json();
      setLeads(data.data);
      onLeadsGenerated?.(data.data);
    } catch (error) {
      console.error("Error generating leads:", error);
      alert("Failed to generate leads. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 ">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form */}
        <Card className="lg:col-span-1 p-6 bg-black border-gray-800">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-5 h-5 text-blue-400" />
            <h2 className="text-xl font-bold text-white">Generate Leads</h2>
          </div>

          <form onSubmit={handleGenerateLeads} className="space-y-4">
            <div>
              <Label htmlFor="industry" className="text-gray-300">
                Industry
              </Label>
              <Input
                id="industry"
                name="industry"
                placeholder="e.g., SaaS, Manufacturing, Healthcare"
                value={formData.industry}
                onChange={handleInputChange}
                required
                disabled={loading}
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
              />
            </div>

            <div>
              <Label htmlFor="companySize" className="text-gray-300">
                Company Size
              </Label>
              <select
                id="companySize"
                name="companySize"
                value={formData.companySize}
                onChange={handleInputChange}
                disabled={loading}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="startup">Startup (1-50)</option>
                <option value="small">Small (51-200)</option>
                <option value="mid-market">Mid-Market (201-1000)</option>
                <option value="enterprise">Enterprise (1000+)</option>
              </select>
            </div>

            <div>
              <Label htmlFor="location" className="text-gray-300">
                Location (Optional)
              </Label>
              <Input
                id="location"
                name="location"
                placeholder="e.g., USA, Europe, Remote"
                value={formData.location}
                onChange={handleInputChange}
                disabled={loading}
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
              />
            </div>

            <div>
              <Label htmlFor="budget" className="text-gray-300">
                Budget Range (Optional)
              </Label>
              <Input
                id="budget"
                name="budget"
                placeholder="e.g., $10k-$50k"
                value={formData.budget}
                onChange={handleInputChange}
                disabled={loading}
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
              />
            </div>

            <div>
              <Label htmlFor="count" className="text-gray-300">
                Number of Leads
              </Label>
              <Input
                id="count"
                name="count"
                type="number"
                min="1"
                max="20"
                value={formData.count}
                onChange={handleInputChange}
                disabled={loading}
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>

            <Button
              type="submit"
              disabled={loading || !formData.industry}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate Leads
                </>
              )}
            </Button>
          </form>
        </Card>

        {/* Results */}
        <div className="lg:col-span-2">
          {leads.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold flex items-center gap-2 text-white">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                  Generated Leads ({leads.length})
                </h3>
              </div>

              <div className="grid gap-4">
                {leads.map((lead, index) => (
                  <Card
                    key={index}
                    className="p-4 bg-black border-gray-800 hover:shadow-lg hover:shadow-blue-500/10 transition"
                  >
                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div>
                        <p className="text-sm font-semibold text-gray-400">
                          Name
                        </p>
                        <p className="font-bold text-white">{lead.name}</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-400">
                          Company
                        </p>
                        <p className="font-bold text-white">{lead.company}</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-400">
                          Position
                        </p>
                        <p className="text-gray-300">{lead.position}</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-400">
                          Industry
                        </p>
                        <p className="text-gray-300">{lead.industry}</p>
                      </div>
                    </div>

                    <div className="mb-3">
                      <p className="text-sm font-semibold text-gray-400">
                        Email
                      </p>
                      <p className="text-blue-400 break-all">{lead.email}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div>
                        <p className="text-sm font-semibold text-gray-400">
                          Qualification Score
                        </p>
                        <div className="flex items-center gap-2">
                          <div className="w-full bg-gray-800 rounded-full h-2">
                            <div
                              className="bg-green-500 h-2 rounded-full"
                              style={{
                                width: `${
                                  (lead.qualificationScore / 10) * 100
                                }%`,
                              }}
                            />
                          </div>
                          <span className="font-bold text-white">
                            {lead.qualificationScore}/10
                          </span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-400">
                          Potential Value
                        </p>
                        <span
                          className={`px-2 py-1 rounded text-sm font-bold ${
                            lead.potentialValue === "High"
                              ? "bg-green-900 text-green-300"
                              : lead.potentialValue === "Medium"
                              ? "bg-yellow-900 text-yellow-300"
                              : "bg-gray-800 text-gray-300"
                          }`}
                        >
                          {lead.potentialValue}
                        </span>
                      </div>
                    </div>

                    <div className="mb-3">
                      <p className="text-sm font-semibold text-gray-400 mb-2">
                        Key Insights
                      </p>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        {lead.keyInsights.map((insight, i) => (
                          <li key={i} className="text-gray-300">
                            {insight}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-gray-400 mb-1">
                        Suggested Approach
                      </p>
                      <p className="text-sm bg-blue-950 text-blue-200 p-2 rounded">
                        {lead.suggestedApproach}
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {!loading && leads.length === 0 && (
            <Card className="p-12 text-center bg-black border-gray-800">
              <p className="text-gray-400">
                Fill out the form and click "Generate Leads" to see results
              </p>
            </Card>
          )}

          {loading && (
            <Card className="p-12 text-center bg-black border-gray-800">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-400" />
              <p className="text-gray-400">Generating high-quality leads...</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
