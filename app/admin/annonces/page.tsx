'use client';
// ============================================================
// app/admin/annonces/page.tsx
// CRUD complet pour les Annonces et Actualités
// ============================================================
import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search, Newspaper } from 'lucide-react';
import Modal from '@/components/admin/Modal';
import ImageUploader from '@/components/admin/ImageUploader';
import { useToast } from '@/lib/context/ToastContext';
import { annoncesApi } from '@/lib/adminApi';

interface Annonce {
  id?: number;
  titre: string;
  description: string;
  image?: string | null;
}

const EMPTY: Annonce = { titre: '', description: '', image: null };

export default function AnnoncesPage() {
  const { showToast } = useToast();
  const [items, setItems] = useState<Annonce[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState<Annonce | null>(null);
  const [form, setForm] = useState<Annonce>(EMPTY);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const fetchData = async () => {
    try {
      const res = await annoncesApi.list();
      const data = res.data?.data ?? res.data;
      setItems(Array.isArray(data) ? data : []);
    } catch {
      showToast('Erreur lors du chargement des annonces', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const openModal = (item?: Annonce) => {
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
        await annoncesApi.update(editing.id, fd);
        showToast('Annonce mise à jour !', 'success');
      } else {
        await annoncesApi.create(fd);
        showToast('Annonce publiée avec succès !', 'success');
      }
      setIsModalOpen(false);
      fetchData();
    } catch (err: any) {
      showToast(err.response?.data?.message || 'Erreur lors de l\'enregistrement', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Voulez-vous vraiment supprimer cette annonce ?')) return;
    setDeletingId(id);
    try {
      await annoncesApi.delete(id);
      showToast('Annonce supprimée', 'success');
      fetchData();
    } catch {
      showToast('Impossible de supprimer cette annonce', 'error');
    } finally {
      setDeletingId(null);
    }
  };

  const filtered = items.filter(
    (a) => a.titre.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-5xl space-y-6">
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher une annonce..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-orange-500/50 transition shadow-sm"
          />
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-bold px-4 py-2.5 rounded-xl shadow-lg shadow-orange-500/20 transition text-sm"
        >
          <Plus className="w-4 h-4" />
          Publier une Annonce
        </button>
      </div>

      {loading ? (
        <div className="text-center py-16 text-gray-400">Chargement...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 space-y-3">
          <Newspaper className="w-12 h-12 text-gray-300 mx-auto" />
          <p className="text-gray-500 text-sm">Aucune annonce publiée pour le moment.</p>
          <button onClick={() => openModal()} className="text-orange-600 text-sm font-medium hover:underline">
            + Publier la première annonce
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filtered.map((item) => (
            <div key={item.id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-orange-500/20 transition-all duration-300 flex flex-col justify-between shadow-sm">
              <div>
                {item.image && (
                  <div className="h-48 bg-gray-50 overflow-hidden">
                    <img src={item.image} alt={item.titre} className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="p-5 space-y-2">
                  <h3 className="text-gray-900 font-bold text-base">{item.titre}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">{item.description}</p>
                </div>
              </div>

              <div className="p-5 pt-0 flex gap-2">
                <button
                  onClick={() => openModal(item)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900 transition text-xs font-semibold"
                >
                  <Edit2 className="w-3.5 h-3.5" /> Modifier
                </button>
                <button
                  onClick={() => item.id && handleDelete(item.id)}
                  disabled={deletingId === item.id}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-650 hover:text-red-755 transition text-xs font-semibold disabled:opacity-50"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editing ? 'Modifier l\'annonce' : 'Publier une annonce'}
        size="md"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Titre de l'annonce *</label>
            <input
              type="text"
              required
              value={form.titre}
              onChange={(e) => setForm({ ...form, titre: e.target.value })}
              placeholder="ex: Lancement de notre nouveau service digital"
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:border-orange-500/50 transition"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Description / Contenu *</label>
            <textarea
              required
              rows={5}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Rédigez le texte complet de votre annonce..."
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:border-orange-500/50 transition resize-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Illustration / Image</label>
            <ImageUploader currentImageUrl={form.image} onFileSelected={(file) => setSelectedFile(file)} label="image d'illustration" />
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
              {saving ? 'Enregistrement...' : editing ? 'Mettre à jour' : 'Publier'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
