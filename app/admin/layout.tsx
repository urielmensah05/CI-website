'use client';
// ============================================================
// app/admin/layout.tsx
// Layout isolé pour tout l'espace admin
// ⚠️ Ce layout remplace complètement le layout public (sans Navbar/Footer)
// ============================================================
import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Sidebar from '@/components/admin/Sidebar';
import Header from '@/components/admin/Header';
import { ToastProvider } from '@/lib/context/ToastContext';
import { authApi } from '@/lib/adminApi';

// Titres des pages selon la route active
const pageTitles: Record<string, { title: string; subtitle: string }> = {
  '/admin/dashboard': { title: 'Tableau de bord', subtitle: 'Vue d\'ensemble de votre site' },
  '/admin/services': { title: 'Gestion des Services', subtitle: 'Créer, modifier et supprimer des services' },
  '/admin/formations': { title: 'Formations & Solutions', subtitle: 'Gérer vos offres de formation' },
  '/admin/equipe': { title: 'Équipe & Bios', subtitle: 'Membres de l\'équipe et biographies' },
  '/admin/partenaires': { title: 'Partenaires', subtitle: 'Logos et liens de vos partenaires' },
  '/admin/annonces': { title: 'Annonces & Actualités', subtitle: 'Publier et gérer les actualités' },
};

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [userName, setUserName] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  const isLoginPage = pathname === '/admin/login';

  // ── Vérification d'authentification (AuthGuard) ────────────
  useEffect(() => {
    if (isLoginPage) {
      setIsLoading(false);
      return;
    }

    const token = localStorage.getItem('admin_token');
    const user = localStorage.getItem('admin_user');

    if (!token) {
      router.replace('/admin/login');
      return;
    }

    if (user) {
      try {
        const parsed = JSON.parse(user);
        setUserName(parsed.name || parsed.email || 'Admin');
      } catch {
        setUserName('Admin');
      }
    }
    setIsLoading(false);
  }, [pathname, isLoginPage, router]);

  const handleLogout = async () => {
    try {
      await authApi.logout();
    } catch {
      // Toujours déconnecter localement même si l'API échoue
    } finally {
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_user');
      router.push('/admin/login');
    }
  };

  // Sur la page de login : afficher uniquement le composant login (sans Sidebar / Header)
  if (isLoginPage) {
    return <>{children}</>;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 mx-auto animate-pulse"></div>
          <p className="text-gray-500 text-sm">Vérification de session...</p>
        </div>
      </div>
    );
  }

  const currentPage = pageTitles[pathname] || { title: 'Admin', subtitle: '' };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* ── Sidebar ── */}
      <Sidebar onLogout={handleLogout} userName={userName} />

      {/* ── Zone principale ── */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header title={currentPage.title} subtitle={currentPage.subtitle} />

        {/* Contenu de la page */}
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <AdminLayoutContent>
        {children}
      </AdminLayoutContent>
    </ToastProvider>
  );
}
