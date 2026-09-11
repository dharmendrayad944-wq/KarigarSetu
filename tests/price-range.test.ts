import { describe, it, expect } from "vitest";
import { ProductSchema, PricingBreakdownSchema } from "../lib/db/schema";

describe("Price Range & AI Breakdown Validation", () => {
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

  it("should validate transparent pricing breakdown calculations", () => {
    const validPricingBreakdown = {
      material_cost: 450,
      labor_hours: 18,
      craft_complexity: "High" as const,
      hourly_benchmark: 130,
      fair_wage_subtotal: 2340,
      suggested_min_price: 2400,
      suggested_max_price: 3200,
      ondc_export_markup_suggestion: 3500,
      benchmark_source: "Mithila Regional Craft Guild Benchmark",
      rationale: "18 hours of detailed freehand painting @ ₹130/hr plus ₹450 organic dye cost.",
    };

    const parsed = PricingBreakdownSchema.parse(validPricingBreakdown);
    expect(parsed.material_cost).toBe(450);
    expect(parsed.labor_hours).toBe(18);
    expect(parsed.fair_wage_subtotal).toBe(2340);
    expect(parsed.hourly_benchmark).toBe(130);
  });
});
