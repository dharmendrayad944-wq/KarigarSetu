/**
 * add-gi-craft-status.js — Add gi_craft_status, gi_authorised_user_status, gi_official_url
 * to all 8 products that don't already have it.
 */
const fs = require("fs");
const path = require("path");

const FILE = path.join(__dirname, "../lib/db/seed-data.ts");
let content = fs.readFileSync(FILE, "utf8");

const GI_REGISTRY_URL =
  "https://www.ipindia.gov.in/geographical-indications-track-application-list-of-registered-geographical-indications-and-authorised-users-part-a-register-list-of-registered-gi-of-india";

// Insert gi_craft_status after each gi_tag_applicable: true, if not already present
// Pattern: gi_tag_applicable: true,\n  (no gi_craft_status after it yet)
let count = 0;
content = content.replace(
  /gi_tag_applicable: true,\r?\n(?!\s*gi_craft_status:)/g,
  () => {
    count++;
    return `gi_tag_applicable: true,\r\n    gi_craft_status: "GI_REGISTERED_CRAFT",\r\n    gi_authorised_user_status: "NOT_VERIFIED",\r\n    gi_official_url: "${GI_REGISTRY_URL}",\r\n`;
  }
);

fs.writeFileSync(FILE, content, "utf8");

// Verify
const final = fs.readFileSync(FILE, "utf8");
const craftStatusCount = (final.match(/gi_craft_status:/g) || []).length;
console.log(`Added ${count} gi_craft_status blocks. Total: ${craftStatusCount}`);
