// ── Server-only Cloudinary SDK configuration ────────────────────────
// This file imports the Node.js cloudinary SDK and should ONLY be
// imported by server components / API routes — never by client components.

import { v2 as cloudinary } from "cloudinary";
import { type SocialFormat } from "./constants";

// Re-export constants so API routes can import everything from one place
export { SOCIAL_FORMATS } from "./constants";
export type { Niche, VibePreset, SocialFormat } from "./constants";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;

/**
 * Build a full pipeline transformation URL:
 * 1. Remove background
 * 2. Generate new background from prompt
 * 3. Resize & crop for social format
 * 4. Optional watermark overlay
 * 5. Auto quality + format
 */
export function buildPipelineUrl(
  publicId: string,
  prompt: string,
  format: SocialFormat,
  watermarkPublicId?: string
): string {
  const promptSlug = prompt.replace(/\s+/g, "_");

  const transformations: Record<string, unknown>[] = [
    { effect: "background_removal" },
    { effect: `gen_background_replace:prompt_${promptSlug}` },
    {
      width: format.width,
      height: format.height,
      crop: "fill",
      gravity: "auto",
    },
  ];

  if (watermarkPublicId) {
    transformations.push({
      overlay: watermarkPublicId,
      width: 120,
      gravity: "south_east",
      x: 20,
      y: 20,
      opacity: 60,
    });
  }

  transformations.push({ fetch_format: "auto", quality: "auto" });

  return cloudinary.url(publicId, { transformation: transformations });
}
