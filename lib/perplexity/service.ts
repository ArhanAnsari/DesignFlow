import { generateObject } from "ai";
import { z } from "zod";
import { createPerplexity } from "@ai-sdk/perplexity";

const perplexity = createPerplexity({
  apiKey: process.env.PERPLEXITY_API_KEY ?? "",
});

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
 * Find leads based on criteria using AI
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
    model: perplexity("sonar"),
    prompt,

    schema: z.object({
      leads: z.array(leadSchema),
    }),
  });

  return result.object.leads;
}
