import { INITIAL_PRODUCTS } from "@/lib/db/seed-data";
import { Product } from "@/lib/db/schema";

/**
 * Shared deterministic source of truth for initial SSR and first client renders.
 * Guaranteed to be free of browser APIs, Math.random(), and dynamic Date.now().
 */
export const DEMO_PRODUCTS: Product[] = INITIAL_PRODUCTS;
