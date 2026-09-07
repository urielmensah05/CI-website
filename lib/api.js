import { INITIAL_SERVICES, INITIAL_EQUIPE, INITIAL_PARTENAIRES, INITIAL_FORMATIONS } from "@/lib/data/initialData";

const API_URL = (process.env.NEXT_PUBLIC_API_URL || "/api").replace(/\/$/, "");

function fixMojibake(data) {
  if (typeof data === "string") {
    if (/[\u00C2\u00C3]/.test(data)) {
      try {
        return decodeURIComponent(escape(data));
      } catch (e) {
        return data;
      }
    }
    return data;
  }
  if (Array.isArray(data)) {
    return data.map(fixMojibake);
  }
  if (data && typeof data === "object") {
    const cleaned = {};
    for (const key of Object.keys(data)) {
      cleaned[key] = fixMojibake(data[key]);
    }
    return cleaned;
  }
  return data;
}

async function fetchFromApi(path) {
  try {
    const res = await fetch(`${API_URL}${path}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error(`Erreur API ${path}: ${res.status}`);
    }
    const data = await res.json();
    return fixMojibake(data);
  } catch (error) {
    console.error("API fetch failed:", error);
    return [];
  }
}

// 👇 Equipe
export const getEquipe = async () => {
  try {
    const data = await fetchFromApi("/equipes");
    const list = Array.isArray(data) ? data : data?.data;
    if (Array.isArray(list) && list.length > 0) return list;
  } catch (e) {
    console.warn("Equipe API fallback triggered", e);
  }
  return INITIAL_EQUIPE.map((m, idx) => ({ id: idx + 1, ...m }));
};

// 👇 Services
export const getServices = async () => {
  try {
    const data = await fetchFromApi("/services");
    const list = Array.isArray(data) ? data : data?.data;
    if (Array.isArray(list) && list.length > 0) return list;
  } catch (e) {
    console.warn("Services API fallback triggered", e);
  }
  return INITIAL_SERVICES.map((s, idx) => ({ id: idx + 1, ...s }));
};

// 👇 Partenaires
export const getPartenaires = async () => {
  try {
    const data = await fetchFromApi("/partenaires");
    const list = Array.isArray(data) ? data : data?.data;
    if (Array.isArray(list) && list.length > 0) return list;

    // Direct fetch to Next.js API route if fetchFromApi returned empty
    const res = await fetch("/api/partenaires");
    if (res.ok) {
      const json = await res.json();
      if (Array.isArray(json) && json.length > 0) return json;
    }
  } catch (e) {
    console.warn("Using default partners fallback", e);
  }
  return INITIAL_PARTENAIRES.map((p, idx) => ({ id: idx + 1, ...p }));
};

// 👇 Solutions / Formations
export const getSolutions = async () => {
  try {
    const data = await fetchFromApi("/formations");
    const list = Array.isArray(data) ? data : data?.data;
    if (Array.isArray(list) && list.length > 0) return list;
  } catch (e) {
    console.warn("Solutions API fallback triggered", e);
  }
  return INITIAL_FORMATIONS.map((f, idx) => ({ id: idx + 1, ...f }));
};