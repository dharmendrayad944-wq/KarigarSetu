const fs = require("fs");
const path = require("path");

const FILE = path.join(__dirname, "../lib/db/seed-data.ts");
let content = fs.readFileSync(FILE, "utf8");

// We need to add artisan_price_decision to prod-blue-pottery-02 through prod-kashmiri-08
const products = [
  { id: "prod-blue-pottery-02", min: 1600, max: 2200, final: 1850 },
  { id: "prod-madhubani-03", min: 2400, max: 3200, final: 2800 },
  { id: "prod-channapatna-04", min: 650, max: 900, final: 750 },
  { id: "prod-banarasi-05", min: 8500, max: 11000, final: 9500 },
  { id: "prod-kutch-06", min: 4200, max: 5500, final: 4800 },
  { id: "prod-pattachitra-07", min: 3200, max: 4200, final: 3600 },
  { id: "prod-kashmiri-08", min: 2100, max: 2800, final: 2450 },
];

for (const p of products) {
  const target = `id: "${p.id}",`;
  if (!content.includes(target)) {
    console.error("Not found:", p.id);
    continue;
  }
  
  // Find final_price: ${p.final},
  const priceRegex = new RegExp(`(id: "${p.id}"[\\s\\S]*?final_price: ${p.final},)`);
  if (!priceRegex.test(content)) {
    console.error("Price not found for:", p.id);
    continue;
  }

  const decisionBlock = `\n    artisan_price_decision: {
      product_id: "${p.id}",
      recommended_min: ${p.min},
      recommended_max: ${p.max},
      final_price: ${p.final},
      chosen_by: "artisan_manual",
      created_at: "2026-09-11T18:30:00.000Z",
      pricing_sources: ["Amazon", "Flipkart", "ONDC Network"],
    },`;

  content = content.replace(priceRegex, `$1${decisionBlock}`);
}

fs.writeFileSync(FILE, content, "utf8");
console.log("Successfully added artisan_price_decision to remaining products!");
