"use client";

import { useEffect, useRef, useState } from "react";
import { getPartenaires } from "@/lib/api";

export default function PartenairesCarousel() {
  const [partenaires, setPartenaires] = useState<any[]>([]);
  const trackRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef(0);
  const pausedRef = useRef(false);
  const animRef = useRef<number>(0);

  useEffect(() => {
    getPartenaires()
      .then((data: any) => setPartenaires(Array.isArray(data) ? data : (data?.data ?? [])))
      .catch((err) => console.error("API error:", err));
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || partenaires.length === 0) return;

    const speed = 0.8;
    const singleGroupWidth = partenaires.length * (260 + 24);

    const animate = () => {
      if (!pausedRef.current && track) {
        positionRef.current -= speed;
        if (Math.abs(positionRef.current) >= singleGroupWidth) {
          positionRef.current += singleGroupWidth;
        }
        track.style.transform = `translateX(${positionRef.current}px)`;
      }
      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [partenaires]);

  const tous = [...partenaires, ...partenaires, ...partenaires];

  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      <div style={{
        position: "absolute", left: 0, top: 0, bottom: 0, width: 80,
        background: "linear-gradient(to right, #f9fafb, transparent)",
        zIndex: 10, pointerEvents: "none"
      }} />
      <div style={{
        position: "absolute", right: 0, top: 0, bottom: 0, width: 80,
        background: "linear-gradient(to left, #f9fafb, transparent)",
        zIndex: 10, pointerEvents: "none"
      }} />
      <div
        ref={trackRef}
        style={{ display: "flex", gap: 24, width: "max-content", willChange: "transform" }}
        onMouseEnter={() => { pausedRef.current = true; }}
        onMouseLeave={() => { pausedRef.current = false; }}
      >
        {tous.map((p, i) => (
          <div
            key={i}
            style={{ width: 260, flexShrink: 0 }}
            className="bg-white rounded-2xl shadow p-6 text-center"
          >
            <img
              src={
                !p.logo
                  ? "/images/hero.jpg"
                  : p.logo.startsWith("http") || p.logo.startsWith("data:") || p.logo.startsWith("/")
                  ? p.logo
                  : `http://localhost:8000/${p.logo}`
              }
              alt={p.nom}
              className="w-16 h-16 object-contain mx-auto mb-4 rounded-xl"
            />
            <h3 className="font-bold text-gray-900">{p.nom}</h3>
            {p.lien && (
              <a
                href={p.lien}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-orange-600 hover:underline mt-2 inline-block"
              >
                Voir le site
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}