/**
 * Outreach Message Generation API Route
 * Generates personalized outreach messages
 */

import { NextRequest, NextResponse } from "next/server";
import { generateOutreachMessage, leadSchema } from "@/lib/ai/service";
import { errorResponse, successResponse } from "@/lib/api-response";

/**
 * POST /api/ai/generate-message
 * Generate personalized outreach message
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { lead, yourCompany, yourService, tone } = body;

    if (!lead || !yourCompany || !yourService) {
      return NextResponse.json(
        errorResponse("Lead data, company name, and service description are required"),
        { status: 400 }
      );
    }

    // Validate lead structure
    leadSchema.parse(lead);

    const message = await generateOutreachMessage(lead, {
      yourCompany,
      yourService,
      tone: tone || "professional",
    });

    return NextResponse.json(
      successResponse({ message }, "Outreach message generated successfully")
    );
  } catch (error) {
    console.error("Error generating message:", error);
    return NextResponse.json(
      errorResponse(error instanceof Error ? error.message : "Failed to generate message"),
      { status: 500 }
    );
  }
}
