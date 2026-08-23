export const CONTACT_INBOX = process.env.NEXT_PUBLIC_CONTACT_TO ?? "gustdesign.agency@gmail.com";

export const INTERESTS = ["founding", "multi"] as const;

export type Interest = (typeof INTERESTS)[number];

export type ContactPayload = {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  interest: Interest;
  message: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function trim(value: unknown, max: number) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

export function parseContactPayload(input: unknown): { ok: true; data: ContactPayload } | { ok: false; error: string } {
  if (!input || typeof input !== "object") {
    return { ok: false, error: "Invalid request." };
  }

  const body = input as Record<string, unknown>;
  const firstName = trim(body.firstName, 80);
  const lastName = trim(body.lastName, 80);
  const email = trim(body.email, 120).toLowerCase();
  const company = trim(body.company, 120);
  const interest = trim(body.interest, 20) as Interest;
  const message = trim(body.message, 4000);

  if (!firstName || !lastName) {
    return { ok: false, error: "First and last name are required." };
  }
  if (!EMAIL_RE.test(email)) {
    return { ok: false, error: "A valid email is required." };
  }
  if (!INTERESTS.includes(interest)) {
    return { ok: false, error: "Choose Founding Member or Multi-coaches." };
  }
  if (message.length < 8) {
    return { ok: false, error: "Tell us a bit more in the message." };
  }

  return { ok: true, data: { firstName, lastName, email, company, interest, message } };
}

export function interestLabel(interest: Interest) {
  return interest === "founding" ? "Founding Member" : "Multi-coaches";
}

export function contactSubject(data: ContactPayload) {
  return `Forge — ${interestLabel(data.interest)} — ${data.firstName} ${data.lastName}`;
}

export function contactTextBody(data: ContactPayload) {
  return [
    `Name: ${data.firstName} ${data.lastName}`,
    `Email: ${data.email}`,
    `Company: ${data.company || "—"}`,
    `Interest: ${interestLabel(data.interest)}`,
    "",
    data.message,
  ].join("\n");
}

export function formSubmitPayload(data: ContactPayload) {
  return {
    name: `${data.firstName} ${data.lastName}`,
    email: data.email,
    company: data.company || "—",
    interest: interestLabel(data.interest),
    message: contactTextBody(data),
    _subject: contactSubject(data),
    _replyto: data.email,
    _template: "table",
    _captcha: "false",
  };
}

export function mailtoHref(data: ContactPayload) {
  const params = new URLSearchParams({
    subject: contactSubject(data),
    body: contactTextBody(data),
  });
  return `mailto:${CONTACT_INBOX}?${params.toString()}`;
}
