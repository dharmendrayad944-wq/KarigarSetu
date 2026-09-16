/**
 * Client-Side Image Preprocessing & Compression Engine
 * Specifically engineered for SIH26090 to prevent QuotaExceededError on high-res smartphone camera photos.
 * 
 * Target specification:
 * - Max dimension: ~1024x1024 (preserving exact aspect ratio)
 * - Format: JPEG
 * - Quality: 0.75 (balanced for high-fidelity craft details and small footprint)
 * - Output payload: Typically 70KB - 200KB (well below 300KB ceiling)
 * - Handles: JPEG, PNG, WebP, camera uploads with EXIF orientation
 */

export interface ProcessedImageResult {
  dataUrl: string;
  width: number;
  height: number;
  originalSizeBytes: number;
  compressedSizeBytes: number;
  mimeType: string;
}

export interface ImageProcessingOptions {
  maxDimension?: number;
  quality?: number;
  targetMimeType?: string;
}

const SUPPORTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/bmp",
  "image/heic",
  "image/heif",
];

export async function preprocessArtisanImage(
  file: File,
  options?: ImageProcessingOptions
): Promise<ProcessedImageResult> {
  const maxDim = options?.maxDimension || 1024;
  const quality = options?.quality ?? 0.75;
  const targetMimeType = options?.targetMimeType || "image/jpeg";

  // 1. Validation: File existence & type
  if (!file) {
    throw new Error("No image file was provided for processing.");
  }

  const isTypeSupported =
    SUPPORTED_IMAGE_TYPES.includes(file.type.toLowerCase()) ||
    /\.(jpg|jpeg|png|webp|bmp|heic|heif)$/i.test(file.name);

  if (!isTypeSupported && file.type !== "") {
    throw new Error(
      "Unsupported file format. Please upload a standard photograph (JPG, PNG, or WebP)."
    );
  }

  // 2. Validation: Sanity check file size (e.g. Reject > 35MB to prevent browser freezing)
  if (file.size > 35 * 1024 * 1024) {
    throw new Error("Photo size is too large (exceeds 35MB). Please choose a smaller file.");
  }

  // 3. Decode & Orient with createImageBitmap (handles EXIF orientation automatically in modern browsers)
  let imageSource: ImageBitmap | HTMLImageElement;
  let sourceWidth = 0;
  let sourceHeight = 0;

  try {
    if (typeof window !== "undefined" && "createImageBitmap" in window) {
      try {
        // createImageBitmap with imageOrientation: 'from-image' respects EXIF camera rotation
        imageSource = await createImageBitmap(file, {
          imageOrientation: "from-image",
        });
        sourceWidth = imageSource.width;
        sourceHeight = imageSource.height;
      } catch {
        // Fallback to HTMLImageElement if createImageBitmap fails on specific format
        imageSource = await loadHtmlImageFromFile(file);
        sourceWidth = imageSource.width;
        sourceHeight = imageSource.height;
      }
    } else {
      imageSource = await loadHtmlImageFromFile(file);
      sourceWidth = imageSource.width;
      sourceHeight = imageSource.height;
    }
  } catch (err: any) {
    throw new Error(
      "The selected image appears to be corrupted or cannot be decoded. Please select another photo."
    );
  }

  if (sourceWidth === 0 || sourceHeight === 0) {
    throw new Error("Invalid image dimensions detected. Please select a valid photo.");
  }

  // 4. Calculate target dimensions preserving exact aspect ratio
  let targetWidth = sourceWidth;
  let targetHeight = sourceHeight;

  if (sourceWidth > maxDim || sourceHeight > maxDim) {
    if (sourceWidth >= sourceHeight) {
      targetWidth = maxDim;
      targetHeight = Math.max(1, Math.round((sourceHeight * maxDim) / sourceWidth));
    } else {
      targetHeight = maxDim;
      targetWidth = Math.max(1, Math.round((sourceWidth * maxDim) / sourceHeight));
    }
  }

  // 5. Draw to in-memory Canvas
  const canvas = document.createElement("canvas");
  canvas.width = targetWidth;
  canvas.height = targetHeight;

  const ctx = canvas.getContext("2d", { alpha: false });
  if (!ctx) {
    throw new Error("Failed to initialize canvas rendering context for image processing.");
  }

  // Fill white background in case source is transparent PNG
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, targetWidth, targetHeight);

  // Enable high-quality bilinear image smoothing
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  // Draw scaled image
  ctx.drawImage(imageSource, 0, 0, targetWidth, targetHeight);

  // 6. Export compressed JPEG
  let compressedDataUrl = canvas.toDataURL(targetMimeType, quality);

  // Estimate base64 byte size: base64 length * (3/4)
  let estimatedBytes = Math.round((compressedDataUrl.length * 3) / 4);

  // Safety buffer: If still > 350KB (rare, only with ultra-high entropy noise), do a second pass at lower quality
  if (estimatedBytes > 350 * 1024) {
    compressedDataUrl = canvas.toDataURL(targetMimeType, 0.65);
    estimatedBytes = Math.round((compressedDataUrl.length * 3) / 4);
  }

  // Clean up ImageBitmap if applicable
  if ("close" in imageSource && typeof (imageSource as ImageBitmap).close === "function") {
    (imageSource as ImageBitmap).close();
  }

  return {
    dataUrl: compressedDataUrl,
    width: targetWidth,
    height: targetHeight,
    originalSizeBytes: file.size,
    compressedSizeBytes: estimatedBytes,
    mimeType: targetMimeType,
  };
}

/**
 * Fallback image loader using standard HTMLImageElement
 */
function loadHtmlImageFromFile(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file);
    const img = new Image();

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(img);
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("HTMLImageElement failed to load file"));
    };

    img.src = objectUrl;
  });
}
