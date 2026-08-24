/**
 * Typography audit.
 *
 * Asserts the design system's type rules against the rendered pages, because
 * they are easy to break silently — a colour utility next to a size utility once
 * caused tailwind-merge to drop the size and render on-ink headings at 16px.
 *
 * Every heading must use the display face, weight 500, and a size from the scale.
 * Tag level and size are deliberately decoupled.
 *
 * Usage:  node scripts/audit-typography.mjs   (with the site running on :3311)
 */

import { chromium } from "playwright-core";

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

// Headings must use the display face at weight 500 and a size from the scale.
// Tag level and size are deliberately decoupled — an h3 may carry a section-lead
// statement at 32px, or a small group label at 14px.
const SCALE = [64, 44, 32, 22, 18, 16, 14, 12];

const b = await chromium.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: true,
});
const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();

let bad = 0;
for (const path of PAGES) {
  await p.goto("http://localhost:3311" + path, { waitUntil: "networkidle" });
  const rows = await p.evaluate(() => {
    const out = [];
    for (const el of document.querySelectorAll("main h1, main h2, main h3, footer h2")) {
      if (el.classList.contains("sr-only")) continue;
      const cs = getComputedStyle(el);
      out.push({
        tag: el.tagName,
        size: parseFloat(cs.fontSize),
        weight: cs.fontWeight,
        family: cs.fontFamily.split(",")[0].replace(/"/g, ""),
        text: el.textContent.trim().slice(0, 34),
      });
    }
    return out;
  });

  const offenders = rows.filter((r) => !SCALE.includes(Math.round(r.size)));
  const wrongWeight = rows.filter((r) => r.weight !== "500");
  const wrongFamily = rows.filter((r) => r.family !== "Archivo Variable");

  if (offenders.length || wrongWeight.length || wrongFamily.length) {
    bad += offenders.length + wrongWeight.length + wrongFamily.length;
    console.log("FAIL " + path);
    for (const o of offenders) console.log(`   size  ${o.tag} ${o.size}px  "${o.text}"`);
    for (const o of wrongWeight) console.log(`   weight ${o.tag} ${o.weight}  "${o.text}"`);
    for (const o of wrongFamily) console.log(`   family ${o.tag} ${o.family}  "${o.text}"`);
  } else {
    console.log(`ok   ${path}  (${rows.length} headings)`);
  }
}

console.log(bad === 0 ? "\nType scale clean." : `\n${bad} heading(s) off-scale.`);
await b.close();
