import type { Config } from "tailwindcss";

/**
 * Design tokens — "Porcelain & Petrol".
 *
 * Six palette values and nothing else, plus the supporting neutrals the spec
 * allows. Brass is an accent only: text, hairlines, arrows and dots. It never
 * fills an area larger than a button, and no control is ever a coloured CTA —
 * buttons are ink.
 *
 * One deviation, made deliberately: `brass` at #B4762A gives 3.4:1 on porcelain,
 * which fails AA for the 10–11px eyebrow labels the spec asks for. `brass-deep`
 * (#8F5D21, 5.0:1) is used wherever brass appears as small text on a light
 * surface. True brass is kept for large metrics, non-text marks, and everything
 * on the dark register, where it passes at 4.7:1.
 */
const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/content/**/*.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        porcelain: "#F2F4F3",
        card: "#FFFFFF",
        ink: "#0B1A1E",
        petrol: "#123B42",
        brass: {
          DEFAULT: "#B4762A",
          deep: "#8F5D21",
        },
        slate: "#5C6B6D",
        /* supporting neutrals. `muted` is the spec’s sub-headline body value;
           it is not named `body` because that collides with the body font size. */
        muted: "#3A4A4C",
        hairline: {
          DEFAULT: "#DDE3E0",
          dark: "#2C5259",
        },
        outline: "#C3CAC7",
        "on-dark": "#CFDCDA",
      },
      fontFamily: {
        display: ["var(--font-display)", "var(--font-display-fallback)", "sans-serif"],
        sans: ["var(--font-body)", "var(--font-body-fallback)", "sans-serif"],
        mono: ["var(--font-mono)", "var(--font-mono-fallback)", "monospace"],
      },
      /* 64 / 44 / 32 / 22 / 18 / 16 / 14 / 12, clamped down for small screens */
      fontSize: {
        eyebrow: ["0.6875rem", { lineHeight: "1.4", letterSpacing: "0.14em" }],
        caption: ["0.75rem", { lineHeight: "1.5" }],
        small: ["0.875rem", { lineHeight: "1.55" }],
        body: ["1rem", { lineHeight: "1.6" }],
        "body-l": ["1.125rem", { lineHeight: "1.55" }],
        h3: ["1.375rem", { lineHeight: "1.3", letterSpacing: "-0.02em" }],
        h2: ["clamp(1.5rem, 3.4vw, 2rem)", { lineHeight: "1.15", letterSpacing: "-0.025em" }],
        "display-l": ["clamp(2rem, 5vw, 2.75rem)", { lineHeight: "1.1", letterSpacing: "-0.025em" }],
        "display-xl": ["clamp(2.5rem, 7vw, 4rem)", { lineHeight: "1.04", letterSpacing: "-0.025em" }],
      },
      maxWidth: {
        content: "75rem",
        prose: "60ch",
        measure: "46ch",
      },
      spacing: {
        section: "4rem",
        "section-lg": "7.5rem",
      },
      borderRadius: {
        card: "0.75rem",
      },
      borderWidth: {
        thin: "0.5px",
      },
    },
  },
  plugins: [],
};

export default config;
