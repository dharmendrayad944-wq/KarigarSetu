import { AIProvider, IListingAIService } from "./interface";
import {
  GenerateListingInput,
  GenerateListingOutput,
  AIUnderstanding,
  PricingBreakdown,
  HeritageClaim,
  CraftComplexity,
} from "@/lib/db/schema";

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

    // 1. Bastar Dhokra (Hero SIH Scenario: Shanti Devi)
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
        suggested_price_min: 3500,
        suggested_price_max: 4500,
        traditional_technique: "Lost-wax casting (Cire-Perdue) over an organic clay core; single-pour metallurgical firing without mechanical joints.",
        cultural_significance: "Living heritage linked to the Indus Valley metallurgical tradition, revered as protective tribal totems.",
        heritage_story_draft: "Cast in the forested hamlets of Kondagaon, each Dokra sculpture is born from hand-rolled beeswax thread spirals, encased in termite clay, baked in open pit fires, and birthed by breaking the single-use mold.",
        gi_status: "gi_registered",
        gi_demo_reference: "GI Application Ref #83 (Demo Reference)",
        gi_tag_applicable: true,
        gi_registry_number: null, // Guard against fake IDs
        gi_candidacy_status: "registered_verified",
        confidence_notes: [
          "Technique detected: Lost-wax casting with twisted wax filigree (Confidence: 96%)",
          "Regional provenance matched: Bastar / Kondagaon craft cluster",
          "GI Reference: Candidate cluster matches Bastar Dhokra (Demo Reference #83)",
          "Fair wage rationale: 22 hours artisan labor @ ₹140/hr + ₹850 raw metal alloy cost.",
        ],
        pricing_breakdown: {
          material_cost: 850,
          labor_hours: 22,
          craft_complexity: "High",
          hourly_benchmark: 140,
          fair_wage_subtotal: 3080,
          suggested_min_price: 3500,
          suggested_max_price: 4500,
          ondc_export_markup_suggestion: 5100,
          benchmark_source: "Chhattisgarh Tribal Artisan Guild Guideline (2025-26)",
          rationale: "Material Cost ₹850 + Estimated Labour (22 hrs @ ₹140/hr benchmark = ₹3,080) with High craft complexity. Suggested range ₹3,500 – ₹4,500. Final price decided by artisan.",
        },
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
          gi_candidacy_note: "Matches registered Bastar Dhokra craft cluster in Intellectual Property India records (Demo Reference #83)",
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
            source_reference: "Government GI Registry India (Demo Reference #83)",
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

    // 2. Jaipur Blue Pottery
    if (
      text.includes("blue") ||
      text.includes("pottery") ||
      text.includes("quartz") ||
      text.includes("ceramic") ||
      text.includes("जयपुर") ||
      text.includes("ब्लू पॉटरी") ||
      category === "pottery"
    ) {
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
        suggested_price_min: 1600,
        suggested_price_max: 2200,
        traditional_technique: "Clay-free Egyptian faience-derived ceramic: Quartz powder mixed with saji, katira gond, and glass, pressed in open plaster moulds, painted freehand with metal oxides, and single-fired at 800°C.",
        cultural_significance: "Brought to Jaipur in the 19th century under Maharaja Sawai Ram Singh II; famous for being impermeable and free from crazing.",
        heritage_story_draft: "Hand-shaped from Rajasthan's mineral quartz, this piece fuses Mughal-Persian cobalt aesthetics with the vibrant spirit of Rajasthan's royal artisan traditions.",
        gi_status: "gi_registered",
        gi_demo_reference: "GI Application Ref #66 (Demo Reference)",
        gi_tag_applicable: true,
        gi_registry_number: null,
        gi_candidacy_status: "registered_verified",
        confidence_notes: [
          "Technique detected: Non-clay Egyptian faience / Jaipur quartz ceramics (Confidence: 94%)",
          "Color analysis: Authentic cobalt and copper oxide glaze palette",
          "GI Reference: Candidate cluster matches Jaipur Blue Pottery (Demo Reference #66)",
          "Fair wage rationale: 11 hours craftsmanship @ ₹135/hr + ₹380 quartz dough & glaze.",
        ],
        pricing_breakdown: {
          material_cost: 380,
          labor_hours: 11,
          craft_complexity: "Medium",
          hourly_benchmark: 135,
          fair_wage_subtotal: 1485,
          suggested_min_price: 1600,
          suggested_max_price: 2200,
          ondc_export_markup_suggestion: 2450,
          benchmark_source: "Rajasthan State Handloom & Handicrafts Benchmark",
          rationale: "Material Cost ₹380 + Estimated Labour (11 hrs @ ₹135/hr benchmark = ₹1,485). Suggested range ₹1,600 – ₹2,200. Final price decided by artisan.",
        },
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
          gi_candidacy_note: "Registered Geographical Indication in Jaipur cluster (Demo Reference #66)",
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
            source_reference: "GI Registry India (Demo Reference #66)",
            is_demo_reference: true,
          },
        ],
      };
    }

    // 3. Madhubani Painting
    if (
      text.includes("madhubani") ||
      text.includes("mithila") ||
      text.includes("मधुबनी") ||
      text.includes("मिथिला") ||
      text.includes("कोहबर") ||
      category === "paintings"
    ) {
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
        suggested_price_min: 2400,
        suggested_price_max: 3200,
        traditional_technique: "Freehand line work using bamboo twigs and cotton-tipped styluses; double-line borders filled with intricate hatching (kachni) and vibrant natural pigments (bharni).",
        cultural_significance: "Traditional ritual art form rooted in the Mithila kingdom; passed down matrilineally across centuries.",
        heritage_story_draft: "Hand-drawn line by line using colors brewed from marigold flowers, turmeric, and neem gum, capturing the timeless blessings of Mithila.",
        gi_status: "gi_registered",
        gi_demo_reference: "GI Application Ref #45 (Demo Reference)",
        gi_tag_applicable: true,
        gi_registry_number: null,
        gi_candidacy_status: "registered_verified",
        confidence_notes: [
          "Technique detected: Mithila Kachni/Bharni line-work (Confidence: 97%)",
          "Material detected: Hand-extracted plant pigments on textured medium",
          "GI Reference: Registered GI craft of Mithila region (Demo Reference #45)",
          "Fair wage rationale: 18 hours microscopic line drawing @ ₹130/hr + ₹450 organic pigments.",
        ],
        pricing_breakdown: {
          material_cost: 450,
          labor_hours: 18,
          craft_complexity: "High",
          hourly_benchmark: 130,
          fair_wage_subtotal: 2340,
          suggested_min_price: 2400,
          suggested_max_price: 3200,
          ondc_export_markup_suggestion: 3400,
          benchmark_source: "Mithila Artisans Cooperative Benchmark (2025-26)",
          rationale: "Material Cost ₹450 + Estimated Labour (18 hrs fine linework @ ₹130/hr benchmark = ₹2,340). Suggested range ₹2,400 – ₹3,200. Final price decided by artisan.",
        },
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
          gi_candidacy_note: "Registered GI craft of Mithila region, Bihar (Demo Reference #45)",
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
            claim_text: "Protected under Geographical Indications of Goods Act (Demo Reference #45).",
            source_type: "official",
            provenance_label: "Verified Source",
            verification_status: "verified",
            source_reference: "GI Registry India (Demo Reference #45)",
            is_demo_reference: true,
          },
        ],
      };
    }

    // 4. Default Craft Fallback
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
      suggested_price_min: 1500,
      suggested_price_max: 2200,
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
        "Fair wage rationale: 10 hours manual craft labor @ ₹130/hr + ₹400 indigenous materials.",
      ],
      pricing_breakdown: {
        material_cost: 400,
        labor_hours: 10,
        craft_complexity: "Medium",
        hourly_benchmark: 130,
        fair_wage_subtotal: 1300,
        suggested_min_price: 1500,
        suggested_max_price: 2200,
        ondc_export_markup_suggestion: 2500,
        benchmark_source: "Regional Handloom & Handicraft Guild Benchmark",
        rationale: "Material Cost ₹400 + Estimated Labour (10 hrs @ ₹130/hr benchmark = ₹1,300). Suggested range ₹1,500 – ₹2,200. Final price decided by artisan.",
      },
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
        gi_candidacy_note: "No verified GI candidate identified for this cluster item; verification required.",
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

  async generatePriceEstimate(params: {
    material_cost?: number;
    labor_hours?: number;
    complexity?: CraftComplexity;
    hourly_benchmark?: number;
    craft?: string;
    region?: string;
  }): Promise<PricingBreakdown> {
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
      fair_wage_subtotal: wageSubtotal,
      suggested_min_price: minPrice,
      suggested_max_price: maxPrice,
      ondc_export_markup_suggestion: Math.round(maxPrice * 1.2),
      benchmark_source: `${params.region || "Regional"} Craft Guild Standard`,
      rationale: `Material Cost ₹${materialCost} + Labour (${laborHours} hrs @ ₹${benchmark}/hr benchmark = ₹${wageSubtotal}). Suggested range ₹${minPrice.toLocaleString()} – ₹${maxPrice.toLocaleString()}. Final price is decided by the artisan.`,
    };
  }

  // Backwards compatibility
  async generateListingCompatibility(input: GenerateListingInput): Promise<GenerateListingOutput> {
    return this.generateListing(input);
  }
}
