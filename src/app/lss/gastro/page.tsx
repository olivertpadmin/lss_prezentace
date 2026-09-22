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

const ACCENT = '#E08A2E'

const PRESTAVKA = [
  {
    icon: '⏱',
    title: 'Dvacet minut, sedm set lidí',
    desc: 'Přestávka je jediné okno, kdy bar vydělává. Když se fronta nestihne odbavit, tržba se nevrátí — divák se prostě vrátí do hlediště s prázdnou rukou.',
  },
  {
    icon: '🥂',
    title: 'Předobjednávka před začátkem',
    desc: 'Divák si může volitelně objednat předem; hlavní přínos je rychlá platba a kratší fronta o přestávce.',
  },
  {
    icon: '📶',
    title: 'Funguje i bez signálu',
    desc: 'Na nádvoří hradu se nedá spoléhat na datové připojení. Terminály pracují offline a dorovnají se, jakmile se síť vrátí.',
  },
  {
    icon: '🧮',
    title: 'Zúčtování po sezóně',
    desc: 'Přehled tržeb po scénách, provozovatelích a termínech. Podklad pro vyúčtování s dodavateli občerstvení bez ručního sčítání.',
  },
]

const FUNKCE = [
  { icon: '💳', title: 'Karta i bezkontaktně', desc: 'Běžné platební karty a mobilní peněženky bez nutnosti nabíjet festivalový čip.' },
  { icon: '🎟', title: 'Nápoj v ceně vstupenky', desc: 'Prémiové kategorie a lóže mohou mít nápoj zahrnutý — odečte se automaticky při výdeji.' },
  { icon: '📊', title: 'Živé tržby', desc: 'Produkce vidí během přestávky, jak si který výčep vede, a může přesunout obsluhu.' },
  { icon: '🍽', title: 'Více provozovatelů', desc: 'Každý dodavatel občerstvení má vlastní sortiment, ceny i vyúčtování na jedné platformě.' },
  { icon: '♻️', title: 'Vratné kelímky', desc: 'Záloha za kelímek se eviduje a vrací stejným kanálem jako platba.' },
  { icon: '🔗', title: 'Propojení s profilem diváka', desc: 'Útrata se propisuje do CRM — víte, kdo si dává skleničku a komu nabídnout balíček s občerstvením.' },
]

export default function LssGastroPage() {
  return (
    <LssPage accent={ACCENT}>
      <LssHero
        accent={ACCENT}
        label="Cashless a gastro"
        eyebrow="Produkt 09"
        title={
          <>
            Přestávka,
            <br />
            která vydělává
          </>
        }
        lead={
          <>
            Bar na hradním nádvoří má dvacet minut na to, aby obsloužil celé hlediště. Bezhotovostní
            rychlá platba a případná předobjednávka jsou rozdíl mezi tržbou a frontou.
          </>
        }
        stats={[
          { value: <CountUp to={20} />, label: 'minut přestávky', note: 'Jediné okno pro tržby z občerstvení' },
          { value: <CountUp to={0} />, label: 'hotovosti na scéně', note: 'Méně rizika i méně počítání po představení' },
          { value: <CountUp to={6} />, label: 'scén, jedno vyúčtování', note: 'Napříč dodavateli i městy' },
        ]}
      />

      <div className="max-w-5xl mx-auto px-8 pb-24">
        <LssSection
          id="prestavka"
          heading="Proč je přestávka provozní výzva"
          perex="U koncertu se pije celý večer. U divadelního představení existuje jediné dvacetiminutové okno, a pak je po všem."
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PRESTAVKA.map((p) => (
              <FeatureTile key={p.title} {...p} accent={ACCENT} />
            ))}
          </div>
        </LssSection>

        <DarkPanel
          id="pred"
          accent={ACCENT}
          eyebrow="Před představením"
          heading={
            <>
              Objednat v osm,
              <br />
              vyzvednout o přestávce
            </>
          }
        >
          <p className="text-[16px] leading-relaxed max-w-2xl mb-9" style={{ color: 'rgba(246,241,232,0.55)' }}>
            Nejsilnější nástroj proti frontě není rychlejší obsluha, ale posunutí objednávky do doby,
            kdy divák čeká na začátek. Výdej se pak scvrkne na předání připraveného nápoje proti QR kódu.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              ['1', 'Divák zaplatí rychle / případně objedná předem', 'Před začátkem nebo při čekání na otevření hlediště'],
              ['2', 'Platba proběhne rovnou', 'Kartou nebo uloženou platební metodou'],
              ['3', 'Bar připraví během prvního dějství', 'Obsluha zná přesné počty dopředu'],
              ['4', 'Výdej proti QR kódu', 'Bez fronty, bez placení, bez drobných'],
            ].map(([n, t, d]) => (
              <div
                key={n}
                className="rounded-2xl p-5"
                style={{ background: 'rgba(246,241,232,0.05)', border: '1px solid rgba(246,241,232,0.09)' }}
              >
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-sm font-black mb-3"
                  style={{ background: ACCENT, color: LSS.ink, fontFamily: "'Panel Sans', sans-serif" }}
                >
                  {n}
                </div>
                <h3 className="font-bold text-sm mb-1.5" style={{ color: LSS.paper }}>
                  {t}
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: 'rgba(246,241,232,0.48)' }}>
                  {d}
                </p>
              </div>
            ))}
          </div>
        </DarkPanel>

        <LssSection id="funkce" heading="Co systém umí">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {FUNKCE.map((f) => (
              <FeatureTile key={f.title} {...f} accent={ACCENT} />
            ))}
          </div>
        </LssSection>

        <LssSection
          id="pamatky"
          heading="Provoz v památkově chráněném areálu"
          perex="Pražský hrad, Špilberk i Slezskoostravský hrad mají svá pravidla. Technika se jim musí přizpůsobit, ne naopak."
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              ['Bez pevné instalace', 'Terminály jsou mobilní, bateriové a po představení se uklidí.'],
              ['Minimální kabeláž', 'Žádné zásahy do historických konstrukcí ani rozvody přes nádvoří.'],
              ['Rychlá montáž a demontáž', 'Stavba baru zvládnutá v rámci běžné přípravy hracího dne.'],
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
          { id: 'prestavka', label: 'Přestávka' },
          { id: 'pred', label: 'Předobjednávka' },
          { id: 'funkce', label: 'Funkce' },
          { id: 'pamatky', label: 'Památkový areál' },
        ]}
      />
    </LssPage>
  )
}
