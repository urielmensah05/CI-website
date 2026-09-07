'use client';
// ============================================================
// app/admin/formations/page.tsx
// CRUD complet pour les Formations et Solutions
// ============================================================
import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search, GraduationCap, Sparkles } from 'lucide-react';
import Modal from '@/components/admin/Modal';
import ImageUploader from '@/components/admin/ImageUploader';
import { useToast } from '@/lib/context/ToastContext';
import { formationsApi } from '@/lib/adminApi';
import { INITIAL_FORMATIONS } from '@/lib/data/initialData';

interface Formation {
  id?: number;
  titre: string;
  description: string;
  image?: string | null;
}

const EMPTY: Formation = { titre: '', description: '', image: null };

export default function FormationsPage() {
  const { showToast } = useToast();
  const [items, setItems] = useState<Formation[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState<Formation | null>(null);
  const [form, setForm] = useState<Formation>(EMPTY);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [isImporting, setIsImporting] = useState(false);

  const fetchData = async () => {
    try {
      const res = await formationsApi.list();
      const data = res.data?.data ?? res.data;
      setItems(Array.isArray(data) ? data : []);
    } catch {
      showToast('Erreur lors du chargement des formations', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  // ── Importer les formations d'origine ──
  const handleImportInitialData = async () => {
    setIsImporting(true);
    let successCount = 0;
    try {
      for (const f of INITIAL_FORMATIONS) {
        const fd = new FormData();
        fd.append('titre', f.titre);
        fd.append('description', f.description);
        try {
          await formationsApi.create(fd);
          successCount++;
        } catch (e) {
          console.warn('Erreur import formation:', f.titre, e);
        }
      }
      if (successCount > 0) {
        showToast(`${successCount} formations importées avec succès !`, 'success');
        await fetchData();
      } else {
        showToast('Impossible d\'enregistrer dans l\'API.', 'error');
      }
    } catch (e) {
      showToast('Erreur lors de l\'import des formations', 'error');
    } finally {
      setIsImporting(false);
    }
  };

  const openModal = (item?: Formation) => {
    setEditing(item || null);
    setForm(item ? { ...item } : EMPTY);
    setSelectedFile(null);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const fd = new FormData();
    fd.append('titre', form.titre);
    fd.append('description', form.description);
    if (selectedFile) fd.append('image', selectedFile);

    try {
      if (editing?.id) {
        await formationsApi.update(editing.id, fd);
        showToast('Formation mise à jour !', 'success');
      } else {
        await formationsApi.create(fd);
        showToast('Formation créée !', 'success');
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
    if (!confirm('Voulez-vous vraiment supprimer cette formation ?')) return;
    setDeletingId(id);
    try {
      await formationsApi.delete(id);
      showToast('Formation supprimée', 'success');
      fetchData();
    } catch {
      showToast('Impossible de supprimer cette formation', 'error');
    } finally {
      setDeletingId(null);
    }
  };

  const filtered = items.filter(
    (f) => f.titre.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-5xl space-y-6">
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="text" placeholder="Rechercher une formation..." value={search}
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
              {isImporting ? 'Import en cours...' : 'Importer les formations du site'}
            </button>
          )}
          <button onClick={() => openModal()}
            className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-bold px-4 py-2.5 rounded-xl shadow-lg shadow-orange-500/20 transition text-sm">
            <Plus className="w-4 h-4" /> Nouvelle Formation
          </button>
        </div>
      </div>

      {/* ── Grille ── */}
      {loading ? (
        <div className="text-center py-16 text-gray-400">Chargement...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 space-y-4 max-w-md mx-auto">
          <div className="w-16 h-16 bg-orange-50 border border-orange-200 rounded-2xl flex items-center justify-center mx-auto text-orange-600">
            <GraduationCap className="w-8 h-8" />
          </div>
          <div>
            <h4 className="text-base font-bold text-gray-900">Aucune formation dans la base de données</h4>
            <p className="text-gray-500 text-sm mt-1">
              Vous pouvez importer automatiquement les 3 formations/solutions d&apos;origine pour les éditer.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 justify-center pt-2">
            <button
              onClick={handleImportInitialData}
              disabled={isImporting}
              className="flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-bold px-5 py-2.5 rounded-xl shadow-lg shadow-orange-500/25 transition text-sm disabled:opacity-50"
            >
              <Sparkles className={`w-4 h-4 ${isImporting ? 'animate-spin' : ''}`} />
              {isImporting ? 'Importation...' : 'Importer les 3 formations du site'}
            </button>
            <button
              onClick={() => openModal()}
              className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl text-sm transition"
            >
              + Créer une formation
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((item) => (
            <div key={item.id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-orange-500/20 transition-all duration-300 shadow-sm">
              <div className="relative h-40 bg-gray-50">
                {item.image ? (
                  <img src={item.image} alt={item.titre} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <GraduationCap className="w-12 h-12 text-gray-300" />
                  </div>
                )}
              </div>
              <div className="p-4 space-y-3">
                <div>
                  <h3 className="text-gray-900 font-bold text-sm leading-tight">{item.titre}</h3>
                  <p className="text-gray-500 text-xs mt-1 line-clamp-2">{item.description}</p>
                </div>
                <div className="flex gap-2 pt-2 border-t border-gray-100">
                  <button onClick={() => openModal(item)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900 transition text-xs font-semibold">
                    <Edit2 className="w-3.5 h-3.5" /> Modifier
                  </button>
                  <button onClick={() => item.id && handleDelete(item.id)} disabled={deletingId === item.id}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-650 transition text-xs font-semibold disabled:opacity-50">
                    <Trash2 className="w-3.5 h-3.5" /> Supprimer
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}
        title={editing ? 'Modifier la formation' : 'Nouvelle formation'} size="md">
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Titre *</label>
            <input type="text" required value={form.titre} onChange={(e) => setForm({ ...form, titre: e.target.value })}
              placeholder="ex: Formation en Développement Mobile"
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:border-orange-500/50 transition"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Description *</label>
            <textarea required rows={4} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Décrivez le contenu de cette formation..."
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:border-orange-500/50 transition resize-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Image de couverture</label>
            <ImageUploader currentImageUrl={form.image} onFileSelected={(file) => setSelectedFile(file)} label="image" />
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button type="button" onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-semibold transition">Annuler</button>
            <button type="submit" disabled={saving}
              className="flex items-center gap-2 px-5 py-2 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl text-sm shadow-lg shadow-orange-500/20 transition disabled:opacity-60">
              {saving && <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
              {saving ? 'Enregistrement...' : editing ? 'Mettre à jour' : 'Créer la formation'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
