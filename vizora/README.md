# Vizora ✨ — AI-Powered Product Photography

> Turn messy phone photos into professional, social-ready product shots in seconds.

**Track:** PS-02 — Generative Content Workflows  
**Hackathon:** Pixels to Products — Cloudinary AI Hackathon 2026

---

## 🎯 The Problem

Small business owners, thrift sellers on Depop/Poshmark, and home kitchen businesses lose sales because of unprofessional product photos. Hiring a photographer or renting a studio costs thousands and takes weeks — but customers judge products by their photos in milliseconds.

## 💡 The Solution

**Vizora** lets anyone upload a raw phone photo and instantly transform it into professional product photography. Our AI pipeline:

1. **Removes the background** automatically using Cloudinary AI
2. **Generates a new professional scene** based on user-selected vibes (marble studio, rustic wood, neon glow, fine dining, etc.)
3. **Auto-formats** the result into 3 social-media-ready sizes:
   - **Instagram Story** (9:16)
   - **Instagram Post** (1:1)
   - **Web Banner** (16:9)
4. **Optimizes delivery** with `f_auto` and `q_auto` for the fastest, highest-quality output

## ☁️ How We Use Cloudinary

Cloudinary is the **core engine** of Vizora — not just an image host, but the entire transformation pipeline:

| Feature | Cloudinary API Used |
|---------|-------------------|
| Image Upload | Upload API (`cloudinary.uploader.upload`) |
| Background Removal | `effect: "background_removal"` |
| AI Scene Generation | `effect: "gen_background_replace:prompt_..."` |
| Smart Resize & Crop | `crop: "fill"`, `gravity: "auto"` |
| Format Optimization | `fetch_format: "auto"`, `quality: "auto"` |
| URL-based Transforms | `cloudinary.url()` with chained transformations |

Every output image is a **Cloudinary URL** with chained transformations — no secondary storage or processing needed.

## 🛠️ Tech Stack

- **Frontend:** Next.js 14 (App Router) + React + TypeScript
- **Styling:** Tailwind CSS (dark/light theme)
- **Backend:** Next.js API Routes
- **AI/Media:** Cloudinary Node.js SDK
- **Icons:** Lucide React

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- A free [Cloudinary account](https://cloudinary.com/users/register_free)

### Setup

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/vizora.git
cd vizora

# 2. Install dependencies
npm install

# 3. Configure Cloudinary credentials
#    Copy .env.local and add your keys from https://console.cloudinary.com/settings/api-keys
cp .env.local.example .env.local
# Edit .env.local with your CLOUDINARY_CLOUD_NAME, API_KEY, and API_SECRET

# 4. Enable required Cloudinary add-ons (free tier):
#    - Go to Cloudinary Console → Settings → Add-ons
#    - Enable "Cloudinary AI Background Removal"
#    - Enable "AI Image Generation" (for gen_background_replace)

# 5. Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to use Vizora.

### How to Test

1. Upload any product photo (a shoe, shirt, food plate, etc.)
2. Select a niche: **Thrift** (clothing) or **Kitchen** (food)
3. Pick a vibe preset or type a custom background description
4. Click **✨ Transform** and wait ~10-30 seconds for AI generation
5. Download your pro shots in Story, Post, and Banner formats

## 📹 Demo Video

[Link to demo video — coming soon]

## 📋 Cloudinary Feedback Survey

Completed at: [cld.media/hackathon-survey](http://cld.media/hackathon-survey)

---

Built with ❤️ for the Cloudinary AI Hackathon 2026.
