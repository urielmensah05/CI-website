const API_URL = (process.env.NEXT_PUBLIC_API_URL || "/api").replace(/\/$/, "");

async function fetchFromApi(path) {
  try {
    const res = await fetch(`${API_URL}${path}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error(`Erreur API ${path}: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.error("API fetch failed:", error);
    return [];
  }
}

// 👇 Equipe
export const getEquipe = async () => {
  return fetchFromApi("/equipes");
};

// 👇 Services
export const getServices = async () => {
  return fetchFromApi("/services");
};

// 👇 Partenaires
export const getPartenaires = async () => {
   return fetchFromApi("/partenaire");
};

// 👇 Formations
export const getFormations = async () => {
  return fetchFromApi("/formations");
};