"use client";

import { track as vercelTrack } from "@vercel/analytics";

/**
 * Privacy-friendly analytics: aggregate, cookie-free, no cross-site tracking.
 * The named events are the ones that matter commercially — everything else is
 * page views, which arrive automatically.
 */
export type AnalyticsEvent =
  | "book_a_call"
  | "contact_submit"
  | "pdf_download"
  | "service_page_depth";

export function track(event: AnalyticsEvent, properties?: Record<string, string>) {
  try {
    vercelTrack(event, properties);
  } catch {
    // Analytics must never break a page.
  }
}
