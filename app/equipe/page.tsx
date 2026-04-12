// ==============================
// app/equipe/page.tsx
// ==============================
import Image from "next/image";

const team = [
  {
    name: "Dr. Elder Akpa A.H.",
    role: "Expert Informatique, Docteur en Infromatique au Japon",
    image: "/images/testimonials/5.jpg",
  },
  {
    name: "Richler Bohoussou",
    role: "Juriste – Politologue avec okus de 30 d'experience",
    image: "/images/testimonials/7.jpg",
  },
  {
    name: "Hermann Fall",
    role: "Ingénieur Financier",
    image: "/images/testimonials/2.jpg",
  },
];

export default function EquipePage() {
  return (
    <section className="pt-40 pb-28 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            Notre équipe
          </h1>
          <p className="mt-6 text-gray-600 text-base leading-relaxed">
            Une équipe pluridisciplinaire réunissant expertise technologique,
            vision stratégique et excellence opérationnelle.
          </p>
        </div>

        {/* Grid équipe */}
        <div className="mt-20 grid gap-10 sm:grid-cols-2 md:grid-cols-3">
          {team.map((member, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-3xl border border-gray-100 shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden"
            >
              {/* Image */}
              <div className="relative h-80 w-full overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Contenu */}
              <div className="p-6 text-center">
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                  {member.name}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {member.role}
                </p>
              </div>

              {/* Effet halo */}
              <div className="absolute inset-0 rounded-3xl ring-1 ring-transparent group-hover:ring-orange-200 transition" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
