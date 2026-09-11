-- ==============================================================================
-- SIH26090: KarigarSetu - Seed Data
-- ==============================================================================

-- Seed Craft Categories
insert into public.categories (id, name_en, name_hi, description, icon_name) values
  ('pottery', 'Pottery & Ceramics', 'मिट्टी के बर्तन और चीनी मिट्टी', 'Traditional clay, terracotta and glazed pottery', 'CookingPot'),
  ('textiles', 'Handloom & Textiles', 'हथकरघा और वस्त्र', 'Weaving, block printing, embroidery and brocades', 'Shirt'),
  ('metalwork', 'Bell Metal & Brassware', 'धातु शिल्प व पीतल', 'Lost-wax casting, brass engraving and bell metal', 'Hammer'),
  ('paintings', 'Folk & Tribal Paintings', 'लोक एवं जनजातीय चित्रकला', 'Madhubani, Warli, Pattachitra, Gond and Miniature', 'Palette'),
  ('woodwork', 'Woodcraft & Lacquerware', 'काष्ठ शिल्प और लाख', 'Hand carving, sandalwood craft and natural lacquer toys', 'TreePine'),
  ('jewellery', 'Traditional Jewellery', 'पारंपरिक आभूषण', 'Meenakari, Thewa, Kundan and Dokra beads', 'Sparkles')
on conflict (id) do nothing;
