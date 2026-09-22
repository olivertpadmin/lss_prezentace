'use client'

import React from 'react'
import SectionNav from '@/components/SectionNav'
import {
  CountUp,
  DarkPanel,
  FeatureTile,
  LssHero,
  LssPage,
  LssSection,
  PaperCard,
} from '@/components/lss/LssKit'
import { LSS } from '@/lib/lss'

const ACCENT = '#3D8BC7'

const SITUACE = [
  {
    icon: '🚪',
    title: 'Sedm set diváků za dvacet minut',
    desc: 'Hlediště se plní těsně před 20:30. Ruční kontrola vstupenek na baterku vytváří frontu v Jiřské ulici. Scanner na telefonu nebo čtečce zvládne průchod v řádu vteřin.',
  },
  {
    icon: '🎫',
    title: 'Prodej na poslední chvíli',
    desc: 'Vždy dorazí někdo bez vstupenky. Tablet u brány prodá zbylá místa, aniž by bylo nutné otevírat kamennou pokladnu.',
  },
  {
    icon: '🔦',
    title: 'Tma na nádvoří',
    desc: 'Hraje se po setmění, v historických areálech bez zázemí. Zařízení musí fungovat na baterie, offline a čitelně ve tmě.',
  },
  {
    icon: '🧾',
    title: 'Reklamace na místě',
    desc: 'Nenačtený kód, zapomenutý telefon, špatný termín. Obsluha najde nákup podle jména nebo e-mailu a vytiskne náhradní vstupenku.',
  },
]

const FUNKCE = [
  { icon: '📴', title: 'Provoz bez připojení', desc: 'Zařízení si předem stáhne seznam platných vstupenek na termín a synchronizuje se, jakmile se signál vrátí.' },
  { icon: '🔁', title: 'Kontrola opakovaného vstupu', desc: 'Divák může o přestávce opustit areál a vrátit se. Systém pozná rozdíl mezi návratem a pokusem o druhý vstup.' },
  { icon: '🎭', title: 'Zóny a akreditace', desc: 'Jedním zařízením se kontrolují vstupenky, akreditace novinářů i vstup do zákulisí. Každá skupina má vlastní oprávnění.' },
  { icon: '💳', title: 'Platba kartou u brány', desc: 'Tablet nebo mobilní terminál přijímá karty i bezkontaktní platby. Hotovost zůstává jen tam, kde ji opravdu chcete.' },
  { icon: '📊', title: 'Živý přehled průchodu', desc: 'Produkce vidí v reálném čase, kolik diváků už je v areálu a jestli má smysl posunout začátek.' },
  { icon: '🖨', title: 'Tisk na počkání', desc: 'Náhradní vstupenka nebo doklad se vytiskne přímo u brány, bez cesty do kanceláře.' },
]

export default function LssKioskyPage() {
  return (
    <LssPage accent={ACCENT}>
      <LssHero
        accent={ACCENT}
        label="Scannery u bran"
        eyebrow="Produkt 08"
        title={
          <>
            Brána, která
            <br />
            nedrží frontu
          </>
        }
        lead={
          <>
            Odbavení diváků na historických nádvořích, kde není zázemí, spolehlivý signál ani světlo.
            Primárně scannerové odbavení u vstupu; kiosky jen jako volitelný doplněk, pokud by někde dávaly smysl.
          </>
        }
        stats={[
          { value: <><CountUp to={700} />+</>, label: 'diváků na jednu scénu', note: 'Odbavených ve dvacetiminutovém okně' },
          { value: <CountUp to={0} />, label: 'nutných připojení', note: 'Kontrola vstupenek funguje offline' },
          { value: <CountUp to={6} />, label: 'scén se stejným vybavením', note: 'Jeden postup pro celý festival' },
        ]}
      />

      <div className="max-w-5xl mx-auto px-8 pb-24">
        <LssSection
          id="situace"
          heading="Čtyři situace u brány"
          perex="Open-air scéna na hradě klade na odbavení jiné nároky než kamenné divadlo s foyer a šatnou."
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SITUACE.map((s) => (
              <FeatureTile key={s.title} {...s} accent={ACCENT} />
            ))}
          </div>
        </LssSection>

        <DarkPanel
          id="vybaveni"
          accent={ACCENT}
          eyebrow="Vybavení"
          heading={
            <>
              Od telefonu obsluhy
              <br />
              po tabletový prodej na místě
            </>
          }
        >
          <p className="text-[16px] leading-relaxed max-w-2xl mb-9" style={{ color: 'rgba(246,241,232,0.55)' }}>
            Nemusíte kupovat techniku na všech pět scén najednou. Scannerový režim běží na běžném
            telefonu nebo čtečce, kiosky zůstávají jen volitelná rezerva.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              ['Scannerový režim', 'Na telefonu nebo čtečce. Nejlevnější start — stačí vyškolit uvaděče.', '📷'],
              ['Mobilní pokladna', 'Tablet s platebním terminálem pro prodej a reklamace přímo u brány.', '🧾'],
              ['Volitelný kiosk', 'Pouze pokud by se někde opakovaně tvořily fronty nebo chyběl prodejní bod.', '🖥'],
            ].map(([t, d, i]) => (
              <div
                key={t}
                className="rounded-2xl p-6"
                style={{ background: 'rgba(246,241,232,0.05)', border: '1px solid rgba(246,241,232,0.09)' }}
              >
                <span className="text-2xl block mb-3">{i}</span>
                <h3 className="font-bold mb-2" style={{ color: LSS.paper }}>
                  {t}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(246,241,232,0.5)' }}>
                  {d}
                </p>
              </div>
            ))}
          </div>
        </DarkPanel>

        <LssSection id="funkce" heading="Co zařízení umí">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {FUNKCE.map((f) => (
              <FeatureTile key={f.title} {...f} accent={ACCENT} />
            ))}
          </div>
        </LssSection>

        <LssSection
          id="podpora"
          heading="Podpora v hrací dny"
          perex="Technika je jen půlka věci. Druhá je člověk, který zvedne telefon v sobotu ve tři čtvrtě na devět večer."
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              ['Školení personálu', 'Před začátkem sezóny zaškolíme uvaděče i pokladní na všech scénách.'],
              ['Supervize na místě', 'U premiér a nejnáročnějších termínů je náš člověk přímo v areálu.'],
              ['Hotline o víkendech', 'Linka dostupná i v sobotu, v neděli a o svátcích — tedy přesně tehdy, kdy hrajete.'],
            ].map(([t, d]) => (
              <PaperCard key={t} accent={ACCENT} className="!p-5">
                <div className="w-8 h-[3px] rounded-full mb-3" style={{ background: ACCENT }} />
                <div className="font-bold text-sm mb-1.5" style={{ color: LSS.ink }}>
                  {t}
                </div>
                <p className="text-xs leading-relaxed" style={{ color: 'rgba(20,16,26,0.58)' }}>
                  {d}
                </p>
              </PaperCard>
            ))}
          </div>
        </LssSection>
      </div>

      <SectionNav
        accent={ACCENT}
        sections={[
          { id: 'hero', label: 'Úvod' },
          { id: 'situace', label: 'Situace u brány' },
          { id: 'vybaveni', label: 'Vybavení' },
          { id: 'funkce', label: 'Funkce' },
          { id: 'podpora', label: 'Podpora' },
        ]}
      />
    </LssPage>
  )
}
