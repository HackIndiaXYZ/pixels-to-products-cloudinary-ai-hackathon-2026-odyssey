"use client";

import { useCallback, useState, useRef } from "react";
import { Upload, X } from "lucide-react";

interface UploadZoneProps {
  image: string | null;
  onImageChange: (dataUrl: string | null) => void;
}

export default function UploadZone({ image, onImageChange }: UploadZoneProps) {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    (file: File) => {
      if (!file.type.startsWith("image/")) return;
      const reader = new FileReader();
      reader.onload = (e) => onImageChange(e.target?.result as string);
      reader.readAsDataURL(file);
    },
    [onImageChange]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragActive(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  if (image) {
    return (
      <div className="relative rounded-2xl overflow-hidden border border-gray-200 dark:border-zinc-700">
        <img
          src={image}
          alt="Uploaded preview"
          className="w-full h-auto max-h-[280px] object-contain bg-gray-50 dark:bg-zinc-900"
        />
        <button
          onClick={() => onImageChange(null)}
          className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center
                     rounded-full bg-black/60 text-white hover:bg-red-500 transition-colors"
          aria-label="Remove image"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => {
        e.preventDefault();
        setDragActive(true);
      }}
      onDragLeave={() => setDragActive(false)}
      onDrop={handleDrop}
      className={`flex flex-col items-center justify-center min-h-[200px] rounded-2xl
                  border-2 border-dashed cursor-pointer transition-all duration-200
                  ${
                    dragActive
                      ? "border-violet-500 bg-violet-500/5"
                      : "border-gray-300 dark:border-zinc-700 hover:border-violet-400 hover:bg-violet-500/5"
                  }`}
    >
      <Upload
        className={`w-10 h-10 mb-3 transition-colors ${
          dragActive
            ? "text-violet-500"
            : "text-gray-400 dark:text-zinc-500"
        }`}
      />
      <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
        Drop your photo here
      </p>
      <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">
        or click to browse
      </p>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleInputChange}
        className="hidden"
      />
    </div>
  );
}
