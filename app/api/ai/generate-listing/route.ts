import { NextRequest, NextResponse } from "next/server";
import { GenerateListingInputSchema } from "@/lib/db/schema";
import { getListingAIService } from "@/lib/ai/service";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parseResult = GenerateListingInputSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: parseResult.error.flatten(),
        },
        { status: 400 }
      );
    }

    const aiService = getListingAIService();
    const output = await aiService.generateListing(parseResult.data);

    return NextResponse.json({
      success: true,
      data: output,
      is_demo_mode: process.env.NEXT_PUBLIC_DEMO_MODE === "true" || !process.env.GEMINI_API_KEY,
    });
  } catch (error: any) {
    console.error("AI Listing generation error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate listing" },
      { status: 500 }
    );
  }
}
