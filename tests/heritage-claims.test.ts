import { describe, it, expect } from "vitest";
import { HeritageClaimSchema, HeritageProfileSchema } from "../lib/db/schema";

describe("Heritage Claim Verification & Provenance Labeling", () => {
  it("should enforce valid source_type and default verification_status to requires_verification", () => {
    const claim = {
      claim_text: "Clay fired in pit kilns at approximately 750-800 degrees celsius.",
      source_type: "ai" as const,
    };

    const parsed = HeritageClaimSchema.parse(claim);
    expect(parsed.verification_status).toBe("requires_verification");
    expect(parsed.source_type).toBe("ai");
  });

  it("should support 'requires_verification' for unverified AI cultural claims", () => {
    const aiClaim = {
      claim_text: "Visual geometry matches Ranti village master school style.",
      source_type: "ai" as const,
      verification_status: "requires_verification" as const,
      source_reference: "AI visual morphology model",
    };

    const parsed = HeritageClaimSchema.parse(aiClaim);
    expect(parsed.verification_status).toBe("requires_verification");
    expect(parsed.source_type).toBe("ai");
  });

  it("should accept verified claims with official references", () => {
    const officialClaim = {
      claim_text: "Registered under Geographical Indication Act 1999 (GI Application 66).",
      source_type: "official" as const,
      verification_status: "verified" as const,
      source_url: "https://ipindia.gov.in",
      source_reference: "GI Registry GoI Class 21",
    };

    const parsed = HeritageClaimSchema.parse(officialClaim);
    expect(parsed.verification_status).toBe("verified");
    expect(parsed.source_type).toBe("official");
    expect(parsed.source_url).toBe("https://ipindia.gov.in");
  });

  it("should reject invalid source_type", () => {
    const invalidClaim = {
      claim_text: "Handmade craft item",
      source_type: "unrecognized_source",
    };

    const result = HeritageClaimSchema.safeParse(invalidClaim);
    expect(result.success).toBe(false);
  });

  it("should validate heritage profile with candidate GI status and multi-tier claims", () => {
    const profile = {
      id: "hp-test-01",
      craft_name: "Bastar Dokra",
      region: "Kondagaon, Bastar",
      state: "Chhattisgarh",
      district: "Bastar",
      materials: ["Brass Scrap", "Natural Beeswax"],
      traditional_technique: "Lost wax casting over clay core",
      cultural_story: "Indus valley metallurgical lineage",
      gi_status: "gi_candidate_unverified" as const,
      claims: [
        {
          claim_text: "Crafted using non-ferrous brass scrap and natural beeswax.",
          source_type: "artisan" as const,
          verification_status: "verified" as const,
        },
        {
          claim_text: "Visual geometry matches Kondagaon master artisan tradition.",
          source_type: "ai" as const,
          verification_status: "requires_verification" as const,
        },
      ],
    };

    const parsed = HeritageProfileSchema.parse(profile);
    expect(parsed.claims.length).toBe(2);
    expect(parsed.gi_status).toBe("gi_candidate_unverified");
    expect(parsed.claims[0].source_type).toBe("artisan");
    expect(parsed.claims[1].source_type).toBe("ai");
    expect(parsed.claims[1].verification_status).toBe("requires_verification");
  });
});
