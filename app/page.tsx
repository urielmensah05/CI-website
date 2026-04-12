// import FormationCard from './components/FormationCard'
// import ServiceCard from './components/ServiceCard'
import { Code2, Cuboid, GraduationCap, Settings } from "lucide-react";
import StepCard from "./components/StepCard";
import Link from "next/link";

// ==============================
// app/page.tsx (Accueil)
// ==============================
export default function HomePage() {
  return (
    <div>
<section className="relative text-white overflow-hidden">
  {/* Image de fond */}
  <div
    className="absolute inset-0 bg-cover bg-center"
    style={{
      backgroundImage: "url('/images/acc.jpg')",
    }}
  />

  {/* Overlay pour la lisibilité */}
  <div className="absolute inset-0 bg-black/60" />

  {/* Contenu */}
  <div className="relative max-w-7xl mx-auto px-6 py-32 text-center">
    <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
      Donner du sens à vos innovations
    </h1>

    <p className="mt-6 text-lg md:text-xl text-orange-100 max-w-3xl mx-auto">
      Central Innovation Plus accompagne les entreprises et les talents dans la transformation digitale, la formation et l’innovation durable.
    </p>

    <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
      <a
        href="/services"
        className="px-8 py-4 bg-white text-orange-600 font-semibold rounded-xl hover:bg-orange-50 transition"
      >
        Découvrir nos services
      </a>

      <a href="/devis" className="px-8 py-4 border border-white/40 rounded-xl hover:bg-white/10 transition"> 
        Demander un devis
      </a>
    </div>
  </div>
</section>

        {/* Section Présentation – Central Innovation Plus */}
<section className="bg-gradient-to-br from-white to-gray-50 shadow-2xl rounded-3xl p-6 sm:p-8 lg:p-12 mb-12 sm:mb-16 lg:mb-20">

  {/* ===== Titre ===== */}
  <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-gray-900 mb-12 text-center">
    Qui sommes-nous ?
    <span className="block mt-2 text-base sm:text-lg font-medium text-gray-500">
      Central Innovation Plus — Expertise technologique ivoirienne
    </span>
  </h2>

  {/* ===================================================== */}
  {/* ===== Sous-section 1 : Chiffres & Statistiques ===== */}
  {/* ===================================================== */}
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
    {[
      { value: "15", label: "Experts certifiés en interne" },
      { value: "150+", label: "Projets informatiques réalisés" },
      { value: "100+", label: "Clients satisfaits" },
      { value: "98%", label: "Taux de résolution des incidents" },
    ].map((stat, index) => (
      <div
        key={index}
        className="group bg-white rounded-2xl p-6 text-center shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
      >
        <div className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-orange-900 to-orange-600 bg-clip-text text-transparent mb-2">
          {stat.value}
        </div>
        <p className="text-sm sm:text-base text-black-600 font-medium">
          {stat.label}
        </p>
      </div>
    ))}
  </div>

  {/* ===================================================== */}
  {/* ===== Sous-section 2 : Valeurs & Expertise ===== */}
  {/* ===================================================== */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">

    {/* Carte 1 */}
    <div className="group p-6 sm:p-8 rounded-2xl bg-white shadow-md transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
      <div className="flex justify-center mb-6">
        <div className="w-12 h-12 rounded-xl bg-blue-100 text-teal-600 flex items-center justify-center group-hover:scale-110 transition">
          👥
        </div>
      </div>
      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 text-center">
        Innovation centrée sur l’humain
      </h3>
      <p className="text-sm sm:text-base text-gray-600 leading-relaxed text-center">
        Nous concevons des solutions technologiques pensées pour les usages réels,
        avec une approche inclusive, locale et durable.
      </p>
    </div>

    {/* Carte 2 */}
    <div className="group p-6 sm:p-8 rounded-2xl bg-white shadow-md transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
      <div className="flex justify-center mb-6">
        <div className="w-12 h-12 rounded-xl bg-yellow-100 text-green-600 flex items-center justify-center group-hover:scale-110 transition">
          🤝
        </div>
      </div>
      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 text-center">
        Collaboration & responsabilité sociale
      </h3>
      <p className="text-sm sm:text-base text-gray-600 leading-relaxed text-center">
        Nous travaillons en synergie avec nos partenaires et contribuons activement
        à l’écosystème numérique ivoirien.
      </p>
    </div>

    {/* Carte 3 */}
    <div className="group p-6 sm:p-8 rounded-2xl bg-white shadow-md transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 sm:col-span-2 lg:col-span-1">
      <div className="flex justify-center mb-6">
        <div className="w-12 h-12 rounded-xl bg-red-100 text-gray-700 flex items-center justify-center group-hover:scale-110 transition">
          🔐
        </div>
      </div>
      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 text-center">
        Sécurité & excellence opérationnelle
      </h3>
      <p className="text-sm sm:text-base text-gray-600 leading-relaxed text-center">
        Données, transactions et infrastructures sont gérées selon des standards
        stricts de sécurité et de performance.
      </p>
    </div>

  </div>
</section>

<section id="services"
  className="bg-gradient-to-br from-white via-gray-50 to-white py-16 sm:py-20 lg:py-24">
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Header */}
    <div className="text-center mb-16">
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
        Nos services
      </h2>
      <p className="text-gray-600 max-w-3xl mx-auto text-sm sm:text-base leading-relaxed">
        Nous accompagnons les entreprises, startups et porteurs de projets en
        Côte d’Ivoire dans la conception, le développement et la croissance de
        solutions digitales innovantes.
      </p>
    </div>

    {/* Services grid */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Service 1 */}
      <div className="group bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
        <div className="h-48 w-full overflow-hidden">
          <img
            src="/images/hero.jpg"
            alt="Développement d'applications"
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-3">
            Développement d’applications sur mesure
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            Nous concevons des applications web et mobiles fiables, rapides et
            sécurisées, adaptées aux besoins spécifiques des entreprises
            africaines et aux exigences du marché moderne.
          </p>
           <div className="mt-4 flex justify-end">
  <a
    href="/services"
    className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-orange-600 transition">
    Voir plus
    <span className="ml-1 transition-transform group-hover:translate-x-1">→
    </span>
  </a>
</div>
        </div>
        
      </div>

      {/* Service 2 */}
      <div className="group bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
        <div className="h-48 w-full overflow-hidden">
          <img
            src="/images/testimonials/7.jpg"
            alt="Solutions digitales"
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-3">
            Solutions digitales pour entreprises
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            Nous développons des plateformes et outils digitaux pour optimiser
            vos processus, améliorer la productivité et accélérer la croissance
            de votre activité.
          </p>
            <div className="mt-4 flex justify-end">
  <a
    href="/services"
    className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-orange-600 transition">
    Voir plus
    <span className="ml-1 transition-transform group-hover:translate-x-1">→
    </span>
  </a>
</div>
        </div>
       
      </div>

      {/* Service 3 */}
      <div className="group bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
        <div className="h-48 w-full overflow-hidden">
          <img
            src="/images/testimonials/5.jpg"
            alt="Innovation et accompagnement"
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-3">
            Accompagnement technologique & innovation
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            De l’idée à la mise en production, nous vous accompagnons avec une
            vision stratégique, des choix technologiques solides et un suivi
            continu de vos solutions.
          </p>
           <div className="mt-4 flex justify-end">
  <a
    href="/services"
    className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-orange-600 transition">
   Voir plus
    <span className="ml-1 transition-transform group-hover:translate-x-1">→
    </span>
  </a></div>
        </div>

      </div>
      
     
    </div>

   
  </div>
</section>

       {/* Section Formations */}
<section className="mb-20" id="formations">
  <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-12 text-center">
    Nos formations
  </h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
    
    <StepCard
      number={1}
      Icon={Code2}
      title="Développement d’applications multi-plateformes"
      description="Apprenez à concevoir et déployer des applications web et mobiles modernes, utilisées en entreprise."
      testimonials={[
  {
    name: "Yao K.",
    role: "Développeur junior – Abidjan",
    message:
      "Formation très pratique, j’ai pu décrocher mes premiers projets.",
    image: "/images/acc.jpg",
  },
  {
    name: "Aminata D.",
    role: "Entrepreneure",
    message:
      "J’ai enfin compris comment structurer une vraie application.",
    image: "/images/testimonials/1.jpg",
  },
     ]}

    />

    <StepCard
      number={2}
      Icon={Cuboid}
      title="Visualisation architecturale 3D"
      description="Maîtrisez la modélisation et le rendu 3D pour des projets architecturaux réalistes et professionnels."
     testimonials={[
  {
    name: "Yao K.",
    role: "Développeur junior – Abidjan",
    message:
      "Formation très pratique, j’ai pu décrocher mes premiers projets.",
    image: "/images/testimonials/5.jpg",
  },
  {
    name: "Aminata D.",
    role: "Entrepreneure",
    message:
      "J’ai enfin compris comment structurer une vraie application.",
    image: "/images/testimonials/6.jpg",
  },
     ]}

    />

    <StepCard
      number={3}
      Icon={GraduationCap}
      title="Formation professionnelle & coaching"
      description="Développez vos compétences techniques et votre posture professionnelle grâce à un accompagnement personnalisé."
      testimonials={[
  {
    name: "Yao K.",
    role: "Développeur junior – Abidjan",
    message:
      "Formation très pratique, j’ai pu décrocher mes premiers projets.",
    image: "/images/testimonials/4.jpg",
  },
  {
    name: "Aminata D.",
    role: "Entrepreneure",
    message:
      "J’ai enfin compris comment structurer une vraie application.",
    image: "/images/testimonials/2.jpg",
  },
    ]}

    />

    <StepCard
      number={4}
      Icon={Settings}
      title="Assistance et intervention logicielle"
      description="Maintenance, dépannage et optimisation de solutions logicielles existantes."
      testimonials={[
  {
    name: "Yao K.",
    role: "Développeur junior – Abidjan",
    message:
      "Formation très pratique, j’ai pu décrocher mes premiers projets.",
    image: "/images/testimonials/7.jpg",
  },
  {
    name: "Aminata D.",
    role: "Entrepreneure",
    message:
      "J’ai enfin compris comment structurer une vraie application.",
    image: "/images/testimonials/4.jpg",
  },
  ]}/>

  </div>


 {/* CTA */}
    <div className="flex flex-col items-center mt-16 gap-4">
      <Link
        href="/contact"
        className="inline-flex items-center justify-center bg-orange-600 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-orange-700 transition-all shadow-xl hover:scale-105"
      >
        Discutons de votre projet
      </Link>
      <p className="text-xs text-gray-400 italic text-center">
        Entreprises, startups et institutions — Côte d’Ivoire & Afrique
      </p>
    </div>

</section>



</div>        
)}
