import { ComparisonAttributes, MarketPriceObservation } from "@/lib/db/schema";
import { MarketPriceProvider, MarketplaceAdapter } from "../types";

export const AmazonAdapter: MarketplaceAdapter = {
  id: "amazon",
  name: "Amazon India",
  badgeColor: "bg-amber-100 text-amber-900 border-amber-300",
  requiresAttribution: true,
  attributionText: "Listed on Amazon.in (Prices and availability subject to seller updates)",
  refreshIntervalHours: 6,
  formatUrl: (url?: string) => url || "https://www.amazon.in",
};

export class AmazonProvider implements MarketPriceProvider {
  id = "amazon";
  name = "Amazon India";
  isLive = false;

  private apiKey = process.env.AMAZON_PRODUCT_API_KEY;
  private associateTag = process.env.AMAZON_ASSOCIATE_TAG;

  constructor() {
    this.isLive = Boolean(this.apiKey && this.associateTag);
  }

  async searchMarketplace(_query: ComparisonAttributes): Promise<MarketPriceObservation[]> {
    // Compliant API rule: If no official API key is configured, return empty
    // System cleanly falls back to DemoMarketProvider with explicit "Demo Market Data" labeling.
    if (!this.isLive) {
      return [];
    }

    try {
      // Official Product Advertising API call would execute here when configured
      return [];
    } catch (err) {
      console.warn("AmazonProvider official API search error:", err);
      return [];
    }
  }
}
