/**
 * fix-demo-references.js — Remove all fake Demo Reference #NNN from seed-data.ts
 */
const fs = require("fs");
const path = require("path");

const FILE = path.join(__dirname, "../lib/db/seed-data.ts");
let content = fs.readFileSync(FILE, "utf8");

// Count before
const before = (content.match(/Demo Reference #\d+/g) || []).length;
console.log(`Before: ${before} fake Demo Reference occurrences`);

// Fix gi_candidacy_note
content = content.replace(
  /gi_candidacy_note: "([^"]*)\(Demo Reference #\d+\)"/g,
  (match, prefix) => {
    // Replace the whole thing with a clean version
    return `gi_candidacy_note: "${prefix.trim()} (Craft-Level Recognition)"`;
  }
);

// Fix source_reference for GI claims - replace with truthful reference
content = content.replace(
  /source_reference: "GI Registry India \(Demo Reference #\d+\)"/g,
  'source_reference: "Intellectual Property India — Geographical Indications Registry (craft-level reference)"'
);
content = content.replace(
  /source_reference: "Government GI Registry India \(Demo Reference #\d+\)"/g,
  'source_reference: "Intellectual Property India — GI Registry (craft-level registration verified)"'
);

// Fix claim_text references
content = content.replace(
  /\(Demo Reference #\d+\)\./g,
  "."
);
content = content.replace(
  / \(Demo Reference #\d+\)/g,
  ""
);

// Any remaining
content = content.replace(
  /Demo Reference #\d+/g,
  "Craft-Level Recognition"
);

// Count after
const after = (content.match(/Demo Reference #\d+/g) || []).length;
console.log(`After: ${after} fake Demo Reference occurrences`);

fs.writeFileSync(FILE, content, "utf8");
console.log("Done");
