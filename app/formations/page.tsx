// ==============================
// app/formations/page.tsx
// ==============================
import StepCard from '../components/StepCard'
import { Code2, Cuboid, GraduationCap, Settings } from "lucide-react";
import Link from "next/link";

export default function FormationsPage() {
  return (
    <section className="py-24 bg-white" id="formations">
  <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 lg:mb-20">
  <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
    Nos formations
  </h1>
    <p className="mt-6 text-gray-600 text-base leading-relaxed">
    Une équipe prête à vous répondre dans les plus brefs délais.
  </p>

</div>

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
    image: "/images/testimonials/3(2).jpg",
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
  <Link
  href="/formations/developpement" // remplacer par le slug de la formation
  className="inline-block mt-6 px-6 py-3 bg-orange-600 text-white font-semibold rounded-2xl shadow-lg hover:bg-orange-700 hover:scale-105 transition-all">
  En savoir plus
  </Link>
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
  <Link
  href="/formations/developpement" // remplacer par le slug de la formation
  className="inline-block mt-6 px-6 py-3 bg-orange-600 text-white font-semibold rounded-2xl shadow-lg hover:bg-orange-700 hover:scale-105 transition-all">
  En savoir plus
    </Link>
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
  <Link
  href="/formations/developpement" // remplacer par le slug de la formation
  className="inline-block mt-6 px-6 py-3 bg-orange-600 text-white font-semibold rounded-2xl shadow-lg hover:bg-orange-700 hover:scale-105 transition-all">
  En savoir plus
  </Link>
  ]}/>

  </div>
</section>

  )
}
