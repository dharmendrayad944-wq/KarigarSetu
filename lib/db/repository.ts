import { Product, ProductSchema, HeritageClaim } from "./schema";
import { INITIAL_PRODUCTS } from "./seed-data";

const STORAGE_KEY = "karigar_setu_products_v1";

// Server-side in-memory cache for API routes
let memoryProducts: Product[] = [...INITIAL_PRODUCTS];

export class ProductRepository {
  private static isBrowser(): boolean {
    return typeof window !== "undefined";
  }

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
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PRODUCTS));
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
    // Validate with Zod
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
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
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
        return { ...claim, ...updates };
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

    const updated: Product = {
      ...product,
      ...(editedFields || {}),
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

    const updated: Product = {
      ...product,
      status: "published",
      updated_at: new Date().toISOString(),
    };

    return this.saveProduct(updated);
  }

  static resetToSeed(): Product[] {
    if (this.isBrowser()) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PRODUCTS));
    }
    memoryProducts = [...INITIAL_PRODUCTS];
    return INITIAL_PRODUCTS;
  }
}
