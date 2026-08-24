import { OVERLAP, site } from "@/lib/site";
import { cn } from "@/lib/utils";

const CALL_AGENDA = [
  "What the system does today, and where it stops working",
  "Which of the problems are blocking launch and which can wait",
  "A rough shape and duration for the work, said out loud on the call",
  "A written summary from me afterwards, whether or not you hire me",
];

/**
 * Renders the real scheduler when site.bookingUrl is set. Until then it shows the
 * agenda and the actual overlap windows, so the page still answers "what happens
 * next" rather than showing an empty frame.
 *
 * `tone` exists because the dark register is reserved for case studies, diagrams
 * and the final CTA. Inside that CTA band the panel is petrol; on the contact
 * page, which is porcelain, it is a white card.
 */
export function Scheduler({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const dark = tone === "dark";

  if (site.bookingUrl) {
    return (
      <div
        className={cn(
          "overflow-hidden rounded-card border bg-card",
          dark ? "border-hairline-dark" : "border-hairline"
        )}
      >
        <iframe
          src={site.bookingUrl}
          title="Book a 30-minute call"
          loading="lazy"
          className="h-[640px] w-full border-0"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "rounded-card border p-6 sm:p-8",
        dark ? "border-hairline-dark bg-ink" : "border-hairline bg-card"
      )}
    >
      <p className={dark ? "eyebrow-dark" : "eyebrow"}>On the call</p>
      <ul className="mt-5 space-y-3">
        {CALL_AGENDA.map((item) => (
          <li
            key={item}
            className={cn("flex gap-3 text-body", dark ? "text-on-dark" : "text-muted")}
          >
            <span
              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brass"
              aria-hidden="true"
            />
            {item}
          </li>
        ))}
      </ul>

      <div className={cn("mt-8 border-t pt-6", dark ? "border-hairline-dark" : "border-hairline")}>
        <p
          className={cn(
            "font-mono text-caption uppercase",
            dark ? "text-on-dark/70" : "text-slate"
          )}
        >
          Hours I guarantee
        </p>
        <dl className="mt-4 space-y-2.5">
          {OVERLAP.map((window) => (
            <div key={window.region} className="flex flex-wrap justify-between gap-x-6 gap-y-1">
              <dt className={cn("text-small", dark ? "text-on-dark/80" : "text-muted")}>
                {window.region}
              </dt>
              <dd className={cn("text-small", dark ? "text-porcelain" : "text-ink")}>
                {window.theirHours}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
