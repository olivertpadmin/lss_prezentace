'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { track } from '@/lib/track'
import { LSS } from '@/lib/lss'

const ACCENT = '#A33230'
const ACCENT_LIGHT = '#C8453E'

const iv = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 } as { opacity: number; y: number },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
})

/* ─────────────────────────────────────────────────────────
   ČÍSLA K DOPLNĚNÍ PŘED SCHŮZKOU
   ─────────────────────────────────────────────────────────
   OBRAT je zatím odhad z veřejně dostupné návštěvnosti
   modelového obratu 50 mil. Kč.
   Jakmile budete znát skutečné číslo, přepište ho zde —
   všechny dopočty na stránce se aktualizují samy.
   ───────────────────────────────────────────────────────── */
const OBRAT = 50_000_000
const PROVIZE = 0.03

const czk = (n: number) => `${Math.round(n).toLocaleString('cs-CZ').replace(/\u00a0/g, ' ')} Kč`

const PRODUCTS = [
  {
    name: 'Prodej vstupenek',
    icon: '🎟️',
    items: [{ label: 'Implementace' }, { label: 'Provoz (12 měsíců)' }, { label: 'Zakreslení hledišť všech scén' }],
  },
  {
    name: 'Prodejní systém',
    icon: '🗂️',
    items: [{ label: 'Implementace' }, { label: 'Provoz (12 měsíců)' }, { label: 'Migrace databáze diváků a abonentů' }],
  },
  {
    name: 'Mobilní aplikace (volitelně)',
    icon: '📱',
    items: [{ label: 'Doplňkový kanál pro diváky' }],
  },
  {
    name: 'CRM a diváci',
    icon: '👥',
    items: [{ label: 'Implementace' }, { label: 'Provoz (12 měsíců)' }],
  },
  {
    name: 'Partnerský portál a akreditace',
    icon: '🤝',
    items: [{ label: 'Implementace' }, { label: 'Provoz (12 měsíců)' }],
  },
  {
    name: 'SSO',
    icon: '🔐',
    items: [{ label: 'Implementace' }, { label: 'Provoz (12 měsíců)' }],
  },
  {
    name: 'Odbavení u bran',
    icon: '📷',
    items: [{ label: 'Skenery / kontrola QR kódů u vstupu' }, { label: 'Podpora a supervize v hrací dny' }],
  },
]

const SUMMARY_ROWS = [
  {
    label: 'Předpokládaný obrat přes platformu',
    value: czk(OBRAT),
    note: 'Modelový obrat pro nabídku — k upřesnění podle skutečných čísel festivalu',
  },
  { label: 'Provize platformy', value: '3 %', note: 'Jednotná sazba z prodeje vstupenek' },
  { label: 'Implementace celého ekosystému', value: '0 Kč', note: 'Zahrnuto v provizi' },
  { label: 'Provoz a podpora po dobu 12 měsíců', value: '0 Kč', note: 'Zahrnuto v provizi' },
  { label: 'Náklad festivalu na provizi', value: czk(OBRAT * PROVIZE), note: 'Při uvedeném obratu' },
]

export default function LssNabidkaPage() {
  const router = useRouter()

  useEffect(() => {
    track({
      type: 'page_view',
      page: '/lss/nabidka',
      ts: Date.now(),
      referrer: document.referrer || '',
      ua: navigator.userAgent,
    })
  }, [])

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(160deg, #0B0810 0%, #1A1119 50%, #14101A 100%)' }}>
      <div
        className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, ${ACCENT_LIGHT} 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />

      <motion.nav
        className="sticky top-0 w-full z-50 flex items-center gap-3 px-6 py-3"
        style={{
          background: 'rgba(11,8,16,0.95)',
          backdropFilter: 'blur(18px)',
          borderBottom: '1px solid rgba(246,241,232,0.07)',
        }}
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <button
          onClick={() => router.push('/lss')}
          className="shrink-0 hover:opacity-70 transition-opacity text-sm font-semibold flex items-center gap-2"
          style={{ color: 'rgba(246,241,232,0.5)' }}
        >
          ← Digitální ekosystém
        </button>
        <span style={{ color: 'rgba(246,241,232,0.18)' }}>/</span>
        <span className="text-sm font-semibold" style={{ color: ACCENT_LIGHT }}>
          Nabídka
        </span>
      </motion.nav>

      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-14 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-xs font-semibold tracking-[0.22em] uppercase" style={{ color: ACCENT_LIGHT }}>
            Cenová nabídka
          </span>
          <h1
            className="text-5xl md:text-7xl mt-4 mb-5 leading-none"
            style={{ fontFamily: "'Panel Sans', sans-serif", color: LSS.paper }}
          >
            Nabídka pro Letní
            <br />
            shakespearovské slavnosti
          </h1>
          <p className="text-lg max-w-xl leading-relaxed" style={{ color: 'rgba(246,241,232,0.42)' }}>
            Kompletní digitální ekosystém zahrnutý v provizi z prodeje vstupenek. Žádné vstupní
            investice, žádné skryté poplatky.
          </p>
        </motion.div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 pb-6">
        <motion.div {...iv(0.05)}>
          <div
            className="hidden md:grid rounded-xl px-6 py-3 mb-2"
            style={{
              gridTemplateColumns: '1fr 180px 200px',
              background: 'rgba(246,241,232,0.04)',
              border: '1px solid rgba(246,241,232,0.07)',
            }}
          >
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ color: 'rgba(246,241,232,0.3)' }}>
              Produkt / Položka
            </span>
            <span
              className="text-[10px] font-semibold uppercase tracking-[0.2em] text-center"
              style={{ color: 'rgba(246,241,232,0.3)' }}
            >
              Typ
            </span>
            <span
              className="text-[10px] font-semibold uppercase tracking-[0.2em] text-center"
              style={{ color: `${ACCENT_LIGHT}99` }}
            >
              PLG cena
            </span>
          </div>
        </motion.div>

        <div className="flex flex-col gap-2">
          {PRODUCTS.map((product, pi) => (
            <motion.div
              key={product.name}
              {...iv(0.06 + pi * 0.04)}
              className="rounded-2xl overflow-hidden"
              style={{ border: '1px solid rgba(246,241,232,0.07)', background: 'rgba(246,241,232,0.025)' }}
            >
              <div
                className="flex items-center gap-3 px-6 py-3"
                style={{ borderBottom: '1px solid rgba(246,241,232,0.05)', background: 'rgba(246,241,232,0.03)' }}
              >
                <span className="text-lg">{product.icon}</span>
                <span className="text-base font-bold" style={{ fontFamily: "'Panel Sans', sans-serif", color: LSS.paper }}>
                  {product.name}
                </span>
              </div>

              {product.items.map((item, ii) => (
                <div
                  key={item.label}
                  className="px-6 py-4"
                  style={{ borderTop: ii > 0 ? '1px solid rgba(246,241,232,0.04)' : undefined }}
                >
                  <div className="flex flex-col md:hidden gap-2">
                    <span className="text-sm" style={{ color: 'rgba(246,241,232,0.5)' }}>
                      {item.label}
                    </span>
                    <IncludedBadge />
                  </div>
                  <div className="hidden md:grid items-center" style={{ gridTemplateColumns: '1fr 180px 200px' }}>
                    <span className="text-sm" style={{ color: 'rgba(246,241,232,0.5)' }}>
                      {item.label}
                    </span>
                    <div />
                    <div className="flex justify-center">
                      <IncludedBadge />
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 pb-8">
        <motion.div {...iv(0.1)}>
          <div className="rounded-2xl overflow-hidden mt-4" style={{ border: '1px solid rgba(246,241,232,0.08)' }}>
            <div
              className="px-6 py-4"
              style={{ background: 'rgba(246,241,232,0.04)', borderBottom: '1px solid rgba(246,241,232,0.07)' }}
            >
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ color: 'rgba(246,241,232,0.3)' }}>
                Obchodní podmínky spolupráce
              </span>
            </div>
            {SUMMARY_ROWS.map((row, i) => (
              <div
                key={row.label}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 px-6 py-4"
                style={{ borderTop: i > 0 ? '1px solid rgba(246,241,232,0.05)' : undefined }}
              >
                <div>
                  <span className="text-sm font-semibold" style={{ color: 'rgba(246,241,232,0.6)' }}>
                    {row.label}
                  </span>
                  {row.note && (
                    <p className="text-xs mt-0.5" style={{ color: 'rgba(246,241,232,0.25)' }}>
                      {row.note}
                    </p>
                  )}
                </div>
                <span
                  className="text-lg font-black tabular-nums"
                  style={{ fontFamily: "'Panel Sans', sans-serif", color: ACCENT_LIGHT }}
                >
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 pb-24">
        <motion.div {...iv(0.12)}>
          <div
            className="rounded-3xl p-8 md:p-10 flex flex-col md:flex-row md:items-start gap-8"
            style={{
              background: `linear-gradient(135deg, ${ACCENT}22 0%, ${ACCENT}0a 100%)`,
              border: `1.5px solid ${ACCENT}48`,
              boxShadow: `0 0 80px ${ACCENT}20`,
            }}
          >
            <div className="flex-1">
              <span className="text-xs font-semibold uppercase tracking-[0.22em]" style={{ color: ACCENT_LIGHT }}>
                Co je v provizi zahrnuto
              </span>
              <h2
                className="text-3xl md:text-4xl font-black mt-3 mb-3 leading-tight"
                style={{ fontFamily: "'Panel Sans', sans-serif", color: LSS.paper }}
              >
                Celý ekosystém
                <br />
                <span style={{ color: ACCENT_LIGHT }}>zahrnuto v provizi</span>
              </h2>
              <p className="text-sm leading-relaxed max-w-lg mb-6" style={{ color: 'rgba(246,241,232,0.5)' }}>
                Implementaci ani provoz neplatíte dopředu. Zakreslení hledišť všech scén, migrace
                databáze abonentů, CRM, partnerský portál, odbavení pomocí scannerů a podpora v hrací dny jsou
                pokryté provizí z prodaných vstupenek. Festival nenese žádné vstupní náklady — platí se
                až z toho, co se skutečně prodá.
              </p>

              <div className="flex flex-col gap-2">
                {[
                  { label: 'Vstupní investice festivalu', value: '0 Kč' },
                  { label: 'Náklady na provoz a podporu', value: '0 Kč' },
                  { label: `Provize při obratu ${czk(OBRAT)}`, value: czk(OBRAT * PROVIZE) },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between px-4 py-3 rounded-xl"
                    style={{ background: `${ACCENT}12`, border: `1px solid ${ACCENT}2a` }}
                  >
                    <span className="text-xs" style={{ color: 'rgba(246,241,232,0.5)' }}>
                      {row.label}
                    </span>
                    <span
                      className="text-sm font-bold tabular-nums"
                      style={{ color: ACCENT_LIGHT, fontFamily: "'Panel Sans', sans-serif" }}
                    >
                      {row.value}
                    </span>
                  </div>
                ))}
                <div
                  className="flex items-center justify-between px-4 py-4 rounded-xl mt-1"
                  style={{ background: `${ACCENT}2a`, border: `2px solid ${ACCENT}66` }}
                >
                  <div>
                    <span className="text-sm font-bold" style={{ color: LSS.paper }}>
                      🎭 Zůstává festivalu
                    </span>
                    <p className="text-[10px] mt-0.5" style={{ color: 'rgba(246,241,232,0.35)' }}>
                      Z uvedeného obratu po odečtení provize
                    </p>
                  </div>
                  <span
                    className="text-xl font-black tabular-nums"
                    style={{ color: ACCENT_LIGHT, fontFamily: "'Panel Sans', sans-serif" }}
                  >
                    {czk(OBRAT * (1 - PROVIZE))}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex-shrink-0 flex flex-col items-center md:items-end gap-3">
              <div
                className="rounded-2xl px-8 py-8 text-center"
                style={{ background: `${ACCENT}26`, border: `2px solid ${ACCENT}5e` }}
              >
                <div
                  className="text-[10px] font-semibold uppercase tracking-[0.18em] mb-2"
                  style={{ color: 'rgba(246,241,232,0.4)' }}
                >
                  Finální provize PLG
                </div>
                <div
                  className="text-6xl md:text-7xl font-black leading-none"
                  style={{ fontFamily: "'Panel Sans', sans-serif", color: ACCENT_LIGHT }}
                >
                  3 %
                </div>
                <div
                  className="text-[10px] font-semibold uppercase tracking-[0.18em] mt-2"
                  style={{ color: 'rgba(246,241,232,0.4)' }}
                >
                  z obratu vstupenek
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function IncludedBadge() {
  return (
    <span
      className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
      style={{
        background: 'rgba(200,69,62,0.14)',
        color: ACCENT_LIGHT,
        border: '1px solid rgba(200,69,62,0.3)',
      }}
    >
      <span style={{ fontSize: 10 }}>✓</span>
      Zahrnuto v provizi
    </span>
  )
}
