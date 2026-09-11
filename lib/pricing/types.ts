import {
  ComparisonAttributes,
  MarketPriceObservation,
} from "@/lib/db/schema";

export interface MarketplaceAdapter {
  id: string;
  name: string;
  badgeColor: string;
  requiresAttribution: boolean;
  attributionText?: string;
  refreshIntervalHours: number;
  formatUrl(rawUrl?: string): string;
}

export interface MarketPriceProvider {
  id: string;
  name: string;
  isLive: boolean;
  searchMarketplace(query: ComparisonAttributes): Promise<MarketPriceObservation[]>;
}

export interface ComparabilityScoreResult {
  overall: number; // 0 - 1 (e.g. 0.91)
  craft: number; // 0 - 1
  category: number; // 0 - 1
  material: number; // 0 - 1
  technique: number; // 0 - 1
  size: number; // 0 - 1
  handmade: number; // 0 - 1
  matchReasons: string[];
  isComparable: boolean; // threshold >= 0.70
}

export interface DiscoveryPipelineOptions {
  artisanCostReference?: {
    materialCost: number;
    laborHours: number;
    hourlyBenchmark: number;
    craftComplexity?: "Low" | "Medium" | "High" | "Master";
  };
  filterThreshold?: number; // default 0.70
  productId?: string;
}
