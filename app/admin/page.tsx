// ============================================================
// app/admin/page.tsx
// Redirige automatiquement /admin vers /admin/dashboard
// ============================================================
import { redirect } from 'next/navigation';

export default function AdminRootPage() {
  redirect('/admin/dashboard');
}
