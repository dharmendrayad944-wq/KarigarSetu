import { z } from "zod";

// ==============================================================================
// 1. PROVENANCE & VERIFICATION SYSTEM (SIH26090 Standards)
// ==============================================================================
export type SourceType = "artisan" | "ai" | "official";

export type VerificationStatus = "verified" | "requires_verification" | "unverified" | "rejected";

export type ProvenanceStatus = 
  | "Artisan Provided"
  | "AI Generated"
  | "AI Suggested"
  | "Verified Source"
  | "Requires Verification"
  | "Demo Data";

export type GIStatus =
  | "not_applicable"
  | "gi_candidate_unverified"
  | "gi_applied"
  | "gi_registered";

export type CraftComplexity = "Low" | "Medium" | "High" | "Master";

export type ProductStatus = 
  | "draft" 
  | "ai_generated" 
  | "artisan_review" 
  | "artisan_edited" 
  | "approved" 
  | "published" 
  | "archived";

// ==============================================================================
// 2. AI UNDERSTANDING SCHEMA (Pre-Generation Transparent Inspection)
// ==============================================================================
export const AIUnderstandingSchema = z.object({
  craft_name: z.string().default("Unknown Craft"),
  region: z.string().default("Unknown Region"),
  detected_materials: z.array(z.string()).default([]),
  detected_motifs: z.array(z.string()).default([]),
  language_detected: z.string().default("Hindi"),
  confidence_score: z.number().min(0).max(1).default(0.95),
  speech_keywords: z.array(z.string()).default([]),
  visual_features: z.array(z.string()).default([]),
  safety_check_passed: z.boolean().default(true),
  gi_candidacy_note: z.string().default("Requires official verification before GI certification can be claimed"),
});

export type AIUnderstanding = z.infer<typeof AIUnderstandingSchema>;

// ==============================================================================
// 3. PRODUCT COMPARISON ATTRIBUTES (Multimodal AI Extraction)
// ==============================================================================
export const ComparisonAttributesSchema = z.object({
  product_type: z.string(),
  craft: z.string(),
  category: z.string(),
  material: z.string(),
  technique: z.string().optional(),
  region: z.string().optional(),
  dimensions: z.string().nullable().optional(),
  quantity_or_set: z.string().nullable().optional(),
  handmade: z.boolean().default(true).optional(),
  design_or_motif: z.string().nullable().optional(),
});

export type ComparisonAttributes = z.infer<typeof ComparisonAttributesSchema>;

// ==============================================================================
// 3B. MARKET PRICE OBSERVATION (Raw external marketplace data)
// ==============================================================================
export const MarketPriceObservationSchema = z.object({
  id: z.string(),
  marketplace: z.string(), // "Amazon" | "Flipkart" | "ONDC" | "Other Approved" | "Tribes India"
  external_product_id: z.string().optional(),
  title: z.string(),
  url: z.string().optional(),
  price: z.number().positive(),
  currency: z.string().default("INR"),
  availability: z.enum(["available", "limited_stock", "out_of_stock"]).default("available"),
  source_type: z.enum(["official_api", "approved_partner", "ondc_network", "demo_data"]).default("demo_data"),
  retrieved_at: z.string(),
  is_demo: z.boolean().default(false),
  craft: z.string().optional(),
  material: z.string().optional(),
  technique: z.string().optional(),
});

export type MarketPriceObservation = z.infer<typeof MarketPriceObservationSchema>;

// ==============================================================================
// 3C. PRODUCT COMPARABLE (Filtered & scored comparable product)
// ==============================================================================
export const ProductComparableSchema = z.object({
  id: z.string(),
  product_id: z.string().optional(),
  market_price_observation_id: z.string().optional(),
  title: z.string(),
  marketplace: z.string(),
  price: z.number().positive(),
  currency: z.string().default("INR"),
  url: z.string().optional(),
  similarity_score: z.number().min(0).max(1), // e.g. 0.91 (91%)
  craft_similarity: z.number().min(0).max(1).optional(),
  category_similarity: z.number().min(0).max(1).optional(),
  material_similarity: z.number().min(0).max(1).optional(),
  technique_similarity: z.number().min(0).max(1).optional(),
  size_similarity: z.number().min(0).max(1).optional(),
  handmade_status: z.boolean().default(true),
  match_reasons: z.array(z.string()).default([]),
  retrieved_at: z.string(),
  source_type: z.string().default("demo_data"),
  is_demo: z.boolean().default(false),
});

export type ProductComparable = z.infer<typeof ProductComparableSchema>;

// ==============================================================================
// 3D. PRICE ANALYSIS (Statistical market reference & recommendation)
// ==============================================================================
export const PriceAnalysisSchema = z.object({
  id: z.string(),
  product_id: z.string().optional(),
  comparable_count: z.number().int().nonnegative(),
  min_price: z.number().positive(),
  median_price: z.number().positive(),
  max_price: z.number().positive(),
  recommended_min: z.number().positive(),
  recommended_max: z.number().positive(),
  confidence: z.enum(["high", "medium", "low"]).default("high"),
  evidence_strength: z.enum(["HIGH", "MEDIUM", "LOW"]).default("HIGH"),
  approved_sources_count: z.number().int().default(3),
  generated_at: z.string(),
  checked_at: z.string(),
  explanation: z.string(),
  is_demo_data: z.boolean().default(true),
  status: z.enum(["sufficient_data", "limited_data", "insufficient_data"]).default("sufficient_data"),
  comparables: z.array(ProductComparableSchema).default([]),
});

export type PriceAnalysis = z.infer<typeof PriceAnalysisSchema>;

// ==============================================================================
// 3E. ARTISAN PRICE DECISION (Final sovereign authority)
// ==============================================================================
export const ArtisanPriceDecisionSchema = z.object({
  id: z.string().optional(),
  product_id: z.string(),
  recommended_min: z.number().positive(),
  recommended_max: z.number().positive(),
  final_price: z.number().positive(),
  chosen_by: z.enum(["artisan_manual", "recommendation_accepted"]).default("recommendation_accepted"),
  created_at: z.string().default(() => new Date().toISOString()).optional(),
  pricing_sources: z.array(z.string()).default([]),
  notes: z.string().optional(),
});

export type ArtisanPriceDecision = z.infer<typeof ArtisanPriceDecisionSchema>;

// ==============================================================================
// 3F. OPTIONAL ARTISAN COST REFERENCE (Purely optional baseline, not market price)
// ==============================================================================
export const CostReferenceSchema = z.object({
  material_cost: z.number().nonnegative(),
  labor_hours: z.number().positive(),
  craft_complexity: z.enum(["Low", "Medium", "High", "Master"]).default("Medium"),
  hourly_benchmark: z.number().positive(),
  estimated_cost_subtotal: z.number().positive(),
  reference_min: z.number().positive(),
  reference_max: z.number().positive(),
  benchmark_source: z.string().default("Regional Craft Guild Reference"),
  rationale: z.string().min(5),
  is_optional_reference: z.boolean().default(true),
});

export type CostReference = z.infer<typeof CostReferenceSchema>;

// Backwards-compatibility alias
export const PricingBreakdownSchema = z.object({
  material_cost: z.number().nonnegative(),
  labor_hours: z.number().positive(),
  craft_complexity: z.enum(["Low", "Medium", "High", "Master"]).default("Medium"),
  hourly_benchmark: z.number().positive(),
  fair_wage_subtotal: z.number().positive(),
  suggested_min_price: z.number().positive(),
  suggested_max_price: z.number().positive(),
  ondc_export_markup_suggestion: z.number().positive().optional(),
  benchmark_source: z.string().default("Regional Craft Guild Standard"),
  rationale: z.string().min(5),
});

export type PricingBreakdown = z.infer<typeof PricingBreakdownSchema>;

// ==============================================================================
// 4. HERITAGE CLAIMS (Atomic verification trail)
// ==============================================================================
export const HeritageClaimSchema = z.object({
  id: z.string().optional(),
  heritage_record_id: z.string().optional(),
  claim_text: z.string().min(3, "Claim text must be at least 3 characters"),
  source_type: z.enum(["artisan", "official", "ai"]),
  provenance_label: z.enum([
    "Artisan Provided",
    "AI Generated",
    "AI Suggested",
    "Verified Source",
    "Requires Verification",
    "Demo Data"
  ]).default("Requires Verification"),
  verification_status: z.enum(["verified", "requires_verification", "unverified", "rejected"]).default("requires_verification"),
  source_reference: z.string().nullable().optional(),
  source_url: z.string().url().nullable().optional(),
  is_demo_reference: z.boolean().default(false),
  verified_by: z.string().nullable().optional(),
  verified_at: z.string().nullable().optional(),
});

export type HeritageClaim = z.infer<typeof HeritageClaimSchema>;

// ==============================================================================
// 5. HERITAGE DATA: Dedicated Digital Heritage Profile & Vault Record
// ==============================================================================
export const HeritageRecordSchema = z.object({
  id: z.string(),
  product_id: z.string().optional(),
  craft_name: z.string().min(2, "Craft name is required"),
  region: z.string().min(2, "Region is required"),
  state: z.string().min(2, "State is required"),
  district: z.string().min(2, "District is required"),
  artisan_name: z.string().default("Master Artisan"),
  artisan_lineage: z.string().optional(),
  traditional_technique: z.string().min(5, "Technique description is required"),
  materials: z.array(z.string()).min(1, "At least one material required"),
  motifs: z.array(z.string()).default([]),
  cultural_story: z.string().min(10, "Cultural significance story required"),
  artisan_story: z.string().optional(),
  original_language: z.string().default("Hindi"),
  gi_status: z.enum(["not_applicable", "gi_candidate_unverified", "gi_applied", "gi_registered"]).default("gi_candidate_unverified"),
  gi_demo_reference: z.string().nullable().optional(), // Clearly labeled if demo reference
  preservation_urgency: z.enum(["critical", "high", "medium", "flourishing"]).default("medium"),
  sources: z.array(z.object({
    title: z.string(),
    type: z.string(),
    url: z.string().nullable().optional(),
    is_demo: z.boolean().default(false),
  })).default([]),
  claims: z.array(HeritageClaimSchema).default([]),
  created_at: z.string().default(() => new Date().toISOString()),
  updated_at: z.string().default(() => new Date().toISOString()),
});

export type HeritageRecord = z.infer<typeof HeritageRecordSchema>;

// Alias for backwards compatibility
export const HeritageProfileSchema = HeritageRecordSchema;
export type HeritageProfile = HeritageRecord;

// ==============================================================================
// 6. PRODUCT DATA: Commercial Marketplace-Ready Listing Specification
// ==============================================================================
export const DimensionsSchema = z.object({
  length: z.number().positive().optional(),
  width: z.number().positive().optional(),
  height: z.number().positive().optional(),
  unit: z.enum(["cm", "inches"]).default("cm"),
});

export type Dimensions = z.infer<typeof DimensionsSchema>;

export const ProductSchema = z.object({
  id: z.string(),
  artisan_id: z.string(),
  title: z.string().min(3, "Title must be at least 3 characters"),
  title_hi: z.string().optional(),
  description: z.string().min(10, "Description must be at least 10 characters"),
  description_hi: z.string().optional(),
  category: z.string().min(2, "Category is required"),
  craft_name: z.string().min(2, "Craft name is required"),
  state: z.string().min(2, "State is required"),
  district: z.string().min(2, "District is required"),
  materials: z.array(z.string()).min(1, "At least one material must be specified"),
  motifs: z.array(z.string()).default([]),
  dimensions: DimensionsSchema.optional(),
  inventory: z.number().int().nonnegative().default(1),
  
  // Pricing & Market Discovery
  suggested_min_price: z.number().positive("Minimum price must be greater than zero"),
  suggested_max_price: z.number().positive("Maximum price must be greater than zero"),
  final_price: z.number().positive().nullable().optional(),
  price_analysis: PriceAnalysisSchema.optional(),
  artisan_price_decision: ArtisanPriceDecisionSchema.optional(),
  comparison_attributes: ComparisonAttributesSchema.optional(),
  cost_reference: CostReferenceSchema.optional(),
  pricing_breakdown: PricingBreakdownSchema.optional(), // Backwards compatibility
  
  // Status lifecycle
  status: z.enum([
    "draft", 
    "ai_generated", 
    "artisan_review", 
    "artisan_edited", 
    "approved", 
    "published", 
    "archived"
  ]).default("draft"),
  
  // Visuals & GI status
  featured_image_url: z.string().min(1, "Featured image URL is required"),
  additional_images: z.array(z.string()).default([]),
  gi_status: z.enum(["not_applicable", "gi_candidate_unverified", "gi_applied", "gi_registered"]).default("gi_candidate_unverified"),
  gi_demo_reference: z.string().nullable().optional(),
  gi_tag_applicable: z.boolean().default(false),
  gi_registry_number: z.string().nullable().optional(),
  gi_candidacy_status: z.enum(["not_applicable", "candidate_unverified", "applied", "registered_verified"]).default("candidate_unverified"),
  odop_product_tag: z.string().nullable().optional(),
  
  // Heritage integration
  artisan_story: z.string().optional(),
  heritage_record: HeritageRecordSchema.optional(),
  heritage_profile: HeritageRecordSchema.optional(), // Backwards compatibility
  ai_understanding: AIUnderstandingSchema.optional(),
  
  // Demo metadata
  is_demo_data: z.boolean().default(false),
  
  created_at: z.string().default(() => new Date().toISOString()),
  updated_at: z.string().default(() => new Date().toISOString()),
}).refine((data) => data.suggested_min_price <= data.suggested_max_price, {
  message: "suggested_min_price cannot exceed suggested_max_price",
  path: ["suggested_max_price"],
});

export type Product = z.infer<typeof ProductSchema>;

// ==============================================================================
// 7. AI LISTING GENERATION INPUT & OUTPUT CONTRACTS
// ==============================================================================
export const GenerateListingInputSchema = z.object({
  image_url: z.string().min(1, "Product image is required"),
  voice_transcript: z.string().optional(),
  text_description: z.string().optional(),
  artisan_location: z.object({
    state: z.string().default("Rajasthan"),
    district: z.string().default("Jaipur"),
  }).optional(),
  selected_category: z.string().optional(),
  language: z.enum(["hi", "en"]).default("hi"),
  hourly_benchmark: z.number().positive().optional(), // Optional artisan wage baseline
}).refine(
  (data) => !!data.voice_transcript || !!data.text_description,
  {
    message: "Either a voice transcript or a text description must be provided",
    path: ["voice_transcript"],
  }
);

export type GenerateListingInput = z.infer<typeof GenerateListingInputSchema>;

export const GenerateListingOutputSchema = z.object({
  title: z.string(),
  title_hi: z.string().optional(),
  description: z.string(),
  description_hi: z.string().optional(),
  category: z.string(),
  craft_name: z.string(),
  region: z.string(),
  state: z.string(),
  district: z.string(),
  materials: z.array(z.string()),
  motifs: z.array(z.string()),
  dimensions: DimensionsSchema.optional(),
  suggested_price_min: z.number().positive(),
  suggested_price_max: z.number().positive(),
  price_analysis: PriceAnalysisSchema.optional(),
  artisan_price_decision: ArtisanPriceDecisionSchema.optional(),
  comparison_attributes: ComparisonAttributesSchema.optional(),
  cost_reference: CostReferenceSchema.optional(),
  pricing_breakdown: PricingBreakdownSchema.optional(),
  ai_understanding: AIUnderstandingSchema,
  traditional_technique: z.string(),
  cultural_significance: z.string(),
  heritage_story_draft: z.string(),
  gi_status: z.enum(["not_applicable", "gi_candidate_unverified", "gi_applied", "gi_registered"]).default("gi_candidate_unverified"),
  gi_demo_reference: z.string().nullable().optional(),
  gi_tag_applicable: z.boolean().default(false),
  gi_registry_number: z.string().nullable().optional(),
  gi_candidacy_status: z.enum(["not_applicable", "candidate_unverified", "applied", "registered_verified"]).default("candidate_unverified"),
  confidence_notes: z.array(z.string()).default([]),
  heritage_claims: z.array(HeritageClaimSchema).default([]),
});

export type GenerateListingOutput = z.infer<typeof GenerateListingOutputSchema>;

// ==============================================================================
// 8. ARTISAN PROFILE & AUTH SCHEMAS (Separated)
// ==============================================================================
export const ArtisanProfileSchema = z.object({
  id: z.string(),
  user_id: z.string().optional(),
  full_name: z.string().min(2, "Full name required"),
  phone: z.string().min(10, "Phone number required"),
  email: z.string().email().optional(),
  state: z.string().min(2, "State required"),
  district: z.string().min(2, "District required"),
  village_or_cluster: z.string().optional(),
  craft_category: z.string().min(2, "Craft category required"),
  craft_name: z.string().optional(),
  preferred_language: z.enum(["hi", "en", "bn", "te", "ta", "mr", "gu", "kn", "or", "ml"]).default("hi"),
  experience_years: z.number().int().nonnegative().default(5),
  guild_affiliation: z.string().optional(),
  bio: z.string().optional(),
  is_verified: z.boolean().default(false),
  avatar_url: z.string().optional(),
  onboarding_completed: z.boolean().default(false),
});

export type ArtisanProfile = z.infer<typeof ArtisanProfileSchema>;
