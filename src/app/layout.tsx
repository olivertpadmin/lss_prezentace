import type { Metadata } from 'next'
import './globals.css'
import MobileGate from '@/components/MobileGate'
import Analytics from '@/components/Analytics'

export const metadata: Metadata = {
  title: 'Letní shakespearovské slavnosti — digitální ekosystém PLG',
  description: 'Prezentace ticketingového ekosystému PLG pro Letní shakespearovské slavnosti 2027.',
  icons: { icon: '/plg-fav.png', shortcut: '/plg-fav.png', apple: '/plg-fav.png' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs" className="h-full">
      <body className="min-h-full">
        <Analytics />
        <MobileGate>{children}</MobileGate>
      </body>
    </html>
  )
}
