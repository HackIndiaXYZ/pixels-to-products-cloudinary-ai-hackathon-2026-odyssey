"use client";

import { VIBE_PRESETS, type Niche, type VibePreset } from "@/lib/constants";

interface VibeSelectorProps {
  niche: Niche;
  selectedPreset: number | null;
  customPrompt: string;
  onSelectPreset: (index: number) => void;
  onCustomPromptChange: (value: string) => void;
}

export default function VibeSelector({
  niche,
  selectedPreset,
  customPrompt,
  onSelectPreset,
  onCustomPromptChange,
}: VibeSelectorProps) {
  const presets: VibePreset[] = VIBE_PRESETS[niche];

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
        Choose your vibe
      </label>

      {/* Preset cards */}
      <div className="grid grid-cols-3 gap-3">
        {presets.map((preset, i) => (
          <button
            key={`${niche}-${i}`}
            onClick={() => {
              onSelectPreset(i);
              onCustomPromptChange(""); // clear custom when preset is chosen
            }}
            className={`flex flex-col items-center p-3 rounded-xl border transition-all duration-200
              ${
                selectedPreset === i && !customPrompt
                  ? "border-violet-500 ring-2 ring-violet-500 bg-violet-500/5 dark:bg-violet-500/10"
                  : "border-gray-200 dark:border-zinc-700 hover:border-violet-300 dark:hover:border-violet-600"
              }`}
          >
            <span className="text-2xl mb-1.5">{preset.thumbnail}</span>
            <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300 text-center leading-tight">
              {preset.label}
            </span>
          </button>
        ))}
      </div>

      {/* Custom prompt input */}
      <input
        type="text"
        value={customPrompt}
        onChange={(e) => {
          onCustomPromptChange(e.target.value);
        }}
        placeholder="Or type your own vibe..."
        className="w-full px-4 py-3 rounded-xl text-sm
                   bg-gray-50 dark:bg-zinc-800
                   border border-gray-200 dark:border-zinc-700
                   text-zinc-800 dark:text-zinc-200
                   placeholder:text-zinc-400 dark:placeholder:text-zinc-500
                   focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent
                   transition-all"
      />
    </div>
  );
}
