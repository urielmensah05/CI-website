"use client";

import { useEffect, useState, useCallback } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

// Mapping lien → id de la section sur la page d'accueil
const NAV_LINKS = [
  { label: "Akwaba",         anchor: "akwaba" },
  { label: "Nos services",   anchor: "nos-services" },
  { label: "Nos solutions", anchor: "nos-solutions" },
  { label: "Notre équipe",   anchor: "notre-equipe" },
  { label: "Nos partenaires",anchor: "nos-partenaires" },
  { label: "Nous contacter", anchor: "nous-contacter" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /**
   * Smooth scroll vers une section de la page d'accueil.
   * Si on est déjà sur "/", scroll direct.
   * Sinon on navigue d'abord vers "/" puis on scroll.
   */
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, anchor: string) => {
      e.preventDefault();
      setIsMobileMenuOpen(false);

      const doScroll = () => {
        const el = document.getElementById(anchor);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      };

      if (pathname === "/") {
        doScroll();
      } else {
        router.push("/");
        // Attendre que la section apparaisse dans le DOM après navigation
        const timer = setInterval(() => {
          const el = document.getElementById(anchor);
          if (el) {
            clearInterval(timer);
            setTimeout(doScroll, 100);
          }
        }, 50);
        setTimeout(() => clearInterval(timer), 3000);
      }
    },
    [pathname, router]
  );

  const linkClass = `font-medium transition-colors hover:text-orange-600 ${
    isScrolled ? "text-gray-700" : "text-white"
  }`;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-lg shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">

          {/* Logo → retour en haut */}
          <a
            href="/#akwaba"
            onClick={(e) => handleClick(e, "akwaba")}
            className="flex items-center gap-2 flex-shrink-0"
          >
            <div className="w-28 h-28 sm:w-32 sm:h-32 lg:w-40 lg:h-40 flex items-center justify-center rounded-lg">
              <Image
                src="/images/logo.png"
                width={230}
                height={250}
                alt="CI Plus - Accueil"
                className="object-contain"
                priority
              />
            </div>
          </a>

          {/* Menu Desktop */}
          <div className="hidden md:flex items-center space-x-6">
            {NAV_LINKS.map(({ label, anchor }) => (
              <a
                key={anchor}
                href={`/#${anchor}`}
                className={linkClass}
                onClick={(e) => handleClick(e, anchor)}
              >
                {label}
              </a>
            ))}
          </div>

          {/* Bouton Menu Mobile */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg transition-colors hover:bg-gray-100/20 flex-shrink-0"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className={`w-6 h-6 ${isScrolled ? "text-gray-900" : "text-white"}`} />
            ) : (
              <Menu className={`w-6 h-6 ${isScrolled ? "text-gray-900" : "text-white"}`} />
            )}
          </button>
        </div>
      </div>

      {/* Menu Mobile */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-xl">
          <div className="px-4 py-6 space-y-2">
            {NAV_LINKS.map(({ label, anchor }) => (
              <a
                key={anchor}
                href={`/#${anchor}`}
                onClick={(e) => handleClick(e, anchor)}
                className="block px-4 py-2 text-gray-700 hover:text-orange-600 rounded-lg font-medium transition-colors"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}