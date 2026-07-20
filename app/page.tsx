"use client";

import { Code2, Cuboid, GraduationCap, Settings, MapPin, Phone, Mail } from "lucide-react";
import StepCard from "./components/StepCard";
import PartenairesCarousel from "./components/PartenairesCarousel";
import ServiceCard from "./components/ServiceCard";
import TestimonialCarousel from "./components/TestimonialCarousel";
import TestimonialSlider from "./components/TestimonialSlider";
import Image from "next/image";
import { team } from "../lib/data/team";


export default function HomePage() {

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div>

      {/* ===== HERO / AKWABA ===== */}
      <section id="akwaba" className="relative text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/acc.jpg')" }}
        />
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative max-w-7xl mx-auto px-6 py-32 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold">
            Donner du sens à vos innovations
          </h1>

          <p className="mt-6 text-lg text-orange-100 max-w-3xl mx-auto">
            Central Innovation Plus accompagne les entreprises et les talents
            dans la transformation digitale.
          </p>

          <div className="mt-10 flex justify-center">
            <button
              onClick={() => scrollTo("nos-services")}
              className="px-8 py-4 bg-white text-orange-600 font-semibold rounded-xl hover:bg-orange-50 transition"
            >
              Découvrir nos services
            </button>
          </div>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section id="nos-services" className="bg-gradient-to-br from-white via-gray-50 to-white">

        <div className="py-24">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6">
              Nos services
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Chez CENTRAL INNOVATION PLUS, nous comprenons que chaque projet est unique. Que vous recherchiez des solutions digitales innovantes, une logistique eficace, des opportunités immobilières exceptionnelles ou des services de santé de pointe, nous nous engageons à dépasser vos attentes.


            </p>
          </div>
        </div>

        <div className="pb-24">
          <div className="max-w-7xl mx-auto px-6 grid gap-10 sm:grid-cols-2 md:grid-cols-3">

            <ServiceCard
              title="Développement d'applications sur mesure"
              description="Nous concevons des applications web et mobiles rapides, sécurisées et adaptées aux besoins réels du terrain africain."
              image="/images/hero.jpg"
            >
              <ul className="space-y-2 text-sm text-gray-600 mb-6">
                <li>• Applications web &amp; mobiles modernes</li>
                <li>• Sécurité, performance et scalabilité</li>
                <li>• UX pensée pour les utilisateurs finaux</li>
              </ul>
              <TestimonialCarousel
                testimonials={[
                  {
                    name: "Yao Kouamé",
                    role: "CEO – Startup Fintech",
                    message: "Notre application est passée de simple idée à produit commercial en quelques mois.",
                    image: "/images/testimonials/1.jpg",
                  },
                  {
                    name: "Aminata Traoré",
                    role: "Product Manager",
                    message: "Une équipe qui comprend les contraintes locales et les enjeux business.",
                    image: "/images/testimonials/2.jpg",
                  },
                ]}
              />
            </ServiceCard>

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
                    message: "Nos équipes travaillent plus vite et avec beaucoup moins d'erreurs.",
                    image: "/images/testimonials/3.jpg",
                  },
                ]}
              />
            </ServiceCard>

            <ServiceCard
              title="Accompagnement technologique & innovation"
              description="De l'idée à la mise en production, nous vous aidons à faire les bons choix technologiques et stratégiques."
              image="/images/testimonials/5.jpg"
            >
              <ul className="space-y-2 text-sm text-gray-600 mb-6">
                <li>• Conseil stratégique &amp; choix technologiques</li>
                <li>• Vision long terme et produit viable</li>
                <li>• Accompagnement continu</li>
              </ul>
              <TestimonialCarousel
                testimonials={[
                  {
                    name: "Fatou Diabaté",
                    role: "Fondatrice",
                    message: "Ils nous ont aidés à structurer notre vision et à construire un produit crédible.",
                    image: "/images/testimonials/4.jpg",
                  },
                ]}
              />
            </ServiceCard>

          </div>
        </div>

        {/* CTA services */}
        <div className="py-12 text-center">
          <button
            onClick={() => scrollTo("nous-contacter")}
            className="inline-flex items-center justify-center bg-orange-600 text-white px-12 py-5 rounded-2xl font-bold text-lg shadow-xl hover:bg-orange-700 hover:scale-105 transition-all"
          >
            Discutons de votre projet
          </button>
          <p className="mt-4 text-xs text-gray-400 italic">
            Entreprises, startups et institutions — Côte d&apos;Ivoire &amp; Afrique
          </p>
        </div>

      </section>

      {/* ===== FORMATIONS ===== */}
      <section id="nos-formations" className="py-24 bg-white">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 lg:mb-20 px-4">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            Nos formations
          </h2>
          <p className="mt-6 text-gray-600 text-base leading-relaxed">
            Des formations pratiques pour acquérir les compétences du numérique d&apos;aujourd&apos;hui.
          </p>
        </div>

        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          <StepCard
            number={1}
            Icon={Code2}
            title="Développement d'applications multi-plateformes"
            description="Apprenez à concevoir et déployer des applications web et mobiles modernes, utilisées en entreprise."
            testimonials={[
              { name: "Yao K.", role: "Développeur junior – Abidjan", message: "Formation très pratique, j'ai pu décrocher mes premiers projets.", image: "/images/testimonials/3(2).jpg" },
              { name: "Aminata D.", role: "Entrepreneure", message: "J'ai enfin compris comment structurer une vraie application.", image: "/images/testimonials/1.jpg" },
            ]}
          />

          <StepCard
            number={2}
            Icon={Cuboid}
            title="Visualisation architecturale 3D"
            description="Maîtrisez la modélisation et le rendu 3D pour des projets architecturaux réalistes et professionnels."
            testimonials={[
              { name: "Yao K.", role: "Développeur junior – Abidjan", message: "Formation très pratique, j'ai pu décrocher mes premiers projets.", image: "/images/testimonials/5.jpg" },
              { name: "Aminata D.", role: "Entrepreneure", message: "J'ai enfin compris comment structurer une vraie application.", image: "/images/testimonials/6.jpg" },
            ]}
          />

          <StepCard
            number={3}
            Icon={GraduationCap}
            title="Formation professionnelle & coaching"
            description="Développez vos compétences techniques et votre posture professionnelle grâce à un accompagnement personnalisé."
            testimonials={[
              { name: "Yao K.", role: "Développeur junior – Abidjan", message: "Formation très pratique, j'ai pu décrocher mes premiers projets.", image: "/images/testimonials/4.jpg" },
              { name: "Aminata D.", role: "Entrepreneure", message: "J'ai enfin compris comment structurer une vraie application.", image: "/images/testimonials/2.jpg" },
            ]}
          />

          <StepCard
            number={4}
            Icon={Settings}
            title="Assistance et intervention logicielle"
            description="Maintenance, dépannage et optimisation de solutions logicielles existantes."
            testimonials={[
              { name: "Yao K.", role: "Développeur junior – Abidjan", message: "Formation très pratique, j'ai pu décrocher mes premiers projets.", image: "/images/testimonials/7.jpg" },
              { name: "Aminata D.", role: "Entrepreneure", message: "J'ai enfin compris comment structurer une vraie application.", image: "/images/testimonials/4.jpg" },
            ]}
          />

        </div>

        <div className="text-center mt-12">
          <button
            onClick={() => scrollTo("nous-contacter")}
            className="bg-orange-600 text-white px-6 py-3 rounded-xl hover:bg-orange-700 transition font-semibold"
          >
            Nous contacter
          </button>
        </div>
      </section>

      {/* ===== ÉQUIPE ===== */}
      <section id="notre-equipe" className="py-28 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
              Notre équipe
            </h2>
            <p className="mt-6 text-gray-600 text-base leading-relaxed">
              Nous sommes des jeunes Cadres et Entrepreneurs Ivoiriens, tous diplômés et forts d'expériences professionnelles diverses.


            </p>
          </div>

          <div className="mt-20 grid gap-10 sm:grid-cols-2 md:grid-cols-3">
            {team.map((member, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-3xl border border-gray-100 shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden"
              >
                <div className="relative h-80 w-full overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">{member.role}</p>
                </div>
                <div className="absolute inset-0 rounded-3xl ring-1 ring-transparent group-hover:ring-orange-200 transition" />
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ===== PARTENAIRES ===== */}
      <section id="nos-partenaires" className="py-20 bg-gray-50">
        <h2 className="text-4xl font-bold text-center mb-12">
          Nos Partenaires
        </h2>
        <PartenairesCarousel />
      </section>

      {/* ===== CONTACT ===== */}
      <section id="nous-contacter" className="py-24 bg-white">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 lg:mb-20 px-4">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            Nous contacter
          </h2>
          <p className="mt-6 text-gray-600 text-base leading-relaxed">
            Une équipe prête à vous répondre dans les plus brefs délais.
          </p>
        </div>
        <div className="max-w-7xl mx-auto px-6">

          {/* Carte Google Maps */}
          <div className="mb-16 rounded-xl overflow-hidden border border-gray-200 shadow-sm">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3972.7540491578766!2d-3.9984179250167022!3d5.301024994677296!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfc1eeb25c0b6899%3A0x9b9c9f6facd94a8a!2sSOS%20INFORMATIQUE!5e0!3m2!1sfr!2sci!4v1755653678044!5m2!1sfr!2sci"
              className="w-full h-[400px] border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Blocs contact */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            <div className="text-center bg-gray-50 border border-gray-200 rounded-xl p-8 hover:shadow-lg transition">
              <MapPin className="w-8 h-8 mx-auto mb-4 text-orange-600" />
              <h4 className="text-xl font-bold mb-3">Adresse</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Imm. Riviera palmeraie, face Paris baguette, 2e Etage<br />
                Cocody – 09 BP 4484 Abidjan 09<br />
                Abidjan – Côte d&apos;Ivoire
              </p>
            </div>

            <div className="text-center bg-gray-50 border border-gray-200 rounded-xl p-8 hover:shadow-lg transition">
              <Phone className="w-8 h-8 mx-auto mb-4 text-orange-600" />
              <h4 className="text-xl font-bold mb-3">Téléphone</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                (+225) 27 00 00 00 01<br />
                (+225) 01 01 43 76 78<br />
                (+225) 07 07 48 27 52
              </p>
            </div>

            <div className="text-center bg-gray-50 border border-gray-200 rounded-xl p-8 hover:shadow-lg transition">
              <Mail className="w-8 h-8 mx-auto mb-4 text-orange-600" />
              <h4 className="text-xl font-bold mb-3">Email</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                recrutement@ci-plus.ci<br />
                etudes@plus.ci<br />
                info@ci-plus.ci
              </p>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}