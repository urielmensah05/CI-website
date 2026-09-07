'use client';
// ============================================================
// app/admin/dashboard/page.tsx
// Tableau de bord principal avec statistiques en temps réel
// ============================================================
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Briefcase, GraduationCap, Users, Handshake,
  Newspaper, TrendingUp, Plus, ArrowRight, Sparkles, CheckCircle2
} from 'lucide-react';
import { statsApi, servicesApi, equipeApi, partenairesApi, formationsApi } from '@/lib/adminApi';
import { INITIAL_SERVICES, INITIAL_EQUIPE, INITIAL_PARTENAIRES, INITIAL_FORMATIONS } from '@/lib/data/initialData';
import { useToast } from '@/lib/context/ToastContext';

// ── Types ──────────────────────────────────────────────────────
interface Stats {
  services: number;
  formations: number;
  equipe: number;
  partenaires: number;
  annonces: number;
}

// ── Composant Carte de statistique ─────────────────────────────
function StatCard({
  label, value, icon: Icon, href, color,
}: {
  label: string; value: number; icon: React.ElementType; href: string; color: string;
}) {
  return (
    <Link
      href={href}
      className={`group relative overflow-hidden bg-white border border-gray-200 rounded-2xl p-5 transition-all duration-300 hover:border-orange-500/30 hover:shadow-xl hover:shadow-orange-500/5 hover:-translate-y-0.5`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-150 flex items-center justify-center group-hover:border-orange-500/30 transition">
            <Icon className="w-5 h-5 text-orange-600" />
          </div>
          <TrendingUp className="w-4 h-4 text-gray-300 group-hover:text-orange-500/50 transition" />
        </div>
        <p className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-1">{label}</p>
        <p className="text-4xl font-black text-gray-900 tracking-tight">{value}</p>
      </div>
    </Link>
  );
}

// ── Page principale ────────────────────────────────────────────
export default function DashboardPage() {
  const { showToast } = useToast();
  const [stats, setStats] = useState<Stats>({ services: 0, formations: 0, equipe: 0, partenaires: 0, annonces: 0 });
  const [loading, setLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);

  const fetchStats = async () => {
    try {
      const res = await statsApi.get();
      const d = res.data?.data || res.data;
      setStats({
        services: d.services ?? 0,
        formations: d.formations ?? 0,
        equipe: d.equipe ?? 0,
        partenaires: d.partenaires ?? 0,
        annonces: d.annonces ?? 0,
      });
    } catch {
      // Silencieux si API non disponible
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  // ── Synchroniser / Initialiser toutes les données d'origine ──
  const handleSyncAllInitialData = async () => {
    setIsSyncing(true);
    let totalImported = 0;

    try {
      // 1. Services
      for (const s of INITIAL_SERVICES) {
        const fd = new FormData();
        fd.append('name', s.name);
        fd.append('description', s.description);
        if (s.icon) fd.append('icon', s.icon);
        try { await servicesApi.create(fd); totalImported++; } catch (e) { /* ignore single error */ }
      }

      // 2. Équipe
      for (const m of INITIAL_EQUIPE) {
        const fd = new FormData();
        fd.append('nom', m.nom);
        fd.append('poste', m.poste);
        try { await equipeApi.create(fd); totalImported++; } catch (e) { /* ignore single error */ }
      }

      // 3. Partenaires
      for (const p of INITIAL_PARTENAIRES) {
        const fd = new FormData();
        fd.append('nom', p.nom);
        if (p.lien) fd.append('lien', p.lien);
        try { await partenairesApi.create(fd); totalImported++; } catch (e) { /* ignore single error */ }
      }

      // 4. Formations
      for (const f of INITIAL_FORMATIONS) {
        const fd = new FormData();
        fd.append('titre', f.titre);
        fd.append('description', f.description);
        try { await formationsApi.create(fd); totalImported++; } catch (e) { /* ignore single error */ }
      }

      if (totalImported > 0) {
        showToast(`🎉 ${totalImported} éléments du site ont été importés dans votre base de données !`, 'success');
        await fetchStats();
      } else {
        showToast('Aucun élément n\'a pu être enregistré. Vérifiez que Laravel est bien lancé.', 'error');
      }
    } catch (e) {
      showToast('Erreur lors de la synchronisation', 'error');
    } finally {
      setIsSyncing(false);
    }
  };

  const isDatabaseEmpty = stats.services === 0 && stats.formations === 0 && stats.equipe === 0 && stats.partenaires === 0;

  const statCards = [
    { label: 'Services', value: stats.services, icon: Briefcase, href: '/admin/services', color: 'from-orange-500/10 to-transparent' },
    { label: 'Formations', value: stats.formations, icon: GraduationCap, href: '/admin/formations', color: 'from-orange-500/10 to-transparent' },
    { label: 'Membres équipe', value: stats.equipe, icon: Users, href: '/admin/equipe', color: 'from-orange-500/10 to-transparent' },
    { label: 'Partenaires', value: stats.partenaires, icon: Handshake, href: '/admin/partenaires', color: 'from-orange-500/10 to-transparent' },
    { label: 'Annonces', value: stats.annonces, icon: Newspaper, href: '/admin/annonces', color: 'from-orange-500/10 to-transparent' },
  ];

  const quickActions = [
    { label: 'Gérer les services', href: '/admin/services', icon: Briefcase },
    { label: 'Gérer l\'équipe', href: '/admin/equipe', icon: Users },
    { label: 'Gérer les formations', href: '/admin/formations', icon: GraduationCap },
    { label: 'Gérer les partenaires', href: '/admin/partenaires', icon: Handshake },
    { label: 'Publier une annonce', href: '/admin/annonces', icon: Newspaper },
  ];

  return (
    <div className="space-y-8 max-w-6xl">
      {/* ── Bannière de bienvenue ── */}
      <div className="relative overflow-hidden bg-gradient-to-r from-orange-50/80 via-orange-100/30 to-transparent border border-orange-200 rounded-2xl p-6">
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold text-gray-900 mb-1">
              Bienvenue, Admin 👑
            </h2>
            <p className="text-gray-600 text-sm max-w-lg">
              Gérez l&apos;ensemble du contenu de votre site depuis ce panneau. Toutes les modifications sont appliquées en direct.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleSyncAllInitialData}
              disabled={isSyncing}
              className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold px-4 py-2.5 rounded-xl shadow-lg shadow-orange-500/20 text-sm transition disabled:opacity-50"
            >
              <Sparkles className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
              {isSyncing ? 'Synchronisation...' : 'Importer les données du site'}
            </button>
          </div>
        </div>
      </div>

      {/* ── Alerte si base vide ── */}
      {!loading && isDatabaseEmpty && (
        <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="text-amber-900 font-bold text-sm flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600" />
              Vos tables sont actuellement vides
            </h4>
            <p className="text-amber-700 text-xs">
              Les données d&apos;origine du site (services, équipe, partenaires, solutions) n&apos;ont pas encore été enregistrées dans votre base. Cliquez sur le bouton pour les importer en 1 clic.
            </p>
          </div>
          <button
            onClick={handleSyncAllInitialData}
            disabled={isSyncing}
            className="shrink-0 bg-amber-600 hover:bg-amber-700 text-white font-bold px-4 py-2 rounded-xl text-xs shadow transition disabled:opacity-50"
          >
            {isSyncing ? 'Importation en cours...' : '⚡ Importer toutes les données'}
          </button>
        </div>
      )}

      {/* ── Cartes de statistiques ── */}
      <div>
        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Statistiques générales</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {statCards.map((card, i) => (
            <StatCard
              key={i}
              {...card}
              value={loading ? 0 : card.value}
            />
          ))}
        </div>
      </div>

      {/* ── Actions rapides ── */}
      <div>
        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Actions rapides</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {quickActions.map((action, i) => {
            const Icon = action.icon;
            return (
              <Link
                key={i}
                href={action.href}
                className="group flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl hover:border-orange-500/30 hover:bg-gray-50/50 transition-all duration-200 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-150 flex items-center justify-center group-hover:border-orange-500/30 transition">
                    <Icon className="w-4 h-4 text-orange-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition">
                    {action.label}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-orange-650 opacity-0 group-hover:opacity-100 transition-all translate-x-1 group-hover:translate-x-0">
                  <Plus className="w-3.5 h-3.5" />
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

