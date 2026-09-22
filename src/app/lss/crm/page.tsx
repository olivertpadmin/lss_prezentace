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
import { DivakProfil, SegmentBuilder } from '@/components/lss/Mockups'
import { LSS } from '@/lib/lss'

const ACCENT = '#2A9D8F'

const SCENARE = [
  {
    icon: '🗓',
    title: 'Abonent se blíží konci předplatného',
    desc: 'Měsíc před koncem ročníku odejde nabídka obnovy se stejným sedadlem. Kdo nezareaguje, dostane po dvou týdnech připomínku s jiným termínem.',
  },
  {
    icon: '🌧',
    title: 'Zrušené představení',
    desc: 'Systém sám rozešle držitelům vstupenek volbu mezi náhradním termínem, voucherem a vrácením peněz. Kdo do tří dnů nevybere, dostane připomínku.',
  },
  {
    icon: '🎂',
    title: 'Pátá sezóna diváka',
    desc: 'Při páté navštívené sezóně se odemkne vyšší věrnostní úroveň a divák dostane poděkování s přednostním nákupem na další ročník.',
  },
  {
    icon: '💤',
    title: 'Divák, který se nevrátil',
    desc: 'Kdo byl loni a letos ještě nenakoupil, dostane v půlce předprodeje program vybraný podle titulů, které už viděl.',
  },
]

const FUNKCE = [
  {
    icon: '🧭',
    title: 'Jeden profil napříč scénami',
    desc: 'Divák, který byl v Brně a letos kupuje v Praze, je jeden člověk, ne dva záznamy. Historie se drží napříč městy i ročníky.',
  },
  {
    icon: '✉️',
    title: 'Kampaně bez externího nástroje',
    desc: 'E-maily, push notifikace i SMS se skládají a odesílají přímo nad databází diváků. Odpadá export do tabulky a import jinam.',
  },
  {
    icon: '📊',
    title: 'Reporty pro grantové žádosti',
    desc: 'Struktura publika podle měst, věku a opakovaných návštěv — podklad pro města, ministerstvo i partnery, připravený za minuty.',
  },
  {
    icon: '🔐',
    title: 'Souhlasy podle GDPR',
    desc: 'Každý souhlas má zdroj, datum a rozsah. Odhlášení se propíše všude, včetně e-mailu a případných budoucích push notifikací.',
  },
  {
    icon: '🎓',
    title: 'Školy a skupiny',
    desc: 'Samostatná kategorie pro školní představení a organizované skupiny s vlastními cenami a fakturací.',
  },
  {
    icon: '🧾',
    title: 'Helpdesk nad profilem',
    desc: 'Když divák zavolá, operátor vidí jeho vstupenky, platby i minulou komunikaci na jedné obrazovce.',
  },
]

export default function LssCrmPage() {
  return (
    <LssPage accent={ACCENT}>
      <LssHero
        accent={ACCENT}
        label="CRM a diváci"
        eyebrow="Produkt 04"
        title={
          <>
            Diváci, které
            <br />
            znáte jménem
          </>
        }
        lead={
          <>
            Osmdesát tisíc návštěv ročně dnes končí jako číslo v reportu. V CRM je z nich databáze
            konkrétních lidí — s historií, preferencemi a důvodem, proč se vrátit.
          </>
        }
        stats={[
          { value: <><CountUp to={88} /> tis.</>, label: 'diváků za sezónu', note: 'Potenciál databáze po prvním ročníku' },
          { value: <CountUp to={6} />, label: 'scén v jednom profilu', note: 'Praha, Brno, Ostrava, Bratislava i hostování' },
          { value: <CountUp to={0} />, label: 'exportů do tabulky', note: 'Kampaně běží nad živými daty' },
        ]}
      />

      <div className="max-w-5xl mx-auto px-8 pb-24">
        <LssSection
          id="profil"
          heading="Profil diváka"
          perex="Všechno, co o divákovi víte, na jedné obrazovce: co viděl, kde sedí nejraději, kolik utratil a jestli s vámi chce být v kontaktu."
        >
          <DivakProfil accent={ACCENT} />
        </LssSection>

        <LssSection
          id="segmenty"
          heading="Segmenty místo hromadné rozesílky"
          perex="Skupiny diváků se skládají z toho, co skutečně udělali. Bez SQL, bez čekání na někoho z IT."
        >
          <SegmentBuilder accent={ACCENT} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
            {[
              ['Abonenti, kteří ještě neobnovili', 'Cílená nabídka se stálým sedadlem'],
              ['Diváci jen komedií', 'Pozvánka na tragédii se slevou na první návštěvu'],
              ['Návštěvníci z Brna v Praze', 'Nabídka blízkého termínu na Špilberku'],
            ].map(([t, d]) => (
              <PaperCard key={t} accent={ACCENT} className="!p-5">
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

        <DarkPanel
          id="scenare"
          accent={ACCENT}
          eyebrow="Automatizace"
          heading={
            <>
              Komunikace, která
              <br />
              běží bez vás
            </>
          }
        >
          <p className="text-[16px] leading-relaxed max-w-2xl mb-9" style={{ color: 'rgba(246,241,232,0.55)' }}>
            Festival má malý tým a tříměsíční špičku. Scénáře jsou pravidla, která nastavíte jednou a
            která pak reagují na chování diváků sama — včetně situací, kdy na ruční rozesílání není čas.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SCENARE.map((s) => (
              <div
                key={s.title}
                className="rounded-2xl p-6"
                style={{ background: 'rgba(246,241,232,0.05)', border: '1px solid rgba(246,241,232,0.09)' }}
              >
                <span className="text-2xl block mb-3">{s.icon}</span>
                <h3 className="font-bold text-base mb-2" style={{ color: LSS.paper }}>
                  {s.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(246,241,232,0.5)' }}>
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </DarkPanel>

        <LssSection id="funkce" heading="Co dalšího CRM umí">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {FUNKCE.map((f) => (
              <FeatureTile key={f.title} {...f} accent={ACCENT} />
            ))}
          </div>
        </LssSection>
      </div>

      <SectionNav
        accent={ACCENT}
        sections={[
          { id: 'hero', label: 'Úvod' },
          { id: 'profil', label: 'Profil diváka' },
          { id: 'segmenty', label: 'Segmenty' },
          { id: 'scenare', label: 'Automatizace' },
          { id: 'funkce', label: 'Funkce' },
        ]}
      />
    </LssPage>
  )
}
