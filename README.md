# Letní shakespearovské slavnosti — digitální ekosystém PLG

Samostatná interaktivní prezentace. Nic dalšího nepotřebuje — žádnou databázi,
žádné proměnné prostředí, žádné napojení na jiný projekt.

---

## Jak ji spustit

**Potřebujete Node.js 20 nebo novější.** Ověříte příkazem `node -v`;
pokud ho nemáte, stáhněte si ho z <https://nodejs.org> (verze LTS).

Otevřete terminál ve složce s tímto souborem a spusťte:

```bash
npm install
npm run dev
```

První příkaz stáhne knihovny — trvá zhruba minutu a stačí **jednou**.
Druhý nastartuje server; počkejte na řádek `✓ Ready`.

Pak otevřete v prohlížeči:

**<http://localhost:3000/lss/login>**

Heslo: **`shakespeare`**

Terminál nechte během prezentace otevřený. Server zastavíte klávesami
`Ctrl + C`.

### Když je port obsazený

```bash
npm run dev -- --port 3100
```

…a otevřete `http://localhost:3100/lss/login`.

### Ostrá verze

```bash
npm run build
npm run start
```

Projekt lze bez úprav nasadit na Vercel — stačí složku nahrát jako nový projekt.

---

## Než začnete prezentovat

- **Otevřete na velké obrazovce.** Pod šířkou 768 px se zobrazí jen výzva
  k otevření na počítači. Netestujte v úzkém okně.
- **Jděte rovnou na `/lss/login`.** Kořen webu i `/lss` vás tam stejně přesměrují.
- Heslo změníte v `src/app/api/lss-auth/route.ts`.

---

## Jak se v prezentaci pohybovat

Po přihlášení jste na rozcestníku: schéma ekosystému nad nočním hradním nádvořím.

- **Kliknutím na kterýkoliv kruh** se otevře stránka produktu.
- **Pilulky v horní liště** vedou na totéž, bez nutnosti trefit se do kruhu.
- **Červené tlačítko „Nabídka pro LSS 2027"** vpravo nahoře je obchodní část —
  je dostupné z každé stránky.
- Na podstránkách je vpravo **svislý navigátor sekcí** (tečky se šipkami)
  pro rychlé proklikání.
- Zpět na rozcestník vede odkaz **„← Ekosystém pro slavnosti"** vlevo nahoře.

### Doporučené pořadí na schůzce

1. `/lss` — rozcestník, ukázat šíři ekosystému
2. `/lss/ticketing` — jádro nabídky, zejména sekce „Co dnes stojí mezi divákem
   a vstupenkou" a interaktivní plánek hlediště
3. `/lss/pripadove-studie` — důkaz, že to funguje
4. `/lss/nabidka` — harmonogram přechodu a další krok

---

## Co prezentace obsahuje

| Stránka | Obsah |
|---|---|
| `/lss` | Rozcestník — ekosystém jako hlediště obrácené k divákovi |
| `/lss/ticketing` | Prodej vstupenek — tření, hlediště, počasí, abonmá, vstupenky |
| `/lss/nabidka` | Cenová nabídka — vše zahrnuto v provizi 3 % |
| `/lss/prodejni-system` | Backoffice festivalu, 8 modulů |
| `/lss/mobilni-aplikace` | Aplikace pro diváky |
| `/lss/crm` | Profil diváka, segmenty, automatizace |
| `/lss/marketing` | Kanály, rytmus roku, měření |
| `/lss/partnersky-portal` | Partneři, města, čestní hosté, akreditace |
| `/lss/ai-asistent` | Dotazy nad daty festivalu |
| `/lss/kiosky` | Odbavení u brány |
| `/lss/gastro` | Cashless a bar o přestávce |
| `/lss/sso` | Jednotná identita diváka |
| `/lss/pripadove-studie` | Reálné výsledky + překlad pro slavnosti |

---

## Úpravy obsahu

Texty jsou přímo v souborech stránek, obvykle nahoře v pojmenovaných polích
(`FRICTION`, `FUNKCE`, `KROKY` a podobně). Při běžícím `npm run dev` se změna
projeví hned po uložení.

**Čísla o festivalu** (počet představení, návštěvnost, scény, kapacity) jsou
na jednom místě: `src/lib/lss.ts`. Barvy a produkty ekosystému také.

### Plánky hledišť a vstupenky

Jsou to vygenerovaná SVG v `public/lss/`. Zdrojové skripty jsou ve složce
`scripts/` a potřebují jen `python3`:

```bash
python3 scripts/generate-hlediste.py
python3 scripts/generate-vstupenky.py
```

V hlavičce skriptu upravte cestu `OUT`. Další scénu (HAMU, Ostrava, Bratislava)
přidáte jedním voláním `build()` na konci souboru.

---

## Dvě poznámky k obsahu

**Sekce „Co dnes stojí mezi divákem a vstupenkou"** na stránce ticketingu
vychází z veřejně publikovaných podmínek prodeje slavností. Je to nejsilnější
argument prezentace, ale zároveň jediné místo, kde se tvrdí něco o klientovi —
**ověřte si aktuálnost těchto bodů před schůzkou.** Pokud se něco změnilo,
smažte příslušnou položku z pole `FRICTION`.

**Případové studie** jsou reálné výsledky ze sportovních klientů, takto
poctivě označené, doplněné o panel „Co to znamená pro slavnosti". Nejsou
vydávány za kulturní reference.

**Obrat v cenové nabídce** (`/lss/nabidka`) je modelově nastavený na 50 mil. Kč. Skutečné
číslo přepište v konstantě `OBRAT` na začátku souboru
`src/app/lss/nabidka/page.tsx`; všechny dopočty se aktualizují samy. Sazba
provize je v konstantě `PROVIZE`.

**Stránky CRM a mobilní aplikace** obsahují ilustrativní ukázky rozhraní.
Až budou k dispozici skutečné popisy produktů z `poradatel.ticketportal.cz`,
je potřeba je nahradit — komponenty jsou v `src/components/lss/Mockups.tsx`.

---

## Struktura projektu

```
src/app/lss/          stránky prezentace
src/app/api/          přihlášení (a vypnutý sběr návštěvnosti)
src/components/lss/   noční obloha, navigace, UI kit, mockupy
src/components/       schéma ekosystému, datová mračna, navigátor sekcí
src/lib/lss.ts        barvy, produkty, data o festivalu
public/lss/           logotyp, plánky hledišť, vstupenky
scripts/              generátory grafických podkladů
```
