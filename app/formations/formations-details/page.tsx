// ==============================
// app/formations/formations-details/page.tsx
// ==============================
export default function FormationDetailsPage() {
  return (
    <section className="pt-40 pb-24 bg-gray-50">
      <div className="max-w-5xl mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center">Détails de la Formation</h1>
        <p className="mt-6 text-center text-gray-600">
          Découvrez le programme détaillé, les compétences que vous allez acquérir et les perspectives professionnelles.
        </p>

        <div className="mt-16 bg-white p-10 rounded-2xl shadow-xl space-y-6">
          <h2 className="text-2xl font-bold">Programme</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Introduction et contexte métier</li>
            <li>Outils et technologies utilisés</li>
            <li>Travaux pratiques et études de cas</li>
            <li>Évaluation et certification</li>
          </ul>

          <h2 className="text-2xl font-bold">Compétences acquises</h2>
          <p className="text-gray-700">Développement web full-stack, design d’interface, animation et gestion de projet.</p>

          <h2 className="text-2xl font-bold">Perspectives professionnelles</h2>
          <p className="text-gray-700">Postes en développement, design numérique, marketing digital et consulting technologique.</p>

          <div className="text-center mt-8">
            <a href="/devis" className="px-8 py-4 bg-orange-500 text-white font-semibold rounded-xl hover:bg-orange-600 transition">Demander un devis</a>
          </div>
        </div>
      </div>
    </section>
  )
}
