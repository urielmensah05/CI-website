// ============================================================
// lib/adminApi.ts
// Client Axios configuré pour l'API Admin Laravel
// Ce fichier centralise TOUS les appels API de l'admin
// ============================================================

import axios from 'axios';

// L'URL de base de l'API Laravel (configurée dans .env.local)
const LARAVEL_URL = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api').replace(/\/$/, '');

// ── Création de l'instance Axios ──────────────────────────────
export const adminApi = axios.create({
  baseURL: LARAVEL_URL,
  headers: {
    Accept: 'application/json',
  },
});

// ── Intercepteur REQUEST : attache le token Bearer à chaque requête ──
adminApi.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('admin_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// ── Intercepteur RESPONSE : redirige vers /admin/login si le token expire (401) ──
adminApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== 'undefined') {
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_user');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

// ============================================================
// AUTH
// ============================================================
export const authApi = {
  login: (email: string, password: string) =>
    adminApi.post('/login', { email, password }),
  logout: () =>
    adminApi.post('/logout'),
  me: () =>
    adminApi.get('/me'),
  changePassword: (current_password: string, new_password: string, new_password_confirmation: string) =>
    adminApi.post('/change-password', { current_password, new_password, new_password_confirmation }),
};

// ============================================================
// STATISTIQUES
// ============================================================
export const statsApi = {
  get: () => adminApi.get('/stats'),
};

// ============================================================
// SERVICES
// ============================================================
export const servicesApi = {
  list: () => adminApi.get('/services'),
  create: (data: FormData) =>
    adminApi.post('/services', data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  update: (id: number, data: FormData) =>
    adminApi.post(`/services/${id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  delete: (id: number) => adminApi.delete(`/services/${id}`),
};

// ============================================================
// ÉQUIPE
// ============================================================
export const equipeApi = {
  list: async () => {
    try {
      return await adminApi.get('/equipes');
    } catch (e: any) {
      if (e.response?.status === 404) return await adminApi.get('/equipe');
      throw e;
    }
  },
  create: async (data: FormData) => {
    try {
      return await adminApi.post('/equipes', data, { headers: { 'Content-Type': 'multipart/form-data' } });
    } catch (e: any) {
      if (e.response?.status === 404) {
        return await adminApi.post('/equipe', data, { headers: { 'Content-Type': 'multipart/form-data' } });
      }
      throw e;
    }
  },
  update: async (id: number, data: FormData) => {
    try {
      return await adminApi.post(`/equipes/${id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } });
    } catch (e: any) {
      if (e.response?.status === 404) {
        return await adminApi.post(`/equipe/${id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } });
      }
      throw e;
    }
  },
  delete: async (id: number) => {
    try {
      return await adminApi.delete(`/equipes/${id}`);
    } catch (e: any) {
      if (e.response?.status === 404) return await adminApi.delete(`/equipe/${id}`);
      throw e;
    }
  },
};

// ============================================================
// FORMATIONS / SOLUTIONS
// ============================================================
export const formationsApi = {
  list: async () => {
    try {
      return await adminApi.get('/formations');
    } catch (e: any) {
      if (e.response?.status === 404) return await adminApi.get('/solutions');
      throw e;
    }
  },
  create: async (data: FormData) => {
    try {
      return await adminApi.post('/formations', data, { headers: { 'Content-Type': 'multipart/form-data' } });
    } catch (e: any) {
      if (e.response?.status === 404) {
        return await adminApi.post('/solutions', data, { headers: { 'Content-Type': 'multipart/form-data' } });
      }
      throw e;
    }
  },
  update: async (id: number, data: FormData) => {
    try {
      return await adminApi.post(`/formations/${id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } });
    } catch (e: any) {
      if (e.response?.status === 404) {
        return await adminApi.post(`/solutions/${id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } });
      }
      throw e;
    }
  },
  delete: async (id: number) => {
    try {
      return await adminApi.delete(`/formations/${id}`);
    } catch (e: any) {
      if (e.response?.status === 404) return await adminApi.delete(`/solutions/${id}`);
      throw e;
    }
  },
};

// ============================================================
// PARTENAIRES
// ============================================================
export const partenairesApi = {
  list: async () => {
    try {
      return await adminApi.get('/partenaires');
    } catch (e: any) {
      if (e.response?.status === 404) return await adminApi.get('/partenaire');
      throw e;
    }
  },
  create: async (data: FormData) => {
    try {
      return await adminApi.post('/partenaires', data, { headers: { 'Content-Type': 'multipart/form-data' } });
    } catch (e: any) {
      if (e.response?.status === 404) {
        return await adminApi.post('/partenaire', data, { headers: { 'Content-Type': 'multipart/form-data' } });
      }
      throw e;
    }
  },
  update: async (id: number, data: FormData) => {
    try {
      return await adminApi.post(`/partenaires/${id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } });
    } catch (e: any) {
      if (e.response?.status === 404) {
        return await adminApi.post(`/partenaire/${id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } });
      }
      throw e;
    }
  },
  delete: async (id: number) => {
    try {
      return await adminApi.delete(`/partenaires/${id}`);
    } catch (e: any) {
      if (e.response?.status === 404) return await adminApi.delete(`/partenaire/${id}`);
      throw e;
    }
  },
};

// ============================================================
// ANNONCES / ACTUALITÉS
// ============================================================
export const annoncesApi = {
  list: () => adminApi.get('/annonces'),
  create: (data: FormData) =>
    adminApi.post('/annonces', data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  update: (id: number, data: FormData) =>
    adminApi.post(`/annonces/${id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  delete: (id: number) => adminApi.delete(`/annonces/${id}`),
};

// ============================================================
// TEXTES DU SITE — Gestion des textes éditables
// ============================================================
export const siteTextesApi = {
  list: () => adminApi.get('/site-textes'),
  upsert: (data: { cle: string; valeur: string; section?: string }) =>
    adminApi.post('/site-textes', data),
  bulkUpsert: (textes: { cle: string; valeur: string; section?: string }[]) =>
    adminApi.post('/site-textes/bulk', { textes }),
  delete: (id: number) => adminApi.delete(`/site-textes/${id}`),
};

