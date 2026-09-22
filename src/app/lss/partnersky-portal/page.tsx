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

const ACCENT = '#5B6EE1'

const PRO_KOHO = [
  {
    icon: '🤝',
    title: 'Generální a hlavní partneři',
    desc: 'Přidělený kontingent vstupenek na celou sezónu. Partner si sám vybírá termíny, scény a počty podle vlastních potřeb.',
  },
  {
    icon: '🏛',
    title: 'Města a spolupořadatelé',
    desc: 'Správa Pražského hradu, magistráty a instituce, které mají nárok na místa na konkrétních scénách.',
  },
  {
    icon: '⭐',
    title: 'Čestní hosté',
    desc: 'Vyzvednutí čestné vstupenky bez telefonátu do kanceláře a bez čekání, až se někdo dostane k e-mailu.',
  },
  {
    icon: '🗞',
    title: 'Novináři a akreditace',
    desc: 'Žádost o akreditaci, schválení a vydání vstupenky s odpovídající zónou — v jednom systému se vstupenkami.',
  },
  {
    icon: '🎭',
    title: 'Hostující soubory',
    desc: 'Vstupenky pro herce, techniku a doprovod při reprízách mimo stálé scény.',
  },
  {
    icon: '👔',
    title: 'Interní distribuce',
    desc: 'Vstupenky pro tým festivalu a dobrovolníky s vlastním limitem a přehledem čerpání.',
  },
]

const FUNKCE = [
  {
    icon: '🎟',
    title: 'Vlastní přehled vstupenek',
    desc: 'Partner se přihlásí a vidí všechna přidělená místa, historii převodů i co mu ze smlouvy ještě zbývá.',
  },
  {
    icon: '📤',
    title: 'Přeposlání a darování',
    desc: 'Vstupenky pošle svým klientům přímo z portálu. Každý dostane vlastní QR kód na své jméno.',
  },
  {
    icon: '↩️',
    title: 'Vrácení nevyužitých míst',
    desc: 'Co partner nevyčerpá do stanoveného termínu, se automaticky vrací do veřejného prodeje.',
  },
  {
    icon: '🧾',
    title: 'Faktury a doklady',
    desc: 'Stažení faktur a přehled transakcí bez dotazů na produkci — i půl roku po sezóně.',
  },
  {
    icon: '📊',
    title: 'Doložitelné plnění',
    desc: 'Výpis skutečně vyčerpaných vstupenek jako podklad k vyúčtování sponzorské smlouvy.',
  },
  {
    icon: '⚙️',
    title: 'Pravidla po partnerech',
    desc: 'Každý partner může mít jiný limit, jiné scény a jiný termín, do kdy musí místa vyčerpat.',
  },
]

export default function LssPartnerskyPortalPage() {
  return (
    <LssPage accent={ACCENT}>
      <LssHero
        accent={ACCENT}
        label="Partnerský portál"
        eyebrow="Produkt 06"
        title={
          <>
            Konec vstupenek
            <br />
            rozesílaných ručně
          </>
        }
        lead={
          <>
            Partneři, města, čestní hosté i novináři si své vstupenky spravují sami. Produkce se
            místo přeposílání e-mailů může věnovat tomu, co se děje na scéně.
          </>
        }
        stats={[
          { value: <CountUp to={6} />, label: 'typů příjemců', note: 'Od generálního partnera po dobrovolníky' },
          { value: <CountUp to={0} />, label: 'ručně rozesílaných vstupenek', note: 'Partner si je vyzvedne sám' },
          { value: '100 %', label: 'nevyužitých míst zpět', note: 'Automaticky do veřejného prodeje' },
        ]}
      />

      <div className="max-w-5xl mx-auto px-8 pb-24">
        <LssSection
          id="pro-koho"
          heading="Pro koho je portál"
          perex="Kolem festivalu se pohybuje víc skupin, než se na první pohled zdá. Každá z nich dnes obvykle končí u někoho z týmu v e-mailu."
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {PRO_KOHO.map((p) => (
              <FeatureTile key={p.title} {...p} accent={ACCENT} />
            ))}
          </div>
        </LssSection>

        <DarkPanel
          id="uspora"
          accent={ACCENT}
          eyebrow="Čas produkce"
          heading={
            <>
              Sto padesát představení,
              <br />
              pět scén, jeden tým
            </>
          }
        >
          <p className="text-[16px] leading-relaxed max-w-2xl mb-9" style={{ color: 'rgba(246,241,232,0.55)' }}>
            Každá partnerská vstupenka, která se dnes řeší ručně, znamená e-mail, potvrzení, případnou
            změnu a nakonec dohledávání, jestli se místo vůbec využilo. Při stopadesáti termínech to
            přestává být administrativa a začíná to být plný úvazek.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              ['Nastavíte jednou', 'Limity a pravidla pro každého partnera před začátkem sezóny.'],
              ['Partner si poradí sám', 'Vybírá termíny, přeposílá vstupenky a stahuje faktury bez vaší asistence.'],
              ['Místa se nikdy neztratí', 'Nevyčerpaný kontingent se vrací do prodeje a generuje tržbu.'],
            ].map(([t, d]) => (
              <div
                key={t}
                className="rounded-2xl p-6"
                style={{ background: 'rgba(246,241,232,0.05)', border: '1px solid rgba(246,241,232,0.09)' }}
              >
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

        <LssSection id="funkce" heading="Co portál umí">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {FUNKCE.map((f) => (
              <FeatureTile key={f.title} {...f} accent={ACCENT} />
            ))}
          </div>
        </LssSection>

        <LssSection
          id="akreditace"
          heading="Akreditace jako součást ticketingu"
          perex="Novináři, fotografové, technika a doprovod souborů potřebují jiný typ vstupu než divák. Akreditační systém to řeší stejnými nástroji."
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              ['Žádost a schválení', 'Formulář, schvalovací kolečko a evidence, kdo akreditaci vydal a kdy.'],
              ['Zóny a oprávnění', 'Hlediště, zákulisí, fotopozice — každá akreditace má vlastní přístupová práva.'],
              ['Vizuál na míru', 'Podoba akreditace ve stylu ročníku, s fotografií i bez ní.'],
              ['Kontrola u brány', 'Načtení stejným scannerovým režimem jako běžné vstupenky, se záznamem o průchodu.'],
            ].map(([t, d]) => (
              <PaperCard key={t} accent={ACCENT}>
                <div className="w-8 h-[3px] rounded-full mb-3" style={{ background: ACCENT }} />
                <div className="font-bold mb-1.5" style={{ color: LSS.ink }}>
                  {t}
                </div>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(20,16,26,0.6)' }}>
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
          { id: 'pro-koho', label: 'Pro koho' },
          { id: 'uspora', label: 'Čas produkce' },
          { id: 'funkce', label: 'Funkce' },
          { id: 'akreditace', label: 'Akreditace' },
        ]}
      />
    </LssPage>
  )
}
