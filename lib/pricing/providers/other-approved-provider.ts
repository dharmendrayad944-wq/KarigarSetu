import { ComparisonAttributes, MarketPriceObservation } from "@/lib/db/schema";
import { MarketPriceProvider, MarketplaceAdapter } from "../types";

export const OtherApprovedAdapter: MarketplaceAdapter = {
  id: "approved-guild",
  name: "Tribes India / Approved Craft Guilds",
  badgeColor: "bg-emerald-100 text-emerald-900 border-emerald-300",
  requiresAttribution: true,
  attributionText: "Listed on Tribes India / Central Cottage Industries Emporium / Approved Guilds",
  refreshIntervalHours: 12,
  formatUrl: (url?: string) => url || "https://tribesindia.com",
};

export class OtherApprovedProvider implements MarketPriceProvider {
  id = "approved-guild";
  name = "Approved Institutional Guilds";
  isLive = false;

  private partnerApiKey = process.env.APPROVED_GUILD_API_KEY;

  constructor() {
    this.isLive = Boolean(this.partnerApiKey);
  }

  async searchMarketplace(_query: ComparisonAttributes): Promise<MarketPriceObservation[]> {
    // Compliant access: Returns empty if live integration key not provided
    // Cleanly falls back to DemoMarketProvider with explicit labeling.
    if (!this.isLive) {
      return [];
    }

    try {
      return [];
    } catch (err) {
      console.warn("OtherApprovedProvider search error:", err);
      return [];
    }
  }
}
