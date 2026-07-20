"use client";

import PartenairesCarousel from "@/app/components/PartenairesCarousel";


export default function PartenairesPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-20 px-6">

      {/* HEADER */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
          Nos Partenaires
        </h1>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          Découvrez les experts et collaborateurs qui participent à l'évolution de Central Innovation Plus.
        </p>
      </div>

      {/* CAROUSEL */}
      <PartenairesCarousel />

    </div>
  );
}