import { AIProvider, IListingAIService } from "./interface";
import { MockListingAIService } from "./mock-ai";
import { GLMAIProvider } from "./glm-ai";
import { GeminiListingAIService } from "./gemini-ai";

export function getAIProvider(): AIProvider {
  const isDemoMode =
    process.env.AI_DEMO_MODE === "true" ||
    process.env.NEXT_PUBLIC_DEMO_MODE === "true" ||
    process.env.DEMO_MODE === "true";

  const providerName = (process.env.AI_PROVIDER || "glm").toLowerCase().trim();

  if (isDemoMode) {
    return new MockListingAIService();
  }

  // 1. GLM Provider (Primary intended provider as requested)
  if (providerName === "glm" || providerName === "zhipu") {
    const glmKey = process.env.GLM_API_KEY || process.env.ZHIPU_API_KEY;
    if (glmKey && glmKey.trim().length > 0) {
      return new GLMAIProvider(glmKey.trim());
    }
    // Graceful fallback to deterministic Mock AI if credentials missing
    console.warn("[getAIProvider] GLM_API_KEY is not configured; falling back gracefully to AI Demo Mode.");
    return new MockListingAIService();
  }

  // 2. Gemini Provider
  if (providerName === "gemini") {
    const geminiKey = process.env.GEMINI_API_KEY;
    if (geminiKey && geminiKey.trim().length > 0) {
      // Wrap GeminiListingAIService to conform to AIProvider
      const geminiService = new GeminiListingAIService(geminiKey.trim());
      const mockFallback = new MockListingAIService();
      return {
        generateProductListing: (input) => geminiService.generateListing(input),
        extractCraftMetadata: (input) => mockFallback.extractCraftMetadata(input),
        generateHeritageDraft: (input, u) => mockFallback.generateHeritageDraft(input, u),
        generatePriceEstimate: (params) => mockFallback.generatePriceEstimate(params),
      };
    }
    console.warn("[getAIProvider] GEMINI_API_KEY is not configured; falling back gracefully to AI Demo Mode.");
    return new MockListingAIService();
  }

  // Default to deterministic Mock AI service for SIH demo resilience
  return new MockListingAIService();
}

// Backwards-compatible service getter
export function getListingAIService(): IListingAIService {
  const provider = getAIProvider();
  return {
    generateListing: (input) => provider.generateProductListing(input),
  };
}
