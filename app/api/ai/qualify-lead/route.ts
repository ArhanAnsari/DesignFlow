/**
 * Lead Qualification API Route
 * Qualifies leads based on provided information
 */

import { NextRequest, NextResponse } from "next/server";
import { qualifyLead } from "@/lib/ai/service";
import { errorResponse, successResponse } from "@/lib/api-response";

/**
 * POST /api/ai/qualify-lead
 * Qualify a single lead
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { leadInfo } = body;

    if (!leadInfo) {
      return NextResponse.json(
        errorResponse("Lead information is required"),
        { status: 400 }
      );
    }

    const qualification = await qualifyLead(leadInfo);

    return NextResponse.json(
      successResponse(qualification, "Lead qualified successfully")
    );
  } catch (error) {
    console.error("Error qualifying lead:", error);
    return NextResponse.json(
      errorResponse(error instanceof Error ? error.message : "Failed to qualify lead"),
      { status: 500 }
    );
  }
}
