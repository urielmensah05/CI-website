'use client';
// ============================================================
// components/admin/ImageUploader.tsx
// Zone d'upload d'image avec Drag & Drop, aperçu, et suppression
// ============================================================
import React, { useRef, useState } from 'react';
import { UploadCloud, X, RefreshCw } from 'lucide-react';

interface ImageUploaderProps {
  currentImageUrl?: string | null;
  onFileSelected: (file: File | null) => void;
  label?: string;
  accept?: string;
}

export default function ImageUploader({
  currentImageUrl,
  onFileSelected,
  label = 'image',
  accept = 'image/*',
}: ImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(currentImageUrl || null);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File | null) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Veuillez sélectionner un fichier image (JPG, PNG, WEBP, SVG).');
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
    onFileSelected(file);
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview(null);
    onFileSelected(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div className="w-full">
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0] || null)}
      />

      {preview ? (
        // ── Aperçu de l'image sélectionnée ──────────────────
        <div className="relative group w-full h-48 rounded-xl overflow-hidden border border-zinc-700 bg-zinc-900">
          <img
            src={preview}
            alt="Aperçu"
            className="w-full h-full object-cover"
          />
          {/* Overlay avec actions */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-400 text-black text-xs font-bold rounded-lg shadow hover:bg-amber-300 transition"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Changer
            </button>
            <button
              type="button"
              onClick={handleRemove}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600 text-white text-xs font-bold rounded-lg shadow hover:bg-red-700 transition"
            >
              <X className="w-3.5 h-3.5" />
              Supprimer
            </button>
          </div>
        </div>
      ) : (
        // ── Zone de dépôt ─────────────────────────────────────
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`w-full h-44 rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-2 p-4 cursor-pointer transition-all duration-200 ${
            isDragging
              ? 'border-amber-400 bg-amber-400/5 scale-[1.02]'
              : 'border-zinc-700 hover:border-zinc-500 bg-zinc-900/40'
          }`}
        >
          <UploadCloud
            className={`w-10 h-10 transition-colors ${isDragging ? 'text-amber-400' : 'text-zinc-600'}`}
          />
          <div className="text-center">
            <p className="text-sm font-medium text-zinc-300">
              Glissez une {label} ici ou{' '}
              <span className="text-amber-400 underline underline-offset-2">cliquez pour choisir</span>
            </p>
            <p className="text-xs text-zinc-600 mt-1">PNG, JPG, WEBP, SVG — Max 5 Mo</p>
          </div>
        </div>
      )}
    </div>
  );
}
