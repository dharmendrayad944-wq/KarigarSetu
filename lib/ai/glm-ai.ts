import { AIProvider } from "./interface";
import {
  GenerateListingInput,
  GenerateListingOutput,
  AIUnderstanding,
  PricingBreakdown,
  HeritageClaim,
  CraftComplexity,
  GenerateListingOutputSchema,
  ComparisonAttributes,
  PriceAnalysis,
  CostReference,
} from "@/lib/db/schema";
import { MockListingAIService } from "./mock-ai";

export class GLMAIProvider implements AIProvider {
  private apiKey: string;
  private baseURL: string;
  private model: string;
  private fallbackProvider: MockListingAIService;

  constructor(apiKey?: string, baseURL?: string, model?: string) {
    this.apiKey = apiKey || process.env.GLM_API_KEY || process.env.ZHIPU_API_KEY || "";
    this.baseURL = baseURL || process.env.GLM_BASE_URL || "https://open.bigmodel.cn/api/paas/v4";
    this.model = model || process.env.GLM_MODEL || "glm-4v";
    this.fallbackProvider = new MockListingAIService();
  }

  async generateProductListing(input: GenerateListingInput): Promise<GenerateListingOutput> {
    if (!this.apiKey || this.apiKey.trim().length === 0) {
      console.warn("[GLMAIProvider] No GLM_API_KEY found, falling back gracefully to Mock AI Provider.");
      return this.fallbackProvider.generateListing(input);
    }

    try {
      const prompt = `You are KarigarSetu's AI Engine. Analyze this Indian artisan handicraft.
Input Voice / Transcript: "${input.voice_transcript || input.text_description}"
Location: ${input.artisan_location?.district || "India"}, ${input.artisan_location?.state || "India"}
Category Hint: ${input.selected_category || "Handicraft"}
Language: ${input.language || "hi"}

Return ONLY a valid JSON object matching this schema:
{
  "title": string,
  "title_hi": string,
  "description": string,
  "description_hi": string,
  "category": string,
  "craft_name": string,
  "region": string,
  "state": string,
  "district": string,
  "materials": string[],
  "motifs": string[],
  "dimensions": { "length": number, "width": number, "height": number, "unit": "cm" },
  "suggested_price_min": number,
  "suggested_price_max": number,
  "pricing_breakdown": {
    "material_cost": number,
    "labor_hours": number,
    "craft_complexity": "Low" | "Medium" | "High" | "Master",
    "hourly_benchmark": number,
    "fair_wage_subtotal": number,
    "suggested_min_price": number,
    "suggested_max_price": number,
    "ondc_export_markup_suggestion": number,
    "benchmark_source": string,
    "rationale": string
  },
  "ai_understanding": {
    "craft_name": string,
    "region": string,
    "detected_materials": string[],
    "detected_motifs": string[],
    "language_detected": string,
    "confidence_score": number,
    "speech_keywords": string[],
    "visual_features": string[],
    "safety_check_passed": boolean,
    "gi_candidacy_note": string
  },
  "traditional_technique": string,
  "cultural_significance": string,
  "heritage_story_draft": string,
  "gi_status": "not_applicable" | "gi_candidate_unverified" | "gi_applied" | "gi_registered",
  "gi_demo_reference": string | null,
  "gi_tag_applicable": boolean,
  "gi_registry_number": null,
  "gi_candidacy_status": "not_applicable" | "candidate_unverified" | "applied" | "registered_verified",
  "confidence_notes": string[],
  "heritage_claims": [
    {
      "claim_text": string,
      "source_type": "artisan" | "official" | "ai",
      "provenance_label": "Artisan Provided" | "AI Generated" | "Verified Source" | "Requires Verification" | "Demo Data",
      "verification_status": "verified" | "requires_verification" | "unverified" | "rejected",
      "source_reference": string | null,
      "is_demo_reference": boolean
    }
  ]
}
IMPORTANT: NEVER invent fake government GI registration numbers. If referencing a cluster, mark gi_status as gi_candidate_unverified or gi_registered and keep gi_registry_number null.`;

      const response = await fetch(`${this.baseURL}/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: this.model,
          messages: [
            {
              role: "system",
              content: "You are KarigarSetu's AI Engine. You must respond strictly in JSON matching the requested structure.",
            },
            {
              role: "user",
              content: [
                { type: "text", text: prompt },
                ...(input.image_url ? [{ type: "image_url", image_url: { url: input.image_url } }] : []),
              ],
            },
          ],
          response_format: { type: "json_object" },
          temperature: 0.2,
        }),
      });

      if (!response.ok) {
        console.warn(`[GLMAIProvider] API returned ${response.status}: ${await response.text()}. Falling back to Mock.`);
        return this.fallbackProvider.generateListing(input);
      }

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content;
      if (!content) {
        throw new Error("Empty response from GLM API");
      }

      const parsed = JSON.parse(content);
      const validated = GenerateListingOutputSchema.parse(parsed);
      return validated;
    } catch (err) {
      console.warn("[GLMAIProvider] Generation failed or malformed JSON, falling back safely to Mock:", err);
      return this.fallbackProvider.generateListing(input);
    }
  }

  // Helper implementations for modular AIProvider interface
  async extractCraftMetadata(input: GenerateListingInput): Promise<AIUnderstanding> {
    const listing = await this.generateProductListing(input);
    return listing.ai_understanding;
  }

  async generateHeritageDraft(
    input: GenerateListingInput,
    understanding: AIUnderstanding
  ): Promise<{ technique: string; cultural_story: string; claims: HeritageClaim[] }> {
    const listing = await this.generateProductListing(input);
    return {
      technique: listing.traditional_technique,
      cultural_story: listing.cultural_significance,
      claims: listing.heritage_claims,
    };
  }

  async discoverMarketPrice(attributes: ComparisonAttributes): Promise<PriceAnalysis> {
    const { marketPriceDiscoveryService } = await import("@/lib/pricing/discovery-service");
    const result = await marketPriceDiscoveryService.discoverMarketPrice(attributes);
    return result.priceAnalysis;
  }

  async generatePriceEstimate(params: {
    material_cost?: number;
    labor_hours?: number;
    complexity?: CraftComplexity;
    hourly_benchmark?: number;
    craft?: string;
    region?: string;
  }): Promise<CostReference> {
    const materialCost = params.material_cost || 500;
    const laborHours = params.labor_hours || 10;
    const complexity = params.complexity || "Medium";
    const benchmark = params.hourly_benchmark || 135;
    const wageSubtotal = Math.round(laborHours * benchmark);
    const minPrice = Math.round(materialCost + wageSubtotal);
    const maxPrice = Math.round(minPrice * 1.25);

    return {
      material_cost: materialCost,
      labor_hours: laborHours,
      craft_complexity: complexity,
      hourly_benchmark: benchmark,
      estimated_cost_subtotal: wageSubtotal,
      reference_min: minPrice,
      reference_max: maxPrice,
      benchmark_source: `${params.region || "Regional"} Craft Guild Reference`,
      rationale: `Optional cost reference: Material ₹${materialCost} + Labour (${laborHours} hrs @ ₹${benchmark}/hr benchmark = ₹${wageSubtotal}). This is an internal cost reference only, not a market price.`,
      is_optional_reference: true,
    };
  }

  async explainMarketComparison(
    target: ComparisonAttributes,
    priceAnalysis: PriceAnalysis
  ): Promise<string> {
    const count = priceAnalysis.comparable_count;
    const median = priceAnalysis.median_price.toLocaleString("en-IN");
    const min = priceAnalysis.recommended_min.toLocaleString("en-IN");
    const max = priceAnalysis.recommended_max.toLocaleString("en-IN");
    return `Analysis based on ${count} comparable ${target.craft} products across approved marketplace sources (Amazon, Flipkart, ONDC). Market median is ₹${median} with an indicative range of ₹${min} – ₹${max}. Final price is decided by the artisan.`;
  }
}
