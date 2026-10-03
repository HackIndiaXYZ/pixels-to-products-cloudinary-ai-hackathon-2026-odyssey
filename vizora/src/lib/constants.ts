// ── Shared types and constants (safe for client + server) ──────────────
// This file does NOT import the cloudinary SDK, so it can be used by
// client components without pulling in Node.js modules.

export type Niche = "thrift" | "kitchen";

export interface VibePreset {
  label: string;
  prompt: string;
  thumbnail: string;
}

export const VIBE_PRESETS: Record<Niche, VibePreset[]> = {
  thrift: [
    {
      label: "Marble Studio",
      prompt:
        "clean white marble surface with soft natural studio lighting and subtle shadows",
      thumbnail: "🤍",
    },
    {
      label: "Rustic Wood",
      prompt:
        "rustic dark wooden table with warm golden hour sunlight and vintage aesthetic",
      thumbnail: "🪵",
    },
    {
      label: "Neon Glow",
      prompt:
        "cyberpunk neon lit urban backdrop with purple and blue neon lights at night",
      thumbnail: "💜",
    },
  ],
  kitchen: [
    {
      label: "Fine Dining",
      prompt:
        "dark moody restaurant table with elegant plating soft candlelight and bokeh",
      thumbnail: "🕯️",
    },
    {
      label: "Bright & Fresh",
      prompt:
        "clean white marble countertop with fresh herbs morning sunlight and minimal styling",
      thumbnail: "☀️",
    },
    {
      label: "Street Food",
      prompt:
        "colorful vibrant food truck counter with neon signs at night street food market",
      thumbnail: "🌮",
    },
  ],
};

// ── Social media output formats ─────────────────────────────────────────
export interface SocialFormat {
  name: string;
  label: string;
  width: number;
  height: number;
}

export const SOCIAL_FORMATS: SocialFormat[] = [
  { name: "story", label: "Story 9:16", width: 1080, height: 1920 },
  { name: "post", label: "Post 1:1", width: 1080, height: 1080 },
  { name: "banner", label: "Banner 16:9", width: 1920, height: 1080 },
];
