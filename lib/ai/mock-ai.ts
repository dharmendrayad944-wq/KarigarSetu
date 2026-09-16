import { AIProvider, IListingAIService } from "./interface";
import {
  GenerateListingInput,
  GenerateListingOutput,
  AIUnderstanding,
  PricingBreakdown,
  HeritageClaim,
  CraftComplexity,
  ComparisonAttributes,
  PriceAnalysis,
  CostReference,
} from "@/lib/db/schema";
import { marketPriceDiscoveryService } from "@/lib/pricing/discovery-service";

export class MockListingAIService implements AIProvider, IListingAIService {
  async generateProductListing(input: GenerateListingInput): Promise<GenerateListingOutput> {
    return this.generateListing(input);
  }

  async generateListing(input: GenerateListingInput): Promise<GenerateListingOutput> {
    // Realistic AI pipeline latency simulation
    await new Promise((resolve) => setTimeout(resolve, 800));

    const text = (input.voice_transcript || input.text_description || "").toLowerCase();
    const category = input.selected_category || "";
    const state = input.artisan_location?.state || "Chhattisgarh";
    const district = input.artisan_location?.district || "Bastar";

    // --------------------------------------------------------------------------
    // 1. Bastar Dhokra (Hero SIH Scenario: Shanti Devi)
    // --------------------------------------------------------------------------
    if (
      text.includes("dokra") ||
      text.includes("dhokra") ||
      text.includes("बस्तर") ||
      text.includes("ढोकरा") ||
      text.includes("bell metal") ||
      text.includes("नंदी") ||
      text.includes("shanti devi") ||
      category === "metalwork"
    ) {
      const attributes: ComparisonAttributes = {
        product_type: "Bastar Dhokra Bell Metal Nandi Bull Tribal Figurine",
        craft: "Bastar Dhokra",
        category: "metalwork",
        material: "Bell metal / Brass alloy / Natural Beeswax",
        technique: "Lost-wax casting (Cire-Perdue)",
        region: "Bastar, Chhattisgarh",
        dimensions: "18 x 10 x 16 cm",
        handmade: true,
        design_or_motif: "Twisted wax filigree / Nandi bull",
      };

      const discovery = await marketPriceDiscoveryService.discoverMarketPrice(attributes, {
        artisanCostReference: {
          materialCost: 850,
          laborHours: 22,
          hourlyBenchmark: 140,
          craftComplexity: "High",
        },
      });

      return {
        title: "Bastar Dhokra Bell Metal Nandi Bull Tribal Figurine",
        title_hi: "बस्तर ढोकरा घंटी धातु नंदी बैल पारंपरिक प्रतिमा",
        description: "Intricately cast non-ferrous brass and bell metal tribal figurine handcrafted using the 4,000-year-old cire-perdue (lost wax) technique by master artisans in Bastar, Chhattisgarh.",
        description_hi: "बस्तर के बस्तर कारीगरों द्वारा लॉस्ट-वैक्स (मोम ढलाई) विधि से निर्मित पीतल और घंटी धातु की दुर्लभ नंदी बैल मूर्ति।",
        category: "metalwork",
        craft_name: "Bastar Dhokra",
        region: "Bastar, Chhattisgarh",
        state: "Chhattisgarh",
        district: "Bastar",
        materials: ["Brass Alloy", "Bell Metal Scrap", "Natural Beeswax", "Termite Mound Clay"],
        motifs: ["Spiraled Wax Filigree", "Tribal Sun Eyes", "Ceremonial Bell Collar", "Sacred Horns"],
        dimensions: { length: 18, width: 10, height: 16, unit: "cm" },
        suggested_price_min: discovery.priceAnalysis.recommended_min,
        suggested_price_max: discovery.priceAnalysis.recommended_max,
        price_analysis: discovery.priceAnalysis,
        comparison_attributes: attributes,
        cost_reference: discovery.optionalCostReference,
        pricing_breakdown: discovery.legacyPricingBreakdown,
        traditional_technique: "Lost-wax casting (Cire-Perdue) over an organic clay core; single-pour metallurgical firing without mechanical joints.",
        cultural_significance: "Living heritage linked to the Indus Valley metallurgical tradition, revered as protective tribal totems.",
        heritage_story_draft: "Cast in the forested hamlets of Kondagaon, each Dokra sculpture is born from hand-rolled beeswax thread spirals, encased in termite clay, baked in open pit fires, and birthed by breaking the single-use mold.",
        gi_status: "gi_registered",
        gi_demo_reference: "GI-Registered Craft",
        gi_tag_applicable: true,
        gi_registry_number: null,
        gi_candidacy_status: "candidate_unverified",
        confidence_notes: [
          "Technique detected: Lost-wax casting with twisted wax filigree (Confidence: 96%)",
          "Regional provenance matched: Bastar / Kondagaon craft cluster",
          "GI Reference: Candidate cluster matches Bastar Dhokra (Craft-Level Recognition)",
          `Market Discovery: ${discovery.priceAnalysis.comparable_count} comparable products found across approved marketplace sources (Amazon, Flipkart, ONDC).`,
          "Artisan Sovereignty: Recommended range is an indicative market reference. The artisan decides the final price.",
        ],
        ai_understanding: {
          craft_name: "Bastar Dhokra",
          region: "Bastar, Chhattisgarh",
          detected_materials: ["Brass alloy", "Natural beeswax", "Termite clay"],
          detected_motifs: ["Peacock / Nandi horns", "Twisted wax filigree", "Tribal collar bells"],
          language_detected: "Hindi",
          confidence_score: 0.96,
          speech_keywords: ["ढोकरा", "घंटी धातु", "मोम ढलाई", "बस्तर", "नंदी बैल", "पीतल"],
          visual_features: ["Twisted wax wire texture", "Hollow core bronze casting", "Bovine horned silhouette"],
          safety_check_passed: true,
          gi_candidacy_note: "Matches registered Bastar Dhokra craft cluster in Intellectual Property India records (Craft-Level Recognition)",
        },
        heritage_claims: [
          {
            id: `claim-${Date.now()}-1`,
            claim_text: "Handcrafted using traditional lost-wax non-ferrous metal casting without modern welding.",
            source_type: "artisan",
            provenance_label: "Artisan Provided",
            verification_status: "verified",
            source_reference: "Artisan spoken description & workshop validation",
            is_demo_reference: true,
          },
          {
            id: `claim-${Date.now()}-2`,
            claim_text: "Recognized as indigenous Bastar Dhokra handicraft under GI Registry documentation.",
            source_type: "official",
            provenance_label: "Verified Source",
            verification_status: "verified",
            source_reference: "Government GI Registry India (Craft-Level Recognition)",
            is_demo_reference: true,
          },
          {
            id: `claim-${Date.now()}-3`,
            claim_text: "Beeswax winding density indicates Grade-A master Ghadwa lineage technique.",
            source_type: "ai",
            provenance_label: "AI Suggested",
            verification_status: "requires_verification",
            source_reference: "AI surface geometry analysis — requires master guild verification",
            is_demo_reference: true,
          },
        ],
      };
    }

    // --------------------------------------------------------------------------
    // 2. Jaipur Blue Pottery
    // --------------------------------------------------------------------------
    if (
      text.includes("blue") ||
      text.includes("pottery") ||
      text.includes("quartz") ||
      text.includes("ceramic") ||
      text.includes("जयपुर") ||
      text.includes("ब्लू पॉटरी") ||
      category === "pottery"
    ) {
      const attributes: ComparisonAttributes = {
        product_type: "Jaipur Handcrafted Blue Pottery Floral Decorative Vase",
        craft: "Jaipur Blue Pottery",
        category: "pottery",
        material: "Powdered Quartz / Cullet Glass / Multani Mitti",
        technique: "Clay-free Egyptian faience glazing & hand brushwork",
        region: "Jaipur, Rajasthan",
        dimensions: "25 x 12 x 12 cm",
        handmade: true,
        design_or_motif: "Persian Arabesque / Lotus Florets",
      };

      const discovery = await marketPriceDiscoveryService.discoverMarketPrice(attributes, {
        artisanCostReference: {
          materialCost: 380,
          laborHours: 11,
          hourlyBenchmark: 135,
          craftComplexity: "Medium",
        },
      });

      return {
        title: "Jaipur Handcrafted Blue Pottery Floral Motif Decorative Vase",
        title_hi: "हस्तनिर्मित जयपुर ब्लू पॉटरी फ्लोरल फूलदान",
        description: "Authentic low-fire Jaipur ceramic vase crafted without clay using powdered quartz stone, cullet glass, multani mitti, and natural plant gums. Hand-painted with Persian cobalt blue and turquoise floral arabesques.",
        description_hi: "पारंपरिक जयपुर तकनीक से बिना मिट्टी के क्वार्ट्ज़ और मुल्तानी मिट्टी से निर्मित फूलदान, जिस पर कोबाल्ट नीले और फिरोज़ी रंगों से पारंपरिक बेल-बूटे उकेरे गए हैं।",
        category: "pottery",
        craft_name: "Jaipur Blue Pottery",
        region: "Jaipur, Rajasthan",
        state: "Rajasthan",
        district: "Jaipur",
        materials: ["Powdered Quartz", "Cullet Glass", "Multani Mitti", "Natural Katira Gond", "Cobalt Oxide"],
        motifs: ["Persian Arabesque", "Lotus Florets", "Turquoise Geometric Border"],
        dimensions: { length: 15, width: 15, height: 28, unit: "cm" },
        suggested_price_min: discovery.priceAnalysis.recommended_min,
        suggested_price_max: discovery.priceAnalysis.recommended_max,
        price_analysis: discovery.priceAnalysis,
        comparison_attributes: attributes,
        cost_reference: discovery.optionalCostReference,
        pricing_breakdown: discovery.legacyPricingBreakdown,
        traditional_technique: "Clay-free Egyptian faience-derived ceramic: Quartz powder mixed with saji, katira gond, and glass, pressed in open plaster moulds, painted freehand with metal oxides, and single-fired at 800°C.",
        cultural_significance: "Brought to Jaipur in the 19th century under Maharaja Sawai Ram Singh II; famous for being impermeable and free from crazing.",
        heritage_story_draft: "Hand-shaped from Rajasthan's mineral quartz, this piece fuses Mughal-Persian cobalt aesthetics with the vibrant spirit of Rajasthan's royal artisan traditions.",
        gi_status: "gi_registered",
        gi_demo_reference: "GI-Registered Craft",
        gi_tag_applicable: true,
        gi_registry_number: null,
        gi_candidacy_status: "candidate_unverified",
        confidence_notes: [
          "Technique detected: Non-clay Egyptian faience / Jaipur quartz ceramics (Confidence: 94%)",
          "Color analysis: Authentic cobalt and copper oxide glaze palette",
          "GI Reference: Candidate cluster matches Jaipur Blue Pottery (Craft-Level Recognition)",
          `Market Discovery: ${discovery.priceAnalysis.comparable_count} comparable products found across approved marketplace sources.`,
          "Artisan Sovereignty: Final selling price is chosen by the artisan.",
        ],
        ai_understanding: {
          craft_name: "Jaipur Blue Pottery",
          region: "Jaipur, Rajasthan",
          detected_materials: ["Quartz stone powder", "Glass frit", "Cobalt oxide"],
          detected_motifs: ["Persian arabesque", "Foliage scrolls", "Lotus rosette"],
          language_detected: "Hindi",
          confidence_score: 0.94,
          speech_keywords: ["ब्लू पॉटरी", "क्वार्ट्ज़", "मुल्तानी मिट्टी", "कोबाल्ट नीला", "बिना मिट्टी"],
          visual_features: ["Cobalt blue glaze gloss", "Turquoise botanical infill", "Semi-porous non-thrown body"],
          safety_check_passed: true,
          gi_candidacy_note: "Registered Geographical Indication in Jaipur cluster (Craft-Level Recognition)",
        },
        heritage_claims: [
          {
            id: `claim-${Date.now()}-1`,
            claim_text: "100% clay-free composition formulated exclusively from Rajasthan mineral quartz.",
            source_type: "artisan",
            provenance_label: "Artisan Provided",
            verification_status: "verified",
            source_reference: "Artisan declaration & kiln record",
            is_demo_reference: true,
          },
          {
            id: `claim-${Date.now()}-2`,
            claim_text: "Geographical Indication recognized craft of Jaipur district.",
            source_type: "official",
            provenance_label: "Verified Source",
            verification_status: "verified",
            source_reference: "GI Registry India (Craft-Level Recognition)",
            is_demo_reference: true,
          },
        ],
      };
    }

    // --------------------------------------------------------------------------
    // 3. Madhubani Painting
    // --------------------------------------------------------------------------
    if (
      text.includes("madhubani") ||
      text.includes("mithila") ||
      text.includes("मधुबनी") ||
      text.includes("मिथिला") ||
      text.includes("कोहबर") ||
      category === "paintings"
    ) {
      const attributes: ComparisonAttributes = {
        product_type: "Handmade Madhubani Kohbar Painting on Khadi Silk",
        craft: "Madhubani Painting",
        category: "paintings",
        material: "Handloom Khadi Silk / Organic Plant Pigments",
        technique: "Kachni & Bharni freehand bamboo pen drawing",
        region: "Madhubani, Bihar",
        dimensions: "56 x 38 cm",
        handmade: true,
        design_or_motif: "Tree of Life / Matsya (Fish) / Lotus",
      };

      const discovery = await marketPriceDiscoveryService.discoverMarketPrice(attributes, {
        artisanCostReference: {
          materialCost: 450,
          laborHours: 18,
          hourlyBenchmark: 130,
          craftComplexity: "High",
        },
      });

      return {
        title: "Handmade Madhubani Kohbar Painting on Cotton Rag Paper",
        title_hi: "हस्तनिर्मित मधुबनी कोहबर चित्रकला (सूती कागज़ पर)",
        description: "Intricate traditional Mithila painting created using natural botanical dyes, lamp soot, and bamboo styluses. Features double-line boundaries filled with fine kachni cross-hatching celebrating nature and marital harmony.",
        description_hi: "प्राकृतिक वनस्पति रंगों, बांस की सींक और हाथ से बने कागज़ पर रचित प्रामाणिक मिथिला कोहबर चित्रकला।",
        category: "paintings",
        craft_name: "Madhubani Painting",
        region: "Madhubani, Bihar",
        state: "Bihar",
        district: "Madhubani",
        materials: ["Handmade Cotton Rag Paper", "Turmeric Pigment", "Indigo Dyes", "Lampblack Soot", "Bamboo Nib"],
        motifs: ["Matsya (Fish)", "Kamal (Lotus)", "Suryadev (Sun)", "Kachni Fine Lines"],
        dimensions: { length: 56, width: 38, height: 1, unit: "cm" },
        suggested_price_min: discovery.priceAnalysis.recommended_min,
        suggested_price_max: discovery.priceAnalysis.recommended_max,
        price_analysis: discovery.priceAnalysis,
        comparison_attributes: attributes,
        cost_reference: discovery.optionalCostReference,
        pricing_breakdown: discovery.legacyPricingBreakdown,
        traditional_technique: "Freehand line work using bamboo twigs and cotton-tipped styluses; double-line borders filled with intricate hatching (kachni) and vibrant natural pigments (bharni).",
        cultural_significance: "Traditional ritual art form rooted in the Mithila kingdom; passed down matrilineally across centuries.",
        heritage_story_draft: "Hand-drawn line by line using colors brewed from marigold flowers, turmeric, and neem gum, capturing the timeless blessings of Mithila.",
        gi_status: "gi_registered",
        gi_demo_reference: "GI-Registered Craft",
        gi_tag_applicable: true,
        gi_registry_number: null,
        gi_candidacy_status: "candidate_unverified",
        confidence_notes: [
          "Technique detected: Mithila Kachni/Bharni line-work (Confidence: 97%)",
          "Material detected: Hand-extracted plant pigments on textured medium",
          "GI Reference: Registered GI craft of Mithila region (Craft-Level Recognition)",
          `Market Discovery: ${discovery.priceAnalysis.comparable_count} comparable products analyzed across approved market sources.`,
          "Artisan Sovereignty: Final selling price is chosen by the artisan.",
        ],
        ai_understanding: {
          craft_name: "Madhubani Painting",
          region: "Madhubani, Bihar",
          detected_materials: ["Cotton rag paper", "Organic botanical dyes"],
          detected_motifs: ["Lotus medallion", "Paired fish", "Cosmic celestial motifs"],
          language_detected: "Hindi / Maithili",
          confidence_score: 0.97,
          speech_keywords: ["कोहबर", "मिथिला", "बांस की सींक", "प्राकृतिक रंग", "हल्दी", "नील"],
          visual_features: ["Double-line border framing", "Kachni hatching fill", "Matsya symbol profile"],
          safety_check_passed: true,
          gi_candidacy_note: "Registered GI craft of Mithila region, Bihar (Craft-Level Recognition)",
        },
        heritage_claims: [
          {
            id: `claim-${Date.now()}-1`,
            claim_text: "Pigments are 100% natural, extracted from dried marigold petals, neem, and lamp soot.",
            source_type: "artisan",
            provenance_label: "Artisan Provided",
            verification_status: "verified",
            source_reference: "Artisan declaration & material inspection",
            is_demo_reference: true,
          },
          {
            id: `claim-${Date.now()}-2`,
            claim_text: "Protected under Geographical Indications of Goods Act (Craft-Level Recognition).",
            source_type: "official",
            provenance_label: "Verified Source",
            verification_status: "verified",
            source_reference: "GI Registry India (Craft-Level Recognition)",
            is_demo_reference: true,
          },
        ],
      };
    }

    // --------------------------------------------------------------------------
    // 4. Channapatna Toys
    // --------------------------------------------------------------------------
    if (
      text.includes("channapatna") ||
      text.includes("lacquer") ||
      text.includes("चन्नपट्टना") ||
      text.includes("खिलौना") ||
      text.includes("toy")
    ) {
      const attributes: ComparisonAttributes = {
        product_type: "Channapatna Wooden Handcrafted Lacquer Toy",
        craft: "Channapatna Toys",
        category: "woodwork",
        material: "Wrightia tinctoria (Hale Mara wood) / Natural Shellac",
        technique: "Lathe turning & friction heat lacquering",
        region: "Ramanagara, Karnataka",
        dimensions: "20 x 8 x 14 cm",
        handmade: true,
        design_or_motif: "Natural Vegetable Dye Bands",
      };

      const discovery = await marketPriceDiscoveryService.discoverMarketPrice(attributes, {
        artisanCostReference: {
          materialCost: 280,
          laborHours: 6,
          hourlyBenchmark: 125,
          craftComplexity: "Medium",
        },
      });

      return {
        title: "Channapatna Handturned Wooden Lacquerware Toy",
        title_hi: "चन्नपट्टना हस्तनिर्मित लकड़ी का लैकर खिलौना",
        description: "Child-safe non-toxic wooden toy shaped on a traditional wood-turning lathe and polished with vegetable-dyed organic shellac and talipot leaves in Channapatna.",
        description_hi: "रामनागरा जिले के पारंपरिक कारीगरों द्वारा 'आले मारा' लकड़ी से तराशा गया और प्राकृतिक लाख से रंगा गया सुरक्षित खिलौना।",
        category: "woodwork",
        craft_name: "Channapatna Toys",
        region: "Channapatna, Karnataka",
        state: "Karnataka",
        district: "Ramanagara",
        materials: ["Hale Wood", "Natural Lac", "Turmeric & Indigo Vegetable Dyes"],
        motifs: ["Turned Concentric Rings", "Smooth Ergonomic Curvature"],
        dimensions: { length: 20, width: 8, height: 14, unit: "cm" },
        suggested_price_min: discovery.priceAnalysis.recommended_min,
        suggested_price_max: discovery.priceAnalysis.recommended_max,
        price_analysis: discovery.priceAnalysis,
        comparison_attributes: attributes,
        cost_reference: discovery.optionalCostReference,
        pricing_breakdown: discovery.legacyPricingBreakdown,
        traditional_technique: "Friction lathe wood turning with screw-pine leaf buffing.",
        cultural_significance: "Historical Gombegala Ooru craft initiated by Tipu Sultan using Persian artisan exchange.",
        heritage_story_draft: "Carved from sustainably pruned seasoned ivory wood, polished with friction heat and edible vegetable hues.",
        gi_status: "gi_registered",
        gi_demo_reference: "GI-Registered Craft",
        gi_tag_applicable: true,
        gi_registry_number: null,
        gi_candidacy_status: "candidate_unverified",
        confidence_notes: [
          "Technique detected: Traditional lathe-turned organic lacquering",
          "Safety check: 100% Non-toxic vegetable dyes verified",
          `Market Discovery: ${discovery.priceAnalysis.comparable_count} comparable products found across approved marketplace sources.`,
          "Artisan Sovereignty: Final selling price is chosen by the artisan.",
        ],
        ai_understanding: {
          craft_name: "Channapatna Toys",
          region: "Channapatna, Karnataka",
          detected_materials: ["Seasoned Hale Wood", "Natural Lac"],
          detected_motifs: ["Concentric turned rings"],
          language_detected: "Kannada / Hindi",
          confidence_score: 0.95,
          speech_keywords: ["खिलौना", "लकड़ी", "चन्नपट्टना", "प्राकृतिक"],
          visual_features: ["Smooth lathe concentric finish", "Glossy natural shellac coat"],
          safety_check_passed: true,
          gi_candidacy_note: "Registered GI craft of Karnataka (Craft-Level Recognition)",
        },
        heritage_claims: [
          {
            id: `claim-${Date.now()}-1`,
            claim_text: "Finished using friction-applied natural shellac without toxic lead-based paints.",
            source_type: "artisan",
            provenance_label: "Artisan Provided",
            verification_status: "verified",
            source_reference: "Artisan declaration",
            is_demo_reference: true,
          },
        ],
      };
    }

    // --------------------------------------------------------------------------
    // 5. Default Craft Fallback
    // --------------------------------------------------------------------------
    const fallbackAttributes: ComparisonAttributes = {
      product_type: `Handcrafted Traditional ${input.selected_category ? input.selected_category.toUpperCase() : "Artisan"} Craft`,
      craft: `Indigenous ${district} Craft`,
      category: category || "woodwork",
      material: "Locally Sourced Organic Materials / Natural Binders",
      technique: "Manual heritage craftsmanship",
      region: `${district}, ${state}`,
      dimensions: "20 x 15 x 10 cm",
      handmade: true,
    };

    const discovery = await marketPriceDiscoveryService.discoverMarketPrice(fallbackAttributes, {
      artisanCostReference: {
        materialCost: 400,
        laborHours: 10,
        hourlyBenchmark: 130,
        craftComplexity: "Medium",
      },
    });

    return {
      title: `Handcrafted Traditional ${input.selected_category ? input.selected_category.toUpperCase() : "Artisan Craft"} Creation`,
      title_hi: "पारंपरिक हस्तनिर्मित कलाकृति (शिल्पकार निर्मित)",
      description:
        input.text_description ||
        input.voice_transcript ||
        "Carefully hand-fashioned craft made with indigenous natural raw materials following ancestral artisanal wisdom.",
      description_hi: "पुश्तैनी तकनीक और प्राकृतिक स्थानीय सामग्रियों से प्रेमपूर्वक तैयार किया गया पारंपरिक हस्तशिल्प।",
      category: category || "woodwork",
      craft_name: `Indigenous ${district} Craft`,
      region: `${district}, ${state}`,
      state: state,
      district: district,
      materials: ["Locally Sourced Organic Materials", "Traditional Natural Binders", "Hand Tools"],
      motifs: ["Traditional Regional Motifs", "Geometric Borders"],
      dimensions: { length: 20, width: 15, height: 10, unit: "cm" },
      suggested_price_min: discovery.priceAnalysis.recommended_min,
      suggested_price_max: discovery.priceAnalysis.recommended_max,
      price_analysis: discovery.priceAnalysis,
      comparison_attributes: fallbackAttributes,
      cost_reference: discovery.optionalCostReference,
      pricing_breakdown: discovery.legacyPricingBreakdown,
      traditional_technique:
        "Complete manual fabrication using non-mechanized heritage tools and handed-down generational craft recipes.",
      cultural_significance:
        "Reflects the living vernacular tradition and sustainable eco-friendly artisanal ethos of rural India.",
      heritage_story_draft:
        "Crafted by hand using techniques preserved across generations, embodying the pride, patience, and devotion of Indian artisan communities.",
      gi_status: "gi_candidate_unverified",
      gi_demo_reference: null,
      gi_tag_applicable: false,
      gi_registry_number: null,
      gi_candidacy_status: "candidate_unverified",
      confidence_notes: [
        "Craft classification: Traditional vernacular handicraft",
        "Geographical context: Aligned with artisan local district ecosystem",
        "Verification note: Cultural claims must be confirmed by the artisan before publishing.",
        `Market Discovery: ${discovery.priceAnalysis.comparable_count} comparable products analyzed across approved market sources.`,
        "Artisan Sovereignty: Recommended range is an indicative market reference. Final price is set by the artisan.",
      ],
      ai_understanding: {
        craft_name: `Traditional ${district} Craft`,
        region: `${district}, ${state}`,
        detected_materials: ["Regional natural fibers/wood/clay"],
        detected_motifs: ["Vernacular geometric motifs"],
        language_detected: input.language === "hi" ? "Hindi" : "English",
        confidence_score: 0.92,
        speech_keywords: ["हस्तनिर्मित", "स्थानीय", "परंपरा", "कारीगर"],
        visual_features: ["Hand-tooled surface texture", "Natural organic color variations"],
        safety_check_passed: true,
        gi_candidacy_note: "No registered GI craft identified for this cluster item; requires verification.",
      },
      heritage_claims: [
        {
          id: `claim-${Date.now()}-1`,
          claim_text: "Made by hand using sustainable regional materials without industrial assembly line machinery.",
          source_type: "artisan",
          provenance_label: "Artisan Provided",
          verification_status: "verified",
          source_reference: "Artisan direct testimony",
          is_demo_reference: true,
        },
        {
          id: `claim-${Date.now()}-2`,
          claim_text: "Identified as traditional community craft awaiting formal cluster GI verification.",
          source_type: "ai",
          provenance_label: "Requires Verification",
          verification_status: "requires_verification",
          source_reference: "AI heritage registry lookup — status pending verification",
          is_demo_reference: true,
        },
      ],
    };
  }

  // Helper implementations for modular AIProvider interface
  async extractCraftMetadata(input: GenerateListingInput): Promise<AIUnderstanding> {
    const listing = await this.generateListing(input);
    return listing.ai_understanding;
  }

  async generateHeritageDraft(
    input: GenerateListingInput,
    understanding: AIUnderstanding
  ): Promise<{ technique: string; cultural_story: string; claims: HeritageClaim[] }> {
    const listing = await this.generateListing(input);
    return {
      technique: listing.traditional_technique,
      cultural_story: listing.cultural_significance,
      claims: listing.heritage_claims,
    };
  }

  async discoverMarketPrice(attributes: ComparisonAttributes): Promise<PriceAnalysis> {
    const result = await marketPriceDiscoveryService.discoverMarketPrice(attributes);
    return result.priceAnalysis;
  }

  async generatePriceEstimate(params: {
    material_cost?: number;
    labor_hours?: number;
    complexity?: CraftComplexity;
    hourly_benchmark?: number;
    craft?: string;
    region?: string;
  }): Promise<CostReference> {
    const materialCost = params.material_cost || 600;
    const laborHours = params.labor_hours || 12;
    const complexity = params.complexity || "Medium";
    const benchmark = params.hourly_benchmark || 135;
    const wageSubtotal = Math.round(laborHours * benchmark);
    const minPrice = Math.round(materialCost + wageSubtotal);
    const maxPrice = Math.round(minPrice * 1.25);

    return {
      material_cost: materialCost,
      labor_hours: laborHours,
      craft_complexity: complexity,
      hourly_benchmark: benchmark,
      estimated_cost_subtotal: wageSubtotal,
      reference_min: minPrice,
      reference_max: maxPrice,
      benchmark_source: `${params.region || "Regional"} Craft Guild Reference`,
      rationale: `Optional artisan cost baseline: Material ₹${materialCost} + Labour (${laborHours}h @ ₹${benchmark}/hr = ₹${wageSubtotal}). This is an internal cost reference only, not market price.`,
      is_optional_reference: true,
    };
  }

  // Backwards compatibility
  
  async explainMarketComparison(
    target: ComparisonAttributes,
    priceAnalysis: PriceAnalysis
  ): Promise<string> {
    const count = priceAnalysis.comparable_count;
    const median = priceAnalysis.median_price.toLocaleString("en-IN");
    const min = priceAnalysis.recommended_min.toLocaleString("en-IN");
    const max = priceAnalysis.recommended_max.toLocaleString("en-IN");
    return `Identified ${count} comparable ${target.craft} products across approved platforms (Amazon, Flipkart, ONDC). The market median is ₹${median}, with an indicative recommended range of ₹${min} – ₹${max}. Final pricing remains the sovereign decision of the artisan.`;
  }

  async generateListingCompatibility(input: GenerateListingInput): Promise<GenerateListingOutput> {
    return this.generateListing(input);
  }
}
