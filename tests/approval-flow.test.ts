import { describe, it, expect, beforeEach } from "vitest";
import { ProductRepository } from "../lib/db/repository";
import { Product } from "../lib/db/schema";

describe("Approval Flow & Publication Guard", () => {
  const testProduct: Product = {
    id: "prod-flow-test-01",
    artisan_id: "artisan-test-01",
    title: "Handmade Terracotta Plate",
    description: "Traditional baked earth decorative plate with folk tribal patterns.",
    category: "pottery",
    craft_name: "Terracotta Craft",
    state: "Rajasthan",
    district: "Jaipur",
    materials: ["Alluvial Clay", "Natural Slip"],
    motifs: ["Floral", "Sun"],
    inventory: 1,
    additional_images: [],
    suggested_min_price: 600,
    suggested_max_price: 900,
    status: "draft",
    featured_image_url: "https://example.com/clay.jpg",
    gi_status: "not_applicable",
    gi_tag_applicable: false,
    gi_candidacy_status: "not_applicable",
    is_demo_data: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  beforeEach(() => {
    ProductRepository.saveProduct(testProduct);
  });

  it("should prevent direct publication of a product in draft status", () => {
    expect(() => {
      ProductRepository.publishProduct("prod-flow-test-01");
    }).toThrowError(/Product cannot be published before explicit artisan approval/);
  });

  it("should allow transition from draft to approved upon artisan review", () => {
    const approved = ProductRepository.approveProduct("prod-flow-test-01", {
      final_price: 750,
      title: "Handmade Terracotta Plate (Approved Title)",
    });

    expect(approved.status).toBe("approved");
    expect(approved.final_price).toBe(750);
    expect(approved.title).toBe("Handmade Terracotta Plate (Approved Title)");
  });

  it("should successfully publish a product once approved by the artisan", () => {
    // Step 1: Approve
    ProductRepository.approveProduct("prod-flow-test-01");

    // Step 2: Publish
    const published = ProductRepository.publishProduct("prod-flow-test-01");
    expect(published.status).toBe("published");
  });
});
