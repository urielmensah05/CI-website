import React from "react";
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
  testimonials: Testimonial[];
};

export default function StepCard({
  number,
  title,
  description,
  Icon,
  testimonials,
}: StepCardProps) {
  return (
    <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 relative overflow-hidden group">
      
      {/* Icône en fond */}
      <div className="absolute -top-8 -right-8 text-gray-300 opacity-80 pointer-events-none">
        <Icon className="w-36 h-36" />
      </div>

      <div className="relative z-10 text-center">
        <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full bg-gradient-to-r from-orange-600 to-orange-800 text-white font-black shadow-lg">
          {number}
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-3">
          {title}
        </h3>

        <p className="text-sm text-gray-600 leading-relaxed">
          {description}
        </p>

        {/* Témoignages */}
        {testimonials.length > 0 && (
          <TestimonialCarousel testimonials={testimonials} />
        )}
      </div>
    </div>
  );
}
