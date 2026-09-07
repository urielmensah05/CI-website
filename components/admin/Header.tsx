'use client';

import React, { useState } from 'react';
import { Bell, Menu, KeyRound, Lock } from 'lucide-react';
import Modal from '@/components/admin/Modal';
import { useToast } from '@/lib/context/ToastContext';
import { authApi } from '@/lib/adminApi';

interface HeaderProps {
  title: string;
  subtitle?: string;
  onMenuToggle?: () => void;
}

export default function Header({ title, subtitle, onMenuToggle }: HeaderProps) {
  const { showToast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [saving, setSaving] = useState(false);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      showToast('Les deux nouveaux mots de passe ne correspondent pas', 'error');
      return;
    }
    setSaving(true);
    try {
      await authApi.changePassword(currentPassword, newPassword, confirmPassword);
      showToast('Mot de passe mis à jour avec succès !', 'success');
      setIsModalOpen(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Erreur lors du changement de mot de passe';
      showToast(msg, 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <header className="h-16 bg-white/80 backdrop-blur-sm border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-40">
        {/* ── Titre de la page ── */}
        <div className="flex items-center gap-3">
          {onMenuToggle && (
            <button
              onClick={onMenuToggle}
              className="p-1.5 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition lg:hidden"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}
          <div>
            <h1 className="text-gray-900 font-bold text-lg leading-tight">{title}</h1>
            {subtitle && <p className="text-gray-500 text-xs">{subtitle}</p>}
          </div>
        </div>

        {/* ── Actions & Statut ── */}
        <div className="flex items-center gap-3">
          {/* Indicateur de statut "Live" */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-emerald-600 text-xs font-semibold">En ligne</span>
          </div>

          {/* Bouton changement mot de passe */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-gray-50 text-gray-700 hover:text-gray-900 rounded-xl text-xs font-semibold border border-gray-200 transition"
            title="Changer le mot de passe"
          >
            <KeyRound className="w-3.5 h-3.5 text-orange-600" />
            <span className="hidden md:inline">Mot de passe</span>
          </button>

          {/* Bouton notification (décoratif) */}
          <button className="relative p-2 rounded-xl text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition">
            <Bell className="w-4.5 h-4.5" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-orange-600 rounded-full"></span>
          </button>

          {/* Avatar admin */}
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow shadow-orange-500/20">
            <span className="text-white font-black text-xs">A</span>
          </div>
        </div>
      </header>

      {/* Modale de changement de mot de passe */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Modifier mon mot de passe"
        size="sm"
      >
        <form onSubmit={handleChangePassword} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">
              Mot de passe actuel *
            </label>
            <input
              type="password"
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-amber-500/50 transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">
              Nouveau mot de passe *
            </label>
            <input
              type="password"
              required
              minLength={5}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="•••••••• (5 caractères min)"
              className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-amber-500/50 transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">
              Confirmer le nouveau mot de passe *
            </label>
            <input
              type="password"
              required
              minLength={6}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-amber-500/50 transition"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-zinc-800">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl text-sm font-semibold transition"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-5 py-2 bg-amber-400 hover:bg-amber-300 text-black font-bold rounded-xl text-sm shadow-lg shadow-amber-500/20 transition disabled:opacity-60"
            >
              {saving && <div className="w-3.5 h-3.5 border-2 border-black/30 border-t-black rounded-full animate-spin" />}
              {saving ? 'Modification...' : 'Changer le mot de passe'}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}

