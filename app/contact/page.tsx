// ==============================
// app/contact/page.tsx
// ==============================
import type { Metadata } from "next";
import { MapPin, Phone, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Nous Contacter – Central Innovation Plus",
  description: "Contactez l'équipe Central Innovation Plus à Abidjan, Cocody. Téléphone, email et localisation disponibles.",
};

export default function ContactPage() {
  return (
    <section className="py-24 bg-white">
       {/* Header */}
<div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 lg:mb-20">
  <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
    Nous contacter
  </h1>
  <p className="mt-6 text-gray-600 text-base leading-relaxed">
    Une équipe prête à vous répondre dans les plus brefs délais.
  </p>
</div>
      <div className="max-w-7xl mx-auto px-6">

        {/* Carte Google Maps */}
        <div className="mb-16 rounded-xl overflow-hidden border border-gray-200 shadow-sm">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3972.7540491578766!2d-3.9984179250167022!3d5.301024994677296!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfc1eeb25c0b6899%3A0x9b9c9f6facd94a8a!2sSOS%20INFORMATIQUE!5e0!3m2!1sfr!2sci!4v1755653678044!5m2!1sfr!2sci"
            className="w-full h-[400px] border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* Blocs contact */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Adresse */}
          <div className="text-center bg-gray-50 border border-gray-200 rounded-xl p-8 hover:shadow-lg transition">
            <MapPin className="w-8 h-8 mx-auto mb-4 text-orange-600" />
            <h4 className="text-xl font-bold mb-3">Adresse</h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              Imm. Riviera palmeraie, face Paris baguette, 2e Etage<br />
              Cocody – 09 BP 4484 Abidjan 09<br />
              Abidjan – Côte d’Ivoire
            </p>
          </div>

          {/* Téléphone */}
          <div className="text-center bg-gray-50 border border-gray-200 rounded-xl p-8 hover:shadow-lg transition">
            <Phone className="w-8 h-8 mx-auto mb-4 text-orange-600" />
            <h4 className="text-xl font-bold mb-3">Téléphone</h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              (+225) 27 00 00 00 01<br />
              (+225) 01 01 43 76 78<br />
              (+225) 07 07 48 27 52
            </p>
          </div>

          {/* Email */}
          <div className="text-center bg-gray-50 border border-gray-200 rounded-xl p-8 hover:shadow-lg transition">
            <Mail className="w-8 h-8 mx-auto mb-4 text-orange-600" />
            <h4 className="text-xl font-bold mb-3">Email</h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              recrutement@ci-plus.ci<br />
              etudes@plus.ci<br />
              info@ci-plus.ci
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
