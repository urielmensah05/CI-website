// ==============================
// app/services/page.tsx
// ==============================
"use client";

import Link from "next/link";
import ServiceCard from "../components/ServiceCard";
import TestimonialCarousel from "../components/TestimonialCarousel";
import TestimonialSlider from "../components/TestimonialSlider";

export default function ServicesPage() {
  return (
    <main className="bg-gradient-to-br from-white via-gray-50 to-white">

      {/* HERO */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6">
            Nos services
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            Nous aidons entreprises, startups et institutions en Côte d’Ivoire
            et en Afrique à concevoir, développer et faire évoluer des solutions
            digitales performantes et durables.
          </p>
        </div>
      </section>

      {/* SERVICES */}
      <section className="pb-24">
        <div className="max-w-6xl mx-auto px-4 grid gap-16">

          {/* SERVICE 1 */}
          <ServiceCard
            title="Développement d’applications sur mesure"
            description="Nous concevons des applications web et mobiles rapides, sécurisées et adaptées aux besoins réels du terrain africain."
            image="/images/hero.jpg"
          >
            <ul className="space-y-2 text-sm text-gray-600 mb-6">
              <li>• Applications web & mobiles modernes</li>
              <li>• Sécurité, performance et scalabilité</li>
              <li>• UX pensée pour les utilisateurs finaux</li>
            </ul>

            <TestimonialCarousel
              testimonials={[
                {
                  name: "Yao Kouamé",
                  role: "CEO – Startup Fintech",
                  message:
                    "Notre application est passée de simple idée à produit commercial en quelques mois.",
                  image: "/images/testimonials/1.jpg",
                },
                {
                  name: "Aminata Traoré",
                  role: "Product Manager",
                  message:
                    "Une équipe qui comprend les contraintes locales et les enjeux business.",
                  image: "/images/testimonials/2.jpg",
                },
              ]}
            />
          </ServiceCard>

          {/* SERVICE 2 */}
          <ServiceCard
            title="Solutions digitales pour entreprises"
            description="Nous développons des outils et plateformes digitales pour optimiser les processus internes et accélérer la croissance."
            image="/images/testimonials/7.jpg"
          >
            <ul className="space-y-2 text-sm text-gray-600 mb-6">
              <li>• Automatisation des processus métiers</li>
              <li>• Tableaux de bord et outils internes</li>
              <li>• Gain de productivité mesurable</li>
            </ul>

            <TestimonialSlider
              testimonials={[
                {
                  name: "Jean-Baptiste Konan",
                  role: "Directeur IT",
                  message:
                    "Nos équipes travaillent plus vite et avec beaucoup moins d’erreurs.",
                  image: "/images/testimonials/3.jpg",
                },
              ]}
            />
          </ServiceCard>

          {/* SERVICE 3 */}
          <ServiceCard
            title="Accompagnement technologique & innovation"
            description="De l’idée à la mise en production, nous vous aidons à faire les bons choix technologiques et stratégiques."
            image="/images/testimonials/5.jpg"
          >
            <ul className="space-y-2 text-sm text-gray-600 mb-6">
              <li>• Conseil stratégique & choix technologiques</li>
              <li>• Vision long terme et produit viable</li>
              <li>• Accompagnement continu</li>
            </ul>

            <TestimonialCarousel
              testimonials={[
                {
                  name: "Fatou Diabaté",
                  role: "Fondatrice",
                  message:
                    "Ils nous ont aidés à structurer notre vision et à construire un produit crédible.",
                  image: "/images/testimonials/4.jpg",
                },
              ]}
            />
          </ServiceCard>

        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center">
        <Link
          href="/contact"
          className="inline-flex items-center justify-center bg-orange-600 text-white px-12 py-5 rounded-2xl font-bold text-lg shadow-xl hover:bg-orange-700 hover:scale-105 transition-all"
        >
          Discutons de votre projet
        </Link>

        <p className="mt-4 text-xs text-gray-400 italic">
          Entreprises, startups et institutions — Côte d’Ivoire & Afrique
        </p>
      </section>
    </main>
  );
}