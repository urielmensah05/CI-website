import type { Metadata } from "next";
import { getServices } from "@/lib/api";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Nos Services – Central Innovation Plus",
  description: "Développement d'applications, solutions digitales et accompagnement technologique.",
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <main className="bg-gradient-to-br from-white via-gray-50 to-white">

      {/* HERO */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6">
            Nos services
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            Chez CENTRAL INNOVATION PLUS, nous comprenons que chaque projet est unique. Que vous recherchiez des solutions digitales innovantes, une logistique eficace, des opportunités immobilières exceptionnelles ou des services de santé de pointe, nous nous engageons à dépasser vos attentes.


          </p>
        </div>
      </section>

      {/* SERVICES DEPUIS LA BASE DE DONNÉES */}
      <section className="pb-24">
        <div className="max-w-6xl mx-auto px-4 grid gap-16">
          {services.length === 0 ? (
            <p className="text-center text-gray-400">Aucun service pour le moment.</p>
          ) : (
            services.map((service: any) => (
              <div key={service.id} className="bg-white rounded-2xl shadow p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {service.name}
                </h2>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center">
        <Link
          href="/contact"
          className="inline-flex items-center justify-center bg-orange-600 text-white px-12 py-5 rounded-2xl font-bold text-lg shadow-xl hover:bg-orange-700 transition-all"
        >
          Discutons de votre projet
        </Link>
      </section>
    </main>
  );
}