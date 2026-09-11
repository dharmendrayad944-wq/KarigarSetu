# SIH26090 MVP Implementation Checklist

## Phase A — Foundation
- [x] Next.js + TypeScript project (Next.js 16 App Router + Strict Mode)
- [x] Tailwind setup (Tailwind v4 with warm Indian Heritage design tokens)
- [x] Supabase client/server utilities (`supabase/schema.sql`, `supabase/seed.sql`, `lib/supabase/client.ts`)
- [x] Environment variable handling (`.env.example`, `.env.local` with `NEXT_PUBLIC_DEMO_MODE=true`)
- [x] Global design system (Terracotta, Sandalwood, Deep Indigo, Saffron, minimum 48px touch targets)
- [x] Mobile navigation (Responsive mobile menu + dual language toggle)

## Phase B — Authentication
- [x] Registration (`/register` with state, district, language, craft category)
- [x] Login (`/login` with OTP and 1-click SIH judge demo profiles)
- [x] Logout / Switch user
- [x] Artisan profile (Active artisan state management)
- [x] Protected dashboard routes (`/dashboard`)

## Phase C — AI Listing Flow
- [x] Image upload (Drag & drop, camera capture, plus 1-click authentic craft presets)
- [x] Voice recording/upload (Live mic waveform recording, Web Speech API in Hindi/English)
- [x] Text fallback (Optional accordion textarea)
- [x] Processing state (Animated multi-step heritage AI progress indicator)
- [x] Demo AI response (Deterministic multimodal intelligence service in `lib/ai/mock-ai.ts`)
- [x] Editable result (Two-column review workspace with side-by-side photo & fields)

## Phase D — Heritage
- [x] Heritage profile editor (Technique, cultural significance, historical background)
- [x] Claim source labels (`Artisan Provided`, `AI Inferred`, `Verified GI/Official`)
- [x] Verification status (`Verified Heritage`, `Needs Verification`, `Flagged`)
- [x] Artisan story (Living voice narrative preserved)

## Phase E — Publishing
- [x] Draft (Ability to save progress without publishing)
- [x] Review (`/products/[id]/review` workspace)
- [x] Approval (Mandatory explicit artisan approval guard)
- [x] Catalogue (`/catalogue` with live search, category and state filters)
- [x] Product detail (Commercial specs, pricing, and materials)
- [x] Heritage detail (`/heritage/[id]` digital heritage passport with GI references)

## Phase F — Quality
- [x] Error handling (Zod validations on pricing, titles, descriptions, and media)
- [x] Empty states (Artisan dashboard, search filters)
- [x] Responsive UI (Tested across mobile, tablet, and desktop)
- [x] Accessibility (High-contrast, large touch targets, keyboard focus rings)
- [x] Browser test (Complete journey verified)
- [x] README (Complete setup and architecture documentation)
- [x] Demo seed data (Madhubani painting, Jaipur blue pottery, Bastar dokra, Channapatna toys)
