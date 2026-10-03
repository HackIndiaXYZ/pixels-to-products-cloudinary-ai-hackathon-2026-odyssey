"use client";

import { useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import type { Niche } from "@/lib/constants";
import { VIBE_PRESETS } from "@/lib/constants";
import NichePicker from "@/components/NichePicker";
import UploadZone from "@/components/UploadZone";
import VibeSelector from "@/components/VibeSelector";
import ResultsGallery from "@/components/ResultsGallery";
import ThemeToggle from "@/components/ThemeToggle";

interface OutputItem {
  name: string;
  label: string;
  width: number;
  height: number;
  url: string;
}

export default function Home() {
  // State
  const [niche, setNiche] = useState<Niche>("thrift");
  const [image, setImage] = useState<string | null>(null);
  const [selectedPreset, setSelectedPreset] = useState<number | null>(0);
  const [customPrompt, setCustomPrompt] = useState("");
  const [outputs, setOutputs] = useState<OutputItem[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get the final prompt to send
  function getPrompt(): string {
    if (customPrompt.trim()) return customPrompt.trim();
    if (selectedPreset !== null) return VIBE_PRESETS[niche][selectedPreset]?.prompt ?? "";
    return "";
  }

  const prompt = getPrompt();
  const canGenerate = !!image && !!prompt && !isGenerating;

  async function handleGenerate() {
    if (!canGenerate) return;

    setIsGenerating(true);
    setError(null);
    setOutputs([]);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image, prompt }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to generate images");
      }

      const data = await res.json();
      setOutputs(data.outputs);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      setError(message);
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#fafaf8] dark:bg-[#09090b] transition-colors duration-300">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-[#09090b]/80 backdrop-blur-md border-b border-gray-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <h1 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-white">
            Vizora<span className="text-violet-500">✨</span>
          </h1>
          <ThemeToggle />
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-8">
          {/* Left: Controls Panel */}
          <div className="space-y-5">
            <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 p-5 shadow-sm space-y-5">
              {/* Niche Toggle */}
              <NichePicker
                value={niche}
                onChange={(n) => {
                  setNiche(n);
                  setSelectedPreset(0);
                  setCustomPrompt("");
                }}
              />

              {/* Upload Zone */}
              <UploadZone image={image} onImageChange={setImage} />

              {/* Vibe Selector */}
              <VibeSelector
                niche={niche}
                selectedPreset={selectedPreset}
                customPrompt={customPrompt}
                onSelectPreset={setSelectedPreset}
                onCustomPromptChange={setCustomPrompt}
              />

              {/* Error message */}
              {error && (
                <div className="p-3 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20">
                  <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                </div>
              )}

              {/* Transform Button */}
              <button
                onClick={handleGenerate}
                disabled={!canGenerate}
                className="w-full py-3.5 rounded-xl text-white font-semibold text-base
                           bg-gradient-to-r from-violet-600 to-indigo-600
                           hover:from-violet-500 hover:to-indigo-500
                           hover:scale-[1.02] hover:shadow-lg hover:shadow-violet-500/25
                           active:scale-[0.98]
                           disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none
                           transition-all duration-200
                           flex items-center justify-center gap-2"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Transform
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right: Results Gallery */}
          <div>
            <ResultsGallery outputs={outputs} isGenerating={isGenerating} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-6">
        <p className="text-xs text-zinc-400 dark:text-zinc-500">
          Powered by Cloudinary AI
        </p>
      </footer>
    </div>
  );
}
