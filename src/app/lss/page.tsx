'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import StageDiagram from '@/components/lss/StageDiagram'
import NightSky from '@/components/lss/NightSky'
import { LssTopbar } from '@/components/lss/LssNav'
import { track } from '@/lib/track'
import { LSS, LSS_PRODUCTS, LSS_SUBPAGES } from '@/lib/lss'

/** Systémy, se kterými ekosystém komunikuje — pás pod hledištěm. */
const NAPOJENI = [
  'Předpověď počasí',
  'shakespeare.cz',
  'Platební brána',
  'Benefitní karty',
  'Newsletter',
  'Sociální sítě',
  'Scannery u bran',
  'Gastro a bar',
  'Účetnictví',
  'Jakékoliv API',
]

export default function LssHub() {
  const router = useRouter()

  const handleProductClick = (slug: string) => {
    track({ type: 'orbit_click', product: slug, ts: Date.now() })
    if (LSS_SUBPAGES.has(slug)) router.push(`/lss/${slug}`)
  }

  return (
    <main
      className="relative w-full h-screen overflow-hidden flex flex-col"
      style={{ background: 'radial-gradient(ellipse at 50% 18%, rgba(163,50,48,0.22) 0%, transparent 44%), linear-gradient(175deg, #0B0810 0%, #150E18 46%, #1C1016 100%)' }}
    >
      <NightSky variant="quiet" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, rgba(11,8,16,0.84) 0%, rgba(11,8,16,0.22) 43%, rgba(11,8,16,0.62) 100%)',
        }}
      />

      <LssTopbar onProductClick={handleProductClick} />

      {/* Hlavička */}
      <motion.div
        className="relative z-10 shrink-0 px-10 pt-6 pb-1 flex items-start justify-between gap-8"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
      >
        <div className="flex items-start gap-5 min-w-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/lss/lss-logo-light.png"
            alt="Letní shakespearovské slavnosti 2027"
            style={{ height: 62, width: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 10px 26px rgba(0,0,0,0.36))' }}
          />
          <div style={{ width: 1, height: 58, background: 'linear-gradient(180deg, rgba(246,241,232,0.28), rgba(246,241,232,0.04))' }} />
          <div className="min-w-0 max-w-[540px]">
            <div className="text-[10px] font-semibold tracking-[0.22em] uppercase mb-2" style={{ color: LSS.giltSoft }}>
              Digitální ekosystém · návrh spolupráce
            </div>
            <h1
              className="text-[34px] leading-[0.95]"
              style={{ fontFamily: "'Panel Sans', sans-serif", color: LSS.paper }}
            >
              Festivalový prodej,
              <br />
              který drží celou sezónu pohromadě
            </h1>
            <p className="text-[13px] mt-3 leading-relaxed" style={{ color: 'rgba(246,241,232,0.52)' }}>
              Prodej vstupenek, správa scén, CRM, partnerství a scannerové odbavení v jednom navazujícím řešení.
            </p>
          </div>
        </div>

        <div className="hidden lg:flex flex-col items-end gap-2 shrink-0">
          <span
            className="text-[11px] font-semibold tracking-[0.18em] uppercase"
            style={{ color: LSS.gilt }}
          >
            30. ročník · 2027
          </span>
        </div>
      </motion.div>

      <motion.div
        className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-[250px_minmax(0,1.12fr)_220px] items-center w-full min-h-0 px-6 gap-1"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.24, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      >
        <div className="hidden lg:flex flex-col gap-3 self-center">
          {[
            ['Jádro', 'Prodej vstupenek a prodejní systém'],
            ['Data', 'CRM, přehledy a návazné kampaně'],
            ['Provoz', 'Partneři, akreditace a vstup přes scannery'],
          ].map(([title, text]) => (
            <div
              key={title}
              className="rounded-2xl p-4"
              style={{ background: 'rgba(246,241,232,0.045)', border: '1px solid rgba(246,241,232,0.09)', backdropFilter: 'blur(14px)' }}
            >
              <div className="text-[10px] font-semibold tracking-[0.18em] uppercase" style={{ color: LSS.giltSoft }}>{title}</div>
              <div className="text-[13px] leading-snug mt-1" style={{ color: 'rgba(246,241,232,0.58)' }}>{text}</div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center w-full h-full min-h-0 overflow-visible">
          <StageDiagram products={LSS_PRODUCTS} onProductClick={handleProductClick} />
        </div>

        <div className="hidden xl:flex flex-col gap-3 self-center">
          <div
            className="rounded-3xl p-5"
            style={{ background: 'linear-gradient(155deg, rgba(200,69,62,0.18), rgba(246,241,232,0.045))', border: '1px solid rgba(200,69,62,0.28)' }}
          >
            <div className="text-[10px] font-semibold tracking-[0.18em] uppercase" style={{ color: LSS.crimsonLit }}>Jak číst mapu</div>
            <p className="text-[13px] leading-relaxed mt-2" style={{ color: 'rgba(246,241,232,0.58)' }}>
              Kliknutím na prvek otevřete konkrétní část řešení. Největší váha je na prodeji, datech a provozu v hrací dny.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Pás napojení */}
      <motion.div
        className="relative z-10 shrink-0 px-10 py-3 flex items-center gap-3 flex-wrap"
        style={{
          background: 'rgba(11,8,16,0.78)',
          borderTop: '1px solid rgba(246,241,232,0.08)',
          backdropFilter: 'blur(14px)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.7 }}
      >
        <span
          className="text-[10px] font-semibold tracking-[0.18em] uppercase shrink-0"
          style={{ color: 'rgba(246,241,232,0.32)' }}
        >
          Napojeno na
        </span>
        {NAPOJENI.map((n) => (
          <span
            key={n}
            className="flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full"
            style={{
              background: 'rgba(246,241,232,0.045)',
              border: '1px solid rgba(246,241,232,0.09)',
              color: 'rgba(246,241,232,0.5)',
            }}
          >
            <span
              className="inline-block rounded-full animate-pulse"
              style={{ width: 4, height: 4, background: '#4FB477' }}
            />
            {n}
          </span>
        ))}
      </motion.div>
    </main>
  )
}
