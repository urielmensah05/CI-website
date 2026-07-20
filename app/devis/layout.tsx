// ==============================
// app/devis/layout.tsx
// Server Component pour le SEO de la page /devis
// (la page elle-même est 'use client', donc metadata doit être ici)
// ==============================
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Demande de Devis – Central Innovation Plus",
  description: "Remplissez notre formulaire pour recevoir une proposition personnalisée pour votre projet digital.",
};

export default function DevisLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
