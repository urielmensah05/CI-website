import { NextResponse } from "next/server";

const partenaires = [
  {
    id: 1,
    nom: "CôteTech",
    logo: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='20' fill='%23ea580c'/><text x='50' y='60' font-size='32' font-weight='bold' font-family='sans-serif' text-anchor='middle' fill='white'>CT</text></svg>",
    lien: "#",
  },
  {
    id: 2,
    nom: "Abidjan Cloud",
    logo: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='20' fill='%230284c7'/><text x='50' y='60' font-size='32' font-weight='bold' font-family='sans-serif' text-anchor='middle' fill='white'>AC</text></svg>",
    lien: "#",
  },
  {
    id: 3,
    nom: "Digital Impact",
    logo: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='20' fill='%230d9488'/><text x='50' y='60' font-size='32' font-weight='bold' font-family='sans-serif' text-anchor='middle' fill='white'>DI</text></svg>",
    lien: "#",
  },
];

export async function GET() {
  return NextResponse.json(partenaires);
}
