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

const ACCENT = '#E07A5F'

const KANALY = [
  {
    icon: '🌐',
    title: 'Ticketingová tržiště',
    desc: 'Vaše představení se objeví v nabídce sítí, kde lidé kulturu opravdu hledají — vedle koncertů, divadla a výstav, ne v sekci pro sport.',
  },
  {
    icon: '✉️',
    title: 'Newslettery s kulturním publikem',
    desc: 'Segmentované rozesílky lidem, kteří v posledním roce koupili vstupenku na divadlo. Ne plošný e-mail celé databázi.',
  },
  {
    icon: '📱',
    title: 'Sociální sítě',
    desc: 'Oznámení premiér, spuštění předprodeje, fotografie z hradních nádvoří a příběhy ze zkoušek.',
  },
  {
    icon: '🎯',
    title: 'Výkonnostní kampaně',
    desc: 'Placená propagace cílená na podobná publika podle vašich skutečných kupujících, ne podle odhadu.',
  },
]

const FAZE = [
  {
    obdobi: 'Listopad – únor',
    title: 'Mimo sezónu',
    desc: 'Dárkové poukazy před Vánoci a připomínka abonentům. V tuto chvíli nemáte program, ale máte diváky z loňska.',
  },
  {
    obdobi: 'Březen – květen',
    title: 'Předprodej',
    desc: 'Oznámení programu, premiér a obsazení. Největší nápor pozornosti v roce — a nejlepší čas na nové diváky.',
  },
  {
    obdobi: 'Červen – září',
    title: 'Sezóna',
    desc: 'Doprodej slabších termínů, reakce na recenze a propagace repríz, které ještě nejsou vyprodané.',
  },
  {
    obdobi: 'Září – říjen',
    title: 'Po derniéře',
    desc: 'Poděkování, zpětná vazba a první signál o ročníku příštím, dokud je zážitek čerstvý.',
  },
]

const SLUZBY = [
  { icon: '📝', title: 'Texty a vizuály', desc: 'Příprava kampaňových textů a formátů pro každý kanál, včetně korektury a jazykových mutací pro Bratislavu.' },
  { icon: '📊', title: 'Report po kampani', desc: 'Co přineslo prodeje a co jen dosah. Vyhodnocení podle titulu, scény i kanálu.' },
  { icon: '🔁', title: 'Doprodej slabších termínů', desc: 'Úterky v polovině srpna se neprodávají samy. Cílená kampaň na diváky z okolí scény.' },
  { icon: '🎓', title: 'Školy a skupiny', desc: 'Samostatná komunikace směrem k pedagogům a organizátorům zájezdů před začátkem školního roku.' },
  { icon: '🤝', title: 'Podklady pro partnery', desc: 'Doložitelné výstupy o dosahu a struktuře publika pro sponzorské smlouvy a grantové žádosti.' },
  { icon: '🗞', title: 'Práce s médii', desc: 'Koordinace s vaším tiskovým servisem — akreditace novinářů běží přes stejný systém jako vstupenky.' },
]

export default function LssMarketingPage() {
  return (
    <LssPage accent={ACCENT}>
      <LssHero
        accent={ACCENT}
        label="Marketing"
        eyebrow="Produkt 05"
        title={
          <>
            Dosah, který
            <br />
            má rád divadlo
          </>
        }
        lead={
          <>
            Marketingová podpora není přihození banneru. Je to přístup k publiku, které si kulturu
            kupuje pravidelně — a data o tom, co z kampaně skutečně přineslo prodané vstupenky.
          </>
        }
        stats={[
          { value: <><CountUp to={8.5} decimals={1} /> M</>, label: 'měsíčních návštěv', note: 'Weby Ticketportal a GoOut' },
          { value: <><CountUp to={1.7} decimals={1} /> M</>, label: 'odběratelů newsletterů', note: 'Segmentovaných podle žánru' },
          { value: <><CountUp to={250} /> tis.</>, label: 'sledujících na sítích', note: 'Publikum napříč kulturou' },
        ]}
      />

      <div className="max-w-5xl mx-auto px-8 pb-24">
        <LssSection
          id="kanaly"
          heading="Kde se o vás divák dozví"
          perex="Čtyři kanály, které spolu sdílejí data. Kdo viděl kampaň na sítích a nekoupil, dostane jinou zprávu než ten, kdo už má vstupenku."
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {KANALY.map((k) => (
              <FeatureTile key={k.title} {...k} accent={ACCENT} />
            ))}
          </div>
        </LssSection>

        <DarkPanel
          id="rok"
          accent={ACCENT}
          eyebrow="Rytmus roku"
          heading={
            <>
              Festival trvá tři měsíce.
              <br />
              Komunikace dvanáct.
            </>
          }
        >
          <p className="text-[16px] leading-relaxed max-w-2xl mb-9" style={{ color: 'rgba(246,241,232,0.55)' }}>
            Nejtěžší je udržet pozornost od září do března, kdy se nehraje. Právě tam ale začíná
            prodej následujícího ročníku — poukazy se prodávají od listopadu a abonenti se rozhodují
            dřív než veřejnost.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {FAZE.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl p-5"
                style={{ background: 'rgba(246,241,232,0.05)', border: '1px solid rgba(246,241,232,0.09)' }}
              >
                <div className="text-[11px] font-bold mb-2" style={{ color: ACCENT }}>
                  {f.obdobi}
                </div>
                <h3 className="font-bold mb-2" style={{ color: LSS.paper }}>
                  {f.title}
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: 'rgba(246,241,232,0.48)' }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </DarkPanel>

        <LssSection id="sluzby" heading="Co pro vás uděláme">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SLUZBY.map((s) => (
              <FeatureTile key={s.title} {...s} accent={ACCENT} />
            ))}
          </div>
        </LssSection>

        <LssSection
          id="mereni"
          heading="Měříme prodeje, ne dojmy"
          perex="Kampaň je propojená s prodejním systémem, takže víte, kolik vstupenek přinesl konkrétní e-mail nebo příspěvek."
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              ['Podle titulu', 'Která inscenace potřebuje pomoc a která se prodá sama'],
              ['Podle scény', 'Jestli kampaň v Ostravě funguje stejně jako v Praze'],
              ['Podle kanálu', 'Kolik vstupenek přinesl newsletter a kolik placená reklama'],
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
          { id: 'kanaly', label: 'Kanály' },
          { id: 'rok', label: 'Rytmus roku' },
          { id: 'sluzby', label: 'Služby' },
          { id: 'mereni', label: 'Měření' },
        ]}
      />
    </LssPage>
  )
}
