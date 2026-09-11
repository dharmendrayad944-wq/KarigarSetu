# MASTER BUILD PROMPT FOR GOOGLE ANTIGRAVITY

You are the lead engineer for SIH26090, a Smart India Hackathon 2026 project under the theme “Heritage and Culture”. Build a production-quality MVP web application called “KarigarSetu” (working name; keep branding easy to rename).

## 1. Product objective
India has millions of artisans making handicrafts, pottery, jewellery, handloom products and other traditional products. Many struggle with the digital work required to sell online: photography, titles, descriptions, categories, pricing, and language. Our application is an AI assistant that sits with the artisan and turns a product photo plus a spoken description in the artisan’s own language into an editable, marketplace-ready listing. The artisan reviews and approves the result before publication.

Source project outline: the supplied SIH26090 outline states that the artisan provides a photo and speaks about the product in their own language; the AI generates title, description, category and suggested price range; the artisan checks/approves; the listing is then ready for sale on existing platforms rather than becoming another marketplace.

## 2. Heritage-first differentiation
Do not build this as generic e-commerce CRUD. Every product must have a “Digital Heritage Profile” with:
- Craft name
- Region / state / district
- Traditional technique
- Materials
- Motifs / design elements
- Artisan story
- Cultural significance
- GI / ODOP fields where verified
- Source / verification status for each heritage claim

Clearly label:
- Artisan-provided information
- AI-inferred information
- Verified external metadata

Never present unverified AI-generated cultural facts as established truth.

## 3. Primary user
Primary user: artisan with limited digital literacy and potentially limited English/Hindi literacy.

UX requirements:
- Mobile-first
- Large touch targets
- Minimal typing
- Voice-first interaction
- Simple Hindi/English toggle initially, but architecture must support more Indian languages
- Very clear progress states
- Friendly, non-technical language

## 4. Core user journey
1. Landing page
2. Artisan signs in / registers
3. Dashboard
4. Tap “Add Product”
5. Upload/take one product image
6. Record or upload a voice description
7. AI processing screen
8. AI creates structured listing:
   - title
   - description
   - category
   - suggested price range
   - materials
   - craft
   - region
   - heritage story draft
9. Artisan edits fields
10. Artisan approves
11. Product appears in catalogue
12. Product detail page shows commercial data and heritage profile separately

## 5. MVP pages
### Landing
Hero: “Your craft. Your voice. Your digital marketplace.”
Explain three pillars: Access, Income, Heritage.
CTA: “Start Selling”.

### Login / Registration
Fields:
- name
- mobile/email
- state
- district
- preferred language
- craft category
Use Supabase Auth.

### Dashboard
Show:
- Products listed
- Products sold (mockable initially)
- Estimated revenue (mockable initially)
- Heritage records
- Recent products
- Add Product CTA

### Add Product
Two primary inputs:
- Product photo
- Voice description
Also include text fallback.
Show upload/record progress and retry states.

### AI Review
Two-column desktop / stacked mobile layout:
Left: product image
Right: editable AI-generated listing
Sections:
- Title
- Description
- Category
- Suggested price range
- Materials
- Craft
- Region
- Heritage profile
Buttons: Save Draft, Regenerate, Approve & Publish

### Catalogue
Search, category filters, region filters.
Cards with product image, title, craft, region and price range.

### Heritage Detail
Show a dedicated heritage record with clear labels for source/verification.

## 6. Data model
Create Supabase-ready schema for:
- profiles
- artisans
- products
- product_media
- product_ai_generations
- heritage_profiles
- heritage_claims
- approvals
- categories

Important product fields:
- id
- artisan_id
- title
- description
- category
- craft_name
- state
- district
- materials
- motifs
- suggested_min_price
- suggested_max_price
- artisan_story
- status (draft/review/approved/published)
- created_at
- updated_at

heritage_claims should include:
- heritage_profile_id
- claim_text
- source_type (artisan/official/ai)
- source_url nullable
- verification_status (unverified/verified/rejected)

## 7. API architecture
Create a clean service abstraction so providers can be swapped.

POST /api/ai/generate-listing
Input:
- image URL
- voice transcript or text description
- artisan location
- selected craft category if available

Output JSON:
{
  title,
  description,
  category,
  suggested_price_min,
  suggested_price_max,
  materials[],
  craft_name,
  region,
  heritage_story_draft,
  confidence_notes[]
}

POST /api/speech/transcribe
Keep provider behind an interface.

Do not hard-code API keys. Use environment variables.

## 8. AI safety / accuracy
- Never fabricate GI registration numbers.
- Never assert cultural history without a verified source.
- For uncertain recognition, say “Needs verification”.
- Price is a suggestion, not a guaranteed market value.
- Artisan approval is mandatory before publication.

## 9. Demo mode
The application must work without external AI keys for the SIH demo.
Create a DEMO_MODE environment flag.
When DEMO_MODE=true:
- use a deterministic mocked AI response
- preserve the real UI/flow
- show a small “Demo AI” indicator only in developer/demo mode

This lets the complete flow be demonstrated even if an external model/API is unavailable.

## 10. Visual design
Design should feel modern but rooted in Indian craft, without looking like a tourism website.
Use:
- warm neutral background
- clean typography
- subtle craft-inspired geometric motifs
- restrained visual decoration
- accessible contrast
- polished responsive cards

Avoid excessive gradients, glassmorphism, animation, or clutter.

## 11. Engineering quality
- TypeScript strict mode
- Zod validation
- reusable components
- proper loading/error/empty states
- accessible form labels
- keyboard accessibility
- responsive from 360px upward
- no console errors
- no fake broken buttons
- use realistic sample data only inside DEMO_MODE
- create a .env.example
- add seed/demo data script
- add README setup instructions

## 12. Testing
Create tests for:
- listing payload validation
- price range validation
- approval flow
- preventing publication before approval
- heritage claim verification labeling

Also perform browser-level verification for:
Login → Dashboard → Add Product → Upload → AI Generate → Edit → Approve → Catalogue → Heritage Detail.

## 13. Build strategy
Do the work incrementally:
Phase A: project setup + design system
Phase B: auth + dashboard
Phase C: product creation + media storage
Phase D: demo AI generation
Phase E: review/approval + catalogue
Phase F: heritage profile
Phase G: tests + responsive polish

After each phase:
- run the app
- inspect in browser
- fix runtime errors
- keep the code compiling

Do not replace the whole project with a different architecture after implementation begins. Prefer small, verifiable changes.
