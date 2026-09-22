'use client'

/**
 * StageDiagram — ekosystém nakreslený jako hlediště.
 *
 * Nahrazuje kruhový orbit ze sportovní verze prezentace. Produkty sedí
 * v řadách amfiteátru, všechny natočené k jevišti, na kterém stojí divák.
 * SSO leží v první řadě jako základ, na kterém ostatní nástroje stojí.
 *
 * Geometrie: ohnisko (střed jeviště) je v bodě [CX, CY], řady jsou oblouky
 * o poloměru R_INNER a R_OUTER nad ním.
 */

import { useState } from 'react'
import { motion } from 'framer-motion'
import type { Product } from '@/lib/products'
import { LSS } from '@/lib/lss'

const VB_W = 1280
const VB_Y = 160
const VB_H = 630
const CX = 640
const CY = 726

const R_INNER = 300
const R_OUTER = 462

const NODE_W = 164
const NODE_H = 104

const SSO_W = 172
const SSO_H = 118
const SSO_R = 158

const INNER_ANGLES = [-42, -14, 14, 42]
const OUTER_ANGLES = [-62, -37.2, -12.4, 12.4, 37.2, 62]

function seat(angleDeg: number, r: number) {
  const a = (angleDeg * Math.PI) / 180
  return { x: CX + Math.sin(a) * r, y: CY - Math.cos(a) * r }
}

export default function StageDiagram({
  products,
  onProductClick,
}: {
  products: Product[]
  onProductClick: (slug: string) => void
}) {
  const [hovered, setHovered] = useState<string | null>(null)

  const sso = products.find((p) => p.slug === 'sso')
  const rows = products.filter((p) => p.slug !== 'sso')
  const inner = rows.slice(0, INNER_ANGLES.length)
  const outer = rows.slice(INNER_ANGLES.length)

  const placed = [
    ...inner.map((p, i) => ({ p, ...seat(INNER_ANGLES[i], R_INNER), row: 'A' as const })),
    ...outer.map((p, i) => ({ p, ...seat(OUTER_ANGLES[i], R_OUTER), row: 'B' as const })),
  ]

  const ssoPos = { x: CX, y: CY - SSO_R }

  return (
    <svg
      viewBox={`70 ${VB_Y} ${VB_W - 140} ${VB_H}`}
      style={{ width: 'min(100vw, 214vh)', height: 'auto', maxHeight: '106%' }}
      overflow="visible"
    >
      <defs>
        <linearGradient id="sd-stage" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={LSS.giltSoft} />
          <stop offset="100%" stopColor="#B98D1C" />
        </linearGradient>
        <radialGradient id="sd-stageglow" cx="50%" cy="100%" r="70%">
          <stop offset="0%" stopColor={LSS.giltSoft} stopOpacity="0.30" />
          <stop offset="55%" stopColor={LSS.crimson} stopOpacity="0.10" />
          <stop offset="100%" stopColor={LSS.crimson} stopOpacity="0" />
        </radialGradient>
        <filter id="sd-glow" x="-70%" y="-70%" width="240%" height="240%">
          <feGaussianBlur stdDeviation="16" />
        </filter>
      </defs>

      {/* Záře rampy */}
      <ellipse cx={CX} cy={CY} rx={560} ry={420} fill="url(#sd-stageglow)" />

      {/* Oblouky řad */}
      {[R_INNER, R_OUTER].map((r) => (
        <path
          key={r}
          d={describeArc(CX, CY, r, -70, 70)}
          fill="none"
          stroke="rgba(246,241,232,0.07)"
          strokeWidth="1"
        />
      ))}

      {/* Světelné kužely z jeviště k jednotlivým produktům */}
      {placed.map(({ p, x, y }) => {
        const active = hovered === p.slug
        const dx = x - CX
        const dy = y - CY
        const len = Math.hypot(dx, dy)
        const nx = -dy / len
        const ny = dx / len
        const half = active ? 30 : 17
        return (
          <motion.polygon
            key={`beam-${p.slug}`}
            points={`${CX},${CY} ${x + nx * half},${y + ny * half} ${x - nx * half},${y - ny * half}`}
            fill={p.color}
            animate={{ opacity: active ? 0.3 : 0.1 }}
            transition={{ duration: 0.25 }}
          />
        )
      })}

      {/* Kužel k SSO */}
      <polygon
        points={`${CX},${CY} ${CX + 34},${ssoPos.y} ${CX - 34},${ssoPos.y}`}
        fill={sso?.color ?? '#4FB477'}
        opacity={hovered === 'sso' ? 0.26 : 0.08}
      />

      {/* ── Jeviště ── */}
      <g>
        <rect x={CX - 236} y={CY - 32} width={472} height={64} rx={9} fill="url(#sd-stage)" />
        <text
          x={CX}
          y={CY + 9}
          textAnchor="middle"
          style={{
            fontFamily: "'Panel Sans', sans-serif",
            fontSize: 25,
            fontWeight: 900,
            letterSpacing: '0.34em',
            fill: '#1B1207',
          }}
        >
          DIVÁK
        </text>
        {/* Rampa */}
        {Array.from({ length: 11 }).map((_, i) => (
          <circle key={i} cx={CX - 216 + i * 43} cy={CY - 44} r={3.6} fill="#F6E7B8" opacity={0.75} />
        ))}
      </g>

      {/* ── SSO v první řadě ── */}
      <NodeBox
        x={ssoPos.x}
        y={ssoPos.y}
        w={SSO_W}
        h={SSO_H}
        product={sso}
        hovered={hovered === 'sso'}
        onEnter={() => setHovered('sso')}
        onLeave={() => setHovered(null)}
        onClick={() => onProductClick('sso')}
        caption="Základ ekosystému"
      />

      {/* ── Produkty v řadách ── */}
      {placed.map(({ p, x, y }, i) => (
        <NodeBox
          key={p.slug}
          x={x}
          y={y}
          w={NODE_W}
          h={NODE_H}
          product={p}
          hovered={hovered === p.slug}
          onEnter={() => setHovered(p.slug)}
          onLeave={() => setHovered(null)}
          onClick={() => onProductClick(p.slug)}
          float={i}
        />
      ))}
    </svg>
  )
}

function NodeBox({
  x,
  y,
  w,
  h,
  product,
  hovered,
  onEnter,
  onLeave,
  onClick,
  caption,
  float,
}: {
  x: number
  y: number
  w: number
  h: number
  product?: Product
  hovered: boolean
  onEnter: () => void
  onLeave: () => void
  onClick: () => void
  caption?: string
  float?: number
}) {
  if (!product) return null
  const lines = product.label.split('\n')

  return (
    <motion.g
      style={{ transformOrigin: `${x}px ${y}px`, cursor: 'pointer' }}
      animate={{ scale: hovered ? 1.07 : 1 }}
      transition={{ duration: 0.2 }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={onClick}
    >
      {hovered && (
        <rect
          x={x - w / 2 - 10}
          y={y - h / 2 - 10}
          width={w + 20}
          height={h + 20}
          rx={20}
          fill={product.color}
          opacity={0.3}
          filter="url(#sd-glow)"
        />
      )}
      <foreignObject x={x - w / 2} y={y - h / 2} width={w} height={h} overflow="visible">
        <div
          style={{
            width: w,
            height: h,
            borderRadius: 15,
            background: hovered
              ? `linear-gradient(160deg, ${product.color}3d 0%, rgba(18,11,18,0.97) 68%)`
              : 'linear-gradient(160deg, rgba(34,20,28,0.95) 0%, rgba(14,9,14,0.95) 100%)',
            border: `1.5px solid ${hovered ? product.color : 'rgba(246,241,232,0.12)'}`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 5,
            padding: '0 8px',
            transition: 'background 0.2s, border-color 0.2s',
            animation:
              float === undefined ? undefined : `orbit-float 5s ease-in-out ${(float % 5) * 0.4}s infinite`,
          }}
        >
          <span style={{ fontSize: 26, lineHeight: 1 }}>{product.icon}</span>
          {lines.map((line, li) => (
            <span
              key={li}
              style={{
                fontSize: 13.5,
                fontWeight: 800,
                lineHeight: 1.18,
                textAlign: 'center',
                display: 'block',
                color: hovered ? product.color : 'rgba(246,241,232,0.9)',
                fontFamily: 'Mulish, sans-serif',
                whiteSpace: 'nowrap',
                transition: 'color 0.2s',
              }}
            >
              {line}
            </span>
          ))}
          {caption && (
            <span
              style={{
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'rgba(246,241,232,0.38)',
                fontFamily: 'Mulish, sans-serif',
                whiteSpace: 'nowrap',
                marginTop: 1,
              }}
            >
              {caption}
            </span>
          )}
        </div>
      </foreignObject>
    </motion.g>
  )
}

/** Oblouk otevřený vzhůru, úhly ve stupních od svislice. */
function describeArc(cx: number, cy: number, r: number, from: number, to: number) {
  const a = seatAt(cx, cy, r, from)
  const b = seatAt(cx, cy, r, to)
  return `M ${a.x} ${a.y} A ${r} ${r} 0 0 1 ${b.x} ${b.y}`
}

function seatAt(cx: number, cy: number, r: number, angleDeg: number) {
  const a = (angleDeg * Math.PI) / 180
  return { x: cx + Math.sin(a) * r, y: cy - Math.cos(a) * r }
}
