import { NextResponse } from "next/server";

const equipe = [
  {
    id: 1,
    nom: "Dr. Elder Akpa A.H.",
    poste: "Expert Informatique, Docteur en Informatique au Japon",
    photo: "/images/testimonials/5.jpg",
  },
  {
    id: 2,
    nom: "Goh Gedeon",
    poste: "Ingénieur Informatique",
    photo: "/images/testimonials/7.jpg",
  },
  {
    id: 3,
    nom: "Hermann Fall",
    poste: "Ingénieur Financier",
    photo: "/images/testimonials/2.jpg",
  },
];

export async function GET() {
  return NextResponse.json(equipe);
}
