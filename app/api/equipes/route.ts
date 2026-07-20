import { NextResponse } from "next/server";

const equipe = [
  {
    id: 1,
    nom: "Laura K.",
    poste: "Lead développeuse",
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 2,
    nom: "Alex M.",
    poste: "Designer UI/UX",
    photo: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 3,
    nom: "Moussa D.",
    poste: "Consultant digital",
    photo: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=400&q=80",
  },
];

export async function GET() {
  return NextResponse.json(equipe);
}
