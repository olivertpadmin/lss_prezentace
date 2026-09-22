#!/usr/bin/env python3
"""Open-air auditorium SVG plans for Letni shakespearovske slavnosti."""
import math, os

OUT = "./public/lss"
os.makedirs(OUT, exist_ok=True)

INK = "#14101A"
PAPER = "#F4EFE6"
PITCH = 15.0

CATS = [("I", "#A33230", "I. cena"), ("II", "#C9772F", "II. cena"),
        ("III", "#7C6A9C", "III. cena"), ("VIP", "#C9A227", "Lóže"),
        ("WCH", "#3F7D6E", "Vozíčkáři")]
CAT_COL = {c[0]: c[1] for c in CATS}

STYLE = f"""  <style>
    .seat {{ transition: fill-opacity .15s }}
    .seat:hover {{ fill-opacity: 1 }}
    text {{ font-family: 'Mulish','Helvetica Neue',sans-serif }}
    .sectorlab {{ font-size: 13px; font-weight: 800; letter-spacing: .16em; fill: {PAPER}; fill-opacity:.62 }}
    .rowlab {{ font-size: 8px; font-weight: 700; fill: {PAPER}; fill-opacity:.3; text-anchor: middle }}
    .stage {{ font-family:'Panel Sans','Helvetica Neue',sans-serif; font-size: 21px; font-weight:900;
              letter-spacing:.38em; fill:#1B1207 }}
    .legend {{ font-size: 11px; font-weight: 700; fill: {PAPER}; fill-opacity:.55 }}
    .title {{ font-family:'Panel Sans','Helvetica Neue',sans-serif; font-size:21px; font-weight:900; fill:{PAPER} }}
    .subtitle {{ font-size:11.5px; font-weight:600; fill:{PAPER}; fill-opacity:.4; letter-spacing:.04em }}
    .cap {{ font-size:11.5px; font-weight:800; fill:#C9A227; letter-spacing:.04em }}
  </style>"""


def seat(x, y, cat, r=5.0):
    c = CAT_COL[cat]
    return f'<circle class="seat s-{cat}" cx="{x:.1f}" cy="{y:.1f}" r="{r}" fill="{c}" fill-opacity=".85"/>'


def band(cx, cy, r0, rows, gap, span_deg, cat, letters):
    """Concentric seat rows opening downward toward a stage at +y. Returns svg, count, outer_r."""
    out, total = [], 0
    half = math.radians(span_deg) / 2
    for i in range(rows):
        r = r0 + i * gap
        n = max(2, int((2 * half * r) / PITCH))
        for j in range(n):
            t = -half + 2 * half * j / (n - 1)
            out.append(seat(cx + math.sin(t) * r, cy - math.cos(t) * r, cat))
        total += n
        lab = letters[i] if i < len(letters) else str(i + 1)
        for s in (-1, 1):
            lx = cx + math.sin(half * s) * (r + 13 * s * s) + 13 * s
            ly = cy - math.cos(half * s) * (r) + 3
            out.append(f'<text class="rowlab" x="{lx:.1f}" y="{ly:.1f}">{lab}</text>')
    return "\n".join(out), total, r0 + (rows - 1) * gap


def grid(x0, y0, cols, rows, cat, dx=13.5, dy=13.5):
    out, n = [], 0
    for i in range(rows):
        for j in range(cols):
            out.append(seat(x0 + j * dx, y0 + i * dy, cat)); n += 1
    return "\n".join(out), n


def legend_row(x, y):
    o = []
    for i, (k, c, lab) in enumerate(CATS):
        cx = x + i * 108
        o.append(f'<circle cx="{cx}" cy="{y}" r="5" fill="{c}" fill-opacity=".9"/>')
        o.append(f'<text class="legend" x="{cx+11}" y="{y+4}">{lab}</text>')
    return "\n".join(o)


def build(name, title, subtitle, W, H, cy, stage_w, bands, loge_rows, wch_n):
    b, total = [], 0
    # stage
    b.append(f'<ellipse cx="{W/2}" cy="{cy+62}" rx="{stage_w*0.62:.0f}" ry="110" fill="#C9A227" opacity=".12" filter="url(#soft)"/>')
    b.append(f'<rect x="{W/2-stage_w/2:.0f}" y="{cy+22}" width="{stage_w}" height="68" rx="7" fill="url(#stagegrad)"/>')
    b.append(f'<text class="stage" x="{W/2}" y="{cy+64}" text-anchor="middle">JEVIŠTĚ</text>')
    for i in range(int(stage_w // 42)):
        b.append(f'<circle cx="{W/2-stage_w/2+18+i*42:.0f}" cy="{cy+14}" r="3.2" fill="#F6E7B8" opacity=".7"/>')

    outer = 0
    for (r0, rows, gap, span, cat, letters, label) in bands:
        s, n, o = band(W / 2, cy, r0, rows, gap, span, cat, letters)
        b.append(s); total += n; outer = max(outer, o)
        b.append(f'<text class="sectorlab" x="{W/2}" y="{cy-o-24:.0f}" text-anchor="middle">{label}</text>')

    # lodge blocks left / right
    ly = cy - outer * 0.62
    s, n = grid(W / 2 - outer * 0.90 - 60, ly, 3, loge_rows, "VIP"); b.append(s); total += n
    b.append(f'<text class="sectorlab" x="{W/2-outer*0.90-46:.0f}" y="{ly-14:.0f}" text-anchor="middle">LÓŽE L</text>')
    s, n = grid(W / 2 + outer * 0.90 + 33, ly, 3, loge_rows, "VIP"); b.append(s); total += n
    b.append(f'<text class="sectorlab" x="{W/2+outer*0.90+47:.0f}" y="{ly-14:.0f}" text-anchor="middle">LÓŽE P</text>')

    # wheelchair apron
    s, n = grid(W / 2 - (wch_n - 1) * 11, cy - 62, wch_n, 1, "WCH", dx=22)
    b.append(s); total += n
    b.append(f'<text class="sectorlab" x="{W/2}" y="{cy-78}" text-anchor="middle">VOZÍČKÁŘI</text>')

    svg = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}">
{STYLE}
  <defs>
    <radialGradient id="glow" cx="50%" cy="86%" r="60%">
      <stop offset="0%" stop-color="#C9A227" stop-opacity=".20"/>
      <stop offset="55%" stop-color="#A33230" stop-opacity=".07"/>
      <stop offset="100%" stop-color="#14101A" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="stagegrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#F6E7B8"/><stop offset="100%" stop-color="#D8B24A"/>
    </linearGradient>
    <filter id="soft" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="10"/></filter>
  </defs>
  <rect width="{W}" height="{H}" fill="{INK}"/>
  <rect width="{W}" height="{H}" fill="url(#glow)"/>
  <text class="title" x="32" y="42">{title}</text>
  <text class="subtitle" x="32" y="62">{subtitle}</text>
  <text class="cap" x="{W-32}" y="42" text-anchor="end">kapacita {total} diváků</text>
{chr(10).join(b)}
{legend_row(32, H-26)}
</svg>
"""
    open(f"{OUT}/{name}.svg", "w").write(svg)
    print(name, total)


build("hlediste-purkrabstvi",
      "Nejvyšší purkrabství Pražského hradu",
      "Letní scéna pod širým nebem · hlediště v SVG",
      1120, 866, 686, 460,
      [(170, 8, 16.5, 98, "I", list("ABCDEFGH"), "PARTER A"),
       (348, 6, 17.0, 100, "II", list("JKLMNO"), "PARTER B"),
       (478, 3, 18.0, 102, "III", list("PQR"), "TRIBUNA C")],
      loge_rows=4, wch_n=8)

build("hlediste-spilberk",
      "Hrad Špilberk, Brno",
      "Velké nádvoří · hlediště v SVG",
      1200, 906, 726, 540,
      [(175, 9, 16.5, 100, "I", list("ABCDEFGHI"), "NÁDVOŘÍ A"),
       (362, 7, 17.0, 102, "II", list("JKLMNOP"), "NÁDVOŘÍ B"),
       (512, 4, 18.0, 104, "III", list("QRST"), "HRADEBNÍ TRIBUNA")],
      loge_rows=5, wch_n=10)
