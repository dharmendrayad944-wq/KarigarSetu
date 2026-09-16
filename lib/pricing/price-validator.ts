/**
 * Robust Validation Rules for Artisan Final Selling Price (P0-2)
 * 
 * Rules enforced:
 * - Must be a finite number
 * - Must be strictly greater than 0
 * - Must be within sensible bounds (max 1 Crore / 10,000,000 INR)
 * - Empty, NaN, Infinity, Zero, and Negative values are invalid
 */

export interface PriceValidationResult {
  isValid: boolean;
  error: string | null;
  sanitizedValue?: number;
}

export function validateFinalArtisanPrice(raw: any): PriceValidationResult {
  if (raw === null || raw === undefined || raw === "") {
    return {
      isValid: false,
      error: "Please enter a valid price.",
    };
  }

  // Handle strings like "abc", whitespace
  const trimmed = typeof raw === "string" ? raw.trim() : raw;
  if (trimmed === "") {
    return {
      isValid: false,
      error: "Please enter a valid price.",
    };
  }

  let cleaned = trimmed;
  if (typeof cleaned === "string") {
    cleaned = cleaned.replace(/[₹,\s]|rs\.?/gi, "");
  }

  const num = typeof cleaned === "number" ? cleaned : Number(cleaned);

  if (isNaN(num)) {
    return {
      isValid: false,
      error: "Please enter a valid numeric price.",
    };
  }

  if (!isFinite(num)) {
    return {
      isValid: false,
      error: "Price must be a finite number.",
    };
  }

  if (num <= 0) {
    return {
      isValid: false,
      error: "Enter a price greater than ₹0.",
    };
  }

  if (num > 10_000_000) {
    return {
      isValid: false,
      error: "Price cannot exceed ₹1,00,00,000 (1 Crore).",
    };
  }

  return {
    isValid: true,
    error: null,
    sanitizedValue: Math.round(num),
  };
}
