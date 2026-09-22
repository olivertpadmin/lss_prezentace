'use client'

import React, { useEffect, useRef } from 'react'
import { motion, useInView, useMotionValue, animate } from 'framer-motion'
import NightSky from '@/components/lss/NightSky'
import { LssBreadcrumb } from '@/components/lss/LssNav'
import { LSS, NIGHT } from '@/lib/lss'

export const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number]

export const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 } as { opacity: number; y: number },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, delay, ease: EASE },
})

/* ── Počítadlo ──────────────────────────────────────────────── */
export function CountUp({
  to,
  suffix = '',
  decimals = 0,
  duration = 2,
}: {
  to: number
  suffix?: string
  decimals?: number
  duration?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  const mv = useMotionValue(0)

  useEffect(() => {
    return mv.on('change', (v) => {
      if (ref.current) {
        const n = decimals
          ? v.toFixed(decimals).replace('.', ',')
          : Math.round(v).toLocaleString('cs-CZ').replace(/\u00a0/g, ' ')
        ref.current.textContent = `${n}${suffix}`
      }
    })
  }, [mv, suffix, decimals])

  useEffect(() => {
    if (!inView) return
    const c = animate(mv, to, { duration, ease: EASE })
    return () => c.stop()
  }, [inView, mv, to, duration])

  return <span ref={ref}>0{suffix}</span>
}

/* ── Hero podstránky ────────────────────────────────────────── */
export function LssHero({
  accent,
  label,
  eyebrow,
  title,
  lead,
  visual,
  stats,
}: {
  accent: string
  label: string
  eyebrow: string
  title: React.ReactNode
  lead: React.ReactNode
  visual?: React.ReactNode
  stats?: { value: React.ReactNode; label: string; note: string }[]
}) {
  return (
    <>
      <LssBreadcrumb label={label} accent={accent} />
      <section id="hero" className="relative w-full overflow-hidden" style={{ background: NIGHT }}>
        <NightSky variant="quiet" />
        <div
          className="absolute pointer-events-none"
          style={{
            zIndex: 1,
            right: '6%',
            bottom: '8%',
            width: 460,
            height: 460,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${accent}22 0%, transparent 70%)`,
            filter: 'blur(50px)',
          }}
        />

        <div
          className="relative z-10 max-w-5xl mx-auto px-8 flex flex-col md:flex-row items-center gap-12 md:gap-0"
          style={{ paddingTop: 116, paddingBottom: visual ? 96 : 104 }}
        >
          <div className="flex-1 md:pr-12">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-[11px] font-semibold tracking-[0.2em] uppercase"
              style={{ color: accent }}
            >
              {eyebrow}
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.18, ease: EASE }}
              className="text-6xl md:text-7xl mt-4 mb-5 leading-[0.95]"
              style={{ fontFamily: "'Panel Sans', sans-serif", color: LSS.paper }}
            >
              {title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
              className="text-[17px] max-w-lg leading-relaxed"
              style={{ color: 'rgba(246,241,232,0.55)' }}
            >
              {lead}
            </motion.p>
          </div>
          {visual && (
            <motion.div
              initial={{ opacity: 0, x: 28 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.35, ease: EASE }}
              className="flex-shrink-0 flex items-center justify-center"
            >
              {visual}
            </motion.div>
          )}
        </div>

        {stats && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="relative z-10 border-t"
            style={{ borderColor: 'rgba(246,241,232,0.1)' }}
          >
            <div className="max-w-5xl mx-auto px-8">
              <div className="grid grid-cols-1 md:grid-cols-3">
                {stats.map((s, i) => (
                  <div
                    key={s.label}
                    className={i === 0 ? 'py-9 md:pr-10' : i === stats.length - 1 ? 'py-9 md:pl-10' : 'py-9 md:px-10'}
                    style={{
                      borderRight:
                        i < stats.length - 1 ? '1px solid rgba(246,241,232,0.1)' : undefined,
                    }}
                  >
                    <div
                      className="text-5xl md:text-6xl font-black leading-none"
                      style={{ fontFamily: "'Panel Sans', sans-serif", color: LSS.paper }}
                    >
                      {s.value}
                    </div>
                    <p className="text-sm font-semibold mt-3" style={{ color: 'rgba(246,241,232,0.5)' }}>
                      {s.label}
                    </p>
                    <p className="text-xs mt-1" style={{ color: 'rgba(246,241,232,0.28)' }}>
                      {s.note}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </section>
    </>
  )
}

/* ── Světlá sekce ───────────────────────────────────────────── */
export function LssSection({
  id,
  heading,
  perex,
  children,
  delay = 0,
  className = '',
}: {
  id: string
  heading?: string
  perex?: React.ReactNode
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  return (
    <motion.section id={id} {...fade(delay)} className={`pt-16 ${className}`}>
      {heading && (
        <h2 className="text-[26px] font-bold mb-2" style={{ color: LSS.ink }}>
          {heading}
        </h2>
      )}
      {perex && (
        <p className="text-[15px] mb-7 max-w-2xl leading-relaxed" style={{ color: 'rgba(20,16,26,0.6)' }}>
          {perex}
        </p>
      )}
      {children}
    </motion.section>
  )
}

/* ── Karta na papírovém podkladu ────────────────────────────── */
export function PaperCard({
  accent,
  children,
  className = '',
  style,
}: {
  accent?: string
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <div
      className={`rounded-2xl p-6 ${className}`}
      style={{
        background: LSS.paperDeep,
        border: `1px solid ${accent ? `${accent}26` : 'rgba(20,16,26,0.08)'}`,
        ...style,
      }}
    >
      {children}
    </div>
  )
}

/** Dlaždice funkce — ikona, název, popis, volitelný obsah. */
export function FeatureTile({
  icon,
  title,
  desc,
  accent,
  span,
  children,
}: {
  icon: string
  title: string
  desc: React.ReactNode
  accent: string
  span?: 'wide' | 'full'
  children?: React.ReactNode
}) {
  return (
    <div
      className={[
        'p-6 rounded-2xl transition-colors',
        span === 'full' ? 'md:col-span-2 lg:col-span-3' : span === 'wide' ? 'md:col-span-2' : '',
      ].join(' ')}
      style={{ background: LSS.paperDeep, border: '1px solid rgba(20,16,26,0.07)' }}
    >
      <span className="text-2xl mb-4 block">{icon}</span>
      <h3 className="font-bold text-base mb-2" style={{ color: LSS.ink }}>
        {title}
      </h3>
      <p className="text-sm leading-relaxed" style={{ color: 'rgba(20,16,26,0.62)' }}>
        {desc}
      </p>
      {children}
      <div className="mt-5 h-[3px] w-8 rounded-full" style={{ background: accent, opacity: 0.85 }} />
    </div>
  )
}

/** Tmavý panel uvnitř světlé stránky — pro klíčové sdělení. */
export function DarkPanel({
  id,
  accent,
  eyebrow,
  heading,
  children,
}: {
  id?: string
  accent: string
  eyebrow?: string
  heading: React.ReactNode
  children?: React.ReactNode
}) {
  return (
    <motion.section
      id={id}
      {...fade(0.05)}
      className="mt-16 rounded-3xl overflow-hidden"
      style={{ background: NIGHT, padding: '52px 46px' }}
    >
      {eyebrow && (
        <span className="text-[11px] font-semibold tracking-[0.2em] uppercase" style={{ color: accent }}>
          {eyebrow}
        </span>
      )}
      <h2
        className="text-3xl md:text-[40px] font-black mt-3 mb-4 leading-[1.05]"
        style={{ fontFamily: "'Panel Sans', sans-serif", color: LSS.paper }}
      >
        {heading}
      </h2>
      {children}
    </motion.section>
  )
}

/** Obal světlé podstránky. */
export function LssPage({
  accent,
  children,
}: {
  accent: string
  children: React.ReactNode
}) {
  return (
    <div
      className="min-h-screen"
      style={{ background: LSS.paper, ['--product-color' as string]: accent }}
    >
      {children}
    </div>
  )
}
