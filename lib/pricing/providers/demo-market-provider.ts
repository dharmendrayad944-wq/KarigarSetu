import { ComparisonAttributes, MarketPriceObservation } from "@/lib/db/schema";
import { MarketPriceProvider } from "../types";

export interface DemoCraftListingTemplate {
  craftKey: string;
  listings: Array<{
    marketplace: string;
    title: string;
    price: number;
    currency?: string;
    url: string;
    availability: "available" | "limited_stock" | "out_of_stock";
    material: string;
    technique: string;
    size?: string;
    isHandmade: boolean;
  }>;
}

// Deterministic SIH 2026 Market Dataset across the 7 required crafts
export const SIH_DEMO_MARKETPLACE_DATA: Record<string, DemoCraftListingTemplate> = {
  // 1. Bastar Dhokra (Section 8 hero scenario)
  "bastar dhokra": {
    craftKey: "bastar dhokra",
    listings: [
      {
        marketplace: "Amazon",
        title: "Tribal Bastar Dhokra Bell Metal Nandi Bull Handcrafted Figurine (18 cm)",
        price: 3799,
        currency: "INR",
        url: "https://www.amazon.in/dp/B09DOKRA01",
        availability: "available",
        material: "Bell metal / Brass alloy",
        technique: "Lost-wax casting",
        size: "18 x 10 x 16 cm",
        isHandmade: true,
      },
      {
        marketplace: "Flipkart",
        title: "Bastar Tribal Art Brass Bell Metal Sacred Nandi Bull Sculpture",
        price: 3499,
        currency: "INR",
        url: "https://www.flipkart.com/item/FLPDOKRA02",
        availability: "available",
        material: "Bell metal scrap",
        technique: "Lost-wax casting",
        size: "17 x 9 x 15 cm",
        isHandmade: true,
      },
      {
        marketplace: "ONDC (TribesIndia)",
        title: "Authentic Bastar Bell Metal Nandi Totem - Kondagaon Craft Guild",
        price: 4100,
        currency: "INR",
        url: "https://tribesindia.ondc.org/item/TI-DOK-33",
        availability: "available",
        material: "Bell metal alloy / Beeswax mould",
        technique: "Lost-wax casting (Cire-perdue)",
        size: "19 x 11 x 17 cm",
        isHandmade: true,
      },
      {
        marketplace: "ONDC (CraftsBazaar)",
        title: "Chhatisgarh Indigenous Dhokra Bull Metal Art Piece",
        price: 3650,
        currency: "INR",
        url: "https://craftsbazaar.ondc.org/p/cb-7712",
        availability: "available",
        material: "Brass scrap",
        technique: "Lost-wax casting",
        size: "18 x 10 x 16 cm",
        isHandmade: true,
      },
      {
        marketplace: "Amazon",
        title: "Handmade Bell Metal Animal Figurine - Traditional Tribal Decor",
        price: 3850,
        currency: "INR",
        url: "https://www.amazon.in/dp/B09DOKRA05",
        availability: "available",
        material: "Brass / Bronze",
        technique: "Lost-wax hollow casting",
        size: "18 x 10 x 16 cm",
        isHandmade: true,
      },
      {
        marketplace: "Flipkart",
        title: "Ghadwa Lineage Dhokra Bull Statuette in Non-Ferrous Metal",
        price: 3750,
        currency: "INR",
        url: "https://www.flipkart.com/item/FLPDOKRA06",
        availability: "available",
        material: "Bell metal",
        technique: "Lost-wax casting",
        size: "18 x 10 x 16 cm",
        isHandmade: true,
      },
      {
        marketplace: "Approved Partner",
        title: "Heritage Living Vault Bastar Dhokra Nandi Masterwork",
        price: 4299,
        currency: "INR",
        url: "https://heritagecrafts.in/p/dokra-4299",
        availability: "limited_stock",
        material: "Virgin bell metal / Honeycomb wax",
        technique: "Traditional cire-perdue casting",
        size: "20 x 11 x 18 cm",
        isHandmade: true,
      },
      {
        marketplace: "Approved Partner",
        title: "Bastar Tribal Craft Collective Lost Wax Horned Bull",
        price: 3950,
        currency: "INR",
        url: "https://tribalcollective.in/p/dok-bull-08",
        availability: "available",
        material: "Bell metal / River silt",
        technique: "Lost-wax casting",
        size: "18 x 10 x 16 cm",
        isHandmade: true,
      },
    ],
  },

  // 2. Jaipur Blue Pottery
  "jaipur blue pottery": {
    craftKey: "jaipur blue pottery",
    listings: [
      {
        marketplace: "Amazon",
        title: "Handmade Jaipur Blue Pottery Flower Vase 10 inch Persian Floral",
        price: 1850,
        currency: "INR",
        url: "https://www.amazon.in/dp/B08JBP01",
        availability: "available",
        material: "Quartz powder, Glass, Multani Mitti",
        technique: "Moulding, low-fire glaze, cobalt oxide hand painting",
        size: "25 x 12 x 12 cm",
        isHandmade: true,
      },
      {
        marketplace: "Flipkart",
        title: "Authentic Rajasthan Blue Pottery Hand Painted Table Vase",
        price: 1699,
        currency: "INR",
        url: "https://www.flipkart.com/item/FLPJBP02",
        availability: "available",
        material: "Quartz dough, natural glazes",
        technique: "Hand painted brushwork, non-clay pottery",
        size: "24 x 11 x 11 cm",
        isHandmade: true,
      },
      {
        marketplace: "ONDC (RajasthanCrafts)",
        title: "Kripal Kumbh Style Cobalt Blue Pottery Decorative Vase",
        price: 2100,
        currency: "INR",
        url: "https://rajasthan.ondc.org/p/rj-pot-101",
        availability: "available",
        material: "Quartz, Katira Gond, Natural Oxides",
        technique: "Hand-thrown quartz paste, traditional kiln firing",
        size: "26 x 13 x 13 cm",
        isHandmade: true,
      },
      {
        marketplace: "Amazon",
        title: "Traditional Jaipur Ceramic Blue Pottery Arabesque Urn",
        price: 1750,
        currency: "INR",
        url: "https://www.amazon.in/dp/B08JBP04",
        availability: "available",
        material: "Quartz / Multani clay",
        technique: "Blue oxide hand-brushed motifs",
        size: "25 x 12 x 12 cm",
        isHandmade: true,
      },
      {
        marketplace: "Approved Partner",
        title: "Heritage Guild Certified Jaipur Blue Pottery Decorative Vessel",
        price: 2250,
        currency: "INR",
        url: "https://heritagecrafts.in/p/jbp-2250",
        availability: "limited_stock",
        material: "Quartz, glass, plant gum",
        technique: "Turquoise & cobalt glaze, wood-fired kiln",
        size: "27 x 14 x 14 cm",
        isHandmade: true,
      },
      {
        marketplace: "Flipkart",
        title: "Craftsman Studio Jaipur Floral Blue Pottery Table Vase",
        price: 1950,
        currency: "INR",
        url: "https://www.flipkart.com/item/FLPJBP06",
        availability: "available",
        material: "Quartz composite",
        technique: "Persian botanical motifs, low thermal firing",
        size: "25 x 12 x 12 cm",
        isHandmade: true,
      },
    ],
  },

  // 3. Madhubani Painting
  "madhubani painting": {
    craftKey: "madhubani painting",
    listings: [
      {
        marketplace: "Amazon",
        title: "Authentic Madhubani Hand Painting on Khadi Silk - Tree of Life (22x15 in)",
        price: 2999,
        currency: "INR",
        url: "https://www.amazon.in/dp/B07MAD01",
        availability: "available",
        material: "Pure Handloom Khadi Silk, Organic Dyes",
        technique: "Bamboo pen nib (Nibs) freehand line art (Kachni & Bharni)",
        size: "56 x 38 cm",
        isHandmade: true,
      },
      {
        marketplace: "Flipkart",
        title: "Mithila Folk Art Handmade Khadi Silk Painting Traditional Birds & Lotus",
        price: 2650,
        currency: "INR",
        url: "https://www.flipkart.com/item/FLPMAD02",
        availability: "available",
        material: "Handspun Khadi silk, botanical pigments",
        technique: "Kachni fine crosshatch and double border",
        size: "54 x 36 cm",
        isHandmade: true,
      },
      {
        marketplace: "ONDC (BiharCrafts)",
        title: "Jitwarpur Master Artisan Certified Madhubani Painting on Raw Silk",
        price: 3400,
        currency: "INR",
        url: "https://bihar.ondc.org/p/mithila-904",
        availability: "available",
        material: "Tussar / Khadi Silk, Mineral & Plant colors",
        technique: "Traditional nib inkwork, no chemical fixatives",
        size: "60 x 40 cm",
        isHandmade: true,
      },
      {
        marketplace: "Approved Partner",
        title: "National Awardee Lineage Mithila Painting Kohbar / Tree of Life",
        price: 3800,
        currency: "INR",
        url: "https://heritagecrafts.in/p/madhubani-3800",
        availability: "limited_stock",
        material: "Ahimsa silk fabric, natural soot and turmeric dye",
        technique: "Intricate double-line outlining and pointillism",
        size: "60 x 45 cm",
        isHandmade: true,
      },
      {
        marketplace: "Amazon",
        title: "Traditional Mithila Art Khadi Fabric Wall Art Fish & Flora Motif",
        price: 2850,
        currency: "INR",
        url: "https://www.amazon.in/dp/B07MAD05",
        availability: "available",
        material: "Khadi silk blend, natural pigments",
        technique: "Bharni color fill with natural plant extract",
        size: "55 x 38 cm",
        isHandmade: true,
      },
    ],
  },

  // 4. Channapatna Toys
  "channapatna toys": {
    craftKey: "channapatna toys",
    listings: [
      {
        marketplace: "Amazon",
        title: "Channapatna Handcrafted Natural Wooden Rocking Horse Toy Set",
        price: 950,
        currency: "INR",
        url: "https://www.amazon.in/dp/B06CHAN01",
        availability: "available",
        material: "Wrightia tinctoria (Aale mara wood), Non-toxic Vegetable lac",
        technique: "Lathe turning, friction heat lacquering with screw pine leaf polish",
        size: "20 x 8 x 14 cm",
        isHandmade: true,
      },
      {
        marketplace: "Flipkart",
        title: "Eco-Friendly Safe Wooden Lacquerware Toy from Channapatna",
        price: 799,
        currency: "INR",
        url: "https://www.flipkart.com/item/FLPCHAN02",
        availability: "available",
        material: "Ivory wood, turmeric & indigo natural dyes",
        technique: "Wood turning lathe, natural lacquer coat",
        size: "18 x 7 x 12 cm",
        isHandmade: true,
      },
      {
        marketplace: "ONDC (KarnatakaHandicrafts)",
        title: "Cauvery Handicrafts GI Certified Channapatna Wooden Animal Toy",
        price: 1150,
        currency: "INR",
        url: "https://cauvery.ondc.org/p/chn-wood-55",
        availability: "available",
        material: "Seasoned Hale wood, organic shellac",
        technique: "Traditional motorized & hand-pedal lathe turning",
        size: "22 x 9 x 15 cm",
        isHandmade: true,
      },
      {
        marketplace: "Approved Partner",
        title: "Artisan Guild Channapatna Heirloom Handturned Lacquer Toy",
        price: 1200,
        currency: "INR",
        url: "https://heritagecrafts.in/p/channapatna-1200",
        availability: "available",
        material: "Wrightia tinctoria, vegetable colors",
        technique: "Hand lathe turned with talipot leaf finishing",
        size: "21 x 8 x 14 cm",
        isHandmade: true,
      },
      {
        marketplace: "Amazon",
        title: "Traditional Wooden Play Toy Hand Painted in Channapatna Karnataka",
        price: 880,
        currency: "INR",
        url: "https://www.amazon.in/dp/B06CHAN05",
        availability: "available",
        material: "Softwood, natural resin lacquer",
        technique: "Smooth edge turned craft",
        size: "19 x 8 x 13 cm",
        isHandmade: true,
      },
    ],
  },

  // 5. Banarasi Silk
  "banarasi silk": {
    craftKey: "banarasi silk",
    listings: [
      {
        marketplace: "Amazon",
        title: "Handloom Pure Katan Silk Banarasi Brocade Saree with Real Zari Boota",
        price: 14500,
        currency: "INR",
        url: "https://www.amazon.in/dp/B05BAN01",
        availability: "available",
        material: "100% Pure Mulberry Katan Silk, Gold/Silver Zari thread",
        technique: "Kadhwa handloom weave, floral jaal, meenakari detailing",
        size: "5.5 meters saree + 1 meter blouse",
        isHandmade: true,
      },
      {
        marketplace: "Flipkart",
        title: "Authentic Varanasi Handwoven Pure Silk Bridal Sari Heritage Collection",
        price: 13200,
        currency: "INR",
        url: "https://www.flipkart.com/item/FLPBAN02",
        availability: "available",
        material: "Hand-reeled pure silk, electroplated zari",
        technique: "Pit loom weaving, traditional naksha pattern",
        size: "6.5 meters",
        isHandmade: true,
      },
      {
        marketplace: "ONDC (UPHandlooms)",
        title: "Varanasi Weavers Cooperative GI Certified Katan Silk Brocade Saree",
        price: 16800,
        currency: "INR",
        url: "https://uphandlooms.ondc.org/p/vns-silk-44",
        availability: "limited_stock",
        material: "Pure Katan Silk, Tested Zari, Natural Dye",
        technique: "Hand-pulled jacquard/jala system, interlocking weft",
        size: "6.5 meters with blouse piece",
        isHandmade: true,
      },
      {
        marketplace: "Approved Partner",
        title: "Heritage Master Weaver Katan Silk Shikargah Handloom Saree",
        price: 17500,
        currency: "INR",
        url: "https://heritagecrafts.in/p/banarasi-17500",
        availability: "available",
        material: "Pure Mulberry Silk Warp & Weft, Fine Zari",
        technique: "Pure Kadhwa technique (no loose threads at reverse)",
        size: "6.5 meters",
        isHandmade: true,
      },
      {
        marketplace: "Amazon",
        title: "Traditional Banarasi Floral Zari Handloom Silk Sari",
        price: 13900,
        currency: "INR",
        url: "https://www.amazon.in/dp/B05BAN05",
        availability: "available",
        material: "Pure Silk, Silver Gilded Zari",
        technique: "Handloom weaving Varanasi cluster",
        size: "6.5 meters",
        isHandmade: true,
      },
    ],
  },

  // 6. Kutch Embroidery
  "kutch embroidery": {
    craftKey: "kutch embroidery",
    listings: [
      {
        marketplace: "Amazon",
        title: "Handcrafted Kutch Suf & Mirrorwork Embroidered Wall Hanging (30x20 in)",
        price: 4200,
        currency: "INR",
        url: "https://www.amazon.in/dp/B04KUTCH01",
        availability: "available",
        material: "Handwoven Cotton fabric, Silk floss thread, Convex glass mirrors",
        technique: "Geometric counting Suf stitch, Abhala mirror insertion, herringbone",
        size: "76 x 50 cm",
        isHandmade: true,
      },
      {
        marketplace: "Flipkart",
        title: "Authentic Rabari Tribal Embroidered Tapestry with Mirror Detailing",
        price: 3750,
        currency: "INR",
        url: "https://www.flipkart.com/item/FLPKUTCH02",
        availability: "available",
        material: "Khadi cotton, wool & silk threads, glass mirrors",
        technique: "Chain stitch, square chain, buttonhole mirror stitching",
        size: "72 x 48 cm",
        isHandmade: true,
      },
      {
        marketplace: "ONDC (GujaratCrafts)",
        title: "Gurjari Certified Kutch Artisans Collective Embroidered Heritage Toran",
        price: 4600,
        currency: "INR",
        url: "https://gurjari.ondc.org/p/kutch-emb-88",
        availability: "available",
        material: "Natural dyed cotton canvas, genuine leaded mirrors",
        technique: "Paako & Mutava microscopic needlework",
        size: "80 x 52 cm",
        isHandmade: true,
      },
      {
        marketplace: "Approved Partner",
        title: "Master Craftswoman Kutch Ahir Hand Embroidered Wall Art",
        price: 4850,
        currency: "INR",
        url: "https://heritagecrafts.in/p/kutch-4850",
        availability: "limited_stock",
        material: "Organic Kala Cotton, Silk Floss, Traditional Abhala",
        technique: "Freehand floral needle embroidery with circular mirrors",
        size: "80 x 55 cm",
        isHandmade: true,
      },
      {
        marketplace: "Amazon",
        title: "Tribal Gujarat Kutch Mirror Work Decorative Hanging",
        price: 3950,
        currency: "INR",
        url: "https://www.amazon.in/dp/B04KUTCH05",
        availability: "available",
        material: "Cotton base, glass mirrors, colorful embroidery threads",
        technique: "Traditional Kutch stitchwork",
        size: "75 x 50 cm",
        isHandmade: true,
      },
    ],
  },

  // 7. Pattachitra
  "pattachitra": {
    craftKey: "pattachitra",
    listings: [
      {
        marketplace: "Amazon",
        title: "Traditional Odisha Pattachitra Palm Leaf Engraving Tala Pattachitra (15x10 in)",
        price: 3200,
        currency: "INR",
        url: "https://www.amazon.in/dp/B03PAT01",
        availability: "available",
        material: "Treated Palm Leaves (Tala Patra), Natural Lampblack, Herbal Turmeric",
        technique: "Iron stylus engraving (Lekhani), soot rubbing, cord binding",
        size: "38 x 25 cm",
        isHandmade: true,
      },
      {
        marketplace: "Flipkart",
        title: "Raghurajpur Heritage Artisan Hand-Painted Cloth Pattachitra - Krishna Leela",
        price: 2899,
        currency: "INR",
        url: "https://www.flipkart.com/item/FLPPAT02",
        availability: "available",
        material: "Patta (Tamarind seed paste primed cotton cloth), Stone & Conch shell colors",
        technique: "Fine squirrel hair brushwork, natural lacquer polish",
        size: "40 x 28 cm",
        isHandmade: true,
      },
      {
        marketplace: "ONDC (OdishaHandicrafts)",
        title: "Utkalika Certified Traditional Palm Leaf Pattachitra Folk Scroll",
        price: 3700,
        currency: "INR",
        url: "https://utkalika.ondc.org/p/odi-pat-12",
        availability: "available",
        material: "Cured dried palm fronds, natural minerals",
        technique: "Stylus etching with opening shutter panels",
        size: "42 x 28 cm",
        isHandmade: true,
      },
      {
        marketplace: "Approved Partner",
        title: "Raghurajpur Heritage Craft Guild Master Pattachitra on Cotton Canvas",
        price: 4100,
        currency: "INR",
        url: "https://heritagecrafts.in/p/pattachitra-4100",
        availability: "limited_stock",
        material: "Organic cotton patta, conch shell white, orpiment yellow",
        technique: "Unbroken line drawing following Shilpa Shastra proportions",
        size: "45 x 30 cm",
        isHandmade: true,
      },
      {
        marketplace: "Amazon",
        title: "Authentic Odisha Folk Art Hand Painted Tala Patra Hanging",
        price: 3050,
        currency: "INR",
        url: "https://www.amazon.in/dp/B03PAT05",
        availability: "available",
        material: "Palm fronds, vegetal inks",
        technique: "Traditional incision art",
        size: "38 x 26 cm",
        isHandmade: true,
      },
    ],
  },

  // 8. Kashmiri Papier-Mâché
  "kashmiri papier-mache": {
    craftKey: "kashmiri papier-mache",
    listings: [
      {
        marketplace: "Amazon",
        title: "Handcrafted Kashmiri Papier-Mâché Floral Trinket Box (15 cm)",
        price: 2499,
        currency: "INR",
        url: "https://www.amazon.in/dp/B07KASH01",
        availability: "available",
        material: "Waste paper pulp, Rice glue, 24K gold foil",
        technique: "Sakhtsazi hand molding & Naqqashi miniature brushwork",
        size: "15 x 10 x 8 cm",
        isHandmade: true,
      },
      {
        marketplace: "Flipkart",
        title: "Srinagar Artisanal Lacquered Papier-Mâché Gold Foil Jewelry Box",
        price: 2299,
        currency: "INR",
        url: "https://www.flipkart.com/item/FLPKASH02",
        availability: "available",
        material: "Molded paper pulp, natural lacquer",
        technique: "Traditional Kashmiri Gul-andar-Gul floral illumination",
        size: "14 x 9 x 7 cm",
        isHandmade: true,
      },
      {
        marketplace: "ONDC (JKHandicrafts)",
        title: "Authentic Kashmir Sakhtsazi Naqashi Papier-Mâché Decorative Box",
        price: 2650,
        currency: "INR",
        url: "https://jkhandicrafts.ondc.org/p/kpm-box-44",
        availability: "available",
        material: "Pure paper matrix, stone burnished surface",
        technique: "Agate burnishing, cat-hair brush miniature painting",
        size: "16 x 11 x 9 cm",
        isHandmade: true,
      },
      {
        marketplace: "ONDC (CraftsBazaar)",
        title: "Traditional Kashmiri Miniature Naqqashi Papier-Mâché Art Piece",
        price: 2350,
        currency: "INR",
        url: "https://craftsbazaar.ondc.org/p/kash-771",
        availability: "available",
        material: "Paper composite, vegetal colors, natural gum",
        technique: "Lacquered Sakhtsazi craft technique",
        size: "15 x 10 x 8 cm",
        isHandmade: true,
      },
    ],
  },
};

export class DemoMarketProvider implements MarketPriceProvider {
  id = "demo_provider";
  name = "Simulated Market Data — SIH Demo Mode";
  isLive = false;

  async searchMarketplace(query: ComparisonAttributes): Promise<MarketPriceObservation[]> {
    const craftQuery = (query.craft || "").toLowerCase();
    const productType = (query.product_type || "").toLowerCase();
    const category = (query.category || "").toLowerCase();
    const material = (query.material || "").toLowerCase();

    // Match against the 8 SIH craft scenarios
    let matchedTemplate: DemoCraftListingTemplate | undefined;

    if (craftQuery.includes("dokra") || craftQuery.includes("dhokra") || productType.includes("nandi") || material.includes("bell metal")) {
      matchedTemplate = SIH_DEMO_MARKETPLACE_DATA["bastar dhokra"];
    } else if (craftQuery.includes("blue pottery") || productType.includes("vase") || craftQuery.includes("jaipur")) {
      matchedTemplate = SIH_DEMO_MARKETPLACE_DATA["jaipur blue pottery"];
    } else if (craftQuery.includes("madhubani") || craftQuery.includes("mithila") || productType.includes("painting")) {
      matchedTemplate = SIH_DEMO_MARKETPLACE_DATA["madhubani painting"];
    } else if (craftQuery.includes("channapatna") || craftQuery.includes("toy") || craftQuery.includes("lacquerware")) {
      matchedTemplate = SIH_DEMO_MARKETPLACE_DATA["channapatna toys"];
    } else if (craftQuery.includes("banarasi") || craftQuery.includes("sari") || craftQuery.includes("silk") || craftQuery.includes("katan")) {
      matchedTemplate = SIH_DEMO_MARKETPLACE_DATA["banarasi silk"];
    } else if (craftQuery.includes("kutch") || craftQuery.includes("embroidery") || craftQuery.includes("mirror") || craftQuery.includes("rogan")) {
      matchedTemplate = SIH_DEMO_MARKETPLACE_DATA["kutch embroidery"];
    } else if (craftQuery.includes("pattachitra") || craftQuery.includes("palm leaf") || craftQuery.includes("raghurajpur")) {
      matchedTemplate = SIH_DEMO_MARKETPLACE_DATA["pattachitra"];
    } else if (craftQuery.includes("kashmiri") || craftQuery.includes("papier") || craftQuery.includes("naqqashi") || craftQuery.includes("sakhtsazi")) {
      matchedTemplate = SIH_DEMO_MARKETPLACE_DATA["kashmiri papier-mache"];
    } else {
      // Do not invent a match or fallback to another craft
      return [];
    }

    const nowIso = new Date().toISOString();

    return matchedTemplate.listings.map((item, idx) => ({
      id: `demo-obs-${matchedTemplate!.craftKey.replace(/\s+/g, "-")}-${idx + 1}`,
      marketplace: item.marketplace,
      external_product_id: `EXT-${idx + 1001}`,
      title: item.title,
      url: item.url,
      price: item.price,
      currency: item.currency || "INR",
      availability: item.availability,
      source_type: "demo_data" as const,
      retrieved_at: nowIso,
      is_demo: true,
      craft: matchedTemplate!.craftKey,
      material: item.material,
      technique: item.technique,
    }));
  }
}
