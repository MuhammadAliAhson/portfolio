/**
 * Responsive and accessibility smoke audit.
 *
 * Drives the locally installed Chrome (no browser download) across the widths
 * that matter and asserts the things that are easy to break and easy to miss:
 *
 *   - no horizontal page scroll at 320px and up
 *   - exactly one h1 per page, and no skipped heading levels
 *   - every image and every SVG figure has a text alternative
 *   - every form control has a label
 *   - a reachable "book a call" control on every page
 *
 * Usage:  node scripts/audit-responsive.mjs [baseUrl]
 * Screenshots land in .audit/ (gitignored).
 */

import { chromium } from "playwright-core";
import { mkdir } from "node:fs/promises";

const BASE = process.argv[2] ?? "http://localhost:3311";
const OUT = ".audit";

const PAGES = [
  "/",
  "/services",
  "/services/production-readiness-audit",
  "/work",
  "/work/enterprise-proposal-engine",
  "/process",
  "/about",
  "/contact",
  "/insights",
  "/privacy",
];

const WIDTHS = [320, 375, 768, 1440];

const CHROME_PATHS = [
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
];

const AUDIT = () => {
  const problems = [];

  // Horizontal overflow, and which element caused it.
  const docWidth = document.documentElement.scrollWidth;
  const viewport = window.innerWidth;
  if (docWidth > viewport + 1) {
    const culprits = [];
    for (const el of document.querySelectorAll("body *")) {
      const rect = el.getBoundingClientRect();
      if (rect.width === 0) continue;
      if (rect.right > viewport + 1 || rect.left < -1) {
        const style = getComputedStyle(el);
        // Elements inside their own scroll container are fine by design.
        let inScroller = false;
        for (let p = el.parentElement; p; p = p.parentElement) {
          const ov = getComputedStyle(p).overflowX;
          if (ov === "auto" || ov === "scroll" || ov === "hidden") {
            inScroller = true;
            break;
          }
        }
        if (inScroller) continue;
        if (style.position === "fixed") continue;
        culprits.push(
          `${el.tagName.toLowerCase()}.${(el.className || "").toString().split(" ").slice(0, 3).join(".")} right=${Math.round(rect.right)}`
        );
      }
    }
    problems.push(
      `horizontal overflow: scrollWidth ${docWidth} > viewport ${viewport}${culprits.length ? ` — ${culprits.slice(0, 4).join(" | ")}` : ""}`
    );
  }

  // Headings.
  const h1s = document.querySelectorAll("h1");
  if (h1s.length !== 1) problems.push(`expected 1 h1, found ${h1s.length}`);

  let previous = 0;
  for (const heading of document.querySelectorAll("h1,h2,h3,h4,h5,h6")) {
    const level = Number(heading.tagName[1]);
    if (previous && level > previous + 1) {
      problems.push(
        `heading level jumps h${previous} to h${level}: "${heading.textContent.trim().slice(0, 48)}"`
      );
    }
    previous = level;
  }

  // Images.
  for (const img of document.querySelectorAll("img")) {
    if (!img.hasAttribute("alt")) problems.push(`img without alt: ${img.currentSrc || img.src}`);
  }

  // SVG figures need a text alternative unless marked decorative.
  for (const svg of document.querySelectorAll("svg")) {
    if (svg.getAttribute("aria-hidden") === "true") continue;
    const labelled =
      svg.getAttribute("aria-label") ||
      svg.getAttribute("aria-labelledby") ||
      svg.querySelector("title");
    if (!labelled) {
      problems.push(`svg without a text alternative near: ${svg.parentElement?.tagName}`);
    }
  }

  // Form controls.
  for (const field of document.querySelectorAll("input, select, textarea")) {
    if (field.type === "hidden") continue;
    const id = field.getAttribute("id");
    const labelled =
      (id && document.querySelector(`label[for="${id}"]`)) ||
      field.closest("label") ||
      field.getAttribute("aria-label") ||
      field.getAttribute("aria-labelledby");
    if (!labelled) problems.push(`unlabelled form control: ${field.name || field.type}`);
  }

  // Booking reachable in one click.
  const booking = [...document.querySelectorAll("a, button")].some((el) =>
    /book a (30-min )?call/i.test(el.textContent || "")
  );
  if (!booking) problems.push("no book-a-call control on this page");

  return problems;
};

async function main() {
  await mkdir(OUT, { recursive: true });

  let browser;
  for (const executablePath of CHROME_PATHS) {
    try {
      browser = await chromium.launch({ executablePath, headless: true });
      break;
    } catch {
      /* try the next path */
    }
  }
  if (!browser) {
    console.error("Could not launch Chrome. Checked:\n  " + CHROME_PATHS.join("\n  "));
    process.exit(1);
  }

  let failures = 0;

  for (const width of WIDTHS) {
    const context = await browser.newContext({
      viewport: { width, height: 900 },
      deviceScaleFactor: 1,
    });

    for (const path of PAGES) {
      const page = await context.newPage();
      const response = await page.goto(`${BASE}${path}`, { waitUntil: "networkidle" });

      if (!response || response.status() >= 400) {
        console.log(`FAIL ${width}px ${path} — HTTP ${response?.status()}`);
        failures += 1;
        await page.close();
        continue;
      }

      const problems = await page.evaluate(AUDIT);

      if (problems.length) {
        failures += problems.length;
        console.log(`FAIL ${width}px ${path}`);
        for (const problem of problems) console.log(`       - ${problem}`);
      } else {
        console.log(`ok   ${width}px ${path}`);
      }

      if (width === 375 || width === 1440) {
        // Scroll through first: the scroll reveals are driven by
        // IntersectionObserver, which a full-page capture alone never triggers.
        await page.evaluate(async () => {
          const step = window.innerHeight * 0.8;
          for (let y = 0; y < document.body.scrollHeight; y += step) {
            window.scrollTo(0, y);
            await new Promise((resolve) => requestAnimationFrame(() => resolve()));
          }
          window.scrollTo(0, 0);
          await new Promise((resolve) => setTimeout(resolve, 450));
        });

        const name = path === "/" ? "home" : path.replace(/\//g, "_").replace(/^_/, "");
        await page.screenshot({
          path: `${OUT}/${name}-${width}.png`,
          fullPage: true,
        });
      }

      await page.close();
    }

    await context.close();
  }

  await browser.close();

  console.log(
    failures === 0
      ? "\nAll checks passed."
      : `\n${failures} problem(s) found. Screenshots in ${OUT}/`
  );
  process.exit(failures === 0 ? 0 : 1);
}

main();
