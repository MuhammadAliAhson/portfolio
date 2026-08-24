"""
Generates the site icons: public/icon.svg and public/favicon.ico.

The mark is the arrow from the positioning — prototype to production — in the
accent colour on the ink ground, which is legible down to 16px.

    python scripts/generate_icons.py
"""

import os

from PIL import Image, ImageDraw

INK = (11, 26, 30, 255)
ACCENT = (180, 118, 42, 255)

# Geometry on a 64-unit grid, shared by the SVG and the raster.
RADIUS = 14
SHAFT = (14, 29, 40, 35)  # x0, y0, x1, y1
HEAD = [(37, 19), (53, 32), (37, 45)]

SVG = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="Muhammad Ali Ahson">
  <rect width="64" height="64" rx="{RADIUS}" fill="rgb(11,26,30)"/>
  <rect x="{SHAFT[0]}" y="{SHAFT[1]}" width="{SHAFT[2] - SHAFT[0]}" height="{SHAFT[3] - SHAFT[1]}" rx="3" fill="rgb(180,118,42)"/>
  <polygon points="{' '.join(f'{x},{y}' for x, y in HEAD)}" fill="rgb(180,118,42)"/>
</svg>
"""


def draw(size: int) -> Image.Image:
    """Render at 8x then downsample, so the edges are clean at small sizes."""
    scale = 8
    canvas = size * scale
    image = Image.new("RGBA", (canvas, canvas), (0, 0, 0, 0))
    d = ImageDraw.Draw(image)
    k = canvas / 64

    d.rounded_rectangle([0, 0, canvas - 1, canvas - 1], radius=RADIUS * k, fill=INK)
    d.rounded_rectangle(
        [SHAFT[0] * k, SHAFT[1] * k, SHAFT[2] * k, SHAFT[3] * k],
        radius=3 * k,
        fill=ACCENT,
    )
    d.polygon([(x * k, y * k) for x, y in HEAD], fill=ACCENT)

    return image.resize((size, size), Image.LANCZOS)


if __name__ == "__main__":
    root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    public = os.path.join(root, "public")

    svg_path = os.path.join(public, "icon.svg")
    with open(svg_path, "w", encoding="utf-8") as handle:
        handle.write(SVG)
    print(f"wrote {svg_path}")

    ico_path = os.path.join(public, "favicon.ico")
    sizes = [16, 32, 48, 64]
    frames = [draw(s) for s in sizes]
    frames[-1].save(ico_path, format="ICO", sizes=[(s, s) for s in sizes])
    print(f"wrote {ico_path} ({os.path.getsize(ico_path)} bytes)")

    png_path = os.path.join(public, "apple-touch-icon.png")
    draw(180).save(png_path, format="PNG")
    print(f"wrote {png_path}")
