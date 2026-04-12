"use client";

import { useEffect, useState } from "react";
import {
  LogIn,
  Menu,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const LOGO_SRC = "/images/logo.png";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-lg shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
<Link href="/"
           className="flex items-center gap-2 flex-shrink-0">
  <div className="w-28 h-28 sm:w-32 sm:h-32 lg:w-40 lg:h-40 flex items-center justify-center rounded-lg">
  <Image
    src={LOGO_SRC}
    width={230}
    height={250}
    alt="CI Plus - Accueil"
    className="object-contain"
    priority
  />
</div>

</Link>

          {/* Menu Desktop */}
          <div className="hidden md:flex items-center space-x-6">
            <a
              href="/"
              className={`font-medium transition-colors hover:text-orange-600 ${
                isScrolled ? "text-gray-700" : "text-white"
              }`}
            >
              Akwaba
            </a>
            <a
              href="/services"
              className={`font-medium transition-colors hover:text-orange-600 ${
                isScrolled ? "text-gray-700" : "text-white"
              }`}
            >
              Nos services
            </a>
            <a
              href="/formations"
              className={`font-medium transition-colors hover:text-orange-600 ${
                isScrolled ? "text-gray-700" : "text-white"
              }`}
            >
              Nos formations 
            </a>
             <a
              href="/equipe"
              className={`font-medium transition-colors hover:text-orange-600 ${
                isScrolled ? "text-gray-700" : "text-white"
              }`}
            >
              Notre équipe 
            </a>
            <a
              href="/contact"
              className={`font-medium transition-colors hover:text-orange-600 ${
                isScrolled ? "text-gray-700" : "text-white"
              }`}
            >
              Nous contactez
            </a>
          </div>

          {/* Boutons d'action Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/devis"
              className="group inline-flex items-center space-x-2 px-5 py-2.5 text-sm font-semibold text-white bg-orange-600 hover:bg-orange-700 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
            >
              {/* <LogIn className="w-4 h-4 transition-transform group-hover:translate-x-0.5" /> */}
              <span>Devis</span>
            </Link>
          </div>

          {/* Bouton Menu Mobile */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg transition-colors hover:bg-gray-100/20 flex-shrink-0"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X
                className={`w-6 h-6 ${
                  isScrolled ? "text-gray-900" : "text-white"
                }`}
              />
            ) : (
              <Menu
                className={`w-6 h-6 ${
                  isScrolled ? "text-gray-900" : "text-white"
                }`}
              />
            )}
          </button>
        </div>
      </div>

      {/* Menu Mobile */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-xl">
          <div className="px-4 py-6 space-y-4">
             <a
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-2 text-gray-700 hover:text-orange-600 rounded-lg font-medium transition-colors"
            >
              Akwaba
            </a>
            <a
              href="/services"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-2 text-gray-700 hover:text-orange-600 rounded-lg font-medium transition-colors"
            >
              Nos services
            </a>
            
            <a
              href="/formations"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-2 text-gray-700 hover:text-orange-600 rounded-lg font-medium transition-colors"
            >
              Nos formations
            </a>
            <a
              href="/services"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-2 text-gray-700 hover:text-orange-600 rounded-lg font-medium transition-colors"
            >
              Nos services
            </a>
            <a
              href="/equipe"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-2 text-gray-700 hover:text-orange-600 rounded-lg font-medium transition-colors"
            >
              Notre équipe
            </a>
            <div className="pt-4 border-t border-gray-200">
              <a
                href="/devis"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center space-x-2 w-full px-5 py-3 text-white bg-orange-600 hover:bg-orange-700 rounded-xl shadow-lg font-semibold transition-all"
              >
                <span>Demander devis</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
