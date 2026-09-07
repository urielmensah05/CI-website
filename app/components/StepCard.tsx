import React from "react";
import Link from "next/link";
import TestimonialCarousel from "./TestimonialCarousel";

type Testimonial = {
  name: string;
  role: string;
  message: string;
  image: string;
};

type StepCardProps = {
  number: number;
  title: string;
  description: string;
  Icon: React.ElementType;
  testimonials?: Testimonial[];
  link?: string;
};

export default function StepCard({
  number,
  title,
  description,
  Icon,
  testimonials,
  link,
}: StepCardProps) {
  return (
    <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 relative overflow-hidden group flex flex-col justify-between">
      
      {/* Icône en fond */}
      <div className="absolute -top-8 -right-8 text-gray-300 opacity-80 pointer-events-none">
        <Icon className="w-36 h-36" />
      </div>

      <div className="relative z-10 text-center flex-1 flex flex-col justify-between">
        <div>
          <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full bg-gradient-to-r from-orange-600 to-orange-800 text-white font-black shadow-lg">
            {number}
          </div>

          <h3 className="text-lg font-bold text-gray-900 mb-3">
            {title}
          </h3>

          <p className="text-sm text-gray-600 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Témoignages s'il y en a */}
        {testimonials && testimonials.length > 0 && (
          <TestimonialCarousel testimonials={testimonials} />
        )}

        {/* Bouton Voir */}
        <div className="mt-6">
          <Link
            href={link || "/solutions/solutions-details"}
            className="inline-flex items-center justify-center w-full py-3 bg-orange-600 text-white font-semibold rounded-xl hover:bg-orange-700 transition shadow-md"
          >
            Voir
          </Link>
        </div>
      </div>
    </div>
  );
}
