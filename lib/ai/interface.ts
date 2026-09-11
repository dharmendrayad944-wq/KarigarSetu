import {
  GenerateListingInput,
  GenerateListingOutput,
  AIUnderstanding,
  PricingBreakdown,
  HeritageClaim,
  CraftComplexity,
  ComparisonAttributes,
  PriceAnalysis,
  CostReference,
} from "@/lib/db/schema";

export interface AIProvider {
  generateProductListing(input: GenerateListingInput): Promise<GenerateListingOutput>;
  extractCraftMetadata(input: GenerateListingInput): Promise<AIUnderstanding>;
  generateHeritageDraft(
    input: GenerateListingInput,
    understanding: AIUnderstanding
  ): Promise<{
    technique: string;
    cultural_story: string;
    claims: HeritageClaim[];
  }>;
  discoverMarketPrice?(attributes: ComparisonAttributes): Promise<PriceAnalysis>;
  generatePriceEstimate?(params: {
    material_cost?: number;
    labor_hours?: number;
    complexity?: CraftComplexity;
    hourly_benchmark?: number;
    craft?: string;
    region?: string;
  }): Promise<PricingBreakdown | CostReference>;
}

// Backwards-compatibility alias
export interface IListingAIService {
  generateListing(input: GenerateListingInput): Promise<GenerateListingOutput>;
}

export interface ISpeechService {
  transcribeAudio(audioBase64OrBuffer: string | ArrayBuffer, mimeType: string, language?: string): Promise<string>;
}
