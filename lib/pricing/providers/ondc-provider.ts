import { ComparisonAttributes, MarketPriceObservation } from "@/lib/db/schema";
import { MarketPriceProvider, MarketplaceAdapter } from "../types";

export const ONDCAdapter: MarketplaceAdapter = {
  id: "ondc",
  name: "ONDC Network",
  badgeColor: "bg-emerald-100 text-emerald-900 border-emerald-300",
  requiresAttribution: true,
  attributionText: "Open Network for Digital Commerce (ONDC Verified BAP/BPP Registry)",
  refreshIntervalHours: 4,
  formatUrl: (url?: string) => url || "https://ondc.org",
};

export class ONDCProvider implements MarketPriceProvider {
  id = "ondc";
  name = "ONDC Network";
  isLive = false;

  private gatewayUrl = process.env.ONDC_GATEWAY_URL;

  constructor() {
    this.isLive = Boolean(this.gatewayUrl);
  }

  async searchMarketplace(_query: ComparisonAttributes): Promise<MarketPriceObservation[]> {
    if (!this.isLive) {
      return [];
    }

    try {
      // ONDC Protocol BAP search call executes here
      return [];
    } catch (err) {
      console.warn("ONDCProvider search error:", err);
      return [];
    }
  }
}
