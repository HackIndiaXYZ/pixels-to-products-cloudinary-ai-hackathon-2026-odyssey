import { NextRequest, NextResponse } from "next/server";
import cloudinary, {
  buildPipelineUrl,
  SOCIAL_FORMATS,
} from "@/lib/cloudinary";

export const maxDuration = 60; // Allow up to 60s for Cloudinary upload

export async function POST(req: NextRequest) {
  try {
    const { image, prompt } = await req.json();

    if (!image || !prompt) {
      return NextResponse.json(
        { error: "Missing image or prompt" },
        { status: 400 }
      );
    }

    // 1. Upload the raw image to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(image, {
      folder: "vizora",
      resource_type: "image",
    });

    const publicId = uploadResult.public_id;

    // 2. Build transformation URLs for each social format
    const outputs = SOCIAL_FORMATS.map((fmt) => ({
      name: fmt.name,
      label: fmt.label,
      width: fmt.width,
      height: fmt.height,
      url: buildPipelineUrl(publicId, prompt, fmt),
    }));

    return NextResponse.json({
      success: true,
      publicId,
      originalUrl: uploadResult.secure_url,
      outputs,
    });
  } catch (error: unknown) {
    console.error("[Vizora API] Generation error:", error);
    const message =
      error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
