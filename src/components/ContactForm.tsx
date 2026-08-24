"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { site } from "@/lib/site";
import { track } from "@/lib/analytics";
import { SERVICES } from "@/content/services";
import { Button } from "@/components/ui/Button";

const BUDGETS = [
  "Not sure yet",
  "Under 5k",
  "5k – 15k",
  "15k – 40k",
  "40k and above",
];

const TIMELINES = ["As soon as possible", "Within a month", "This quarter", "Just exploring"];

type FieldErrors = Record<string, string>;

const FIELD =
  "mt-1.5 w-full rounded-card border border-hairline bg-card px-3.5 py-2.5 text-body text-ink placeholder:text-slate focus:border-ink focus:outline-none focus:ring-2 focus:ring-brass/40";
const LABEL = "block text-small font-medium text-ink";

export function ContactForm() {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("sending");
    setErrors({});
    setMessage(null);

    const data = Object.fromEntries(new FormData(event.currentTarget));

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });
      const payload = await response.json();

      if (response.ok) {
        setState("sent");
        track("contact_submit", {
          service: String(data.service || "unspecified"),
          budget: String(data.budget || "unspecified"),
        });
        return;
      }

      setState("error");
      setErrors(payload.errors ?? {});
      setMessage(payload.message ?? "Something went wrong. Please email me directly.");
    } catch {
      setState("error");
      setMessage("The form could not reach the server. Please email me directly.");
    }
  }

  if (state === "sent") {
    return (
      <div
        role="status"
        className="rounded-card border border-brass bg-transparent p-6 sm:p-8"
      >
        <h2 className="text-h3">Message received</h2>
        <p className="mt-3 text-body text-muted">
          I reply to every enquiry within one business day, in the overlap window for your
          timezone. If it is urgent, email{" "}
          <a href={`mailto:${site.email}`} className="link-underline">
            {site.email}
          </a>{" "}
          directly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      {message ? (
        <p role="alert" className="rounded-card border border-hairline bg-porcelain p-4 text-small text-ink">
          {message}{" "}
          <a href={`mailto:${site.email}`} className="link-underline">
            {site.email}
          </a>
        </p>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={LABEL} htmlFor="name">
            Your name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            className={FIELD}
            aria-describedby={errors.name ? "name-error" : undefined}
            aria-invalid={errors.name ? true : undefined}
          />
          {errors.name ? (
            <p id="name-error" className="mt-1.5 text-small text-brass-deep">
              {errors.name}
            </p>
          ) : null}
        </div>

        <div>
          <label className={LABEL} htmlFor="company">
            Company
          </label>
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            className={FIELD}
          />
        </div>
      </div>

      <div>
        <label className={LABEL} htmlFor="email">
          Work email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className={FIELD}
          aria-describedby={errors.email ? "email-error" : undefined}
          aria-invalid={errors.email ? true : undefined}
        />
        {errors.email ? (
          <p id="email-error" className="mt-1.5 text-small text-brass-deep">
            {errors.email}
          </p>
        ) : null}
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <div>
          <label className={LABEL} htmlFor="service">
            What you need
          </label>
          <select id="service" name="service" className={FIELD} defaultValue="">
            <option value="">Not sure yet</option>
            {SERVICES.map((service) => (
              <option key={service.slug} value={service.name}>
                {service.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={LABEL} htmlFor="budget">
            Budget band (USD)
          </label>
          <select id="budget" name="budget" className={FIELD} defaultValue={BUDGETS[0]}>
            {BUDGETS.map((budget) => (
              <option key={budget} value={budget}>
                {budget}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={LABEL} htmlFor="timeline">
            Timeline
          </label>
          <select id="timeline" name="timeline" className={FIELD} defaultValue={TIMELINES[0]}>
            {TIMELINES.map((timeline) => (
              <option key={timeline} value={timeline}>
                {timeline}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className={LABEL} htmlFor="message">
          What is going on
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          placeholder="A few lines on the system and where it is stuck."
          className={FIELD}
          aria-describedby={errors.message ? "message-error" : undefined}
          aria-invalid={errors.message ? true : undefined}
        />
        {errors.message ? (
          <p id="message-error" className="mt-1.5 text-small text-brass-deep">
            {errors.message}
          </p>
        ) : null}
      </div>

      {/* Honeypot: hidden from people, tempting to bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-wrap items-center gap-4 pt-1">
        <Button type="submit" disabled={state === "sending"}>
          {state === "sending" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Sending
            </>
          ) : (
            "Send enquiry"
          )}
        </Button>
        <p className="text-small text-slate">I reply within one business day.</p>
      </div>
    </form>
  );
}
