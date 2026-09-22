import type { Product } from '@/lib/products'

/* ──────────────────────────────────────────────────────────────
   Letní shakespearovské slavnosti — vizuální jazyk prezentace
   Odvozeno z logotypu festivalu: cihlová červená, černá, papír.
   ────────────────────────────────────────────────────────────── */

export const LSS = {
  /** Logotyp festivalu — cihlová */
  crimson: '#A33230',
  /** Nasvícená varianta pro hover a akcenty */
  crimsonLit: '#C8453E',
  /** Téměř černá s teplým nádechem — noc na nádvoří */
  ink: '#14101A',
  inkDeep: '#0B0810',
  /** Papír / první folio — podklad světlých sekcí */
  paper: '#F6F1E8',
  paperDeep: '#EBE3D5',
  /** Mosaz, svíčka, rampa */
  gilt: '#C9A227',
  giltSoft: '#E4C55E',
} as const

/** Tmavý gradient nočního nádvoří — používá se v hero sekcích podstránek. */
export const NIGHT =
  'linear-gradient(155deg, #0B0810 0%, #1A1119 42%, #241318 72%, #140D12 100%)'

/** Podklad světlých sekcí. */
export const PAPER_BG = LSS.paper

export const LSS_PRODUCTS: Product[] = [
  {
    slug: 'sso',
    label: 'SSO',
    shortLabel: 'SSO',
    color: '#4FB477',
    angle: -130,
    icon: '🔐',
    description: 'Jedna identita diváka',
  },
  {
    slug: 'ticketing',
    label: 'Prodej\nvstupenek',
    shortLabel: 'Prodej vstupenek',
    color: '#C8453E',
    angle: -90,
    icon: '🎟️',
    description: 'Vlastní pokladna festivalu',
  },
  {
    slug: 'prodejni-system',
    label: 'Prodejní\nsystém',
    shortLabel: 'Prodejní systém',
    color: '#C9A227',
    angle: -54,
    icon: '🗂️',
    description: 'Zákulisí celého provozu',
  },
  {
    slug: 'mobilni-aplikace',
    label: 'Aplikace\nvolitelně',
    shortLabel: 'Aplikace',
    color: '#8E6BC9',
    angle: -18,
    icon: '📱',
    description: 'Jen jako doplňkový kanál',
  },
  {
    slug: 'crm',
    label: 'CRM\na diváci',
    shortLabel: 'CRM a diváci',
    color: '#2A9D8F',
    angle: 18,
    icon: '👥',
    description: 'Jeden profil diváka',
  },
  {
    slug: 'marketing',
    label: 'Marketingová\npodpora',
    shortLabel: 'Marketing',
    color: '#E07A5F',
    angle: 54,
    icon: '📣',
    description: 'Dosah napříč kulturou',
  },
  {
    slug: 'partnersky-portal',
    label: 'Partnerský\nportál',
    shortLabel: 'Partneři',
    color: '#5B6EE1',
    angle: 90,
    icon: '🤝',
    description: 'Čestné vstupenky bez e-mailů',
  },
  {
    slug: 'ai-asistent',
    label: 'AI asistent\npro pořadatele',
    shortLabel: 'AI asistent',
    color: '#C2557A',
    angle: 126,
    icon: '✨',
    description: 'Odpovědi z vašich dat',
  },
  {
    slug: 'kiosky',
    label: 'Scannery\nu bran',
    shortLabel: 'Scannery',
    color: '#3D8BC7',
    angle: 162,
    icon: '📷',
    description: 'Primární odbavení vstupu',
  },
  {
    slug: 'gastro',
    label: 'Cashless\na gastro',
    shortLabel: 'Cashless',
    color: '#E08A2E',
    angle: 198,
    icon: '🍷',
    description: 'Bar o přestávce',
  },
  {
    slug: 'pripadove-studie',
    label: 'Případové\nstudie',
    shortLabel: 'Případové studie',
    color: '#8A9A5B',
    angle: 234,
    icon: '🎭',
    description: 'Kulturní klienti PLG',
  },
]

/** Podstránky, které existují pod /lss/… */
export const LSS_SUBPAGES = new Set(
  LSS_PRODUCTS.map((p) => p.slug).concat(['nabidka']),
)

/* ── Fakta o festivalu (veřejně dostupná) ───────────────────── */

export const SEASON = {
  rocnik: 30,
  rok: 2027,
  od: '24. června',
  do: '5. září',
  predstaveni: '150+',
  divaci: '~88 000',
  divaciRekord: '100 891',
} as const

export interface Scena {
  mesto: string
  misto: string
  kapacita: string
  note: string
}

export const SCENY: Scena[] = [
  {
    mesto: 'Praha',
    misto: 'Nejvyšší purkrabství Pražského hradu',
    kapacita: '~700 diváků',
    note: 'Hlavní scéna festivalu od roku 1998.',
  },
  {
    mesto: 'Praha',
    misto: 'Nádvoří HAMU, Lichtenštejnský palác',
    kapacita: '~400 diváků',
    note: 'Komorní scéna na Malostranském náměstí, od roku 2007.',
  },
  {
    mesto: 'Brno',
    misto: 'Velké nádvoří hradu Špilberk',
    kapacita: '~900 diváků',
    note: 'Nejnavštěvovanější mimopražská scéna.',
  },
  {
    mesto: 'Ostrava',
    misto: 'Slezskoostravský hrad',
    kapacita: '~800 diváků',
    note: 'Sedm inscenací v sezóně pod širým nebem.',
  },
  {
    mesto: 'Bratislava',
    misto: 'Bratislavský hrad',
    kapacita: '~800 diváků',
    note: 'Slovenská scéna festivalu, vlastní měna i legislativa.',
  },
  {
    mesto: 'Na cestách',
    misto: 'Litomyšl · Hluboká · Loket · Kuks',
    kapacita: 'proměnlivá',
    note: 'Hostující reprízy mimo stálé scény.',
  },
]
