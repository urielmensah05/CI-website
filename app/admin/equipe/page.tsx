'use client';
// ============================================================
// app/admin/equipe/page.tsx
// CRUD complet pour les membres de l'Équipe avec upload de photo
// ============================================================
import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search, Users, UserCircle, Sparkles } from 'lucide-react';
import Modal from '@/components/admin/Modal';
import ImageUploader from '@/components/admin/ImageUploader';
import { useToast } from '@/lib/context/ToastContext';
import { equipeApi } from '@/lib/adminApi';
import { INITIAL_EQUIPE } from '@/lib/data/initialData';

interface Member {
  id?: number;
  nom: string;
  poste: string;
  photo?: string | null;
}

const EMPTY: Member = { nom: '', poste: '', photo: null };

export default function EquipePage() {
  const { showToast } = useToast();
  const [items, setItems] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState<Member | null>(null);
  const [form, setForm] = useState<Member>(EMPTY);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [isImporting, setIsImporting] = useState(false);

  const fetchData = async () => {
    try {
      const res = await equipeApi.list();
      const data = res.data?.data ?? res.data;
      setItems(Array.isArray(data) ? data : []);
    } catch {
      showToast('Erreur lors du chargement de l\'équipe', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  // ── Importer les membres d'origine ──
  const handleImportInitialData = async () => {
    setIsImporting(true);
    let successCount = 0;
    try {
      for (const m of INITIAL_EQUIPE) {
        const fd = new FormData();
        fd.append('nom', m.nom);
        fd.append('poste', m.poste);
        try {
          await equipeApi.create(fd);
          successCount++;
        } catch (e) {
          console.warn('Erreur import membre:', m.nom, e);
        }
      }
      if (successCount > 0) {
        showToast(`${successCount} membres d'équipe importés avec succès !`, 'success');
        await fetchData();
      } else {
        showToast('Impossible d\'enregistrer dans l\'API.', 'error');
      }
    } catch (e) {
      showToast('Erreur lors de l\'import des données initiales', 'error');
    } finally {
      setIsImporting(false);
    }
  };

  const openModal = (item?: Member) => {
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
    fd.append('poste', form.poste);
    if (selectedFile) fd.append('photo', selectedFile);

    try {
      if (editing?.id) {
        await equipeApi.update(editing.id, fd);
        showToast('Membre modifié avec succès !', 'success');
      } else {
        await equipeApi.create(fd);
        showToast('Membre ajouté à l\'équipe !', 'success');
      }
      setIsModalOpen(false);
      fetchData();
    } catch (err: any) {
      const msg = err.response?.data?.message || err.response?.data?.error || 'Erreur lors de l\'enregistrement';
      showToast(msg, 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Voulez-vous vraiment supprimer ce membre ?')) return;
    setDeletingId(id);
    try {
      await equipeApi.delete(id);
      showToast('Membre supprimé', 'success');
      fetchData();
    } catch {
      showToast('Impossible de supprimer ce membre', 'error');
    } finally {
      setDeletingId(null);
    }
  };

  const filtered = items.filter(
    (m) =>
      m.nom.toLowerCase().includes(search.toLowerCase()) ||
      m.poste.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-5xl space-y-6">
      {/* ── Barre d'actions ── */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher par nom ou poste..."
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
              {isImporting ? 'Import en cours...' : 'Importer l\'équipe du site'}
            </button>
          )}
          <button
            onClick={() => openModal()}
            className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-bold px-4 py-2.5 rounded-xl shadow-lg shadow-orange-500/20 transition text-sm"
          >
            <Plus className="w-4 h-4" />
            Nouveau Membre
          </button>
        </div>
      </div>

      {/* ── Grille de cartes ── */}
      {loading ? (
        <div className="text-center py-16 text-gray-400">Chargement...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 space-y-4 max-w-md mx-auto">
          <div className="w-16 h-16 bg-orange-50 border border-orange-200 rounded-2xl flex items-center justify-center mx-auto text-orange-600">
            <Users className="w-8 h-8" />
          </div>
          <div>
            <h4 className="text-base font-bold text-gray-900">Aucun membre dans la base de données</h4>
            <p className="text-gray-500 text-sm mt-1">
              Vous pouvez importer les 3 membres d&apos;origine du site pour pouvoir les éditer ici.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 justify-center pt-2">
            <button
              onClick={handleImportInitialData}
              disabled={isImporting}
              className="flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-bold px-5 py-2.5 rounded-xl shadow-lg shadow-orange-500/25 transition text-sm disabled:opacity-50"
            >
              <Sparkles className={`w-4 h-4 ${isImporting ? 'animate-spin' : ''}`} />
              {isImporting ? 'Importation...' : 'Importer les 3 membres du site'}
            </button>
            <button
              onClick={() => openModal()}
              className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl text-sm transition"
            >
              + Ajouter un membre
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((member) => (
            <div
              key={member.id}
              className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-orange-500/20 transition-all duration-300 shadow-sm"
            >
              {/* Photo */}
              <div className="relative h-48 bg-gray-50">
                {member.photo ? (
                  <img
                    src={member.photo}
                    alt={member.nom}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <UserCircle className="w-20 h-20 text-gray-300" />
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-4 space-y-3">
                <div>
                  <h3 className="text-gray-900 font-bold text-base leading-tight">{member.nom}</h3>
                  <p className="text-orange-600/80 text-xs font-semibold uppercase tracking-wider mt-0.5">{member.poste}</p>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2 border-t border-gray-100">
                  <button
                    onClick={() => openModal(member)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900 transition text-xs font-semibold"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    Modifier
                  </button>
                  <button
                    onClick={() => member.id && handleDelete(member.id)}
                    disabled={deletingId === member.id}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-650 transition text-xs font-semibold disabled:opacity-50"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Modale de formulaire ── */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editing ? 'Modifier le membre' : 'Ajouter un membre'}
        size="md"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
              Nom complet *
            </label>
            <input
              type="text"
              required
              value={form.nom}
              onChange={(e) => setForm({ ...form, nom: e.target.value })}
              placeholder="ex: Dr. Jean Dupont"
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:border-orange-500/50 transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
              Poste / Rôle *
            </label>
            <input
              type="text"
              required
              value={form.poste}
              onChange={(e) => setForm({ ...form, poste: e.target.value })}
              placeholder="ex: Directeur Technique"
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:border-orange-500/50 transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
              Photo de profil
            </label>
            <ImageUploader
              currentImageUrl={form.photo}
              onFileSelected={(file) => setSelectedFile(file)}
              label="photo de profil"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-750 rounded-xl text-sm font-semibold transition"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-5 py-2 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl text-sm shadow-lg shadow-orange-500/20 transition disabled:opacity-60"
            >
              {saving && <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
              {saving ? 'Enregistrement...' : editing ? 'Mettre à jour' : 'Ajouter le membre'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
