/**
 * AI Service Layer using Vercel AI SDK
 * Handles all interactions with Google Generative AI
 */

import { generateObject, generateText } from "ai";
import { google } from "@ai-sdk/google";
import { z } from "zod";

/**
 * Lead data schema for structured AI output
 */
export const leadSchema = z.object({
  name: z.string().describe("Full name of the potential lead"),
  email: z.string().email().describe("Email address"),
  phone: z.string().optional().describe("Phone number"),
  company: z.string().describe("Company name"),
  industry: z.string().describe("Industry sector"),
  position: z.string().describe("Job position/title"),
  qualificationScore: z
    .number()
    .min(1)
    .max(10)
    .describe("Lead quality score 1-10"),
  keyInsights: z.array(z.string()).describe("Key insights about this lead"),
  suggestedApproach: z.string().describe("Recommended outreach approach"),
  potentialValue: z
    .enum(["High", "Medium", "Low"])
    .describe("Potential customer value"),
});

export type Lead = z.infer<typeof leadSchema>;

/**
 * Generate leads based on criteria using AI
 */
export async function generateLeads(criteria: {
  industry: string;
  companySize: string;
  location?: string;
  budget?: string;
  count?: number;
}): Promise<Lead[]> {
  const count = criteria.count || 5;

  const prompt = `Find ${count} potential business leads matching these criteria:
- Industry: ${criteria.industry}
- Company Size: ${criteria.companySize}
${criteria.location ? `- Location: ${criteria.location}` : ""}
${criteria.budget ? `- Budget Range: ${criteria.budget}` : ""}
Find verified leads with valid email addresses and phone numbers.`;

  const result = await generateObject({
    model: google("gemini-2.0-flash"),
    prompt,

    schema: z.object({
      leads: z.array(leadSchema),
    }),
  });

  return result.object.leads;
}

/**
 * Qualify a single lead based on provided information
 */
export async function qualifyLead(leadInfo: string): Promise<{
  isQualified: boolean;
  score: number;
  analysis: string;
  recommendations: string[];
}> {
  const { text } = await generateText({
    model: google("gemini-2.0-flash"),
    prompt: `Analyze this lead information and determine if it's a qualified prospect:

${leadInfo}

Provide your analysis in this exact format:
IS_QUALIFIED: [yes/no]
SCORE: [1-10]
ANALYSIS: [detailed analysis]
RECOMMENDATIONS: [comma-separated list of next steps]`,
  });

  // Parse the response
  const lines = text.split("\n");
  const isQualified = lines[0]?.toLowerCase().includes("yes") || false;
  const score = parseInt(lines[1]?.match(/\d+/)?.[0] || "5");
  const analysis = lines[2]?.replace("ANALYSIS: ", "") || "";
  const recommendations =
    lines[3]
      ?.replace("RECOMMENDATIONS: ", "")
      .split(",")
      .map((r) => r.trim()) || [];

  return {
    isQualified,
    score,
    analysis,
    recommendations,
  };
}

/**
 * Generate personalized outreach message for a lead
 */
export async function generateOutreachMessage(
  lead: Lead,
  context: {
    yourCompany: string;
    yourService: string;
    tone?: "professional" | "casual" | "formal";
  }
): Promise<string> {
  const { text } = await generateText({
    model: google("gemini-2.0-flash"),
    prompt: `Generate a personalized cold outreach email for this lead:

Lead Information:
- Name: ${lead.name}
- Company: ${lead.company}
- Position: ${lead.position}
- Industry: ${lead.industry}
- Key Insights: ${lead.keyInsights.join(", ")}

Context:
- Your Company: ${context.yourCompany}
- Your Service: ${context.yourService}
- Tone: ${context.tone || "professional"}

The email should:
1. Be personalized to the lead
2. Reference their company/position naturally
3. Clearly state the value proposition
4. Include a specific call-to-action
5. Be concise (under 150 words)`,
  });

  return text;
}

/**
 * Analyze client feedback or interaction
 */
export async function analyzeClientInteraction(
  interaction: string,
  type: "email" | "call" | "meeting" | "response"
): Promise<{
  sentiment: "positive" | "neutral" | "negative";
  summary: string;
  suggestedNextSteps: string[];
  riskFactors: string[];
}> {
  const { text } = await generateText({
    model: google("gemini-2.0-flash"),
    prompt: `Analyze this ${type} interaction with a client and provide insights:

${interaction}

Provide your analysis in this exact format:
SENTIMENT: [positive/neutral/negative]
SUMMARY: [brief 2-3 line summary]
NEXT_STEPS: [comma-separated suggested actions]
RISKS: [comma-separated potential issues or risks, or "none"]`,
  });

  // Parse response
  const lines = text.split("\n");
  const sentiment = (
    lines[0]?.toLowerCase().includes("positive")
      ? "positive"
      : lines[0]?.toLowerCase().includes("negative")
      ? "negative"
      : "neutral"
  ) as "positive" | "neutral" | "negative";
  const summary = lines[1]?.replace("SUMMARY: ", "") || "";
  const suggestedNextSteps =
    lines[2]
      ?.replace("NEXT_STEPS: ", "")
      .split(",")
      .map((s) => s.trim()) || [];
  const riskFactors =
    lines[3]
      ?.replace("RISKS: ", "")
      .split(",")
      .filter((r) => r.trim() !== "none")
      .map((r) => r.trim()) || [];

  return {
    sentiment,
    summary,
    suggestedNextSteps,
    riskFactors,
  };
}

/**
 * Generate summary insights for a batch of leads
 */
export async function generateLeadInsights(leads: Lead[]): Promise<{
  topOpportunities: string[];
  commonPatterns: string[];
  recommendations: string[];
  marketTrends: string[];
}> {
  const leadsJson = JSON.stringify(leads, null, 2);

  const { text } = await generateText({
    model: google("gemini-2.0-flash"),
    prompt: `Analyze these ${leads.length} leads and provide strategic insights:

${leadsJson}

Provide insights in this exact format:
TOP_OPPORTUNITIES: [comma-separated best prospects]
PATTERNS: [comma-separated common characteristics]
RECOMMENDATIONS: [comma-separated strategic recommendations]
TRENDS: [comma-separated market trends observed]`,
  });

  // Parse response
  const lines = text.split("\n");

  return {
    topOpportunities:
      lines[0]
        ?.replace("TOP_OPPORTUNITIES: ", "")
        .split(",")
        .map((o) => o.trim()) || [],
    commonPatterns:
      lines[1]
        ?.replace("PATTERNS: ", "")
        .split(",")
        .map((p) => p.trim()) || [],
    recommendations:
      lines[2]
        ?.replace("RECOMMENDATIONS: ", "")
        .split(",")
        .map((r) => r.trim()) || [],
    marketTrends:
      lines[3]
        ?.replace("TRENDS: ", "")
        .split(",")
        .map((t) => t.trim()) || [],
  };
}
