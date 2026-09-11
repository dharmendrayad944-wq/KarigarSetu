l# KarigarSetu (कारीगर सेतु) — SIH26090
> **Smart India Hackathon 2026** | **Theme: Heritage and Culture**  
> *AI-Powered Artisan Onboarding Assistant & National Living Heritage Vault*

---

## Strategic Vision

India has millions of traditional artisans crafting pottery, handlooms, bell metal, tribal paintings, and woodwork. Many struggle with the digital work required to sell online: photography, titles, fair pricing, and English-centric interfaces.

**KarigarSetu** is **not another marketplace**. It is an artisan-side digital onboarding bridge and cultural preservation platform. The artisan photographs their handcrafted piece and describes it in their native mother tongue (Hindi/English). The AI transcribes their voice, extracts craft morphology, transparently computes fair labor price ranges, and compiles an editable listing structured for export to external digital commerce networks (ONDC, GeM, Etsy) while archiving the craft in the **National Living Heritage Vault**.

---

## Heritage-First Differentiation

1. **Strict 4-Tier Provenance Matrix**:
   - 🗣️ **Artisan-Provided**: Voice testimony, materials used, generational stories.
   - 🤖 **AI-Inferred**: Motifs detected, technique classification, regional cluster matching.
   - ⚠️ **Requires Verification**: Unverified cultural or technique claims flagged for artisan/guild review before publication.
   - 🏛️ **Verified Official**: Documented against official GI Registry and State Handicraft Board databases.
2. **Never Automatically Claims GI Certification**:
   - Matches against regional GI clusters are strictly designated as *GI Candidate (Requires Verification)* until officially proven.
3. **Transparent AI Fair Price Algorithm**:
   - Explains the math: `Raw Materials Cost` + `Crafting Hours` @ `Living Wage Benchmark` + `Marketplace Buffer`.
4. **"What the AI Understood" Pre-Generation Inspection**:
   - Full visibility into acoustic keywords and visual morphology before generating final text.
5. **Living Heritage Vault (`/vault`)**:
   - Institutional archive of living Indian craft traditions, craft blueprints, and endangered status tracking.

---

## Core Flow

$$\text{Artisan Login} \longrightarrow \text{Studio} \longrightarrow \text{Voice + Photo} \longrightarrow \text{What AI Understood} \longrightarrow \text{Multimodal Analysis} \longrightarrow \text{Price Rationale \and Heritage Audit} \longrightarrow \text{Approve} \longrightarrow \text{Vault \and ONDC Export}$$

---

## Tech Stack

- **Framework**: Next.js 16 (App Router) + React 19 + TypeScript (Strict Mode)
- **Styling**: Tailwind CSS v4 + Warm Indian Heritage Design Tokens (Terracotta `#C2410C`, Sand, Deep Indigo, Saffron)
- **Validation**: Zod (Pricing rules, required media, payload integrity)
- **Icons**: Lucide React
- **Multimodal AI**: Google Gemini Flash + Deterministic Craft AI Mock for zero-config offline demo
- **Speech-to-Text**: Web Speech API + Speech Service abstraction
- **Database**: Supabase PostgreSQL (`supabase/schema.sql`) + Universal repository
- **Unit Testing**: Vitest (16 automated tests covering validation, pricing breakdown, approval guards, and 4-tier claims)

---

## Quick Start (Zero-Config Demo Mode)

The application includes a `DEMO_MODE=true` default fallback, meaning **no paid external API keys are required to test the entire application during hackathon evaluations!**

### 1. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 2. Run Automated Tests
```bash
npm test
```

### 3. Build Production Bundle
```bash
npm run build
```

---

## Key Pages & Routes

| Route | Purpose |
|---|---|
| `/` | Landing page explaining the AI onboarding assistant & Heritage Vault structure |
| `/vault` | **National Living Heritage Vault** tracking verified GI crafts and GI candidates |
| `/login` & `/register` | Onboarding sign-in with separation between Master Artisan and State GI Verifier |
| `/dashboard` | Artisan Studio: Metrics, craft listings, and voice onboarding launchpad |
| `/products/new` | Photo upload, mic recording, and **What the AI Understood** preview |
| `/products/[id]/review` | AI review workspace with **AI Fair Price Rationale Breakdown**, 4-tier claims, and ONDC exporter |
| `/catalogue` | Marketplace-ready catalogue structured for export to digital commerce networks |
| `/heritage/[id]` | Dedicated Digital Heritage Passport with printable certificate layout and GI verification trail |
