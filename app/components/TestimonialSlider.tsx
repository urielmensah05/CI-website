// ==============================
// Composant Slider Témoignages
// ==============================
"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

export default function TestimonialSlider({ testimonials }: { testimonials: Testimonial[] }) {
  const [index, setIndex] = useState(0);
  const total = testimonials.length;

  const prev = () => setIndex((i) => (i === 0 ? total - 1 : i - 1));
  const next = () => setIndex((i) => (i === total - 1 ? 0 : i + 1));

  const t = testimonials[index];

  return (
    <div className="relative mt-8 bg-gray-50 rounded-2xl p-6 shadow-md overflow-hidden">
      {total > 1 && (
        <>
          <button onClick={prev} className="absolute -left-3 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-2 hover:bg-orange-50">
            <ChevronLeft size={18} />
          </button>
          <button onClick={next} className="absolute -right-3 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-2 hover:bg-orange-50">
            <ChevronRight size={18} />
          </button>
        </>
      )}

      <div className="flex gap-4 items-start">
        <Image src={t.image} alt={t.name} width={64} height={64} className="rounded-full object-cover border border-gray-200" />
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900">{t.name}</h4>
          <p className="text-xs text-gray-500 mb-2">{t.role}</p>
          <p className="text-sm text-gray-600 relative pr-6">
            {t.message}
            <Quote size={16} className="absolute right-0 top-0 text-orange-400 opacity-70" />
          </p>
        </div>
      </div>
    </div>
  );
}