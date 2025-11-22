/**
 * Lead Generation API Routes
 * Provides endpoints for AI-powered lead generation
 */

import { NextRequest, NextResponse } from "next/server";
import { generateLeads, qualifyLead, generateOutreachMessage, generateLeadInsights } from "@/lib/ai/service";
import { errorResponse, successResponse } from "@/lib/api-response";

/**
 * POST /api/ai/generate-leads
 * Generate new leads based on criteria
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { industry, companySize, location, budget, count } = body;

    if (!industry || !companySize) {
      return NextResponse.json(
        errorResponse("Industry and company size are required"),
        { status: 400 }
      );
    }

    const leads = await generateLeads({
      industry,
      companySize,
      location,
      budget,
      count: count || 5,
    });

    return NextResponse.json(successResponse(leads, "Leads generated successfully"));
  } catch (error) {
    console.error("Error generating leads:", error);
    return NextResponse.json(
      errorResponse(error instanceof Error ? error.message : "Failed to generate leads"),
      { status: 500 }
    );
  }
}
