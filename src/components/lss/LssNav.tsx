'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { LSS, LSS_PRODUCTS } from '@/lib/lss'
import { track } from '@/lib/track'

const BAR = 'rgba(11,8,16,0.92)'

/** Horní lišta hub stránky — logo PLG, produktové pilulky, nabídka. */
export function LssTopbar({ onProductClick }: { onProductClick: (slug: string) => void }) {
  const router = useRouter()
  const ring = LSS_PRODUCTS.filter((p) => p.slug !== 'sso')

  return (
    <motion.nav
      className="relative w-full flex items-center gap-3 px-6 py-3 shrink-0"
      style={{
        zIndex: 50,
        background: BAR,
        backdropFilter: 'blur(18px)',
        borderBottom: '1px solid rgba(246,241,232,0.08)',
      }}
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <button
        onClick={() => router.push('/lss')}
        className="shrink-0 hover:opacity-70 transition-opacity"
        title="PLG ekosystém"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/plglogo.svg" alt="PLG ecosystem" style={{ height: 26, width: 'auto' }} />
      </button>

      <span style={{ color: 'rgba(246,241,232,0.18)' }}>/</span>

      <div className="flex items-center gap-1.5 overflow-x-auto min-w-0" style={{ scrollbarWidth: 'none' }}>
        <button
          onClick={() => onProductClick('sso')}
          className="shrink-0 px-3 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap transition-all hover:opacity-80"
          style={{
            background: 'rgba(79,180,119,0.16)',
            color: '#7FD3A2',
            border: '1px solid rgba(79,180,119,0.4)',
          }}
        >
          SSO
        </button>
        {ring.map((p) => (
          <button
            key={p.slug}
            onClick={() => onProductClick(p.slug)}
            className="shrink-0 px-3 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap transition-all hover:opacity-80"
            style={{
              background: `${p.color}18`,
              color: 'rgba(246,241,232,0.55)',
              border: `1px solid ${p.color}40`,
            }}
          >
            {p.shortLabel}
          </button>
        ))}
      </div>

      <button
        onClick={() => {
          track({ type: 'orbit_click', product: 'nabidka', ts: Date.now() })
          router.push('/lss/nabidka')
        }}
        aria-label="Otevřít nabídku pro LSS 2027"
        className="shrink-0 ml-auto px-5 py-2.5 rounded-full text-[13px] font-extrabold whitespace-nowrap transition-all duration-200 hover:scale-[1.05] hover:brightness-110 active:scale-[0.98]"
        style={{
          background: `linear-gradient(135deg, ${LSS.crimsonLit} 0%, ${LSS.crimson} 100%)`,
          color: LSS.paper,
          border: '1px solid rgba(246,241,232,0.28)',
          boxShadow: '0 8px 28px rgba(200,69,62,0.48), 0 0 0 3px rgba(200,69,62,0.10)',
        }}
      >
        Zobrazit nabídku <span aria-hidden="true">→</span>
      </button>
    </motion.nav>
  )
}

/** Drobečková lišta podstránek — návrat na hub + název produktu. */
export function LssBreadcrumb({ label, accent }: { label: string; accent: string }) {
  const router = useRouter()

  return (
    <motion.nav
      data-product-nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center gap-3 px-6 py-3"
      style={{
        background: BAR,
        backdropFilter: 'blur(18px)',
        borderBottom: '1px solid rgba(246,241,232,0.07)',
      }}
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <button
        onClick={() => {
          track({ type: 'breadcrumb_click', target: '/lss', from: label, ts: Date.now() })
          router.push('/lss')
        }}
        className="shrink-0 text-sm font-semibold flex items-center gap-2 transition-opacity hover:opacity-70"
        style={{ color: 'rgba(246,241,232,0.5)' }}
      >
        ← Ekosystém pro slavnosti
      </button>
      <span style={{ color: 'rgba(246,241,232,0.18)' }}>/</span>
      <span
        className="text-xs font-semibold px-3 py-1 rounded-full"
        style={{ background: `${accent}22`, color: accent }}
      >
        {label}
      </span>
      <button
        onClick={() => router.push('/lss/nabidka')}
        className="ml-auto shrink-0 px-3.5 py-1 rounded-full text-[11px] font-bold transition-opacity hover:opacity-85"
        style={{ background: LSS.crimson, color: LSS.paper }}
      >
        Nabídka pro LSS 2027
      </button>
    </motion.nav>
  )
}

/** Sekční nadpis používaný napříč podstránkami. */
export function LssEyebrow({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <span className="text-[11px] font-semibold tracking-[0.2em] uppercase" style={{ color }}>
      {children}
    </span>
  )
}
