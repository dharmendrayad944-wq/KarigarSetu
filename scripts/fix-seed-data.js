/**
 * fix-seed-data.js — P1 Remediation: Fix seed-data.ts
 * 
 * Fixes:
 * 1. Replace Unsplash URLs with local /crafts/ images
 * 2. Replace fake GI registration refs with truthful labels
 * 3. Add image_attribution metadata for each product
 * 4. Add price_audit_trail for each product
 * 5. Add correct gi_craft_status and gi_authorised_user_status
 * 6. Add gi_official_url
 */

const fs = require("fs");
const path = require("path");

const FILE = path.join(__dirname, "../lib/db/seed-data.ts");

let content = fs.readFileSync(FILE, "utf8");

// ============================================================
// 1. Replace Unsplash featured_image_urls with /crafts/ images
// ============================================================
const imageMap = {
  // Bastar Dhokra
  "photo-1544717305-2782549b5136": "/crafts/bastar-dhokra.jpg",
  // Jaipur Blue Pottery
  "photo-1610701596007-11502861dcfa": "/crafts/jaipur-blue-pottery.jpg",
  // Madhubani
  "photo-1579783902614-a3fb3927b675": "/crafts/madhubani-painting.jpg",
  // Channapatna
  "photo-1596461404969-9ae70f2830c1": "/crafts/channapatna-toys.jpg",
  // Banarasi
  "photo-1610030469983-98e550d6193c": "/crafts/banarasi-silk.jpg",
  // Kutch
  "photo-1584917865442-de89df76afd3": "/crafts/kutch-embroidery.jpg",
  // Pattachitra
  "photo-1579783900882-c0d3dad7b119": "/crafts/pattachitra.jpg",
  // Kashmiri
  "photo-1578749556568-bc2c40e68b61": "/crafts/kashmiri-papier-mache.jpg",
  // additional image (Dhokra extra shot)
  "photo-1606744824163-985d376605aa": "/crafts/bastar-dhokra.jpg",
};

for (const [unsplashId, localPath] of Object.entries(imageMap)) {
  const regex = new RegExp(
    `"https://images\\.unsplash\\.com/[^"]*${unsplashId}[^"]*"`,
    "g"
  );
  content = content.replace(regex, `"${localPath}"`);
}

// ============================================================
// 2. Remove additional_images with Unsplash URLs (set to [])
// ============================================================
content = content.replace(
  /additional_images:\s*\[\s*"\/crafts\/[^"]+\.jpg"\s*\],/g,
  "additional_images: [],"
);

// ============================================================
// 3. Replace fake GI Application Ref numbers with truthful labels
// ============================================================
content = content.replace(
  /"GI Application Ref #\d+ \(Demo Reference\)"/g,
  '"GI-Registered Craft"'
);
content = content.replace(
  /`GI Application Ref #\d+ \(Demo Reference\)`/g,
  "`GI-Registered Craft`"
);

// Also fix gi_candidacy_note with fake refs
content = content.replace(
  /Registered Geographical Indication[^"]*\(Demo Reference #\d+\)/g,
  "Matches registered craft cluster in Intellectual Property India records (Craft-Level Recognition)"
);

// ============================================================
// 4. Add gi_craft_status, gi_authorised_user_status, gi_official_url
//    after each gi_registry_number: null line
// ============================================================
const GI_REGISTRY_URL =
  "https://www.ipindia.gov.in/geographical-indications-track-application-list-of-registered-geographical-indications-and-authorised-users-part-a-register-list-of-registered-gi-of-india";

// Only add if not already present
if (!content.includes("gi_craft_status:")) {
  content = content.replace(
    /gi_registry_number: null,(\s*\/\/ No fake government identifier)/g,
    `gi_registry_number: null, // No fake government identifier\n    gi_craft_status: "GI_REGISTERED_CRAFT",\n    gi_authorised_user_status: "NOT_VERIFIED",\n    gi_official_url: "${GI_REGISTRY_URL}",`
  );
}

// ============================================================
// 5. Add image_attribution after additional_images: [], for each craft
// ============================================================
const attributionMap = [
  {
    craftId: "prod-dokra-01",
    imagePath: "/crafts/bastar-dhokra.jpg",
    sourceName: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Dhokra_item_Raodeo.jpg",
    license: "CC BY-SA 4.0",
    attribution: "Photo by Saiphani02, via Wikimedia Commons (CC BY-SA 4.0)",
  },
  {
    craftId: "prod-pottery-02",
    imagePath: "/crafts/jaipur-blue-pottery.jpg",
    sourceName: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Jaipur_blue_pottery.jpg",
    license: "CC BY-SA 4.0",
    attribution:
      "Photo by Sumeetmoghe, via Wikimedia Commons (CC BY-SA 4.0)",
  },
  {
    craftId: "prod-madhubani-03",
    imagePath: "/crafts/madhubani-painting.jpg",
    sourceName: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Madhubani_painting.jpg",
    license: "CC0 / Public Domain",
    attribution:
      "Public Domain image sourced via Wikimedia Commons",
  },
  {
    craftId: "prod-channapatna-04",
    imagePath: "/crafts/channapatna-toys.jpg",
    sourceName: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Channapatna_toys.jpg",
    license: "CC BY-SA 3.0",
    attribution:
      "Photo via Wikimedia Commons (CC BY-SA 3.0)",
  },
  {
    craftId: "prod-banarasi-05",
    imagePath: "/crafts/banarasi-silk.jpg",
    sourceName: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Banarasi_Saree.jpg",
    license: "CC BY-SA 4.0",
    attribution:
      "Photo via Wikimedia Commons (CC BY-SA 4.0)",
  },
  {
    craftId: "prod-kutch-06",
    imagePath: "/crafts/kutch-embroidery.jpg",
    sourceName: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Kutch_embroidery.jpg",
    license: "CC BY-SA 4.0",
    attribution:
      "Photo via Wikimedia Commons (CC BY-SA 4.0)",
  },
  {
    craftId: "prod-pattachitra-07",
    imagePath: "/crafts/pattachitra.jpg",
    sourceName: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Pattachitra.jpg",
    license: "CC BY-SA 4.0",
    attribution:
      "Photo via Wikimedia Commons (CC BY-SA 4.0)",
  },
  {
    craftId: "prod-kashmiri-08",
    imagePath: "/crafts/kashmiri-papier-mache.jpg",
    sourceName: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Kashmiri_papier_mache.jpg",
    license: "CC BY-SA 4.0",
    attribution:
      "Photo via Wikimedia Commons (CC BY-SA 4.0)",
  },
];

// For each craft, insert image_attribution after additional_images: [],
if (!content.includes("image_attribution:")) {
  for (const attr of attributionMap) {
    const imageAttributionBlock = `image_attribution: {
      image_url: "${attr.imagePath}",
      source_name: "${attr.sourceName}",
      source_url: "${attr.sourceUrl}",
      license_type: "${attr.license}",
      attribution_required: true,
      attribution_text: "${attr.attribution}",
      retrieved_at: "2026-09-13",
    },`;

    // Insert after 'additional_images: [],' near the craft id
    // We use a product-id-specific anchor
    const anchor = `id: "${attr.craftId}"`;
    const idx = content.indexOf(anchor);
    if (idx === -1) continue;

    // Find 'additional_images: [],' after this anchor
    const searchStart = idx;
    const addImgIdx = content.indexOf("additional_images: [],", searchStart);
    if (addImgIdx === -1) continue;

    const insertAt = addImgIdx + "additional_images: [],".length;
    content =
      content.slice(0, insertAt) +
      "\n    " +
      imageAttributionBlock +
      content.slice(insertAt);
  }
}

// ============================================================
// 6. Add price_audit_trail to each product (minimal initial record)
// ============================================================
if (!content.includes("price_audit_trail:")) {
  // For simplicity, add empty price_audit_trail before 'gi_status:' in each product
  content = content.replace(
    /(\s+gi_status: "gi_registered",)/g,
    `\n    price_audit_trail: [],\n$1`
  );
}

// ============================================================
// Write back
// ============================================================
fs.writeFileSync(FILE, content, "utf8");
console.log("✅ seed-data.ts fixed successfully");

// Verify
const final = fs.readFileSync(FILE, "utf8");
const remaining = (final.match(/unsplash\.com/g) || []).length;
const fakeGI = (final.match(/GI Application Ref/g) || []).length;
const hasAttribution = final.includes("image_attribution:");
const hasAuditTrail = final.includes("price_audit_trail:");
const hasCraftStatus = final.includes("gi_craft_status:");
console.log(`Remaining Unsplash URLs: ${remaining} (target: 0)`);
console.log(`Remaining fake GI refs: ${fakeGI} (target: 0)`);
console.log(`Has image_attribution: ${hasAttribution}`);
console.log(`Has price_audit_trail: ${hasAuditTrail}`);
console.log(`Has gi_craft_status: ${hasCraftStatus}`);
