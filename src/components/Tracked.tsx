"use client";

import { useEffect, useRef } from "react";
import { Download } from "lucide-react";
import { track } from "@/lib/analytics";

/** Download link with the event attached. */
export function PdfDownload({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      download
      className={className}
      onClick={() => track("pdf_download", { file: href })}
    >
      <Download className="h-4 w-4" aria-hidden="true" />
      {children}
    </a>
  );
}

/**
 * Fires once when the visitor reaches the bottom of a service page — the signal
 * that the page was actually read rather than bounced.
 */
export function DepthMarker({ slug }: { slug: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const fired = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !fired.current) {
            fired.current = true;
            track("service_page_depth", { service: slug });
            observer.disconnect();
          }
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [slug]);

  return <div ref={ref} aria-hidden="true" className="h-px w-full" />;
}
