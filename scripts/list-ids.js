const fs = require('fs');
const c = fs.readFileSync('lib/db/seed-data.ts', 'utf8');
const lines = c.split('\n');
lines.forEach((l, i) => {
  if (l.includes("id: ") && l.includes("prod-")) {
    console.log(i + 1, l.trim());
  }
});
