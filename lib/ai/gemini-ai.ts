import { IListingAIService } from "./interface";
import {
  GenerateListingInput,
  GenerateListingOutput,
  ComparisonAttributes,
} from "@/lib/db/schema";
import { marketPriceDiscoveryService } from "@/lib/pricing/discovery-service";

export class GeminiListingAIService implements IListingAIService {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async generateListing(input: GenerateListingInput): Promise<GenerateListingOutput> {
    const prompt = `
You are an expert Indian Handicrafts and Cultural Heritage specialist assisting an artisan for the platform "KarigarSetu" (SIH26090).
Your mission is to take an artisan's product photograph and their spoken description (or text), and extract structured product morphology, craft attributes, and a Digital Heritage Profile.

CRITICAL AI SAFETY & ACCURACY RULES:
1. NEVER invent or fabricate external marketplace prices, competitor listings, or fake URLs. External market evidence is retrieved separately via compliant provider APIs.
2. NEVER automatically claim official GI (Geographical Indication) certification. If a craft matches a GI candidate cluster, set "gi_candidacy_status" to "candidate_unverified", and mark the claim as "requires_verification".
3. NEVER assert unverified cultural history as absolute truth. Label all AI-inferred cultural hypotheses as "requires_verification".
4. Separate artisan-provided facts from AI-inferred facts. Set verification_status to "requires_verification" or "unverified" for any AI inference!

ARTISAN INPUT:
- Audio/Spoken description: "${input.voice_transcript || input.text_description || "Handmade traditional craft"}"
- Artisan Region: ${input.artisan_location?.district || "Unknown District"}, ${input.artisan_location?.state || "Unknown State"}
- Selected craft category: ${input.selected_category || "Unspecified"}
- Language: ${input.language}

OUTPUT FORMAT:
Respond ONLY with a valid JSON object matching this exact schema:
{
  "title": "Concise, attractive English title (3-7 words)",
  "title_hi": "शीर्षक हिंदी में",
  "description": "Rich 2-3 paragraph marketplace description highlighting craftsmanship, materials, and utility",
  "description_hi": "हिंदी में सुंदर विवरण",
  "category": "One of: pottery, textiles, metalwork, paintings, woodwork, jewellery",
  "materials": ["Material 1", "Material 2"],
  "craft_name": "Traditional craft name",
  "region": "District, State",
  "state": "State",
  "district": "District",
  "dimensions": { "length": 18, "width": 10, "height": 16, "unit": "cm" },
  "heritage_story_draft": "Narrative about artisan generational heritage",
  "traditional_technique": "Detailed technique explanation",
  "cultural_significance": "Cultural or ritual significance",
  "motifs": ["Motif 1", "Motif 2"],
  "gi_tag_applicable": boolean,
  "gi_registry_number": string or null,
  "gi_candidacy_status": "candidate_unverified" or "not_applicable",
  "confidence_notes": ["Notes on classification and technique"],
  "ai_understanding": {
    "craft_name": "Craft name",
    "region": "Region name",
    "detected_materials": ["mat 1", "mat 2"],
    "detected_motifs": ["motif 1"],
    "language_detected": "hi",
    "confidence_score": 0.95,
    "speech_keywords": ["keyword 1", "keyword 2"],
    "visual_features": ["feature 1", "feature 2"],
    "safety_check_passed": true,
    "gi_candidacy_note": "Explanation of GI candidacy status"
  },
  "heritage_claims": [
    {
      "claim_text": "Specific claim about craft or material",
      "source_type": "artisan",
      "verification_status": "verified",
      "source_reference": "Spoken artisan description"
    }
  ]
}
`;

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${this.apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  { text: prompt },
                  ...(input.image_url && input.image_url.startsWith("data:")
                    ? [
                        {
                          inline_data: {
                            mime_type: input.image_url.split(";")[0].split(":")[1] || "image/jpeg",
                            data: input.image_url.split(",")[1],
                          },
                        },
                      ]
                    : []),
                ],
              },
            ],
            generationConfig: {
              response_mime_type: "application/json",
              temperature: 0.2,
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.statusText}`);
      }

      const data = await response.json();
      const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!rawText) {
        throw new Error("No response generated by Gemini model");
      }

      const parsed = JSON.parse(rawText);

      // Perform genuine Market Price Discovery on the extracted attributes
      const attributes: ComparisonAttributes = {
        product_type: parsed.title || "Handmade Artisan Craft",
        craft: parsed.craft_name || "Traditional Craft",
        category: parsed.category || "woodwork",
        material: (parsed.materials || []).join(" / "),
        technique: parsed.traditional_technique,
        region: parsed.region,
        dimensions: parsed.dimensions ? `${parsed.dimensions.length}x${parsed.dimensions.width}x${parsed.dimensions.height} cm` : null,
        handmade: true,
      };

      const discovery = await marketPriceDiscoveryService.discoverMarketPrice(attributes);

      return {
        ...parsed,
        suggested_price_min: discovery.priceAnalysis.recommended_min,
        suggested_price_max: discovery.priceAnalysis.recommended_max,
        price_analysis: discovery.priceAnalysis,
        comparison_attributes: attributes,
        cost_reference: discovery.optionalCostReference,
        pricing_breakdown: discovery.legacyPricingBreakdown,
      };
    } catch (err) {
      console.warn("Gemini generation notice, using deterministic mock", err);
      const { MockListingAIService } = await import("./mock-ai");
      return new MockListingAIService().generateListing(input);
    }
  }
}
