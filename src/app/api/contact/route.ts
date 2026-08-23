import { NextResponse } from "next/server";
import { interestLabel, parseContactPayload, type ContactPayload } from "@/lib/contact";

const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const DEFAULT_INBOX = "gustdesign.agency@gmail.com";
const hits = new Map<string, number[]>();

function inbox() {
  return process.env.CONTACT_TO ?? DEFAULT_INBOX;
}

function clientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "local";
}

function tooMany(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

function emailBody(data: ContactPayload) {
  const lines = [
    `Name: ${data.firstName} ${data.lastName}`,
    `Email: ${data.email}`,
    `Company: ${data.company || "—"}`,
    `Interest: ${interestLabel(data.interest)}`,
    "",
    data.message,
  ];
  return lines.join("\n");
}

function subject(data: ContactPayload) {
  return `Forge — ${interestLabel(data.interest)} — ${data.firstName} ${data.lastName}`;
}

async function sendWithResend(data: ContactPayload) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return "missing" as const;

  const from = process.env.CONTACT_FROM ?? "Forge <onboarding@resend.dev>";

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [inbox()],
      reply_to: data.email,
      subject: subject(data),
      text: emailBody(data),
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    console.error("[contact] Resend error", response.status, detail);
    return "error" as const;
  }

  return "sent" as const;
}

async function sendWithFormSubmit(data: ContactPayload) {
  const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(inbox())}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      company: data.company || "—",
      interest: interestLabel(data.interest),
      message: data.message,
      _subject: subject(data),
      _replyto: data.email,
      _template: "table",
      _captcha: "false",
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    console.error("[contact] FormSubmit error", response.status, detail);
    return "error" as const;
  }

  return "sent" as const;
}

export async function POST(request: Request) {
  if (tooMany(clientIp(request))) {
    return NextResponse.json({ error: "Too many messages. Try again later." }, { status: 429 });
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (json && typeof json === "object" && "website" in json) {
    const trap = json.website;
    if (typeof trap === "string" && trap.trim()) {
      return NextResponse.json({ ok: true });
    }
  }

  const parsed = parseContactPayload(json);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  const viaResend = await sendWithResend(parsed.data);
  const result = viaResend === "missing" ? await sendWithFormSubmit(parsed.data) : viaResend;

  if (result === "sent") {
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ error: "Could not send the message. Try again." }, { status: 502 });
}
