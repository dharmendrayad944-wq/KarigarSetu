const fs = require('fs');
const path = require('path');

const targetDir = path.join(process.cwd(), 'public', 'crafts');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

let sharp;
try {
  sharp = require(path.join(process.cwd(), 'node_modules', 'sharp'));
} catch (e) {
  console.log('Sharp not found, will save raw buffers directly.');
}

const crafts = [
  {
    name: 'bastar-dhokra.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/5/56/Dhokra_item_Raodeo.jpg',
    craft: 'Bastar Dhokra',
    author: 'Saiphani02',
    license: 'CC BY-SA 4.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Dhokra_item_Raodeo.jpg'
  },
  {
    name: 'jaipur-blue-pottery.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/2/28/Jaipur_Blue_Pottery_Vase_with_Raja-Rani_Design.jpg',
    craft: 'Jaipur Blue Pottery',
    author: 'Neek-Theri',
    license: 'CC BY-SA 4.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Jaipur_Blue_Pottery_Vase_with_Raja-Rani_Design.jpg'
  },
  {
    name: 'madhubani-painting.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/0/03/Jadupatua_paintings_and_Madhubani_paintings.JPG',
    craft: 'Madhubani Painting',
    author: 'Rohini',
    license: 'CC BY-SA 3.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Jadupatua_paintings_and_Madhubani_paintings.JPG'
  },
  {
    name: 'channapatna-toys.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Channapatna-toys.jpg',
    craft: 'Channapatna Toys',
    author: 'HPNadig',
    license: 'CC BY-SA 3.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Channapatna-toys.jpg'
  },
  {
    name: 'banarasi-silk.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Saree_on_display_at_Dilli_Haat.JPG',
    craft: 'Banarasi Silk Brocade',
    author: 'Ekabhishek',
    license: 'CC BY-SA 3.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Saree_on_display_at_Dilli_Haat.JPG'
  },
  {
    name: 'kutch-embroidery.jpg',
    url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Woman%27s_shirt_from_Kutch%2C_Gujarat%2C_India%2C_IMA_55114.jpg?width=900',
    craft: 'Kutch Embroidery',
    author: 'Indianapolis Museum of Art',
    license: 'Public Domain',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Woman%27s_shirt_from_Kutch,_Gujarat,_India,_IMA_55114.jpg'
  },
  {
    name: 'pattachitra.jpg',
    url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Pattachitra_Painting_%2816419912954%29.jpg?width=900',
    craft: 'Raghurajpur Pattachitra',
    author: 'Mike Prince',
    license: 'CC BY 2.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Pattachitra_Painting_(16419912954).jpg'
  },
  {
    name: 'kashmiri-papier-mache.jpg',
    url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Pen_Box_%28qalamdan%29_LACMA_M.89.160a-b.jpg?width=900',
    craft: 'Kashmiri Papier-Mâché',
    author: 'Los Angeles County Museum of Art',
    license: 'Public Domain',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Pen_Box_(qalamdan)_LACMA_M.89.160a-b.jpg'
  }
];

async function downloadImages() {
  console.log('Starting craft image download...');
  for (const c of crafts) {
    const dest = path.join(targetDir, c.name);
    if (fs.existsSync(dest) && fs.statSync(dest).size > 1000) {
      console.log(`- Skipping ${c.craft} (already exists: ${Math.round(fs.statSync(dest).size / 1024)} KB)`);
      continue;
    }
    try {
      console.log(`Downloading ${c.craft}...`);
      await new Promise((r) => setTimeout(r, 2500));
      const res = await fetch(c.url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
        }
      });
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }
      const arrayBuffer = await res.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      if (sharp) {
        await sharp(buffer)
          .resize({ width: 900, height: 900, fit: 'inside', withoutEnlargement: true })
          .jpeg({ quality: 82, progressive: true })
          .toFile(dest);
      } else {
        fs.writeFileSync(dest, buffer);
      }

      const stats = fs.statSync(dest);
      console.log(`✓ Saved ${c.name} (${Math.round(stats.size / 1024)} KB)`);
    } catch (err) {
      console.error(`Failed to download ${c.name}:`, err.message);
    }
  }
  console.log('Finished craft image processing.');
}

downloadImages();
