import { IListingAIService } from "./interface";
import { GenerateListingInput, GenerateListingOutput, GenerateListingOutputSchema } from "@/lib/db/schema";

export class GeminiListingAIService implements IListingAIService {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async generateListing(input: GenerateListingInput): Promise<GenerateListingOutput> {
    const prompt = `
You are an expert Indian Handicrafts and Cultural Heritage specialist assisting an artisan for the platform "KarigarSetu" (SIH26090).
Your mission is to take an artisan's product photograph and their spoken description (or text), and generate an AI-assisted market-ready listing plus a Digital Heritage Profile with transparent pricing and strict provenance.

CRITICAL AI SAFETY & ACCURACY RULES:
1. NEVER automatically claim official GI (Geographical Indication) certification. If a craft matches a GI candidate cluster, set "gi_candidacy_status" to "candidate_unverified", and mark the claim as "requires_verification".
2. NEVER assert unverified cultural history as absolute truth. Label all AI-inferred cultural hypotheses as "requires_verification".
3. Provide transparent AI pricing breakdown: raw materials cost, artisan crafting hours, hourly living wage in INR, and explicit rationale.
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
  "suggested_price_min": number,
  "suggested_price_max": number,
  "materials": ["Material 1", "Material 2"],
  "craft_name": "Traditional craft name",
  "region": "District, State",
  "state": "State",
  "district": "District",
  "heritage_story_draft": "Narrative about artisan generational heritage",
  "traditional_technique": "Detailed technique explanation",
  "cultural_significance": "Cultural or ritual significance",
  "motifs": ["Motif 1", "Motif 2"],
  "gi_tag_applicable": boolean,
  "gi_registry_number": string or null,
  "gi_candidacy_status": "candidate_unverified" or "not_applicable",
  "confidence_notes": ["Notes on classification and pricing rationale"],
  "pricing_breakdown": {
    "raw_materials_cost": number,
    "artisan_labor_hours": number,
    "hourly_living_wage": number,
    "fair_artisan_wage_total": number,
    "suggested_min_price": number,
    "suggested_max_price": number,
    "ondc_export_markup_suggestion": number,
    "rationale": "Detailed narrative explaining pricing formula"
  },
  "ai_understanding": {
    "speech_keywords": ["keyword 1", "keyword 2"],
    "detected_visual_features": ["feature 1", "feature 2"],
    "detected_materials": ["mat 1", "mat 2"],
    "voice_language_detected": "hi",
    "inferred_cluster": "Cluster name",
    "confidence_score": number between 0 and 1,
    "craft_technique_candidate": "Technique name",
    "safety_check_passed": true,
    "gi_candidacy_note": "Explanation of GI candidacy status"
  },
  "heritage_claims": [
    {
      "claim_text": "Specific claim about craft or material",
      "source_type": "artisan" | "ai" | "official",
      "verification_status": "verified" | "requires_verification" | "unverified",
      "source_reference": "Brief note on verification source"
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
      return GenerateListingOutputSchema.parse(parsed);
    } catch (err) {
      console.warn("Gemini generation notice, using deterministic mock", err);
      const { MockListingAIService } = await import("./mock-ai");
      return new MockListingAIService().generateListing(input);
    }
  }
}
