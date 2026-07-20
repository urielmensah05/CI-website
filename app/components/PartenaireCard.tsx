"use client";

import React from "react";
import Image from "next/image";
import { User, Briefcase, Star } from "lucide-react";

type Partenaire = {
  name: string;
  job: string;
  description: string;
  image: string;
  icon: string;
};

type PartenairesCardProps = {
  partenaire: Partenaire;
};

export default function PartenaireCard({ partenaire }: PartenairesCardProps) {
  const { name, job, description, image, icon } = partenaire;

  const iconMap = {
    user: User,
    briefcase: Briefcase,
    star: Star,
  };

  const Icon = iconMap[icon as keyof typeof iconMap] || User;

  return (
    <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 relative overflow-hidden group transition duration-300 hover:shadow-xl hover:-translate-y-1">

      <div className="absolute -top-8 -right-8 text-gray-200 opacity-70 pointer-events-none">
        <Icon className="w-32 h-32" />
      </div>

      <div className="relative z-10 text-center">

        <div className="w-20 h-20 mx-auto mb-4 relative">
          <Image
            src={image}
            alt={`Photo de ${name}`}
            fill
            className="object-cover rounded-full border-4 border-orange-500 shadow-md transition group-hover:scale-110"
          />
        </div>

        <h3 className="text-lg font-bold text-gray-900">
          {name}
        </h3>

        <p className="text-sm text-orange-600 font-semibold mb-2">
          {job}
        </p>

        <p className="text-sm text-gray-600 leading-relaxed mb-4">
          {description}
        </p>

        <a
          href="/contact"
          className="px-4 py-2 text-sm font-semibold text-white bg-orange-600 hover:bg-orange-700 rounded-xl shadow-md transition inline-block"
        >
          Contacter
        </a>
      </div>
    </div>
  );
}