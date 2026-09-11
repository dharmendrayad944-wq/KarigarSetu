import { describe, it, expect } from "vitest";
import { GenerateListingInputSchema, ProductSchema } from "../lib/db/schema";

describe("Listing Payload Validation", () => {
  it("should fail when neither voice transcript nor text description is provided", () => {
    const invalidInput = {
      image_url: "https://example.com/craft.jpg",
      selected_category: "pottery",
    };

    const result = GenerateListingInputSchema.safeParse(invalidInput);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((i) => i.message.includes("Either a voice transcript or a text description"))).toBe(true);
    }
  });

  it("should succeed when voice transcript is provided", () => {
    const validInput = {
      image_url: "https://example.com/craft.jpg",
      voice_transcript: "Traditional handmade terracotta pitcher with regional motifs",
      selected_category: "pottery",
    };

    const result = GenerateListingInputSchema.safeParse(validInput);
    expect(result.success).toBe(true);
  });

  it("should succeed when text fallback is provided instead of voice", () => {
    const validInput = {
      image_url: "https://example.com/craft.jpg",
      text_description: "Handcrafted brass bell metal bowl",
      selected_category: "metalwork",
    };

    const result = GenerateListingInputSchema.safeParse(validInput);
    expect(result.success).toBe(true);
  });

  it("should reject product with empty title or invalid description length", () => {
    const invalidProduct = {
      id: "prod-test",
      artisan_id: "artisan-test",
      title: "Hi", // < 3 chars
      description: "Short", // < 10 chars
      category: "pottery",
      craft_name: "Terracotta",
      state: "Rajasthan",
      district: "Jaipur",
      materials: ["Clay"],
      suggested_min_price: 500,
      suggested_max_price: 1000,
      featured_image_url: "https://example.com/pic.jpg",
    };

    const result = ProductSchema.safeParse(invalidProduct);
    expect(result.success).toBe(false);
  });
});
