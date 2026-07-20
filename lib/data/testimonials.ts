// ==============================
// lib/data/testimonials.ts
// Données témoignages centralisées
// ==============================

export type Testimonial = {
  name: string;
  role: string;
  message: string;
  image: string;
};

export const testimonialsDevApps: Testimonial[] = [
  {
    name: "Yao Kouamé",
    role: "CEO – Startup Fintech",
    message: "Notre application est passée de simple idée à produit commercial en quelques mois.",
    image: "/images/testimonials/1.jpg",
  },
  {
    name: "Aminata Traoré",
    role: "Product Manager",
    message: "Une équipe qui comprend les contraintes locales et les enjeux business.",
    image: "/images/testimonials/2.jpg",
  },
];

export const testimonialsDigital: Testimonial[] = [
  {
    name: "Jean-Baptiste Konan",
    role: "Directeur IT",
    message: "Nos équipes travaillent plus vite et avec beaucoup moins d'erreurs.",
    image: "/images/testimonials/3.jpg",
  },
];

export const testimonialsAccompagnement: Testimonial[] = [
  {
    name: "Fatou Diabaté",
    role: "Fondatrice",
    message: "Ils nous ont aidés à structurer notre vision et à construire un produit crédible.",
    image: "/images/testimonials/4.jpg",
  },
];
