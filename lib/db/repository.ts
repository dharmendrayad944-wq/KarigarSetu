import { Product, ProductSchema, HeritageClaim, NetworkEvent, NetworkEventSchema, PriceDecisionAudit, SourceRecord } from "./schema";
import { INITIAL_PRODUCTS, INITIAL_NETWORK_EVENTS } from "./seed-data";
import { validateFinalArtisanPrice } from "../pricing/price-validator";

const STORAGE_KEY = "karigar_setu_products_v1";
const STORAGE_KEY_EVENTS = "karigar_setu_network_events_v1";

// Server-side in-memory cache for API routes
let memoryProducts: Product[] = [...INITIAL_PRODUCTS];
let memoryNetworkEvents: NetworkEvent[] = [...INITIAL_NETWORK_EVENTS];

export class ProductRepository {
  private static isBrowser(): boolean {
    return typeof window !== "undefined";
  }

  // ============================================================================
  // PRODUCT PERSISTENCE & LIFECYCLE
  // ============================================================================
  static getProducts(): Product[] {
    if (this.isBrowser()) {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            return parsed;
          }
        }
      } catch (err) {
        console.warn("Failed to load products from localStorage", err);
      }
      // Initialize with seed data if empty
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PRODUCTS));
      } catch (err) {
        console.warn("Initial localStorage seed failed:", err);
      }
      return INITIAL_PRODUCTS;
    }
    return memoryProducts;
  }

  static getProductById(id: string): Product | null {
    const products = this.getProducts();
    const product = products.find((p) => p.id === id);
    return product || null;
  }

  static saveProduct(product: Product): Product {
    // Repository-level price enforcement for approved/published states (P0-2 Server Validation)
    if (product.status === "approved" || product.status === "published") {
      const validation = validateFinalArtisanPrice(product.final_price);
      if (!validation.isValid || !validation.sanitizedValue) {
        throw new Error(
          `Cannot save product with status '${product.status}': ${validation.error || "Valid final price required."}`
        );
      }
      product = {
        ...product,
        final_price: validation.sanitizedValue,
      };
    }

    // Validate with Zod schema
    const validated = ProductSchema.parse(product);
    
    if (this.isBrowser()) {
      const current = this.getProducts();
      const existingIdx = current.findIndex((p) => p.id === validated.id);
      let updated: Product[];
      if (existingIdx >= 0) {
        updated = [...current];
        updated[existingIdx] = validated;
      } else {
        updated = [validated, ...current];
      }
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (storageErr) {
        console.warn("Storage quota warning, continuing in memory:", storageErr);
      }
      memoryProducts = updated;
      return validated;
    } else {
      const existingIdx = memoryProducts.findIndex((p) => p.id === validated.id);
      if (existingIdx >= 0) {
        memoryProducts[existingIdx] = validated;
      } else {
        memoryProducts = [validated, ...memoryProducts];
      }
      return validated;
    }
  }

  static updateHeritageClaim(productId: string, claimId: string, updates: Partial<HeritageClaim>): Product | null {
    const product = this.getProductById(productId);
    const record = product?.heritage_record || product?.heritage_profile;
    if (!product || !record) return null;

    const claims = (record.claims || []).map((claim) => {
      if (claim.id === claimId) {
        const candidateUpdates = { ...updates };
        // Guardrail: An artisan claim or claim without authoritative source URL cannot become VERIFIED_SOURCE
        if (
          candidateUpdates.provenance_status === "VERIFIED_SOURCE" ||
          candidateUpdates.provenance_label === "Verified Source"
        ) {
          const effectiveSourceType = candidateUpdates.source_type || claim.source_type;
          const hasSourceMeta = Boolean(
            candidateUpdates.source_url ||
            claim.source_url ||
            candidateUpdates.source_record?.source_url ||
            claim.source_record?.source_url
          );
          if (effectiveSourceType === "artisan" || !hasSourceMeta) {
            if (effectiveSourceType === "artisan") {
              candidateUpdates.provenance_status = "ARTISAN_ATTESTED";
              candidateUpdates.provenance_label = "Artisan Attested";
            } else {
              candidateUpdates.provenance_status = "REQUIRES_VERIFICATION";
              candidateUpdates.provenance_label = "Requires Verification";
            }
          }
        }
        return { ...claim, ...candidateUpdates };
      }
      return claim;
    });

    const updatedRecord = {
      ...record,
      claims,
    };

    const updatedProduct: Product = {
      ...product,
      updated_at: new Date().toISOString(),
      heritage_record: updatedRecord,
      heritage_profile: updatedRecord,
    };

    return this.saveProduct(updatedProduct);
  }

  static approveProduct(productId: string, editedFields?: Partial<Product>): Product {
    const product = this.getProductById(productId);
    if (!product) {
      throw new Error(`Product with ID ${productId} not found`);
    }

    const candidatePrice =
      editedFields?.final_price !== undefined
        ? editedFields.final_price
        : (product.final_price ?? product.suggested_max_price ?? product.suggested_min_price);
    const validation = validateFinalArtisanPrice(candidatePrice);
    if (!validation.isValid || !validation.sanitizedValue) {
      throw new Error(
        `Cannot approve product: ${validation.error || "Please enter a valid price greater than ₹0."}`
      );
    }

    const updated: Product = {
      ...product,
      ...(editedFields || {}),
      final_price: validation.sanitizedValue,
      status: "approved",
      updated_at: new Date().toISOString(),
    };

    return this.saveProduct(updated);
  }

  static publishProduct(productId: string): Product {
    const product = this.getProductById(productId);
    if (!product) {
      throw new Error(`Product with ID ${productId} not found`);
    }

    if (product.status !== "approved") {
      throw new Error("Product cannot be published before explicit artisan approval!");
    }

    const validation = validateFinalArtisanPrice(product.final_price);
    if (!validation.isValid || !validation.sanitizedValue) {
      throw new Error(`Cannot publish product: ${validation.error || "Valid final price required."}`);
    }

    const updated: Product = {
      ...product,
      final_price: validation.sanitizedValue,
      status: "published",
      updated_at: new Date().toISOString(),
    };

    const saved = this.saveProduct(updated);

    // Register simulated network sync event
    try {
      this.addNetworkEvent({
        id: `ne-sync-${Date.now()}`,
        product_id: product.id,
        craft_name: product.craft_name,
        network: "ONDC",
        event_type: "catalog_sync",
        buyer_region: `${product.district}, ${product.state}`,
        message: `Artisan approved catalog record dispatched to local ONDC Beckn staging`,
        created_at: new Date().toISOString(),
        mode: "demo",
      });
    } catch (e) {
      console.warn("Failed to register network discovery event:", e);
    }

    return saved;
  }

  // ============================================================================
  // NETWORK EVENT MODEL (P0-3 Truthful Derived Inquiries)
  // ============================================================================
  static getNetworkEvents(): NetworkEvent[] {
    if (this.isBrowser()) {
      try {
        const stored = localStorage.getItem(STORAGE_KEY_EVENTS);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            return parsed;
          }
        }
      } catch (err) {
        console.warn("Failed to load network events from localStorage", err);
      }
      try {
        localStorage.setItem(STORAGE_KEY_EVENTS, JSON.stringify(INITIAL_NETWORK_EVENTS));
      } catch (err) {
        console.warn("Initial localStorage seed for events failed:", err);
      }
      return INITIAL_NETWORK_EVENTS;
    }
    return memoryNetworkEvents;
  }

  static addNetworkEvent(event: NetworkEvent): NetworkEvent {
    const validated = NetworkEventSchema.parse(event);
    if (this.isBrowser()) {
      const current = this.getNetworkEvents();
      const updated = [validated, ...current];
      try {
        localStorage.setItem(STORAGE_KEY_EVENTS, JSON.stringify(updated));
      } catch (storageErr) {
        console.warn("Storage quota warning for network events:", storageErr);
      }
      memoryNetworkEvents = updated;
      return validated;
    } else {
      memoryNetworkEvents = [validated, ...memoryNetworkEvents];
      return validated;
    }
  }

  static resetNetworkEvents(): NetworkEvent[] {
    if (this.isBrowser()) {
      try {
        localStorage.setItem(STORAGE_KEY_EVENTS, JSON.stringify(INITIAL_NETWORK_EVENTS));
      } catch (err) {
        console.warn("Reset network events storage failed:", err);
      }
    }
    memoryNetworkEvents = [...INITIAL_NETWORK_EVENTS];
    return INITIAL_NETWORK_EVENTS;
  }

  static resetToSeed(): Product[] {
    if (this.isBrowser()) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PRODUCTS));
      } catch (err) {
        console.warn("Reset products storage failed:", err);
      }
    }
    memoryProducts = [...INITIAL_PRODUCTS];
    this.resetNetworkEvents();
    return INITIAL_PRODUCTS;
  }
}

export const Repository = ProductRepository;

