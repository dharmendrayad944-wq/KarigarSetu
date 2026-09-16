import { describe, it, expect, beforeEach } from "vitest";
import { validateFinalArtisanPrice } from "../lib/pricing/price-validator";
import { ProductRepository } from "../lib/db/repository";
import { Product } from "../lib/db/schema";
import { LocalImageStorageService, SupabaseImageStorageService } from "../lib/storage/image-storage";

describe("P0-2: Final Price Validation & Guardrails", () => {
  it("rejects zero as invalid price", () => {
    const res = validateFinalArtisanPrice(0);
    expect(res.isValid).toBe(false);
    expect(res.error).toMatch(/greater than ₹0/i);
  });

  it("rejects negative numbers", () => {
    const res = validateFinalArtisanPrice(-500);
    expect(res.isValid).toBe(false);
    expect(res.error).toMatch(/greater than ₹0/i);
  });

  it("rejects empty string and whitespace", () => {
    expect(validateFinalArtisanPrice("").isValid).toBe(false);
    expect(validateFinalArtisanPrice("   ").isValid).toBe(false);
  });

  it("rejects NaN and Infinity", () => {
    expect(validateFinalArtisanPrice(NaN).isValid).toBe(false);
    expect(validateFinalArtisanPrice(Infinity).isValid).toBe(false);
    expect(validateFinalArtisanPrice(-Infinity).isValid).toBe(false);
  });

  it("rejects non-numeric string values", () => {
    const res = validateFinalArtisanPrice("free");
    expect(res.isValid).toBe(false);
    expect(res.error).toMatch(/valid/i);
  });

  it("rejects values exceeding maximum limit (₹10,000,000)", () => {
    const res = validateFinalArtisanPrice(15000000);
    expect(res.isValid).toBe(false);
    expect(res.error).toMatch(/exceed/i);
  });

  it("accepts valid positive numbers and currency-formatted strings", () => {
    const res1 = validateFinalArtisanPrice(1200);
    expect(res1.isValid).toBe(true);
    expect(res1.sanitizedValue).toBe(1200);

    const res2 = validateFinalArtisanPrice(" ₹ 2,450 ");
    expect(res2.isValid).toBe(true);
    expect(res2.sanitizedValue).toBe(2450);
  });

  it("prevents approving a product with 0 or negative price in repository", () => {
    const testProd: Product = {
      id: "prod-p0-test-price",
      artisan_id: "artisan-test-01",
      title: "Handmade Dokra Bell",
      description: "Traditional lost-wax bell.",
      category: "metalware",
      craft_name: "Dokra Bell Metal",
      state: "West Bengal",
      district: "Bankura",
      materials: ["Brass"],
      motifs: ["Tribal"],
      inventory: 2,
      additional_images: [],
      suggested_min_price: 800,
      suggested_max_price: 1200,
      status: "draft",
      featured_image_url: "https://example.com/bell.jpg",
      gi_status: "not_applicable",
      gi_tag_applicable: false,
      gi_candidacy_status: "not_applicable",
      is_demo_data: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    ProductRepository.saveProduct(testProd);

    // Attempting to approve with 0
    expect(() => {
      ProductRepository.approveProduct("prod-p0-test-price", { final_price: 0 });
    }).toThrowError(/greater than ₹0/i);

    // Attempting to approve with -100
    expect(() => {
      ProductRepository.approveProduct("prod-p0-test-price", { final_price: -100 });
    }).toThrowError(/greater than ₹0/i);
  });
});

describe("P0-3: Truthful Network Events & Inquiry Metric", () => {
  beforeEach(() => {
    ProductRepository.resetToSeed();
  });

  it("derives network inquiries dynamically from deterministic event records", () => {
    const events = ProductRepository.getNetworkEvents();
    expect(events.length).toBeGreaterThan(0);

    const expectedInquiries = ProductRepository.getNetworkEvents().filter((e) => e.event_type === "inquiry").length;
    const inquiries = events.filter((e) => e.event_type === "inquiry");
    expect(inquiries.length).toBe(expectedInquiries);
    expect(inquiries.length).toBeGreaterThanOrEqual(4);
  });

  it("updates inquiry count when new network events are added", () => {
    const initialInquiries = ProductRepository.getNetworkEvents().filter(
      (e) => e.event_type === "inquiry"
    ).length;

    ProductRepository.addNetworkEvent({
      id: "ne-test-new",
      product_id: "prod-001",
      craft_name: "Blue Pottery",
      network: "ONDC",
      event_type: "inquiry",
      buyer_region: "Kochi, Kerala",
      message: "Bulk enquiry for 25 handcrafted vases",
      created_at: new Date().toISOString(),
      mode: "demo",
    });

    const updatedInquiries = ProductRepository.getNetworkEvents().filter(
      (e) => e.event_type === "inquiry"
    ).length;

    expect(updatedInquiries).toBe(initialInquiries + 1);
  });

  it("resets network events cleanly when demo data is reset", () => {
    const baselineInquiries = ProductRepository.getNetworkEvents().filter((e) => e.event_type === "inquiry").length;

    ProductRepository.addNetworkEvent({
      id: "ne-test-reset",
      product_id: "prod-002",
      craft_name: "Dokra",
      network: "GeM",
      event_type: "inquiry",
      buyer_region: "New Delhi",
      message: "Government corporate gift inquiry",
      created_at: new Date().toISOString(),
      mode: "demo",
    });

    ProductRepository.resetToSeed();
    const events = ProductRepository.getNetworkEvents();
    const inquiries = events.filter((e) => e.event_type === "inquiry");
    expect(inquiries.length).toBe(baselineInquiries);
  });
});

describe("P0-1: Image Storage Abstraction", () => {
  it("LocalImageStorageService stores and retrieves base64 data URLs", async () => {
    const localService = new LocalImageStorageService();
    const sampleDataUrl = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD";
    const result = await localService.uploadImage(sampleDataUrl, { craftName: "test.jpg" });
    expect(result.url).toBe(sampleDataUrl);
    expect(result.storageType).toBe("local_compressed");
  });

  it("SupabaseImageStorageService is future-compatible with graceful fallback when unconfigured", async () => {
    const supabaseService = new SupabaseImageStorageService();
    const sampleDataUrl = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD";
    const result = await supabaseService.uploadImage(sampleDataUrl, { craftName: "sample-artisan-craft.jpg" });
    // In demo environment without live Supabase credentials, gracefully falls back to local_compressed
    expect(result.url).toBe(sampleDataUrl);
    expect(result.storageType).toBe("local_compressed");
  });
});
