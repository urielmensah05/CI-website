// ==============================
// app/layout.tsx
// ==============================
import type { Metadata, Viewport } from 'next'
import { Roboto } from 'next/font/google'
import './globals.css'
import ClientLayoutWrapper from './components/ClientLayoutWrapper'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-roboto',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Central Innovation Plus – Solutions Digitales & Solutions en Côte d\'Ivoire',
  description: 'Central Innovation Plus accompagne entreprises, startups et institutions en Côte d\'Ivoire dans la transformation digitale : développement d\'applications, solutions digitales et numériques.',
  keywords: ['digital', 'Côte d\'Ivoire', 'solutions', 'développement web', 'innovation', 'Abidjan'],
  openGraph: {
    title: 'Central Innovation Plus',
    description: 'Innovation, Services Digitaux et Solutions en Côte d\'Ivoire',
    locale: 'fr_CI',
    type: 'website',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={roboto.variable}>
      <body className="bg-white text-gray-900 antialiased">
        <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
      </body>
    </html>
  )
}
