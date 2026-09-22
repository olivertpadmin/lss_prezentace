'use client'

import React from 'react'
import { motion } from 'framer-motion'
import SectionNav from '@/components/SectionNav'
import { LssBreadcrumb } from '@/components/lss/LssNav'
import NightSky from '@/components/lss/NightSky'
import { CountUp, EASE } from '@/components/lss/LssKit'
import { LSS } from '@/lib/lss'

const ACCENT = '#C9A227'

const iv = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 } as { opacity: number; y: number },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, delay, ease: EASE },
})

interface Modul {
  id: string
  label: string
  icon: string
  color: string
  desc: string
  features: { icon: string; title: string; desc: string }[]
}


const CULTURE_PARTNERS = [
  { platform: 'Ticketportal', name: 'Národní divadlo', note: 'opera, činohra, balet a více scén' },
  { platform: 'Ticketportal', name: 'Dejvické divadlo', note: 'rezervační a prodejní agenda divadla' },
  { platform: 'Ticketportal', name: 'Dům kultury Teplice', note: 'kulturní program, sály a abonentní provoz' },
  { platform: 'Ticketportal', name: 'Karlovarský symfonický orchestr', note: 'koncertní sezóny a abonmá' },
  { platform: 'GoOut', name: 'La Fabrika', note: 'divadlo, koncerty a alternativní scéna' },
  { platform: 'GoOut', name: 'DOX / kulturní program', note: 'současné umění, performance a debaty' },
  { platform: 'GoOut', name: 'Palác Akropolis', note: 'koncerty, divadlo a multižánrový program' },
  { platform: 'GoOut', name: 'MeetFactory', note: 'hudba, galerie a performativní program' },
]

const MODULY: Modul[] = [
  {
    id: 'rocnik',
    label: 'Ročník, tituly a termíny',
    icon: '🗓',
    color: '#C8453E',
    desc: 'Celá sezóna od premiéry po derniéru — na jednom místě a pro všech pět scén.',
    features: [
      { icon: '🎭', title: 'Inscenace', desc: 'Titul, režie, obsazení, délka a přestávka. Vše, co se propisuje na web, vstupenku i do navazujících kanálů.' },
      { icon: '📍', title: 'Scény a hlediště', desc: 'Každá scéna má vlastní plánek, kapacitu a cenové kategorie. Stejný titul může mít v Brně jiné ceny než v Praze.' },
      { icon: '🔁', title: 'Reprízy a alternace', desc: 'Termíny s odlišným obsazením se vedou samostatně. Divák vidí, koho konkrétní večer uvidí.' },
      { icon: '🌧', title: 'Zrušení a náhrady', desc: 'Zrušení celého termínu jedním úkonem včetně volby, co se nabídne držitelům vstupenek.' },
      { icon: '🚌', title: 'Hostování', desc: 'Reprízy v Litomyšli, na Hluboké, v Lokti nebo v Kuksu jako samostatné scény se stejným titulem.' },
    ],
  },
  {
    id: 'abonma',
    label: 'Abonmá, pasy a poukazy',
    icon: '🎫',
    color: '#8E6BC9',
    desc: 'Nástroje, které přinášejí tržby ještě před zveřejněním programu.',
    features: [
      { icon: '🗂', title: 'Abonentní cykly', desc: 'Sady představení se stálým místem, obnova pro další ročník a evidence historie abonenta.' },
      { icon: '🎟', title: 'Festivalové pasy', desc: 'Volné sady napříč městy s počítadlem vyčerpaných představení.' },
      { icon: '🎁', title: 'Dárkové poukazy', desc: 'Pevné hodnoty v prodeji od listopadu, uplatnitelné na jakýkoliv titul ročníku.' },
      { icon: '⭐', title: 'Přednostní nákup', desc: 'Vlny předprodeje podle kódu, úrovně věrnosti nebo držení poukazu.' },
    ],
  },
  {
    id: 'rezervace',
    label: 'Rezervace a blokace',
    icon: '🔒',
    color: '#3D8BC7',
    desc: 'Místa, která nejdou do volného prodeje — a přesto se nesmí ztratit.',
    features: [
      { icon: '📋', title: 'Rezervace', desc: 'Přehled všech rezervací v sezóně s dobou platnosti a automatickým uvolněním po expiraci.' },
      { icon: '🚫', title: 'Technické blokace', desc: 'Místa pro zvuk, světla, kamery a novináře. Blokace lze kopírovat mezi termíny téže scény.' },
      { icon: '👤', title: 'Blokace na jméno', desc: 'Čestní hosté, zástupci města a Správy Pražského hradu s evidencí, kdo si místo skutečně vyzvedl.' },
      { icon: '♿', title: 'Místa pro vozíčkáře', desc: 'Vyhrazená kapacita s doprovodem, viditelná v plánku a prodejná online.' },
    ],
  },
  {
    id: 'prodeje',
    label: 'Prodeje a fakturace',
    icon: '🧾',
    color: '#2A9D8F',
    desc: 'Od jednotlivé vstupenky po zálohovou fakturu pro firemní objednávku.',
    features: [
      { icon: '📄', title: 'Faktury a zálohy', desc: 'Vystavení, evidence i hromadné generování pro skupinové objednávky.' },
      { icon: '💳', title: 'Platby a párování', desc: 'Dohledání prodeje podle ID platby, párování převodů a řešení neúspěšných transakcí.' },
      { icon: '❌', title: 'Hromadné storno', desc: 'Vystornování celého termínu podle čárových kódů při zrušeném představení.' },
      { icon: '👥', title: 'Skupinové objednávky', desc: 'Objednávky nad 25 vstupenek včetně rozeslání jednotlivých vstupenek účastníkům.' },
      { icon: '🇪🇺', title: 'Dvě měny', desc: 'Koruny i eura v jednom systému, včetně odlišné sazby DPH pro slovenskou scénu.' },
    ],
  },
  {
    id: 'divaci',
    label: 'Diváci a slevy',
    icon: '👥',
    color: '#E07A5F',
    desc: 'Kdo má na jakou cenu nárok a jak se to ověří.',
    features: [
      { icon: '🏷', title: 'Slevové kategorie', desc: 'Student, senior, ZTP, držitel průkazu. Nárok se volí v košíku a ověřuje u vstupu.' },
      { icon: '🎓', title: 'Školní představení', desc: 'Samostatný režim pro organizované skupiny s vlastní cenou a fakturací na školu.' },
      { icon: '📁', title: 'Kategorie diváků', desc: 'Vlastní členění databáze pro cílené nabídky a přednostní nákupy.' },
      { icon: '🔗', title: 'Propojení s CRM', desc: 'Každý prodej se propisuje do profilu diváka včetně historie a marketingových souhlasů.' },
    ],
  },
  {
    id: 'prehledy',
    label: 'Přehledy pro hrací den',
    icon: '📋',
    color: '#5B6EE1',
    desc: 'Co potřebuje vedoucí produkce vědět hodinu před začátkem.',
    features: [
      { icon: '🪑', title: 'Obsazenost termínu', desc: 'Kolik je prodáno, rezervováno, blokováno a kolik zbývá — v reálném čase.' },
      { icon: '🎫', title: 'Nevyzvednuté vstupenky', desc: 'Přehled zaplacených, ale nevytištěných či nenačtených vstupenek před začátkem.' },
      { icon: '↩️', title: 'Vrácená místa', desc: 'Místa uvolněná zpět do prodeje diváky i partnery, připravená k opětovnému prodeji.' },
      { icon: '🚪', title: 'Průchod branami', desc: 'Kolik diváků už je v areálu a jak rychle se hlediště plní.' },
      { icon: '📆', title: 'Denní souhrn', desc: 'Tržby, návštěvnost a poznámky z produkce jako podklad pro ranní poradu.' },
    ],
  },
  {
    id: 'statistiky',
    label: 'Statistiky a uzávěrky',
    icon: '📈',
    color: '#8A9A5B',
    desc: 'Čísla pro účetnictví, pro partnery i pro dramaturgii dalšího ročníku.',
    features: [
      { icon: '💰', title: 'Výkazy tržeb', desc: 'Podle scén, titulů, měsíců i cenových kategorií, s exportem do účetnictví.' },
      { icon: '🏛', title: 'Vyprodanost', desc: 'Naplněnost hlediště podle titulu, scény a dne v týdnu. Podklad pro plánování repríz.' },
      { icon: '🎯', title: 'Využití slev', desc: 'Kolik se prodalo za jakou kategorii a jaký to mělo dopad na průměrnou cenu vstupenky.' },
      { icon: '📅', title: 'Denní uzávěrka', desc: 'Uzávěrka pokladny, scannerového odbavení i abonmá pro účetní evidenci.' },
      { icon: '🤝', title: 'Zúčtování pro spolupořadatele', desc: 'Podklady pro města, Správu Pražského hradu a další partnery jednotlivých scén.' },
    ],
  },
  {
    id: 'administrace',
    label: 'Administrace a oprávnění',
    icon: '⚙️',
    color: '#7A6F86',
    desc: 'Kdo smí co — včetně sezónních brigádníků, kteří přijdou jen na tři měsíce.',
    features: [
      { icon: '👤', title: 'Uživatelé a role', desc: 'Podrobná oprávnění zvlášť pro produkci, pokladnu, marketing i externí spolupracovníky.' },
      { icon: '🎟', title: 'Šablony vstupenek', desc: 'Vizuál e-vstupenky i mobilní vstupenky ve stylu ročníku, včetně log partnerů.' },
      { icon: '🚪', title: 'Vstupní zóny', desc: 'Nastavení bran, sektorů a pravidel opakovaného vstupu o přestávce.' },
      { icon: '🖼', title: 'Partneři na vstupence', desc: 'Loga sponzorů na vstupence a v potvrzovacím e-mailu jako doložitelné plnění.' },
    ],
  },
]

export default function LssProdejniSystemPage() {
  return (
    <div className="min-h-screen relative" style={{ background: 'linear-gradient(170deg, #0B0810 0%, #1A1119 50%, #14101A 100%)' }}>
      <NightSky variant="quiet" />
      <LssBreadcrumb label="Prodejní systém" accent={ACCENT} />

      <div className="relative z-10 max-w-6xl mx-auto px-8 pt-28 pb-10" id="hero">
        <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1, ease: EASE }}>
          <span className="text-[11px] font-semibold tracking-[0.2em] uppercase" style={{ color: ACCENT }}>
            Produkt 02 · Zákulisí
          </span>
          <h1
            className="text-5xl md:text-7xl mt-4 mb-4 leading-[0.95]"
            style={{ fontFamily: "'Panel Sans', sans-serif", color: LSS.paper }}
          >
            Inspicient
            <br />
            celého provozu
          </h1>
          <p className="text-[17px] max-w-xl leading-relaxed" style={{ color: 'rgba(246,241,232,0.5)' }}>
            Prodejní systém je místo, kde sezóna vzniká: tituly, termíny, ceny, rezervace, faktury
            i uzávěrky. Divák ho nikdy neuvidí, ale pozná, když chybí.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-wrap gap-3 mt-8"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.28 }}
        >
          {[
            { n: <CountUp to={8} />, l: 'hlavních modulů' },
            { n: <><CountUp to={35} />+</>, l: 'funkcí pro provoz festivalu' },
            { n: <CountUp to={6} />, l: 'scén v jedné sezóně' },
            { n: <CountUp to={2} />, l: 'měny a legislativy' },
          ].map((s, i) => (
            <div
              key={i}
              className="flex items-center gap-2 px-4 py-2 rounded-full"
              style={{ background: `${ACCENT}16`, border: `1px solid ${ACCENT}32` }}
            >
              <span className="font-bold text-sm" style={{ color: ACCENT }}>
                {s.n}
              </span>
              <span className="text-sm" style={{ color: 'rgba(246,241,232,0.45)' }}>
                {s.l}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        id="reference"
        {...iv(0.08)}
        className="relative z-10 max-w-6xl mx-auto px-8 pb-8"
      >
        <div
          className="rounded-3xl p-7 md:p-8"
          style={{
            background: 'rgba(246,241,232,0.035)',
            border: '1px solid rgba(246,241,232,0.08)',
            boxShadow: `0 0 70px ${ACCENT}10`,
          }}
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-5">
            <div>
              <span className="text-[10px] font-semibold tracking-[0.2em] uppercase" style={{ color: ACCENT }}>
                Kulturní reference PLG
              </span>
              <h2
                className="text-2xl md:text-[30px] font-black leading-tight mt-2"
                style={{ fontFamily: "'Panel Sans', sans-serif", color: LSS.paper }}
              >
                Podobný kulturní segment už v ekosystému máme
              </h2>
            </div>
            <p className="text-xs md:text-sm leading-relaxed max-w-md" style={{ color: 'rgba(246,241,232,0.45)' }}>
              Ticketportal a GoOut dlouhodobě obsluhují divadla, scény, orchestry i multižánrové kulturní prostory.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {CULTURE_PARTNERS.map((partner) => (
              <div
                key={`${partner.platform}-${partner.name}`}
                className="rounded-2xl p-4"
                style={{ background: `${ACCENT}0a`, border: `1px solid ${ACCENT}22` }}
              >
                <div className="text-[10px] font-semibold uppercase tracking-[0.18em] mb-2" style={{ color: ACCENT }}>
                  {partner.platform}
                </div>
                <div className="text-sm font-bold mb-1" style={{ color: LSS.paper }}>
                  {partner.name}
                </div>
                <p className="text-xs leading-relaxed" style={{ color: 'rgba(246,241,232,0.42)' }}>
                  {partner.note}
                </p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <div className="relative z-10 max-w-6xl mx-auto px-8 pb-24 flex flex-col gap-6">
        {MODULY.map((m, i) => (
          <motion.div
            key={m.id}
            id={m.id}
            {...iv(0.04 * i)}
            className="rounded-3xl overflow-hidden"
            style={{
              background: 'rgba(246,241,232,0.035)',
              border: '1px solid rgba(246,241,232,0.08)',
              boxShadow: `0 0 80px ${m.color}10`,
            }}
          >
            <div style={{ height: 4, background: `linear-gradient(90deg, ${m.color} 0%, ${m.color}50 60%, transparent 100%)` }} />
            <div className="p-8 md:p-10">
              <div className="flex items-start gap-4 mb-6">
                <span className="text-4xl mt-0.5">{m.icon}</span>
                <div>
                  <h2
                    className="text-2xl md:text-[30px] font-black leading-tight mb-2"
                    style={{ fontFamily: "'Panel Sans', sans-serif", color: LSS.paper }}
                  >
                    {m.label}
                  </h2>
                  <p className="text-sm leading-relaxed max-w-2xl" style={{ color: 'rgba(246,241,232,0.45)' }}>
                    {m.desc}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {m.features.map((f) => (
                  <div
                    key={f.title}
                    className="rounded-2xl p-5"
                    style={{ background: `${m.color}0a`, border: `1px solid ${m.color}22` }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg">{f.icon}</span>
                      <span className="text-sm font-bold" style={{ color: m.color }}>
                        {f.title}
                      </span>
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color: 'rgba(246,241,232,0.42)' }}>
                      {f.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <SectionNav
        accent={ACCENT}
        sections={[
          { id: 'hero', label: 'Úvod' },
          { id: 'reference', label: 'Reference' },
          ...MODULY.map((m) => ({ id: m.id, label: m.label })),
        ]}
      />
    </div>
  )
}
