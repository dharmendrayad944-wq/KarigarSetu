const fs = require('fs');
const c = fs.readFileSync('lib/db/seed-data.ts', 'utf8');
console.log('Unsplash URLs:', (c.match(/unsplash\.com/g)||[]).length);
console.log('Fake GI refs:', (c.match(/GI Application Ref/g)||[]).length);
console.log('image_attribution blocks:', (c.match(/image_attribution:/g)||[]).length);
console.log('price_audit_trail:', (c.match(/price_audit_trail:/g)||[]).length);
console.log('gi_craft_status:', (c.match(/gi_craft_status:/g)||[]).length);
console.log('Local crafts featured images:', (c.match(/featured_image_url: "\/crafts\//g)||[]).length);
