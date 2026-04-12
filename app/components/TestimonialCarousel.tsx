"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

type Testimonial = {
  name: string;
  role: string;
  message: string;
  image: string;
};

export default function TestimonialCarousel({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const [index, setIndex] = useState(0);
  const total = testimonials.length;

  const prev = () => setIndex((i) => (i === 0 ? total - 1 : i - 1));
  const next = () => setIndex((i) => (i === total - 1 ? 0 : i + 1));

  const t = testimonials[index];

  return (
    <div className="relative bg-gray-50 rounded-2xl border border-gray-100 p-4 mt-6">
      
      {/* Boutons */}
      {total > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute -left-3 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-2 hover:bg-orange-50"
          >
            <ChevronLeft size={18} />
          </button>

          <button
            onClick={next}
            className="absolute -right-3 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-2 hover:bg-orange-50"
          >
            <ChevronRight size={18} />
          </button>
        </>
      )}

      {/* Contenu */}
      <div className="flex gap-4 items-start">
        {/* Photo */}
        <img
          src={t.image}
          alt={t.name}
          className="w-14 h-14 rounded-full object-cover border border-gray-200"
        />

        {/* Texte */}
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900 text-sm">
            {t.name}
          </h4>
          <p className="text-xs text-gray-500 mb-2">
            {t.role}
          </p>

          <p className="text-xs text-gray-600 leading-relaxed relative pr-6">
            {t.message}
            <Quote
              size={16}
              className="absolute right-0 top-0 text-orange-400 opacity-70"
            />
          </p>
        </div>
      </div>
    </div>
  );
}
