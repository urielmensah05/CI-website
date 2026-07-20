import { NextResponse } from "next/server";

const partenaires = [
  {
    id: 1,
    nom: "CôteTech",
    logo: "https://via.placeholder.com/128x128.png?text=C%C3%B4teTech",
    lien: "https://example.com",
  },
  {
    id: 2,
    nom: "Abidjan Cloud",
    logo: "https://via.placeholder.com/128x128.png?text=Cloud",
    lien: "https://example.com",
  },
  {
    id: 3,
    nom: "Digital Impact",
    logo: "https://via.placeholder.com/128x128.png?text=Impact",
    lien: "https://example.com",
  },
];

export async function GET() {
  return NextResponse.json(partenaires);
}
