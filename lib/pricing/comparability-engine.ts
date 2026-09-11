import { ComparisonAttributes, MarketPriceObservation, ProductComparable } from "@/lib/db/schema";
import { ComparabilityScoreResult } from "./types";

export class ComparabilityEngine {
  /**
   * Evaluates comparability between an artisan's product attributes and an external market observation.
   * Does NOT rely solely on title keyword matches; calculates dimensional similarity across 6 heritage factors.
   */
  static evaluate(
    target: ComparisonAttributes,
    candidate: MarketPriceObservation
  ): ComparabilityScoreResult {
    const targetCraft = (target.craft || "").toLowerCase();
    const candidateCraft = (candidate.craft || candidate.title || "").toLowerCase();

    const targetCategory = (target.category || "").toLowerCase();
    const candidateTitle = (candidate.title || "").toLowerCase();

    const targetMaterial = (target.material || "").toLowerCase();
    const candidateMaterial = (candidate.material || candidate.title || "").toLowerCase();

    const targetTechnique = (target.technique || "").toLowerCase();
    const candidateTechnique = (candidate.technique || candidate.title || "").toLowerCase();

    const matchReasons: string[] = [];

    // 1. Craft Similarity (Weight: 25%)
    let craftScore = 0.25;
    if (targetCraft && candidateCraft.includes(targetCraft)) {
      craftScore = 0.98;
      matchReasons.push(`Identical heritage craft lineage (${target.craft})`);
    } else if (
      (targetCraft.includes("dhokra") && candidateCraft.includes("dhokra")) ||
      (targetCraft.includes("pottery") && candidateCraft.includes("pottery")) ||
      (targetCraft.includes("madhubani") && candidateCraft.includes("madhubani")) ||
      (targetCraft.includes("channapatna") && candidateCraft.includes("channapatna")) ||
      (targetCraft.includes("silk") && candidateCraft.includes("silk")) ||
      (targetCraft.includes("embroidery") && candidateCraft.includes("embroidery")) ||
      (targetCraft.includes("pattachitra") && candidateCraft.includes("pattachitra"))
    ) {
      craftScore = 0.94;
      matchReasons.push(`Craft cluster match (${target.craft})`);
    } else {
      craftScore = 0.25;
    }

    // 2. Category Similarity (Weight: 20%)
    let categoryScore = 0.30;
    if (
      (targetCategory === "metalwork" && (candidateTitle.includes("metal") || candidateTitle.includes("brass") || candidateTitle.includes("figurine") || candidateTitle.includes("sculpture"))) ||
      (targetCategory === "pottery" && (candidateTitle.includes("pottery") || candidateTitle.includes("vase") || candidateTitle.includes("ceramic"))) ||
      (targetCategory === "paintings" && (candidateTitle.includes("painting") || candidateTitle.includes("art") || candidateTitle.includes("canvas"))) ||
      (targetCategory === "woodwork" && (candidateTitle.includes("toy") || candidateTitle.includes("wood") || candidateTitle.includes("lacquer"))) ||
      (targetCategory === "textiles" && (candidateTitle.includes("saree") || candidateTitle.includes("sari") || candidateTitle.includes("silk") || candidateTitle.includes("embroidery")))
    ) {
      categoryScore = 0.92;
      matchReasons.push(`Product category and function aligned (${target.category})`);
    } else {
      categoryScore = 0.30;
    }

    // 3. Material Similarity (Weight: 20%)
    let materialScore = 0.25;
    const targetMaterials = targetMaterial.split(/[\/,]/).map((m) => m.trim().toLowerCase()).filter(Boolean);
    let matchedMaterialCount = 0;

    for (const m of targetMaterials) {
      if (candidateMaterial.includes(m) || candidateTitle.includes(m)) {
        matchedMaterialCount++;
      }
    }

    if (matchedMaterialCount >= 2 || (targetMaterials.length === 1 && matchedMaterialCount === 1)) {
      materialScore = 0.92;
      matchReasons.push(`High raw material concordance (${target.material})`);
    } else if (matchedMaterialCount === 1) {
      materialScore = 0.82;
      matchReasons.push(`Compatible primary material substrate`);
    } else {
      materialScore = 0.25;
    }

    // 4. Technique Similarity (Weight: 15%)
    let techniqueScore = 0.30;
    if (
      (targetTechnique.includes("lost-wax") && candidateTechnique.includes("lost-wax")) ||
      (targetTechnique.includes("cire-perdue") && candidateTechnique.includes("cire-perdue")) ||
      (targetTechnique.includes("glaze") && candidateTechnique.includes("glaze")) ||
      (targetTechnique.includes("handloom") && candidateTechnique.includes("handloom")) ||
      (targetTechnique.includes("lathe") && candidateTechnique.includes("lathe")) ||
      (targetTechnique.includes("needle") && candidateTechnique.includes("stitch")) ||
      (targetTechnique.includes("engraving") && candidateTechnique.includes("engraving"))
    ) {
      techniqueScore = 0.90;
      matchReasons.push(`Verified indigenous technique match (${target.technique || "Handcraft method"})`);
    } else {
      techniqueScore = 0.30;
    }

    // 5. Size & Proportion Similarity (Weight: 10%)
    let sizeScore = 0.70; // Neutral when dimensions not specified
    if (target.dimensions) {
      const targetSizeNum = (target.dimensions.match(/\d+/g) || []).map(Number);
      const candidateSizeNum = (candidateTitle.match(/\d+/g) || []).map(Number);

      if (targetSizeNum.length > 0 && candidateSizeNum.length > 0) {
        const diff = Math.abs(targetSizeNum[0] - candidateSizeNum[0]);
        if (diff <= 3) {
          sizeScore = 0.92;
          matchReasons.push("Proportional dimensional similarity within ±3cm");
        } else if (diff <= 8) {
          sizeScore = 0.78;
        } else {
          sizeScore = 0.40;
        }
      } else {
        sizeScore = 0.70;
      }
    }

    // 6. Handmade Verification (Weight: 10%)
    const isMachine = candidateTitle.includes("machine") || candidateTitle.includes("plastic") || candidateTechnique.includes("machine");
    const handmadeScore = isMachine ? 0.20 : target.handmade ? 0.98 : 0.70;
    if (!isMachine && target.handmade) {
      matchReasons.push("Authentic artisanal non-industrial build");
    }

    // Weighted Overall Score Formula
    const overall = Number(
      (
        craftScore * 0.25 +
        categoryScore * 0.20 +
        materialScore * 0.20 +
        techniqueScore * 0.15 +
        sizeScore * 0.10 +
        handmadeScore * 0.10
      ).toFixed(2)
    );

    const isComparable = overall >= 0.70;

    return {
      overall,
      craft: Number(craftScore.toFixed(2)),
      category: Number(categoryScore.toFixed(2)),
      material: Number(materialScore.toFixed(2)),
      technique: Number(techniqueScore.toFixed(2)),
      size: Number(sizeScore.toFixed(2)),
      handmade: Number(handmadeScore.toFixed(2)),
      matchReasons,
      isComparable,
    };
  }

  /**
   * Filters and maps raw market observations into ProductComparable items.
   */
  static filterAndScoreComparables(
    target: ComparisonAttributes,
    observations: MarketPriceObservation[],
    threshold: number = 0.70,
    productId?: string
  ): ProductComparable[] {
    const comparables: ProductComparable[] = [];

    for (const obs of observations) {
      const evaluation = this.evaluate(target, obs);

      if (evaluation.overall >= threshold) {
        comparables.push({
          id: `comp-${obs.id}`,
          product_id: productId,
          market_price_observation_id: obs.id,
          title: obs.title,
          marketplace: obs.marketplace,
          price: obs.price,
          currency: obs.currency || "INR",
          url: obs.url,
          similarity_score: evaluation.overall,
          craft_similarity: evaluation.craft,
          category_similarity: evaluation.category,
          material_similarity: evaluation.material,
          technique_similarity: evaluation.technique,
          size_similarity: evaluation.size,
          handmade_status: true,
          match_reasons: evaluation.matchReasons,
          retrieved_at: obs.retrieved_at,
          source_type: obs.source_type,
          is_demo: obs.is_demo,
        });
      }
    }

    // Sort by similarity descending
    return comparables.sort((a, b) => b.similarity_score - a.similarity_score);
  }
}
