/**
 * Storage Abstraction for Artisan Media & Craft Images
 * 
 * Provides an interface that works with client-side compressed data URLs/IndexedDB now,
 * and seamlessly swaps to Supabase Storage (or any cloud object store) in production.
 */

export interface IImageStorageService {
  uploadImage(
    fileOrDataUrl: File | string,
    metadata?: { productId?: string; craftName?: string }
  ): Promise<{ url: string; storageType: "local_compressed" | "supabase" | "memory" }>;
  
  deleteImage(url: string): Promise<boolean>;
}

/**
 * Local / Client-Side Implementation
 * Stores preprocessed lightweight data URLs directly while guarding against quota overflow.
 */
export class LocalImageStorageService implements IImageStorageService {
  async uploadImage(
    fileOrDataUrl: File | string,
    _metadata?: { productId?: string; craftName?: string }
  ): Promise<{ url: string; storageType: "local_compressed" | "supabase" | "memory" }> {
    if (typeof fileOrDataUrl === "string") {
      return {
        url: fileOrDataUrl,
        storageType: "local_compressed",
      };
    }

    // Dynamic import of preprocessor if File is provided
    const { preprocessArtisanImage } = await import("@/lib/utils/image-processor");
    const processed = await preprocessArtisanImage(fileOrDataUrl);

    return {
      url: processed.dataUrl,
      storageType: "local_compressed",
    };
  }

  async deleteImage(_url: string): Promise<boolean> {
    // In-memory / local storage cleanup
    return true;
  }
}

/**
 * Production-Ready Supabase Storage Implementation Stub
 * Future-compatible: activates automatically when NEXT_PUBLIC_SUPABASE_URL is configured.
 */
export class SupabaseImageStorageService implements IImageStorageService {
  private bucketName = "craft-images";

  async uploadImage(
    fileOrDataUrl: File | string,
    metadata?: { productId?: string; craftName?: string }
  ): Promise<{ url: string; storageType: "local_compressed" | "supabase" | "memory" }> {
    const isSupabaseConfigured =
      typeof process !== "undefined" &&
      process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!isSupabaseConfigured) {
      // Graceful fallback to LocalImageStorageService
      const fallback = new LocalImageStorageService();
      return fallback.uploadImage(fileOrDataUrl, metadata);
    }

    // When Supabase is configured, uploads directly to the 'craft-images' bucket
    const { supabase } = await import("@/lib/supabase/client");
    if (!supabase) {
      const fallback = new LocalImageStorageService();
      return fallback.uploadImage(fileOrDataUrl, metadata);
    }

    const fileName = `${metadata?.productId || "craft"}-${Date.now()}.jpg`;
    const filePath = `uploads/${fileName}`;

    let blob: Blob;
    if (typeof fileOrDataUrl === "string") {
      const res = await fetch(fileOrDataUrl);
      blob = await res.blob();
    } else {
      blob = fileOrDataUrl;
    }

    const { data, error } = await supabase.storage
      .from(this.bucketName)
      .upload(filePath, blob, {
        contentType: "image/jpeg",
        upsert: true,
      });

    if (error || !data) {
      console.warn("Supabase storage upload failed, falling back locally:", error);
      const fallback = new LocalImageStorageService();
      return fallback.uploadImage(fileOrDataUrl, metadata);
    }

    const { data: publicData } = supabase.storage
      .from(this.bucketName)
      .getPublicUrl(data.path);

    return {
      url: publicData.publicUrl,
      storageType: "supabase",
    };
  }

  async deleteImage(url: string): Promise<boolean> {
    try {
      const { supabase } = await import("@/lib/supabase/client");
      if (!supabase) return true;
      const parts = url.split("/");
      const path = parts.slice(parts.indexOf(this.bucketName) + 1).join("/");
      await supabase.storage.from(this.bucketName).remove([path]);
      return true;
    } catch {
      return false;
    }
  }
}

let imageStorageInstance: IImageStorageService | null = null;

export function getImageStorageService(): IImageStorageService {
  if (!imageStorageInstance) {
    const isSupabaseConfigured =
      typeof process !== "undefined" &&
      Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

    if (isSupabaseConfigured) {
      imageStorageInstance = new SupabaseImageStorageService();
    } else {
      imageStorageInstance = new LocalImageStorageService();
    }
  }
  return imageStorageInstance;
}
