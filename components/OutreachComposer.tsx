"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Loader2, Mail, Send } from "lucide-react";
import { Lead } from "@/lib/ai/service";

interface OutreachComposerProps {
  lead?: Lead;
  onMessageGenerated?: (message: string) => void;
}

export function OutreachComposer({ lead, onMessageGenerated }: OutreachComposerProps) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    yourCompany: "",
    yourService: "",
    tone: "professional" as const,
  });

  const handleGenerateMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!lead) {
      alert("Please select a lead first");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/ai/generate-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lead,
          ...formData,
        }),
      });

      if (!response.ok) throw new Error("Failed to generate message");

      const data = await response.json();
      setMessage(data.data.message);
      onMessageGenerated?.(data.data.message);
    } catch (error) {
      console.error("Error generating message:", error);
      alert("Failed to generate message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-6 bg-dark">
        <Mail className="w-5 h-5 text-blue-600" />
        <h2 className="text-xl font-bold">Outreach Message Composer</h2>
      </div>

      {lead ? (
        <div className="space-y-6">
          {/* Lead Info */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm font-semibold text-gray-600 mb-2">Selected Lead</p>
            <p className="font-bold">
              {lead.name} at {lead.company}
            </p>
            <p className="text-sm text-gray-600">{lead.position} • {lead.industry}</p>
          </div>

          {/* Form */}
          <form onSubmit={handleGenerateMessage} className="space-y-4">
            <div>
              <Label htmlFor="yourCompany">Your Company Name</Label>
              <Input
                id="yourCompany"
                value={formData.yourCompany}
                onChange={(e) => setFormData((prev) => ({ ...prev, yourCompany: e.target.value }))}
                placeholder="e.g., DesignFlow"
                required
                disabled={loading}
              />
            </div>

            <div>
              <Label htmlFor="yourService">Your Service/Product Description</Label>
              <Input
                id="yourService"
                value={formData.yourService}
                onChange={(e) => setFormData((prev) => ({ ...prev, yourService: e.target.value }))}
                placeholder="e.g., AI-powered lead generation platform"
                required
                disabled={loading}
              />
            </div>

            <div>
              <Label htmlFor="tone">Message Tone</Label>
              <select
                id="tone"
                value={formData.tone}
                onChange={(e) => setFormData((prev) => ({ ...prev, tone: e.target.value as any }))}
                disabled={loading}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="professional">Professional</option>
                <option value="casual">Casual</option>
                <option value="formal">Formal</option>
              </select>
            </div>

            <Button
              type="submit"
              disabled={loading || !formData.yourCompany || !formData.yourService}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Generate Message
                </>
              )}
            </Button>
          </form>

          {/* Generated Message */}
          {message && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="font-semibold">Generated Message</p>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    navigator.clipboard.writeText(message);
                    alert("Message copied to clipboard!");
                  }}
                >
                  Copy
                </Button>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 whitespace-pre-wrap text-sm">
                {message}
              </div>
            </div>
          )}
        </div>
      ) : (
        <Card className="p-8 text-center bg-gray-50">
          <p className="text-gray-500">Select a lead from the Lead Generator to create an outreach message</p>
        </Card>
      )}
    </Card>
  );
}
