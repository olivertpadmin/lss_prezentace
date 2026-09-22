'use client'

/**
 * NightSky — společné pozadí prezentace pro Letní shakespearovské slavnosti.
 *
 * Představuje letní noc nad hradním nádvořím: obloha, měsíc, silueta hradu
 * a teplá záře divadelní rampy zdola. Nahrazuje vesmírné pozadí sportovní
 * verze prezentace.
 *
 * `variant="full"`  – kompletní scéna včetně siluety hradu (hub stránka)
 * `variant="quiet"` – jen obloha a záře, bez siluety (hero podstránek)
 */

const CASTLE_PATH =
  'M 0 200 L 0 152 L 0 140 L 24 140 L 24 152 L 43 152 L 43 140 L 66 140 L 66 152 L 86 152 L 86 140 L 109 140 L 109 152 L 129 152 L 129 140 L 152 140 L 152 152 L 171 152 L 171 140 L 195 140 L 195 152 L 214 152 L 214 140 L 238 140 L 238 152 L 257 152 L 257 140 L 281 140 L 281 152 L 300 152 L 300 140 L 306 118 L 306 104 L 318 104 L 318 118 L 328 118 L 328 104 L 339 104 L 339 118 L 349 118 L 349 104 L 361 104 L 361 118 L 370 118 L 370 104 L 382 104 L 382 118 L 392 118 L 392 104 L 398 132 L 470 132 L 470 122 L 560 122 L 560 96 L 596 96 L 606 26 L 616 96 L 640 96 L 640 62 L 700 62 L 712 8 L 724 62 L 760 62 L 760 96 L 782 96 L 792 34 L 802 96 L 838 96 L 838 126 L 900 126 L 912 112 L 1020 112 L 1032 126 L 1078 126 L 1078 108 L 1090 108 L 1104 74 L 1118 108 L 1130 108 L 1130 146 L 1130 134 L 1151 134 L 1151 146 L 1169 146 L 1169 134 L 1190 134 L 1190 146 L 1208 146 L 1208 134 L 1229 134 L 1229 146 L 1246 146 L 1246 134 L 1268 134 L 1268 146 L 1285 146 L 1285 134 L 1306 134 L 1306 146 L 1324 146 L 1324 134 L 1345 134 L 1345 146 L 1362 146 L 1362 134 L 1384 134 L 1384 146 L 1401 146 L 1401 134 L 1423 134 L 1423 146 L 1440 146 L 1440 200 Z'

/** Pevné hvězdy — žádný Math.random(), aby nedocházelo k hydration chybám. */
const STARS: [number, number, number, number][] = [
  // x %, y %, r, opacity
  [4, 9, 1.0, 0.75], [11, 22, 0.7, 0.5], [17, 6, 1.2, 0.85], [23, 17, 0.6, 0.45],
  [29, 4, 0.9, 0.7], [34, 13, 0.7, 0.55], [41, 7, 1.1, 0.8], [47, 19, 0.6, 0.4],
  [53, 5, 0.85, 0.65], [59, 15, 0.7, 0.5], [65, 8, 1.15, 0.8], [71, 21, 0.6, 0.45],
  [77, 6, 0.95, 0.7], [83, 16, 0.7, 0.5], [89, 10, 1.05, 0.75], [95, 20, 0.65, 0.45],
  [7, 34, 0.8, 0.5], [15, 43, 0.6, 0.35], [26, 31, 0.9, 0.55], [37, 40, 0.65, 0.4],
  [62, 36, 0.75, 0.45], [74, 44, 0.6, 0.35], [86, 33, 0.85, 0.5], [93, 42, 0.65, 0.4],
  [3, 54, 0.7, 0.4], [96, 57, 0.75, 0.42], [20, 62, 0.6, 0.3], [80, 64, 0.6, 0.3],
]

/** Světlušky nad nádvořím — pomalý teplý pohyb. */
const EMBERS: [number, number, number, number][] = [
  // x %, y %, duration s, delay s
  [12, 74, 11, 0], [22, 82, 14, 2.5], [31, 70, 9, 4], [44, 86, 13, 1.2],
  [57, 73, 10, 5.5], [68, 84, 15, 3], [78, 71, 12, 6.5], [88, 80, 10, 1.8],
  [17, 66, 16, 7.5], [72, 63, 13, 9],
]

export default function NightSky({
  variant = 'full',
  showCastle,
}: {
  variant?: 'full' | 'quiet'
  showCastle?: boolean
}) {
  const castle = showCastle ?? variant === 'full'

  return (
    <>
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 0 }}
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="lss-sky" cx="50%" cy="22%" r="78%">
            <stop offset="0%" stopColor="#2A1D33" stopOpacity="0.85" />
            <stop offset="45%" stopColor="#170F1D" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#0B0810" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="lss-footlight" cx="50%" cy="100%" r="62%">
            <stop offset="0%" stopColor="#E4C55E" stopOpacity="0.30" />
            <stop offset="35%" stopColor="#C9772F" stopOpacity="0.15" />
            <stop offset="72%" stopColor="#A33230" stopOpacity="0.07" />
            <stop offset="100%" stopColor="#A33230" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="lss-crimson" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#A33230" stopOpacity="0.20" />
            <stop offset="100%" stopColor="#A33230" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="lss-moon-halo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F3E9D2" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#F3E9D2" stopOpacity="0" />
          </radialGradient>
          <filter id="lss-blur" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="8" />
          </filter>
        </defs>

        {/* Obloha */}
        <rect width="100%" height="100%" fill="url(#lss-sky)" />
        {/* Cihlová záře kolem středu — odkaz na logotyp */}
        <ellipse cx="50%" cy="52%" rx="42%" ry="34%" fill="url(#lss-crimson)" />
        {/* Rampa — teplé světlo zdola */}
        <rect y="46%" width="100%" height="54%" fill="url(#lss-footlight)" />

        {/* Hvězdy */}
        {STARS.map(([x, y, r, op], i) => (
          <circle key={i} cx={`${x}%`} cy={`${y}%`} r={r} fill="#F6F1E8" opacity={op}>
            <animate
              attributeName="opacity"
              values={`${op};${(op * 0.25).toFixed(2)};${op}`}
              dur={`${3 + (i % 5)}s`}
              begin={`${(i * 0.37) % 5}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}

        {/* Měsíc — dorůstající, vpravo nahoře */}
        <g>
          <circle cx="86%" cy="13%" r="46" fill="url(#lss-moon-halo)" />
          <circle cx="86%" cy="13%" r="17" fill="#F3E9D2" opacity="0.92" />
          <circle cx="84.6%" cy="11.8%" r="3.4" fill="#D8CCAF" opacity="0.5" />
          <circle cx="87.2%" cy="14.6%" r="2.2" fill="#D8CCAF" opacity="0.42" />
          <circle cx="85.4%" cy="15.4%" r="1.5" fill="#D8CCAF" opacity="0.36" />
          <circle cx="87.9%" cy="12.4%" r="16" fill="#0B0810" opacity="0.62" />
        </g>
      </svg>

      {/* Silueta hradu — pod orbitem, nad pozadím */}
      {castle && (
        <svg
          className="absolute left-0 bottom-0 w-full pointer-events-none"
          style={{ zIndex: 2, height: 230 }}
          viewBox="0 0 1440 200"
          preserveAspectRatio="xMidYMax slice"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="lss-castle" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1C1220" stopOpacity="0.92" />
              <stop offset="100%" stopColor="#07050A" stopOpacity="1" />
            </linearGradient>
          </defs>
          {/* Nasvícení hradu zespodu */}
          <ellipse cx="712" cy="196" rx="470" ry="92" fill="#C9A227" opacity="0.16" filter="url(#lss-blur)" />
          <path d={CASTLE_PATH} fill="url(#lss-castle)" />
          {/* Rozsvícená okna */}
          {[
            [452, 126], [478, 126], [504, 126], [936, 120], [962, 120], [988, 120],
            [330, 112], [356, 112], [1160, 142], [1200, 142], [1246, 142],
          ].map(([x, y], i) => (
            <rect key={i} x={x} y={y} width="5" height="7" rx="1" fill="#E4C55E" opacity="0.75">
              <animate
                attributeName="opacity"
                values="0.75;0.3;0.75"
                dur={`${6 + (i % 4) * 2}s`}
                begin={`${i * 0.8}s`}
                repeatCount="indefinite"
              />
            </rect>
          ))}
        </svg>
      )}

      {/* Světlušky nad nádvořím */}
      {variant === 'full' &&
        EMBERS.map(([x, y, dur, delay], i) => (
          <span
            key={i}
            className="absolute pointer-events-none lss-ember"
            style={{
              zIndex: 3,
              left: `${x}%`,
              top: `${y}%`,
              width: 3,
              height: 3,
              borderRadius: '50%',
              background: '#E4C55E',
              boxShadow: '0 0 8px 2px rgba(228,197,94,0.45)',
              animationDuration: `${dur}s`,
              animationDelay: `${delay}s`,
            }}
          />
        ))}
    </>
  )
}
