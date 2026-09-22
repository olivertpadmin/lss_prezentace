'use client'

import React from 'react'
import { motion } from 'framer-motion'
import SectionNav from '@/components/SectionNav'
import {
  CountUp,
  DarkPanel,
  FeatureTile,
  LssHero,
  LssPage,
  LssSection,
} from '@/components/lss/LssKit'
import { LSS } from '@/lib/lss'

const ACCENT = '#C2557A'

/* ── Hero vizuál — rozhovor s asistentem ────────────────────── */
const BARS = [
  { h: 34, l: 'Po' },
  { h: 41, l: 'Út' },
  { h: 52, l: 'St' },
  { h: 68, l: 'Čt' },
  { h: 81, l: 'Pá' },
  { h: 96, l: 'So' },
  { h: 74, l: 'Ne' },
]

function AIVisual() {
  return (
    <div className="relative select-none" style={{ width: 300, height: 246 }}>
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        style={{
          position: 'absolute',
          inset: 6,
          borderRadius: 16,
          background: 'linear-gradient(160deg, #1A0F16 0%, #0D080D 100%)',
          border: '1px solid rgba(246,241,232,0.11)',
          boxShadow: '0 24px 64px rgba(0,0,0,0.65)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            padding: '10px 13px',
            borderBottom: '1px solid rgba(246,241,232,0.07)',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <div
            style={{
              width: 21,
              height: 21,
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${ACCENT} 0%, #7C1540 100%)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 10,
            }}
          >
            ✨
          </div>
          <div>
            <div style={{ fontSize: 8, fontWeight: 800, color: LSS.paper }}>Asistent slavností</div>
            <div style={{ fontSize: 6, color: 'rgba(246,241,232,0.32)' }}>
              Pracuje jen s daty vašeho festivalu
            </div>
          </div>
        </div>

        <div style={{ padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.75 }}
            style={{ alignSelf: 'flex-end', maxWidth: '80%' }}
          >
            <div
              style={{
                background: ACCENT,
                borderRadius: '10px 10px 2px 10px',
                padding: '6px 9px',
                fontSize: 7.5,
                color: LSS.paper,
                lineHeight: 1.45,
              }}
            >
              Jak se prodává Hamlet na Špilberku?
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.6, delay: 1.15, times: [0, 0.25, 1] }}
            style={{ display: 'flex', gap: 3, padding: '3px 8px' }}
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 0.5, delay: 1.15 + i * 0.1, repeat: 2 }}
                style={{ width: 4.5, height: 4.5, borderRadius: '50%', background: 'rgba(246,241,232,0.3)' }}
              />
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 1.85 }}
            style={{ maxWidth: '92%' }}
          >
            <div
              style={{
                background: 'rgba(246,241,232,0.06)',
                border: '1px solid rgba(246,241,232,0.08)',
                borderRadius: '2px 10px 10px 10px',
                padding: '8px 10px',
              }}
            >
              <div style={{ fontSize: 7.5, color: 'rgba(246,241,232,0.62)', lineHeight: 1.5, marginBottom: 8 }}>
                Šest repríz, průměrná obsazenost{' '}
                <span style={{ color: ACCENT, fontWeight: 800 }}>82 %</span>. Víkendy vyprodané,
                slabé jsou úterky.
              </div>
              <div style={{ display: 'flex', gap: 3, alignItems: 'flex-end', height: 46 }}>
                {BARS.map((b, i) => (
                  <div
                    key={b.l}
                    style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}
                  >
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: (b.h / 100) * 36 }}
                      transition={{ duration: 0.5, delay: 2.05 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                      style={{
                        width: '100%',
                        background:
                          b.h > 90 ? `linear-gradient(to top, ${ACCENT}, #E890AE)` : 'rgba(246,241,232,0.14)',
                        borderRadius: '2px 2px 0 0',
                        minHeight: 2,
                      }}
                    />
                    <div style={{ fontSize: 4.5, color: 'rgba(246,241,232,0.3)' }}>{b.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 2.65, type: 'spring' }}
            style={{
              alignSelf: 'flex-start',
              background: `${ACCENT}26`,
              border: `1px solid ${ACCENT}44`,
              borderRadius: 8,
              padding: '4px 8px',
              display: 'flex',
              alignItems: 'center',
              gap: 5,
            }}
          >
            <span style={{ fontSize: 7 }}>💡</span>
            <span style={{ fontSize: 6.5, color: ACCENT, fontWeight: 800 }}>
              Nabídnout úterky brněnským abonentům
            </span>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

const OTAZKY = [
  {
    q: 'Které tituly se letos prodávaly hůř než loni?',
    a: 'Porovná ročníky po titulech a scénách, zohlední počet repríz a upozorní, kde je rozdíl statisticky významný a kde jde o šum.',
  },
  {
    q: 'Kolik diváků z loňska si letos ještě nic nekoupilo?',
    a: 'Vytáhne segment z CRM, rozdělí ho podle scén a rovnou nabídne, že na něj připraví e-mail s programem.',
  },
  {
    q: 'Vyplatí se přidat reprízu Snu noci svatojánské?',
    a: 'Porovná tempo prodeje se srovnatelnými tituly v minulých ročnících a odhadne obsazenost dalšího termínu.',
  },
  {
    q: 'Jak se liší brněnské publikum od pražského?',
    a: 'Ukáže rozdíly v cenových kategoriích, dnech v týdnu, podílu abonentů i v tom, jak daleko předem lidé nakupují.',
  },
  {
    q: 'Připrav shrnutí sezóny pro partnery.',
    a: 'Sestaví přehled návštěvnosti, struktury publika a mediálního dosahu ve formátu, který jde přiložit k vyúčtování.',
  },
]

const SCHOPNOSTI = [
  { icon: '📈', title: 'Odhad prodeje', desc: 'Vývoj prodeje na konkrétní termín podle historie srovnatelných titulů a tempa v předprodeji.' },
  { icon: '💰', title: 'Doporučení k cenám', desc: 'Kde je prostor cenu zvednout a kde naopak pomůže sleva na slabý všední termín.' },
  { icon: '✍️', title: 'Příprava textů', desc: 'Anotace inscenací, příspěvky na sítě a e-maily laděné podle titulu a cílové skupiny.' },
  { icon: '🎯', title: 'Návrh cílení', desc: 'Které segmenty diváků oslovit u kterého titulu a přes jaký kanál.' },
  { icon: '📋', title: 'Reporty po sezóně', desc: 'Souhrn ročníku s klíčovými čísly a doporučeními pro dramaturgii dalšího roku.' },
  { icon: '💬', title: 'Běžný jazyk', desc: 'Ptáte se česky, jako byste se ptali kolegy. Žádné filtry, žádné sestavy, žádné čekání na report.' },
]

export default function LssAiAsistentPage() {
  return (
    <LssPage accent={ACCENT}>
      <LssHero
        accent={ACCENT}
        label="AI asistent"
        eyebrow="Produkt 07"
        title={
          <>
            Zeptejte se
            <br />
            svých dat
          </>
        }
        lead={
          <>
            Asistent pracuje výhradně s daty vašeho festivalu — prodeji, návštěvností, cashless
            útratou a průchody přes vstup. Odpovídá česky a do dvou sekund.
          </>
        }
        visual={<AIVisual />}
        stats={[
          { value: '100 %', label: 'vašich dat', note: 'Model se nesdílí s jinými pořadateli' },
          { value: <><CountUp to={6} />+</>, label: 'zdrojů z ekosystému', note: 'Ticketing, CRM, brány, gastro, web' },
          { value: '< 2 s', label: 'doba odpovědi', note: 'Dotazy nad živými daty' },
        ]}
      />

      <div className="max-w-5xl mx-auto px-8 pb-24">
        <DarkPanel
          id="jak"
          accent={ACCENT}
          eyebrow="Jak to funguje"
          heading={
            <>
              Není to chatbot
              <br />
              z internetu
            </>
          }
        >
          <p className="text-[16px] leading-relaxed max-w-2xl mb-8" style={{ color: 'rgba(246,241,232,0.55)' }}>
            Asistent nemá přístup k datům jiných pořadatelů a vaše data neopouštějí ekosystém. Zná
            jen to, co skutečně proteklo vaším provozem: prodané vstupenky, průchody branami, útratu
            na baru, historii diváků a jejich průchodech přes vstup.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {[
              ['🎟', 'Prodej vstupenek'],
              ['👥', 'Profily diváků'],
              ['🚪', 'Průchody branami'],
              ['🍷', 'Útrata na baru'],
              ['🚪', 'Průchody přes vstup'],
            ].map(([i, l]) => (
              <div
                key={l}
                className="rounded-2xl p-4 text-center"
                style={{ background: 'rgba(246,241,232,0.05)', border: '1px solid rgba(246,241,232,0.08)' }}
              >
                <div className="text-2xl mb-2">{i}</div>
                <div className="text-[11px] font-semibold" style={{ color: 'rgba(246,241,232,0.5)' }}>
                  {l}
                </div>
              </div>
            ))}
          </div>
        </DarkPanel>

        <LssSection
          id="otazky"
          heading="Na co se pořadatelé ptají"
          perex="Otázky, které dnes znamenají e-mail někomu, kdo umí pracovat s exporty, a odpověď za dva dny."
        >
          <div className="flex flex-col gap-3">
            {OTAZKY.map((o) => (
              <div key={o.q} className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(20,16,26,0.08)' }}>
                <div className="flex gap-3 px-5 py-4 items-start" style={{ background: LSS.paperDeep }}>
                  <span className="text-lg shrink-0">💬</span>
                  <p className="text-sm font-bold" style={{ color: LSS.ink }}>
                    {o.q}
                  </p>
                </div>
                <div className="flex gap-3 px-5 py-4 items-start" style={{ borderTop: '1px solid rgba(20,16,26,0.06)' }}>
                  <span
                    className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs"
                    style={{ background: `${ACCENT}1e`, color: ACCENT }}
                  >
                    ✨
                  </span>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(20,16,26,0.66)' }}>
                    {o.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </LssSection>

        <LssSection id="schopnosti" heading="Co asistent zvládne">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SCHOPNOSTI.map((s) => (
              <FeatureTile key={s.title} {...s} accent={ACCENT} />
            ))}
          </div>
        </LssSection>
      </div>

      <SectionNav
        accent={ACCENT}
        sections={[
          { id: 'hero', label: 'Úvod' },
          { id: 'jak', label: 'Jak to funguje' },
          { id: 'otazky', label: 'Otázky' },
          { id: 'schopnosti', label: 'Schopnosti' },
        ]}
      />
    </LssPage>
  )
}
