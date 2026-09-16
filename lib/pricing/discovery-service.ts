import {
  ComparisonAttributes,
  MarketPriceObservation,
  PriceAnalysis,
  CostReference,
  PricingBreakdown,
} from "@/lib/db/schema";
import { MarketPriceProvider, DiscoveryPipelineOptions } from "./types";
import { AmazonProvider } from "./providers/amazon-provider";
import { FlipkartProvider } from "./providers/flipkart-provider";
import { ONDCProvider } from "./providers/ondc-provider";
import { OtherApprovedProvider } from "./providers/other-approved-provider";
import { DemoMarketProvider } from "./providers/demo-market-provider";
import { ComparabilityEngine } from "./comparability-engine";
import { MarketAnalysisEngine } from "./market-analysis-engine";

export class MarketPriceDiscoveryService {
  private providers: MarketPriceProvider[];
  private demoProvider: DemoMarketProvider;

  constructor() {
    this.demoProvider = new DemoMarketProvider();
    this.providers = [
      new AmazonProvider(),
      new FlipkartProvider(),
      new ONDCProvider(),
      new OtherApprovedProvider(),
    ];
  }

  /**
   * Executes the full Market-Based Price Discovery Pipeline:
   * PRODUCT ATTRIBUTES -> PROVIDER SEARCH -> COMPARABILITY FILTER -> PRICE ANALYSIS -> RECOMMENDATION
   */
  async discoverMarketPrice(
    attributes: ComparisonAttributes,
    options?: DiscoveryPipelineOptions
  ): Promise<{
    priceAnalysis: PriceAnalysis;
    optionalCostReference?: CostReference;
    legacyPricingBreakdown?: PricingBreakdown;
  }> {
    const threshold = options?.filterThreshold ?? 0.70;
    const allObservations: MarketPriceObservation[] = [];

    // 1. Query live compliant providers
    for (const provider of this.providers) {
      if (provider.isLive) {
        try {
          const results = await provider.searchMarketplace(attributes);
          allObservations.push(...results);
        } catch (err) {
          console.warn(`Provider ${provider.name} failed:`, err);
        }
      }
    }

    // 2. If no live data returned (or in demo mode), fall back to DemoMarketProvider
    let isUsingDemoData = false;
    if (allObservations.length === 0) {
      isUsingDemoData = true;
      const demoObservations = await this.demoProvider.searchMarketplace(attributes);
      allObservations.push(...demoObservations);
    }

    // 3. Comparability Scoring & Filtering
    const validComparables = ComparabilityEngine.filterAndScoreComparables(
      attributes,
      allObservations,
      threshold,
      options?.productId
    );

    // 4. Statistical Market Analysis
    const priceAnalysis = MarketAnalysisEngine.analyze(validComparables, {
      productId: options?.productId,
      isDemoData: isUsingDemoData,
    });

    // 5. Optional Artisan Cost Reference (Kept strictly separate from market observation)
    let optionalCostReference: CostReference | undefined;
    let legacyPricingBreakdown: PricingBreakdown | undefined;

    if (options?.artisanCostReference) {
      const { materialCost, laborHours, hourlyBenchmark, craftComplexity = "High" } = options.artisanCostReference;
      const laborSubtotal = Math.round(laborHours * hourlyBenchmark);
      const estTotal = materialCost + laborSubtotal;
      const refMin = Math.round(estTotal);
      const refMax = Math.round(estTotal * 1.25);

      optionalCostReference = {
        material_cost: materialCost,
        labor_hours: laborHours,
        craft_complexity: craftComplexity,
        hourly_benchmark: hourlyBenchmark,
        estimated_cost_subtotal: laborSubtotal,
        reference_min: refMin,
        reference_max: refMax,
        benchmark_source: "Regional Craft Guild Reference Baseline",
        rationale: `Artisan reference breakdown: Material ₹${materialCost} + ${laborHours}h craft labor. This is an optional cost reference only, not a market pricing decision.`,
        is_optional_reference: true,
      };

      legacyPricingBreakdown = {
        material_cost: materialCost,
        labor_hours: laborHours,
        craft_complexity: craftComplexity,
        hourly_benchmark: hourlyBenchmark,
        fair_wage_subtotal: laborSubtotal,
        suggested_min_price: priceAnalysis.recommended_min,
        suggested_max_price: priceAnalysis.recommended_max,
        ondc_export_markup_suggestion: Math.round(priceAnalysis.recommended_max * 1.15),
        benchmark_source: "Regional Craft Guild Standard",
        rationale: `Market analysis of ${priceAnalysis.comparable_count} comparable products suggests ₹${priceAnalysis.recommended_min} - ₹${priceAnalysis.recommended_max}. Final price decided by artisan.`,
      };
    }

    return {
      priceAnalysis,
      optionalCostReference,
      legacyPricingBreakdown,
    };
  }
}

export const marketPriceDiscoveryService = new MarketPriceDiscoveryService();
