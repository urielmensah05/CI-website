'use client';
// ============================================================
// app/admin/textes/page.tsx
// Gestion des textes éditables du site (Hero, Sections, Contact…)
// ============================================================
import React, { useState, useEffect, useCallback } from 'react';
import {
  Save, RotateCcw, FileText, ChevronDown, ChevronRight,
  Type, AlignLeft, Search, Check, Loader2, Plus, Trash2, Edit2, X,
} from 'lucide-react';
import Modal from '@/components/admin/Modal';
import { useToast } from '@/lib/context/ToastContext';
import { siteTextesApi } from '@/lib/adminApi';

// ── Types ──────────────────────────────────────────────────────
interface SiteTexte {
  id?: number;
  cle: string;
  valeur: string;
  section: string;
}

// ── Textes par défaut du site (ceux codés en dur dans la page d'accueil) ──
const DEFAULT_TEXTES: Omit<SiteTexte, 'id'>[] = [
  // Hero
  { cle: 'hero_titre', valeur: 'Donner du sens à vos innovations', section: 'hero' },
  { cle: 'hero_description', valeur: 'Central Innovation Plus accompagne les entreprises et les talents dans la transformation digitale.', section: 'hero' },
  { cle: 'hero_bouton', valeur: 'Découvrir nos services', section: 'hero' },

  // Services
  { cle: 'services_titre', valeur: 'Nos services', section: 'services' },
  { cle: 'services_description', valeur: 'Chez CENTRAL INNOVATION PLUS, nous comprenons que chaque projet est unique. Que vous recherchiez des solutions digitales innovantes, une logistique efficace, des opportunités immobilières exceptionnelles ou des services de santé de pointe, nous nous engageons à dépasser vos attentes.', section: 'services' },
  { cle: 'services_cta', valeur: 'Discutons de votre projet', section: 'services' },

  // Solutions
  { cle: 'solutions_titre', valeur: 'Nos solutions', section: 'solutions' },
  { cle: 'solutions_description', valeur: "Des formations pratiques pour acquérir les compétences du numérique d'aujourd'hui.", section: 'solutions' },

  // Équipe
  { cle: 'equipe_titre', valeur: 'Notre équipe', section: 'equipe' },
  { cle: 'equipe_description', valeur: "Nous sommes des jeunes Cadres et Entrepreneurs Ivoiriens, tous diplômés et forts d'expériences professionnelles diverses.", section: 'equipe' },

  // Contact
  { cle: 'contact_titre', valeur: 'Nous contacter', section: 'contact' },
  { cle: 'contact_description', valeur: 'Une équipe prête à vous répondre dans les plus brefs délais.', section: 'contact' },
  { cle: 'contact_adresse', valeur: 'Imm. Riviera palmeraie, face Paris baguette, 2e étage, Cocody', section: 'contact' },
  { cle: 'contact_telephones', valeur: '(+225) 27 00 00 00 01\n(+225) 01 01 43 76 78\n(+225) 07 07 48 27 52', section: 'contact' },
  { cle: 'contact_emails', valeur: 'recrutement@ci-plus.ci\netudes@plus.ci\ninfo@ci-plus.ci', section: 'contact' },

  // Partenaires
  { cle: 'partenaires_titre', valeur: 'Nos Partenaires', section: 'partenaires' },
];

// ── Labels lisibles pour les sections ──
const SECTION_LABELS: Record<string, { label: string; description: string }> = {
  hero: { label: '🏠 Page d\'accueil (Hero)', description: 'Titre principal, sous-titre et bouton d\'action du haut de page' },
  services: { label: '💼 Nos Services', description: 'Titre, description et bouton de la section services' },
  solutions: { label: '🎓 Nos Solutions', description: 'Titre et description de la section formations/solutions' },
  equipe: { label: '👥 Notre Équipe', description: 'Titre et description de la section équipe' },
  contact: { label: '📞 Contact', description: 'Informations de contact : adresse, téléphones, emails' },
  partenaires: { label: '🤝 Partenaires', description: 'Titre de la section partenaires' },
  personnalise: { label: '✏️ Textes personnalisés', description: 'Vos textes personnalisés ajoutés manuellement' },
};

// ── Labels lisibles pour les clés ──
const CLE_LABELS: Record<string, string> = {
  hero_titre: 'Titre principal',
  hero_description: 'Sous-titre / Description',
  hero_bouton: 'Texte du bouton',
  services_titre: 'Titre de la section',
  services_description: 'Description de la section',
  services_cta: 'Texte du bouton d\'action',
  solutions_titre: 'Titre de la section',
  solutions_description: 'Description de la section',
  equipe_titre: 'Titre de la section',
  equipe_description: 'Description de la section',
  contact_titre: 'Titre de la section',
  contact_description: 'Description de la section',
  contact_adresse: 'Adresse postale',
  contact_telephones: 'Numéros de téléphone',
  contact_emails: 'Adresses email',
  partenaires_titre: 'Titre de la section',
};

export default function TextesPage() {
  const { showToast } = useToast();
  const [textes, setTextes] = useState<SiteTexte[]>([]);
  const [original, setOriginal] = useState<SiteTexte[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState('');
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['hero', 'services', 'solutions', 'equipe', 'contact', 'partenaires']));
  const [editingField, setEditingField] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTexte, setNewTexte] = useState({ cle: '', valeur: '', section: 'personnalise' });

  // ── Chargement des textes ──
  const fetchData = useCallback(async () => {
    try {
      const res = await siteTextesApi.list();
      const data: SiteTexte[] = Array.isArray(res.data) ? res.data : (res.data?.data ?? []);

      // Fusionner avec les valeurs par défaut
      const existingKeys = new Set(data.map((t: SiteTexte) => t.cle));
      const merged: SiteTexte[] = [...data];

      // Ajouter les textes par défaut qui n'existent pas encore en BDD
      for (const def of DEFAULT_TEXTES) {
        if (!existingKeys.has(def.cle)) {
          merged.push({ ...def });
        }
      }

      setTextes(merged);
      setOriginal(JSON.parse(JSON.stringify(merged)));
    } catch {
      showToast('Erreur lors du chargement des textes', 'error');
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => { fetchData(); }, [fetchData]);

  // ── Détecter les modifications ──
  const hasChanges = (): boolean => {
    return JSON.stringify(textes) !== JSON.stringify(original);
  };

  // ── Mise à jour locale d'un texte ──
  const updateTexte = (cle: string, valeur: string) => {
    setTextes(prev =>
      prev.map(t => t.cle === cle ? { ...t, valeur } : t)
    );
  };

  // ── Sauvegarder toutes les modifications ──
  const handleSaveAll = async () => {
    setSaving(true);
    try {
      const modified = textes.filter((t, i) => {
        const orig = original.find(o => o.cle === t.cle);
        return !orig || orig.valeur !== t.valeur;
      });

      if (modified.length === 0) {
        showToast('Aucune modification à sauvegarder', 'info');
        setSaving(false);
        return;
      }

      await siteTextesApi.bulkUpsert(
        modified.map(t => ({
          cle: t.cle,
          valeur: t.valeur,
          section: t.section,
        }))
      );

      showToast(`${modified.length} texte(s) mis à jour avec succès !`, 'success');
      fetchData(); // Recharger pour synchroniser
    } catch {
      showToast('Erreur lors de la sauvegarde', 'error');
    } finally {
      setSaving(false);
    }
  };

  // ── Réinitialiser les modifications ──
  const handleReset = () => {
    setTextes(JSON.parse(JSON.stringify(original)));
    showToast('Modifications annulées', 'info');
  };

  // ── Ajouter un nouveau texte ──
  const handleAddTexte = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await siteTextesApi.upsert(newTexte);
      showToast('Texte ajouté avec succès !', 'success');
      setIsAddModalOpen(false);
      setNewTexte({ cle: '', valeur: '', section: 'personnalise' });
      fetchData();
    } catch {
      showToast('Erreur lors de l\'ajout du texte', 'error');
    }
  };

  // ── Supprimer un texte personnalisé ──
  const handleDelete = async (id: number) => {
    if (!confirm('Voulez-vous vraiment supprimer ce texte ?')) return;
    try {
      await siteTextesApi.delete(id);
      showToast('Texte supprimé', 'success');
      fetchData();
    } catch {
      showToast('Erreur lors de la suppression', 'error');
    }
  };

  // ── Toggle section ──
  const toggleSection = (section: string) => {
    setExpandedSections(prev => {
      const next = new Set(prev);
      if (next.has(section)) next.delete(section);
      else next.add(section);
      return next;
    });
  };

  // ── Grouper les textes par section ──
  const groupedTextes: Record<string, SiteTexte[]> = {};
  textes.forEach(t => {
    const section = t.section || 'general';
    if (!groupedTextes[section]) groupedTextes[section] = [];
    groupedTextes[section].push(t);
  });

  // ── Filtrer par recherche ──
  const matchesSearch = (t: SiteTexte) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      t.cle.toLowerCase().includes(q) ||
      t.valeur.toLowerCase().includes(q) ||
      (CLE_LABELS[t.cle] || '').toLowerCase().includes(q) ||
      (SECTION_LABELS[t.section]?.label || '').toLowerCase().includes(q)
    );
  };

  // ── Vérifier si un texte est modifié ──
  const isModified = (cle: string): boolean => {
    const current = textes.find(t => t.cle === cle);
    const orig = original.find(t => t.cle === cle);
    if (!current || !orig) return !!current;
    return current.valeur !== orig.valeur;
  };

  // ── Sections ordonnées ──
  const sectionOrder = ['hero', 'services', 'solutions', 'equipe', 'contact', 'partenaires', 'personnalise'];
  const sortedSections = Object.keys(groupedTextes).sort(
    (a, b) => (sectionOrder.indexOf(a) === -1 ? 99 : sectionOrder.indexOf(a)) - (sectionOrder.indexOf(b) === -1 ? 99 : sectionOrder.indexOf(b))
  );

  // ── Compter les modifications ──
  const modifiedCount = textes.filter(t => isModified(t.cle)).length;

  return (
    <div className="max-w-5xl space-y-6">
      {/* ── En-tête avec actions ── */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher un texte..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-orange-500/50 transition shadow-sm"
          />
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 bg-gray-150 hover:bg-gray-200 text-gray-800 font-semibold px-4 py-2.5 rounded-xl transition text-sm"
          >
            <Plus className="w-4 h-4" />
            Ajouter un texte
          </button>
          {hasChanges() && (
            <>
              <button
                onClick={handleReset}
                className="flex items-center gap-2 bg-gray-150 hover:bg-gray-200 text-gray-700 font-semibold px-4 py-2.5 rounded-xl transition text-sm"
              >
                <RotateCcw className="w-4 h-4" />
                Annuler
              </button>
              <button
                onClick={handleSaveAll}
                disabled={saving}
                className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-bold px-5 py-2.5 rounded-xl shadow-lg shadow-orange-500/20 transition text-sm disabled:opacity-60"
              >
                {saving ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                {saving ? 'Sauvegarde...' : `Sauvegarder (${modifiedCount})`}
              </button>
            </>
          )}
        </div>
      </div>

      {/* ── Indicateur de modifications ── */}
      {hasChanges() && (
        <div className="flex items-center gap-2 px-4 py-2.5 bg-orange-50 border border-orange-200 rounded-xl">
          <div className="w-2 h-2 rounded-full bg-orange-650 animate-pulse" />
          <span className="text-orange-600 text-sm font-medium">
            {modifiedCount} modification(s) non sauvegardee(s)
          </span>
        </div>
      )}

      {/* ── Contenu principal ── */}
      {loading ? (
        <div className="p-12 text-center text-gray-400">Chargement des textes...</div>
      ) : (
        <div className="space-y-3">
          {sortedSections.map(section => {
            const sectionTextes = groupedTextes[section].filter(matchesSearch);
            if (sectionTextes.length === 0) return null;

            const sectionInfo = SECTION_LABELS[section] || { label: section, description: '' };
            const isExpanded = expandedSections.has(section);
            const sectionModCount = sectionTextes.filter(t => isModified(t.cle)).length;

            return (
              <div
                key={section}
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden transition-all duration-300 shadow-sm"
              >
                {/* En-tête de section */}
                <button
                  onClick={() => toggleSection(section)}
                  className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4 text-orange-600" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    )}
                    <div className="text-left">
                      <h3 className="text-gray-900 font-bold text-sm">{sectionInfo.label}</h3>
                      <p className="text-gray-500 text-xs mt-0.5">{sectionInfo.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {sectionModCount > 0 && (
                      <span className="px-2 py-0.5 bg-orange-50 text-orange-600 text-xs font-bold rounded-full border border-orange-100">
                        {sectionModCount} modifie(s)
                      </span>
                    )}
                    <span className="text-gray-400 text-xs">{sectionTextes.length} texte(s)</span>
                  </div>
                </button>

                {/* Contenu de la section */}
                {isExpanded && (
                  <div className="border-t border-gray-100">
                    {sectionTextes.map(texte => {
                      const label = CLE_LABELS[texte.cle] || texte.cle;
                      const modified = isModified(texte.cle);
                      const isEditing = editingField === texte.cle;
                      const isLongText = texte.valeur.length > 100 || texte.valeur.includes('\n');

                      return (
                        <div
                          key={texte.cle}
                          className={`px-6 py-4 border-b border-gray-100 last:border-b-0 transition-colors ${
                            modified ? 'bg-orange-50/20' : 'hover:bg-gray-50/30'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-4 mb-2">
                            <div className="flex items-center gap-2">
                              {isLongText ? (
                                <AlignLeft className="w-3.5 h-3.5 text-gray-400 shrink-0 mt-0.5" />
                              ) : (
                                <Type className="w-3.5 h-3.5 text-gray-400 shrink-0 mt-0.5" />
                              )}
                              <div>
                                <span className="text-gray-700 text-sm font-semibold">{label}</span>
                                <span className="text-gray-400 text-xs ml-2 font-mono">{texte.cle}</span>
                              </div>
                              {modified && (
                                <span className="flex items-center gap-1 px-1.5 py-0.5 bg-orange-50 text-orange-600 text-[10px] font-bold rounded-md border border-orange-100">
                                  <div className="w-1.5 h-1.5 rounded-full bg-orange-650" />
                                  Modifie
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-1.5 shrink-0">
                              <button
                                onClick={() => setEditingField(isEditing ? null : texte.cle)}
                                className={`p-1.5 rounded-lg transition text-xs font-semibold ${
                                  isEditing
                                    ? 'bg-orange-50 text-orange-600 border border-orange-200'
                                    : 'bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-900'
                                }`}
                                title="Modifier"
                              >
                                {isEditing ? <Check className="w-3.5 h-3.5" /> : <Edit2 className="w-3.5 h-3.5" />}
                              </button>
                              {texte.id && !DEFAULT_TEXTES.some(d => d.cle === texte.cle) && (
                                <button
                                  onClick={() => texte.id && handleDelete(texte.id)}
                                  className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-650 transition"
                                  title="Supprimer"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>
                          </div>

                          {/* Zone d'édition */}
                          {isEditing ? (
                            isLongText ? (
                              <textarea
                                value={texte.valeur}
                                onChange={(e) => updateTexte(texte.cle, e.target.value)}
                                rows={Math.min(8, texte.valeur.split('\n').length + 2)}
                                className="w-full px-4 py-3 bg-white border border-orange-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:border-orange-500/50 transition resize-y font-normal leading-relaxed"
                                autoFocus
                              />
                            ) : (
                              <input
                                type="text"
                                value={texte.valeur}
                                onChange={(e) => updateTexte(texte.cle, e.target.value)}
                                className="w-full px-4 py-2.5 bg-white border border-orange-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:border-orange-500/50 transition"
                                autoFocus
                              />
                            )
                          ) : (
                            <p
                              className="text-gray-650 text-sm leading-relaxed whitespace-pre-line cursor-pointer hover:text-gray-900 transition px-1"
                              onClick={() => setEditingField(texte.cle)}
                            >
                              {texte.valeur}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ── Modale d'ajout d'un nouveau texte ── */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Ajouter un texte personnalise"
        size="md"
      >
        <form onSubmit={handleAddTexte} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
              Cle unique *
            </label>
            <input
              type="text"
              required
              value={newTexte.cle}
              onChange={(e) => setNewTexte({ ...newTexte, cle: e.target.value.toLowerCase().replace(/\s+/g, '_') })}
              placeholder="ex: footer_slogan"
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:border-orange-500/50 transition font-mono"
            />
            <p className="text-gray-400 text-xs mt-1">Identifiant unique pour ce texte (lettres, chiffres, underscores)</p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
              Section
            </label>
            <select
              value={newTexte.section}
              onChange={(e) => setNewTexte({ ...newTexte, section: e.target.value })}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-905 text-sm focus:outline-none focus:border-orange-500/50 transition"
            >
              {Object.entries(SECTION_LABELS).map(([key, { label }]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
              Contenu du texte *
            </label>
            <textarea
              required
              rows={4}
              value={newTexte.valeur}
              onChange={(e) => setNewTexte({ ...newTexte, valeur: e.target.value })}
              placeholder="Saisissez le contenu du texte..."
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:border-orange-500/50 transition resize-none"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-semibold transition"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl text-sm shadow-lg shadow-orange-500/20 transition"
            >
              <Plus className="w-4 h-4" />
              Ajouter le texte
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

