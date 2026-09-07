'use client';
// ============================================================
// app/admin/partenaires/page.tsx
// CRUD complet pour les Partenaires avec upload de logo
// ============================================================
import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search, Handshake, Link2, Sparkles } from 'lucide-react';
import Modal from '@/components/admin/Modal';
import ImageUploader from '@/components/admin/ImageUploader';
import { useToast } from '@/lib/context/ToastContext';
import { partenairesApi } from '@/lib/adminApi';
import { INITIAL_PARTENAIRES } from '@/lib/data/initialData';

interface Partenaire {
  id?: number;
  nom: string;
  lien?: string;
  logo?: string | null;
}

const EMPTY: Partenaire = { nom: '', lien: '', logo: null };

export default function PartenairesPage() {
  const { showToast } = useToast();
  const [items, setItems] = useState<Partenaire[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState<Partenaire | null>(null);
  const [form, setForm] = useState<Partenaire>(EMPTY);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [isImporting, setIsImporting] = useState(false);

  const fetchData = async () => {
    try {
      const res = await partenairesApi.list();
      const data = res.data?.data ?? res.data;
      setItems(Array.isArray(data) ? data : []);
    } catch {
      showToast('Erreur lors du chargement des partenaires', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  // ── Importer les partenaires d'origine ──
  const handleImportInitialData = async () => {
    setIsImporting(true);
    let successCount = 0;
    try {
      for (const p of INITIAL_PARTENAIRES) {
        const fd = new FormData();
        fd.append('nom', p.nom);
        if (p.lien) fd.append('lien', p.lien);
        try {
          await partenairesApi.create(fd);
          successCount++;
        } catch (e) {
          console.warn('Erreur import partenaire:', p.nom, e);
        }
      }
      if (successCount > 0) {
        showToast(`${successCount} partenaires importés avec succès !`, 'success');
        await fetchData();
      } else {
        showToast('Impossible d\'enregistrer dans l\'API.', 'error');
      }
    } catch (e) {
      showToast('Erreur lors de l\'import des partenaires', 'error');
    } finally {
      setIsImporting(false);
    }
  };

  const openModal = (item?: Partenaire) => {
    setEditing(item || null);
    setForm(item ? { ...item } : EMPTY);
    setSelectedFile(null);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const fd = new FormData();
    fd.append('nom', form.nom);
    if (form.lien) fd.append('lien', form.lien);
    if (selectedFile) fd.append('logo', selectedFile);

    try {
      if (editing?.id) {
        await partenairesApi.update(editing.id, fd);
        showToast('Partenaire mis à jour !', 'success');
      } else {
        await partenairesApi.create(fd);
        showToast('Partenaire ajouté !', 'success');
      }
      setIsModalOpen(false);
      fetchData();
    } catch (err: any) {
      showToast(err.response?.data?.error || 'Erreur lors de l\'enregistrement', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Voulez-vous vraiment supprimer ce partenaire ?')) return;
    setDeletingId(id);
    try {
      await partenairesApi.delete(id);
      showToast('Partenaire supprimé', 'success');
      fetchData();
    } catch {
      showToast('Impossible de supprimer ce partenaire', 'error');
    } finally {
      setDeletingId(null);
    }
  };

  const filtered = items.filter(
    (p) => p.nom.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-5xl space-y-6">
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="text" placeholder="Rechercher un partenaire..." value={search}
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
              {isImporting ? 'Import en cours...' : 'Importer les partenaires du site'}
            </button>
          )}
          <button onClick={() => openModal()}
            className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-bold px-4 py-2.5 rounded-xl shadow-lg shadow-orange-500/20 transition text-sm">
            <Plus className="w-4 h-4" /> Ajouter un Partenaire
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-16 text-gray-400">Chargement...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 space-y-4 max-w-md mx-auto">
          <div className="w-16 h-16 bg-orange-50 border border-orange-200 rounded-2xl flex items-center justify-center mx-auto text-orange-600">
            <Handshake className="w-8 h-8" />
          </div>
          <div>
            <h4 className="text-base font-bold text-gray-900">Aucun partenaire dans la base de données</h4>
            <p className="text-gray-500 text-sm mt-1">
              Vous pouvez importer automatiquement les 3 partenaires d&apos;origine du site pour les administrer.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 justify-center pt-2">
            <button
              onClick={handleImportInitialData}
              disabled={isImporting}
              className="flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-bold px-5 py-2.5 rounded-xl shadow-lg shadow-orange-500/25 transition text-sm disabled:opacity-50"
            >
              <Sparkles className={`w-4 h-4 ${isImporting ? 'animate-spin' : ''}`} />
              {isImporting ? 'Importation...' : 'Importer les 3 partenaires du site'}
            </button>
            <button
              onClick={() => openModal()}
              className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl text-sm transition"
            >
              + Ajouter un partenaire
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((item) => (
            <div key={item.id}
              className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-orange-500/20 transition-all duration-300 flex flex-col shadow-sm">
              {/* Logo */}
              <div className="h-32 bg-gray-50 flex items-center justify-center p-4">
                {item.logo ? (
                  <img src={item.logo} alt={item.nom} className="max-h-full max-w-full object-contain" />
                ) : (
                  <Handshake className="w-10 h-10 text-gray-300" />
                )}
              </div>

              <div className="p-3 flex flex-col gap-2 flex-1">
                <div>
                  <p className="text-gray-900 font-bold text-sm truncate">{item.nom}</p>
                  {item.lien && (
                    <a href={item.lien} target="_blank" rel="noreferrer"
                      className="flex items-center gap-1 text-orange-600/70 hover:text-orange-600 text-xs mt-0.5 truncate transition">
                      <Link2 className="w-3 h-3 shrink-0" />
                      {item.lien}
                    </a>
                  )}
                </div>
                <div className="flex gap-1.5 mt-auto">
                  <button onClick={() => openModal(item)}
                    className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900 transition text-xs font-semibold">
                    <Edit2 className="w-3 h-3" /> Modifier
                  </button>
                  <button onClick={() => item.id && handleDelete(item.id)} disabled={deletingId === item.id}
                    className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-650 transition disabled:opacity-50">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}
        title={editing ? 'Modifier le partenaire' : 'Ajouter un partenaire'} size="md">
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Nom du partenaire *</label>
            <input type="text" required value={form.nom} onChange={(e) => setForm({ ...form, nom: e.target.value })}
              placeholder="ex: Orange Côte d'Ivoire"
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:border-orange-500/50 transition"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Site web</label>
            <input type="url" value={form.lien || ''} onChange={(e) => setForm({ ...form, lien: e.target.value })}
              placeholder="https://www.partenaire.ci"
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:border-orange-500/50 transition"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Logo</label>
            <ImageUploader currentImageUrl={form.logo} onFileSelected={(file) => setSelectedFile(file)} label="logo" accept="image/*" />
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button type="button" onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-semibold transition">Annuler</button>
            <button type="submit" disabled={saving}
              className="flex items-center gap-2 px-5 py-2 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl text-sm shadow-lg shadow-orange-500/20 transition disabled:opacity-60">
              {saving && <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
              {saving ? 'Enregistrement...' : editing ? 'Mettre à jour' : 'Ajouter'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
