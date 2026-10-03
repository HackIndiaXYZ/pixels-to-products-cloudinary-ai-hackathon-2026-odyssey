"use client";

import { useEffect, useState } from "react";
import { Download, Loader2 } from "lucide-react";

interface OutputItem {
  name: string;
  label: string;
  width: number;
  height: number;
  url: string;
}

interface ResultsGalleryProps {
  outputs: OutputItem[];
  isGenerating: boolean;
}

// Polls a Cloudinary URL until the derivative image is ready (HTTP 200).
// Cloudinary's GenAI transformations return HTTP 423 while processing.
async function pollImage(
  url: string,
  maxRetries = 30,
  delayMs = 3000
): Promise<string> {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const res = await fetch(url, { method: "GET", mode: "cors" });
      if (res.ok) return url;
      if (res.status === 423 || res.status === 404) {
        await new Promise((r) => setTimeout(r, delayMs));
        continue;
      }
      // For other errors, still retry a few times
      await new Promise((r) => setTimeout(r, delayMs));
    } catch {
      await new Promise((r) => setTimeout(r, delayMs));
    }
  }
  throw new Error("Timed out waiting for image generation");
}

function ResultCard({ output }: { output: OutputItem }) {
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setReady(false);
    setError(null);

    pollImage(output.url)
      .then(() => setReady(true))
      .catch((err) => setError(err.message));
  }, [output.url]);

  // Determine aspect ratio class based on format
  const aspectClass =
    output.name === "story"
      ? "aspect-[9/16] max-h-[400px]"
      : output.name === "post"
      ? "aspect-square max-h-[300px]"
      : "aspect-video max-h-[220px]";

  async function handleDownload() {
    try {
      const res = await fetch(output.url);
      const blob = await res.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `vizora-${output.name}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    } catch {
      // Fallback: open in new tab
      window.open(output.url, "_blank");
    }
  }

  return (
    <div
      className={`flex flex-col bg-white dark:bg-zinc-900 rounded-2xl border overflow-hidden
                  transition-all duration-500
                  ${
                    ready
                      ? "border-violet-500/30 shadow-lg shadow-violet-500/10"
                      : "border-gray-200 dark:border-zinc-700"
                  }`}
    >
      {/* Label */}
      <div className="px-4 pt-3 pb-2">
        <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
          {output.label}
        </span>
      </div>

      {/* Image area */}
      <div className={`${aspectClass} w-full bg-gray-50 dark:bg-zinc-800 relative overflow-hidden`}>
        {error ? (
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <p className="text-xs text-red-500 text-center">{error}</p>
          </div>
        ) : !ready ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-6 h-6 text-violet-500 animate-spin" />
            <p className="text-xs text-zinc-400">AI is generating...</p>
          </div>
        ) : (
          <img
            src={output.url}
            alt={output.label}
            className="w-full h-full object-cover animate-in fade-in duration-500"
          />
        )}
      </div>

      {/* Download button */}
      <div className="p-3">
        <button
          onClick={handleDownload}
          disabled={!ready}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl
                     text-sm font-medium transition-all
                     disabled:opacity-40 disabled:cursor-not-allowed
                     bg-gray-100 dark:bg-zinc-800
                     hover:bg-violet-600 hover:text-white
                     text-zinc-700 dark:text-zinc-300"
        >
          <Download className="w-4 h-4" />
          Download
        </button>
      </div>
    </div>
  );
}

export default function ResultsGallery({
  outputs,
  isGenerating,
}: ResultsGalleryProps) {
  if (outputs.length === 0 && !isGenerating) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center">
        <div className="text-6xl mb-4">🎨</div>
        <h3 className="text-lg font-semibold text-zinc-700 dark:text-zinc-300">
          Your pro shots will appear here
        </h3>
        <p className="text-sm text-zinc-400 dark:text-zinc-500 mt-1 max-w-[280px]">
          Upload a photo, pick a vibe, and hit Transform to see the magic
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-5">
        Your Pro Shots ✨
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {isGenerating && outputs.length === 0
          ? // Show skeleton cards while waiting for API response
            Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-700 overflow-hidden"
              >
                <div className="p-4">
                  <div className="h-4 w-20 bg-gray-200 dark:bg-zinc-700 rounded animate-pulse" />
                </div>
                <div className="aspect-square bg-gray-100 dark:bg-zinc-800 animate-pulse" />
                <div className="p-3">
                  <div className="h-10 bg-gray-200 dark:bg-zinc-700 rounded-xl animate-pulse" />
                </div>
              </div>
            ))
          : outputs.map((output) => (
              <ResultCard key={output.name} output={output} />
            ))}
      </div>
    </div>
  );
}
