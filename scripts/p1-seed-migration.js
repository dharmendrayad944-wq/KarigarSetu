/**
 * p1-seed-migration-v3.js
 * Correct approach: insert new fields between product-level updated_at and closing "  },"
 * Product-level fields have 4-space indent. Heritage record fields have 6-space indent.
 */
const fs = require("fs");
const path = require("path");

const FILE = path.join(__dirname, "../lib/db/seed-data.ts");
let content = fs.readFileSync(FILE, "utf8");

const GI_URL = "https://www.ipindia.gov.in/geographical-indications-track-application-list-of-registered-geographical-indications-and-authorised-users-part-a-register-list-of-registered-gi-of-india";

// ============================================================
// 1. Replace Unsplash URLs with local /crafts/ paths
// ============================================================
const urlMap = [
  ["photo-1544717305-2782549b5136", "/crafts/bastar-dhokra.jpg"],
  ["photo-1610701596007-11502861dcfa", "/crafts/jaipur-blue-pottery.jpg"],
  ["photo-1579783902614-a3fb3927b675", "/crafts/madhubani-painting.jpg"],
  ["photo-1596461404969-9ae70f2830c1", "/crafts/channapatna-toys.jpg"],
  ["photo-1610030469983-98e550d6193c", "/crafts/banarasi-silk.jpg"],
  ["photo-1584917865442-de89df76afd3", "/crafts/kutch-embroidery.jpg"],
  ["photo-1609357605129-26f69add5d6e", "/crafts/kutch-embroidery.jpg"],
  ["photo-1579783900882-c0d3dad7b119", "/crafts/pattachitra.jpg"],
  ["photo-1582738411706-bfc8e691d1c2", "/crafts/pattachitra.jpg"],
  ["photo-1578749556568-bc2c40e68b61", "/crafts/kashmiri-papier-mache.jpg"],
  ["photo-1606744824163-985d376605aa", "/crafts/bastar-dhokra.jpg"],
];

for (const [id, localPath] of urlMap) {
  const re = new RegExp(`"https://images\\.unsplash\\.com/[^"]*${id}[^"]*"`, "g");
  content = content.replace(re, `"${localPath}"`);
}

// ============================================================
// 2. Fix fake GI refs
// ============================================================
content = content.replace(/"GI Application Ref #\d+ \(Demo Reference\)"/g, '"GI-Registered Craft"');
content = content.replace(
  /Registered Geographical Indication[^"]*\(Demo Reference #\d+\)/g,
  "Matches registered craft cluster in Intellectual Property India records (Craft-Level Recognition)"
);

// ============================================================
// 3. Add new fields to each product BEFORE the product's closing "  },"
//    We identify the product-level updated_at (4-space indent) which is
//    the last line before "  }," for each product.
//
//    The product closing sequence is always:
//      \n    updated_at: "...",\r\n  },
// ============================================================

const PRODUCTS = [
  {
    id: "prod-dokra-01",
    imgPath: "/crafts/bastar-dhokra.jpg",
    imgSource: "Wikimedia Commons",
    imgUrl: "https://commons.wikimedia.org/wiki/File:Dhokra_item_Raodeo.jpg",
    imgLicense: "CC BY-SA 4.0",
    imgAttribution: "Photo by Saiphani02, via Wikimedia Commons (CC BY-SA 4.0)",
  },
  {
    id: "prod-blue-pottery-02",
    imgPath: "/crafts/jaipur-blue-pottery.jpg",
    imgSource: "Wikimedia Commons",
    imgUrl: "https://commons.wikimedia.org/wiki/File:Jaipur_Blue_Pottery_Flower_Vase.jpg",
    imgLicense: "CC BY-SA 4.0",
    imgAttribution: "Photo by Sumeetmoghe, via Wikimedia Commons (CC BY-SA 4.0)",
  },
  {
    id: "prod-madhubani-03",
    imgPath: "/crafts/madhubani-painting.jpg",
    imgSource: "Wikimedia Commons",
    imgUrl: "https://commons.wikimedia.org/wiki/File:Madhubani_painting.jpg",
    imgLicense: "CC0 / Public Domain",
    imgAttribution: "Public Domain image sourced via Wikimedia Commons",
  },
  {
    id: "prod-channapatna-04",
    imgPath: "/crafts/channapatna-toys.jpg",
    imgSource: "Wikimedia Commons",
    imgUrl: "https://commons.wikimedia.org/wiki/File:Channapatna_toys.jpg",
    imgLicense: "CC BY-SA 3.0",
    imgAttribution: "Photo via Wikimedia Commons (CC BY-SA 3.0)",
  },
  {
    id: "prod-banarasi-05",
    imgPath: "/crafts/banarasi-silk.jpg",
    imgSource: "Wikimedia Commons",
    imgUrl: "https://commons.wikimedia.org/wiki/File:Banarasi_Saree.jpg",
    imgLicense: "CC BY-SA 4.0",
    imgAttribution: "Photo via Wikimedia Commons (CC BY-SA 4.0)",
  },
  {
    id: "prod-kutch-06",
    imgPath: "/crafts/kutch-embroidery.jpg",
    imgSource: "Wikimedia Commons",
    imgUrl: "https://commons.wikimedia.org/wiki/File:Kutch_embroidery.jpg",
    imgLicense: "CC BY-SA 4.0",
    imgAttribution: "Photo via Wikimedia Commons (CC BY-SA 4.0)",
  },
  {
    id: "prod-pattachitra-07",
    imgPath: "/crafts/pattachitra.jpg",
    imgSource: "Wikimedia Commons",
    imgUrl: "https://commons.wikimedia.org/wiki/File:Pattachitra.jpg",
    imgLicense: "CC BY-SA 4.0",
    imgAttribution: "Photo via Wikimedia Commons (CC BY-SA 4.0)",
  },
  {
    id: "prod-kashmiri-08",
    imgPath: "/crafts/kashmiri-papier-mache.jpg",
    imgSource: "Wikimedia Commons",
    imgUrl: "https://commons.wikimedia.org/wiki/File:Kashmiri_papier_mache.jpg",
    imgLicense: "CC BY-SA 4.0",
    imgAttribution: "Photo via Wikimedia Commons (CC BY-SA 4.0)",
  },
];

for (const prod of PRODUCTS) {
  const idAnchor = `id: "${prod.id}"`;
  const idIdx = content.indexOf(idAnchor);
  if (idIdx === -1) {
    console.warn(`NOT FOUND: ${prod.id}`);
    continue;
  }

  // The product's closing sequence: \n    updated_at: "XXXX",\r\n  },
  // Find "\n  }," (product closing brace) after idIdx
  // But there can be nested "  }," for heritage_record etc.
  // The product-level close always follows "\n    updated_at: " (4 spaces)
  // Use regex to find pattern: (4-space)updated_at: "...",\r?\n  },
  
  // Find all matches of "    updated_at: " after idIdx
  let pos = idIdx;
  let productClose = -1;
  
  while (true) {
    // Find next occurrence of product-level updated_at line (4-space indent, not 6-space)
    const pattern = "\n    updated_at: ";
    const nextPos = content.indexOf(pattern, pos + 1);
    if (nextPos === -1) break;
    
    // Check what follows the end of this updated_at line
    const lineEnd = content.indexOf("\n", nextPos + 1);
    const nextLine = content.slice(lineEnd, lineEnd + 10);
    
    // Product-level close: next line is "  }," (2 spaces)
    if (nextLine.startsWith("\n  },")) {
      productClose = lineEnd; // insert before "\n  },"
      break;
    }
    
    pos = nextPos + 1;
  }

  if (productClose === -1) {
    console.warn(`Could not find product close for ${prod.id}`);
    continue;
  }

  // Build fields to insert
  const productChunk = content.slice(idIdx, productClose);
  const insertions = [];

  if (!productChunk.includes("image_attribution:")) {
    insertions.push(
      `    image_attribution: {\n` +
      `      image_url: "${prod.imgPath}",\n` +
      `      source_name: "${prod.imgSource}",\n` +
      `      source_url: "${prod.imgUrl}",\n` +
      `      license_type: "${prod.imgLicense}",\n` +
      `      attribution_required: true,\n` +
      `      attribution_text: "${prod.imgAttribution}",\n` +
      `      retrieved_at: "2026-09-13",\n` +
      `    },`
    );
  }

  if (!productChunk.includes("gi_craft_status:")) {
    insertions.push(`    gi_craft_status: "GI_REGISTERED_CRAFT",`);
    insertions.push(`    gi_authorised_user_status: "NOT_VERIFIED",`);
    insertions.push(`    gi_official_url: "${GI_URL}",`);
  }

  if (!productChunk.includes("price_audit_trail:")) {
    insertions.push(`    price_audit_trail: [],`);
  }

  if (insertions.length === 0) {
    console.log(`${prod.id}: already complete`);
    continue;
  }

  // Insert AFTER productClose (end of updated_at line), before "\n  },"
  const insertStr = "\n" + insertions.join("\n");
  content = content.slice(0, productClose) + insertStr + content.slice(productClose);
  console.log(`✅ ${prod.id}: Inserted ${insertions.length} fields`);
}

// ============================================================
// Write
// ============================================================
fs.writeFileSync(FILE, content, "utf8");

// Audit
const final = fs.readFileSync(FILE, "utf8");
console.log("\n=== FINAL AUDIT ===");
console.log("Unsplash URLs:", (final.match(/unsplash\.com/g) || []).length);
console.log("Fake GI refs:", (final.match(/GI Application Ref/g) || []).length);
console.log("image_attribution:", (final.match(/image_attribution:/g) || []).length);
console.log("price_audit_trail:", (final.match(/price_audit_trail:/g) || []).length);
console.log("gi_craft_status:", (final.match(/gi_craft_status:/g) || []).length);
console.log("Local /crafts/ featured_image_url:", (final.match(/featured_image_url: "\/crafts\//g) || []).length);
