"""
Generates public/capability-overview.pdf — the one-page document that gets
attached to proposals and emails.

Content mirrors the site: if you change positioning, services, engagement models
or overlap hours in src/, mirror them here and re-run:

    python scripts/generate_capability_pdf.py

Design follows the "Porcelain & Petrol" tokens, and embeds the same Archivo,
Inter and JetBrains Mono cuts the site self-hosts so the document reads as the
same piece of work. If font embedding fails it falls back to Helvetica rather
than failing.
"""

import os
import tempfile

from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
from reportlab.lib import colors
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont as RLTTFont

# --- tokens ------------------------------------------------------------------

PORCELAIN = colors.HexColor("#F2F4F3")
INK = colors.HexColor("#0B1A1E")
BRASS = colors.HexColor("#B4762A")
BRASS_DEEP = colors.HexColor("#8F5D21")
SLATE = colors.HexColor("#5C6B6D")
MUTED = colors.HexColor("#3A4A4C")
HAIRLINE = colors.HexColor("#DDE3E0")
ON_DARK = colors.HexColor("#CFDCDA")

PAGE_W, PAGE_H = A4
MARGIN = 46
CONTENT_W = PAGE_W - (MARGIN * 2)

# --- fonts -------------------------------------------------------------------

FONTS = {"display": "Helvetica-Bold", "body": "Helvetica", "mono": "Courier"}


def register_fonts():
    """Convert the site's woff2 faces to TTF and register them with reportlab."""
    try:
        from fontTools.ttLib import TTFont
        from fontTools.varLib import instancer
    except ImportError:
        return

    root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    tmp = tempfile.mkdtemp(prefix="capability-fonts-")

    faces = [
        ("display", "archivo-w500-latin.woff2", "ArchivoSite", {"wdth": 100}),
        ("body", "inter-latin.woff2", "InterSite", {"wght": 400}),
        ("mono", "jetbrains-mono-latin.woff2", "JetBrainsSite", {"wght": 400}),
    ]

    for role, filename, name, pins in faces:
        src = os.path.join(root, "public", "fonts", filename)
        if not os.path.exists(src):
            continue
        try:
            font = TTFont(src)
            if "fvar" in font:
                font = instancer.instantiateVariableFont(font, pins, inplace=False)
            font.flavor = None
            out = os.path.join(tmp, name + ".ttf")
            font.save(out)
            pdfmetrics.registerFont(RLTTFont(name, out))
            FONTS[role] = name
        except Exception:
            # Keep the Helvetica default for this role rather than failing.
            continue


# --- content (mirrors src/lib/site.ts and src/content/*) ---------------------

NAME = "Muhammad Ali Ahson"
PRACTICE = "AI Systems Engineering"
TITLE = "AI Systems & Backend Engineer"
EMAIL = "aliahson56@gmail.com"  # TODO: hello@<domain> once the domain is live
SITE = "portfolio-ahson.vercel.app"  # TODO: custom domain
LOCATION = "Islamabad, Pakistan"
TIMEZONE = "PKT (UTC+5)"

PITCH = ("I take AI prototypes that stalled before launch and rebuild them into "
         "systems your team can run, secure and afford.")

PROOF = [
    ("Days to 1 hr", "Proposal turnaround, replacing a manual process"),
    ("100", "Concurrent requests served on one existing GPU"),
    ("24", "Permission cases mapped before launch, audit-ready"),
    ("+60%", "Retrieval efficiency over single-path RAG"),
]

SERVICES = [
    ("Production readiness audit",
     "A written, prioritised view of what stops your system going live.", "1-2 weeks"),
    ("Codebase rescue and refactor",
     "Structure your team can change without fear. Same behaviour.", "3-8 weeks"),
    ("Backend and API development",
     "APIs, data models and integrations that hold under load.", "4-10 weeks"),
    ("LLM, RAG and agent development",
     "Answers you can defend, grounded in your own data.", "4-10 weeks"),
    ("Security, auth and deployment",
     "Role-based access, audit trails, repeatable releases.", "2-6 weeks"),
    ("Performance and cost optimisation",
     "More traffic on the hardware you own, cost you can see.", "2-4 weeks"),
]

ENGAGEMENTS = [
    ("Production readiness audit", "Fixed scope, 1-2 weeks. Start here."),
    ("Project build", "Fixed scope. Most run 4-10 weeks."),
    ("Monthly retainer", "Rolling, 2 or 4 days a week."),
]

OVERLAP = [
    ("Australia (AEST)", "1:00pm - 5:00pm"),
    ("UK (GMT)", "9:00am - 1:00pm"),
    ("US East (EDT)", "8:00am - 11:00am"),
]

TERMS = [
    "IP transfers to you on final payment",
    "NDA signed on request, before access",
    "Invoiced in USD or AUD",
    "30 days support after handover",
]

INDUSTRIES = ("Engineering consultancy / Healthcare / Financial services / "
              "Agriculture / Media / Document-heavy operations")


# --- helpers -----------------------------------------------------------------

def wrap(c, text, font, size, width):
    words = text.split()
    lines, current = [], ""
    for word in words:
        candidate = (current + " " + word).strip()
        if c.stringWidth(candidate, font, size) <= width:
            current = candidate
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines


def draw_wrapped(c, text, x, y, font, size, width, leading, fill):
    c.setFont(font, size)
    c.setFillColor(fill)
    for line in wrap(c, text, font, size, width):
        c.drawString(x, y, line)
        y -= leading
    return y


def rule(c, y, color=HAIRLINE):
    c.setStrokeColor(color)
    c.setLineWidth(0.5)
    c.line(MARGIN, y, PAGE_W - MARGIN, y)


def eyebrow(c, text, x, y, fill=BRASS_DEEP, size=7):
    """Mono, uppercase — the same eyebrow treatment as the site."""
    c.setFont(FONTS["mono"], size)
    c.setFillColor(fill)
    c.drawString(x, y, text.upper())


# --- page --------------------------------------------------------------------

def build(path):
    register_fonts()
    display, body, mono = FONTS["display"], FONTS["body"], FONTS["mono"]

    c = canvas.Canvas(path, pagesize=A4)
    c.setTitle(NAME + " - Capability overview")
    c.setAuthor(NAME)
    c.setSubject("AI systems and backend engineering: services and terms")

    c.setFillColor(PORCELAIN)
    c.rect(0, 0, PAGE_W, PAGE_H, stroke=0, fill=1)

    # --- header band: the one dark register on the page ---
    band_h = 116
    band_y = PAGE_H - band_h
    c.setFillColor(INK)
    c.rect(0, band_y, PAGE_W, band_h, stroke=0, fill=1)

    eyebrow(c, PRACTICE, MARGIN, PAGE_H - 34, BRASS, 7.5)

    c.setFont(display, 21)
    c.setFillColor(PORCELAIN)
    c.drawString(MARGIN, PAGE_H - 62, NAME)

    c.setFont(body, 10.5)
    c.setFillColor(ON_DARK)
    c.drawString(MARGIN, PAGE_H - 80, TITLE)

    c.setFont(mono, 8)
    c.setFillColor(ON_DARK)
    c.drawString(MARGIN, PAGE_H - 98, LOCATION + "  |  " + TIMEZONE)

    right = PAGE_W - MARGIN
    c.setFont(body, 9)
    c.setFillColor(PORCELAIN)
    c.drawRightString(right, PAGE_H - 62, EMAIL)
    c.setFont(mono, 8)
    c.setFillColor(ON_DARK)
    c.drawRightString(right, PAGE_H - 80, SITE)

    # --- pitch ---
    y = band_y - 46
    y = draw_wrapped(c, PITCH, MARGIN, y, display, 13.5, CONTENT_W - 40, 19, INK)

    # --- proof numbers: brass, the one place a figure gets emphasis ---
    y -= 22
    col_w = CONTENT_W / 4
    for i, (value, label) in enumerate(PROOF):
        x = MARGIN + (i * col_w)
        c.setFont(display, 15)
        c.setFillColor(BRASS)
        c.drawString(x, y, value)
        draw_wrapped(c, label, x, y - 15, body, 7.5, col_w - 14, 9.5, MUTED)

    y -= 46
    c.setFont(mono, 6.8)
    c.setFillColor(SLATE)
    c.drawString(MARGIN, y, "FIGURES ARE MY OWN MEASUREMENTS, NOT AUDITED BENCHMARKS.")

    y -= 16
    rule(c, y)

    # --- services ---
    y -= 22
    eyebrow(c, "What I do", MARGIN, y)
    y -= 18

    col_w = CONTENT_W / 2
    row_h = 50
    for i, (name, outcome, duration) in enumerate(SERVICES):
        col = i % 2
        row = i // 2
        x = MARGIN + (col * col_w)
        top = y - (row * row_h)

        c.setFont(display, 9.5)
        c.setFillColor(INK)
        c.drawString(x, top, name)

        draw_wrapped(c, outcome, x, top - 12, body, 8, col_w - 26, 10, MUTED)

        c.setFont(mono, 7)
        c.setFillColor(BRASS_DEEP)
        c.drawString(x, top - 33, duration.upper())

    y -= (row_h * 3) - 6
    rule(c, y)

    # --- engagement + overlap ---
    y -= 22
    left_x = MARGIN
    right_x = MARGIN + col_w

    eyebrow(c, "How to start", left_x, y)
    eyebrow(c, "Hours I guarantee", right_x, y)

    row_y = y - 18
    for name, shape in ENGAGEMENTS:
        c.setFont(display, 9)
        c.setFillColor(INK)
        c.drawString(left_x, row_y, name)
        c.setFont(mono, 7.5)
        c.setFillColor(MUTED)
        c.drawString(left_x, row_y - 11, shape)
        row_y -= 27

    row_y = y - 18
    for region, hours in OVERLAP:
        c.setFont(body, 9)
        c.setFillColor(MUTED)
        c.drawString(right_x, row_y, region)
        c.setFont(display, 9)
        c.setFillColor(INK)
        c.drawRightString(right, row_y, hours)
        row_y -= 19

    c.setFont(mono, 7)
    c.setFillColor(SLATE)
    c.drawString(right_x, row_y - 2, "OUTSIDE THESE: ASYNC, REPLY IN ONE BUSINESS DAY")

    y = row_y - 20
    rule(c, y)

    # --- terms ---
    y -= 22
    eyebrow(c, "Terms", MARGIN, y)
    y -= 16
    y = draw_wrapped(c, "   /   ".join(TERMS), MARGIN, y, body, 8.5, CONTENT_W, 12, MUTED)

    y -= 10
    eyebrow(c, "Delivered in", MARGIN, y)
    y -= 15
    draw_wrapped(c, INDUSTRIES, MARGIN, y, body, 8.5, CONTENT_W, 11, MUTED)

    # --- footer ---
    c.setStrokeColor(HAIRLINE)
    c.setLineWidth(0.5)
    c.line(MARGIN, 54, PAGE_W - MARGIN, 54)

    c.setFont(display, 9)
    c.setFillColor(INK)
    c.drawString(MARGIN, 38, "Next step: a 30-minute call, no charge.")
    c.setFont(body, 9)
    c.setFillColor(MUTED)
    c.drawString(
        MARGIN + 196, 38,
        "You leave with a written view of what is wrong and what it takes to fix.",
    )

    c.setFont(mono, 7)
    c.setFillColor(SLATE)
    c.drawString(MARGIN, 24, EMAIL + "  |  " + SITE)
    c.drawRightString(right, 24, "CLIENT NAMES WITHHELD UNDER CONFIDENTIALITY TERMS")

    c.showPage()
    c.save()

    return FONTS


if __name__ == "__main__":
    root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    out = os.path.join(root, "public", "capability-overview.pdf")
    used = build(out)
    print("wrote " + out + " (" + str(os.path.getsize(out)) + " bytes)")
    print("fonts: " + str(used))
