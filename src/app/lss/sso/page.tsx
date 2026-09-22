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
} from '@/components/lss/LssKit'
import { LSS } from '@/lib/lss'

const ACCENT = '#4FB477'

const BODY = [
  { icon: '🌐', title: 'Nákup na webu', desc: 'Divák si vytvoří účet při první koupi vstupenky. Příště už jen přihlášení.' },
  { icon: '📱', title: 'Mobilní aplikace', desc: 'Volitelný doplněk — účet je připraven i pro budoucí rozšíření.' },
  { icon: '📷', title: 'Scanner u brány', desc: 'Kontrola QR kódu u vstupu, napojená na stejný účet diváka.' },
  { icon: '🍷', title: 'Bar o přestávce', desc: 'Platba i předobjednávka pod stejnou identitou, s útratou navázanou na profil.' },
  { icon: '🤝', title: 'Partnerský portál', desc: 'Sponzoři a čestní hosté se přihlašují stejným mechanismem jako diváci.' },
  { icon: '🎭', title: 'Akreditace', desc: 'Novináři a hostující soubory mají účet s vlastní rolí a oprávněními.' },
]

const PRINOSY = [
  {
    icon: '🧩',
    title: 'Jeden divák, ne pět záznamů',
    desc: 'Kdo koupil vstupenku na webu, na pokladně a prošel přes scanner u brány, je dnes často více oddělených stop. S jednotnou identitou je to jeden profil s úplnou historií.',
  },
  {
    icon: '🔑',
    title: 'Méně zapomenutých hesel',
    desc: 'Přihlášení přes e-mail, telefon nebo účet u poskytovatele. Nejčastější dotaz na zákaznickou podporu tím z velké části mizí.',
  },
  {
    icon: '🛡',
    title: 'Souhlasy na jednom místě',
    desc: 'Marketingové souhlasy, zpracování údajů i odhlášení z komunikace se spravují z jednoho účtu a propisují se do všech nástrojů.',
  },
  {
    icon: '🇪🇺',
    title: 'Napříč zeměmi',
    desc: 'Divák, který byl v Bratislavě a koupí si vstupenku v Praze, se přihlašuje stejným účtem. Historie zůstává pohromadě.',
  },
]

export default function LssSsoPage() {
  return (
    <LssPage accent={ACCENT}>
      <LssHero
        accent={ACCENT}
        label="SSO"
        eyebrow="Základ ekosystému"
        title={
          <>
            Jedna identita
            <br />
            diváka
          </>
        }
        lead={
          <>
            Uprostřed ekosystému stojí jednotné přihlášení. Díky němu je divák, který koupil vstupenku
            na webu a projde přes scanner u brány, pořád tentýž člověk — se všemi sezónami za sebou.
          </>
        }
        stats={[
          { value: <CountUp to={1} />, label: 'účet pro celý festival', note: 'Web, pokladna, brána, bar i portál' },
          { value: <CountUp to={6} />, label: 'napojených nástrojů', note: 'Data proudí mezi nimi automaticky' },
          { value: <CountUp to={2} />, label: 'země, jedna identita', note: 'Česko i Slovensko pod jedním účtem' },
        ]}
      />

      <div className="max-w-5xl mx-auto px-8 pb-24">
        <LssSection
          id="kde"
          heading="Kde všude se divák přihlašuje"
          perex="Každý kontaktní bod festivalu používá stejný účet. Web, pokladna, brána i portál pracují se stejným divákem."
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {BODY.map((b) => (
              <FeatureTile key={b.title} {...b} accent={ACCENT} />
            ))}
          </div>
        </LssSection>

        <DarkPanel
          id="prinosy"
          accent={ACCENT}
          eyebrow="Proč na tom záleží"
          heading={
            <>
              Bez jednotné identity
              <br />
              nedávají data smysl
            </>
          }
        >
          <p className="text-[16px] leading-relaxed max-w-2xl mb-9" style={{ color: 'rgba(246,241,232,0.55)' }}>
            CRM, marketing i AI asistent stojí a padají s tím, jestli umíte spolehlivě poznat, že jde
            pořád o stejného člověka. Jednotné přihlášení je ta nejnudnější a zároveň nejdůležitější
            část celého ekosystému.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PRINOSY.map((p) => (
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

        <LssSection
          id="soukromi"
          heading="Soukromí a správa údajů"
          perex="Jednotný účet znamená i jedno místo, kde má divák vše pod kontrolou."
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              ['Přehled vlastních dat', 'Divák vidí, co o něm evidujete, a může si údaje stáhnout.'],
              ['Odhlášení jedním krokem', 'Zrušení souhlasu se propíše do e-mailů, SMS i push notifikací zároveň.'],
              ['Smazání účtu', 'Požadavek na výmaz se zpracuje napříč všemi nástroji ekosystému.'],
              ['Evidence souhlasů', 'U každého souhlasu je zdroj, datum a rozsah — doložitelné při kontrole.'],
            ].map(([t, d]) => (
              <FeatureTile key={t} icon="🔐" title={t} desc={d} accent={ACCENT} />
            ))}
          </div>
        </LssSection>
      </div>

      <SectionNav
        accent={ACCENT}
        sections={[
          { id: 'hero', label: 'Úvod' },
          { id: 'kde', label: 'Kde se přihlašuje' },
          { id: 'prinosy', label: 'Proč na tom záleží' },
          { id: 'soukromi', label: 'Soukromí' },
        ]}
      />
    </LssPage>
  )
}
