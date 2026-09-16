const fs = require('fs');
const path = require('path');

const craftInfo = {
  'prod-dokra-01': {
    image: '/crafts/bastar-dhokra.jpg',
    author: 'Saiphani02',
    license: 'CC BY-SA 4.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Dhokra_item_Raodeo.jpg',
    giName: 'Bastar Dhokra',
    giAppNum: '83',
    recMin: 3600,
    recMax: 4100,
    median: 3775,
    finalPrice: 3900,
    reason: 'Artisan sovereign price selection based on master Ghadwa lineage 5-day lost-wax casting.'
  },
  'prod-blue-pottery-02': {
    image: '/crafts/jaipur-blue-pottery.jpg',
    author: 'Neek-Theri',
    license: 'CC BY-SA 4.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Jaipur_Blue_Pottery_Vase_with_Raja-Rani_Design.jpg',
    giName: 'Blue Pottery of Jaipur',
    giAppNum: '52',
    recMin: 1600,
    recMax: 2200,
    median: 1850,
    finalPrice: 1850,
    reason: 'Artisan accepted market median for non-clay quartz floral vase.'
  },
  'prod-madhubani-03': {
    image: '/crafts/madhubani-painting.jpg',
    author: 'Rohini',
    license: 'CC BY-SA 3.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Jadupatua_paintings_and_Madhubani_paintings.JPG',
    giName: 'Madhubani / Mithila Painting',
    giAppNum: '105',
    recMin: 2200,
    recMax: 2800,
    median: 2450,
    finalPrice: 2500,
    reason: 'Artisan selected fair market value for natural pigment Kohbar canvas.'
  },
  'prod-channapatna-04': {
    image: '/crafts/channapatna-toys.jpg',
    author: 'HPNadig',
    license: 'CC BY-SA 3.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Channapatna-toys.jpg',
    giName: 'Channapatna Toys & Dolls',
    giAppNum: '17',
    recMin: 650,
    recMax: 950,
    median: 780,
    finalPrice: 800,
    reason: 'Artisan price decision for Wrightia tinctoria natural vegetable lacquered toy.'
  },
  'prod-banarasi-05': {
    image: '/crafts/banarasi-silk.jpg',
    author: 'Ekabhishek',
    license: 'CC BY-SA 3.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Saree_on_display_at_Dilli_Haat.JPG',
    giName: 'Banaras Brocades and Sarees',
    giAppNum: '99',
    recMin: 14000,
    recMax: 18500,
    median: 16000,
    finalPrice: 16500,
    reason: 'Artisan benchmarked Kadhwa handloom weave requiring 24 days of loom time.'
  },
  'prod-kutch-06': {
    image: '/crafts/kutch-embroidery.jpg',
    author: 'Indianapolis Museum of Art',
    license: 'Public Domain',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Woman%27s_shirt_from_Kutch,_Gujarat,_India,_IMA_55114.jpg',
    giName: 'Kutch Embroidery',
    giAppNum: '97',
    recMin: 3200,
    recMax: 4200,
    median: 3600,
    finalPrice: 3800,
    reason: 'Artisan decision reflecting authentic Suf counted-thread mirror needlework.'
  },
  'prod-pattachitra-07': {
    image: '/crafts/pattachitra.jpg',
    author: 'Mike Prince',
    license: 'CC BY 2.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Pattachitra_Painting_(16419912954).jpg',
    giName: 'Orissa Pattachitra',
    giAppNum: '87',
    recMin: 4500,
    recMax: 6000,
    median: 5100,
    finalPrice: 5200,
    reason: 'Artisan price reflecting natural mineral pigment palm leaf miniature art.'
  },
  'prod-kashmiri-08': {
    image: '/crafts/kashmiri-papier-mache.jpg',
    author: 'Los Angeles County Museum of Art',
    license: 'Public Domain',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Pen_Box_(qalamdan)_LACMA_M.89.160a-b.jpg',
    giName: 'Kashmir Papier Mache',
    giAppNum: '178',
    recMin: 1800,
    recMax: 2600,
    median: 2150,
    finalPrice: 2200,
    reason: 'Artisan decision for gold-leaf Naqashi coated lacquer trinket box.'
  }
};

const officialIpIndiaRegistry = 'https://www.ipindia.gov.in/geographical-indications-track-application-list-of-registered-geographical-indications-and-authorised-users-part-a-register-list-of-registered-gi-of-india';

const filePath = path.join(process.cwd(), 'lib', 'db', 'seed-data.ts');
let content = fs.readFileSync(filePath, 'utf8');

for (const [prodId, info] of Object.entries(craftInfo)) {
  // Replace featured_image_url
  const imgRegex = new RegExp(`(id:\\s*"${prodId}"[\\s\\S]*?featured_image_url:\\s*)"https:[^"]+"`);
  content = content.replace(imgRegex, `$1"${info.image}"`);

  // Inject image_attribution, gi_craft_status, gi_authorised_user_status, gi_official_url, price_audit_trail
  const giBlockRegex = new RegExp(`(id:\\s*"${prodId}"[\\s\\S]*?featured_image_url:\\s*"${info.image}",\\s*additional_images:\\s*\\[[^\\]]*\\],)`);
  const replacementBlock = `$1
    image_attribution: {
      image_url: "${info.image}",
      source_name: "Wikimedia Commons (${info.author})",
      source_url: "${info.sourceUrl}",
      license_type: "${info.license}",
      attribution_required: true,
      attribution_text: "Photo: ${info.author}, via Wikimedia Commons (${info.license})",
      retrieved_at: "2026-09-13",
    },
    gi_craft_status: "GI_REGISTERED_CRAFT",
    gi_authorised_user_status: "NOT_VERIFIED",
    gi_official_url: "${officialIpIndiaRegistry}",
    price_audit_trail: [
      {
        id: "pda-${prodId}",
        product_id: "${prodId}",
        previous_price: null,
        new_price: ${info.finalPrice},
        recommended_min: ${info.recMin},
        recommended_max: ${info.recMax},
        market_median: ${info.median},
        changed_by: "artisan",
        changed_at: "2026-09-12T14:00:00.000Z",
        reason: "${info.reason}",
        source_analysis_id: "pa-${prodId}",
      }
    ],`;
  content = content.replace(giBlockRegex, replacementBlock);
}

// Upgrade claims in all products: add provenance_status, is_artisan_attested, source_record
content = content.replace(/provenance_label:\s*"Artisan Provided",\s*verification_status:\s*"verified",/g,
  `provenance_status: "ARTISAN_PROVIDED",
          provenance_label: "Artisan Provided",
          verification_status: "verified",
          is_artisan_attested: true,`
);

content = content.replace(/provenance_label:\s*"Verified Source",\s*verification_status:\s*"verified",\s*source_reference:\s*"([^"]+)",/g,
  (match, ref) => `provenance_status: "VERIFIED_SOURCE",
          provenance_label: "Verified Source",
          verification_status: "verified",
          source_reference: "${ref}",
          source_url: "${officialIpIndiaRegistry}",
          source_record: {
            source_id: "src-official-${Math.random().toString(36).substring(2, 6)}",
            source_name: "IP India — Geographical Indications Registry",
            source_type: "Government Registry",
            source_url: "${officialIpIndiaRegistry}",
            retrieved_at: "2026-09-13",
            verification_status: "VERIFIED_SOURCE",
            notes: "Official Part A Registered GI Craft of India under Geographical Indications of Goods Act, 1999."
          },
          is_artisan_attested: false,`
);

content = content.replace(/provenance_label:\s*"AI Suggested",\s*verification_status:\s*"requires_verification",/g,
  `provenance_status: "AI_SUGGESTED",
          provenance_label: "AI Suggested",
          verification_status: "requires_verification",
          is_artisan_attested: false,`
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully updated lib/db/seed-data.ts with authentic craft images and metadata!');
