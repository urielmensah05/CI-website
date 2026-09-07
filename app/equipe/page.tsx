"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getEquipe } from "@/lib/api";

type Member = {
  id: number;
  nom: string;
  poste: string;
  photo: string;
};

export default function EquipePage() {
  const [team, setTeam] = useState<Member[]>([]);

  useEffect(() => {
    getEquipe()
      .then((data: any) => {
        setTeam(Array.isArray(data) ? data : (data?.data ?? []));
      })
      .catch((err) => console.error("API error:", err));
  }, []);

  return (
    <section className="pt-40 pb-28 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            Notre équipe
          </h1>
          <p className="mt-6 text-gray-600">
            Une équipe pluridisciplinaire réunissant expertise technologique.
          </p>
        </div>

        <div className="mt-20 grid gap-10 sm:grid-cols-2 md:grid-cols-3">
          {team.map((member) => (
            <div
              key={member.id}
              className="group relative bg-white rounded-3xl border border-gray-100 shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden"
            >
              <div className="relative h-80 w-full overflow-hidden">
                <Image
                  src={
                    member.photo && member.photo.startsWith("http")
                      ? member.photo
                      : `http://localhost:8000/storage/${member.photo}`
                  }
                  alt={member.nom}
                  fill
                  className="object-cover"
                  unoptimized={true}
                />
              </div>

              <div className="p-6 text-center">
                <h3 className="text-lg font-bold text-gray-900">
                  {member.nom}
                </h3>
                <p className="text-sm text-gray-500">
                  {member.poste}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}