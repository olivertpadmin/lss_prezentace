'use client'

import React from 'react'
import { motion } from 'framer-motion'
import SectionNav from '@/components/SectionNav'
import { LssBreadcrumb } from '@/components/lss/LssNav'
import NightSky from '@/components/lss/NightSky'
import { EASE } from '@/components/lss/LssKit'
import { LSS } from '@/lib/lss'

const ACCENT = '#8A9A5B'

const iv = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 } as { opacity: number; y: number },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, delay, ease: EASE },
})

interface Studie {
  id: string
  klient: string
  obor: string
  color: string
  title: string
  vyzva: string
  reseni: string
  vysledky: { n: string; l: string }[]
  preklad: string
}

const STUDIE: Studie[] = [
  {
    id: 'uvolnena-mista',
    klient: 'SK Slavia Praha',
    obor: 'Sport · permanentky',
    color: '#C8102E',
    title: 'Prázdné sedadlo, za které nikdo nezaplatil podruhé',
    vyzva:
      'Držitelé permanentek nechodili na každý zápas. Místa zůstávala prázdná, klub z nich neměl druhou tržbu a atmosféra tím trpěla.',
    reseni:
      'Digitální permanentka se sledováním docházky. Kdo nemohl přijít, uvolnil místo zpět do prodeje nebo vstupenku jedním krokem daroval.',
    vysledky: [
      { n: '12 000', l: 'držitelů permanentek' },
      { n: '900', l: 'darovaných míst v průměru na zápas' },
      { n: '1 200', l: 'míst vráceno zpět do prodeje' },
      { n: '+120 %', l: 'tržby z uvolněných míst' },
    ],
    preklad:
      'Abonent slavností, kterému se sesype termín kvůli dovolené, dnes prostě nepřijde. Se stejným mechanismem uvolní místo zpět do prodeje nebo ho daruje — a vy prodáte sedadlo v Parteru A podruhé, za plnou cenu.',
  },
  {
    id: 'prednostni-nakup',
    klient: 'HC Sparta Praha',
    obor: 'Sport · cílený předprodej',
    color: '#E87722',
    title: 'Exkluzivní předprodej bez jediného ručně rozeslaného kódu',
    vyzva:
      'Klub chtěl zaplnit 6 000 míst spodního kotle O2 areny na prestižní zápasy ověřenými domácími fanoušky, ne překupníky a náhodnými kupci.',
    reseni:
      'Přednostní nákup se odemkl automaticky každému, kdo v předchozí sezóně koupil alespoň tři vstupenky. Žádné kódy, žádná ruční práce, žádné dotazy na podporu.',
    vysledky: [
      { n: 'Vyprodáno', l: 'v řádu minut u každého prioritního zápasu' },
      { n: '6 000', l: 'míst obsazeno ověřenými fanoušky' },
      { n: '0', l: 'ručně rozeslaných kódů' },
      { n: '100 %', l: 'kupujících prošlo ověřením historie' },
    ],
    preklad:
      'Držitelé dárkových poukazů mají dnes přednostní nákup řešený odkazem v e-mailu. Stejná logika dokáže odemknout předprodej i abonentům, mecenášům nebo divákům, kteří byli loni na třech představeních — automaticky, podle jejich skutečné historie.',
  },
  {
    id: 'pozdni-qr',
    klient: 'SK Slavia Praha',
    obor: 'Sport · Liga mistrů',
    color: '#9B1B30',
    title: 'Zkrácené okno pro překupníky u vyprodaných zápasů',
    vyzva:
      'U zápasů Ligy mistrů se vstupenky objevovaly na černém trhu za násobky ceny. Klub ztrácel kontrolu nad tím, kdo do stadionu skutečně vejde.',
    reseni:
      'Platné QR kódy se držitelům zobrazily až 24 hodin před výkopem. Časový prostor pro přeprodej se tím smrskl z týdnů na jeden den.',
    vysledky: [
      { n: '4', l: 'utkání Ligy mistrů' },
      { n: '70 000+', l: 'odeslaných vstupenek' },
      { n: '−80 %', l: 'falšovaných vstupenek' },
      { n: '3 hodiny', l: 'na rozeslání vstupenek na jedno utkání' },
    ],
    preklad:
      'Premiéra na Pražském hradě se vyprodá během dne. Pozdní doručení QR kódu je způsob, jak zajistit, že v hledišti sedí ti, kdo si vstupenku koupili — a ne ti, kdo ji koupili proto, aby ji dál přeprodali.',
  },
  {
    id: 'vernost',
    klient: 'HC Slovan Bratislava',
    obor: 'Sport · věrnostní program',
    color: '#003087',
    title: 'Důvod vracet se ke značce i mimo sezónu',
    vyzva:
      'Vztah s fanouškem končil poslední třetinou. Klub neměl jak udržet pozornost mezi zápasy ani v létě a přicházel o přímý kanál komunikace.',
    reseni:
      'Věrnostní program s šesti úrovněmi. Body za nákupy i za docházku, odměny podle dosažené úrovně a benefity od partnerů klubu.',
    vysledky: [
      { n: 'Tisíce', l: 'zapojených fanoušků' },
      { n: '6 úrovní', l: 'od základní po Legendu klubu' },
      { n: 'Týdně', l: 'opakované návraty aktivních uživatelů' },
      { n: '100 %', l: 'vlastních dat o zapojení' },
    ],
    preklad:
      'Slavnosti mají devět měsíců mimo sezónu. Úrovně podle počtu odchozených ročníků dávají divákovi důvod sledovat vás i v zimě — a vám důvod se ozvat s něčím jiným než s výzvou ke koupi.',
  },
]

export default function LssPripadoveStudiePage() {
  return (
    <div className="min-h-screen relative" style={{ background: 'linear-gradient(170deg, #0B0810 0%, #1A1119 50%, #14101A 100%)' }}>
      <NightSky variant="quiet" />
      <LssBreadcrumb label="Případové studie" accent={ACCENT} />

      <div className="relative z-10 max-w-6xl mx-auto px-8 pt-28 pb-8" id="hero">
        <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1, ease: EASE }}>
          <span className="text-[11px] font-semibold tracking-[0.2em] uppercase" style={{ color: ACCENT }}>
            Případové studie
          </span>
          <h1
            className="text-5xl md:text-7xl mt-4 mb-4 leading-[0.95]"
            style={{ fontFamily: "'Panel Sans', sans-serif", color: LSS.paper }}
          >
            Odzkoušeno jinde,
            <br />
            použitelné u vás
          </h1>
          <p className="text-[17px] max-w-2xl leading-relaxed" style={{ color: 'rgba(246,241,232,0.5)' }}>
            Nejsilnější čísla máme zatím ze sportu — tam se ticketing ekosystému PLG používá nejdéle.
            Mechanismy za nimi ale nejsou sportovní. U každé studie proto najdete i překlad do
            provozu slavností.
          </p>
        </motion.div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-8 pb-24 flex flex-col gap-6">
        {STUDIE.map((c, i) => (
          <motion.div
            key={c.id}
            id={c.id}
            {...iv(0.04 * i)}
            className="rounded-3xl overflow-hidden"
            style={{
              background: 'rgba(246,241,232,0.035)',
              border: '1px solid rgba(246,241,232,0.08)',
              boxShadow: `0 0 80px ${c.color}12`,
            }}
          >
            <div style={{ height: 4, background: `linear-gradient(90deg, ${c.color} 0%, ${c.color}50 60%, transparent 100%)` }} />
            <div className="p-8 md:p-10">
              <div className="flex items-center gap-3 mb-5 flex-wrap">
                <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: c.color }} />
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: 'rgba(246,241,232,0.45)' }}>
                  {c.klient}
                </span>
                <span
                  className="text-[10px] font-semibold px-2.5 py-1 rounded-full"
                  style={{ background: `${c.color}20`, color: c.color, border: `1px solid ${c.color}40` }}
                >
                  {c.obor}
                </span>
              </div>

              <h2
                className="text-2xl md:text-[32px] font-black mb-8 leading-tight max-w-3xl"
                style={{ fontFamily: "'Panel Sans', sans-serif", color: LSS.paper }}
              >
                {c.title}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-7">
                <div
                  className="rounded-2xl p-6"
                  style={{ background: 'rgba(246,241,232,0.035)', border: '1px solid rgba(246,241,232,0.07)' }}
                >
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: 'rgba(246,241,232,0.28)' }}>
                    Výzva
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(246,241,232,0.55)' }}>
                    {c.vyzva}
                  </p>
                </div>
                <div className="rounded-2xl p-6" style={{ background: `${c.color}0d`, border: `1px solid ${c.color}24` }}>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: `${c.color}cc` }}>
                    Řešení
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(246,241,232,0.55)' }}>
                    {c.reseni}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-7">
                {c.vysledky.map((r) => (
                  <div key={r.l} className="rounded-2xl p-5" style={{ background: `${c.color}12`, border: `1px solid ${c.color}28` }}>
                    <div
                      className="font-black leading-none mb-2"
                      style={{
                        fontFamily: "'Panel Sans', sans-serif",
                        color: c.color,
                        fontSize: r.n.length > 8 ? '1rem' : r.n.length > 5 ? '1.2rem' : '1.55rem',
                      }}
                    >
                      {r.n}
                    </div>
                    <div className="text-[11px] leading-snug" style={{ color: 'rgba(246,241,232,0.42)' }}>
                      {r.l}
                    </div>
                  </div>
                ))}
              </div>

              {/* Překlad pro slavnosti */}
              <div
                className="rounded-2xl p-6 flex gap-4"
                style={{ background: `${ACCENT}12`, border: `1px solid ${ACCENT}30` }}
              >
                <span className="text-2xl shrink-0">🎭</span>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] mb-2" style={{ color: ACCENT }}>
                    Co to znamená pro slavnosti
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(246,241,232,0.7)' }}>
                    {c.preklad}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <SectionNav
        accent={ACCENT}
        sections={[
          { id: 'hero', label: 'Úvod' },
          { id: 'uvolnena-mista', label: 'Uvolněná místa' },
          { id: 'prednostni-nakup', label: 'Přednostní nákup' },
          { id: 'pozdni-qr', label: 'Pozdní QR kódy' },
          { id: 'vernost', label: 'Věrnost' },
        ]}
      />
    </div>
  )
}
