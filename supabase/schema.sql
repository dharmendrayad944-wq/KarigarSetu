-- ==============================================================================
-- SIH26090: KarigarSetu - Supabase PostgreSQL Schema
-- Theme: Heritage & Culture
-- ==============================================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Profiles Table (Extends Supabase auth.users)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text not null,
  phone text,
  avatar_url text,
  preferred_language text default 'hi' check (preferred_language in ('hi', 'en', 'bn', 'te', 'ta', 'mr', 'gu', 'kn', 'or', 'ml')),
  role text default 'artisan' check (role in ('artisan', 'admin', 'verifier')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 2. Categories Table (Craft domains)
create table if not exists public.categories (
  id text primary key,
  name_en text not null,
  name_hi text not null,
  description text,
  icon_name text,
  created_at timestamptz default now()
);

-- 3. Artisans Table
create table if not exists public.artisans (
  id uuid primary key default uuid_generate_v4(),
  profile_id uuid references public.profiles(id) on delete cascade,
  display_name text not null,
  craft_category text references public.categories(id),
  state text not null,
  district text not null,
  experience_years integer default 5,
  bio text,
  is_verified boolean default false,
  gi_artisan_card_number text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 4. Products Table
create table if not exists public.products (
  id uuid primary key default uuid_generate_v4(),
  artisan_id uuid references public.artisans(id) on delete cascade,
  title text not null,
  title_hi text,
  description text not null,
  description_hi text,
  category text references public.categories(id),
  craft_name text not null,
  state text not null,
  district text not null,
  materials text[] default '{}',
  motifs text[] default '{}',
  suggested_min_price numeric(10, 2) not null check (suggested_min_price >= 0),
  suggested_max_price numeric(10, 2) not null check (suggested_max_price >= suggested_min_price),
  final_price numeric(10, 2),
  artisan_story text,
  status text not null default 'draft' check (status in ('draft', 'review', 'approved', 'published', 'archived')),
  featured_image_url text,
  gi_tag_applicable boolean default false,
  gi_registry_number text,
  odop_product_tag text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 5. Product Media Table
create table if not exists public.product_media (
  id uuid primary key default uuid_generate_v4(),
  product_id uuid references public.products(id) on delete cascade,
  media_type text not null check (media_type in ('image', 'audio', 'video')),
  url text not null,
  is_primary boolean default false,
  transcript text,
  created_at timestamptz default now()
);

-- 6. Product AI Generations Table (Audit & reproducibility trail)
create table if not exists public.product_ai_generations (
  id uuid primary key default uuid_generate_v4(),
  product_id uuid references public.products(id) on delete cascade,
  model_name text not null,
  input_prompt text,
  audio_transcript text,
  image_url text,
  raw_response jsonb not null,
  confidence_score numeric(4, 3),
  created_at timestamptz default now()
);

-- 7. Heritage Profiles Table
create table if not exists public.heritage_profiles (
  id uuid primary key default uuid_generate_v4(),
  product_id uuid unique references public.products(id) on delete cascade,
  craft_name text not null,
  traditional_technique text not null,
  cultural_significance text not null,
  historical_background text,
  gi_status text default 'unverified' check (gi_status in ('unverified', 'applied', 'registered', 'not_applicable')),
  gi_certificate_number text,
  odop_status text,
  preservation_urgency text default 'medium' check (preservation_urgency in ('critical', 'high', 'medium', 'flourishing')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 8. Heritage Claims Table (Atomic claims with provenance & verification status)
create table if not exists public.heritage_claims (
  id uuid primary key default uuid_generate_v4(),
  heritage_profile_id uuid references public.heritage_profiles(id) on delete cascade,
  claim_text text not null,
  source_type text not null check (source_type in ('artisan', 'official', 'ai')),
  source_url text,
  source_reference text,
  verification_status text not null default 'unverified' check (verification_status in ('unverified', 'verified', 'rejected')),
  verified_by text,
  verified_at timestamptz,
  created_at timestamptz default now()
);

-- 9. Approvals Table (Mandatory audit log before publication)
create table if not exists public.approvals (
  id uuid primary key default uuid_generate_v4(),
  product_id uuid references public.products(id) on delete cascade,
  artisan_id uuid references public.artisans(id) on delete cascade,
  action text not null check (action in ('submitted_for_review', 'edited', 'approved', 'published', 'rejected')),
  approved_fields jsonb not null,
  notes text,
  created_at timestamptz default now()
);

-- Row Level Security (RLS) policies
alter table public.profiles enable row level security;
alter table public.artisans enable row level security;
alter table public.products enable row level security;
alter table public.product_media enable row level security;
alter table public.heritage_profiles enable row level security;
alter table public.heritage_claims enable row level security;
alter table public.approvals enable row level security;

-- Public read access for published products & categories
create policy "Anyone can read categories" on public.categories for select using (true);
create policy "Anyone can read published products" on public.products for select using (status = 'published');
create policy "Anyone can read heritage profiles of published products" on public.heritage_profiles for select
  using (exists (select 1 from public.products where products.id = heritage_profiles.product_id and products.status = 'published'));
create policy "Anyone can read claims for published products" on public.heritage_claims for select
  using (exists (
    select 1 from public.heritage_profiles hp
    join public.products p on p.id = hp.product_id
    where hp.id = heritage_claims.heritage_profile_id and p.status = 'published'
  ));

-- Artisan CRUD on own records
create policy "Artisans manage their own products" on public.products for all
  using (auth.uid() is not null);
