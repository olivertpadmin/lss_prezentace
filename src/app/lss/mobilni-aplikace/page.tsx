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
import { Phone, ScreenTickets, ScreenProgram, ScreenLoyalty } from '@/components/lss/Mockups'
import { LSS } from '@/lib/lss'

const ACCENT = '#8E6BC9'

const DUVODY = [
  {
    icon: '📶',
    title: 'Vstupenka funguje i bez signálu',
    desc: 'Nádvoří Pražského hradu ani hradby Špilberku nejsou místa se spolehlivým signálem. Vstupenka je stažená v telefonu a načte se i offline.',
  },
  {
    icon: '🌦',
    title: 'Notifikace, když se rozhoduje',
    desc: 'Push zpráva odejde ve chvíli, kdy padne rozhodnutí o zrušení — ne až se divák marně vypraví na Hrad.',
  },
  {
    icon: '🎁',
    title: 'Darování jedním dotykem',
    desc: 'Divák, který nemůže přijít, pošle vstupenku známému nebo ji uvolní zpět do prodeje. Místo v hledišti nezůstane prázdné.',
  },
  {
    icon: '🗺',
    title: 'Cesta ke scéně',
    desc: 'Navigace k bráně, informace o vstupu do areálu a čas, kdy se otevírá hlediště. Méně dotazů na telefonní lince.',
  },
]

const FUNKCE = [
  {
    icon: '🎫',
    title: 'Všechny vstupenky pohromadě',
    desc: 'Jednotlivé vstupenky, festivalový pas i abonmá v jednom seznamu, seřazené podle data.',
  },
  {
    icon: '📖',
    title: 'Program s filtrem podle scény',
    desc: 'Celý ročník podle města, titulu nebo data. Vyprodané termíny jsou vidět hned, nákup ale může primárně zůstat na webu.',
  },
  {
    icon: '⭐',
    title: 'Věrnostní úrovně',
    desc: 'Počet odchozených sezón otevírá přednostní nákup a další výhody. Divák vidí, jak daleko je k další úrovni.',
  },
  {
    icon: '🎭',
    title: 'Obsah ze zákulisí',
    desc: 'Medailonky herců, poznámky dramaturga a rozhovory před premiérou. Doplňkový obsah, pokud by dával smysl později.',
  },
  {
    icon: '💬',
    title: 'Zpětná vazba po představení',
    desc: 'Krátká anketa druhý den ráno. Data o spokojenosti podle titulu a scény jdou rovnou do CRM.',
  },
  {
    icon: '🍷',
    title: 'Objednávka na přestávku',
    desc: 'Divák si předplatí nápoj před začátkem a o přestávce si ho jen vyzvedne. Fronta u baru se zkrátí.',
  },
]

export default function LssAplikacePage() {
  return (
    <LssPage accent={ACCENT}>
      <LssHero
        accent={ACCENT}
        label="Mobilní aplikace · volitelně"
        eyebrow="Produkt 03"
        title={
          <>
            Festival
            <br />
            v kapse
          </>
        }
        lead={
          <>
            Volitelný doplněk k hlavnímu prodeji: vstupenka, program a upozornění na počasí v jedné grafice. Místo papíru
            v kabelce a hledání e-mailu pět minut před začátkem.
          </>
        }
        visual={
          <Phone width={208}>
            <ScreenTickets />
          </Phone>
        }
        stats={[
          { value: <CountUp to={2} />, label: 'nativní platformy', note: 'iOS a Android ve stylu slavností' },
          { value: <CountUp to={0} />, label: 'nutných připojení', note: 'Vstupenka se načte i offline' },
          { value: <CountUp to={3} />, label: 'měsíce sezóny', note: 'Obsah, který drží pozornost i mimo ni' },
        ]}
      />

      <div className="max-w-5xl mx-auto px-8 pb-24">
        <LssSection
          id="obrazovky"
          heading="Tři obrazovky, které divák použije nejčastěji"
          perex="Vstupenka před představením, program při plánování léta a přehled sezón, který dává smysl vracet se."
        >
          <div className="flex flex-wrap justify-center gap-10 py-4">
            <Phone title="Moje vstupenky">
              <ScreenTickets />
            </Phone>
            <Phone title="Program ročníku">
              <ScreenProgram />
            </Phone>
            <Phone title="Věrnost a sezóny">
              <ScreenLoyalty />
            </Phone>
          </div>
        </LssSection>

        <DarkPanel
          id="proc"
          accent={ACCENT}
          eyebrow="Open-air"
          heading={
            <>
              Kdy aplikace dává
              <br />
              u slavností větší smysl
            </>
          }
        >
          <p className="text-[16px] leading-relaxed max-w-2xl mb-9" style={{ color: 'rgba(246,241,232,0.55)' }}>
            Hraje se na hradech, v noci a pod otevřeným nebem. To jsou přesně podmínky, kde papírová
            vstupenka a e-mail selhávají nejčastěji.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {DUVODY.map((d) => (
              <div
                key={d.title}
                className="rounded-2xl p-6"
                style={{ background: 'rgba(246,241,232,0.05)', border: '1px solid rgba(246,241,232,0.09)' }}
              >
                <span className="text-2xl block mb-3">{d.icon}</span>
                <h3 className="font-bold text-base mb-2" style={{ color: LSS.paper }}>
                  {d.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(246,241,232,0.5)' }}>
                  {d.desc}
                </p>
              </div>
            ))}
          </div>
        </DarkPanel>

        <LssSection id="funkce" heading="Co by aplikace mohla obsahovat">
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
          { id: 'obrazovky', label: 'Obrazovky' },
          { id: 'proc', label: 'Proč u slavností' },
          { id: 'funkce', label: 'Funkce' },
        ]}
      />
    </LssPage>
  )
}
