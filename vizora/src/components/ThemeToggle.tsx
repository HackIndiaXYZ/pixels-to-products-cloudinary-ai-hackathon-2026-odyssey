"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("vizora-theme");
    if (saved === "dark") {
      setDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("vizora-theme", next ? "dark" : "light");
  }

  if (!mounted) return <div className="w-9 h-9" />; // Prevent hydration mismatch

  return (
    <button
      onClick={toggle}
      className="w-9 h-9 flex items-center justify-center rounded-full
                 bg-gray-100 dark:bg-zinc-800
                 hover:bg-gray-200 dark:hover:bg-zinc-700
                 transition-all duration-300"
      aria-label="Toggle theme"
    >
      {dark ? (
        <Sun className="w-4 h-4 text-yellow-400 transition-transform duration-300 rotate-0" />
      ) : (
        <Moon className="w-4 h-4 text-zinc-600 transition-transform duration-300 rotate-0" />
      )}
    </button>
  );
}
