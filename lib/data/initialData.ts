// ============================================================
// lib/data/initialData.ts
// Données initiales et de référence du site Central Innovation Plus
// ============================================================

export interface DefaultService {
  name: string;
  description: string;
  icon: string;
}

export interface DefaultMember {
  nom: string;
  poste: string;
  photo: string;
}

export interface DefaultPartenaire {
  nom: string;
  lien: string;
  logo: string | null;
}

export interface DefaultFormation {
  titre: string;
  description: string;
  image: string | null;
}

export const INITIAL_SERVICES: DefaultService[] = [
  {
    name: "Développement d'applications sur mesure",
    description: "Nous concevons des applications web et mobiles rapides, sécurisées et adaptées aux besoins réels du terrain africain.",
    icon: "Code2",
  },
  {
    name: "Solutions digitales pour entreprises",
    description: "Intégration d'outils numériques, automatisation et transformation digitale pour optimiser vos processus métiers.",
    icon: "Cuboid",
  },
  {
    name: "Formations & Accompagnement",
    description: "Montée en compétences de vos équipes, programmes pratiques et suivi personnalisé pour vos projets technologiques.",
    icon: "GraduationCap",
  },
  {
    name: "Design UI/UX & Identité visuelle",
    description: "Design d'interfaces modernes, prototypage interactif et expérience utilisateur optimisée.",
    icon: "Palette",
  },
  {
    name: "Marketing Digital & Visibilité",
    description: "Stratégies d'acquisition, référencement et leviers de conversion en ligne.",
    icon: "TrendingUp",
  },
];

export const INITIAL_EQUIPE: DefaultMember[] = [
  {
    nom: "Dr. Elder Akpa A.H.",
    poste: "Expert Informatique, Docteur en Informatique au Japon",
    photo: "/images/testimonials/5.jpg",
  },
  {
    nom: "Goh Gedeon",
    poste: "Ingénieur Informatique",
    photo: "/images/testimonials/7.jpg",
  },
  {
    nom: "Hermann Fall",
    poste: "Ingénieur Financier",
    photo: "/images/testimonials/2.jpg",
  },
];

export const INITIAL_PARTENAIRES: DefaultPartenaire[] = [
  {
    nom: "CôteTech",
    lien: "https://example.com",
    logo: null,
  },
  {
    nom: "Abidjan Cloud",
    lien: "https://example.com",
    logo: null,
  },
  {
    nom: "Digital Impact",
    lien: "https://example.com",
    logo: null,
  },
];

export const INITIAL_FORMATIONS: DefaultFormation[] = [
  {
    titre: "Développement Web & Mobile",
    description: "Solutions pratiques et programmes intensifs pour maîtriser HTML, CSS, React, Next.js et Flutter.",
    image: null,
  },
  {
    titre: "Design Numérique & UI/UX",
    description: "Acquérir les compétences essentielles en UI/UX et maîtrise de Figma pour concevoir des produits modernes.",
    image: null,
  },
  {
    titre: "Marketing Digital & Stratégie",
    description: "Apprendre les leviers de croissance digitale, gestion de campagnes et analyse de performance.",
    image: null,
  },
];
