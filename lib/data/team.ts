// ==============================
// lib/data/team.ts
// Données équipe centralisées — utilisées dans page.tsx et equipe/page.tsx
// ==============================

export type TeamMember = {
  name: string;
  role: string;
  image: string;
};

export const team: TeamMember[] = [
  {
    name: "Dr. Elder Akpa A.H.",
    role: "Expert Informatique, Docteur en Informatique au Japon",
    image: "/images/testimonials/5.jpg",
  },
  {
    name: "Richler Bohoussou",
    role: "Juriste – Politologue avec plus de 30 ans d'expérience",
    image: "/images/testimonials/7.jpg",
  },
  {
    name: "Hermann Fall",
    role: "Ingénieur Financier",
    image: "/images/testimonials/2.jpg",
  },
];
