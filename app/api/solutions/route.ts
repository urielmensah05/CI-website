import { NextResponse } from "next/server";

const solutions = [
  {
    id: 1,
    titre: "Développement web",
    description: "Solutions pratiques pour maîtriser HTML, CSS, React et Next.js.",
  },
  {
    id: 2,
    titre: "Design numérique",
    description: "Acquérir les compétences UI/UX pour concevoir des interfaces engageantes.",
  },
  {
    id: 3,
    titre: "Marketing digital",
    description: "Apprendre les leviers de visibilité en ligne et les stratégies de conversion.",
  },
];

export async function GET() {
  return NextResponse.json(solutions);
}
