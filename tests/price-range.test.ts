import { describe, it, expect } from "vitest";
import {
  ProductSchema,
  ComparisonAttributesSchema,
  MarketPriceObservationSchema,
  PriceAnalysisSchema,
  ArtisanPriceDecisionSchema,
  CostReferenceSchema,
} from "../lib/db/schema";
import { ComparabilityEngine } from "../lib/pricing/comparability-engine";
import { MarketAnalysisEngine } from "../lib/pricing/market-analysis-engine";
import { DemoMarketProvider } from "../lib/pricing/providers/demo-market-provider";

describe("Market-Based Price Discovery & Comparability Validation", () => {
  const validBaseProduct = {
    id: "prod-price-test",
    artisan_id: "artisan-test",
    title: "Handmade Blue Pottery Vase",
    description: "Authentic ceramic piece crafted with quartz and multani mitti.",
    category: "pottery",
    craft_name: "Jaipur Blue Pottery",
    state: "Rajasthan",
    district: "Jaipur",
    materials: ["Quartz", "Glass", "Multani Mitti"],
    featured_image_url: "https://example.com/pic.jpg",
    inventory: 1,
    additional_images: [],
  };

  it("should fail when suggested_min_price exceeds suggested_max_price", () => {
    const invalidPriceProduct = {
      ...validBaseProduct,
      suggested_min_price: 3000,
      suggested_max_price: 1500, // min > max is invalid!
    };

    const result = ProductSchema.safeParse(invalidPriceProduct);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(
        result.error.issues.some((i) =>
          i.message.includes("suggested_min_price cannot exceed suggested_max_price")
        )
      ).toBe(true);
    }
  });

  it("should fail when suggested prices are negative or zero", () => {
    const negativePriceProduct = {
      ...validBaseProduct,
      suggested_min_price: -100,
      suggested_max_price: 500,
    };

    const result = ProductSchema.safeParse(negativePriceProduct);
    expect(result.success).toBe(false);
  });

  it("should succeed when min_price is less than or equal to max_price", () => {
    const validProduct = {
      ...validBaseProduct,
      suggested_min_price: 1200,
      suggested_max_price: 1800,
    };

    const result = ProductSchema.safeParse(validProduct);
    expect(result.success).toBe(true);
  });

  it("should validate multi-factor comparability scoring beyond simple keyword matching", () => {
    const target = {
      product_type: "Bastar Dhokra Bell Metal Nandi Bull",
      craft: "Bastar Dhokra",
      category: "metalwork",
      material: "Bell metal / Brass alloy / Beeswax",
      technique: "Lost-wax casting",
      dimensions: "18 x 10 x 16 cm",
      handmade: true,
    };

    const candidateComparable = {
      id: "obs-1",
      marketplace: "Amazon",
      title: "Handmade Bastar Dhokra Bell Metal Figurine (18 cm)",
      price: 3799,
      currency: "INR",
      availability: "available" as const,
      source_type: "official_api" as const,
      retrieved_at: "2026-09-11T18:30:00Z",
      is_demo: false,
      craft: "Bastar Dhokra",
      material: "Bell metal",
      technique: "Lost-wax casting",
    };

    const evaluation = ComparabilityEngine.evaluate(target, candidateComparable);
    expect(evaluation.overall).toBeGreaterThanOrEqual(0.85);
    expect(evaluation.craft).toBeGreaterThanOrEqual(0.90);
    expect(evaluation.isComparable).toBe(true);
    expect(evaluation.matchReasons.length).toBeGreaterThan(0);
  });

  it("should filter out non-comparable listings that do not meet the 70% comparability threshold", () => {
    const target = {
      product_type: "Bastar Dhokra Bell Metal Nandi Bull",
      craft: "Bastar Dhokra",
      category: "metalwork",
      material: "Bell metal",
      technique: "Lost-wax casting",
      dimensions: "18 cm",
      handmade: true,
    };

    const dissimilarCandidate = {
      id: "obs-plastic",
      marketplace: "Amazon",
      title: "Plastic Injection Molded Bull Toy",
      price: 299,
      currency: "INR",
      availability: "available" as const,
      source_type: "demo_data" as const,
      retrieved_at: "2026-09-11T18:30:00Z",
      is_demo: true,
      craft: "Plastic Mold",
      material: "Plastic Polymer",
      technique: "Machine Molded",
    };

    const evaluation = ComparabilityEngine.evaluate(target, dissimilarCandidate);
    expect(evaluation.overall).toBeLessThan(0.70);
    expect(evaluation.isComparable).toBe(false);
  });

  it("should calculate statistical market metrics (min, median, max, recommended range) strictly from comparables", () => {
    const mockComparables = [
      {
        id: "c1",
        title: "Item 1",
        marketplace: "Flipkart",
        price: 3499,
        currency: "INR",
        similarity_score: 0.93,
        retrieved_at: "2026-09-11T18:30:00Z",
        source_type: "demo_data",
        is_demo: true,
        match_reasons: [],
        handmade_status: true,
      },
      {
        id: "c2",
        title: "Item 2",
        marketplace: "ONDC",
        price: 3650,
        currency: "INR",
        similarity_score: 0.91,
        retrieved_at: "2026-09-11T18:30:00Z",
        source_type: "demo_data",
        is_demo: true,
        match_reasons: [],
        handmade_status: true,
      },
      {
        id: "c3",
        title: "Item 3",
        marketplace: "Flipkart",
        price: 3750,
        currency: "INR",
        similarity_score: 0.92,
        retrieved_at: "2026-09-11T18:30:00Z",
        source_type: "demo_data",
        is_demo: true,
        match_reasons: [],
        handmade_status: true,
      },
      {
        id: "c4",
        title: "Item 4",
        marketplace: "Amazon",
        price: 3799,
        currency: "INR",
        similarity_score: 0.96,
        retrieved_at: "2026-09-11T18:30:00Z",
        source_type: "demo_data",
        is_demo: true,
        match_reasons: [],
        handmade_status: true,
      },
      {
        id: "c5",
        title: "Item 5",
        marketplace: "Amazon",
        price: 3850,
        currency: "INR",
        similarity_score: 0.94,
        retrieved_at: "2026-09-11T18:30:00Z",
        source_type: "demo_data",
        is_demo: true,
        match_reasons: [],
        handmade_status: true,
      },
      {
        id: "c6",
        title: "Item 6",
        marketplace: "Approved Partner",
        price: 3950,
        currency: "INR",
        similarity_score: 0.90,
        retrieved_at: "2026-09-11T18:30:00Z",
        source_type: "demo_data",
        is_demo: true,
        match_reasons: [],
        handmade_status: true,
      },
      {
        id: "c7",
        title: "Item 7",
        marketplace: "ONDC",
        price: 4100,
        currency: "INR",
        similarity_score: 0.97,
        retrieved_at: "2026-09-11T18:30:00Z",
        source_type: "demo_data",
        is_demo: true,
        match_reasons: [],
        handmade_status: true,
      },
      {
        id: "c8",
        title: "Item 8",
        marketplace: "Approved Partner",
        price: 4299,
        currency: "INR",
        similarity_score: 0.95,
        retrieved_at: "2026-09-11T18:30:00Z",
        source_type: "demo_data",
        is_demo: true,
        match_reasons: [],
        handmade_status: true,
      },
    ];

    const analysis = MarketAnalysisEngine.analyze(mockComparables);

    expect(analysis.comparable_count).toBe(8);
    expect(analysis.min_price).toBe(3499);
    expect(analysis.max_price).toBe(4299);
    expect(analysis.median_price).toBe(3825); // Midpoint of 3799 & 3850
    expect(analysis.recommended_min).toBeGreaterThanOrEqual(3499);
    expect(analysis.recommended_max).toBeLessThanOrEqual(4299);
    expect(analysis.evidence_strength).toBe("HIGH");
  });

  it("should enforce artisan decision authority over AI recommendations", () => {
    const decision = {
      product_id: "prod-test-01",
      recommended_min: 3600,
      recommended_max: 4100,
      final_price: 4500, // Artisan sovereign choice above recommendation
      chosen_by: "artisan_manual" as const,
      pricing_sources: ["Amazon", "Flipkart", "ONDC"],
    };

    const parsed = ArtisanPriceDecisionSchema.parse(decision);
    expect(parsed.final_price).toBe(4500);
    expect(parsed.chosen_by).toBe("artisan_manual");
  });

  it("should support optional artisan cost reference without confusing it with market price", () => {
    const costRef = {
      material_cost: 450,
      labor_hours: 18,
      craft_complexity: "High" as const,
      hourly_benchmark: 130,
      estimated_cost_subtotal: 2340,
      reference_min: 2790,
      reference_max: 3487,
      benchmark_source: "Mithila Regional Craft Guild Reference",
      rationale: "Optional artisan internal cost reference.",
      is_optional_reference: true,
    };

    const parsed = CostReferenceSchema.parse(costRef);
    expect(parsed.is_optional_reference).toBe(true);
    expect(parsed.material_cost).toBe(450);
    expect(parsed.estimated_cost_subtotal).toBe(2340);
  });
});
