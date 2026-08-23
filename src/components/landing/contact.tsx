"use client";

import Script from "next/script";
import { useEffect, useState, type FormEvent } from "react";
import { ActionButton, Container, SectionBadge, SectionTitle, cx } from "@/components/landing/ui";
import { CONTACT_INBOX, formSubmitPayload, mailtoHref, INTERESTS, type ContactPayload, type Interest } from "@/lib/contact";

const CALENDLY_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL ||
  "https://calendly.com/gustdesignagency/forgeapp-discovery?hide_event_type_details=1&hide_gdpr_banner=1";

const FIELD =
  "w-full rounded-xl border border-black/10 bg-page px-4 text-base font-medium tracking-[-0.32px] text-ink outline-none transition-colors placeholder:text-muted/55 focus:border-blue";

async function sendWithFormSubmit(data: ContactPayload) {
  try {
    const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(CONTACT_INBOX)}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formSubmitPayload(data)),
    });

    const result = (await response.json().catch(() => null)) as
      | { success?: string | boolean; message?: string }
      | null;

    const success = result?.success === true || result?.success === "true";
    if (response.ok && success) {
      return { ok: true as const, via: "formsubmit" as const };
    }
  } catch {
    // Fall through to mailto so the visitor can still send.
  }

  return { ok: true as const, via: "mailto" as const };
}

function CalendlyEmbed({ url }: { url: string }) {
  return (
    <>
      <div
        className="calendly-inline-widget w-full overflow-hidden rounded-2xl bg-white"
        data-url={url}
        style={{ minWidth: 320, height: 700 }}
      />
      <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="lazyOnload" />
    </>
  );
}

function FieldLabel({ htmlFor, children, hint }: { htmlFor: string; children: string; hint?: string }) {
  return (
    <label htmlFor={htmlFor} className="mb-2 flex items-baseline justify-between gap-3 text-sm font-bold tracking-[-0.28px] text-ink">
      <span>{children}</span>
      {hint ? <span className="font-medium text-muted">{hint}</span> : null}
    </label>
  );
}

export function ContactSection() {
  const [interest, setInterest] = useState<Interest>("founding");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "mailto" | "error">("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    const apply = () => {
      const hash = window.location.hash;
      if (hash === "#book" || hash === "#contact-team") setInterest("multi");
      if (hash === "#contact-founding" || hash === "#contact") setInterest("founding");
    };
    apply();
    window.addEventListener("hashchange", apply);
    return () => window.removeEventListener("hashchange", apply);
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setError("");

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, interest }),
      });
      const payload = (await response.json()) as { ok?: boolean; error?: string; via?: string };
      if (!response.ok) {
        setStatus("error");
        setError(payload.error || "Could not send the message.");
        return;
      }

      if (payload.via === "formsubmit") {
        const sent = await sendWithFormSubmit({
          firstName: String(data.firstName ?? ""),
          lastName: String(data.lastName ?? ""),
          email: String(data.email ?? ""),
          company: String(data.company ?? ""),
          interest,
          message: String(data.message ?? ""),
        });
        if (sent.via === "mailto") {
          window.location.href = mailtoHref({
            firstName: String(data.firstName ?? ""),
            lastName: String(data.lastName ?? ""),
            email: String(data.email ?? ""),
            company: String(data.company ?? ""),
            interest,
            message: String(data.message ?? ""),
          });
          setStatus("mailto");
          form.reset();
          return;
        }
      }

      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
      setError("Could not send the message. Try again.");
    }
  }

  return (
    <section id="contact" className="mt-[80px] w-full md:mt-[135px]">
      <Container className="flex flex-col gap-12">
        <div className="flex flex-col items-center gap-2">
          <SectionBadge>Contact</SectionBadge>
          <SectionTitle align="center">
            Write to us.
            <br />
            Or pick a time.
          </SectionTitle>
        </div>

        <div className="grid items-stretch gap-4 lg:grid-cols-2">
          <article
            id="contact-founding"
            className="flex flex-col rounded-3xl bg-white p-8 shadow-[0px_14px_12px_rgba(0,0,0,0.05)] md:p-10"
          >
            <div className="mb-8 flex flex-col gap-2">
              <h3 className="text-2xl font-bold tracking-[-0.48px] text-ink">Send a message</h3>
              <p className="text-base font-medium leading-[1.4] tracking-[-0.32px] text-muted">
                Founding spots or a team rollout — tell us what you need.
              </p>
            </div>

            {status === "sent" || status === "mailto" ? (
              <div className="flex flex-1 flex-col justify-center gap-3 rounded-2xl bg-page p-8">
                <p className="text-2xl font-bold tracking-[-0.48px] text-ink">
                  {status === "mailto" ? "Finish in your email app." : "Message sent."}
                </p>
                <p className="text-base font-medium leading-[1.4] tracking-[-0.32px] text-muted">
                  {status === "mailto"
                    ? "A draft should open with your message. Send it from there and we’ll get back to you."
                    : "We’ll get back to you at the email you left."}
                </p>
                <ActionButton variant="ghost-light" className="mt-4 w-fit" type="button" onClick={() => setStatus("idle")}>
                  Send another
                </ActionButton>
              </div>
            ) : (
              <form className="flex flex-1 flex-col gap-5" onSubmit={onSubmit}>
                <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <FieldLabel htmlFor="lastName">Last name</FieldLabel>
                    <input id="lastName" name="lastName" required autoComplete="family-name" className={cx(FIELD, "h-12")} />
                  </div>
                  <div>
                    <FieldLabel htmlFor="firstName">First name</FieldLabel>
                    <input id="firstName" name="firstName" required autoComplete="given-name" className={cx(FIELD, "h-12")} />
                  </div>
                </div>

                <div>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <input id="email" name="email" type="email" required autoComplete="email" className={cx(FIELD, "h-12")} />
                </div>

                <div>
                  <FieldLabel htmlFor="company" hint="Optional">
                    Company
                  </FieldLabel>
                  <input id="company" name="company" autoComplete="organization" className={cx(FIELD, "h-12")} />
                </div>

                <fieldset>
                  <legend className="sr-only">I’m interested in</legend>
                  <div className="flex flex-wrap items-center gap-2">
                    {INTERESTS.map((value) => {
                      const selected = interest === value;
                      return (
                        <label
                          key={value}
                          className={cx(
                            "inline-flex h-8 w-fit cursor-pointer items-center justify-center rounded-full px-2.5 font-[family-name:var(--font-cabinet)] text-base font-bold tracking-[-0.32px] transition-colors",
                            selected
                              ? "border border-ink bg-ink text-white"
                              : "border border-black/10 bg-chip text-ink hover:border-black/20",
                          )}
                        >
                          <input
                            type="radio"
                            name="interest"
                            value={value}
                            checked={selected}
                            onChange={() => setInterest(value)}
                            className="sr-only"
                          />
                          {value === "founding" ? "Founding Member" : "Multi-coaches"}
                        </label>
                      );
                    })}
                  </div>
                </fieldset>

                <div className="flex flex-1 flex-col">
                  <FieldLabel htmlFor="message">Message</FieldLabel>
                  <textarea
                    id="message"
                    name="message"
                    required
                    minLength={8}
                    rows={5}
                    className={cx(FIELD, "min-h-[140px] flex-1 resize-y py-3")}
                  />
                </div>

                {error ? (
                  <p className="text-sm font-medium tracking-[-0.28px] text-red-600" role="alert">
                    {error}
                  </p>
                ) : null}

                <ActionButton variant="solid-dark" className="mt-auto w-full" type="submit" disabled={status === "sending"}>
                  {status === "sending" ? "Sending…" : "Send"}
                </ActionButton>
              </form>
            )}
          </article>

          <article
            id="book"
            className="relative flex flex-col overflow-hidden rounded-3xl bg-ink p-8 md:p-10"
          >
            <div className="relative z-10 mb-6 flex flex-col gap-2">
              <h3 className="text-2xl font-bold tracking-[-0.48px] text-white">Book a discovery call</h3>
              <p className="text-base font-medium leading-[1.4] tracking-[-0.32px] text-white/70">
                20 min, no commitment. Pick a slot — we’ll walk through your coaching setup.
              </p>
            </div>

            <CalendlyEmbed url={CALENDLY_URL} />
          </article>
        </div>
      </Container>
    </section>
  );
}
