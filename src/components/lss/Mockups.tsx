'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { LSS } from '@/lib/lss'

/* ── Telefon ────────────────────────────────────────────────── */
export function Phone({
  title,
  children,
  width = 232,
}: {
  title?: string
  children: React.ReactNode
  width?: number
}) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div
        style={{
          width,
          height: width * 2.05,
          borderRadius: 30,
          background: '#0A070C',
          border: '1px solid rgba(246,241,232,0.14)',
          boxShadow: '0 22px 56px rgba(0,0,0,0.45)',
          padding: 7,
          overflow: 'hidden',
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 24,
            background: '#15101A',
            overflow: 'hidden',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Stavový řádek */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '8px 14px 4px',
              fontSize: 7.5,
              fontWeight: 700,
              color: 'rgba(246,241,232,0.5)',
            }}
          >
            <span>20:12</span>
            <span style={{ display: 'flex', gap: 3 }}>
              <span>▂▄▆</span>
              <span>􀛨</span>
            </span>
          </div>
          {children}
        </div>
      </div>
      {title && (
        <span className="text-xs font-semibold" style={{ color: 'rgba(20,16,26,0.5)' }}>
          {title}
        </span>
      )}
    </div>
  )
}

const P = 'rgba(246,241,232,'

/* ── Obrazovka: moje vstupenky ──────────────────────────────── */
export function ScreenTickets() {
  return (
    <div style={{ padding: '6px 12px', display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
      <div style={{ fontSize: 15, fontWeight: 900, color: LSS.paper, fontFamily: "'Panel Sans',sans-serif" }}>
        Moje vstupenky
      </div>

      {/* Aktivní vstupenka */}
      <div
        style={{
          borderRadius: 12,
          background: LSS.paper,
          padding: '10px 11px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 5, background: LSS.crimson }} />
        <div style={{ marginLeft: 6 }}>
          <div style={{ fontSize: 6, fontWeight: 800, letterSpacing: '.12em', color: 'rgba(20,16,26,.4)' }}>
            DNES · 20:30
          </div>
          <div
            style={{
              fontSize: 15,
              fontWeight: 900,
              color: LSS.ink,
              fontFamily: "'Panel Sans',sans-serif",
              lineHeight: 1.1,
              marginTop: 2,
            }}
          >
            Macbeth
          </div>
          <div style={{ fontSize: 7, color: 'rgba(20,16,26,.55)', marginTop: 2 }}>
            Nejvyšší purkrabství · Parter A, ř. D, 14
          </div>
          <div
            style={{
              marginTop: 8,
              background: LSS.ink,
              borderRadius: 6,
              height: 46,
              display: 'grid',
              gridTemplateColumns: 'repeat(12,1fr)',
              gap: 1.5,
              padding: 5,
            }}
          >
            {Array.from({ length: 48 }).map((_, i) => (
              <div
                key={i}
                style={{
                  background: i % 3 === 0 || i % 7 === 0 ? LSS.paper : 'transparent',
                  borderRadius: 1,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Upozornění na počasí */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        style={{
          borderRadius: 10,
          background: 'rgba(201,162,39,0.14)',
          border: '1px solid rgba(201,162,39,0.34)',
          padding: '8px 10px',
        }}
      >
        <div style={{ fontSize: 7.5, fontWeight: 800, color: LSS.giltSoft, marginBottom: 2 }}>
          Předpověď na dnešek
        </div>
        <div style={{ fontSize: 7, color: `${P}0.55)`, lineHeight: 1.45 }}>
          Zataženo, 18 °C, déšť nepravděpodobný. O případném zrušení rozhodujeme nejdříve ve 20:30.
        </div>
      </motion.div>

      {/* Nadcházející */}
      <div style={{ fontSize: 7.5, fontWeight: 800, letterSpacing: '.1em', color: `${P}0.32)`, marginTop: 2 }}>
        DALŠÍ V SEZÓNĚ
      </div>
      {[
        ['Sen noci svatojánské', 'Špilberk · 29. 7.'],
        ['Večer tříkrálový', 'HAMU · 12. 8.'],
        ['Hamlet — derniéra', 'Ostrava · 21. 8.'],
      ].map(([t, s]) => (
        <div
          key={t}
          style={{
            borderRadius: 9,
            background: `${P}0.05)`,
            border: `1px solid ${P}0.08)`,
            padding: '7px 9px',
          }}
        >
          <div style={{ fontSize: 9, fontWeight: 800, color: LSS.paper }}>{t}</div>
          <div style={{ fontSize: 7, color: `${P}0.42)`, marginTop: 1 }}>{s}</div>
        </div>
      ))}
    </div>
  )
}

/* ── Obrazovka: program ─────────────────────────────────────── */
export function ScreenProgram() {
  const dny = [
    { d: '24', m: 'čer', t: 'Komedie omylů', s: 'Premiéra · Pražský hrad', full: false },
    { d: '17', m: 'črc', t: 'Macbeth', s: 'Pražský hrad', full: true },
    { d: '29', m: 'črc', t: 'Sen noci svatojánské', s: 'Špilberk', full: false },
    { d: '12', m: 'srp', t: 'Večer tříkrálový', s: 'HAMU', full: false },
    { d: '21', m: 'srp', t: 'Hamlet', s: 'Derniéra · Ostrava', full: true },
  ]
  return (
    <div style={{ padding: '6px 12px', display: 'flex', flexDirection: 'column', gap: 7, flex: 1 }}>
      <div style={{ fontSize: 15, fontWeight: 900, color: LSS.paper, fontFamily: "'Panel Sans',sans-serif" }}>
        Program 2027
      </div>
      <div style={{ display: 'flex', gap: 4 }}>
        {['Vše', 'Praha', 'Brno', 'Ostrava'].map((f, i) => (
          <div
            key={f}
            style={{
              fontSize: 7,
              fontWeight: 800,
              padding: '3px 8px',
              borderRadius: 20,
              background: i === 0 ? LSS.crimson : `${P}0.06)`,
              color: i === 0 ? LSS.paper : `${P}0.45)`,
            }}
          >
            {f}
          </div>
        ))}
      </div>
      {dny.map((x) => (
        <div
          key={x.t}
          style={{
            display: 'flex',
            gap: 9,
            alignItems: 'center',
            borderRadius: 9,
            background: `${P}0.05)`,
            border: `1px solid ${P}0.08)`,
            padding: '7px 9px',
          }}
        >
          <div style={{ textAlign: 'center', width: 24, flexShrink: 0 }}>
            <div
              style={{
                fontSize: 13,
                fontWeight: 900,
                color: LSS.paper,
                fontFamily: "'Panel Sans',sans-serif",
                lineHeight: 1,
              }}
            >
              {x.d}
            </div>
            <div style={{ fontSize: 6, color: `${P}0.38)`, marginTop: 1 }}>{x.m}</div>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 8.5, fontWeight: 800, color: LSS.paper }}>{x.t}</div>
            <div style={{ fontSize: 6.5, color: `${P}0.4)`, marginTop: 1 }}>{x.s}</div>
          </div>
          <div
            style={{
              fontSize: 6,
              fontWeight: 800,
              padding: '3px 6px',
              borderRadius: 4,
              background: x.full ? `${P}0.08)` : LSS.crimson,
              color: x.full ? `${P}0.4)` : LSS.paper,
              flexShrink: 0,
            }}
          >
            {x.full ? 'Vyprodáno' : 'Koupit'}
          </div>
        </div>
      ))}
    </div>
  )
}

/* ── Obrazovka: věrnost ─────────────────────────────────────── */
export function ScreenLoyalty() {
  const urovne = [
    ['Divák', true],
    ['Stálý host', true],
    ['Abonent', true],
    ['Zlatá', true],
    ['Mecenáš', false],
  ] as const
  return (
    <div style={{ padding: '6px 12px', display: 'flex', flexDirection: 'column', gap: 9, flex: 1 }}>
      <div style={{ fontSize: 15, fontWeight: 900, color: LSS.paper, fontFamily: "'Panel Sans',sans-serif" }}>
        Moje sezóny
      </div>

      <div
        style={{
          borderRadius: 12,
          padding: '12px 12px',
          background: `linear-gradient(135deg, ${LSS.crimson} 0%, #6E1B1A 100%)`,
        }}
      >
        <div style={{ fontSize: 6.5, fontWeight: 800, letterSpacing: '.14em', color: `${P}0.65)` }}>
          ÚROVEŇ
        </div>
        <div
          style={{
            fontSize: 21,
            fontWeight: 900,
            color: LSS.paper,
            fontFamily: "'Panel Sans',sans-serif",
            lineHeight: 1.1,
          }}
        >
          Zlatá
        </div>
        <div style={{ fontSize: 7, color: `${P}0.7)`, marginTop: 2 }}>7. sezóna · 31 představení</div>
        <div
          style={{
            marginTop: 9,
            height: 4,
            borderRadius: 2,
            background: 'rgba(0,0,0,0.3)',
            overflow: 'hidden',
          }}
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '72%' }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ height: '100%', background: LSS.giltSoft }}
          />
        </div>
        <div style={{ fontSize: 6.5, color: `${P}0.6)`, marginTop: 4 }}>
          Do úrovně Mecenáš zbývají 4 představení
        </div>
      </div>

      {urovne.map(([n, done]) => (
        <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: '50%',
              flexShrink: 0,
              background: done ? LSS.gilt : `${P}0.08)`,
              border: done ? 'none' : `1px solid ${P}0.16)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 7,
              color: LSS.ink,
              fontWeight: 900,
            }}
          >
            {done ? '✓' : ''}
          </div>
          <div style={{ fontSize: 8.5, fontWeight: 700, color: done ? LSS.paper : `${P}0.35)` }}>{n}</div>
        </div>
      ))}

      <div
        style={{
          marginTop: 'auto',
          marginBottom: 8,
          borderRadius: 9,
          background: `${P}0.05)`,
          border: `1px solid ${P}0.08)`,
          padding: '8px 9px',
        }}
      >
        <div style={{ fontSize: 7.5, fontWeight: 800, color: LSS.giltSoft, marginBottom: 2 }}>
          Výhoda úrovně
        </div>
        <div style={{ fontSize: 7, color: `${P}0.5)`, lineHeight: 1.45 }}>
          Přednostní nákup 48 hodin před spuštěním předprodeje ročníku 2028.
        </div>
      </div>
    </div>
  )
}

/* ── CRM: profil diváka ─────────────────────────────────────── */
export function DivakProfil({ accent }: { accent: string }) {
  const historie = [
    ['Macbeth', 'Pražský hrad', '17. 7. 2026', '1 290 Kč'],
    ['Večer tříkrálový', 'HAMU', '12. 8. 2026', '890 Kč'],
    ['Zimní pohádka', 'Špilberk', '3. 8. 2025', '990 Kč'],
    ['Othello', 'Pražský hrad', '22. 7. 2025', '1 190 Kč'],
  ]
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ background: LSS.ink, border: '1px solid rgba(20,16,26,0.1)' }}
    >
      <div
        className="px-6 py-5 flex items-center gap-4"
        style={{ borderBottom: `1px solid ${P}0.08)` }}
      >
        <div
          style={{
            width: 46,
            height: 46,
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${accent} 0%, #1C6157 100%)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 900,
            color: LSS.paper,
            fontFamily: "'Panel Sans',sans-serif",
            flexShrink: 0,
          }}
        >
          JN
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-bold" style={{ color: LSS.paper }}>
            Jana Nováková
          </div>
          <div className="text-xs" style={{ color: `${P}0.42)` }}>
            Divačka od roku 2019 · Praha
          </div>
        </div>
        <div className="flex gap-2 flex-wrap justify-end">
          {['Abonentka', 'Zlatá úroveň', 'Souhlas s e-maily'].map((t) => (
            <span
              key={t}
              className="text-[10px] font-semibold px-2.5 py-1 rounded-full"
              style={{ background: `${accent}22`, color: accent, border: `1px solid ${accent}3a` }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4" style={{ borderBottom: `1px solid ${P}0.08)` }}>
        {[
          ['31', 'představení'],
          ['7', 'sezón v řadě'],
          ['28 400 Kč', 'útrata celkem'],
          ['4', 'darované vstupenky'],
        ].map(([v, l], i) => (
          <div key={l} className="px-6 py-4" style={{ borderRight: i < 3 ? `1px solid ${P}0.08)` : undefined }}>
            <div
              className="font-black leading-none"
              style={{ fontFamily: "'Panel Sans',sans-serif", color: LSS.paper, fontSize: 20 }}
            >
              {v}
            </div>
            <div className="text-[11px] mt-1.5" style={{ color: `${P}0.38)` }}>
              {l}
            </div>
          </div>
        ))}
      </div>

      <div className="px-6 py-5">
        <div
          className="text-[10px] font-semibold tracking-[0.16em] uppercase mb-3"
          style={{ color: `${P}0.32)` }}
        >
          Historie návštěv
        </div>
        <div className="flex flex-col gap-1.5">
          {historie.map(([t, s, d, c]) => (
            <div
              key={`${t}${d}`}
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs"
              style={{ background: `${P}0.04)` }}
            >
              <span className="font-bold flex-1 min-w-0 truncate" style={{ color: LSS.paper }}>
                {t}
              </span>
              <span style={{ color: `${P}0.38)` }} className="hidden md:inline">
                {s}
              </span>
              <span style={{ color: `${P}0.38)` }}>{d}</span>
              <span className="font-bold" style={{ color: accent }}>
                {c}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── CRM: stavba segmentu ───────────────────────────────────── */
export function SegmentBuilder({ accent }: { accent: string }) {
  const rules = [
    ['Navštívil/a', 'alespoň 2 představení', 'v ročníku 2026'],
    ['Nenakoupil/a', 'žádnou vstupenku', 'v ročníku 2027'],
    ['Scéna', 'Praha nebo Brno', ''],
    ['Souhlas', 's e-mailovou komunikací', ''],
  ]
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ background: LSS.paperDeep, border: '1px solid rgba(20,16,26,0.09)' }}
    >
      <div
        className="px-6 py-4 flex items-center justify-between"
        style={{ borderBottom: '1px solid rgba(20,16,26,0.08)' }}
      >
        <span className="font-bold text-sm" style={{ color: LSS.ink }}>
          Segment: loňští diváci, kteří se letos nevrátili
        </span>
        <span
          className="text-xs font-bold px-3 py-1 rounded-full"
          style={{ background: `${accent}1e`, color: accent }}
        >
          4 318 diváků
        </span>
      </div>
      <div className="p-6 flex flex-col gap-2">
        {rules.map((r, i) => (
          <div key={i} className="flex items-center gap-2 flex-wrap">
            {i > 0 && (
              <span
                className="text-[10px] font-bold px-2 py-0.5 rounded"
                style={{ background: 'rgba(20,16,26,0.08)', color: 'rgba(20,16,26,0.5)' }}
              >
                A ZÁROVEŇ
              </span>
            )}
            <span
              className="text-xs font-semibold px-3 py-1.5 rounded-lg"
              style={{ background: LSS.paper, border: '1px solid rgba(20,16,26,0.1)', color: LSS.ink }}
            >
              {r[0]}
            </span>
            <span
              className="text-xs px-3 py-1.5 rounded-lg"
              style={{ background: `${accent}12`, color: accent, fontWeight: 600 }}
            >
              {r[1]}
            </span>
            {r[2] && (
              <span className="text-xs" style={{ color: 'rgba(20,16,26,0.5)' }}>
                {r[2]}
              </span>
            )}
          </div>
        ))}
        <div
          className="mt-3 pt-4 flex items-center gap-2 flex-wrap"
          style={{ borderTop: '1px solid rgba(20,16,26,0.08)' }}
        >
          <span className="text-xs font-semibold" style={{ color: 'rgba(20,16,26,0.5)' }}>
            Další krok:
          </span>
          {['E-mail s programem', 'Sleva 15 % na úterky', 'Upozornění pro diváka'].map((a) => (
            <span
              key={a}
              className="text-xs font-semibold px-3 py-1.5 rounded-full"
              style={{ background: accent, color: LSS.paper }}
            >
              {a}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
