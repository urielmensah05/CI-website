// ==============================
// components/Footer.tsx
// ==============================
export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-20 grid gap-12 md:grid-cols-4">
        {/* Brand */}
        <div>
          <h3 className="text-2xl font-extrabold text-orange-600">CI+</h3>
          <p className="mt-4 text-gray-400 text-sm">
            Central Innovation Plus accompagne les entreprises et les talents dans la création de solutions digitales, les solutions et l'innovation durable.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="font-semibold mb-4">Navigation</h4>
          <ul className="space-y-2 text-gray-400">
            <li><a href="/" className="hover:text-orange-600">Accueil</a></li>
            <li><a href="/services" className="hover:text-orange-600">Services</a></li>
            <li><a href="/solutions" className="hover:text-orange-600">Solutions</a></li>
            <li><a href="/equipe" className="hover:text-orange-600">Équipe</a></li>
            <li><a href="/devis" className="hover:text-orange-600">Devis</a></li>
            <li><a href="/contact" className="hover:text-orange-600">Contact</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold mb-4">Contact</h4>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>Abidjan, Cocody Palmeraie</li>
            <li>Tél. +225 2722270674</li>
            <li>contact@ci-plus.net</li>
          </ul>
        </div>

        {/* Newsletter & Social */}
        <div>
          <h4 className="font-semibold mb-4">Newsletter</h4>
          <p className="text-gray-400 text-sm mb-4">Recevez nos actualités et opportunités.</p>
          <form className="flex gap-2">
            <input
              type="email"
              placeholder="Votre email"
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-orange-400"
            />
            <button type="submit" className="px-4 py-2 bg-orange-600 rounded-lg font-semibold hover:bg-orange-600 transition">
              OK
            </button>
          </form>
{false && (
  <div className="flex gap-4 mt-6 text-gray-400">
    <a href="#" className="hover:text-orange-600">LinkedIn</a>
    <a href="#" className="hover:text-orange-600">Facebook</a>
    <a href="#" className="hover:text-orange-600">Instagram</a>
  </div>
)}

        </div>
      </div>

      <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-6 text-center text-sm text-gray-500">
          (c) {new Date().getFullYear()} Central Innovation Plus - Tous droits réservés.
        </div>
      </div>
    </footer>
  )
}
