import { ProductComparable, PriceAnalysis } from "@/lib/db/schema";

export class MarketAnalysisEngine {
  /**
   * Performs statistical analysis on valid comparable products.
   * Calculates minimum, median, maximum, recommended range, and evidence strength.
   * Never manufactures prices if data is insufficient.
   */
  static analyze(
    comparables: ProductComparable[],
    options?: {
      productId?: string;
      isDemoData?: boolean;
      checkedAt?: string;
    }
  ): PriceAnalysis {
    const checkedAt = options?.checkedAt || new Date().toISOString();
    const isDemoData = options?.isDemoData ?? true;

    // 1. Failure Handling: Insufficient data
    if (!comparables || comparables.length === 0) {
      return {
        id: `analysis-${Date.now()}`,
        product_id: options?.productId,
        comparable_count: 0,
        min_price: 0,
        median_price: 0,
        max_price: 0,
        recommended_min: 0,
        recommended_max: 0,
        confidence: "low",
        evidence_strength: "LOW",
        approved_sources_count: 0,
        generated_at: checkedAt,
        checked_at: checkedAt,
        explanation: "Insufficient comparable market data. No approved marketplace listings matched craft specifications.",
        is_demo_data: isDemoData,
        status: "insufficient_data",
        comparables: [],
      };
    }

    const prices = comparables.map((c) => c.price).sort((a, b) => a - b);
    const n = prices.length;

    // 2. Statistical Metrics
    const minPrice = prices[0];
    const maxPrice = prices[n - 1];

    let medianPrice: number;
    if (n % 2 === 1) {
      medianPrice = prices[Math.floor(n / 2)];
    } else {
      const mid1 = prices[n / 2 - 1];
      const mid2 = prices[n / 2];
      medianPrice = Math.round((mid1 + mid2) / 2);
    }

    // Weighted median based on similarity scores
    let weightedSum = 0;
    let totalWeight = 0;
    for (const c of comparables) {
      const weight = Math.pow(c.similarity_score, 2);
      weightedSum += c.price * weight;
      totalWeight += weight;
    }
    const weightedAvg = totalWeight > 0 ? Math.round(weightedSum / totalWeight) : medianPrice;

    // 3. Recommended Market Range Derivation
    // Derived strictly from distribution:
    // If n >= 4, use 25th to 75th percentiles (interquartile) or conservative buffer around median
    let recommendedMin: number;
    let recommendedMax: number;

    if (n >= 4) {
      const q1Index = Math.floor(n * 0.25);
      const q3Index = Math.floor(n * 0.75);
      // Round to nearest 50
      recommendedMin = Math.round(prices[q1Index] / 50) * 50;
      recommendedMax = Math.round(prices[q3Index] / 50) * 50;

      // Ensure reasonable spread if Q1 == Q3 using weighted similarity average
      if (recommendedMin === recommendedMax) {
        recommendedMin = Math.round((weightedAvg * 0.95) / 50) * 50;
        recommendedMax = Math.round((weightedAvg * 1.08) / 50) * 50;
      }
    } else {
      // Small sample fallback
      recommendedMin = Math.round((minPrice * 1.02) / 50) * 50;
      recommendedMax = Math.round((maxPrice * 0.98) / 50) * 50;
    }

    // Bounds safety: recommended range must be within [minPrice, maxPrice]
    recommendedMin = Math.max(minPrice, recommendedMin);
    recommendedMax = Math.min(maxPrice, Math.max(recommendedMin, recommendedMax));

    // 4. Evidence Strength Calculation
    const uniqueSources = new Set(comparables.map((c) => c.marketplace)).size;
    const avgSimilarity = comparables.reduce((acc, c) => acc + c.similarity_score, 0) / n;

    let evidenceStrength: "HIGH" | "MEDIUM" | "LOW" = "HIGH";
    let confidence: "high" | "medium" | "low" = "high";
    let status: "sufficient_data" | "limited_data" | "insufficient_data" = "sufficient_data";

    if (n >= 5 && uniqueSources >= 2 && avgSimilarity >= 0.85) {
      evidenceStrength = "HIGH";
      confidence = "high";
      status = "sufficient_data";
    } else if (n >= 2 && avgSimilarity >= 0.72) {
      evidenceStrength = "MEDIUM";
      confidence = "medium";
      status = "sufficient_data";
    } else {
      evidenceStrength = "LOW";
      confidence = "low";
      status = "limited_data";
    }

    const explanation =
      evidenceStrength === "HIGH"
        ? `Recommendation is based on ${n} comparable products retrieved from ${uniqueSources} approved market data sources with high similarity (${Math.round(avgSimilarity * 100)}%).`
        : evidenceStrength === "MEDIUM"
        ? `Recommendation is based on ${n} comparable products across approved market sources with moderate similarity (${Math.round(avgSimilarity * 100)}%).`
        : `Limited comparable market data (${n} products found) — recommendation confidence is low.`;

    return {
      id: `analysis-${Date.now()}`,
      product_id: options?.productId,
      comparable_count: n,
      min_price: minPrice,
      median_price: medianPrice,
      max_price: maxPrice,
      recommended_min: recommendedMin,
      recommended_max: recommendedMax,
      confidence,
      evidence_strength: evidenceStrength,
      approved_sources_count: uniqueSources,
      generated_at: checkedAt,
      checked_at: checkedAt,
      explanation,
      is_demo_data: isDemoData,
      status,
      comparables,
    };
  }
}
