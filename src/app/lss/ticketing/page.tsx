'use client'

import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import SectionNav from '@/components/SectionNav'
import {
  CountUp,
  DarkPanel,
  FeatureTile,
  LssHero,
  LssPage,
  LssSection,
  PaperCard,
  fade,
} from '@/components/lss/LssKit'
import { LSS, SCENY } from '@/lib/lss'

const ACCENT = '#C8453E'

/* ─────────────────────────────────────────────────────────────
   Hero vizuál — závěs se rozhrne a odhalí vstupenku
   ───────────────────────────────────────────────────────────── */
function CurtainVisual() {
  const folds = [0, 1, 2, 3, 4, 5]
  return (
    <div className="relative select-none" style={{ width: 306, height: 250 }}>
      {/* Jeviště za závěsem */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 14,
          overflow: 'hidden',
          background: 'linear-gradient(180deg, #120C14 0%, #241318 100%)',
          border: '1px solid rgba(246,241,232,0.12)',
          boxShadow: '0 24px 64px rgba(0,0,0,0.6)',
        }}
      >
        {/* Rampa */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: 110,
            background: 'radial-gradient(ellipse at 50% 110%, rgba(228,197,94,0.35) 0%, transparent 70%)',
          }}
        />

        {/* Vstupenka */}
        <motion.div
          initial={{ opacity: 0, y: 18, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 1.25, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'absolute',
            left: 56,
            top: 84,
            width: 194,
            height: 86,
            borderRadius: 9,
            background: LSS.paper,
            boxShadow: '0 14px 36px rgba(0,0,0,0.55)',
            display: 'flex',
            overflow: 'hidden',
          }}
        >
          <div style={{ width: 9, background: LSS.crimson, flexShrink: 0 }} />
          <div style={{ padding: '10px 11px', flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 6.5, fontWeight: 800, letterSpacing: '0.14em', color: 'rgba(20,16,26,0.42)' }}>
              LSS 2027 · PRAHA
            </div>
            <div
              style={{
                fontSize: 19,
                fontWeight: 900,
                color: LSS.ink,
                fontFamily: "'Panel Sans', sans-serif",
                lineHeight: 1.05,
                marginTop: 3,
              }}
            >
              Macbeth
            </div>
            <div style={{ fontSize: 7, color: 'rgba(20,16,26,0.5)', marginTop: 3 }}>
              Nejvyšší purkrabství · so 20:30
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 5 }}>
              <div style={{ fontSize: 7, color: 'rgba(20,16,26,0.45)', fontWeight: 700 }}>
                Parter A · ř. D · 14
              </div>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 900,
                  color: LSS.crimson,
                  fontFamily: "'Panel Sans', sans-serif",
                }}
              >
                1 290 Kč
              </div>
            </div>
          </div>
          <div
            style={{
              width: 34,
              borderLeft: '1.5px dashed rgba(20,16,26,0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <div style={{ display: 'flex', gap: 1.2 }}>
              {[3, 1.5, 2.5, 1.5, 3, 2, 1.5].map((w, i) => (
                <div key={i} style={{ width: w, height: 26, background: LSS.ink }} />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Závěs — levá a pravá půle */}
        {(['left', 'right'] as const).map((side) => (
          <motion.div
            key={side}
            initial={{ x: 0 }}
            animate={{ x: side === 'left' ? '-88%' : '88%' }}
            transition={{ duration: 1.5, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              [side]: 0,
              width: '52%',
              display: 'flex',
              background: `linear-gradient(90deg, #7E211F 0%, #A33230 50%, #6E1B1A 100%)`,
              boxShadow: 'inset 0 -40px 60px rgba(0,0,0,0.45)',
            }}
          >
            {folds.map((f) => (
              <div
                key={f}
                style={{
                  flex: 1,
                  background:
                    f % 2 === 0
                      ? 'linear-gradient(90deg, rgba(0,0,0,0.28) 0%, rgba(255,255,255,0.06) 100%)'
                      : 'linear-gradient(90deg, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0.26) 100%)',
                }}
              />
            ))}
          </motion.div>
        ))}

        {/* Zlatá šála nad závěsem */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 12,
            background: `linear-gradient(180deg, ${LSS.giltSoft} 0%, ${LSS.gilt} 100%)`,
          }}
        />
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Interaktivní plánek hlediště
   ───────────────────────────────────────────────────────────── */
const PLANS = [
  { id: 'purkrabstvi', label: 'Praha · Nejvyšší purkrabství', src: '/lss/hlediste-purkrabstvi.svg' },
  { id: 'spilberk', label: 'Brno · Špilberk', src: '/lss/hlediste-spilberk.svg' },
]

function HledistePlan() {
  const [active, setActive] = useState(0)
  const [scale, setScale] = useState(1)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const dragging = useRef(false)
  const last = useRef({ x: 0, y: 0 })

  const MIN = 1
  const MAX = 4

  const reset = () => {
    setScale(1)
    setPos({ x: 0, y: 0 })
  }

  const btn = {
    background: `${ACCENT}12`,
    color: ACCENT,
    border: `1px solid ${ACCENT}38`,
  }

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <div className="flex gap-2">
          {PLANS.map((p, i) => (
            <button
              key={p.id}
              onClick={() => {
                setActive(i)
                reset()
              }}
              className="px-4 py-1.5 rounded-full text-xs font-semibold transition-all"
              style={
                active === i
                  ? { background: ACCENT, color: LSS.paper, border: `1px solid ${ACCENT}` }
                  : btn
              }
            >
              {p.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setScale((s) => Math.min(MAX, s + 0.35))}
            className="w-8 h-8 rounded-full text-sm font-bold"
            style={btn}
          >
            +
          </button>
          <span className="text-xs w-11 text-center" style={{ color: 'rgba(20,16,26,0.45)' }}>
            {Math.round(scale * 100)} %
          </span>
          <button
            onClick={() => setScale((s) => Math.max(MIN, s - 0.35))}
            className="w-8 h-8 rounded-full text-sm font-bold"
            style={btn}
          >
            −
          </button>
          <button onClick={reset} className="px-3 h-8 rounded-full text-xs font-semibold" style={btn}>
            Zpět na celek
          </button>
        </div>
      </div>

      <div
        onWheel={(e) => setScale((s) => Math.min(MAX, Math.max(MIN, s - e.deltaY * 0.001)))}
        onMouseDown={(e) => {
          dragging.current = true
          last.current = { x: e.clientX, y: e.clientY }
        }}
        onMouseMove={(e) => {
          if (!dragging.current) return
          const dx = e.clientX - last.current.x
          const dy = e.clientY - last.current.y
          last.current = { x: e.clientX, y: e.clientY }
          setPos((p) => ({ x: p.x + dx, y: p.y + dy }))
        }}
        onMouseUp={() => (dragging.current = false)}
        onMouseLeave={() => (dragging.current = false)}
        className="rounded-2xl overflow-hidden relative select-none"
        style={{
          background: LSS.ink,
          border: '1px solid rgba(20,16,26,0.12)',
          height: 470,
          cursor: scale > 1 ? 'grab' : 'default',
        }}
      >
        {scale === 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
            <span
              className="text-[10px] px-3 py-1 rounded-full"
              style={{ background: 'rgba(246,241,232,0.1)', color: 'rgba(246,241,232,0.55)' }}
            >
              Kolečkem myši přibližte konkrétní řadu · tažením posouvejte
            </span>
          </div>
        )}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={PLANS[active].src}
          alt={`Plánek hlediště – ${PLANS[active].label}`}
          draggable={false}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: `translate(calc(-50% + ${pos.x}px), calc(-50% + ${pos.y}px)) scale(${scale})`,
            transformOrigin: 'center center',
            maxWidth: '94%',
            maxHeight: '92%',
            objectFit: 'contain',
            userSelect: 'none',
          }}
        />
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Data
   ───────────────────────────────────────────────────────────── */

/** Tření, které dnes divák i pořadatel zažívá. Vychází z veřejně
 *  dostupných podmínek prodeje slavností. */
const FRICTION = [
  {
    now: 'Slevy nelze uplatnit v online předprodeji — student, senior i ZTP musí k pokladně.',
    plg: 'Slevové kategorie jsou součástí košíku. Divák zvolí slevu při nákupu, systém ověří nárok a při vstupu se kontroluje doklad.',
  },
  {
    now: 'Zakoupené vstupenky nelze vyměnit. Divák, kterému se změní termín, o peníze přijde.',
    plg: 'Výměna na jiný termín téže inscenace podle pravidel, která si nastavíte — do X dní, s poplatkem nebo bez, jednou nebo opakovaně.',
  },
  {
    now: 'Pokladna otevřená jen v hrací dny 18:00–21:00 na konkrétní adrese.',
    plg: 'Primárně scannerové odbavení u brány, prodej na místě z tabletu a zákaznická linka, která běží i o víkendech a svátcích.',
  },
  {
    now: 'Objednávky nad 25 vstupenek se řeší telefonem a e-mailem s konkrétní osobou v každém městě.',
    plg: 'Skupinové objednávky, zálohové faktury a hromadné rozesílání vstupenek přímo v systému. Bez ručního přepisování.',
  },
  {
    now: 'Vracení peněz za zrušené představení řeší divák s prodejcem, ne s festivalem.',
    plg: 'Storno a refundace spustíte vy, jedním úkonem nad celým termínem. Divák dostane e-mail dřív, než stihne napsat dotaz.',
  },
  {
    now: 'Data o divácích zůstávají u prodejní sítě. Festival se k nim dostává jen přes reporty.',
    plg: 'Databáze diváků je vaše. Export, segmentace i marketing běží nad vašimi daty a vy s nimi můžete pracovat i mimo sezónu.',
  },
]

const POCASI = [
  {
    icon: '🌧',
    title: 'Představení se nehraje',
    desc: 'Nad termínem zvolíte scénář. Systém během minut rozešle e-mail všem držitelům vstupenek a nabídne jim volbu: náhradní termín, voucher, nebo vrácení peněz.',
  },
  {
    icon: '🔁',
    title: 'Přesun na náhradní termín',
    desc: 'Divák si v jednom kroku vybere jinou reprízu téže inscenace. Místa se přepočítají podle cenových kategorií, rozdíl se doplatí nebo vrátí.',
  },
  {
    icon: '🎟',
    title: 'Voucher místo refundace',
    desc: 'Nabídnete voucher v hodnotě vstupenky s platností do konce ročníku. Peníze zůstávají u festivalu a divák se vrací na jiný titul.',
  },
  {
    icon: '⏱',
    title: 'Rozhodnutí až na místě',
    desc: 'O zrušení se rozhoduje nejdříve v čase začátku. Do té doby drží systém termín v běžném režimu — push notifikace odejde ve chvíli, kdy rozhodnete.',
  },
]

const ABONMA = [
  {
    icon: '🎫',
    title: 'Festivalový pas',
    desc: 'Pevná sada představení napříč městy za zvýhodněnou cenu. Držitel má jeden QR kód a pořadatel vidí, kolik mu ze sady zbývá.',
  },
  {
    icon: '🗓',
    title: 'Abonentní cykly',
    desc: 'Klasické divadelní předplatné se stálým místem. Abonent má své sedadlo drženo pro další ročník a může ho obnovit jedním kliknutím.',
  },
  {
    icon: '🎁',
    title: 'Dárkové poukazy',
    desc: 'Poukazy v pevných hodnotách v prodeji od listopadu, kdy ještě není program. Držitel získá přednostní nákup před spuštěním předprodeje.',
  },
  {
    icon: '⭐',
    title: 'Přednostní okna',
    desc: 'Abonenti, držitelé poukazů a dárci mají vlastní předprodejní vlnu s kódem nebo automaticky podle historie nákupů.',
  },
]

const PLATBY = [
  { label: 'Visa', bg: '#1A1F71', color: '#fff' },
  { label: 'Mastercard', bg: '#EB001B', color: '#fff' },
  { label: 'Apple Pay', bg: '#000', color: '#fff' },
  { label: 'Google Pay', bg: '#fff', color: '#3c4043', border: true },
  { label: 'Převodem', bg: '#E8F5E9', color: '#2E7D32' },
  { label: 'Faktura', bg: '#E3F2FD', color: '#1565C0' },
  { label: 'Edenred', bg: '#E30613', color: '#fff' },
  { label: 'Pluxee', bg: '#6B3FA0', color: '#fff' },
  { label: 'Up', bg: '#FF6B35', color: '#fff' },
  { label: 'Twisto', bg: '#00C896', color: '#fff' },
]

const VSTUPENKY = [
  { src: '/lss/vstupenka-macbeth.svg', alt: 'E-vstupenka · Praha' },
  { src: '/lss/vstupenka-sen.svg', alt: 'Mobilní vstupenka · Brno' },
  { src: '/lss/vstupenka-hamlet.svg', alt: 'Derniéra · Ostrava' },
]

const FUNKCE = [
  {
    icon: '📈',
    title: 'Cenotvorba podle poptávky',
    desc: 'Premiéra Komedie omylů se vyprodá za den, úterní repríza v polovině srpna ne. Ceny mohou reagovat na tempo prodeje u každého termínu zvlášť.',
  },
  {
    icon: '🔄',
    title: 'Přeprodej pod vaší kontrolou',
    desc: 'Divák, který nemůže přijít, vrátí vstupenku do oficiálního přeprodeje za cenu, kterou určíte vy. Místo se zaplní a nevznikne černý trh.',
  },
  {
    icon: '🕐',
    title: 'Pozdní doručení QR kódu',
    desc: 'QR kód se držiteli zobrazí až pár hodin před začátkem. U vyprodaných titulů to výrazně zkracuje okno pro překupníky.',
  },
  {
    icon: '🌐',
    title: 'Prodej na vaší doméně',
    desc: 'Nákupní proces běží na vstupenky.shakespeare.cz ve vaší grafice. Divák neodchází na cizí web a neztrácí se mu důvěra ani konverze.',
  },
  {
    icon: '🛡',
    title: 'Systém, který unese nápor',
    desc: 'Ochrana proti DDoS a rychlá databáze pro první minuty předprodeje, kdy se o nejžádanější tituly hlásí tisíce lidí naráz.',
  },
  {
    icon: '🎧',
    title: 'Podpora v hrací dny',
    desc: 'Dedikovaný account manažer, školení personálu, hotline o víkendech i svátcích a supervize přímo na scéně v den představení.',
  },
  {
    icon: '🇸🇰',
    title: 'Bratislava jako doma',
    desc: 'Slovenská scéna běží ve stejném systému — v eurech, se slovenskou legislativou a lokálními platebními metodami.',
  },
  {
    icon: '♿',
    title: 'Místa pro vozíčkáře',
    desc: 'Vyhrazená místa se prodávají online s doprovodem, ne telefonicky. Kapacita je vidět v plánku a nezůstává neobsazená.',
  },
  {
    icon: '📊',
    title: 'Data z každého termínu',
    desc: 'Vyprodanost po scénách, titulech a dnech v týdnu. Podklad pro dramaturgii dalšího ročníku i pro jednání s partnery.',
  },
]

/* ─────────────────────────────────────────────────────────────
   Stránka
   ───────────────────────────────────────────────────────────── */
export default function LssTicketingPage() {
  return (
    <LssPage accent={ACCENT}>
      <LssHero
        accent={ACCENT}
        label="Prodej vstupenek"
        eyebrow="Produkt 01"
        title={
          <>
            Prodej
            <br />
            vstupenek
          </>
        }
        lead={
          <>
            Vlastní pokladna festivalu namísto pronajatého místa v cizí síti. Divák nakupuje u vás,
            data zůstávají u vás a podmínky prodeje si určujete sami.
          </>
        }
        visual={<CurtainVisual />}
        stats={[
          { value: <><CountUp to={150} />+</>, label: 'představení v sezóně', note: 'Od konce června do začátku září' },
          { value: <CountUp to={6} />, label: 'scén ve dvou zemích', note: 'Praha, Brno, Ostrava, Bratislava a hostování' },
          { value: <><CountUp to={30} />.</>, label: 'ročník v roce 2027', note: 'Pravidelně od roku 1998' },
        ]}
      />

      <div className="max-w-5xl mx-auto px-8 pb-24">
        {/* ── Tření ── */}
        <LssSection
          id="treni"
          heading="Co dnes stojí mezi divákem a vstupenkou"
          perex={
            <>
              Vycházíme z podmínek prodeje, které máte dnes veřejně vypsané. Každý z těchto bodů stojí
              buď peníze, nebo diváky — obvykle obojí.
            </>
          }
        >
          <div className="flex flex-col gap-3">
            {FRICTION.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                className="grid grid-cols-1 md:grid-cols-2 rounded-2xl overflow-hidden"
                style={{ border: '1px solid rgba(20,16,26,0.08)' }}
              >
                <div className="p-6" style={{ background: 'rgba(20,16,26,0.04)' }}>
                  <div
                    className="text-[10px] font-semibold tracking-[0.18em] uppercase mb-2.5"
                    style={{ color: 'rgba(20,16,26,0.35)' }}
                  >
                    Dnes
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(20,16,26,0.66)' }}>
                    {f.now}
                  </p>
                </div>
                <div className="p-6" style={{ background: `${ACCENT}0e`, borderLeft: `2px solid ${ACCENT}` }}>
                  <div
                    className="text-[10px] font-semibold tracking-[0.18em] uppercase mb-2.5"
                    style={{ color: ACCENT }}
                  >
                    S PLG
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(20,16,26,0.78)' }}>
                    {f.plg}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </LssSection>

        {/* ── Hlediště ── */}
        <LssSection
          id="hlediste"
          heading="Hlediště, které si divák prohlédne před nákupem"
          perex={
            <>
              Každá scéna má vlastní plánek v SVG — plynulé přibližování až na konkrétní sedadlo,
              cenové kategorie barevně, místa pro vozíčkáře viditelná a prodejná online. Divák ví,
              kam si sedá, a méně často volá do kanceláře.
            </>
          }
        >
          <HledistePlan />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
            {SCENY.slice(0, 6).map((s) => (
              <PaperCard key={s.misto} accent={ACCENT} className="!p-5">
                <div className="text-[10px] font-semibold tracking-[0.16em] uppercase mb-1.5" style={{ color: ACCENT }}>
                  {s.mesto}
                </div>
                <div className="text-sm font-bold leading-snug mb-1" style={{ color: LSS.ink }}>
                  {s.misto}
                </div>
                <div className="text-xs mb-2" style={{ color: 'rgba(20,16,26,0.45)' }}>
                  {s.kapacita}
                </div>
                <p className="text-xs leading-relaxed" style={{ color: 'rgba(20,16,26,0.55)' }}>
                  {s.note}
                </p>
              </PaperCard>
            ))}
          </div>
        </LssSection>

        {/* ── Počasí ── */}
        <DarkPanel
          id="pocasi"
          accent={LSS.giltSoft}
          eyebrow="Open-air"
          heading={
            <>
              Déšť je provozní
              <br />
              situace, ne krize
            </>
          }
        >
          <p className="text-[16px] leading-relaxed max-w-2xl mb-9" style={{ color: 'rgba(246,241,232,0.55)' }}>
            Hraje se pod širým nebem. Většina sezóny proběhne bez problémů, ale každý ročník přinese
            několik termínů, kdy se rozhoduje na poslední chvíli. Rozdíl mezi zvládnutým a nezvládnutým
            zrušeným představením je v tom, jak rychle se divák dozví, co bude dál.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {POCASI.map((p) => (
              <div
                key={p.title}
                className="rounded-2xl p-6"
                style={{ background: 'rgba(246,241,232,0.05)', border: '1px solid rgba(246,241,232,0.09)' }}
              >
                <span className="text-2xl block mb-3">{p.icon}</span>
                <h3 className="font-bold text-base mb-2" style={{ color: LSS.paper }}>
                  {p.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(246,241,232,0.5)' }}>
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </DarkPanel>

        {/* ── Abonmá ── */}
        <LssSection
          id="abonma"
          heading="Předplatné, pasy a poukazy"
          perex="Nástroje, které přinášejí peníze dřív, než je hotový program — a udrží diváka napříč ročníky."
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ABONMA.map((a) => (
              <FeatureTile key={a.title} icon={a.icon} title={a.title} desc={a.desc} accent={ACCENT} />
            ))}
          </div>
        </LssSection>

        {/* ── Typy vstupenek ── */}
        <LssSection
          id="vstupenky"
          heading="Vstupenka jako první dojem z festivalu"
          perex="E-vstupenka i mobilní vstupenka v peněžence telefonu — vždy v grafice slavností, ne v šabloně prodejce."
        >
          <div className="flex flex-col gap-4">
            {VSTUPENKY.map((v) => (
              <div key={v.src}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={v.src}
                  alt={v.alt}
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: 14,
                    display: 'block',
                    boxShadow: '0 6px 28px rgba(20,16,26,0.12)',
                  }}
                />
              </div>
            ))}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start mt-2">
              <div className="md:col-span-1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/lss/vstupenka-pas.svg"
                  alt="Festivalový pas"
                  style={{ width: '100%', height: 'auto', borderRadius: 14, display: 'block' }}
                />
              </div>
              <PaperCard accent={ACCENT} className="md:col-span-2">
                <h3 className="font-bold text-base mb-2" style={{ color: LSS.ink }}>
                  Festivalový pas v účtu diváka
                </h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: 'rgba(20,16,26,0.62)' }}>
                  Jeden kód pro celou sadu představení. Držitel vidí, které tituly už viděl a které mu
                  zbývají, může nevyužité představení darovat nebo uvolnit zpět do prodeje. Úroveň
                  věrnosti roste s počtem odchozených sezón a odemyká přednostní nákup.
                </p>
                <ul className="flex flex-col gap-2">
                  {[
                    'Darování konkrétního představení ze sady',
                    'Uvolnění místa zpět do prodeje, když divák nemůže',
                    'Převod celého pasu na jiný zákaznický účet',
                    'Automatická nabídka obnovy před dalším ročníkem',
                  ].map((t) => (
                    <li key={t} className="flex gap-2.5 text-sm" style={{ color: 'rgba(20,16,26,0.68)' }}>
                      <span style={{ color: ACCENT, fontWeight: 800 }}>✓</span>
                      {t}
                    </li>
                  ))}
                </ul>
              </PaperCard>
            </div>
          </div>
        </LssSection>

        {/* ── Platby ── */}
        <LssSection
          id="platby"
          heading="Platební metody včetně benefitních"
          perex="Kultura je oblast, kde zaměstnanecké benefity tvoří významný podíl plateb. Podporujeme je stejně samozřejmě jako kartu."
        >
          <div className="flex flex-wrap gap-2">
            {PLATBY.map((m) => (
              <div
                key={m.label}
                className="px-3.5 py-2 rounded-lg text-xs font-bold"
                style={{
                  background: m.bg,
                  color: m.color,
                  border: m.border ? '1px solid #dadce0' : undefined,
                  minWidth: 72,
                  textAlign: 'center',
                }}
              >
                {m.label}
              </div>
            ))}
          </div>
        </LssSection>

        {/* ── Funkce ── */}
        <LssSection id="funkce" heading="Co dalšího systém umí">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {FUNKCE.map((f) => (
              <FeatureTile key={f.title} icon={f.icon} title={f.title} desc={f.desc} accent={ACCENT} />
            ))}
          </div>
        </LssSection>

        {/* ── Platforma ── */}
        <DarkPanel
          id="platforma"
          accent={ACCENT}
          eyebrow="Platforma"
          heading={
            <>
              Dvacet let prodeje
              <br />
              kultury za vámi
            </>
          }
        >
          <p className="text-[16px] leading-relaxed max-w-2xl" style={{ color: 'rgba(246,241,232,0.55)' }}>
            Ticketportal prodává vstupenky na koncerty, divadlo, festivaly i výstavy déle než dvacet
            let a PLG kolem něj postavilo celý ekosystém: prodejní systém, CRM, scannerové odbavení a
            cashless. Pro slavnosti to znamená jednoho partnera pro celý provoz — od nastavení
            cenových kategorií v zimě až po odbavení diváků u brány na Pražském hradě v srpnu.
          </p>
          <motion.a
            {...fade(0.1)}
            href="/lss/nabidka"
            className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-full text-sm font-bold transition-opacity hover:opacity-90"
            style={{ background: ACCENT, color: LSS.paper }}
          >
            Jak by vypadal přechod na PLG
          </motion.a>
        </DarkPanel>
      </div>

      <SectionNav
        accent={ACCENT}
        sections={[
          { id: 'hero', label: 'Úvod' },
          { id: 'treni', label: 'Co dnes brzdí prodej' },
          { id: 'hlediste', label: 'Hlediště' },
          { id: 'pocasi', label: 'Počasí' },
          { id: 'abonma', label: 'Předplatné' },
          { id: 'vstupenky', label: 'Vstupenky' },
          { id: 'platby', label: 'Platby' },
          { id: 'funkce', label: 'Funkce' },
          { id: 'platforma', label: 'Platforma' },
        ]}
      />
    </LssPage>
  )
}
