import { SIH_DEMO_MARKETPLACE_DATA } from "../lib/pricing/providers/demo-market-provider";
import { INITIAL_PRODUCTS } from "../lib/db/seed-data";

console.log("SIH_DEMO_MARKETPLACE_DATA keys:", Object.keys(SIH_DEMO_MARKETPLACE_DATA));

INITIAL_PRODUCTS.forEach(p => {
  console.log(`Product: ${p.id} (${p.craft_name})`);
  console.log(`  suggested_min: ${p.suggested_min_price}, max: ${p.suggested_max_price}, final: ${p.final_price}`);
  const matchingKey = Object.keys(SIH_DEMO_MARKETPLACE_DATA).find(k => 
    p.craft_name.toLowerCase().includes(k) || k.includes(p.craft_name.toLowerCase())
  );
  console.log(`  Matching key in demo data: ${matchingKey}`);
});
