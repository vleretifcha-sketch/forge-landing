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
