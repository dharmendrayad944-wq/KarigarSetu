import { INITIAL_PRODUCTS, INITIAL_NETWORK_EVENTS } from "../lib/db/seed-data";
import fs from "fs";
import path from "path";

console.log("=== 1. IMAGE AUTHENTICITY AUDIT ===");
const publicCraftsDir = path.join(__dirname, "../public/crafts");
INITIAL_PRODUCTS.forEach((p) => {
  const localPath = path.join(publicCraftsDir, path.basename(p.featured_image_url));
  const exists = fs.existsSync(localPath);
  const size = exists ? fs.statSync(localPath).size : 0;
  console.log(`Product: ${p.id} (${p.craft_name}, ${p.state})`);
  console.log(`  Image: ${p.featured_image_url} | Exists: ${exists} (${size} bytes)`);
  console.log(`  Attribution:`, JSON.stringify(p.image_attribution));
});

console.log("\n=== 2. GI / PROVENANCE RECORD AUDIT ===");
INITIAL_PRODUCTS.forEach((p) => {
  console.log(`Product: ${p.id}`);
  console.log(`  gi_craft_status: ${p.gi_craft_status}`);
  console.log(`  gi_authorised_user_status: ${p.gi_authorised_user_status}`);
  console.log(`  gi_official_url: ${p.gi_official_url}`);
  console.log(`  claims count: ${p.heritage_record?.claims?.length || 0}`);
  p.heritage_record?.claims?.forEach((c) => {
    console.log(`    Claim [${c.source_type} / ${c.provenance_label} / ${c.verification_status}]: "${c.claim_text.slice(0, 60)}..."`);
    console.log(`      Ref: ${c.source_reference}`);
  });
});

console.log("\n=== 3. MARKET PRICE COMPARABLES AUDIT ===");
INITIAL_PRODUCTS.forEach((p) => {
  const pa = p.price_analysis;
  console.log(`Product: ${p.id} (${p.craft_name})`);
  console.log(`  Final: ${p.final_price}, Suggested: [${p.suggested_min_price} - ${p.suggested_max_price}]`);
  if (!pa) {
    console.log(`  NO PRICE ANALYSIS RECORD!`);
  } else {
    console.log(`  PriceAnalysis: comp_count=${pa.comparable_count}, min=${pa.min_price}, median=${pa.median_price}, max=${pa.max_price}, rec=[${pa.recommended_min} - ${pa.recommended_max}], confidence=${pa.confidence}`);
    console.log(`  Comparables count in array: ${pa.comparables?.length || 0}`);
    pa.comparables?.forEach((c) => {
      console.log(`    Comp [${c.marketplace}]: ₹${c.price} - "${c.title.slice(0, 50)}" (similarity: ${c.similarity_score})`);
    });
  }
});
