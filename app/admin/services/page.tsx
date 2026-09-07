'use client';
// ============================================================
// app/admin/services/page.tsx
// CRUD complet pour les Services
// ============================================================
import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search, Briefcase, Sparkles, RefreshCw } from 'lucide-react';
import Modal from '@/components/admin/Modal';
import { useToast } from '@/lib/context/ToastContext';
import { servicesApi } from '@/lib/adminApi';
import { INITIAL_SERVICES } from '@/lib/data/initialData';

interface Service {
  id?: number;
  name: string;
  description: string;
  icon?: string;
}

const EMPTY: Service = { name: '', description: '', icon: '' };

export default function ServicesPage() {
  const { showToast } = useToast();
  const [items, setItems] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState<Service | null>(null);
  const [form, setForm] = useState<Service>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [isImporting, setIsImporting] = useState(false);

  // ── Chargement des données ──
  const fetchData = async () => {
    try {
      const res = await servicesApi.list();
      const data = res.data?.data ?? res.data;
      setItems(Array.isArray(data) ? data : []);
    } catch {
      showToast('Erreur lors du chargement des services', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  // ── Importer les services d'origine ──
  const handleImportInitialData = async () => {
    setIsImporting(true);
    let successCount = 0;
    try {
      for (const svc of INITIAL_SERVICES) {
        const fd = new FormData();
        fd.append('name', svc.name);
        fd.append('description', svc.description);
        if (svc.icon) fd.append('icon', svc.icon);
        try {
          await servicesApi.create(fd);
          successCount++;
        } catch (e) {
          console.warn('Erreur import service:', svc.name, e);
        }
      }
      if (successCount > 0) {
        showToast(`${successCount} services initiaux importés avec succès !`, 'success');
        await fetchData();
      } else {
        showToast('Impossible d\'enregistrer dans l\'API. Vérifiez la connexion backend.', 'error');
      }
    } catch (e) {
      showToast('Erreur lors de l\'import des données initiales', 'error');
    } finally {
      setIsImporting(false);
    }
  };

  // ── Ouvrir la modale ──
  const openModal = (item?: Service) => {
    setEditing(item || null);
    setForm(item ? { ...item } : EMPTY);
    setIsModalOpen(true);
  };

  // ── Enregistrement (Créer ou Modifier) ──
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const fd = new FormData();
    fd.append('name', form.name);
    fd.append('description', form.description);
    if (form.icon) fd.append('icon', form.icon);

    try {
      if (editing?.id) {
        await servicesApi.update(editing.id, fd);
        showToast('Service modifié avec succès !', 'success');
      } else {
        await servicesApi.create(fd);
        showToast('Service créé avec succès !', 'success');
      }
      setIsModalOpen(false);
      fetchData();
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Erreur lors de l\'enregistrement';
      showToast(msg, 'error');
    } finally {
      setSaving(false);
    }
  };

  // ── Suppression ──
  const handleDelete = async (id: number) => {
    if (!confirm('Voulez-vous vraiment supprimer ce service ?')) return;
    setDeletingId(id);
    try {
      await servicesApi.delete(id);
      showToast('Service supprimé', 'success');
      fetchData();
    } catch {
      showToast('Impossible de supprimer ce service', 'error');
    } finally {
      setDeletingId(null);
    }
  };

  const filtered = items.filter(
    (s) => s.name.toLowerCase().includes(search.toLowerCase()) ||
           s.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-5xl space-y-6">
      {/* ── Barre d'actions ── */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher un service..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-orange-500/50 transition shadow-sm"
          />
        </div>
        <div className="flex items-center gap-2">
          {items.length === 0 && !loading && (
            <button
              onClick={handleImportInitialData}
              disabled={isImporting}
              className="flex items-center gap-2 bg-orange-50 hover:bg-orange-100 text-orange-700 font-semibold px-4 py-2.5 rounded-xl border border-orange-200 transition text-sm disabled:opacity-50"
            >
              <Sparkles className={`w-4 h-4 text-orange-600 ${isImporting ? 'animate-spin' : ''}`} />
              {isImporting ? 'Import en cours...' : 'Importer les services du site'}
            </button>
          )}
          <button
            onClick={() => openModal()}
            className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-bold px-4 py-2.5 rounded-xl shadow-lg shadow-orange-500/20 transition text-sm"
          >
            <Plus className="w-4 h-4" />
            Nouveau Service
          </button>
        </div>
      </div>

      {/* ── Tableau ── */}
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
        {loading ? (
          <div className="p-12 text-center text-gray-400">Chargement...</div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center space-y-4 max-w-md mx-auto">
            <div className="w-16 h-16 bg-orange-50 border border-orange-200 rounded-2xl flex items-center justify-center mx-auto text-orange-600">
              <Briefcase className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-base font-bold text-gray-900">Aucun service dans la base de données</h4>
              <p className="text-gray-500 text-sm mt-1">
                Vous pouvez importer automatiquement les services d&apos;origine du site pour les modifier ici, ou en créer un nouveau.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 justify-center pt-2">
              <button
                onClick={handleImportInitialData}
                disabled={isImporting}
                className="flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-bold px-5 py-2.5 rounded-xl shadow-lg shadow-orange-500/25 transition text-sm disabled:opacity-50"
              >
                <Sparkles className={`w-4 h-4 ${isImporting ? 'animate-spin' : ''}`} />
                {isImporting ? 'Importation...' : 'Importer les 5 services du site'}
              </button>
              <button
                onClick={() => openModal()}
                className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl text-sm transition"
              >
                + Créer un service personnalisé
              </button>
            </div>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50/50">
                <th className="px-6 py-3.5 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">#</th>
                <th className="px-6 py-3.5 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Nom</th>
                <th className="px-6 py-3.5 text-left text-xs font-bold text-gray-400 uppercase tracking-wider hidden md:table-cell">Description</th>
                <th className="px-6 py-3.5 text-left text-xs font-bold text-gray-400 uppercase tracking-wider hidden sm:table-cell">Icône</th>
                <th className="px-6 py-3.5 text-right text-xs font-bold text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((item, idx) => (
                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 text-gray-400 text-sm">{idx + 1}</td>
                  <td className="px-6 py-4">
                    <span className="text-gray-900 font-semibold text-sm">{item.name}</span>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <p className="text-gray-600 text-sm line-clamp-2 max-w-xs">{item.description}</p>
                  </td>
                  <td className="px-6 py-4 hidden sm:table-cell">
                    <span className="text-gray-500 text-sm font-mono">{item.icon || '—'}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openModal(item)}
                        className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-900 transition"
                        title="Modifier"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => item.id && handleDelete(item.id)}
                        disabled={deletingId === item.id}
                        className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-650 transition disabled:opacity-50"
                        title="Supprimer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* ── Modale de formulaire ── */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editing ? 'Modifier le service' : 'Créer un service'}
        size="md"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
              Nom du service *
            </label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="ex: Développement Web"
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:border-orange-500/50 transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
              Description *
            </label>
            <textarea
              required
              rows={4}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Décrivez ce service en quelques phrases..."
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:border-orange-500/50 transition resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
              Icône (nom Lucide, ex: Globe)
            </label>
            <input
              type="text"
              value={form.icon || ''}
              onChange={(e) => setForm({ ...form, icon: e.target.value })}
              placeholder="Globe, Code2, BarChart3..."
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:border-orange-500/50 transition"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-semibold transition"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-5 py-2 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl text-sm shadow-lg shadow-orange-500/20 transition disabled:opacity-60"
            >
              {saving && <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
              {saving ? 'Enregistrement...' : editing ? 'Mettre à jour' : 'Créer le service'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
