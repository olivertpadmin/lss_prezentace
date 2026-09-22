#!/usr/bin/env python3
"""e-Ticket / mobile-ticket mockups for Letni shakespearovske slavnosti."""
import os, random

OUT = "./public/lss"
os.makedirs(OUT, exist_ok=True)

CRIMSON = "#A33230"
INK = "#100C0E"
PAPER = "#FBF8F3"
GILT = "#C9A227"


def qr(x, y, size, seed, modules=25):
    """Deterministic QR-looking block."""
    rnd = random.Random(seed)
    m = size / modules
    cells = [f'<rect x="{x}" y="{y}" width="{size}" height="{size}" fill="#fff"/>']

    def finder(fx, fy):
        o = []
        o.append(f'<rect x="{x+fx*m}" y="{y+fy*m}" width="{7*m}" height="{7*m}" fill="{INK}"/>')
        o.append(f'<rect x="{x+(fx+1)*m}" y="{y+(fy+1)*m}" width="{5*m}" height="{5*m}" fill="#fff"/>')
        o.append(f'<rect x="{x+(fx+2)*m}" y="{y+(fy+2)*m}" width="{3*m}" height="{3*m}" fill="{INK}"/>')
        return o

    reserved = set()
    for (fx, fy) in [(0, 0), (modules - 7, 0), (0, modules - 7)]:
        for a in range(fx - 1, fx + 8):
            for b in range(fy - 1, fy + 8):
                reserved.add((a, b))
    for i in range(modules):
        for j in range(modules):
            if (i, j) in reserved:
                continue
            if rnd.random() < 0.47:
                cells.append(f'<rect x="{x+i*m:.2f}" y="{y+j*m:.2f}" width="{m:.2f}" height="{m:.2f}" fill="{INK}"/>')
    for f in [(0, 0), (modules - 7, 0), (0, modules - 7)]:
        cells += finder(*f)
    return "\n".join(cells)


def barcode(x, y, w, h, seed):
    rnd = random.Random(seed)
    out, cx = [], x
    while cx < x + w - 4:
        bw = rnd.choice([1.4, 2.2, 3.2, 1.4])
        out.append(f'<rect x="{cx:.1f}" y="{y}" width="{bw}" height="{h}" fill="{INK}"/>')
        cx += bw + rnd.choice([1.6, 2.4, 1.6])
    return "\n".join(out)


STYLE = f"""  <style>
    text {{ font-family:'Mulish','Helvetica Neue',sans-serif }}
    .brand {{ font-family:'Panel Sans','Helvetica Neue',sans-serif; font-weight:900; fill:{INK} }}
    .play  {{ font-family:'Panel Sans','Helvetica Neue',sans-serif; font-weight:900; fill:{INK} }}
    .k {{ font-size:9px; font-weight:800; letter-spacing:.15em; fill:{INK}; fill-opacity:.38 }}
    .v {{ font-size:15px; font-weight:800; fill:{INK} }}
    .vs {{ font-size:12.5px; font-weight:700; fill:{INK}; fill-opacity:.72 }}
    .fine {{ font-size:8.5px; font-weight:600; fill:{INK}; fill-opacity:.4 }}
    .code {{ font-family:'Courier New',monospace; font-size:9px; letter-spacing:.14em; fill:{INK}; fill-opacity:.55 }}
    .chip {{ font-size:9.5px; font-weight:800; letter-spacing:.1em; fill:#fff }}
  </style>"""


def kv(x, y, key, val, cls="v"):
    return (f'<text class="k" x="{x}" y="{y}">{key}</text>'
            f'<text class="{cls}" x="{x}" y="{y+19}">{val}</text>')


def eticket(fname, play, subtitle, venue, city, date, day, time, sector, row, seat_no,
            cat, price, code, seed, badge=None, badge_col=CRIMSON):
    W, H = 900, 380
    stub = 236
    b = [f'<rect width="{W}" height="{H}" rx="16" fill="{PAPER}"/>']
    # crimson spine (echoes the festival logotype)
    b.append(f'<rect x="0" y="0" width="26" height="{H}" rx="13" fill="{CRIMSON}"/>')
    b.append(f'<rect x="13" y="0" width="13" height="{H}" fill="{CRIMSON}"/>')

    # header
    b.append(f'<text class="brand" x="60" y="52" font-size="15" letter-spacing=".06em">Letní shakespearovské slavnosti</text>')
    b.append(f'<text class="brand" x="60" y="52" font-size="15" fill="{CRIMSON}" opacity="0"></text>')
    b.append(f'<text class="k" x="60" y="70">2027 · {city.upper()}</text>')
    if badge:
        bw = 8 * len(badge) + 26
        b.append(f'<rect x="{W-stub-bw-34}" y="34" width="{bw}" height="23" rx="11.5" fill="{badge_col}"/>')
        b.append(f'<text class="chip" x="{W-stub-bw-34+bw/2}" y="49.5" text-anchor="middle">{badge}</text>')

    b.append(f'<line x1="60" y1="86" x2="{W-stub-34}" y2="86" stroke="{INK}" stroke-opacity=".1" stroke-width="1"/>')

    # play title
    b.append(f'<text class="play" x="60" y="146" font-size="44">{play}</text>')
    b.append(f'<text class="vs" x="60" y="172" fill-opacity=".5">{subtitle}</text>')

    # details grid
    b.append(kv(60, 222, "SCÉNA", venue, "vs"))
    b.append(kv(60, 286, f"DATUM · {day.upper()}", date))
    b.append(kv(234, 286, "ZAČÁTEK", time))
    b.append(kv(346, 286, "SEKTOR", sector))
    b.append(kv(478, 286, "ŘADA", row))
    b.append(kv(556, 286, "SEDADLO", seat_no))

    b.append(f'<rect x="60" y="322" width="{W-stub-94}" height="30" rx="6" fill="{INK}" fill-opacity=".045"/>')
    b.append(f'<text class="fine" x="74" y="341">Pořadatel Agentura Schok · Vstup do areálu 45 min před začátkem · '
             f'Hraje se i za nepříznivého počasí.</text>')

    # perforation
    px = W - stub
    b.append(f'<line x1="{px}" y1="18" x2="{px}" y2="{H-18}" stroke="{INK}" stroke-opacity=".22" '
             f'stroke-width="1.6" stroke-dasharray="5 7"/>')
    b.append(f'<circle cx="{px}" cy="0" r="12" fill="{INK}" fill-opacity="0"/>')

    # stub
    b.append(qr(px + 34, 54, 132, seed))
    b.append(f'<text class="code" x="{px+100}" y="204" text-anchor="middle">{code}</text>')
    b.append(f'<text class="k" x="{px+100}" y="232" text-anchor="middle">{cat}</text>')
    b.append(f'<text class="play" x="{px+100}" y="268" text-anchor="middle" font-size="27">{price}</text>')
    b.append(barcode(px + 34, 294, 132, 34, seed + 7))
    b.append(f'<text class="fine" x="{px+100}" y="346" text-anchor="middle">plg.partners · Ticketportal</text>')

    svg = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}">\n'
           f'{STYLE}\n' + "\n".join(b) + "\n</svg>\n")
    open(f"{OUT}/{fname}.svg", "w").write(svg)
    print(fname)


def pass_ticket(fname):
    """Festival season pass / abonma voucher — portrait card."""
    W, H = 560, 760
    b = [f'<rect width="{W}" height="{H}" rx="20" fill="{INK}"/>']
    b.append(f'<rect x="0" y="0" width="{W}" height="{H}" rx="20" fill="url(#nightgrad)"/>')
    b.append(f'<rect x="34" y="40" width="14" height="86" rx="7" fill="{CRIMSON}"/>')
    b.append(f'<text x="62" y="66" font-family="Panel Sans,Helvetica" font-size="15" font-weight="900" '
             f'fill="{PAPER}" letter-spacing=".04em">Letní shakespearovské</text>')
    b.append(f'<text x="62" y="88" font-family="Panel Sans,Helvetica" font-size="15" font-weight="900" '
             f'fill="{PAPER}" letter-spacing=".04em">slavnosti 2027</text>')
    b.append(f'<text x="62" y="112" class="k" style="fill:{GILT};fill-opacity:.9">30. ROČNÍK</text>')

    b.append(f'<text x="34" y="216" font-family="Panel Sans,Helvetica" font-size="52" font-weight="900" '
             f'fill="{PAPER}">Festivalový</text>')
    b.append(f'<text x="34" y="272" font-family="Panel Sans,Helvetica" font-size="52" font-weight="900" '
             f'fill="{GILT}">pas</text>')
    b.append(f'<text x="34" y="308" font-size="13" font-weight="700" fill="{PAPER}" fill-opacity=".45">'
             f'8 představení · Praha, Brno, Ostrava, Bratislava</text>')

    rows = [("DRŽITEL", "Jana Nováková"), ("PLATNOST", "24. 6. – 5. 9. 2027"),
            ("ZBÝVÁ", "5 z 8 představení"), ("ÚROVEŇ", "Zlatá · od 5. sezóny")]
    for i, (k, v) in enumerate(rows):
        y = 366 + i * 58
        b.append(f'<text x="34" y="{y}" class="k" style="fill:{PAPER};fill-opacity:.42">{k}</text>')
        b.append(f'<text x="34" y="{y+22}" font-size="16" font-weight="800" fill="{PAPER}">{v}</text>')
        b.append(f'<line x1="34" y1="{y+36}" x2="{W-34}" y2="{y+36}" stroke="{PAPER}" stroke-opacity=".08"/>')

    b.append(f'<rect x="{W/2-72}" y="596" width="144" height="144" rx="10" fill="#fff"/>')
    b.append(qr(W / 2 - 64, 604, 128, 91, modules=25))
    svg = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}">\n'
           f'{STYLE}\n<defs><linearGradient id="nightgrad" x1="0" y1="0" x2="1" y2="1">'
           f'<stop offset="0%" stop-color="#1A1016"/><stop offset="60%" stop-color="#120D14"/>'
           f'<stop offset="100%" stop-color="#2A1418"/></linearGradient></defs>\n'
           + "\n".join(b) + "\n</svg>\n")
    open(f"{OUT}/{fname}.svg", "w").write(svg)
    print(fname)


eticket("vstupenka-macbeth", "Macbeth", "William Shakespeare · překlad Martin Hilský",
        "Nejvyšší purkrabství Pražského hradu", "Praha", "17. 7. 2027", "sobota", "20:30",
        "Parter A", "D", "14", "I. cenová kategorie", "1 290 Kč",
        "LSS-2027-PRG-MCB-004471", 17, badge="E-VSTUPENKA")

eticket("vstupenka-sen", "Sen noci svatojánské", "Komedie · scéna pod širým nebem",
        "Velké nádvoří hradu Špilberk", "Brno", "29. 7. 2027", "čtvrtek", "20:30",
        "Nádvoří B", "L", "27", "II. cenová kategorie", "890 Kč",
        "LSS-2027-BRN-SNS-011938", 42, badge="MOBILNÍ VSTUPENKA", badge_col="#7C6A9C")

eticket("vstupenka-hamlet", "Hamlet", "Derniéra inscenace · poslední repríza",
        "Slezskoostravský hrad", "Ostrava", "21. 8. 2027", "sobota", "20:00",
        "Nádvoří A", "F", "9", "I. cenová kategorie", "1 190 Kč",
        "LSS-2027-OVA-HML-007265", 88, badge="DERNIÉRA", badge_col=GILT)

pass_ticket("vstupenka-pas")
