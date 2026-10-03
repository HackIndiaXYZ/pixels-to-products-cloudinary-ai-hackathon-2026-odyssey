"use client";

import type { Niche } from "@/lib/constants";

interface NichePickerProps {
  value: Niche;
  onChange: (niche: Niche) => void;
}

const NICHES: { key: Niche; label: string; emoji: string }[] = [
  { key: "thrift", label: "Thrift", emoji: "🛍️" },
  { key: "kitchen", label: "Kitchen", emoji: "🍔" },
];

export default function NichePicker({ value, onChange }: NichePickerProps) {
  return (
    <div className="flex bg-gray-100 dark:bg-zinc-800 rounded-xl p-1">
      {NICHES.map((n) => (
        <button
          key={n.key}
          onClick={() => onChange(n.key)}
          className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all duration-300
            ${
              value === n.key
                ? "bg-violet-600 text-white shadow-md shadow-violet-500/20"
                : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200"
            }`}
        >
          <span className="mr-1.5">{n.emoji}</span>
          {n.label}
        </button>
      ))}
    </div>
  );
}
