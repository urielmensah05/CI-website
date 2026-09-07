'use client';
// ============================================================
// components/admin/Sidebar.tsx
// Barre de navigation latérale du Dashboard Admin
// ============================================================
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Briefcase,
  GraduationCap,
  Users,
  Handshake,
  Newspaper,
  FileText,
  LogOut,
  ChevronRight,
} from 'lucide-react';

// Items de navigation
const navItems = [
  { label: 'Tableau de bord', href: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Services', href: '/admin/services', icon: Briefcase },
  { label: 'Formations & Solutions', href: '/admin/formations', icon: GraduationCap },
  { label: 'Équipe & Bios', href: '/admin/equipe', icon: Users },
  { label: 'Partenaires', href: '/admin/partenaires', icon: Handshake },
  { label: 'Annonces & Actus', href: '/admin/annonces', icon: Newspaper },
];

interface SidebarProps {
  onLogout: () => void;
  userName?: string;
}

export default function Sidebar({ onLogout, userName }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-screen bg-white border-r border-gray-200 flex flex-col">
      {/* ── Logo & Brand ── */}
      <div className="p-5 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/20">
            <span className="text-white font-black text-sm">CI</span>
          </div>
          <div>
            <p className="text-gray-900 font-bold text-sm leading-tight">Central Innovation</p>
            <p className="text-orange-600/80 text-[10px] font-semibold tracking-widest uppercase">Admin Portal</p>
          </div>
        </div>
      </div>

      {/* ── Navigation ── */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        <p className="px-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Navigation</p>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-orange-50 text-orange-600 border border-orange-200/50 shadow-sm shadow-orange-500/5'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 border border-transparent'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-orange-600' : 'text-gray-400 group-hover:text-gray-650'}`} />
              <span className="flex-1">{item.label}</span>
              {isActive && <ChevronRight className="w-3 h-3 text-orange-600" />}
            </Link>
          );
        })}
      </nav>

      {/* ── Profil & Déconnexion ── */}
      <div className="p-3 border-t border-gray-200 space-y-2">
        {userName && (
          <div className="px-3 py-2 bg-gray-50 rounded-xl">
            <p className="text-[10px] text-gray-400 uppercase tracking-wider">Connecté en tant que</p>
            <p className="text-sm text-gray-800 font-semibold truncate mt-0.5">{userName}</p>
          </div>
        )}
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-650 hover:text-red-755 hover:bg-red-50 border border-transparent hover:border-red-200/50 transition-all duration-200"
        >
          <LogOut className="w-4 h-4" />
          Déconnexion
        </button>
      </div>
    </aside>
  );
}
