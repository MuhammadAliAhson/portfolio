import { NextResponse } from "next/server";
import { site } from "@/lib/site";

export const runtime = "nodejs";

interface Lead {
  name: string;
  email: string;
  company: string;
  service: string;
  budget: string;
  timeline: string;
  message: string;
}

/**
 * Simple in-process rate limit. Enough to stop a script hammering the endpoint;
 * it resets on redeploy and does not span serverless instances, which is an
 * acceptable trade for a contact form.
 */
const HITS = new Map<string, { count: number; first: number }>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = HITS.get(ip);
  if (!entry || now - entry.first > WINDOW_MS) {
    HITS.set(ip, { count: 1, first: now });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(body: Record<string, unknown>) {
  const errors: Record<string, string> = {};
  const text = (key: string) => (typeof body[key] === "string" ? (body[key] as string).trim() : "");

  const name = text("name");
  const email = text("email");
  const message = text("message");

  if (name.length < 2) errors.name = "Please enter your name.";
  if (name.length > 120) errors.name = "That name is too long for the form.";
  if (!EMAIL.test(email)) errors.email = "Please enter an email address I can reply to.";
  if (message.length < 20) {
    errors.message = "Please add a little more detail, at least a sentence or two.";
  }
  if (message.length > 5000) errors.message = "Please shorten this to under 5000 characters.";

  const lead: Lead = {
    name,
    email,
    company: text("company").slice(0, 200),
    service: text("service").slice(0, 200) || "Not specified",
    budget: text("budget").slice(0, 100) || "Not specified",
    timeline: text("timeline").slice(0, 100) || "Not specified",
    message,
  };

  return { errors, lead };
}

function plainText(lead: Lead): string {
  return [
    `Name:     ${lead.name}`,
    `Email:    ${lead.email}`,
    `Company:  ${lead.company || "—"}`,
    `Service:  ${lead.service}`,
    `Budget:   ${lead.budget}`,
    `Timeline: ${lead.timeline}`,
    "",
    lead.message,
  ].join("\n");
}

/**
 * Delivery via Resend. Set RESEND_API_KEY and CONTACT_TO in the environment and
 * enquiries land in that inbox, with an auto-reply to the sender stating the
 * response window. Without the key the route returns 503 and the form tells the
 * visitor to email directly, rather than silently dropping a lead.
 */
async function deliver(lead: Lead): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO ?? site.email;
  const from = process.env.CONTACT_FROM;
  if (!key || !from) return false;

  const send = (payload: Record<string, unknown>) =>
    fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        authorization: `Bearer ${key}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(payload),
    });

  const notification = await send({
    from,
    to,
    reply_to: lead.email,
    subject: `Enquiry — ${lead.name}${lead.company ? ` (${lead.company})` : ""}`,
    text: plainText(lead),
  });

  if (!notification.ok) return false;

  // Auto-reply. A failure here must not fail the submission.
  await send({
    from,
    to: lead.email,
    subject: "Thanks — I have your message",
    text: [
      `Hi ${lead.name.split(" ")[0]},`,
      "",
      "Thanks for getting in touch. I read every enquiry myself and reply within one business day, during the overlap hours for your timezone.",
      "",
      "If it is urgent before then, reply to this email and it comes straight to me.",
      "",
      site.name,
      site.title,
    ].join("\n"),
  }).catch(() => undefined);

  return true;
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { message: "Too many submissions. Please email me directly." },
      { status: 429 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Malformed request." }, { status: 400 });
  }

  // Honeypot: a filled hidden field means a bot. Accept and discard.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const { errors, lead } = validate(body);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      { message: "Please check the highlighted fields.", errors },
      { status: 400 }
    );
  }

  const delivered = await deliver(lead);
  if (!delivered) {
    // Logged so the lead is recoverable from platform logs, and the visitor is
    // told the truth rather than shown a false success screen.
    console.error("[contact] delivery not configured; enquiry not sent:\n", plainText(lead));
    return NextResponse.json(
      {
        message: "The contact form is not connected to an inbox yet. Please email me at",
      },
      { status: 503 }
    );
  }

  return NextResponse.json({ ok: true });
}
