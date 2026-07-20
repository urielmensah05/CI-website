// ==============================
// components/ServiceCard.tsx — même style que les cartes équipe
// ==============================
import Image from "next/image";
import React from "react";

type Props = {
  title: string;
  description: string;
  image?: string;
  children?: React.ReactNode;
};

export default function ServiceCard({
  title,
  description,
  image,
  children,
}: Props) {
  return (
    <div className="group relative bg-white rounded-3xl border border-gray-100 shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden">

      {/* Image — même hauteur & animation que les cartes équipe */}
      {image && (
        <div className="relative h-80 w-full overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Gradient overlay au hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      )}

      {/* Contenu */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
          {title}
        </h3>
        <p className="text-sm text-gray-500 leading-relaxed mb-4">
          {description}
        </p>

        {/* Liste, témoignages, etc. */}
        {children}
      </div>

      {/* Ring orange au hover — même que les cartes équipe */}
      <div className="absolute inset-0 rounded-3xl ring-1 ring-transparent group-hover:ring-orange-200 pointer-events-none transition" />
    </div>
  );
}