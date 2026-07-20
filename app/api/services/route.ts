import { NextResponse } from "next/server";

const services = [
  {
    id: 1,
    name: "Développement web",
    description: "Sites web et applications sur-mesure pour votre entreprise.",
  },
  {
    id: 2,
    name: "Design UI/UX",
    description: "Design d'interfaces modernes et expérience utilisateur optimisée.",
  },
  {
    id: 3,
    name: "Marketing digital",
    description: "Stratégies de visibilité, conversion et acquisition clients.",
  },
];

export async function GET() {
  return NextResponse.json(services);
}
